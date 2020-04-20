import { Action, AsyncAction } from "../../../ovl/node_modules/overmind"
import { Screen, customFunctions } from "../../../ovl/src/index"

import { api, T, uuidv4 } from "../../../ovl/src/global/globals"
import {
  FormState,
  GetFormValidationErrors,
  ValidateField,
  InitForm,
} from "../../../ovl/src/library/forms/actions"
import { Email, Mandatory } from "../../../ovl/src/library/forms/validators"

import { TogglePDFPopupState } from "../components/FileList/FileList"
import { FieldId } from "../screens/Login/LoginForm"
import { FormFields } from "../../../ovl/src/library/forms/OvlFormElement"
import {
  DialogOkCancel,
  SnackAdd,
  SnackTrackedRemove,
  SnackTrackedAdd,
} from "../../../ovl/src/library/helpers"
import { AddSnack } from "../../../ovl/src/library/Snack/actions"

export const Login: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let user = value.fields["user"].value
    let pw = value.fields["pw"].value
    SnackTrackedAdd("Login", "Success", "AppLogin")
    try {
      let res = await effects.postRequest(api.url + "users/authenticate", {
        email: user,
        password: pw,
        language: state.ovl.language.language,
      })
      if (!res.data) {
        if (res.type === "InvalidCredentials") {
          SnackAdd(T("AppLoginValidationInvalidPassword"), "Error")
        }
        return
      }
      state.ovl.user.token = res.data.partner.user.token
      state.portal.user = res.data.partner.user
      state.portal.chartData = res.data.data.chartData
      state.portal.partner = res.data.partner
      state.portal.orderDetail = {
        orders: res.data.data.orderDetail,
      }
      state.portal.quotationDetail = {
        quotations: res.data.data.quotationDetail,
      }
      state.portal.invoiceDetail = {
        invoices: res.data.data.invoiceDetail,
      }
      state.portal.dpInvoiceDetail = {
        dpInvoices: res.data.data.dpInvoiceDetail,
      }
      state.portal.partner.attachments = res.data.data.attachments

      //init lookup values
      res = await effects.postRequest(api.url + "lookup", {
        lang: state.ovl.language.language,
        lookupType: "initial",
      })
      state.testtables.lookups.U_ItemCode = res.data.item
      state.testtables.lookups.U_ItmsGrpCod = res.data.itemGroup

      state.testtables.lookups.AbsenceTypeId = res.data.timeAbsences
      state.testtables.lookups.ProjectTypeId = res.data.timeProjects

      if (state.ovl.screens.nav.screensHistory.length > 1) {
        actions.ovl.navigation.NavigateBack()
      } else {
        // see if we have a target url and move directly to that screen
        // also possible to move to detail providing "o" = docnum param
        let url = new URL(window.location.href)
        let screen = <Screen>url.searchParams.get("s")
        let orderNum = url.searchParams.get("o")
        let command: Screen = "Dashboard"
        if (screen) {
          command = screen
        }
        if (orderNum) {
          state.ovl.screens.screens.Orderdetail.selectedOrder = orderNum
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
export const LoginValidateField: Action<ValidateField> = (_, value) => {
  let field = value.formState.fields[value.fieldId]
  if (field.watched) {
    switch (<FieldId>value.fieldId) {
      case "pw":
        Mandatory(T("AppLoginPassword"), value.newVal, value.validationResult)
        break
      case "user":
        Email(T("AppLoginUser"), value.newVal, value.validationResult)
        break
    }
  }
}

export const ForgotPw: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  if ((await DialogOkCancel(T("AppLoginForgotPasswordConfirm"), 2)) === 1) {
    let user = value.fields["user"].value
    let res = await effects.postRequest(api.url + "users/requestresetpw", {
      user,
      language: state.ovl.language.language,
    })
    if (res.status !== 200) {
      return
    }
    SnackAdd(T("AppLoginForgotPasswordMsg"), "Information", 20000)
  }
}

export const HandleAdditionalLanguageResult: AsyncAction<any> = async (
  { state },
  value
) => {
  state.portal.pics = {
    salesContact: value.salesPic,
    technicalContact: value.technicianPic,
  }
  if (!state.portal.partner) {
    //@ts-ignore
    state.portal.partner = {}
  }
  state.portal.partner.technicalContact = value.technician
  state.portal.partner.salesContact = value.sales
}

export const TogglePDFPopup: Action<TogglePDFPopupState> = (_, value) => {
  if (value.obj.activeFilePopup === value.key) {
    value.obj.activeFilePopup = ""
  } else {
    value.obj.activeFilePopup = value.key
  }
}

export const HandleRefresh: AsyncAction = async ({
  state,
  actions,
  effects,
}) => {
  let snackId = uuidv4()
  SnackTrackedAdd("Daten werden aufgefrischt", "Success", snackId)

  try {
    // 1st get global data to be refreshed
    let res = await effects.postRequest(api.url + "data/getdata", {
      features: state.portal.user.features,
      language: state.ovl.language.language,
    })
    if (!res.data) {
      return
    }
    state.portal.partner.attachments = res.data.attachments

    state.portal.chartData = res.data.chartData
    state.portal.quotationDetail = {
      quotations: res.data.quotationDetail,
    }
    state.portal.orderDetail = { orders: res.data.orderDetail }
    state.portal.invoiceDetail = { invoices: res.data.invoiceDetail }
    state.portal.dpInvoiceDetail = {
      dpInvoices: res.data.dpInvoiceDetail,
    }

    //now call the screens refresh action if any
    if (customFunctions) {
      let screensFunctions = customFunctions["screens"]
      if (screensFunctions) {
        let screen = state.ovl.screens.nav.currentScreen
        if (screensFunctions[screen]) {
          if (screensFunctions[screen]["ScreenRefresh"]) {
            screensFunctions[screen]["ScreenRefresh"](state, actions, effects)
          }
        }
      }
    }
  } finally {
    SnackTrackedRemove(snackId)
  }
}

export const CustomInit: AsyncAction = async ({ actions, state }, _) => {
  // SnackTrackedAdd("111111111", "Success", "1")

  // SnackTrackedAdd("22222222", "Success", "2")

  // SnackTrackedAdd("33333333", "Success", "3")
  // setTimeout(() => {
  //   SnackTrackedRemove("1")
  // }, 2000)

  // setTimeout(() => {
  //   SnackTrackedRemove("2")

  //   SnackTrackedAdd("44444444", "Success", "4")
  // }, 1000)

  // setTimeout(() => {
  //   SnackTrackedRemove("3")
  // }, 5000)

  // setTimeout(() => {
  //   SnackTrackedRemove("4")
  // }, 8000)

  if (state.ovl.user.token) {
    return
  }
  let fields: { [key: string]: FormFields } = {
    user: { value: "", ui: { labelTranslationKey: "AppLoginUser" } },
    pw: {
      value: "",
      ui: { labelTranslationKey: "AppLoginPassword", isPassword: true },
    },
  }
  let loginForm: InitForm = {
    validationFnName: "LoginValidateField",
    namespace: "portal.system.user",
    instanceId: "loginform",
    formType: "Login",
    fields,
  }

  actions.ovl.form.InitForm(loginForm)
  actions.ovl.navigation.NavigateTo("Login")
}
