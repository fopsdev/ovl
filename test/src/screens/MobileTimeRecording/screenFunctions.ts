import { overmind, TableDefIds } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { getDateValue } from "../../../../ovl/src/global/globals"

export const ScreenRefresh = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "mobiletimerecording1"
  let data = state.testtables.timeentries
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true
  })
}
let initialised = false
export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  if (!initialised) {
    let dt = new Date()
    let convDate = dt.toISOString().substring(0, 10) + "T00:00:00"
    let fields: { [key: string]: FormFields } = {
      date: { value: getDateValue(convDate), type: "date" }
    }
    let initForm: InitForm = {
      changedFnName: "MobileTimeRecordingMainChangeField",
      namespace: "testtables.mobiletimerecording",
      instanceId: "mobiletimerecordingmain1",
      formType: "MobileTimeEntryMain",
      fields
    }
    actions.ovl.form.InitForm(initForm)
    await actions.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
      {
        selected: convDate
      }
    )
  }
  initialised = true
}

export const NavigateOut = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  // if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
  //   return Promise.resolve("Navigation abgebrochen durch User")
  // }
}
