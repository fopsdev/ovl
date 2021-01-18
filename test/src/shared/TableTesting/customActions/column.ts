import { FormCustomColumnFn_Type } from "../../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/src/index"

export const FormCustomColumnFn_ValidValues: OvlAction<FormCustomColumnFn_Type> = async (
  { fnName, columnKey, def },
  { state, actions, effects }
) => {
  console.log(
    "custom column function 'ValidValues' startet (nothing implemented)"
  )
}
