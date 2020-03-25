import { Action, AsyncAction } from "overmind"
import {
  ValidateField,
  FormState,
  GetFormValidationErrors
} from "../../library/forms/actions"
import { FieldId } from "./FeedbackForm"
import { Mandatory } from "../../library/forms/validators"
import { T } from "../../global/globals"

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
  actions.forms.ValidateForm(value)
  if (value.valid) {
    let res = await effects.global.saveFeedback({
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
    actions.snack.AddSnack({
      durationMs: 3000,
      text: T("AppFeedbackSaved"),
      type: "Success"
    })
    if (state.ovl.screens.nav.currentScreen === "Feedback") {
      actions.global.NavigateBack()
    }
    actions.forms.ResetFormAfterAnimation(value) // post back
  } else {
    actions.snack.AddSnack({
      durationMs: 3000,
      text: GetFormValidationErrors(value).join("\n"),
      type: "Error"
    })
  }
}
