import {
  FieldChanged,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { OvlState, OvlActions, OvlEffects } from "../../../../ovl/src"

export const FormShow = async (
  formState: FormState,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log("hello from timeentry main formshow hook")
  console.log(formState)
}

export const FormChanged = async (
  value: FieldChanged,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let formState = value.formState
  switch (value.fieldId) {
    case "date":
      await actions.portal.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
        {
          selected: value.newConvertedVal,
        }
      )
      break
  }
}
