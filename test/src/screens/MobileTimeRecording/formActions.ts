import {
  FieldChanged,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../ovl/src"

export const FormShow: OvlAction = async (formState: FormState) => {
  console.log("hello from timeentry main formshow hook")
  console.log(formState)
}

export const FormChanged = async (value, { actions }) => {
  switch (value.fieldId) {
    case "date":
      await actions.demoApp.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
        {
          selected: value.newConvertedVal,
        }
      )
      break
  }
}
