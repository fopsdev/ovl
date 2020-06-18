import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"
import { ValidateFieldType } from "../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../ovl/src"
import { FormValidate_Type } from "../../../../ovl/src/global/hooks"

export const FormValidate: OvlAction<FormValidate_Type> = (value) => {
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
