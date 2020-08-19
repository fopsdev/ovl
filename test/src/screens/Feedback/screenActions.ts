import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { T } from "../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../ovl/src"

export const ScreenNavigateIn: OvlAction = async (_, { state, actions }) => {
  let fields: { [key: string]: FormFields } = {
    msg: {
      value: state.demoApp.screens.feedback.message,
      ui: { labelTranslationKey: T("PortalFeedbackPleaseEnterText") },
    },
  }
  let initForm: InitForm = {
    namespace: "feedback",
    instanceId: state.demoApp.screens.feedback.type,
    formType: "Feedback",
    fields,
  }
  actions.ovl.form.InitForm(initForm)
}
