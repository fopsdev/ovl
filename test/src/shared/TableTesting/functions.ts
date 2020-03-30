import { TableTesting, TblTableTesting } from "./state"

// import { RowStatus, TableDef } from "../../library/Table/Table"
// import { Translation } from "./state"
import { overmind } from "../.."
import {
  TableDataAndDef,
  TableDef,
  TableData,
  ListFnReturnValue,
  RowStatus
} from "../../../../ovl/src/library/Table/Table"
import { getTextSort } from "../../../../ovl/src/library/Table/helpers"
import { LookupListPostData } from "../../../../ovl/src/library/forms/Controls/helpers"
import { FormState } from "../../../../ovl/src/library/forms/actions"

// // following functions will be called when present
// // getRowStatus -> returns a row status which colors the line
// // and if custom actions on selected row are configured (see tabledef)
// // then key + VisisbleFn()
// // those functions need to be imported into tableFunctions.ts

export const GetRowStatus = async (
  key: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state
): Promise<RowStatus> => {
  let row = <TableTesting>tableDefAndData.data.data[key]
  let res: RowStatus
  if (row.U_Alpha.toLowerCase().indexOf("test") > -1) {
    res = {
      status: "warning",
      msg: 'Text enthält "Test"'
    }
  } else if (row.U_Alpha.toLowerCase().indexOf("fehler") > -1) {
    res = {
      status: "error",
      msg: 'Text enthält "Fehler"'
    }
  }
  return Promise.resolve(res)
}

// /*
// use functionNameDisabledFn for functions that need to control its buttons disabled prop
// FunctionName in the following sample is "Edit"
// if no function present it will be always enabled
// if it should be disabled please provide a text (will be the tooltip) if it should be enabled just return empty string
// */

export const EditDisabledFn = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("noedit") > -1
      ? "Ändern nicht möglich da Text 'noedit' enthält!"
      : ""
  )
}

export const DeleteDisabledFn = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("nodelete") > -1
      ? 'Löschen nicht möglich da Text "nodelete" enthält!'
      : ""
  )
}

export const alphaThenMemoSortFn = (
  a: string,
  b: string,
  data: TblTableTesting
): number => {
  let rowA = data[a]
  let rowB = data[b]
  let res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  if (res === 0) {
    res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  }

  return res
}

export const memoThenAlphaSortFn = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: typeof overmind.state
): number => {
  let rowA = data[a]
  let rowB = data[b]
  let res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  if (res === 0) {
    res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  }

  return res
}

export const onlyTestSortFn = (
  a: string,
  b: string,
  data: TblTableTesting
): number => {
  let rowA = data[a]
  if (rowA.U_Alpha.toLocaleLowerCase().indexOf("test") > -1) {
    return -1
  } else {
    return 1
  }
}

export const alphaStartsWithAFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state
): boolean => {
  let row: TableTesting = data.data[key]

  return row.U_Alpha.startsWith("A")
}

export const alphaStartsWithBFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state
): boolean => {
  let row: TableTesting = data.data[key]

  return row.U_Alpha.startsWith("B")
}

export const memoContainsTestFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state
): boolean => {
  let row: TableTesting = data.data[key]
  return row.U_Memo.toLowerCase().indexOf("test") > -1
}

export const memoContainsTextFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state
): boolean => {
  let row: TableTesting = data.data[key]
  return row.U_Memo.toLowerCase().indexOf("text") > -1
}

// some list functions

export const U_ItemCodeGetListFn = (
  state: typeof overmind.state,
  row: { [key: string]: {} }
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItemCode
}

export const U_ItemCodeLookupPostDataFn = (
  lookupData: LookupListPostData,
  row: {},
  state: typeof overmind.state
) => {
  lookupData.paramList.ItmsGrpCod = row["U_ItmsGrpCod"]
}

export const ItmsGrpCodGetListFn = (
  state: typeof overmind.state,
  row: { [key: string]: {} }
): ListFnReturnValue => {
  return state.testtables.lookups.ItmsGrpCod
}

export const ParentCodeGetListFn = (
  state: typeof overmind.state,
  row: { [key: string]: {} }
): ListFnReturnValue => {
  return state.testtables.tableTesting
}

export const U_ItemCodeGetFilteredListFn = (
  list: ListFnReturnValue,
  formState: FormState
): string[] => {
  return Object.keys(list.data).filter(f => {
    return (
      !formState.fields.ItmsGrpCod.convertedValue ||
      list.data[f]["ItmsGrpCod"] === formState.fields.ItmsGrpCod.convertedValue
    )
  })
}
