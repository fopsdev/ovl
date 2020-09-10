import {
  FieldChanged,
  OvlFormState,
} from "../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../ovl/src/ovlTypes"

export const FormShow: OvlAction = async (formState: OvlFormState) => {
  console.log("hello from timeentry main formshow hook")
  console.log(formState)
}

export const FormChanged = async (value, { actions }) => {
  switch (value.fieldId) {
    case "date":
      await actions.app.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
        {
          selected: value.newConvertedVal,
        }
      )
      break
  }
}
