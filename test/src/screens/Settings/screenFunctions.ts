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
    pw: {
      value: "",
      ui: { labelTranslationKey: "AppLoginPassword", isPassword: true },
    },
    pw1: {
      value: "",
      ui: { labelTranslationKey: "AppSettingsPasswordNew", isPassword: true },
    },
    pw2: {
      value: "",
      ui: {
        labelTranslationKey: "AppSettingsPasswordNewConfirmation",
        isPassword: true,
      },
    },
  }
  let initForm: InitForm = {
    namespace: "portal.settings",
    instanceId: "settingsform",
    formType: "Settings",
    fields,
  }
  actions.ovl.form.InitForm(initForm)
}
