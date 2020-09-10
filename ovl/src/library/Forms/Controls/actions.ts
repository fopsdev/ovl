import { ListState } from "./ListControl"

import { KeyValueListFromServerFn } from "./helpers"
import { ListFnReturnValue } from "../../Table/Table"
import { OvlAction } from "../../../ovlTypes"

export const FillListControl: OvlAction<{
  list: ListState
  listData: ListFnReturnValue
  filterValue: string
  row: {}
  namespace: string
  fieldId: string
}> = async (value, { state, effects }) => {
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
