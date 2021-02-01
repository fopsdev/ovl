import { html, TemplateResult } from "lit-html"

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
  FieldGetList_ReturnType,
} from "../../../global/hooks"
import { OvlState, OvlEffects, ovl, OvlConfig } from "../../../index"
import { CachedRendererData, GetRendererFn } from "../../Table/helpers"
import { CellClass } from "../../Table/Row"
import {
  ControlType,
  DisplayMode,
  ListDefinition,
  ColumnDisplayDef,
} from "../../Table/Table"
import { Field, OvlFormState, ValidateResultErrors } from "../actions"
import { ListState } from "./ListControl"

export type LookupListPostData = {
  url: string
  lang: string
  filterValue: string
  lookupType: string
  paramList?: { [key: string]: {} }
}

export const _getValidationText = (errors: ValidateResultErrors[]) => {
  return errors.map((m, resIndex) => {
    let link
    let linkText
    let sep
    if (resIndex > 0) {
      sep = html`, `
    }
    if (m.translationReps.length > 1) {
      // check if link
      let chk = m.translationReps[1]
      if (chk && chk.startsWith("http")) {
        link = chk
      }
    }
    if (link && m.translationReps.length > 2) {
      linkText = m.translationReps[2]
    }
    let templateRes
    if (link) {
      if (!linkText) {
        templateRes = html`${sep}<span
            ><a target="_blank" href="${link}"
              >${T(m.translationKey, m.translationReps)}</a
            >
          </span>`
      } else {
        linkText = T(linkText)
        let parts = T(m.translationKey, m.translationReps).split("@@OvlLink")
        templateRes = html`${sep}<span>
            ${parts[0]}
            <a target="_blank" href="${link}">${linkText}</a>
            ${parts.length > 0 ? parts[1] : ""}</span
          >`
      }
    } else {
      templateRes = html`${sep}<span
          >${T(m.translationKey, m.translationReps)}</span
        >`
    }
    return templateRes
  })
}

export const KeyValueListFromServerFn = async (
  state: OvlState,
  list: ListState,
  listData: ListDefinition,
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
        if (localListState[k][c] !== serverData[k][c]) {
          localListState[k][c] = serverData[k][c]
        }
      })
    })
    let lookupDef = res.data.lookupDef
    if (lookupDef) {
      Object.keys(lookupDef).forEach((k) => {
        if (!listData.lookupDef[k]) {
          listData.lookupDef[k] = { type: "text" }
        }

        if (lookupDef[k]) {
          Object.keys(lookupDef[k]).forEach((c) => {
            if (listData.lookupDef[k][c] !== lookupDef[k][c]) {
              listData.lookupDef[k][c] = lookupDef[k][c]
            }
          })
        }
      })
    }

    //listData.lookupDef = res.data.lookupDef
  }
}

export const FilterHitList = (
  list: ListState,
  filterValue: string,
  formState: OvlFormState,
  state: OvlState,
  fieldId: string,
  top?: number
): { filteredKeys: string[]; directValue?: any; directDescription?: any } => {
  let hitLength = {}
  let functionName = FieldGetFilteredList.replace("%", fieldId)
  let dataList: FieldGetList_ReturnType = resolvePath(
    ovl.actions.custom,
    formState.namespace
  )[FieldGetList.replace("%", fieldId)](<FieldGetList_Type>{
    row: GetRowFromFormState(formState),
  })

  if (dataList.data) {
    let directValue
    let directDescription

    let res = Object.keys(dataList.data)
    let fn = resolvePath(ovl.actions.custom, formState.namespace)
    if (fn && fn[functionName]) {
      res = fn[functionName](<FieldGetFilteredList_Type>{
        list: dataList,
        formState,
      })
    }

    let directKeyHits = res.filter((f) => f == filterValue)
    if (directKeyHits.length === 1) {
      directValue = directKeyHits[0]
      directDescription = dataList.data[directValue][list.displayField]
    }

    let lookupTypes = dataList.lookupDef

    if (!lookupTypes) {
      lookupTypes = {}
      lookupTypes[list.displayField] = { type: "text" }
      lookupTypes[list.valueField] = { type: "text" }
    }
    if (!filterValue) {
      filterValue = ""
    }

    if (
      list.displayValueField !== undefined &&
      list.displayValueField === false
    ) {
      delete lookupTypes[list.valueField]
    }
    res = res.filter((f) => {
      if (filterValue === "") {
        return true
      }
      let checkRow = dataList.data[f]
      return Object.keys(lookupTypes).some((c) => {
        let checkVal = checkRow[c]
        if (checkVal !== undefined) {
          let typ = lookupTypes[c].type
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
            hitLength[f] = checkVal.length - filterValue.length
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

    // if (dataList.index) {
    //   res = res.map((m) => {
    //     return dataList.data[m][list.valueField]
    //   })
    // }
    if (!directValue && res.length === 1) {
      directValue = res[0]
      directDescription = dataList.data[res[0]][list.displayField]
    }
    return { filteredKeys: res, directValue, directDescription }
  }
  return { filteredKeys: [] }
}

export const GetListDisplayValue = (
  list: ListState,
  value: string,
  listdata: ListDefinition
) => {
  if (value === undefined || value === null) {
    return ""
  }
  // if we are operating on a regular table the use the index to get the correct row index
  if (listdata.index) {
    let idx = listdata.index[value]
    if (idx) {
      value = idx
    }
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

export const GetRowFromFormState = (formState: OvlFormState) => {
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

export const GetCustomInfo = (customRowCell: CellClass, key: string) => {
  let customRowClassName = ""
  let customRowTooltip
  let customRowClassContainerName = ""
  if (customRowCell && customRowCell[key]) {
    customRowClassName = customRowCell[key].className
    customRowClassContainerName = customRowClassName + "Container"
    customRowTooltip = customRowCell[key].tooltip
  }
  return { customRowClassName, customRowTooltip, customRowClassContainerName }
}

export const GetContainerClass = (
  type: string,
  fieldKey: string,
  customRowClassName
): string => {
  return `fd-form-item ovl-formcontrol-container ovl-container-${type} ovl-container__${fieldKey} ${customRowClassName}`
}

export const GetInputClass = (
  type: string,
  field: Field,
  customRowClassName
): string => {
  return `${GetOutlineValidationHint(
    field
  )} ${customRowClassName} ovl-focusable ovl-formcontrol-input ovl-value-${type} ovl-value__${
    field.fieldKey
  } ${field.ui.readonly ? "ovl-disabled" : ""}`
}

export const GetValueFromCustomFunction = (
  row: { [key: string]: {} },
  field: Field,
  formState: OvlFormState,
  align: string,

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
      displayMode: formState.isInline
        ? <DisplayMode>"EditInline"
        : <DisplayMode>"Edit",
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
  formState: OvlFormState
): { [key: string]: {} } => {
  let row = {}
  if (originalRow !== undefined) {
    row = JSON.parse(JSON.stringify(originalRow), stringifyReplacer)
  }
  Object.keys(formState.fields).forEach((f) => {
    let field = formState.fields[f]
    row[field.fieldKey] = field.convertedValue
  })
  return row
}

export const getColumnDefsFromFormState = (
  formState: OvlFormState
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

export const GetOutlineValidationHint = (field: Field): string => {
  let outlineValidationHint = ""
  if (field.validationResult.errors.length > 0) {
    outlineValidationHint = "is-warning"
    if (field.watched) {
      outlineValidationHint = "is-error"
    }
  }
  return outlineValidationHint
}
