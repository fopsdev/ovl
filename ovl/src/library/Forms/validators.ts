import { Field, ValidateFieldResult } from "./actions"
import { T } from "../../global/globals"

export const Mandatory = (
  displayFieldName: string,
  val: String,
  res: ValidateFieldResult
) => {
  if (!val) {
    res.errors.push(T("AppValidationMandatory", [displayFieldName]))
  }
}

export const MinLength = (
  displayFieldName: string,
  val: String,
  minLength: number,
  res: ValidateFieldResult
) => {
  if (!val || (val && val.length < minLength)) {
    res.errors.push(
      T("AppValidationMinLength", [displayFieldName, minLength.toString()])
    )
  }
}

export const MinLengthOrEmpty = (
  displayFieldName: string,
  val: String,
  minLength: number,
  res: ValidateFieldResult
) => {
  if (val && val.length < minLength) {
    res.errors.push(
      T("AppValidationMinLengthOrEmpty", [
        displayFieldName,
        minLength.toString(),
      ])
    )
  }
}

export const Email = (
  displayFieldName: string,
  val: String,
  res: ValidateFieldResult
) => {
  if (!val || (val && !validateEmail(val))) {
    res.errors.push(T("AppValidationEmail", [displayFieldName]))
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const RemoveValidationMsg = (field: Field, msgOrPartOfMsg: string) => {
  let errorIndex = field.validationResult.errors.findIndex(
    (f) => f.indexOf(msgOrPartOfMsg) > -1
  )
  field.validationResult.errors.splice(errorIndex, 1)
}
