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
