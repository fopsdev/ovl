import { overmind } from "../.."
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"

export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let fields: { [key: string]: FormFields } = {
    msg: { value: state.ovl.screens.screens.Feedback.message }
  }
  let initForm: InitForm = {
    validationFnName: "FeedbackValidateField",
    namespace: "feedback",
    instanceId: state.ovl.screens.screens.Feedback.type,
    formType: "Feedback",
    fields
  }
  actions.ovl.form.InitForm(initForm)
}
