import { Field, OvlFormState, ValidateResult } from "./actions"
import { logState, T } from "../../global/globals"
import { ovl, OvlForm } from "../.."
import { form } from "../../actions"
import { forms } from "../../state"

export const Mandatory = (
  displayFieldName: string,
  val: String,
  res: ValidateResult,
  displayType?: FieldValidationDisplayType
) => {
  if (!displayType) {
    displayType = "WhenTouched"
  }
  if (!val) {
    res.errors.push({
      key: "Mandatory",
      translationKey: "AppValidationMandatory",
      translationReps: [displayFieldName],
      displayType,
    })
  }
}

export const MinLength = (
  displayFieldName: string,
  val: String,
  minLength: number,
  res: ValidateResult,
  displayType?: FieldValidationDisplayType
) => {
  if (!displayType) {
    displayType = "WhenTouched"
  }

  if (!val || (val && val.length < minLength)) {
    res.errors.push({
      key: "MinLength",
      translationKey: "AppValidationMinLength",
      translationReps: [displayFieldName, minLength.toString()],
      displayType,
    })
  }
}

export const MinLengthOrEmpty = (
  displayFieldName: string,
  val: String,
  minLength: number,
  res: ValidateResult,
  displayType?: FieldValidationDisplayType
) => {
  if (!displayType) {
    displayType = "WhenTouched"
  }

  if (val && val.length < minLength) {
    res.errors.push({
      key: "MinLenOrEmpty",
      translationKey: "AppValidationMinLengthOrEmpty",
      translationReps: [displayFieldName, minLength.toString()],
      displayType,
    })
  }
}

export const Email = (
  displayFieldName: string,
  val: String,
  res: ValidateResult,
  displayType?: FieldValidationDisplayType
) => {
  if (!displayType) {
    displayType = "WhenTouched"
  }

  if (!val || (val && !validateEmail(val))) {
    res.errors.push({
      key: "Email",
      translationKey: "AppValidationEmail",
      translationReps: [displayFieldName],
      displayType,
    })
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export type FieldValidationType = "error"
export type FieldValidationDisplayType =
  | "WhenTouched"
  | "Always"
  | "OnlyOutline"
export type SummaryValidationDisplayType =
  | "WhenFirstFieldTouched"
  | "WhenAllRelatedFieldsTouched"
  | "Always"

export type AddValidationType = {
  isGrouped?: boolean
  msg: { translationKey: string; translationReps?: any[] }
  field: {
    field: Field
    displayCond?: FieldValidationDisplayType
  }
  summary?: {
    displayCond?: SummaryValidationDisplayType
    msg?: { translationKey: string; translationReps?: any[] }
  }
}

export const AddValidation = (v: AddValidationType) => {
  let formState: OvlFormState =
    ovl.state.ovl.forms[v.field.field.formType][v.field.field.formId]
  // <set defaults>
  if (v.field.displayCond === undefined) {
    if (v.summary) {
      v.field.displayCond =
        formState.builtInValidationDisplay.customValidationDefaults.field.displayTypeIfSummary
    } else {
      v.field.displayCond =
        formState.builtInValidationDisplay.customValidationDefaults.field.displayType
    }
  }
  let fieldDisplayCond = v.field.displayCond
  if (v.summary) {
    if (v.summary.displayCond === undefined) {
      v.summary.displayCond =
        formState.builtInValidationDisplay.customValidationDefaults.summary.displayType
    }
    if (!v.summary.msg) {
      v.summary.msg = v.msg
    }
  }
  // </set defaults>

  let key = v.msg.translationKey
  if (!v.isGrouped) {
    key += v.field.field.fieldKey
  }

  // handle field
  if (
    !v.field.field.validationResult.errors.some(
      (f) => f.translationKey.indexOf(v.msg.translationKey) > -1
    )
  ) {
    v.field.field.validationResult.errors.push({
      key,
      translationKey: v.msg.translationKey,
      translationReps: v.msg.translationReps,
      displayType: fieldDisplayCond,
    })

    // handle summary
    if (v.summary) {
      let idx = formState.validationResult.errors.findIndex(
        (f) => f.key === key
      )
      if (idx < 0) {
        formState.validationResult.errors.push({
          key,
          translationKey: v.summary.msg.translationKey,
          translationReps: v.summary.msg.translationReps,
          displayType: v.summary.displayCond,
          fieldKeys: [v.field.field.fieldKey],
        })
      } else {
        let err = formState.validationResult.errors[idx]
        err.translationReps = v.msg.translationReps
        err.displayType = v.summary.displayCond

        if (err.fieldKeys.indexOf(v.field.field.fieldKey) < 0) {
          err.fieldKeys.push(v.field.field.fieldKey)
        }
      }
    }
  }
  SetVisibleSummaryErrorKeys(formState)
  formState.valid = false
}

export const AddSummaryValidation = (
  formState: OvlFormState,
  key: string,
  translationKey: string,
  translationReps?: any[]
) => {
  if (
    !formState.validationResult.errors.some(
      (f) => f.translationKey.indexOf(key) > -1
    )
  ) {
    formState.validationResult.errors.push({
      key,
      translationKey,
      translationReps,
      displayType: "Always",
      fieldKeys: [],
    })
  }
  formState.valid = false
  SetVisibleSummaryErrorKeys(formState)
}

export const RemoveSummaryValidation = (
  formState: OvlFormState,
  key: string
) => {
  _removeSummaryValidation(formState, key)
}

const _removeSummaryValidation = (formState: OvlFormState, key: string) => {
  let errorIndex = formState.validationResult.errors.findIndex(
    (f) => f.key === key
  )
  if (errorIndex > -1) {
    formState.validationResult.errors.splice(errorIndex, 1)
  }
  SetFormValid(formState)
  // if (!formState.valid) {
  //   SetVisibleSummaryErrorKeys(formState)
  // }
}

export const RemoveFieldValidation = (field: Field, key: string) => {
  _removeFieldValidation(field, key)
}
const _removeFieldValidation = (
  field: Field,
  key: string,
  mass: boolean = false
) => {
  let changed = false
  let errorIndex = field.validationResult.errors.findIndex((f) => f.key === key)
  if (errorIndex > -1) {
    changed = true
    field.validationResult.errors.splice(errorIndex, 1)
  }
  // remove it as well from the summary fieldKeys list if there
  let formState: OvlFormState =
    ovl.state.ovl.forms[field.formType][field.formId]
  let errors = formState.validationResult.errors

  let allKeysToTest: string[] = [key, key + field.fieldKey]
  allKeysToTest.forEach((keyToTest) => {
    let keyIndex = errors.findIndex((f) => f.key === keyToTest)
    if (keyIndex > -1) {
      let err = errors[keyIndex]
      let idx = err.fieldKeys.findIndex((f) => f === field.fieldKey)
      if (idx > -1) {
        changed = true
        err.fieldKeys.splice(idx, 1)
      }
      if (err.fieldKeys.length === 0) {
        changed = true
        errors.splice(keyIndex, 1)
      }
    }
  })
  if (changed) {
    SetFormValid(undefined, field)
  }
}

export const RemoveAllValidationOfType = (
  formState: OvlFormState,
  key: string
) => {
  Object.keys(formState.fields).forEach((f) => {
    let field = formState.fields[f]
    _removeFieldValidation(field, key, true)
  })
  //SetFormValid(formState)
}

export const IsFieldValid = (field: Field) => {
  return field.validationResult.errors.length === 0
}

export const SetVisibleSummaryErrorKeys = (formState: OvlFormState) => {
  let errors = formState.validationResult.errors
  let fieldsToCheck: string[] = []
  errors.forEach((e) =>
    e.fieldKeys.forEach((f) => {
      fieldsToCheck.push(f)
    })
  )
  let fields = formState.fields
  let allUnWatchedFieldsErrorKeys: Set<string> = new Set()
  fieldsToCheck
    .filter((f) => fields[f].watched === false)
    .forEach((f) =>
      fields[f].validationResult.errors.forEach((f2) => {
        allUnWatchedFieldsErrorKeys.add(f2.key)
      })
    )

  let allWatchedFieldsErrorKeys: Set<string> = new Set()
  fieldsToCheck
    .filter((f) => fields[f].watched)
    .forEach((f) =>
      fields[f].validationResult.errors.forEach((f2) => {
        allWatchedFieldsErrorKeys.add(f2.key)
      })
    )

  let res1 = errors.filter(
    (f) =>
      f.displayType === "WhenAllRelatedFieldsTouched" &&
      !allUnWatchedFieldsErrorKeys.has(f.key)
  )
  //console.log(res1)
  let res2 = errors.filter(
    (f) =>
      f.displayType === "WhenFirstFieldTouched" &&
      allWatchedFieldsErrorKeys.has(f.key)
  )
  let res3 = errors.filter((f) => f.displayType === "Always")
  formState.validationResult.visibleErrors = res1.concat(res2).concat(res3)
}

const _isFormValid = (formState: OvlFormState) => {
  let fields = formState.fields
  return (
    formState.validationResult.errors.length === 0 &&
    !Object.keys(fields).some(
      (s) => fields[s].validationResult.errors.length > 0
    )
  )
}

export const SetFormValid = (formState?: OvlFormState, field?: Field) => {
  if (!formState) {
    formState = ovl.state.ovl.forms[field.formType][field.formId]
  }
  console.log("setvalid")
  formState.valid = _isFormValid(formState)
  SetVisibleSummaryErrorKeys(formState)
}

// export const SetFormValidFromNoValidate = (formState: OvlFormState) => {
//   _setFormValid(formState)
// }

export const HasVisibleSummaryErrors = (formState: OvlFormState) => {
  return formState.validationResult.visibleErrors.length > 0
}
