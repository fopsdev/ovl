import { overmind } from "../.."
import { TableMobileTimeRecording } from "./state"
import {
  ListFnReturnValue,
  BeforeSaveParam,
  TableDataAndDef,
} from "../../../../ovl/src/library/Table/Table"
import { LookupListPostData } from "../../../../ovl/src/library/forms/Controls/helpers"
import { AsyncAction, Overmind } from "overmind"
import {
  ValidateField,
  FormState,
  Field,
  FieldChanged,
  ChangeField,
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { ovltemp, GetWeekNr } from "../../../../ovl/src/global/globals"
import {
  ValidationAddError,
  ValidationRemoveError,
} from "../../../../ovl/src/library/Forms/helper"

export const U_TypeGetListFn = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return {
    data: {
      Prj: { Code: "PROJECT", Description: "Projekt" },
      Abs: { Code: "ABSENCE", Description: "Absenz" },
    },
  }
}

export const U_TypeIdGetListFn = (
  row: TableMobileTimeRecording,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  if (row.U_Type === "PROJECT") {
    return state.testtables.lookups.ProjectTypeId
  } else {
    return state.testtables.lookups.AbsenceTypeId
  }
}

export const U_TypeIdLookupPostDataFn = (
  lookupData: LookupListPostData,
  row: {},
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  if (row["U_Type"] === "PROJECT") {
    lookupData.lookupType = "timeProject"
  } else {
    lookupData.lookupType = "timeAbsence"
  }
}

export const RowValidate = async (
  value: ValidateField,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  switch (value.fieldId) {
    case "U_Type":
      Mandatory("Typ", value.newVal, value.validationResult)
      break

    case "U_FromTime":
      Mandatory("U_FromTime", value.newVal, value.validationResult)
      if (value.validationResult.valid) {
        CheckFromTimeSmaller(value.formState, value.fieldId)
      }
      if (value.validationResult.valid) {
        // check if there is overlapping
        CheckExistingTimeRange(state, value)
      }
      break
    case "U_ToTime":
      Mandatory("U_ToTime", value.newVal, value.validationResult)
      if (value.validationResult.valid) {
        CheckFromTimeSmaller(value.formState, value.fieldId)
      }
      if (value.validationResult.valid) {
        // check if there is overlapping
        CheckExistingTimeRange(state, value)
      }

      break
  }
}

const CheckExistingTimeRange = (
  state: typeof overmind.state,
  value: ValidateField
) => {
  let def = state.testtables.timeentries.tableDef.mobiletimerecording1
  let keysToCheck = def.uiState.dataFilteredAndSorted.filter(
    (k) => k.indexOf(ovltemp) < 0
  )
  let data = state.testtables.timeentries.data
  keysToCheck.some((k) => {
    if (value.newVal > data[k].U_FromTime && value.newVal < data[k].U_ToTime) {
      ValidationAddError(
        "TimeRange",
        "Schon eine Buchung erfasst für diese Zeit",
        value.validationResult
      )
      return true
    }
    return false
  })
}

const CheckFromTimeSmaller = (formState: FormState, fieldId: string) => {
  // totime needs to be smaller than fromtime
  let validatorId = "CheckTime"
  let validateField: Field
  let relatedValidateField: Field
  let ftField = formState.fields["U_FromTime"]
  let ttField = formState.fields["U_ToTime"]
  if (fieldId === "U_FromTime") {
    validateField = ftField
    relatedValidateField = ttField
  } else {
    validateField = ttField
    relatedValidateField = ftField
  }
  let ft = ftField.convertedValue
  let tt = ttField.convertedValue
  if (ft && tt) {
    if (parseFloat(ft.replace(":", ".")) > parseFloat(tt.replace(":", "."))) {
      ValidationAddError(
        validatorId,
        "Bis Zeit muss grösser sein als von Zeit!",
        validateField.validationResult
      )
    } else {
      // looks ok. so we need to remove this error as well on the related field
      ValidationRemoveError(validatorId, relatedValidateField.validationResult)
    }
  }
}
export const RowChanged = async (
  value: FieldChanged,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let formState = value.formState
  switch (value.fieldId) {
    case "U_Type":
      // check if the entry is still in the list
      let cf: ChangeField = {
        fieldId: "U_TypeId",
        formState: value.formState,
        value: "",
      }
      actions.ovl.internal.SetField(cf)
      break
    case "U_FromTime":
    case "U_ToTime":
      // calculate new duration
      let ft = formState.fields["U_FromTime"].convertedValue
      let tt = formState.fields["U_ToTime"].convertedValue
      if (ft && tt) {
        debugger
        let fts = ft.split(":")
        let tts = tt.split(":")
        let ftdecminutes = ((parseInt(fts[1]) / 60) * 100)
          .toString()
          .padStart(2, "0")
        let ttdecminutes = ((parseInt(tts[1]) / 60) * 100)
          .toString()
          .padStart(2, "0")
        let duration =
          parseFloat(tts[0] + "." + ttdecminutes) -
          parseFloat(fts[0] + "." + ftdecminutes)
        let cf: ChangeField = {
          fieldId: "U_Duration",
          formState: value.formState,
          value: duration,
        }
        actions.ovl.internal.SetField(cf)
      }
  }
}

export const BeforeSaveRow = async (
  value: BeforeSaveParam,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let newRow = <TableMobileTimeRecording>value.row
  let dt = new Date(newRow.U_Date)
  newRow.U_WeekNr = GetWeekNr(dt)
  newRow.U_User = state.portal.user.userName
}

// export const CustomAddRowColumnDefaultsHandler = async (
//   newRow: TableMobileTimeRecording,
//   tableDef: TableDataAndDef,
//   state: typeof overmind.state,
//   actions: typeof overmind.actions,
//   effects: typeof overmind.effects
// ) => {
//   newRow.U_Type = "PROJECT"
//   let selectedDate = state.ovl.screens.screens.MobileTimeEntry.selectedDate
//   if (!selectedDate) {
//     let dt = new Date()
//     selectedDate = dt.toISOString()
//   }
//   newRow.U_Date = selectedDate.substring(0, 10) + "T00:00:00"
//   newRow.U_Duration = 0
// }

export const MobileTimeRecordingMainChangeField = async (
  value: FieldChanged,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let formState = value.formState
  switch (value.fieldId) {
    case "date":
      await actions.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
        {
          selected: value.newConvertedVal,
        }
      )
      break
  }
}
