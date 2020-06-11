import { overmind } from "../../.."
import { SnackAdd } from "../../../../../ovl/src/library/helpers"
import {
  RowStatus,
  SelectedCustomFunctionResult,
  TableData,
  TableDataAndDef,
  TableDef,
} from "../../../../../ovl/src/library/Table/Table"
import { TableTesting } from "../state"

export const FormCanEdit = async (
  rowKey: string,
  tableDef: TableDef,
  tableData: TableData,
  state: OvlState,
  effects: OvlEffects
): Promise<string> => {
  let row = <TableTesting>tableData.data[rowKey]
  return row.U_Alpha && row.U_Alpha.indexOf("noedit") > -1
    ? "Ändern nicht möglich da Text 'noedit' enthält!"
    : ""
}

export const FormCanDelete = async (
  rowKey: string,
  tableDef: TableDef,
  tableData: TableData,
  state: OvlState,
  effects: OvlEffects
): Promise<string> => {
  let row = <TableTesting>tableData.data[rowKey]
  return row.U_Alpha && row.U_Alpha.indexOf("nodelete") > -1
    ? 'Löschen nicht möglich da Text "nodelete" enthält!'
    : ""
}

export const FormStatus = async (
  key: string,
  tableDef: TableDef,
  data: TableData,
  state: OvlState,
  effects: OvlEffects
): Promise<RowStatus> => {
  let row = <TableTesting>data.data[key]
  let res: RowStatus
  if (row.U_Alpha.toLowerCase().indexOf("test") > -1) {
    res = {
      status: "warning",
      msg: 'Text enthält "Test"',
    }
  } else if (row.U_Alpha.toLowerCase().indexOf("fehler") > -1) {
    res = {
      status: "error",
      msg: 'Text enthält "Fehler"',
    }
  }
  return res
}

export const FormCopy = async (
  key: string,
  newRow: TableTesting,
  tableDef: TableDef,
  tableData: TableData,

  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  newRow.U_Memo = newRow.U_Memo + " Copy!"
}

export const FormAdd = async (
  newRow: TableTesting,
  tableDef: TableDef,
  tableData: TableData,

  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  newRow.U_Memo = "Defaulttext Memo"
}
export const FormSelect = async (
  rowKey: string,
  def: TableDef,
  data: TableData,
  isLastOrOnlyOne: boolean,
  startedFromSelectedResult: SelectedCustomFunctionResult,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  // this sample shows how to deal with msg and succss when also used from headerform (multiple rows selected))
  let msg = ""
  if (isLastOrOnlyOne) {
    msg = "Funktion noch nicht implementiert!"
  }
  if (startedFromSelectedResult) {
    startedFromSelectedResult.msg = msg
    startedFromSelectedResult.success = false
    return
  }
  SnackAdd(msg, "Warning")
}
