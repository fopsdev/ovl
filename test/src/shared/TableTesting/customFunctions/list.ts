import { overmind } from "../../.."
import { FormState } from "../../../../../ovl/src/library/forms/actions"
import { LookupListPostData } from "../../../../../ovl/src/library/forms/Controls/helpers"
import { ListFnReturnValue } from "../../../../../ovl/src/library/Table/Table"
import { TableTesting } from "../state"

// some list functions
export const Field_U_ItemCode_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItemCode
}

export const Field_U_ItemCode_LookupPostData = (
  lookupData: LookupListPostData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  lookupData.paramList.U_ItmsGrpCod = row["U_ItmsGrpCod"]
}

export const Field_U_ItmsGrpCod_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItmsGrpCod
}

export const Field_U_ParentCode_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.tableTesting
}

export const Field_U_ParentCode2_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return {
    data: state.testtables.tableTesting.data,
    lookupDef: state.testtables.tableTesting.lookupDef2,
  }
}

export const Field_U_ItemCode_GetFilteredList = (
  list: ListFnReturnValue,
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): string[] => {
  return Object.keys(list.data).filter((f) => {
    return (
      !formState.fields.U_ItmsGrpCod.convertedValue ||
      list.data[f]["ItmsGrpCod"] ===
        formState.fields.U_ItmsGrpCod.convertedValue
    )
  })
}
