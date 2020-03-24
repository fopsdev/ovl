import { Field } from "../actions"
type UIValidationObject = {
  validationType: string
  validationHide: string
  needsAttention: boolean
}
export const getUIValidationObject = (field: Field): UIValidationObject => {
  let res: UIValidationObject = {
    needsAttention: false,
    validationHide: " hide ",
    validationType: ""
  }
  if (!field.validationResult.valid) {
    if (field.dirty || field.watched) {
      res.validationType = " is-invalid "
      res.needsAttention = true
      res.validationHide = " fd-form-message--error "
    } else {
      // field is not touched or changed
      // so the user just needs attention to this field (eg. its required)
      // this impl just changes the border color so i also will work for indicating issues in tablerow-form (no labels there)
      res.validationType = " is-warning "
      //res.validationHide = " fd-form-message--warning "
      res.needsAttention = true
    }
  }
  return res
}
