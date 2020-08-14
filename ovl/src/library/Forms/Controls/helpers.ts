import { html, TemplateResult } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"

import {
  getDateValue,
  getDecimalValue,
  resolvePath,
  T,
  stringifyReplacer,
} from "../../../global/globals"
import {
  FieldGetFilteredList,
  FieldGetLabelRender,
  FieldGetList,
  FieldLookupPostData,
  FieldGetValueRender,
  FieldLookupPostData_Type,
  FieldGetList_Type,
  FieldGetFilteredList_Type,
  FieldGetFilteredList_ReturnType,
  FieldGetValueRender_Type,
  FieldGetValueRender_ReturnType,
  FieldGetLabelRender_Type,
} from "../../../global/hooks"
import { OvlState, OvlEffects, ovl } from "../../../index"
import { CachedRendererData, GetRendererFn } from "../../Table/helpers"
import { CellClass } from "../../Table/Row"
import {
  ControlType,
  DisplayMode,
  ListFnReturnValue,
  ColumnDisplayDef,
} from "../../Table/Table"
import { Field, FormState } from "../actions"
import { ListState } from "./ListControl"
import { UIValidationObject } from "./uiValidationHelper"
import { OvlBaseElement } from "../../OvlBaseElement"

export type LookupListPostData = {
  url: string
  lang: string
  filterValue: string
  lookupType: string
  paramList?: { [key: string]: {} }
}

export type ControlState = {
  customHeaderCellClass: CellClass
  customRowCellClass: CellClass
  field: Field
  row: { [key: string]: any }
  isInline: boolean
}

export const KeyValueListFromServerFn = async (
  state: OvlState,
  list: ListState,
  listData: ListFnReturnValue,
  filterValue: string,
  row: {},
  namespace: string,
  fieldId: string,
  effects: OvlEffects,
  paramList?: { [key: string]: {} }
) => {
  if (!paramList) {
    paramList = {}
  }
  let url = state.ovl.apiUrl + "lookup"
  let postData: LookupListPostData = {
    url,
    lang: state.ovl.language.language,
    filterValue,
    lookupType: list.serverEndpoint,
    paramList: {},
  }
  if (!postData.paramList) {
    postData.paramList = {}
  }
  Object.keys(paramList).forEach((k) => {
    if (!postData.paramList[k]) {
      postData.paramList[k] = paramList[k]
    }
  })
  let fn = resolvePath(ovl.actions.custom, namespace)
  let functionName = FieldLookupPostData.replace("%", fieldId)
  if (fn && fn[functionName]) {
    fn[functionName](<FieldLookupPostData_Type>{ lookupData: postData, row })
  }

  let res = await effects.ovl.postRequest(postData.url, {
    lang: postData.lang,
    filterValue: postData.filterValue,
    lookupType: postData.lookupType,
    paramList: postData.paramList,
  })
  // now sync the result with the local state
  if (res.data && res.data.data) {
    if (listData.data === undefined) {
      listData.data = {}
    }
    let localListState = listData.data
    let serverData = res.data.data
    Object.keys(serverData).forEach((k) => {
      if (!localListState[k]) {
        localListState[k] = {}
      }
      Object.keys(serverData[k]).forEach((c) => {
        localListState[k][c] = serverData[k][c]
      })
    })
    listData.lookupDef = res.data.lookupDef
  }
}

export const FilterHitList = (
  list: ListState,
  filterValue: string,
  formState: FormState,
  state: OvlState,
  fieldId: string,
  top?: number
) => {
  let hitLength = {}
  let functionName = FieldGetFilteredList.replace("%", fieldId)
  let dataList = resolvePath(ovl.actions.custom, formState.namespace)[
    FieldGetList.replace("%", fieldId)
  ](<FieldGetList_Type>{ row: GetRowFromFormState(formState) })
  if (dataList.data) {
    let res = Object.keys(dataList.data)
    let fn = resolvePath(ovl.actions.custom, formState.namespace)
    if (fn && fn[functionName]) {
      res = fn[functionName](<FieldGetFilteredList_Type>{
        list: dataList,
        formState,
      })
    }

    let lookupTypes = dataList.lookupTypes

    if (!lookupTypes) {
      // get the types from the data and assume its text
      let keys = Object.keys(dataList.data)
      if (keys.length > 0) {
        lookupTypes = Object.keys(dataList.data[keys[0]]).reduce((val, k) => {
          val[k] = "text"
          return val
        }, {})
      }
    }
    if (!filterValue) {
      filterValue = ""
    }
    res = res.filter((f) => {
      if (filterValue === "") {
        return true
      }
      let checkRow = dataList.data[f]
      return Object.keys(lookupTypes).some((c) => {
        let checkVal = checkRow[c]
        if (checkVal !== undefined) {
          let typ = lookupTypes[c]
          if (typ === "date") {
            checkVal = getDateValue(checkVal)
          } else if (typ === "decimal") {
            checkVal = getDecimalValue(checkVal)
          }

          if (checkVal === null) {
            checkVal = ""
          }
          if (
            checkVal
              .toString()
              .toLowerCase()
              .indexOf(filterValue.toLowerCase()) > -1
          ) {
            hitLength[f] = checkRow[c].length - filterValue.length
            return true
          }
        }
      })
    })
    res = res.sort((a, b) => {
      return hitLength[a] - hitLength[b]
    })
    if (top) {
      res.splice(top)
    }
    return res
  }
  return []
}

export const GetListDisplayValue = (
  list: ListState,
  value: string,
  listdata: ListFnReturnValue
) => {
  if (!value) {
    return ""
  }
  let displayField = list.displayField
  let displayValue
  if (listdata.data && listdata.data[value]) {
    displayValue = listdata.data[value][displayField]
  } else {
    displayValue = value
  }
  return displayValue
}

export const GetRowFromFormState = (formState: FormState) => {
  let fields = formState.fields
  return Object.keys(fields).reduce((val, k) => {
    val[k] = fields[k].convertedValue
    return val
  }, {})
}

export let cachedValueRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export const GetValueFromCustomFunction = (
  row: { [key: string]: {} },
  field: Field,
  formState: FormState,
  align: string,
  isInline: boolean,
  state: OvlState
): TemplateResult => {
  let rendererFn = GetRendererFn(
    formState.namespace,
    cachedValueRendererFn,
    FieldGetValueRender,
    field.fieldKey
  )
  if (rendererFn) {
    let val: FieldGetValueRender_ReturnType = rendererFn(<
      FieldGetValueRender_Type
    >{
      columnKey: field.fieldKey,
      row: fillReactiveRows(row, formState),
      namespace: formState.namespace,
      columnsDef: getColumnDefsFromFormState(formState),
      align,
      displayMode: isInline ? <DisplayMode>"EditInline" : <DisplayMode>"Edit",
    })
    let d = field.value
    if (val !== undefined) {
      return val
    }
  }
  return null
}

const fillReactiveRows = (
  originalRow: { [key: string]: {} },
  formState: FormState
): { [key: string]: {} } => {
  let row = JSON.parse(JSON.stringify(originalRow), stringifyReplacer)
  Object.keys(formState.fields).forEach((f) => {
    let field = formState.fields[f]
    row[field.fieldKey] = field.convertedValue
  })
  return row
}

const getColumnDefsFromFormState = (
  formState: FormState
): { [key: string]: ColumnDisplayDef } => {
  let colDisplayDefs = Object.keys(formState.fields).reduce((val, f) => {
    let field = formState.fields[f]
    let res: ColumnDisplayDef = {
      list: field.list,
      ui: field.ui,
      type: field.type,
    }
    val[field.fieldKey] = res
    return val
  }, {})
  return colDisplayDefs
}

export const GetLabel = (
  field: Field,
  customHeaderCell: CellClass,
  res: UIValidationObject,
  controltype: ControlType,
  align: string,
  formState: FormState,
  comp: OvlBaseElement
): TemplateResult => {
  let caption = ""
  let label

  if (field.ui) {
    if (field.ui.noLabel) {
      return null
    }
    if (field.ui.labelTranslationKey) {
      caption = T(field.ui.labelTranslationKey)
    }
    if (!caption) {
      caption = field.fieldKey
    }
  }

  let customHeaderClassName = ""
  let customHeaderTooltip
  if (customHeaderCell) {
    customHeaderClassName = customHeaderCell.className
    customHeaderTooltip = customHeaderCell.tooltip
  }
  let state = ovl.state
  //let formState: FormState = state.ovl.forms[field.formType][field.formId]
  let rendererFn = GetRendererFn(
    formState.namespace,
    cachedRendererFn,
    FieldGetLabelRender,
    field.fieldKey
  )

  if (rendererFn) {
    caption = rendererFn(<FieldGetLabelRender_Type>{
      columnKey: field.fieldKey,
      caption,
      align,
      displayMode: <DisplayMode>"Edit",
      state,
    })
  }

  label = html`
    <label
      title="${ifDefined(
        customHeaderTooltip ? customHeaderTooltip : undefined,
        comp
      )}"
      class="fd-form-label fd-has-type-1 ovl-formcontrol-label ovl-table-label-${controltype} ovl-table-label__${field.fieldKey} ${customHeaderClassName}"
      aria-required="${res.needsAttention}"
      for="${field.id}"
      >${caption}</label
    >
  `
  return label
}
