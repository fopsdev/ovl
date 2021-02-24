import {
  Field,
  OvlFormState,
  ValidateResult,
  ValidateResultSummaryErrors,
  ValidateSummaryResult,
} from "./actions"
import { logState, SetFocus, T } from "../../global/globals"
import { ovl, OvlForm, OvlFormValidationValidators } from "../.."
import { form } from "../../actions"
import { forms } from "../../state"
import { OvlConfig } from "../../config"

export type FormValidation = {
  dataType?: FormValidationDataTypeSettings
  schema?: FormValidationSchemaSettings
  list?: FormValidationListSettings
  validators?: FormValidationValidatorSettings
  custom?: FormValidationField
}

export type FormValidationDataTypeSettings = {
  Date: FormValidationField
  Number: FormValidationField
}

export type FormValidationSchemaSettings = {
  NotNull: FormValidationField
  NrOfChars: FormValidationField
}

export type FormValidationListSettings = {
  ListValue: FormValidationField
  NotEmpty: FormValidationField
  NotEmptyOption: FormValidationField
}

export type FormValidationValidatorSettings = {
  [key in OvlFormValidationValidators]: FormValidationField
}

export type FormValidationField = {
  displayType: FormValidationDisplayType
  translationKey: string
  additionalTranslationReps?: string[]
  setFocus?: boolean
  summary: FormValidationSummary
}

export type FormValidationSummary = {
  isUsed: boolean
  groupedBy:
    | "FieldTranslationAndFieldKey"
    | "FieldTranslationKey"
    | "SummaryTranslationKey"
  displayType: FormValidationSummaryDisplayType
  translationKey?: string
  additionalTranslationReps?: string[]
  customGroupKey?: string
}

export type FormValidationDisplayType = "WhenTouched" | "Always" | "OnlyOutline"
export type FormValidationSummaryDisplayType =
  | "WhenFirstFieldTouched"
  | "WhenAllRelatedFieldsTouched"
  | "Always"

// const _validatorHelper = (
//   translationKey: string,
//   field: Field,
//   def?: ValidatorDefType
// ) => {
//   translationKey = "OvlValidator" + translationKey
//   let summaryTranslationKey = translationKey + "Summary"
//   let isGrouped: boolean
//   let summary: SummaryType
//   let summaryDisplayType: FormValidationSummaryDisplayType
//   let fieldDisplayType: FormValidationDisplayType
//   let fieldTranslationReps
//   let summaryTranslationReps

//   if (def) {
//     if (def.fieldTranslationKey) {
//       translationKey = def.fieldTranslationKey
//     }
//     if (def.summaryTranslationKey) {
//       summaryTranslationKey = def.summaryTranslationKey
//     }
//     // @@todo: refactor potential down here...
//     if (def.useFieldNamesPlaceholder) {
//       if (def.useFieldNamesPlaceholder === "AtTheStartOfMessage") {
//         if (!def.useFieldNamesOnlyInSummary) {
//           if (!def.fieldTranslationKey) {
//             translationKey = "{0} " + translationKey
//           }
//         }
//         if (!def.summaryTranslationKey) {
//           summaryTranslationKey = "{0} " + summaryTranslationKey
//         }
//       } else {
//         if (!def.useFieldNamesOnlyInSummary) {
//           if (!def.fieldTranslationKey) {
//             translationKey = translationKey + " {0}"
//           }
//         }
//         if (!def.summaryTranslationKey) {
//           summaryTranslationKey = summaryTranslationKey + " {0}"
//         }
//       }
//     }
//     fieldDisplayType = def.fieldDisplayType
//     isGrouped = def.isGrouped
//     if (def.fieldTranslationReps) {
//       fieldTranslationReps = def.fieldTranslationReps
//     }
//     if (def.summaryTranslationReps) {
//       summaryTranslationReps = def.summaryTranslationReps
//     }
//   }
//   if (isGrouped) {
//     summary = {
//       displayCond: summaryDisplayType,
//       msg: {
//         translationKey: summaryTranslationKey,
//         translationReps: summaryTranslationReps,
//       },
//     }
//   }
//   AddValidationFromValidator({
//     field: { field, displayCond: fieldDisplayType },
//     msg: { translationKey, translationReps: fieldTranslationReps },
//     isGrouped,
//     summary,
//   })
// }

// type ValidatorDefType = {
//   useFieldNamesPlaceholder?: "AtTheStartOfMessage" | "AtTheEndOfMessage"
//   useFieldNamesOnlyInSummary?: boolean
//   fieldDisplayType?: FormValidationDisplayType
//   fieldTranslationKey?: string
//   fieldTranslationReps?: string[]
//   isGrouped?: boolean
//   summaryDisplayType?: FormValidationSummaryDisplayType
//   summaryTranslationKey?: string
//   summaryTranslationReps?: string[]
// }
// export const Mandatory = (field: Field, def?: ValidatorDefType) => {
//   if (!field.value) _validatorHelper("Mandatory", field, def)
// }

// export const MinLength = (
//   field: Field,
//   minLength: number,
//   def?: ValidatorDefType
// ) => {
//   if (!field.value || (field.value && field.value.length < minLength))
//     _validatorHelper("MinLength", field, def)
// }

export const UseValidator = (
  field: Field,
  validator: OvlFormValidationValidators,
  val?: any
) => {
  let formState: OvlFormState =
    ovl.state.ovl.forms[field.formType][field.formId]
  let validation = JSON.parse(
    JSON.stringify(formState.validation.validators[validator])
  )
  if (
    OvlConfig.formValidation.validatorsFunctions[validator](
      field,
      validation,
      val
    )
  ) {
    AddValidation(field, validation)
  }
}

export const GetCustomValidationDefaults = (
  formState: OvlFormState
): FormValidationField => {
  return JSON.parse(JSON.stringify(formState.validation.custom))
}

export const AddCustomValidationUsingDefault = (
  field: Field,
  translationKey: string
) => {
  let formState: OvlFormState =
    ovl.state.ovl.forms[field.formType][field.formId]
  let v: FormValidationField = formState.validation.custom
  v.translationKey = translationKey
  AddValidation(field, v)
}

export const AddValidation = (field: Field, v: FormValidationField) => {
  if (field.notUsed) {
    return
  }
  let formState: OvlFormState =
    ovl.state.ovl.forms[field.formType][field.formId]

  let key

  switch (v.summary.groupedBy) {
    case "SummaryTranslationKey":
      key = v.summary.translationKey
      break
    case "FieldTranslationKey":
      key = v.translationKey
      break
    case "FieldTranslationAndFieldKey":
      key = v.translationKey + field.fieldKey
  }
  let reps: string[] = []
  // so fieldname translations will always be in {0} for validators which are builtin (listvalidate, schemavalidate,... and Validators (mandatory, email))
  reps = [T(field.ui.labelTranslationKey)]
  if (v.additionalTranslationReps) {
    reps = reps.concat(v.additionalTranslationReps)
  }
  // handle field
  let fieldIdx = field.validationResult.errors.findIndex((f) => f.key === key)
  if (fieldIdx < 0) {
    field.validationResult.errors.push({
      key,
      translationKey: v.translationKey,
      translationReps: reps,
      displayType: v.displayType,
    })
  }
  // handle summary
  if (v.summary.isUsed) {
    let summaryErrors = formState.validationResult.errors
    let idx = summaryErrors.findIndex((f) => f.key === key)
    let errToAdjust: ValidateResultSummaryErrors
    if (idx < 0) {
      summaryErrors.push({
        key,
        translationKey: v.summary.translationKey
          ? v.summary.translationKey
          : v.translationKey,

        displayType: v.summary.displayType,
        fieldKeys: [field.fieldKey],
      })
      errToAdjust = summaryErrors[summaryErrors.length - 1]
    } else {
      let err = formState.validationResult.errors[idx]
      errToAdjust = err
      err.translationReps = []
      err.displayType = v.summary.displayType

      if (err.fieldKeys.indexOf(field.fieldKey) < 0) {
        err.fieldKeys.push(field.fieldKey)
      }
    }
    errToAdjust.translationReps = [
      errToAdjust.fieldKeys
        .map((k) => T(formState.fields[k].ui.labelTranslationKey))
        .join(", "),
    ]
    let additionalReps = v.summary.additionalTranslationReps
    if (!additionalReps) {
      additionalReps = v.additionalTranslationReps
    }
    if (additionalReps)
      errToAdjust.translationReps = errToAdjust.translationReps.concat(
        additionalReps
      )
  }
  SetVisibleSummaryErrorKeys(formState)
  if (formState.valid) {
    formState.valid = false
  }
  // if (field.ui.visible !== "fadeIn" && field.ui.visible !== "true") {
  //   field.ui.visible = "fadeIn"
  // }
  if (v.setFocus) {
    setTimeout(() => {
      SetFocus(formState.formType + field.fieldKey)
    }, 500)
  }
}

export const AddSummaryValidation = (
  formState: OvlFormState,
  translationKey: string,
  translationReps?: any[]
) => {
  if (
    !formState.validationResult.errors.some(
      (f) => f.translationKey.indexOf(translationKey) > -1
    )
  ) {
    translationReps = [""].concat(translationReps)
    formState.validationResult.errors.push({
      standalone: true,
      key: translationKey,
      translationKey,
      translationReps,
      displayType: "Always",
      fieldKeys: [],
    })
  }
  if (formState.valid) {
    formState.valid = false
  }
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
}

export const RemoveFieldValidation = (field: Field, key?: string) => {
  if (!key) {
    key = field.ui.labelTranslationKey
  }
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
  let res3 = res1
    .concat(res2)
    .concat(errors.filter((f) => f.displayType === "Always"))
  if (
    JSON.stringify(res3) !==
    JSON.stringify(formState.validationResult.visibleErrors)
  )
    formState.validationResult.visibleErrors = res3
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
  let valid = _isFormValid(formState)
  if (formState.valid !== valid) {
    formState.valid = valid
  }

  SetVisibleSummaryErrorKeys(formState)
}

// export const SetFormValidFromNoValidate = (formState: OvlFormState) => {
//   _setFormValid(formState)
// }

export const HasVisibleSummaryErrors = (formState: OvlFormState) => {
  return formState.validationResult.visibleErrors.length > 0
}
