import { OvlAction } from "../../../../../ovl/src"
import {
  FormCustomFilter_Type,
  FormCustomFilter_ReturnType,
} from "../../../../../ovl/src/global/hooks"

export const FormCustom_alphaStartsWithA_Filter: OvlAction<
  FormCustomFilter_Type,
  FormCustomFilter_ReturnType
> = ({ row }, { state, actions, effects }) => {
  return row.U_Alpha.startsWith("A")
}

export const FormCustom_alphaStartsWithB_Filter: OvlAction<
  FormCustomFilter_Type,
  FormCustomFilter_ReturnType
> = ({ row }, { state, actions, effects }) => {
  return row.U_Alpha.startsWith("B")
}

export const FormCustom_memoContainsTest_Filter: OvlAction<
  FormCustomFilter_Type,
  FormCustomFilter_ReturnType
> = ({ row }) => {
  return row.U_Memo && row.U_Memo.toString().toLowerCase().indexOf("test") > -1
}

export const FormCustom_memoContainsText_Filter: OvlAction<
  FormCustomFilter_Type,
  FormCustomFilter_ReturnType
> = ({ row }) => {
  return row.U_Memo && row.U_Memo.toString().toLowerCase().indexOf("text") > -1
}
