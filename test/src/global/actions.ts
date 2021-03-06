import { OvlScreen } from "../../../ovl/src/index"

import { T, uuidv4 } from "../../../ovl/src/global/globals"
import {
  OvlFormState,
  GetFormValidationErrors,
  ValidateFieldType,
  InitForm,
} from "../../../ovl/src/library/forms/actions"

import { TogglePDFPopupState } from "../components/FileList/FileList"

import { FormFields } from "../../../ovl/src/library/forms/OvlFormElement"
import {
  DialogOkCancel,
  SnackAdd,
  SnackTrackedRemove,
  SnackTrackedAdd,
} from "../../../ovl/src/library/helpers"
import { AddSnack } from "../../../ovl/src/library/Snack/actions"
import { OvlAction } from "../../../ovl/src/ovlTypes"

export const Login: OvlAction<OvlFormState> = async (
  value,
  { state, actions, effects }
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let user = value.fields["user"].value
    let pw = value.fields["pw"].value
    SnackTrackedAdd("Login", "Success", "AppLogin")
    try {
      let res = await effects.ovl.postRequest(
        state.ovl.apiUrl + "users/authenticate",
        {
          email: user,
          password: pw,
          language: state.ovl.language.language,
        }
      )
      if (!res.data) {
        if (res.type === "InvalidCredentials") {
          SnackAdd(T("AppLoginValidationInvalidPassword"), "Error")
        }
        return
      }
      state.ovl.user.token = res.data.partner.user.token
      state.ovl.user.role = res.data.partner.user.role
      state.app.user = res.data.partner.user
      state.app.chartData = res.data.data.chartData
      state.app.partner = res.data.partner
      state.app.orderDetail = {
        orders: res.data.data.orderDetail,
      }
      state.app.quotationDetail = {
        quotations: res.data.data.quotationDetail,
      }
      state.app.invoiceDetail = {
        invoices: res.data.data.invoiceDetail,
      }
      state.app.dpInvoiceDetail = {
        dpInvoices: res.data.data.dpInvoiceDetail,
      }
      state.app.partner.attachments = res.data.data.attachments

      //init lookup values
      res = await effects.ovl.postRequest(state.ovl.apiUrl + "lookup", {
        lang: state.ovl.language.language,
        lookupType: "initial",
      })
      state.app.testtables.lookups.U_ItemCode = res.data.item
      state.app.testtables.lookups.U_ItmsGrpCod = res.data.itemGroup

      state.app.testtables.lookups.AbsenceTypeId = res.data.timeAbsences
      state.app.testtables.lookups.ProjectTypeId = res.data.timeProjects

      state.ovl.uiState.isReady = true

      if (state.ovl.screens.nav.screensHistory.length > 1) {
        actions.ovl.navigation.NavigateBack()
      } else {
        // see if we have a target url and move directly to that screen
        // also possible to move to detail providing "o" = docnum param
        let url = new URL(window.location.href)
        let screen = <OvlScreen>url.searchParams.get("s")
        let orderNum = url.searchParams.get("o")
        let command: OvlScreen = "Dashboard"
        if (screen) {
          command = screen
        }
        if (orderNum) {
          state.app.screens.orderdetail.selectedOrder = orderNum
        }
        actions.ovl.navigation.NavigateTo(command)
      }
      actions.ovl.form.ResetFormAfterNavigation(value)
    } finally {
      SnackTrackedRemove("AppLogin")
    }
  } else {
    SnackAdd(GetFormValidationErrors(value).join("\n"), "Error")
  }
}

export const ForgotPw: OvlAction<OvlFormState> = async (
  value,
  { state, actions, effects }
) => {
  if (
    (await DialogOkCancel({ text: T("AppLoginForgotPasswordConfirm") })) === 1
  ) {
    let user = value.fields["user"].value
    let res = await effects.ovl.postRequest(
      state.ovl.apiUrl + "users/requestresetpw",
      {
        user,
        language: state.ovl.language.language,
      }
    )
    if (res.status !== 200) {
      return
    }
    SnackAdd(T("AppLoginForgotPasswordMsg"), "Information", 20000)
  }
}

export const HandleAdditionalLanguageResult: OvlAction<any> = async (
  value,
  { state }
) => {
  state.app.pics = {
    salesContact: value.salesPic,
    technicalContact: value.technicianPic,
  }
  if (!state.app.partner) {
    //@ts-ignore
    state.app.partner = {}
  }
  state.app.partner.technicalContact = value.technician
  state.app.partner.salesContact = value.sales
}

export const TogglePDFPopup: OvlAction<TogglePDFPopupState> = (value) => {
  if (value.obj.activeFilePopup === value.key) {
    value.obj.activeFilePopup = ""
  } else {
    value.obj.activeFilePopup = value.key
  }
}

export const HandleRefresh: OvlAction = async (
  _,
  { state, actions, effects }
) => {
  let snackId = uuidv4()
  SnackTrackedAdd("Daten werden aufgefrischt", "Success", snackId)

  try {
    // 1st get global data to be refreshed
    let res = await effects.ovl.postRequest(state.ovl.apiUrl + "data/getdata", {
      features: state.app.user.features,
      language: state.ovl.language.language,
    })
    if (!res.data) {
      return
    }
    state.app.partner.attachments = res.data.attachments

    state.app.chartData = res.data.chartData
    state.app.quotationDetail = {
      quotations: res.data.quotationDetail,
    }
    state.app.orderDetail = { orders: res.data.orderDetail }
    state.app.invoiceDetail = { invoices: res.data.invoiceDetail }
    state.app.dpInvoiceDetail = {
      dpInvoices: res.data.dpInvoiceDetail,
    }

    //now call the screens refresh action if any

    let screensFunctions = actions.custom["screens"]
    if (screensFunctions) {
      let screen = state.ovl.screens.nav.currentScreen
      if (screensFunctions[screen]) {
        if (screensFunctions[screen]["ScreenRefresh"]) {
          screensFunctions[screen]["ScreenRefresh"]()
        }
      }
    }
  } finally {
    SnackTrackedRemove(snackId)
  }
}

export const CustomInit: OvlAction = async (_, { actions, state }) => {
  if (state.ovl.user.token) {
    return
  }
  let fields: { [key: string]: FormFields } = {
    user: {
      value: "info@itflies.ch",
      ui: { labelTranslationKey: "AppLoginUser" },
    },
    pw: {
      value: "Test1234",
      ui: { labelTranslationKey: "AppLoginPassword", isPassword: true },
    },
  }
  let loginForm: InitForm = {
    namespace: "system.user",
    instanceId: "loginform",
    formType: "Login",
    fields,
    initialFocusElementId: "user",
  }
  await actions.ovl.form.InitForm(loginForm)
  // await actions.app.system.user.Login(state.ovl.forms.Login.loginform)
  // actions.ovl.navigation.NavigateTo("TableTesting")
}
