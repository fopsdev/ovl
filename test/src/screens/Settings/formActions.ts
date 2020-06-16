import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"
import {
  Mandatory,
  MinLength,
} from "../../../../ovl/src/library/forms/validators"
import { OvlAction } from "../../../../ovl/src"
import { FormValidate_Type } from "../../../../ovl/src/global/hooks"

export const FormValidate: OvlAction<FormValidate_Type> = (value) => {
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
