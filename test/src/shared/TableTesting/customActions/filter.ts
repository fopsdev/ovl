import { OvlAction } from "../../../../../ovl/src"
import {
  FormFilter_Type,
  FormFilter_ReturnType,
} from "../../../../../ovl/src/global/hooks"

export const Form_alphaStartsWithA_Filter: OvlAction<
  FormFilter_Type,
  FormFilter_ReturnType
> = ({ row }, { state, actions, effects }) => {
  return row.U_Alpha.startsWith("A")
}

export const Form_alphaStartsWithB_Filter: OvlAction<
  FormFilter_Type,
  FormFilter_ReturnType
> = ({ row }, { state, actions, effects }) => {
  return row.U_Alpha.startsWith("B")
}

export const Form_memoContainsTest_Filter: OvlAction<
  FormFilter_Type,
  FormFilter_ReturnType
> = ({ row }) => {
  return row.U_Memo.toLowerCase().indexOf("test") > -1
}

export const Form_memoContainsText_Filter: OvlAction<
  FormFilter_Type,
  FormFilter_ReturnType
> = ({ row }) => {
  return row.U_Memo.toLowerCase().indexOf("text") > -1
}
