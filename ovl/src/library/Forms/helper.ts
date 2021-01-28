import { getDisplayValue } from "../Table/helpers"
import { FieldValueMap, ValidateResult } from "./actions"
import { GetListDisplayValue, GetRowFromFormState } from "./Controls/helpers"
import { Schema, FormField } from "./OvlFormElement"

export const SetFocusEventHelper = (
  dispatchEl: EventTarget,
  fieldId: string
) => {
  let event = new CustomEvent("ovlfocusin", {
    bubbles: true,
    detail: { id: fieldId },
  })
  dispatchEl.dispatchEvent(event)
}

export const ChangeValueEventHelper = async (
  dispatchEl: EventTarget,
  value: any,
  fieldId: string,
  isInnerEvent?: boolean
) => {
  let event = new CustomEvent("ovlchange", {
    bubbles: true,
    detail: { val: value, id: fieldId, isInnerEvent },
  })
  await dispatchEl.dispatchEvent(event)
}

export const RemoveFocusEventHelper = (
  dispatchEl: EventTarget,
  fieldId: string
) => {
  let event = new CustomEvent("ovlfocusout", {
    bubbles: true,
    detail: { id: fieldId },
  })
  dispatchEl.dispatchEvent(event)
}

export const getFormFields = (
  schema: { [key: string]: Schema },
  formFields: { [key: string]: FormField },
  instanceId: string,
  formType: string,
  namespace: string
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
    let value = formFields[k].value
    let row = Object.keys(formFields).reduce((val, k, i) => {
      val[k] = formFields[k].value
      return val
    }, {})

    fields[k] = {
      value: getDisplayValue(
        k,
        { list: formFields[k].list, type, ui: formFields[k].ui },
        row,
        namespace
      ),
      convertedValue: value,

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
      previousConvertedValue: value,
    }
    if (!formFields[k].ui) {
      formFields[k].ui = {}
    }
    let ui = formFields[k].ui
    if (ui.readonly === undefined) {
      ui.readonly = false
    }
    if (ui.autocomplete === undefined) {
      ui.autocomplete = false
    }
    if (ui.useSpellcheck === undefined) {
      ui.useSpellcheck = false
    }
    if (ui.visible === undefined) {
      ui.visible = "true"
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
