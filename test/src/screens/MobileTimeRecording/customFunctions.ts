import { overmind } from "../.."
import {
  FieldChanged,
  FormState,
} from "../../../../ovl/src/library/forms/actions"

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
