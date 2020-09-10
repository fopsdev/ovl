import { T } from "../../../../ovl/src/global/globals"
import {
  OvlFormState,
  GetFormValidationErrors,
} from "../../../../ovl/src/library/forms/actions"
import { SnackAdd } from "../../../../ovl/src/library/helpers"
import { OvlAction } from "../../../../ovl/src/ovlTypes"

export const SaveFeedback: OvlAction<OvlFormState> = async (
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
        orderDate: state.app.screens.feedback.orderDate,
        orderNum: state.app.screens.feedback.orderNum,
        refNum: state.app.screens.feedback.refNum,
        assignedTo: state.app.partner.salesContact.id,
        feedbackType: state.app.screens.feedback.type,
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
