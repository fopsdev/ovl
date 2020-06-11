import { getTextSort } from "../../../../../ovl/src/library/Table/helpers"
import { TableTesting, TblTableTesting } from "../state"
import { OvlState, OvlActions, OvlEffects } from "../../../../../ovl/src"

export const Form_alphaThenMemo_Sort = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): number => {
  let rowA: TableTesting = data[a]
  let rowB: TableTesting = data[b]
  let res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  if (res === 0) {
    res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  }

  return res
}

export const Form_memoThenAlpha_Sort = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): number => {
  let rowA: TableTesting = data[a]
  let rowB: TableTesting = data[b]
  let res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  if (res === 0) {
    res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  }

  return res
}

export const Form_onlyTest_Sort = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
): number => {
  let rowA: TableTesting = data[a]
  if (rowA.U_Alpha.toLocaleLowerCase().indexOf("test") > -1) {
    return -1
  } else {
    return 1
  }
}
