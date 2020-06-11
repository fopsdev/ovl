import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"
import { OvlState, OvlActions, OvlEffects } from "../../../../ovl/src"

export const FormValidate = (
  value: ValidateFieldType,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
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
