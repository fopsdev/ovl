import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../ovl/src/index"

export const ScreenNavigateIn: OvlAction = async (_, { actions }) => {
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
    namespace: "settings",
    instanceId: "settingsform",
    formType: "Settings",
    fields,
  }
  actions.ovl.form.InitForm(initForm)
}
