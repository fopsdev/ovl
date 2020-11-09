import { T } from "../../../../ovl/src/global/globals"

import {
  Mandatory,
  MinLength,
} from "../../../../ovl/src/library/forms/validators"

import { FormValidate_Type } from "../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../ovl/src/ovlTypes"

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
      if (value.validationResult.errors.length === 0) {
        if (value.newVal !== value.formState.fields.pw2.value) {
          value.formState.fields.pw2.validationResult.errors.push(
            T("AppSettingsValidationNewPasswordConfirmation")
          )
        }
      }
      break
    case "pw2":
      if (value.newVal !== value.formState.fields.pw1.value) {
        value.validationResult.errors.push(
          T("AppSettingsValidationNewPasswordConfirmation")
        )
      }
      break
  }
}
