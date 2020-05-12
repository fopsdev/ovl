import { overmind } from "../../.."
import { TableDef } from "../../../../../ovl/src/library/Table/Table"

export const FormCustomColumnFn_ValidValues = async (
  fnName: string,
  coumnKey: string,
  def: TableDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log(
    "custom column function 'ValidValues' startet (nothing implemented)"
  )
}
