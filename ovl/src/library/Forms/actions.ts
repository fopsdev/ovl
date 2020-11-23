import {
  getDateValue,
  getDecimalValue,
  resolvePath,
  stringifyReplacer,
  T,
} from "../../global/globals"
import {
  FieldGetList,
  FormChanged,
  FormValidate,
  FieldGetList_ReturnType,
  FieldGetList_Type,
  FormValidate_Type,
  FormChanged_Type,
} from "../../global/hooks"
import { OvlForm } from "../../index"
import { ColumnAlign, ListFnReturnValue } from "../Table/Table"
import { FillListControl } from "./Controls/actions"
import { ListState } from "./Controls/ListControl"
import { getFormFields } from "./helper"
import { DataType, FieldFormat, FormFields, Schema } from "./OvlFormElement"
import { GetRowFromFormState } from "./Controls/helpers"
import { OvlAction } from "../../ovlTypes"
import { getDisplayValue } from "../Table/helpers"
import { OvlTableDefIds } from "../../../../test/src"
export { FillListControl }

export type Field = {
  value: string
  convertedValue: any
  type: DataType
  list?: ListState
  dirty: boolean
  watched: boolean
  validationResult: ValidateFieldResult
  id: string
  formType: string
  formId: string
  fieldKey: string
  ui?: {
    labelTranslationKey?: string
    noLabel?: boolean
    format?: FieldFormat
    align?: ColumnAlign
    inline?: boolean
    isPassword?: boolean
    readonly?: boolean
    checkedValue?: string | boolean
  }
}

export type FieldValueMap = { [key: string]: Field }

export type ValidateFieldResultMap = {
  valid: boolean
  validationMsg: string
}

export type ValidateFieldResult = {
  // its just an array with string errors. if its empty tere are no validation errors
  errors: string[]
}

// export type ValidationFieldResults = {
//   [key: string]: ValidateFieldResult
// }

export type OvlFormState = {
  dirty: boolean
  valid: boolean
  fields: FieldValueMap
  formType: OvlForm
  formId: string
  initFields: FieldValueMap
  namespace: string
  schema: { [key: string]: Schema }
  fieldToFocus: string
  formShowed?: boolean
  tableDefId?: OvlTableDefIds
}
type FormStatePerInstance = {
  // key corresponds here to instanceId of form
  [key: string]: OvlFormState
}

export type InitForm = {
  formType: OvlForm
  instanceId: string
  fields: { [key: string]: FormFields }
  namespace?: string
  schema?: { [key: string]: Schema }
  forceOverwrite?: boolean
  initialFocusElementId?: string
  tableDefId?: OvlTableDefIds
}

export type FormsState = { [key in OvlForm]: FormStatePerInstance }

export const ResetForm: OvlAction<OvlFormState> = (value) => {
  value.dirty = false
  value.fields = JSON.parse(JSON.stringify(value.initFields, stringifyReplacer))
  value.valid = true
  value.fieldToFocus = undefined
}

export const SetFormUndirty: OvlAction<OvlFormState> = (value) => {
  value.dirty = false
  Object.keys(value.fields).forEach((e) => {
    let field = value.fields[e]
    field.dirty = false
  })
}

export const ResetFormAfterNavigation: OvlAction<OvlFormState> = (
  value,
  { state }
) => {
  state.ovl.screens.nav.formTypeToReset = value.formType
  state.ovl.screens.nav.formIdToReset = value.formId
}

export const ValidateDataType: OvlAction<ValidateFieldType> = (value) => {
  let field = value.formState.fields[value.fieldId]
  let type = field.type
  let format
  if (field.ui && field.ui.format) {
    format = field.ui.format
  }
  let val = value.newVal
  let res = value.validationResult
  // only do type validation if there is a value
  // other scenarios should be handled in the custom validation
  switch (type) {
    case "text":
      field.convertedValue = val
      //field.value = val
      break

    case "time":
      if (val) {
        val = val.replace("-", "")
        if (val.indexOf(":") < 0 && val.length > 2) {
          val = val.substring(0, 2) + ":" + val.substring(2)
        }

        let vals = val.split(":")
        // there should be 3 entries (dd,mm,yyyy) for a complete date as supported for now

        let hours: number
        let minutes: number
        if (vals.length > 1) {
          minutes = parseInt(vals[1])
          if (minutes > 59) {
            minutes = 59
          }
        }
        if (vals.length > 0) {
          hours = parseInt(vals[0])
          if (hours > 24) {
            hours = 24
          }
        }
        let newTime =
          (hours ? hours.toString().padStart(2, "0") : "00") +
          ":" +
          (minutes ? minutes.toString().padStart(2, "0") : "00")
        field.convertedValue = newTime
        field.value = newTime
      } else {
        field.convertedValue = null
        field.value = ""
        //field.value = ""
      }
      break

    case "date":
      if (val) {
        if (val.length === 10 && val.indexOf("-") > -1) {
          // looks like the well formed date select format
          field.convertedValue = val + "T00:00:00"
          field.value = getDateValue(field.convertedValue, format)
          return
        }
        let vals = val.split(".")
        // there should be 3 entries (dd,mm,yyyy) for a complete date as supported for now
        let cDate = new Date()
        let cDay = cDate.getDate()
        let cMonth = cDate.getMonth() + 1
        let cYear = cDate.getFullYear()

        let day
        let month
        let year
        if (vals.length > 2) {
          year = parseInt(vals[2])
          if (year.toString().length < 4) {
            year += 2000
          }
        }
        if (vals.length > 1) {
          month = parseInt(vals[1])
        }
        if (vals.length > 0) {
          day = parseInt(vals[0])
        }
        let newDate =
          (year ? year.toString().padStart(4, "0") : cYear.toString()) +
          "-" +
          (month
            ? month.toString().padStart(2, "0")
            : cMonth.toString().padStart(2, "0")) +
          "-" +
          (day
            ? day.toString().padStart(2, "0")
            : cDay.toString().padStart(2, "0")) +
          "T00:00:00"
        let resp = Date.parse(newDate)
        if (!resp) {
          field.convertedValue = ""
          field.value = field.value
          field.validationResult.errors.push(
            T("AppValidationInvalidDateFormat")
          )
        } else {
          field.convertedValue = newDate
          field.value = getDateValue(newDate, format)
        }
      } else {
        field.convertedValue = null
        field.value = ""
        //field.value = ""
      }
      break
    case "int": {
      if (val) {
        let parsedVal = parseInt(val)
        if (parsedVal || parsedVal === 0) {
          field.value = parsedVal.toString()

          field.convertedValue = parsedVal
        } else {
          field.validationResult.errors.push(
            T("AppValidationInvalidNumberFormat")
          )
        }
      } else {
        field.convertedValue = null
        field.value = ""
        //field.value = ""
      }
      break
    }

    case "decimal": {
      if (val) {
        let parsedVal
        if (typeof val === "string") {
          let valToParse = val.replace(/[^0-9.-]/g, "")
          parsedVal = parseFloat(valToParse)
        } else {
          parsedVal = val
        }
        if (parsedVal || parsedVal == 0) {
          if (!value.isInnerEvent) {
            field.value = getDecimalValue(parsedVal, format) //parsedVal.toString()
          }
          // we need to to that so it gets transmitted for sure as decimal. elsewise it could end up as an int for the deserialzer backend
          field.convertedValue = parsedVal
        } else {
          field.validationResult.errors.push(
            T("AppValidationInvalidNumberFormat")
          )
        }
      } else {
        field.convertedValue = null
        field.value = ""
        //field.value = ""
      }
      break
    }
  }
}

export const ValidateSchema: OvlAction<ValidateFieldType> = (value) => {
  if (value.formState.schema) {
    let validatorId = "Schema"
    let field = value.formState.fields[value.fieldId]
    let schema = value.formState.schema[value.fieldId]
    let type = field.type
    let val = value.newVal
    let res = value.validationResult
    // check for size
    if (schema) {
      if (type === "text") {
        if (value.newVal) {
          if (value.newVal.length > schema.maxLength) {
            field.validationResult.errors.push(
              "Maximum " + schema.maxLength.toString() + " chars!"
            )
            return
          }
        }
      } else {
        if (!value.newVal) {
          if (!schema.nullable) {
            field.validationResult.errors.push("Field cannot be null!")
            return
          }
        }
      }
    }
  }
}

export const ValidateList: OvlAction<ValidateFieldType> = (
  value,
  { state, actions, effects }
) => {
  let validatorId = "List"
  let field = value.formState.fields[value.fieldId]
  let namespace = value.formState.namespace
  let res = value.validationResult
  let list = field.list

  if (list.acceptEmpty && !list.acceptOnlyListValues) {
    return
  }
  if (!list.acceptEmpty && !value.newVal) {
    field.validationResult.errors.push(T("AppSelectValidValue"))
    return
  }
  if (list.acceptOnlyListValues && value.newVal) {
    // get a handy row object for FieldChanged hooks
    let fields = value.formState.fields
    let row = Object.keys(fields).reduce((val, k) => {
      val[k] = fields[k].convertedValue
      return val
    }, {})

    let functionName = FieldGetList.replace("%", value.fieldId)

    let listdata: FieldGetList_ReturnType
    let fn = resolvePath(actions.custom, namespace)
    if (fn && fn[functionName]) {
      listdata = fn[functionName](<FieldGetList_Type>{ row })
      if (
        Object.keys(listdata.data).filter((rowKey) => {
          return (
            listdata.data[rowKey][field.list.valueField].toString() ===
            value.newVal.toString()
          )
        }).length < 1
      ) {
        field.validationResult.errors.push(T("AppNeedsToBeListEntry"))
        return
      }
    }
  }
}

export const ValidateForm: OvlAction<OvlFormState> = (
  value,
  { actions, state, effects }
) => {
  // re do validations with boolean watched set to true
  value.valid = true
  Object.keys(value.fields).map((k) => {
    let field = value.fields[k]
    let oldValid = field.validationResult.errors.length === 0
    let val = field.convertedValue
    let validationFnName = FormValidate
    let namespace = value.namespace
    // field.validationResult.valid = true
    // field.validationResult.validationMsg = ""

    field.validationResult.errors = []
    actions.ovl.internal.TouchField({ fieldId: k, formState: value })

    actions.ovl.internal.ValidateDataType({
      fieldId: k,
      oldVal: val,
      newVal: val,
      formState: value,
      validationResult: field.validationResult,
    } as ValidateFieldType)

    let fn = resolvePath(actions.custom, namespace)

    if (field.validationResult.errors.length === 0) {
      actions.ovl.internal.ValidateSchema({
        fieldId: k,
        oldVal: val,
        newVal: val,
        formState: value,
        validationResult: field.validationResult,
      } as ValidateFieldType)

      if (field.validationResult.errors.length === 0) {
        if (field.list) {
          actions.ovl.internal.ValidateList({
            fieldId: k,
            oldVal: val,
            newVal: val,
            formState: value,
            validationResult: field.validationResult,
          } as ValidateFieldType)
        }
        if (field.validationResult.errors.length === 0) {
          if (fn && fn[validationFnName]) {
            fn[validationFnName](<FormValidate_Type>{
              fieldId: k,
              oldVal: val,
              newVal: field.convertedValue,
              formState: value,
              validationResult: field.validationResult,
            })
          }
        }
      }
    }
    if (!oldValid && field.validationResult.errors.length === 0) {
      if (fn && fn[FormChanged]) {
        fn[FormChanged](<FormChanged_Type>{
          fieldId: k,
          formState: value,
          oldConvertedVal: val,
          newConvertedVal: val,
        })
      }
    }
  })
  actions.ovl.internal.SetFormValid(value)
}

export const InitForm: OvlAction<InitForm> = (
  value,
  { state, actions, effects }
) => {
  if (!state.ovl.forms) {
    //@ts-ignore
    state.ovl.forms = {}
  }
  let formInstanceList = state.ovl.forms[value.formType]
  if (!formInstanceList) {
    state.ovl.forms[value.formType] = {}
    formInstanceList = state.ovl.forms[value.formType]
  }
  // if there is already a formstate -> do nothing (except its forceOverwrite)
  if (!formInstanceList[value.instanceId] || value.forceOverwrite === true) {
    let fields: FieldValueMap = getFormFields(
      value.schema,
      value.fields,
      value.instanceId,
      value.formType
    )

    formInstanceList[value.instanceId] = {
      dirty: false,
      valid: true,
      fields,
      initFields: {},
      formId: value.instanceId,
      formType: value.formType,
      namespace: value.namespace,
      schema: value.schema,
      fieldToFocus: value.initialFocusElementId,
      tableDefId: value.tableDefId,
    }

    let formState = formInstanceList[value.instanceId]

    //formState.lastTouchedField = value.initialFocusElementId
    // initial validation of all fields
    let fn = resolvePath(actions.custom, formState.namespace)
    Object.keys(formState.fields).forEach((k) => {
      let fieldValue = formState.fields[k]
      fieldValue.validationResult = {
        errors: [],
      }
      let newVal = fieldValue.value
      let oldVal = fieldValue.value
      actions.ovl.internal.ValidateDataType({
        fieldId: k,
        oldVal: oldVal,
        newVal: newVal,
        formState,
        validationResult: fieldValue.validationResult,
      } as ValidateFieldType)
      if (fieldValue.validationResult.errors.length === 0) {
        actions.ovl.internal.ValidateSchema({
          fieldId: k,
          oldVal: oldVal,
          newVal: newVal,
          formState,
          validationResult: fieldValue.validationResult,
        } as ValidateFieldType)
        if (fieldValue.validationResult.errors.length === 0) {
          if (fieldValue.list) {
            actions.ovl.internal.ValidateList({
              fieldId: k,
              oldVal: oldVal,
              newVal: newVal,
              formState,
              validationResult: fieldValue.validationResult,
            } as ValidateFieldType)
          }
          if (fieldValue.validationResult.errors.length === 0) {
            if (fn && fn[FormValidate]) {
              fn[FormValidate](<FormValidate_Type>{
                fieldId: k,
                formState,
                newVal: newVal,
                oldVal: oldVal,
                validationResult: fieldValue.validationResult,
              })
            }
          }
        }
      }
    })
    actions.ovl.internal.SetFormValid(formState)
    // save a copy of validationresults (as well of fields, see json(..) above)
    // because when resetting the form, this should be inital state and there will be no re-initing
    formState.initFields = JSON.parse(JSON.stringify(fields), stringifyReplacer)
  }
  formInstanceList[value.instanceId].formShowed = false
  if (!formInstanceList[value.instanceId].fieldToFocus) {
    formInstanceList[value.instanceId].fieldToFocus =
      value.initialFocusElementId
  }
}

// remove not used yet. think its better to always  call ResetForm so state can be reused
// and its not so easy to determine when aform state really can be removed (animation fadeOut, close, visible)
// export type RemoveForm = {
//   formType: FormType
//   instanceId: string
// }

// export const RemoveForm: OvlAction<RemoveForm> = ({ state }, value) => {
//   let formInstanceList = state.ovl.forms[value.formType]
//   if (formInstanceList) {
//     delete formInstanceList[value.instanceId]
//   }
// }

export type ValidateFieldType = {
  fieldId: string
  validationResult: ValidateFieldResult
  oldVal: any
  newVal: any
  correctedValue: any
  formState: OvlFormState
  isInnerEvent: boolean
}

export type ChangeField = {
  formState: OvlFormState
  fieldId: string
  value: any
  isInit?: boolean
  isInnerEvent?: boolean
}

export type FieldChanged = {
  formState: OvlFormState
  fieldId: string
  newConvertedVal: string
  oldConvertedVal: string
  row: any
  isInnerEvent?: boolean
}

export type TouchField = {
  formState: OvlFormState
  fieldId: string
}

export const TouchField: OvlAction<TouchField> = (value) => {
  let field = value.formState.fields[value.fieldId]

  field.value = getDisplayValue(
    field.fieldKey,
    { ui: field.ui, list: field.list, type: field.type },
    GetRowFromFormState(value.formState),
    value.formState.namespace
  )

  field.watched = true
  value.formState.fieldToFocus = value.fieldId
}

export const SetField: OvlAction<ChangeField> = (value, { actions }) => {
  // purpose of setfield is to use it in custom chagedactions to set other fields values without triggering the full validation (just the warning)
  let field = value.formState.fields[value.fieldId]
  field.dirty = false

  actions.ovl.internal.ChangeField(value)
}

export const ChangeField: OvlAction<ChangeField> = (
  value,
  { actions, state, effects }
) => {
  let field = value.formState.fields[value.fieldId]
  let oldConvertedVal = field.convertedValue

  field.validationResult.errors = []
  field.watched = !value.isInit
  let newVal = value.value
  let namespace = value.formState.namespace
  field.value = newVal
  let fn = resolvePath(actions.custom, namespace)

  actions.ovl.internal.ValidateDataType({
    fieldId: value.fieldId,
    oldVal: oldConvertedVal,
    newVal: newVal,
    formState: value.formState,
    validationResult: field.validationResult,
    isInnerEvent: value.isInnerEvent,
  } as ValidateFieldType)

  if (field.validationResult.errors.length === 0) {
    actions.ovl.internal.ValidateSchema({
      fieldId: value.fieldId,
      oldVal: oldConvertedVal,
      newVal: field.value,
      formState: value.formState,
      validationResult: field.validationResult,
    } as ValidateFieldType)

    if (field.validationResult.errors.length === 0) {
      if (field.list) {
        actions.ovl.internal.ValidateList({
          fieldId: value.fieldId,
          oldVal: oldConvertedVal,
          newVal: field.value,
          formState: value.formState,
          validationResult: field.validationResult,
        } as ValidateFieldType)
      }
      if (field.validationResult.errors.length === 0) {
        let validationFnName = "FormValidate"
        if (fn && fn[validationFnName]) {
          let val: FormValidate_Type = {
            fieldId: value.fieldId,
            oldVal: oldConvertedVal,
            newVal: field.value,
            formState: value.formState,
            validationResult: field.validationResult,
            isInnerEvent: value.isInnerEvent,
            correctedValue: undefined,
          }
          fn[validationFnName](val)
          if (val.validationResult.errors.length === 0 && val.correctedValue) {
            field.convertedValue = val.correctedValue
          }
        }
      }
    }
  }

  if (field.convertedValue !== oldConvertedVal) {
    field.dirty = !value.isInit
    if (!value.formState.dirty) {
      value.formState.dirty = !value.isInit
    }
  }

  if (
    oldConvertedVal !== field.convertedValue &&
    field.validationResult.errors.length === 0
  ) {
    if (fn && fn[FormChanged]) {
      fn[FormChanged](<FormChanged_Type>{
        fieldId: value.fieldId,
        formState: value.formState,
        oldConvertedVal: oldConvertedVal,
        newConvertedVal: value.formState.fields[value.fieldId].convertedValue,
        row: GetRowFromFormState(value.formState),
      })
    }
  }

  actions.ovl.internal.SetFormValid(value.formState)
}

export const SetFormValid: OvlAction<OvlFormState> = (value) => {
  value.valid = !Object.keys(value.fields).some(
    (k) => value.fields[k].validationResult.errors.length !== 0
  )
}

export const GetFormValidationErrors = (formState: OvlFormState): string[] => {
  let res: string[] = []
  Object.keys(formState.fields).map((k) => {
    let field = formState.fields[k]
    res = res.concat(field.validationResult.errors)
  })
  return res
}
