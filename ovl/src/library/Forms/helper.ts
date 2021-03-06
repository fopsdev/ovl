import { FieldValueMap, ValidateFieldResult } from "./actions"
import { Schema, FormFields } from "./OvlFormElement"
import { getDateValue } from "../../global/globals"
// export const setDecimalValue = (val: any): number => {
//   if (val == 0) {
//     val = 0.0
//   }
//   return Math.round(val * 1000000) / 1000000 + 0.0000001
// }

export const getFormFields = (
  schema: { [key: string]: Schema },
  formFields: { [key: string]: FormFields },
  instanceId: string,
  formType: string
): FieldValueMap => {
  let fields: FieldValueMap = {}
  Object.keys(formFields).forEach((k) => {
    let type = formFields[k].type
    if (!type) {
      if (schema && schema[k]) {
        type = schema[k].type
      } else {
        type = "text"
      }
    }
    fields[k] = {
      value: formFields[k].value,
      convertedValue: undefined,

      type: type,
      dirty: false,
      watched: false,
      validationResult: { errors: [] },
      id: instanceId + k,
      list: formFields[k].list,
      formId: instanceId,
      formType,
      fieldKey: k,
      ui: formFields[k].ui,
    }
  })
  return fields
}

// export const ValidationAddError = (
//   validatorId: string,
//   msg: string,
//   val: ValidateFieldResult
// ) => {
//   val.valid = false
//   val.validationMsg = msg
//   val.validations[validatorId] = { valid: false, validationMsg: msg }
//   ValidationSetCurrentError(val)
// }

// export const ValidationRemoveError = (
//   validatorId: string,
//   val: ValidateFieldResult
// ) => {
//   delete val.validations[validatorId]
//   ValidationSetCurrentError(val)
// }

// export const ValidationSetCurrentError = (val: ValidateFieldResult) => {
//   // still display the last error if any
//   let lastError = ""
//   let validationKeys = Object.keys(val.validations)
//   if (validationKeys.length > 0) {
//     lastError =
//       val.validations[validationKeys[validationKeys.length - 1]].validationMsg
//   }
//   if (lastError) {
//     val.valid = false
//     val.validationMsg = lastError
//   } else {
//     val.valid = true
//     val.validationMsg = ""
//   }
// }
