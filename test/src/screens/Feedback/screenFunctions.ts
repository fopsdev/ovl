import { overmind } from "../.."
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { T } from "../../../../ovl/src/global/globals"

export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
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
