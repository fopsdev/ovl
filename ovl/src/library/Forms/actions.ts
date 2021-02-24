import {
  getDateISOString,
  getDateValue,
  getDecimalValue,
  isMobile,
  logState,
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
import { getFormFields, RemoveFocusEventHelper } from "./helper"
import { DataType, FieldFormat, FormField, Schema } from "./OvlFormElement"
import {
  getColumnDefsFromFormState,
  GetRowFromFormState,
} from "./Controls/helpers"
import { OvlAction } from "../../index"
import { getDisplayValue, getFormFieldsFromColumns } from "../Table/helpers"
import { OvlTableDefIds } from "../../index"
import {
  FormValidationDisplayType,
  RemoveFieldValidation,
  SetFormValid,
  FormValidationSummaryDisplayType,
  FormValidation,
  AddValidation,
} from "./validators"
import { OvlConfig } from "../../config"
export { FillListControl }

export type Field = {
  value: string
  convertedValue: any
  type: DataType
  list?: ListState
  dirty: boolean
  watched: boolean
  hasFocus?: boolean
  notUsed?: boolean
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
    visible?: ControlVisiblity
    useBrowserDatePicker?: boolean
  }
  previousConvertedValue: any
  _state?: { visible: boolean; closing: boolean }
}
export type ControlVisiblity = "true" | "false" | "fadeIn" | "fadeOut"

export type FieldValueMap = { [key: string]: Field }

export type ValidateResultErrors = {
  key: string
  translationKey: string
  translationReps?: string[]
  displayType: FormValidationDisplayType
}

export type ValidateResultSummaryErrors = {
  key: string
  translationKey: string
  translationReps?: string[]
  fieldKeys: string[]
  displayType: FormValidationSummaryDisplayType
  standalone?: boolean
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

export type BuiltInValidationDisplayType = {
  dataTypeValidation?: ValidationSettingsType
  schemaValidation?: ValidationSettingsType
  listValidation?: ValidationSettingsType
  customValidationDefaults?: CustomValidationSettingsType
}

export type CustomValidationSettingsType = {
  field: {
    displayType: FormValidationDisplayType
    displayTypeIfSummary: FormValidationDisplayType
  }
  summary?: {
    displayType: FormValidationSummaryDisplayType
  }
}

export type ValidationSettingsType = {
  isGrouped?: boolean
  _validationGroup?: string
  field: {
    displayType: FormValidationDisplayType
  }
  summary?: {
    displayType: FormValidationSummaryDisplayType
    msg?: { translationKey: string }
  }
  // defaultTranslationKeys: {

  // }
}

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
  validation?: FormValidation
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
  validation?: FormValidation
  additionalInitialisationFn?: (
    formState: OvlFormState,
    state: OvlState,
    actions: OvlActions
  ) => void
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
  let field = value.field
  let type = field.type
  let format
  if (field.ui.format) {
    format = field.ui.format
  }
  let val = field.value

  // only do type validation if there is a value
  // other scenarios should be handled in the custom validation
  switch (type) {
    case "bool": {
      field.convertedValue = val
      break
    }
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
          val = val.replace("/", "-")
          if (val.length === 10 && val.indexOf("-") > -1) {
            // looks like the well formed date select format
            let newDate: Date = new Date(val)
            field.convertedValue = getDateISOString(newDate)
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
          let resp = new Date(newDate).getTime()
          if (!resp) {
            // field.convertedValue = ""
            // field.value = field.value
            AddValidation(
              field,
              JSON.parse(
                JSON.stringify(value.formState.validation.dataType.Date)
              )
            )
          } else {
            let dval = new Date(resp)
            newDate = getDateISOString(dval)
            field.convertedValue = newDate
            field.value = getDateValue(newDate, format)
          }
        } else {
          field.convertedValue = null
          field.value = ""
        }
      }
      break
    case "int": {
      if (val) {
        let parsedVal = parseInt(val)
        if (parsedVal || parsedVal === 0) {
          field.value = parsedVal.toString()
          field.convertedValue = parsedVal
          //RemoveFieldValidation(field, "AppValidationInvalidNumberFormat")
        } else {
          AddValidation(
            field,
            JSON.parse(
              JSON.stringify(value.formState.validation.dataType.Number)
            )
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
            // as long as we are entering the value digit by digit we don't like formatting

            field.value = getDecimalValue(parsedVal, format) //parsedVal.toString()
          }
          field.convertedValue = parsedVal
          //RemoveFieldValidation(field, "AppValidationInvalidNumberFormat")
        } else {
          AddValidation(
            field,
            JSON.parse(
              JSON.stringify(value.formState.validation.dataType.Number)
            )
          )
        }
      } else {
        field.convertedValue = null
        field.value = ""
      }
      break
    }
  }
}

export const ValidateSchema: OvlAction<ValidateFieldType> = (value) => {
  if (value.formState.schema) {
    let field = value.field
    let schema = value.formState.schema[field.fieldKey]
    let type = field.type
    // check for size
    if (schema) {
      if (type === "text") {
        if (field.value) {
          if (field.value.length > schema.maxLength) {
            let validation = JSON.parse(
              JSON.stringify(value.formState.validation.schema.NrOfChars)
            )
            validation.summary.additionalTranslationReps = [
              schema.maxLength.toString(),
            ]
            AddValidation(field, validation)
            return
          }
        }
      } else {
        if (!field.value) {
          if (!schema.nullable) {
            AddValidation(field, value.formState.validation.schema.NotNull)
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
  let field = value.field
  let namespace = value.formState.namespace

  let list = field.list
  if (list.acceptEmpty && !list.acceptOnlyListValues) {
    return
  }

  if (!list.acceptEmpty && !field.value) {
    let validate
    if (list.isOption) {
      validate = value.formState.validation.list.NotEmptyOption
    } else {
      validate = value.formState.validation.list.NotEmpty
    }
    AddValidation(field, JSON.parse(JSON.stringify(validate)))
    return
  }
  if (list.acceptOnlyListValues && field.value) {
    // get a handy row object for FieldChanged hooks
    let fields = value.formState.fields
    let row = Object.keys(fields).reduce((val, k) => {
      val[k] = fields[k].convertedValue
      return val
    }, {})

    let functionName = FieldGetList.replace("%", field.fieldKey)

    let listdata: FieldGetList_ReturnType
    let fn = resolvePath(actions.custom, namespace)
    if (fn && fn[functionName]) {
      listdata = fn[functionName](<FieldGetList_Type>{ row })
      let filteredKeys = Object.keys(listdata.data)
      if (listdata) {
        functionName = FieldGetFilteredList.replace("%", field.fieldKey)
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
            field.value.toString()
          )
        }).length < 1
      ) {
        AddValidation(
          field,
          JSON.parse(JSON.stringify(value.formState.validation.list.ListValue))
        )
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
  value.validationResult.errors = value.validationResult.errors.filter(
    (f) => f.standalone
  )
  Object.keys(value.fields).map((k) => {
    let field = value.fields[k]
    field.validationResult.errors = []
    let oldValid = field.validationResult.errors.length === 0
    let oldConvertedValue = field.convertedValue
    let validationFnName = FormValidate
    let namespace = value.namespace
    // field.validationResult.valid = true
    // field.validationResult.validationMsg = ""

    actions.ovl.internal.TouchField({ fieldId: k, formState: value })

    actions.ovl.internal.ValidateDataType({
      field,
      formState: value,
    } as ValidateFieldType)

    let fn = resolvePath(actions.custom, namespace)

    if (field.validationResult.errors.length === 0) {
      actions.ovl.internal.ValidateSchema({
        field,
        formState: value,
      } as ValidateFieldType)

      if (field.validationResult.errors.length === 0) {
        if (field.list) {
          actions.ovl.internal.ValidateList({
            field,
            formState: value,
          } as ValidateFieldType)
        }
        if (field.validationResult.errors.length === 0) {
          if (fn && fn[validationFnName]) {
            fn[validationFnName](<FormValidate_Type>{
              field,
              formState: value,
              isInnerEvent: false,
            })
          }
        }
      }
    }
    if (
      field.convertedValue !== oldConvertedValue &&
      field.validationResult.errors.length === 0
    ) {
      if (fn && fn[FormChanged]) {
        fn[FormChanged](<FormChanged_Type>{
          field,
          formState: value,
          unconfirmedConvertedValue: oldConvertedValue,
          isInnerEvent: false,
        })
      }
      field.previousConvertedValue = field.convertedValue
    }
  })
  SetFormValid(value)
  //actions.ovl.internal.SetFormValid(value)
}

export const InitForm: OvlAction<InitForm, OvlFormState> = (
  value,
  { state, actions, effects }
) => {
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

    if (value.additionalInitialisationFn) {
      value.additionalInitialisationFn(formState, state, actions)
    }

    //<defaults>
    if (value.validation === undefined) {
      formState.validation = OvlConfig.formValidation.validationDefaults(
        value.tableDefId
      )
    } else {
      formState.validation = value.validation
    }
    //</defaults>

    formState.validationResult = { errors: [], visibleErrors: [] }
    //    }
    let fn = resolvePath(actions.custom, formState.namespace)
    Object.keys(formState.fields).forEach((k) => {
      let field = formState.fields[k]
      field.validationResult = {
        errors: [],
      }
      actions.ovl.internal.ValidateDataType({
        field,
        formState,
      } as ValidateFieldType)
      if (field.validationResult.errors.length === 0) {
        actions.ovl.internal.ValidateSchema({
          field,
          formState,
        } as ValidateFieldType)
        if (field.validationResult.errors.length === 0) {
          if (field.list) {
            actions.ovl.internal.ValidateList({
              field,
              formState,
            } as ValidateFieldType)
          }
          if (field.validationResult.errors.length === 0) {
            if (fn && fn[FormValidate]) {
              fn[FormValidate](<FormValidate_Type>{
                field,
                formState,
                isInnerEvent: false,
              })
            }
          }
        }
      }
    })

    SetFormValid(formState)
    SetRowCellInformation(formState, actions, state)

    formState.initFields = JSON.parse(JSON.stringify(fields), stringifyReplacer)
  }
  formInstanceList[instanceId].formShowed = false
  if (!formInstanceList[instanceId].fieldToFocus) {
    formInstanceList[instanceId].fieldToFocus = value.initialFocusFieldKey
  }
  return formInstanceList[instanceId]
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
  field: Field
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
  ignoreCustomValidation?: boolean
}

export type SetField = {
  formState: OvlFormState
  fieldKey: string
  convertedValue: any
}

export type FieldChanged = {
  formState: OvlFormState
  field: Field
  unconfirmedConvertedValue: any
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
    isInnerEvent: true,
    ignoreCustomValidation: true,
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

  let isMob = isMobile()
  let displayMode: DisplayMode = formState.isInline ? "EditInline" : "Edit"
  let resolveFn = resolvePath(actions.custom, formState.namespace)
  if (resolveFn && resolveFn["ViewRowCellClass"]) {
    let viewRowCellParams: ViewRowCellClass_Type = {
      columns,
      displayMode,
      isMobile: isMob,
      row: GetRowFromFormState(formState),
      namespace: formState.namespace,
      tableDefId: formState.tableDefId,
    }
    let res = resolveFn["ViewRowCellClass"](viewRowCellParams)
    // only set it if different
    // elsewise a lot of rerendering could happen
    if (JSON.stringify(res) !== JSON.stringify(formState.viewRowCell)) {
      formState.viewRowCell = res
    }
  }
  if (resolveFn && resolveFn["ViewHeaderCellClass"]) {
    let viewHeaderCellParams: ViewHeaderCellClass_Type = {
      columns,
      displayMode,
      isMobile: isMob,
      namespace: formState.namespace,
      tableDefId: formState.tableDefId,
    }
    let res = resolveFn["ViewHeaderCellClass"](viewHeaderCellParams)
    if (JSON.stringify(res) !== JSON.stringify(formState.viewHeaderCell)) {
      formState.viewHeaderCell = res
    }
  }
}

export const ChangeField: OvlAction<ChangeField> = (
  value,
  { actions, state, effects }
) => {
  let field = value.formState.fields[value.fieldKey]

  field.validationResult.errors.forEach((f) => {
    RemoveFieldValidation(field, f.key)
  })

  field.validationResult.errors = []
  // if (value.isConvertedValue) {
  //   //field.previousConvertedValue = field.convertedValue
  //   field.value = value.value
  //   // this is a short path (SetField - Action uses this part and should be fast. So Scripter needs to make sure the value is correct)
  //   // but at least check/correct the data type (common error elsewise)
  //   actions.ovl.internal.ValidateDataType({
  //     field,
  //     formState: value.formState,
  //     isInnerEvent: true,
  //   } as ValidateFieldType)
  //   field.value = getDisplayValue(
  //     field.fieldKey,
  //     { list: field.list, type: field.type, ui: field.ui },
  //     GetRowFromFormState(value.formState),
  //     value.formState.namespace
  //   )
  //   field.validationResult.errors = []
  //   field.dirty = true
  //   field.watched = true
  //   SetRowCellInformation(value.formState, actions, state)

  //   return
  // }

  if (!field.ui.readonly) {
    field.watched = !value.isInit
  }
  let namespace = value.formState.namespace
  field.value = value.value
  let oldConvertedValue = field.convertedValue
  let fn = resolvePath(actions.custom, namespace)

  actions.ovl.internal.ValidateDataType({
    field,
    formState: value.formState,
    isInnerEvent: value.isInnerEvent,
  } as ValidateFieldType)

  if (field.validationResult.errors.length === 0) {
    actions.ovl.internal.ValidateSchema({
      field,
      formState: value.formState,
      isInnerEvent: value.isInnerEvent,
    } as ValidateFieldType)

    if (field.validationResult.errors.length === 0) {
      if (field.list) {
        actions.ovl.internal.ValidateList({
          field,
          formState: value.formState,
          isInnerEvent: value.isInnerEvent,
        } as ValidateFieldType)
      }
      if (
        !value.ignoreCustomValidation &&
        field.validationResult.errors.length === 0
      ) {
        let validationFnName = "FormValidate"
        if (fn && fn[validationFnName]) {
          let val: FormValidate_Type = {
            field,
            formState: value.formState,
            isInnerEvent: value.isInnerEvent,
            correctedValue: undefined,
          }
          fn[validationFnName](val)
          if (
            field.validationResult.errors.length === 0 &&
            val.correctedValue
          ) {
            field.convertedValue = val.correctedValue
            field.value = getDateValue(field.convertedValue, field.ui.format)
          }
        }
      }
    }
  }
  //if (field.convertedValue !== oldConvertedValue) {
  SetFormValid(value.formState)
  field.dirty = !value.isInit
  if (!value.formState.dirty) {
    value.formState.dirty = !value.isInit
  }
  //}
  if (
    (!value.isInnerEvent &&
      field.previousConvertedValue !== field.convertedValue) ||
    (value.isInnerEvent && oldConvertedValue !== field.convertedValue)
  ) {
    // console.log(
    //   `field changed ${value.fieldKey} isInnerEvent: ${value.isInnerEvent} convertedValue: ${field.convertedValue} previousConvertedValue: ${field.previousConvertedValue} oldConvertedValue ${oldConvertedValue}`
    // )

    if (fn && fn[FormChanged]) {
      fn[FormChanged](<FormChanged_Type>{
        field,
        formState: value.formState,
        unconfirmedConvertedValue: oldConvertedValue,
        row: GetRowFromFormState(value.formState),
        isInnerEvent: value.isInnerEvent,
      })
    }
    if (!value.isInnerEvent) {
      field.previousConvertedValue = field.convertedValue
    }
  }

  SetRowCellInformation(value.formState, actions, state)
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
    res = res.concat(
      field.validationResult.errors.map((m) =>
        T(m.translationKey, m.translationReps)
      )
    )
  })
  res = res.concat(
    formState.validationResult.errors.map((m) =>
      T(m.translationKey, m.translationReps)
    )
  )
  return res
}
