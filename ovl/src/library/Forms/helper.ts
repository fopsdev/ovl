import { FieldValueMap, ValidateFieldResult } from "./actions"
import { Schema, FormFields } from "./OvlFormElement"

export const SetFocus = (dispatchEl: EventTarget, fieldId: string) => {
  let event = new CustomEvent("ovlfocusin", {
    bubbles: true,
    detail: { id: fieldId },
  })
  dispatchEl.dispatchEvent(event)
}

export const ChangeValue = async (
  dispatchEl: EventTarget,
  value: any,
  fieldId: string
) => {
  let event = new CustomEvent("ovlchange", {
    bubbles: true,
    detail: { val: value, id: fieldId },
  })
  await dispatchEl.dispatchEvent(event)
}

export const RemoveFocus = (dispatchEl: EventTarget, fieldId: string) => {
  let event = new CustomEvent("ovlfocusout", {
    bubbles: true,
    detail: { id: fieldId },
  })
  dispatchEl.dispatchEvent(event)
}

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
