import { OvlTableDefIds } from "../.."
import { InitForm } from "../../../../../ovl/ovl/src/library/Forms/actions"
import { FormFields } from "../../../../../ovl/ovl/src/library/Forms/OvlFormElement"
import { OvlAction } from "../../../../../ovl/ovl/src/index"

export const ScreenNavigateIn: OvlAction = async (_, { actions, state }) => {
  // only initialise form if not already initialised
  if (!state.ovl.forms.AutoQuotation) {
    let fields: { [key: string]: FormFields } = {
      CutOff: {
        value: "10",
        type: "int",
        ui: { labelTranslationKey: "Anschnitt [mm]" },
      },
      SawCut: {
        value: "6",
        type: "int",
        ui: { labelTranslationKey: "Schnittfuge [mm]" },
      },
      Max_Vs: {
        value: "8",
        type: "int",
        ui: {
          labelTranslationKey:
            "Verschnitt ab dem eine 2te Quelle in Betracht gezogen wird [%]",
        },
      },
      Sources: {
        value: "0",
        type: "text",
        ui: {
          labelTranslationKey:
            "Quellen (0=1500mm-13000mm in 100mm Schritten) [mm]",
        },
      },
    }
    let initForm: InitForm = {
      namespace: "autoquotation.form",
      instanceId: "autoquotationform",
      formType: "AutoQuotation",
      fields,
    }
    actions.ovl.form.InitForm(initForm)
  }
  let defId: OvlTableDefIds = "autoQuotation"
  let data = state.app.tables.autoQuotation
  await actions.ovl.table.TableInit({
    defId,
    data,
  })
}
