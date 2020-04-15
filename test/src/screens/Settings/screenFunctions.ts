import { overmind } from "../.."
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"

export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let fields: { [key: string]: FormFields } = {
    pw: { value: "" },
    pw1: { value: "" },
    pw2: { value: "" }
  }
  let initForm: InitForm = {
    validationFnName: "SettingsValidateField",
    namespace: "portal.settings",
    instanceId: "settingsform",
    formType: "Settings",
    fields
  }
  actions.ovl.form.InitForm(initForm)
}
