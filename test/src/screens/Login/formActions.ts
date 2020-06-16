import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"
import { Email, Mandatory } from "../../../../ovl/src/library/forms/validators"
import { FieldId } from "./LoginForm"
import { OvlAction } from "../../../../ovl/src"

export const FormValidate: OvlAction<ValidateFieldType> = (value) => {
  //let field = value.formState.fields[value.fieldId]
  //if (field.watched) {
  switch (<FieldId>value.fieldId) {
    case "pw":
      Mandatory(T("AppLoginPassword"), value.newVal, value.validationResult)
      break
    case "user":
      Email(T("AppLoginUser"), value.newVal, value.validationResult)
      break
  }
  //}
}
