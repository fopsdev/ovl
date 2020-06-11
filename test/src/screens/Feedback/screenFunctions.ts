import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { T } from "../../../../ovl/src/global/globals"
import { OvlState, OvlActions, OvlEffects } from "../../../../ovl/src"

export const ScreenNavigateIn = async (
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let fields: { [key: string]: FormFields } = {
    msg: {
      value: state.ovl.screens.screens.Feedback.message,
      ui: { labelTranslationKey: T("PortalFeedbackPleaseEnterText") },
    },
  }
  let initForm: InitForm = {
    namespace: "portal.feedback",
    instanceId: state.ovl.screens.screens.Feedback.type,
    formType: "Feedback",
    fields,
  }
  actions.ovl.form.InitForm(initForm)
}
