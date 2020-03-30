import { overmind } from "../../.."
import { ListState } from "./ListControl"
import { ListFnReturnValue } from "../../Table/Table"
import { FormState } from "../actions"
import { functions } from "../../../index"
import { resolvePath } from "../../../global/globals"

export type LookupListPostData = {
  url: string
  lang: string
  filterValue: string
  lookupType: string
  paramList?: { [key: string]: {} }
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
    paramList: {}
  }
  if (!postData.paramList) {
    postData.paramList = {}
  }
  Object.keys(paramList).forEach(k => {
    if (!postData.paramList[k]) {
      postData.paramList[k] = paramList[k]
    }
  })
  let fn = resolvePath(functions, namespace)
  let functionName = fieldId + "LookupPostDataFn"
  if (fn && fn[functionName]) {
    fn[functionName](postData, row, state)
  }

  let res = await effects.postRequest(postData.url, {
    lang: postData.lang,
    filterValue: postData.filterValue,
    lookupType: postData.lookupType,
    paramList: postData.paramList
  })
  // now sync the result with the local state
  if (res.data && res.data.data) {
    if (listData.data === undefined) {
      listData.data = {}
    }
    let localListState = listData.data
    let serverData = res.data.data
    Object.keys(serverData).forEach(k => {
      if (!localListState[k]) {
        localListState[k] = {}
      }
      Object.keys(serverData[k]).forEach(c => {
        localListState[k][c] = serverData[k][c]
      })
    })
    listData.lookupTypes = res.data.types
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
  let functionName = fieldId + "GetFilteredListFn"
  let dataList = list.listFn(state, GetRowFromFormState(formState))
  if (dataList.data) {
    let res = Object.keys(dataList.data)
    let fn = resolvePath(functions, formState.namespace)
    if (fn && fn[functionName]) {
      res = fn[functionName](dataList, formState)
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
    res = res.filter(f => {
      if (filterValue === "") {
        return true
      }
      let checkRow = dataList.data[f]
      return Object.keys(lookupTypes).some(c => {
        let checkVal = checkRow[c]
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
    let rowKey = fields[k].datafield
    if (!rowKey) {
      rowKey = k
    }
    val[rowKey] = fields[k].convertedValue
    return val
  }, {})
}
