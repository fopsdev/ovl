import { Field } from "../actions"

export const GetOutlineValidationHint = (field: Field): string => {
  let outlineValidationHint = ""
  if (field.validationResult.errors.length > 0) {
    outlineValidationHint = "is-warning"
    if (field.watched) {
      outlineValidationHint = "is-error"
    }
  }
  return outlineValidationHint
}
