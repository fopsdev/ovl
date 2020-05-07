import { overmind } from "../../.."
import { ListState } from "./ListControl"
import { ListFnReturnValue } from "../../Table/Table"
import { FormState, Field } from "../actions"
import { customFunctions } from "../../../index"
import {
  resolvePath,
  getDateValue,
  getDecimalValue,
  T,
} from "../../../global/globals"
import {
  FieldLookupPostData,
  FieldGetList,
  FieldGetFilteredList,
} from "../../../global/hooks"
import { CellClass } from "../../Table/Row"

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
}

export const KeyValueListFromServerFn = async (
  state: typeof overmind.state,
  list: ListState,
  listData: ListFnReturnValue,
  filterValue: string,
  row: {},
  namespace: string,
  fieldId: string,
  effects: typeof overmind.effects,
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
  let fn = resolvePath(customFunctions, namespace)
  let functionName = FieldLookupPostData.replace("%", fieldId)
  if (fn && fn[functionName]) {
    fn[functionName](postData, row, state, overmind.actions, effects)
  }

  let res = await effects.postRequest(postData.url, {
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
  state: typeof overmind.state,
  fieldId: string,
  top?: number
) => {
  let hitLength = {}
  let functionName = FieldGetFilteredList.replace("%", fieldId)
  let dataList = resolvePath(customFunctions, formState.namespace)[
    FieldGetList.replace("%", fieldId)
  ](GetRowFromFormState(formState), state, overmind.actions, overmind.effects)
  if (dataList.data) {
    let res = Object.keys(dataList.data)
    let fn = resolvePath(customFunctions, formState.namespace)
    if (fn && fn[functionName]) {
      res = fn[functionName](
        dataList,
        formState,
        state,
        overmind.actions,
        overmind.effects
      )
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
    if (filterValue === null) {
      filterValue = ""
    }
    res = res.filter((f) => {
      if (filterValue === "") {
        return true
      }
      let checkRow = dataList.data[f]
      return Object.keys(lookupTypes).some((c) => {
        let checkVal = checkRow[c]
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
          checkVal.toString().toLowerCase().indexOf(filterValue.toLowerCase()) >
          -1
        ) {
          hitLength[f] = checkRow[c].length - filterValue.length
          return true
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
    return value
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

export const GetLabel = (field: Field): string => {
  let caption = ""

  if (field.ui) {
    if (field.ui.noLabel) {
      return ""
    }

    if (field.ui.labelTranslationKey) {
      caption = T(field.ui.labelTranslationKey)
    } else {
      caption = field.fieldKey
    }
  }
  return caption
}
