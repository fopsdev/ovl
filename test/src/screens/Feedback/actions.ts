import { T } from "../../../../ovl/src/global/globals"
import {
  FormState,
  GetFormValidationErrors,
} from "../../../../ovl/src/library/forms/actions"
import { SnackAdd } from "../../../../ovl/src/library/helpers"
import { OvlAction } from "../../../../ovl/src"

export const SaveFeedback: OvlAction<FormState> = async (
  value,
  { state, actions, effects }
) => {
  actions.ovl.form.ValidateForm(value)
  if (value.valid) {
    let res = await effects.ovl.postRequest(
      state.ovl.apiUrl + "data/savefeedback",
      {
        language: state.ovl.language.language,
        message: value.fields["msg"].value,
        orderDate: state.demoApp.screens.feedback.orderDate,
        orderNum: state.demoApp.screens.feedback.orderNum,
        refNum: state.demoApp.screens.feedback.refNum,
        assignedTo: state.demoApp.partner.salesContact.id,
        feedbackType: state.demoApp.screens.feedback.type,
      }
    )

    if (res.status !== 200) {
      return
    }
    SnackAdd(T("PortalFeedbackSaved"), "Success")
    if (state.ovl.screens.nav.currentScreen === "Feedback") {
      actions.ovl.navigation.NavigateBack()
    }
    actions.ovl.form.ResetFormAfterNavigation(value) // post back
  } else {
    SnackAdd(GetFormValidationErrors(value).join("\n"), "Error")
  }
}
