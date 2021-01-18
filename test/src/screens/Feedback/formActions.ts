import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { T } from "../../../../ovl/src/global/globals"

import { FormValidate_Type } from "../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../ovl/src/index"

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
