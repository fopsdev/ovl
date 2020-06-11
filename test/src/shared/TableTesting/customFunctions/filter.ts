import { TableData, TableDef } from "../../../../../ovl/src/library/Table/Table"
import { TableTesting } from "../state"
import { OvlState, OvlActions, OvlEffects } from "../../../../../ovl/src"

export const Form_alphaStartsWithA_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): boolean => {
  return row.U_Alpha.startsWith("A")
}

export const Form_alphaStartsWithB_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): boolean => {
  return row.U_Alpha.startsWith("B")
}

export const Form_memoContainsTest_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): boolean => {
  return row.U_Memo.toLowerCase().indexOf("test") > -1
}

export const Form_memoContainsText_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): boolean => {
  return row.U_Memo.toLowerCase().indexOf("text") > -1
}
