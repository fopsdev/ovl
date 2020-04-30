import { overmind } from "../.."
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"

export const FormValidate = (
  value: ValidateFieldType,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  switch (value.fieldId) {
    case "msg":
      Mandatory(
        T("PortalFeedbackPleaseEnterText"),
        value.newVal,
        value.validationResult
      )
      break
  }
}
