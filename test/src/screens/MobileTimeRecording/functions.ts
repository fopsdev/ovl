import { ListFnReturnValue } from "../../library/Table/Table"
import { overmind } from "../.."
import { TableMobileTimeRecording } from "./state"
import { LookupListPostData } from "../../library/forms/Controls/helpers"
import { FormState } from "../../library/forms/actions"

export const U_TypeGetListFn = (
  state: typeof overmind.state,
  row: { [key: string]: {} }
): ListFnReturnValue => {
  return {
    data: {
      Prj: { Code: "PROJECT", Description: "Projekt" },
      Abs: { Code: "ABSENCE", Description: "Absenz" }
    }
  }
}

export const U_TypeIdGetListFn = (
  state: typeof overmind.state,
  row: TableMobileTimeRecording
): ListFnReturnValue => {
  if (row.U_Type === "PROJECT") {
    return state.tables.lookups.ProjectTypeId
  } else {
    return state.tables.lookups.AbsenceTypeId
  }
}

export const U_TypeIdLookupPostDataFn = (
  lookupData: LookupListPostData,
  row: {},
  state: typeof overmind.state
) => {
  if (row["U_Type"] === "PROJECT") {
    lookupData.lookupType = "timeProject"
  } else {
    lookupData.lookupType = "timeAbsence"
  }
}
