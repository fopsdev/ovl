import { GetWeekNr, ovltemp } from "../../../../../ovl/src/global/globals"
import {
  ChangeField,
  Field,
  FieldChanged,
  OvlFormState,
  ValidateFieldType,
} from "../../../../../ovl/src/library/forms/actions"
import { LookupListPostData } from "../../../../../ovl/src/library/forms/Controls/helpers"

import { Mandatory } from "../../../../../ovl/src/library/forms/validators"
import {
  BeforeSaveParam,
  ListFnReturnValue,
  TableDataAndDef,
} from "../../../../../ovl/src/library/Table/Table"
import { TableMobileTimeRecording } from "./state"
import { OvlState } from "../../../../../ovl/src"
import {
  FieldGetList_Type,
  FieldGetList_ReturnType,
} from "../../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/src/ovlTypes"

export const FormShow: OvlAction = async (formState: OvlFormState) => {
  console.log("hello from timeentry formshow hook")
}

export const Field_U_Type_GetList: OvlAction = (row: {
  [key: string]: {}
}): FieldGetList_ReturnType => {
  return {
    data: {
      Prj: { Code: "PROJECT", Description: "Projekt" },
      Abs: { Code: "ABSENCE", Description: "Absenz" },
    },
    index: undefined,
  }
}

export const Field_U_TypeId_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }: { row: TableMobileTimeRecording }, { state }) => {
  if (row.U_Type === "PROJECT") {
    return state.app.testtables.lookups.ProjectTypeId
  } else {
    return state.app.testtables.lookups.AbsenceTypeId
  }
}

export const Field_U_TypeId_LookupPostData: OvlAction<{
  lookupData: LookupListPostData
  row: {}
}> = ({ lookupData, row }) => {
  if (row["U_Type"] === "PROJECT") {
    lookupData.lookupType = "timeProject"
  } else {
    lookupData.lookupType = "timeAbsence"
  }
}

export const FormValidate: OvlAction<ValidateFieldType> = async (
  value,
  { state }
) => {
  switch (value.fieldId) {
    case "U_Type":
      Mandatory("Typ", value.newVal, value.validationResult)
      break

    case "U_FromTime":
      Mandatory("U_FromTime", value.newVal, value.validationResult)
      if (value.validationResult.errors.length === 0) {
        CheckFromTimeSmaller(value.formState, value.fieldId)
      }
      if (value.validationResult.errors.length === 0) {
        // check if there is overlapping
        CheckExistingTimeRange(state, value)
      }
      break
    case "U_ToTime":
      Mandatory("U_ToTime", value.newVal, value.validationResult)
      if (value.validationResult.errors.length === 0) {
        CheckFromTimeSmaller(value.formState, value.fieldId)
      }
      if (value.validationResult.errors.length === 0) {
        // check if there is overlapping
        CheckExistingTimeRange(state, value)
      }

      break
  }
}

const CheckExistingTimeRange = (state: OvlState, value: ValidateFieldType) => {
  let def = state.app.testtables.timeentries.tableDef.mobiletimerecording1
  let keysToCheck = def.uiState.dataFilteredAndSorted.filter(
    (k) => k.indexOf(ovltemp) < 0
  )
  let data = state.app.testtables.timeentries.data
  keysToCheck.some((k) => {
    if (value.newVal > data[k].U_FromTime && value.newVal < data[k].U_ToTime) {
      value.validationResult.errors.push(
        "Schon eine Buchung erfasst für diese Zeit"
      )
      return true
    }
    return false
  })
}

const CheckFromTimeSmaller = (formState: OvlFormState, fieldId: string) => {
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
      validateField.validationResult.errors.push(
        "Bis Zeit muss grösser sein als von Zeit!"
      )
    }
  }
}
export const FormChanged: OvlAction<FieldChanged> = async (
  value,
  { actions }
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

export const FormBeforeSave: OvlAction<BeforeSaveParam> = async (
  value,
  { state }
) => {
  let newRow = <TableMobileTimeRecording>value.row
  let dt = new Date(newRow.U_Date)
  newRow.U_WeekNr = GetWeekNr(dt)
  newRow.U_User = state.app.user.userName
}

export const FormAdd: OvlAction<{
  newRow: TableMobileTimeRecording
  tableDef: TableDataAndDef
}> = async ({ newRow }) => {
  newRow.U_Type = "PROJECT"
  newRow.U_Duration = 0
}
