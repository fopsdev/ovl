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
  FieldGetFilteredList,
  FieldGetFilteredList_Type,
  ViewRowCellClass_ReturnType,
  ViewRowCellClass_Type,
  ViewHeaderCellClass_Type,
  ViewRowClass_ReturnType,
} from "../../global/hooks"
import { OvlActions, OvlForm, OvlState } from "../../index"
import {
  ColumnAlign,
  ColumnDisplayDef,
  DisplayMode,
  ListDefinition,
  OvlTableDef,
  ViewRowClassContent,
} from "../Table/Table"
import { FillListControl } from "./Controls/actions"
import { ListState } from "./Controls/ListControl"
import { getFormFields } from "./helper"
import { DataType, FieldFormat, FormField, Schema } from "./OvlFormElement"
import {
  getColumnDefsFromFormState,
  GetRowFromFormState,
} from "./Controls/helpers"
import { OvlAction } from "../../index"
import { getDisplayValue, getFormFieldsFromColumns } from "../Table/helpers"
import { OvlTableDefIds } from "../../index"
import {
  AddValidation,
  FieldValidationDisplayType,
  FieldValidationType,
  SummaryValidationDisplayType,
} from "./validators"
export { FillListControl }

export type Field = {
  value: string
  convertedValue: any
  type: DataType
  list?: ListState
  dirty: boolean
  watched: boolean
  hasFocus?: boolean
  validationResult: ValidateResult
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
    useSpellcheck?: boolean
    autocomplete?: boolean
    visible?: "true" | "false" | "fadeIn" | "fadeOut" | "fadeOutHide"
  }
  previousConvertedValue: any
}

export type FieldValueMap = { [key: string]: Field }

export type ValidateResultErrors = {
  key: string
  reps?: string[]
  displayType: FieldValidationDisplayType
}

export type ValidateResultSummaryErrors = {
  key: string
  reps?: string[]
  displayType: SummaryValidationDisplayType
}
export type ValidateResult = {
  // its just an array
  errors: ValidateResultErrors[]
}

export type ValidateSummaryResult = {
  // its just an array
  visibleErrors: ValidateResultSummaryErrors[]
  errors: ValidateResultSummaryErrors[]
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
  validationResult?: ValidateSummaryResult
  formShowed?: boolean
  tableDefId?: OvlTableDefIds
  viewRowCell?: ViewRowClassContent
  viewHeaderCell?: ViewRowClassContent
  isInline?: boolean
  row?: any
  builtInValidationDisplay?: {
    DataTypeValidation: {
      fieldDisplayType: FieldValidationDisplayType
      summary?: {
        displayType: SummaryValidationDisplayType
        displayInSummaryAndOutlineRelatedFields?: boolean
      }
    }
    SchemaValidation: {
      fieldDisplayType: FieldValidationDisplayType
      summary?: {
        displayType: SummaryValidationDisplayType
        displayInSummaryAndOutlineRelatedFields?: boolean
      }
    }
    ListValidation: {
      fieldDisplayType: FieldValidationDisplayType
      summary?: {
        displayType: SummaryValidationDisplayType
        displayInSummaryAndOutlineRelatedFields?: boolean
      }
    }
  }
}
type FormStatePerInstance = {
  // key corresponds here to instanceId of form
  [key: string]: OvlFormState
}

export type InitForm = {
  formType: OvlForm
  instanceId?: string
  fields: { [key: string]: FormField }
  namespace?: string
  schema?: { [key: string]: Schema }
  forceOverwrite?: boolean
  initialFocusFieldKey?: string
  tableDefId?: OvlTableDefIds
  isInline?: boolean
  row?: any
}

export type FormsState = { [key in OvlForm]: FormStatePerInstance }

export const ResetForm: OvlAction<OvlFormState> = (value) => {
  value.dirty = false
  value.fields = JSON.parse(JSON.stringify(value.initFields, stringifyReplacer))
  value.valid = true
  value.validationResult = { errors: [], visibleErrors: [] }
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
  let field = value.formState.fields[value.fieldKey]
  let type = field.type
  let format
  if (field.ui.format) {
    format = field.ui.format
  }
  let val = value.newVal
  let res = value.validationResult
  // only do type validation if there is a value
  // other scenarios should be handled in the custom validation
  let v = value.formState.builtInValidationDisplay.DataTypeValidation
  let summary
  if (v.summary) {
    summary = {
      displayInSummaryAndOutlineRelatedFields:
        v.summary.displayInSummaryAndOutlineRelatedFields,
      displayCond: v.summary.displayType,
    }
  }
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
      if (value.isInnerEvent) {
        field.value = val
      } else {
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
            AddValidation({
              field: {
                field,
                displayCond: v.fieldDisplayType,
              },
              summary,
              textCode: { key: "AppValidationInvalidDateFormat" },
            })
          } else {
            field.convertedValue = newDate

            field.value = getDateValue(newDate, format)
          }
        } else {
          field.convertedValue = null
          field.value = ""
          //field.value = ""
        }
      }
      break
    case "int": {
      if (val) {
        let parsedVal = parseInt(val)
        if (parsedVal || parsedVal === 0) {
          field.value = parsedVal.toString()

          field.convertedValue = parsedVal
        } else {
          AddValidation({
            field: {
              field,
              displayCond: v.fieldDisplayType,
            },
            summary,
            textCode: { key: "AppValidationInvalidNumberFormat" },
          })
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
            // as long as we are entering the value digit by digit we don't like formatting
            field.value = getDecimalValue(parsedVal, format) //parsedVal.toString()
          }
          field.convertedValue = parsedVal
        } else {
          AddValidation({
            field: {
              field,
              displayCond: v.fieldDisplayType,
            },
            summary,
            textCode: { key: "AppValidationInvalidNumberFormat" },
          })
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
    let field = value.formState.fields[value.fieldKey]
    let schema = value.formState.schema[value.fieldKey]
    let type = field.type
    let val = value.newVal
    let res = value.validationResult
    // check for size

    if (schema) {
      let v = value.formState.builtInValidationDisplay.SchemaValidation
      let summary
      if (v.summary) {
        summary = {
          displayInSummaryAndOutlineRelatedFields:
            v.summary.displayInSummaryAndOutlineRelatedFields,
          displayCond: v.summary.displayType,
        }
      }

      if (type === "text") {
        if (value.newVal) {
          if (value.newVal.length > schema.maxLength) {
            AddValidation({
              field: {
                field,
                displayCond: v.fieldDisplayType,
              },
              summary,
              textCode: {
                key: "AppValidationSchemaMaxChars",
                reps: [schema.maxLength.toString()],
              },
            })
            return
          }
        }
      } else {
        if (!value.newVal) {
          if (!schema.nullable) {
            AddValidation({
              field: {
                field,
                displayCond: v.fieldDisplayType,
              },
              summary,
              textCode: {
                key: "AppValidationSchemaNotNull",
              },
            })
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
  let field = value.formState.fields[value.fieldKey]
  let namespace = value.formState.namespace
  let res = value.validationResult
  let list = field.list
  if (list.acceptEmpty && !list.acceptOnlyListValues) {
    return
  }
  let v = value.formState.builtInValidationDisplay.ListValidation
  let summary
  if (v.summary) {
    summary = {
      displayInSummaryAndOutlineRelatedFields:
        v.summary.displayInSummaryAndOutlineRelatedFields,
      displayCond: v.summary.displayType,
    }
  }

  if (!list.acceptEmpty && !value.newVal) {
    AddValidation({
      field: {
        field,
        displayCond: v.fieldDisplayType,
      },
      summary,
      textCode: {
        key: "AppValidationListNotEmpty",
      },
    })

    return
  }
  if (list.acceptOnlyListValues && value.newVal) {
    // get a handy row object for FieldChanged hooks
    let fields = value.formState.fields
    let row = Object.keys(fields).reduce((val, k) => {
      val[k] = fields[k].convertedValue
      return val
    }, {})

    let functionName = FieldGetList.replace("%", value.fieldKey)

    let listdata: FieldGetList_ReturnType
    let fn = resolvePath(actions.custom, namespace)
    if (fn && fn[functionName]) {
      listdata = fn[functionName](<FieldGetList_Type>{ row })
      let filteredKeys = Object.keys(listdata.data)
      if (listdata) {
        functionName = FieldGetFilteredList.replace("%", value.fieldKey)
        if (fn[functionName]) {
          filteredKeys = fn[functionName](<FieldGetFilteredList_Type>{
            list: listdata,
            formState: value.formState,
          })
        }
      }

      if (
        filteredKeys.filter((rowKey) => {
          return (
            listdata.data[rowKey][field.list.valueField].toString() ===
            value.newVal.toString()
          )
        }).length < 1
      ) {
        AddValidation({
          field: {
            field,
            displayCond: v.fieldDisplayType,
          },
          summary,
          textCode: {
            key: "AppValidationListNeedsToBeEntry",
          },
        })
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
      fieldKey: k,
      oldVal: val,
      newVal: val,
      formState: value,
      validationResult: field.validationResult,
    } as ValidateFieldType)

    let fn = resolvePath(actions.custom, namespace)

    if (field.validationResult.errors.length === 0) {
      actions.ovl.internal.ValidateSchema({
        fieldKey: k,
        oldVal: val,
        newVal: val,
        formState: value,
        validationResult: field.validationResult,
      } as ValidateFieldType)

      if (field.validationResult.errors.length === 0) {
        if (field.list) {
          actions.ovl.internal.ValidateList({
            fieldKey: k,
            oldVal: val,
            newVal: val,
            formState: value,
            validationResult: field.validationResult,
          } as ValidateFieldType)
        }
        if (field.validationResult.errors.length === 0) {
          if (fn && fn[validationFnName]) {
            fn[validationFnName](<FormValidate_Type>{
              fieldKey: k,
              oldVal: field.previousConvertedValue,
              newVal: field.convertedValue,
              formState: value,
              validationResult: field.validationResult,
              isInnerEvent: false,
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
          oldConvertedVal: field.previousConvertedValue,
          newConvertedVal: field.convertedValue,
          isInnerEvent: false,
        })
      }
    }
  })
  //actions.ovl.internal.SetFormValid(value)
}

export const InitForm: OvlAction<InitForm> = (
  value,
  { state, actions, effects }
) => {
  if (!state.ovl.forms) {
    //@ts-ignore
    state.ovl.forms = {}
  }
  let instanceId = value.instanceId
  if (!instanceId) {
    instanceId = value.formType
  }
  let namespace = value.namespace
  if (!namespace) {
    namespace = value.formType
  }
  let formInstanceList = state.ovl.forms[value.formType]
  if (!formInstanceList) {
    state.ovl.forms[value.formType] = {}
    formInstanceList = state.ovl.forms[value.formType]
  }
  // if there is already a formstate -> do nothing (except its forceOverwrite)
  if (!formInstanceList[instanceId] || value.forceOverwrite === true) {
    let fields: FieldValueMap = getFormFields(
      value.schema,
      value.fields,
      instanceId,
      value.formType,
      namespace
    )

    formInstanceList[instanceId] = {
      dirty: false,
      valid: true,
      fields,
      initFields: {},
      formId: instanceId,
      formType: value.formType,
      namespace: namespace,
      schema: value.schema,
      fieldToFocus: value.initialFocusFieldKey,
      tableDefId: value.tableDefId,
    }

    let formState = formInstanceList[instanceId]
    //<defaults>
    if (formState.validationResult === undefined) {
      formState.validationResult = { errors: [], visibleErrors: [] }
    }

    if (formState.builtInValidationDisplay === undefined) {
      formState.builtInValidationDisplay = {
        DataTypeValidation: {
          fieldDisplayType: "WhenTouched",
        },
        SchemaValidation: {
          fieldDisplayType: "WhenTouched",
        },
        ListValidation: {
          fieldDisplayType: "WhenTouched",
        },
      }
    }
    //</defaults>

    //formState.lastTouchedField = value.initialFocusElementId
    // initial validation of all fields
    let fn = resolvePath(actions.custom, namespace)
    Object.keys(formState.fields).forEach((k) => {
      let fieldValue = formState.fields[k]
      fieldValue.validationResult = {
        errors: [],
      }
      let newVal = fieldValue.value
      let oldVal = fieldValue.value
      actions.ovl.internal.ValidateDataType({
        fieldKey: k,
        oldVal: oldVal,
        newVal: newVal,
        formState,
        validationResult: fieldValue.validationResult,
      } as ValidateFieldType)
      if (fieldValue.validationResult.errors.length === 0) {
        actions.ovl.internal.ValidateSchema({
          fieldKey: k,
          oldVal: oldVal,
          newVal: newVal,
          formState,
          validationResult: fieldValue.validationResult,
        } as ValidateFieldType)
        if (fieldValue.validationResult.errors.length === 0) {
          if (fieldValue.list) {
            actions.ovl.internal.ValidateList({
              fieldKey: k,
              oldVal: oldVal,
              newVal: newVal,
              formState,
              validationResult: fieldValue.validationResult,
            } as ValidateFieldType)
          }
          if (fieldValue.validationResult.errors.length === 0) {
            if (fn && fn[FormValidate]) {
              fn[FormValidate](<FormValidate_Type>{
                fieldKey: k,
                formState,
                newVal: fieldValue.convertedValue,
                oldVal: fieldValue.previousConvertedValue,
                validationResult: fieldValue.validationResult,
                isInnerEvent: false,
              })
            }
          }
        }
      }
    })
    SetRowCellInformation(formState, actions, state)
    //actions.ovl.internal.SetFormValid(formState)
    // save a copy of validationresults (as well of fields, see json(..) above)
    // because when resetting the form, this should be inital state and there will be no re-initing
    formState.initFields = JSON.parse(JSON.stringify(fields), stringifyReplacer)
  }
  formInstanceList[instanceId].formShowed = false
  if (!formInstanceList[instanceId].fieldToFocus) {
    formInstanceList[instanceId].fieldToFocus = value.initialFocusFieldKey
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
  fieldKey: string
  validationResult: ValidateResult
  oldVal: any
  newVal: any
  correctedValue: any
  formState: OvlFormState
  isInnerEvent: boolean
}

export type ChangeField = {
  formState: OvlFormState
  fieldKey: string
  value: any
  // if initilised touched and dirty should not be set
  isInit?: boolean
  // if innerEvent then just shortcircuit some validation and just do value update (textbox char entry -> every key gets recorded -> keeps state in value but not convertedValue)
  // this also means if innerevent is false then for sure the diting is done and lost focus
  isInnerEvent?: boolean
  // the submitted value is already the finished converted and user checked value
  // so no validation will happen and eventually the form valid will be set to true
  isConvertedValue?: boolean
}

export type SetField = {
  formState: OvlFormState
  fieldKey: string
  convertedValue: any
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

export type FocusField = {
  formState: OvlFormState
  fieldId: string
  hasFocus: boolean
}

export const FocusField: OvlAction<FocusField> = (value) => {
  let field = value.formState.fields[value.fieldId]
  field.hasFocus = value.hasFocus

  if (value.hasFocus) {
    // remember previous convertedvalue
    field.previousConvertedValue = field.convertedValue
  }
}

export const TouchField: OvlAction<TouchField> = (value) => {
  let field = value.formState.fields[value.fieldId]
  field.watched = true
  value.formState.fieldToFocus = value.fieldId
}

export const SetField: OvlAction<SetField> = (value, { actions }) => {
  actions.ovl.internal.ChangeField({
    fieldKey: value.fieldKey,
    formState: value.formState,
    value: value.convertedValue,
    isConvertedValue: true,
  })
}

// this method is just used to get the tooltips and custom class names when in form-context
export const SetRowCellInformation = (
  formState: OvlFormState,
  actions: OvlActions,
  state: OvlState
) => {
  let columns: { [key: string]: ColumnDisplayDef } = getColumnDefsFromFormState(
    formState
  ) //Object.keys(
  //   formState.fields
  // ).reduce((val, k, i) => {
  //   let field = formState.fields[k]
  //   val[k] = {
  //     ui: { format: field.ui.format },
  //     type: field.type,
  //     list: field.list,
  //   }
  //   return val[k]
  // }, {})

  let isMobile = state.ovl.uiState.isMobile
  let displayMode: DisplayMode = formState.isInline ? "EditInline" : "Edit"

  let resolveFn = resolvePath(actions.custom, formState.namespace)
  if (resolveFn && resolveFn["ViewRowCellClass"]) {
    let viewRowCellParams: ViewRowCellClass_Type = {
      columns,
      displayMode,
      isMobile,
      row: GetRowFromFormState(formState),
      namespace: formState.namespace,
      tableDefId: formState.tableDefId,
    }
    formState.viewRowCell = resolveFn["ViewRowCellClass"](viewRowCellParams)
  }
  if (resolveFn && resolveFn["ViewHeaderCellClass"]) {
    let viewHeaderCellParams: ViewHeaderCellClass_Type = {
      columns,
      displayMode,
      isMobile,
      namespace: formState.namespace,
      tableDefId: formState.tableDefId,
    }
    formState.viewHeaderCell = resolveFn["ViewHeaderCellClass"](
      viewHeaderCellParams
    )
  }
}

export const ChangeField: OvlAction<ChangeField> = (
  value,
  { actions, state, effects }
) => {
  let field = value.formState.fields[value.fieldKey]

  if (value.isConvertedValue) {
    //field.previousConvertedValue = field.convertedValue
    field.convertedValue = value.value
    field.value = getDisplayValue(
      field.fieldKey,
      { list: field.list, type: field.type, ui: field.ui },
      GetRowFromFormState(value.formState),
      value.formState.namespace
    )
    field.validationResult.errors = []
    field.dirty = true
    field.watched = true
    SetRowCellInformation(value.formState, actions, state)

    return
  }

  field.validationResult.errors = []

  if (!field.ui.readonly) {
    field.watched = !value.isInit
  }
  let oldConvertedVal = field.convertedValue
  let newVal = value.value
  let namespace = value.formState.namespace
  field.value = newVal
  let fn = resolvePath(actions.custom, namespace)

  actions.ovl.internal.ValidateDataType({
    fieldKey: value.fieldKey,
    oldVal: newVal,
    newVal: field.value,
    formState: value.formState,
    validationResult: field.validationResult,
    isInnerEvent: value.isInnerEvent,
  } as ValidateFieldType)

  if (field.validationResult.errors.length === 0) {
    actions.ovl.internal.ValidateSchema({
      fieldKey: value.fieldKey,
      oldVal: newVal,
      newVal: field.value,
      formState: value.formState,
      validationResult: field.validationResult,
    } as ValidateFieldType)

    if (field.validationResult.errors.length === 0) {
      if (field.list) {
        actions.ovl.internal.ValidateList({
          fieldKey: value.fieldKey,
          oldVal: newVal,
          newVal: field.value,
          formState: value.formState,
          validationResult: field.validationResult,
        } as ValidateFieldType)
      }
      if (field.validationResult.errors.length === 0) {
        let validationFnName = "FormValidate"
        if (fn && fn[validationFnName]) {
          let val: FormValidate_Type = {
            fieldKey: value.fieldKey,
            oldVal: field.previousConvertedValue,
            newVal: value.isInnerEvent ? field.value : field.convertedValue,
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
    SetRowCellInformation(value.formState, actions, state)
    if (fn && fn[FormChanged]) {
      fn[FormChanged](<FormChanged_Type>{
        fieldId: value.fieldKey,
        formState: value.formState,
        oldConvertedVal: field.previousConvertedValue,
        newConvertedVal: field.convertedValue,
        row: GetRowFromFormState(value.formState),
      })
    }
  }

  //actions.ovl.internal.SetFormValid(value.formState)
}

// export const SetFormValid: OvlAction<OvlFormState> = (value) => {
//   value.valid =
//     !Object.keys(value.fields).some(
//       (k) => value.fields[k].validationResult.errors.length !== 0
//     ) && value.validationResult.errors.length !== 0
// }

export const GetFormValidationErrors = (formState: OvlFormState): string[] => {
  let res: string[] = []
  Object.keys(formState.fields).map((k) => {
    let field = formState.fields[k]
    res = res.concat(field.validationResult.errors.map((m) => T(m.key, m.reps)))
  })
  res = res.concat(
    formState.validationResult.errors.map((m) => T(m.key, m.reps))
  )
  return res
}
