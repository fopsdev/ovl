import { ListState } from "./ListControl"

import { KeyValueListFromServerFn } from "./helpers"
import { ListFnReturnValue } from "../../Table/Table"
import { OvlAction } from "../../.."

export const FillListControl: OvlAction<{
  list: ListState
  listData: ListFnReturnValue
  filterValue: string
  row: {}
  namespace: string
  fieldId: string
}> = async ({ state, effects }, value) => {
  await KeyValueListFromServerFn(
    state,
    value.list,
    value.listData,
    value.filterValue,
    value.row,
    value.namespace,
    value.fieldId,
    effects
  )
}
