import {
  ValidateFieldType,
  FormState,
  GetFormValidationErrors,
} from "../../../../ovl/src/library/forms/actions"
import {
  Mandatory,
  MinLength,
} from "../../../../ovl/src/library/forms/validators"
import { T, api } from "../../../../ovl/src/global/globals"
import { postRequest } from "../../../../ovl/src/effects"
import { SnackAdd } from "../../../../ovl/src/library/helpers"
import { OvlAction } from "../../../../ovl/src"

export const SaveSettings: OvlAction<FormState> = async (
  value,
  { state, actions }
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let pw = value.fields["pw"].value
    let pw1 = value.fields["pw1"].value
    let res = await postRequest(api.url + "users/changepw", {
      password: pw,
      passwordNew: pw1,
      language: state.ovl.language.language,
    })
    if (res.status !== 200) {
      // most probably the password is wrong
      // so already point the user to the right field
      value.valid = false
      value.fields["pw"].validationResult.valid = false
      value.fields["pw"].validationResult.validationMsg = res.message
      return
    }
    SnackAdd(T("AppPasswordChangedSuccess"), "Success")
    actions.ovl.form.ResetFormAfterNavigation(value)
    actions.ovl.navigation.NavigateBack()
  } else {
    SnackAdd(GetFormValidationErrors(value).join("\n"), "Error")
  }
}
