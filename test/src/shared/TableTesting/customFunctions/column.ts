import { TableDef } from "../../../../../ovl/src/library/Table/Table"
import { OvlState, OvlActions, OvlEffects } from "../../../../../ovl/src"

export const FormCustomColumnFn_ValidValues = async (
  fnName: string,
  coumnKey: string,
  def: TableDef,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log(
    "custom column function 'ValidValues' startet (nothing implemented)"
  )
}
