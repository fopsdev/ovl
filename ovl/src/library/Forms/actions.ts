import { Action } from "overmind"
import { DataType, FieldFormat, Schema, FormFields } from "./OvlFormElement"
import {
  getDecimalValue,
  getDateValue,
  resolvePath,
} from "../../global/globals"
import { FillListControl } from "./Controls/actions"
import { ListState } from "./Controls/ListControl"
import { customFunctions, FormType } from "../../index"
import { ListFnReturnValue, ColumnAlign } from "../Table/Table"
import { getFormFields, ValidationAddError } from "./helper"
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
    useFieldKeyForLabel?: boolean
    format?: FieldFormat
    align?: ColumnAlign
    inline?: boolean
    isPassword?: boolean
    readonly?: boolean
  }
}

export type FieldValueMap = { [key: string]: Field }

export type ValidateFieldResultMap = {
  valid: boolean
  validationMsg: string
}

export type ValidateFieldResult = {
  // the error to display is here
  valid: boolean
  validationMsg: string
  // in validations we can find all errors
  validations: { [key: string]: ValidateFieldResultMap }
}

// export type ValidationFieldResults = {
//   [key: string]: ValidateFieldResult
// }

export type FormState = {
  dirty: boolean
  valid: boolean
  fields: FieldValueMap
  formType: FormType
  formId: string
  initFields: FieldValueMap
  validationFnName: string
  changedFnName: string
  namespace: string
  schema: { [key: string]: Schema }
  lastTouchedField: string
}
type FormStatePerInstance = {
  // key corresponds here to instanceId of form
  [key: string]: FormState
}

export type InitForm = {
  formType: FormType
  instanceId: string
  fields: { [key: string]: FormFields }
  validationFnName?: string
  changedFnName?: string
  namespace?: string
  schema?: { [key: string]: Schema }
  forceOverwrite?: boolean
}

export type FormsState = { [key in FormType]: FormStatePerInstance }

export const ResetForm: Action<FormState> = (_, value) => {
  value.dirty = false
  value.fields = JSON.parse(JSON.stringify(value.initFields))
  value.valid = true
  value.lastTouchedField = undefined
}

export const SetFormUndirty: Action<FormState> = (_, value) => {
  value.dirty = false
  Object.keys(value.fields).forEach((e) => {
    let field = value.fields[e]
    field.dirty = false
  })
}

export const ResetFormAfterNavigation: Action<FormState> = (
  { state },
  value
) => {
  state.ovl.screens.nav.formTypeToReset = value.formType
  state.ovl.screens.nav.formIdToReset = value.formId
}

export const ValidateDataType: Action<ValidateField> = (_, value) => {
  let validatorId = "DataType"
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
          ValidationAddError(validatorId, "invalid date format", res)
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
        if (parsedVal) {
          field.value = parsedVal.toString()

          field.convertedValue = parsedVal
        } else {
          ValidationAddError(validatorId, "invalid number format", res)
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
          let valToParse = val.replace(/[^0-9.]/g, "")
          parsedVal = parseFloat(valToParse)
        } else {
          parsedVal = val
        }
        if (parsedVal || parsedVal == 0) {
          field.value = getDecimalValue(parsedVal, format) //parsedVal.toString()
          // we need to to that so it gets transmitted for sure as decimal. elsewise it could end up as an int for the deserialzer backend
          field.convertedValue =
            Math.round(parsedVal * 1000000) / 1000000 + 0.0000001
        } else {
          ValidationAddError(validatorId, "invalid number format", res)
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

export const ValidateSchema: Action<ValidateField> = (_, value) => {
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
            ValidationAddError(
              validatorId,
              "Maximum " + schema.maxLength.toString() + " chars!",
              res
            )
            return
          }
        }
      } else {
        if (!value.newVal) {
          if (!schema.nullable) {
            ValidationAddError(validatorId, "Field cannot be null!", res)
            return
          }
        }
      }
    }
  }
}

export const ValidateList: Action<ValidateField> = (
  { state, actions, effects },
  value
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
    ValidationAddError(validatorId, "Field cannot be empty", res)
    return
  }
  if (list.acceptOnlyListValues && value.newVal) {
    // get a handy row object for FieldChanged hooks
    let fields = value.formState.fields
    let row = Object.keys(fields).reduce((val, k) => {
      val[k] = fields[k].convertedValue
      return val
    }, {})

    let functionName = value.fieldId + "GetListFn"

    let listdata: ListFnReturnValue
    let fn = resolvePath(customFunctions, namespace)
    if (fn && fn[functionName]) {
      listdata = fn[functionName](row, state, actions, effects)
      if (
        Object.keys(listdata.data).filter(
          (rowKey) => rowKey.toString() === value.newVal.toString()
        ).length < 1
      ) {
        ValidationAddError(validatorId, "Needs to be a list entry", res)
        return
      }
    }
  }
}

export const ValidateForm: Action<FormState> = (
  { actions, state, effects },
  value
) => {
  // re do validations with boolean watched set to true
  value.valid = true
  Object.keys(value.fields).map((k) => {
    let field = value.fields[k]
    let oldValid = field.validationResult.valid
    let val = field.convertedValue
    let validationFnName = value.validationFnName
    let namespace = value.namespace
    field.validationResult.valid = true
    field.validationResult.validationMsg = ""
    field.validationResult.validations = {}
    actions.ovl.internal.TouchField({ fieldId: k, formState: value })

    actions.ovl.internal.ValidateDataType({
      fieldId: k,
      oldVal: val,
      newVal: val,
      formState: value,
      validationResult: field.validationResult,
    } as ValidateField)
    let fn = resolvePath(customFunctions, namespace)

    if (field.validationResult.valid) {
      actions.ovl.internal.ValidateSchema({
        fieldId: k,
        oldVal: val,
        newVal: val,
        formState: value,
        validationResult: field.validationResult,
      } as ValidateField)

      if (field.validationResult.valid) {
        if (field.list) {
          actions.ovl.internal.ValidateList({
            fieldId: k,
            oldVal: val,
            newVal: val,
            formState: value,
            validationResult: field.validationResult,
          } as ValidateField)
        }
        if (field.validationResult.valid) {
          if (fn && fn[validationFnName]) {
            fn[validationFnName](
              {
                fieldId: k,
                oldVal: val,
                newVal: field.value,
                formState: value,
                validationResult: field.validationResult,
              },
              state,
              actions,
              effects
            )
          }
        }
      }
    }
    if (!oldValid && field.validationResult.valid) {
      if (fn && fn[value.changedFnName]) {
        fn[value.changedFnName](
          {
            fieldId: k,
            formState: value,
            oldConvertedVal: val,
            newConvertedVal: val,
          } as FieldChanged,
          state,
          actions,
          effects
        )
      }
    }
  })
  actions.ovl.internal.SetFormValid(value)
}

export const InitForm: Action<InitForm> = (
  { state, actions, effects },
  value
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
      validationFnName: value.validationFnName,
      changedFnName: value.changedFnName,
      namespace: value.namespace,
      schema: value.schema,
      lastTouchedField: undefined,
    }
    let formState = formInstanceList[value.instanceId]

    // initial validation of all fields
    let fn = resolvePath(customFunctions, formState.namespace)
    Object.keys(formState.fields).forEach((k) => {
      let fieldValue = formState.fields[k]
      fieldValue.validationResult = {
        valid: true,
        validationMsg: "",
        validations: {},
      }
      let newVal = fieldValue.value
      let oldVal = fieldValue.value
      actions.ovl.internal.ValidateDataType({
        fieldId: k,
        oldVal: oldVal,
        newVal: newVal,
        formState,
        validationResult: fieldValue.validationResult,
      } as ValidateField)
      if (fieldValue.validationResult.valid) {
        actions.ovl.internal.ValidateSchema({
          fieldId: k,
          oldVal: oldVal,
          newVal: newVal,
          formState,
          validationResult: fieldValue.validationResult,
        } as ValidateField)
        if (fieldValue.validationResult.valid) {
          if (fieldValue.list) {
            actions.ovl.internal.ValidateList({
              fieldId: k,
              oldVal: oldVal,
              newVal: newVal,
              formState,
              validationResult: fieldValue.validationResult,
            } as ValidateField)
          }
          if (fieldValue.validationResult.valid) {
            if (fn && fn[value.validationFnName]) {
              fn[value.validationFnName](
                {
                  fieldId: k,
                  formState,
                  newVal: newVal,
                  oldVal: oldVal,
                  validationResult: fieldValue.validationResult,
                } as ValidateField,
                state,
                actions,
                effects
              )
            }
          }
        }
      }
    })
    actions.ovl.internal.SetFormValid(formState)
    // save a copy of validationresults (as well of fields, see json(..) above)
    // because when resetting the form, this should be inital state and there will be no re-initing
    formState.initFields = JSON.parse(JSON.stringify(fields))
  }
}

// remove not used yet. think its better to always  call ResetForm so state can be reused
// and its not so easy to determine when aform state really can be removed (animation fadeOut, close, visible)
// export type RemoveForm = {
//   formType: FormType
//   instanceId: string
// }

// export const RemoveForm: Action<RemoveForm> = ({ state }, value) => {
//   let formInstanceList = state.ovl.forms[value.formType]
//   if (formInstanceList) {
//     delete formInstanceList[value.instanceId]
//   }
// }

export type ValidateField = {
  fieldId: string
  validationResult: ValidateFieldResult
  oldVal: string
  newVal: string
  formState: FormState
}

export type ChangeField = {
  formState: FormState
  fieldId: string
  value: any
  isInit?: boolean
}

export type FieldChanged = {
  formState: FormState
  fieldId: string
  newConvertedVal: string
  oldConvertedVal: string
  row: { [key: string]: {} }
}

export type TouchField = {
  formState: FormState
  fieldId: string
}

export const TouchField: Action<TouchField> = (_, value) => {
  value.formState.fields[value.fieldId].watched = true
  value.formState.lastTouchedField = value.fieldId
}

export const SetField: Action<ChangeField> = ({ actions }, value) => {
  // purpose of setfield is to use it in custom chagedactions to set other fields values without triggering the full validation (just the warning)
  let field = value.formState.fields[value.fieldId]
  field.dirty = false
  value.isInit = true
  actions.ovl.internal.ChangeField(value)
}

export const ChangeField: Action<ChangeField> = (
  { actions, state, effects },
  value
) => {
  let field = value.formState.fields[value.fieldId]

  let oldConvertedVal = field.convertedValue
  field.validationResult.valid = true
  field.validationResult.validationMsg = ""
  field.validationResult.validations = {}
  field.watched = !value.isInit
  let newVal = value.value
  let namespace = value.formState.namespace

  field.value = newVal
  actions.ovl.internal.ValidateDataType({
    fieldId: value.fieldId,
    oldVal: oldConvertedVal,
    newVal: newVal,
    formState: value.formState,
    validationResult: field.validationResult,
  } as ValidateField)

  let fn = resolvePath(customFunctions, namespace)
  if (field.validationResult.valid) {
    actions.ovl.internal.ValidateSchema({
      fieldId: value.fieldId,
      oldVal: oldConvertedVal,
      newVal: field.value,
      formState: value.formState,
      validationResult: field.validationResult,
    } as ValidateField)

    if (field.validationResult.valid) {
      if (field.list) {
        actions.ovl.internal.ValidateList({
          fieldId: value.fieldId,
          oldVal: oldConvertedVal,
          newVal: field.value,
          formState: value.formState,
          validationResult: field.validationResult,
        } as ValidateField)
      }
      if (field.validationResult.valid) {
        let validationFnName = value.formState.validationFnName
        if (fn && fn[validationFnName]) {
          fn[validationFnName](
            {
              fieldId: value.fieldId,
              oldVal: oldConvertedVal,
              newVal: field.value,
              formState: value.formState,
              validationResult: field.validationResult,
            },
            state,
            actions,
            effects
          )
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
    field.validationResult.valid
  ) {
    if (fn && fn[value.formState.changedFnName]) {
      fn[value.formState.changedFnName](
        {
          fieldId: value.fieldId,
          formState: value.formState,
          oldConvertedVal: oldConvertedVal,
          newConvertedVal: value.formState.fields[value.fieldId].convertedValue,
        } as FieldChanged,
        state,
        actions,
        effects
      )
    }
  }

  actions.ovl.internal.SetFormValid(value.formState)
}

export const SetFormValid: Action<FormState> = ({ actions }, value) => {
  value.valid = !Object.keys(value.fields).some(
    (k) => value.fields[k].validationResult.valid === false
  )
}

export const GetFormValidationErrors = (formState: FormState): string[] => {
  let res: string[] = []
  Object.keys(formState.fields).map((k) => {
    let field = formState.fields[k]
    if (!field.validationResult.valid && field.validationResult.validationMsg) {
      res.push(field.validationResult.validationMsg)
    }
  })
  return res
}
