import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../ovl/src"

export const FormValidate: OvlAction<ValidateFieldType> = (value) => {
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
