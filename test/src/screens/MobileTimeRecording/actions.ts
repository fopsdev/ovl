import { AsyncAction, Action } from "overmind"
import { TableMobileTimeRecording, tblMobileTimeRecording } from "./state"
import { overmind } from "../.."
import {
  ValidateField,
  FormState,
  Field,
  FieldChanged,
  ChangeField
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { ovltemp, GetWeekNr, uuidv4 } from "../../../../ovl/src/global/globals"
import {
  ValidationAddError,
  ValidationRemoveError
} from "../../../../ovl/src/library/forms/helper"
import {
  BeforeSaveParam,
  TableDataAndDef,
  TableDef
} from "../../../../ovl/src/library/Table/Table"
import {
  SnackTrackedAdd,
  SnackTrackedRemove,
  SnackAdd
} from "../../../../ovl/src/library/helpers"

export const RowValidate: AsyncAction<ValidateField> = async (
  { state },
  value
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
    k => k.indexOf(ovltemp) < 0
  )
  let data = state.testtables.timeentries.data
  keysToCheck.some(k => {
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

export const RowChanged: AsyncAction<FieldChanged> = async (
  { actions, state },
  value
) => {
  let formState = value.formState
  switch (value.fieldId) {
    case "U_Type":
      // check if the entry is still in the list
      let cf: ChangeField = {
        fieldId: "U_TypeId",
        formState: value.formState,
        value: ""
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
        let ftdecminutes = ((parseInt(fts[1]) / 60) * 100).toString()
        let ttdecminutes = ((parseInt(tts[1]) / 60) * 100).toString()
        let duration =
          parseFloat(tts[0] + "." + ttdecminutes) -
          parseFloat(fts[0] + "." + ftdecminutes)
        let cf: ChangeField = {
          fieldId: "U_Duration",
          formState: value.formState,
          value: duration
        }
        actions.ovl.internal.SetField(cf)
      }
  }
}

export const BeforeSaveRow: AsyncAction<BeforeSaveParam> = async (
  { state },
  value
) => {
  let newRow = <TableMobileTimeRecording>value.row
  let dt = new Date(newRow.U_Date)
  newRow.U_WeekNr = GetWeekNr(dt)
  newRow.U_User = state.portal.user.userName
}

export const CustomAddRowColumnDefaultsHandler: AsyncAction<{
  newRow: TableMobileTimeRecording
  tableDef: TableDataAndDef
}> = async ({ state }, value) => {
  let newRow = value.newRow
  newRow.U_Type = "PROJECT"
  let selectedDate = state.ovl.screens.screens.MobileTimeEntry.selectedDate
  if (!selectedDate) {
    let dt = new Date()
    selectedDate = dt.toISOString()
  }
  newRow.U_Date = selectedDate + "T00:00:00"
  newRow.U_Duration = 0
}

export const SetMobileTimeEntrySelectedDate: AsyncAction<{
  def: TableDef
  selected: string
}> = async ({ state, actions }, value) => {
  value.def.options.filter.static.U_Date = value.selected + "T00:00:00"
  state.ovl.screens.screens.MobileTimeEntry.selectedDate = value.selected

  let data = state.testtables.timeentries
  let def = state.testtables.timeentries.tableDef.mobiletimerecording1

  await actions.ovl.table.TableRefresh({
    def,
    data,
    init: true,
    forceFreshServerData: 0
  })
}

export const CreateTestEntries: AsyncAction = async ({ state, actions }, _) => {
  let snackKey = uuidv4()
  SnackTrackedAdd("Datensätze werden hinzugefügt...", "Information", snackKey)
  let dt = new Date()
  for (let d = 0; d < 10; d++) {
    for (let z = 0; z < 10; z++) {
      let testEntry: TableMobileTimeRecording = {
        U_Type: "PROJECT",
        U_TypeId: "00000010",
        U_Date: dt.toISOString().substring(0, 10) + "T00:00:00",
        U_FromTime: "01:" + ("0" + z).slice(-2),
        U_ToTime: "01:" + ("0" + z).slice(-2),
        U_Duration: 1
      }
      testEntry.Code = undefined
      await actions.ovl.internal.TableDirectSaveRow({
        data: state.testtables.timeentries,
        def: state.testtables.timeentries.tableDef.mobiletimerecording1,
        rowToSave: testEntry,
        noSnack: true
      })
    }
    dt.setDate(dt.getDate() + 1)
  }
  SnackTrackedRemove(snackKey)
  SnackAdd("100 Testeinträge erzeugt...", "Success")
}
