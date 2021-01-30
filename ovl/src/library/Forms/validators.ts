import {
  Field,
  OvlFormState,
  ValidateResult,
  ValidateResultSummaryErrors,
  ValidateSummaryResult,
} from "./actions"
import { logState, T } from "../../global/globals"
import { ovl, OvlForm } from "../.."
import { form } from "../../actions"
import { forms } from "../../state"

const _validatorHelper = (
  translationKey: string,
  field: Field,
  def?: ValidatorDefType
) => {
  translationKey = "OvlValidator" + translationKey
  let summaryTranslationKey = translationKey + "Summary"
  let isGrouped: boolean
  let summary: SummaryType
  let summaryDisplayType: SummaryValidationDisplayType
  let fieldDisplayType: FieldValidationDisplayType
  let fieldTranslationReps
  let summaryTranslationReps

  if (def) {
    if (def.fieldTranslationKey) {
      translationKey = def.fieldTranslationKey
    }
    if (def.summaryTranslationKey) {
      summaryTranslationKey = def.summaryTranslationKey
    }
    // @@todo: refactor potential down here...
    if (def.useFieldNamesPlaceholder) {
      if (def.useFieldNamesPlaceholder === "AtTheStartOfMessage") {
        if (!def.useFieldNamesOnlyInSummary) {
          if (!def.fieldTranslationKey) {
            translationKey = "{0} " + translationKey
          }
        }
        if (!def.summaryTranslationKey) {
          summaryTranslationKey = "{0} " + summaryTranslationKey
        }
      } else {
        if (!def.useFieldNamesOnlyInSummary) {
          if (!def.fieldTranslationKey) {
            translationKey = translationKey + " {0}"
          }
        }
        if (!def.summaryTranslationKey) {
          summaryTranslationKey = summaryTranslationKey + " {0}"
        }
      }
    }
    fieldDisplayType = def.fieldDisplayType
    isGrouped = def.isGrouped
    if (def.fieldTranslationReps) {
      fieldTranslationReps = def.fieldTranslationReps
    }
    if (def.summaryTranslationReps) {
      summaryTranslationReps = def.summaryTranslationReps
    }
  }
  if (isGrouped) {
    summary = {
      displayCond: summaryDisplayType,
      msg: {
        translationKey: summaryTranslationKey,
        translationReps: summaryTranslationReps,
      },
    }
  }
  AddValidationFromValidator({
    field: { field, displayCond: fieldDisplayType },
    msg: { translationKey, translationReps: fieldTranslationReps },
    isGrouped,
    summary,
  })
}

type ValidatorDefType = {
  useFieldNamesPlaceholder?: "AtTheStartOfMessage" | "AtTheEndOfMessage"
  useFieldNamesOnlyInSummary?: boolean
  fieldDisplayType?: FieldValidationDisplayType
  fieldTranslationKey?: string
  fieldTranslationReps?: string[]
  isGrouped?: boolean
  summaryDisplayType?: SummaryValidationDisplayType
  summaryTranslationKey?: string
  summaryTranslationReps?: string[]
}
export const Mandatory = (field: Field, def?: ValidatorDefType) => {
  if (!field.value) _validatorHelper("Mandatory", field, def)
}

export const MinLength = (
  field: Field,
  minLength: number,
  def?: ValidatorDefType
) => {
  if (!field.value || (field.value && field.value.length < minLength))
    _validatorHelper("MinLength", field, def)
}

export const Email = (
  field: Field,
  minLength: number,
  def?: ValidatorDefType
) => {
  let val = field.value
  if (!val || (val && !validateEmail(val)))
    _validatorHelper("MinLength", field, def)
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

export type SummaryType = {
  displayCond?: SummaryValidationDisplayType
  msg?: { translationKey: string; translationReps?: any[] }
}
export type AddValidationType = {
  isGrouped?: boolean
  customGroup?: string
  msg: { translationKey: string; translationReps?: any[] }
  field: {
    field: Field
    displayCond?: FieldValidationDisplayType
  }
  summary?: SummaryType
}

export const AddValidationFromBuiltinValidation = (v: AddValidationType) => {
  _addValidation(v, "BuiltIn")
}

export const AddValidationFromValidator = (v: AddValidationType) => {
  _addValidation(v, "Validators")
}

export const AddValidation = (v: AddValidationType) => {
  _addValidation(v, "Custom")
}

const _addValidation = (
  v: AddValidationType,
  type: "BuiltIn" | "Custom" | "Validators"
) => {
  let formState: OvlFormState =
    ovl.state.ovl.forms[v.field.field.formType][v.field.field.formId]

  if (type === "Custom" || type === "Validators") {
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
    if (v.summary) {
      if (v.summary.displayCond === undefined) {
        v.summary.displayCond =
          formState.builtInValidationDisplay.customValidationDefaults.summary.displayType
      }
      if (!v.summary.msg) {
        v.summary.msg = v.msg
      }
    }
  }
  // </set defaults>
  let key
  if (v.customGroup) {
    key = v.customGroup
  } else if (v.isGrouped) {
    key = v.msg.translationKey
  } else {
    key = v.msg.translationKey + v.field.field.fieldKey
  }

  let reps = []
  if (type === "BuiltIn" || type === "Validators") {
    // so fieldname translations will always be in {0} for validators which are builtin (listvalidate, schemavalidate,... and Validators (mandatory, email))
    reps = [T(v.field.field.ui.labelTranslationKey)]
  }
  // always push custom reps
  if (v.msg.translationReps) {
    reps = reps.concat(v.msg.translationReps)
  }
  // handle field
  let fieldIdx = v.field.field.validationResult.errors.findIndex(
    (f) => f.key === key
  )
  if (fieldIdx < 0) {
    v.field.field.validationResult.errors.push({
      key,
      translationKey: v.msg.translationKey,
      translationReps: reps,
      displayType: v.field.displayCond,
    })
  }
  // handle summary
  if (v.summary) {
    let summaryErrors = formState.validationResult.errors
    let idx = summaryErrors.findIndex((f) => f.key === key)

    let errToAdjust: ValidateResultSummaryErrors
    if (idx < 0) {
      summaryErrors.push({
        key,
        translationKey: v.summary.msg.translationKey,
        translationReps: v.summary.msg.translationReps,
        displayType: v.summary.displayCond,
        fieldKeys: [v.field.field.fieldKey],
      })
      errToAdjust = summaryErrors[summaryErrors.length - 1]
    } else {
      let err = formState.validationResult.errors[idx]
      errToAdjust = err
      err.translationReps = []
      err.displayType = v.summary.displayCond

      if (err.fieldKeys.indexOf(v.field.field.fieldKey) < 0) {
        err.fieldKeys.push(v.field.field.fieldKey)
      }
    }
    if (type === "BuiltIn" || type === "Validators") {
      errToAdjust.translationReps = [
        errToAdjust.fieldKeys
          .map((k) => T(formState.fields[k].ui.labelTranslationKey))
          .join(", "),
      ]
    }
    if (v.field.field.fieldKey === "mandatory1") {
      debugger
    }
    if (v.summary && v.summary.msg && v.summary.msg.translationReps)
      errToAdjust.translationReps = errToAdjust.translationReps.concat(
        v.summary.msg.translationReps
      )
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
      standalone: true,
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
  let allKeysToTest: string[] = [key, key + field.fieldKey]
  allKeysToTest.forEach((keyToTest) => {
    let errorIndex = field.validationResult.errors.findIndex(
      (f) => f.key === keyToTest
    )
    if (errorIndex > -1) {
      changed = true
      field.validationResult.errors.splice(errorIndex, 1)
    }
    // remove it as well from the summary fieldKeys list if there
    let formState: OvlFormState =
      ovl.state.ovl.forms[field.formType][field.formId]
    let errors = formState.validationResult.errors

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
      } else {
        err.translationReps = [
          err.fieldKeys
            .map((k) => T(formState.fields[k].ui.labelTranslationKey))
            .join(", "),
        ]
      }
    }
  })
  // if (changed) {
  //   SetFormValid(undefined, field)
  // }
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
  formState.valid = _isFormValid(formState)
  SetVisibleSummaryErrorKeys(formState)
}

// export const SetFormValidFromNoValidate = (formState: OvlFormState) => {
//   _setFormValid(formState)
// }

export const HasVisibleSummaryErrors = (formState: OvlFormState) => {
  return formState.validationResult.visibleErrors.length > 0
}
