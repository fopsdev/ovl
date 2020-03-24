import { ListState } from "./ListControl"
import { AsyncAction } from "overmind"
import { KeyValueListFromServerFn } from "./helpers"
import { ListFnReturnValue } from "../../Table/Table"
import { FormState } from "../actions"

export const FillListControl: AsyncAction<{
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
