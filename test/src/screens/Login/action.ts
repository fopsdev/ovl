import { Action } from "overmind"
import { FieldId } from "./LoginForm"
import { ValidateField } from "../../../../ovl/src/library/forms/actions"
import { Mandatory, Email } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"

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
