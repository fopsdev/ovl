import { overmind } from "../.."
import { T } from "../../../../ovl/src/global/globals"
import { ValidateField } from "../../../../ovl/src/library/forms/actions"
import { Email, Mandatory } from "../../../../ovl/src/library/forms/validators"
import { FieldId } from "./LoginForm"

export const LoginValidateField = (
  value: ValidateField,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let field = value.formState.fields[value.fieldId]
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
