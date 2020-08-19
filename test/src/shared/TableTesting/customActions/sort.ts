import { getTextSort } from "../../../../../ovl/src/library/Table/helpers"
import { TableTesting } from "../state"
import { OvlAction } from "../../../../../ovl/src"
import {
  FormCustomSort_Type,
  FormCustomSort_ReturnType,
} from "../../../../../ovl/src/global/hooks"

export const FormCustom_alphaThenMemo_Sort: OvlAction<
  FormCustomSort_Type,
  FormCustomSort_ReturnType
> = ({ a, b, data }) => {
  let rowA = data[a] as TableTesting
  let rowB = data[b] as TableTesting
  let res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  if (res === 0) {
    res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  }

  return res
}

export const FormCustom_memoThenAlpha_Sort: OvlAction<
  FormCustomSort_Type,
  FormCustomSort_ReturnType
> = ({ a, b, data }) => {
  let rowA = data[a] as TableTesting
  let rowB = data[b] as TableTesting
  let res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  if (res === 0) {
    res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  }
  return res
}

export const FormCustom_onlyTest_Sort: OvlAction<
  FormCustomSort_Type,
  FormCustomSort_ReturnType
> = ({ a, b, data }) => {
  let rowA = data[a] as TableTesting
  if (rowA.U_Alpha.toLocaleLowerCase().indexOf("test") > -1) {
    return -1
  } else {
    return 1
  }
}
