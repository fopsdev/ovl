import { Action, AsyncAction } from "../../../ovl/node_modules/overmind"
import { Screen } from "../../../ovl/src/index"
import { api, T } from "../../../ovl/src/global/globals"
import {
  FormState,
  GetFormValidationErrors,
  ValidateField
} from "../../../ovl/src/library/forms/actions"
import { Email, Mandatory } from "../../../ovl/src/library/forms/validators"
import { FieldId } from "../../../ovl/src/screens/Login/LoginForm"
import { TogglePDFPopupState } from "../components/FileList/FileList"
import { DialogResult } from "../../../ovl/src/library/actions"

export const Login: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let user = value.fields["user"].value
    let pw = value.fields["pw"].value
    let res = await effects.postRequest(api.url + "users/authenticate", {
      email: user,
      password: pw,
      language: state.ovl.language.language
    })
    if (!res.data) {
      return
    }
    //console.log(res.data)
    state.ovl.user = res.data.partner.user
    state.portal.chartData = res.data.data.chartData
    state.portal.partner = res.data.partner
    state.portal.orderDetail = {
      orders: res.data.data.orderDetail
    }
    state.portal.quotationDetail = {
      quotations: res.data.data.quotationDetail
    }
    state.portal.invoiceDetail = {
      invoices: res.data.data.invoiceDetail
    }
    state.portal.dpInvoiceDetail = {
      dpInvoices: res.data.data.dpInvoiceDetail
    }
    state.portal.partner.attachments = res.data.data.attachments

    actions.ovl.snack.AddSnack({
      durationMs: 3000,
      text: T("AppLoginSuccessful"),
      type: "Success"
    })
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
    actions.ovl.form.ResetFormAfterAnimation(value)
  } else {
    actions.ovl.snack.AddSnack({
      durationMs: 3000,
      text: GetFormValidationErrors(value).join("\n"),
      type: "Error"
    })
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
  actions.ovl.dialog.OkCancelDialog({
    text: T("AppLoginForgotPasswordConfirm"),
    default: 2
  })
  switch (await DialogResult()) {
    case 1:
      let user = value.fields["user"].value
      let res = await effects.postRequest("requestresetpw", {
        user,
        language: state.ovl.language.language
      })
      if (res.status !== 200) {
        return
      }
      actions.ovl.snack.AddSnack({
        text: T("AppLoginForgotPasswordMsg"),
        durationMs: 20000,
        type: "Information"
      })
      break
  }
}

export const HandleAdditionalLanguageResult: Action<any> = (
  { state },
  value
) => {
  state.portal.pics.salesContact = value.salesPic
  state.portal.pics.technicalContact = value.technicianPic
}

export const TogglePDFPopup: Action<TogglePDFPopupState> = (_, value) => {
  if (value.obj.activeFilePopup === value.key) {
    value.obj.activeFilePopup = ""
  } else {
    value.obj.activeFilePopup = value.key
  }
}
