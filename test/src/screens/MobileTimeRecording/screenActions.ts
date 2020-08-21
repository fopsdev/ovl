import { TableDefIds, OvlAction, FormType } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { getDateValue } from "../../../../ovl/src/global/globals"
import { ScreenNavigateOut_ReturnType } from "../../../../ovl/src/global/hooks"
import { stateStore } from "../../../../ovl/src/offlineStorage"

/* this is for the mobiletimeentryform screen */
export const ScreenShow: OvlAction = async (_) => {
  console.log("hello from ScreenShow")
}

/* main form functions */
export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "mobiletimerecording1"
  let data = state.demoApp.testtables.timeentries
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}

let initialised = false
export const ScreenNavigateIn: OvlAction = async (_, { actions, state }) => {
  let mainFormInstanceId = "mobiletimerecordingmain1"
  let formType: FormType = "MobileTimeEntryMain"
  if (!initialised) {
    let dt = new Date()
    let convDate = dt.toISOString().substring(0, 10) + "T00:00:00"
    let fields: { [key: string]: FormFields } = {
      date: {
        value: getDateValue(convDate),
        type: "date",
      },
    }

    let initForm: InitForm = {
      namespace: "testtables.mobiletimerecordingmain",
      instanceId: mainFormInstanceId,
      formType,
      fields,
    }
    actions.ovl.form.InitForm(initForm)
    initialised = true
  }

  await actions.demoApp.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
    {
      selected:
        state.ovl.forms[formType][mainFormInstanceId].fields.date
          .convertedValue,
    }
  )
}

export const ScreenNavigateOut: OvlAction<
  {},
  ScreenNavigateOut_ReturnType
> = async (_) => {
  // if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
  //   return Promise.resolve("Navigation abgebrochen durch User")
  // }
  return Promise.resolve("")
}
