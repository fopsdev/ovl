import { ValidateFieldResult } from "./actions"
import { T } from "../../global/globals"
import { ValidationAddError } from "./helper"

export const Mandatory = (
  displayFieldName: string,
  val: String,
  res: ValidateFieldResult
) => {
  if (!val) {
    ValidationAddError(
      "Mandatory",
      T("AppValidationMandatory", [displayFieldName]),
      res
    )
  }
}

export const MinLength = (
  displayFieldName: string,
  val: String,
  minLength: number,
  res: ValidateFieldResult
) => {
  if (!val || (val && val.length < minLength)) {
    ValidationAddError(
      "MinLength",
      T("AppValidationMinLength", [displayFieldName, minLength.toString()]),
      res
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
    ValidationAddError(
      "MinLengthOrEmpty",
      T("AppValidationMinLengthOrEmpty", [
        displayFieldName,
        minLength.toString(),
      ]),
      res
    )
  }
}

export const Email = (
  displayFieldName: string,
  val: String,
  res: ValidateFieldResult
) => {
  if (!val || (val && !validateEmail(val))) {
    ValidationAddError(
      "Email",
      T("AppValidationEmail", [displayFieldName]),
      res
    )
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
