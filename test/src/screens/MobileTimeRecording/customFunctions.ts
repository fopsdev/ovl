import { overmind } from "../.."
import { TableMobileTimeRecording } from "./MobileTimeRecordingDetail/state"
import {
  ListFnReturnValue,
  BeforeSaveParam,
  TableDataAndDef,
} from "../../../../ovl/src/library/Table/Table"
import { LookupListPostData } from "../../../../ovl/src/library/forms/Controls/helpers"
import {
  ValidateFieldType,
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

export const FormShow = async (
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from timeentry main formshow hook")
  console.log(formState)
}

export const FormChanged = async (
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
