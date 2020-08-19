import { OvlAction } from "../../../../../ovl/src"
import { FormCustomColumnFn_Type } from "../../../../../ovl/src/global/hooks"

export const FormCustomColumnFn_ValidValues: OvlAction<FormCustomColumnFn_Type> = async (
  { fnName, columnKey, def },
  { state, actions, effects }
) => {
  console.log(
    "custom column function 'ValidValues' startet (nothing implemented)"
  )
}
