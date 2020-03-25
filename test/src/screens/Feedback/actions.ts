import { Action, AsyncAction } from "../../../../ovl/node_modules/overmind"
import { T, api } from "../../../../ovl/src/global/globals"
import {
  FormState,
  GetFormValidationErrors,
  ValidateField
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { FieldId } from "./FeedbackForm"

export const FeedbackValidateField: Action<ValidateField> = (_, value) => {
  switch (<FieldId>value.fieldId) {
    case "msg":
      Mandatory(
        T("AppFeedbackPleaseEnterText"),
        value.newVal,
        value.validationResult
      )
      break
  }
}

export const SaveFeedback: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let res = await effects.postRequest(api.url + "data/savefeedback", {
      language: state.ovl.language.language,
      message: value.fields["msg"].value,
      orderDate: state.ovl.screens.screens.Feedback.orderDate,
      orderNum: state.ovl.screens.screens.Feedback.orderNum,
      refNum: state.ovl.screens.screens.Feedback.refNum,
      assignedTo: state.portal.partner.salesContact.id,
      feedbackType: state.ovl.screens.screens.Feedback.type
    })

    if (res.status !== 200) {
      return
    }
    actions.ovl.snack.AddSnack({
      durationMs: 3000,
      text: T("AppFeedbackSaved"),
      type: "Success"
    })
    if (state.ovl.screens.nav.currentScreen === "Feedback") {
      actions.ovl.navigation.NavigateBack()
    }
    actions.ovl.form.ResetFormAfterAnimation(value) // post back
  } else {
    actions.ovl.snack.AddSnack({
      durationMs: 3000,
      text: GetFormValidationErrors(value).join("\n"),
      type: "Error"
    })
  }
}
