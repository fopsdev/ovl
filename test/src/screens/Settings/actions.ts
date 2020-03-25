import { Action, AsyncAction } from "overmind"
import { T } from "../../global/globals"
import { Mandatory, MinLength } from "../../library/forms/validators"
import {
  FormState,
  ValidateField,
  GetFormValidationErrors
} from "../../library/forms/actions"
export const SettingsValidateField: Action<ValidateField> = (_, value) => {
  let field = value.formState.fields[value.fieldId]
  switch (value.fieldId) {
    case "pw":
      Mandatory(T("AppLoginPassword"), value.newVal, value.validationResult)
      break
    case "pw1":
      MinLength(
        T("AppSettingsPasswordNew"),
        value.newVal,
        6,
        value.validationResult
      )
      if (value.validationResult.valid) {
        if (value.newVal !== value.formState.fields.pw2.value) {
          value.formState.fields.pw2.validationResult.valid = false
          value.formState.fields.pw2.validationResult.validationMsg = T(
            "AppSettingsValidationNewPasswordConfirmation"
          )
        }
      }
      break
    case "pw2":
      if (value.newVal !== value.formState.fields.pw1.value) {
        value.validationResult.valid = false
        value.validationResult.validationMsg = T(
          "AppSettingsValidationNewPasswordConfirmation"
        )
      }
      break
  }
}

export const SaveSettings: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  actions.forms.ValidateForm(value)
  if (value.valid) {
    let pw = value.fields["pw"].value
    let pw1 = value.fields["pw1"].value
    let res = await effects.user.changePw({
      password: pw,
      passwordNew: pw1,
      language: state.ovl.language.language
    })
    if (res.status !== 200) {
      // most probably the password is wrong
      // so already point the user to the right field
      value.valid = false
      value.fields["pw"].validationResult.valid = false
      value.fields["pw"].validationResult.validationMsg = res.message
      return
    }
    actions.snack.AddSnack({
      durationMs: 5000,
      text: T("AppPasswordChangedSuccess"),
      type: "Success"
    })

    actions.forms.ResetFormAfterAnimation(value)
    actions.global.NavigateBack()
  } else {
    actions.snack.AddSnack({
      durationMs: 3000,
      text: GetFormValidationErrors(value).join("\n"),
      type: "Error"
    })
  }
}
