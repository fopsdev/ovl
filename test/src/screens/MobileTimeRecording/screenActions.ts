import { TableDefIds, OvlAction } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { getDateValue } from "../../../../ovl/src/global/globals"
import { ScreenNavigateOut_ReturnType } from "../../../../ovl/src/global/hooks"

/* this is for the mobiletimeentryform screen */
export const ScreenShow: OvlAction = async (_) => {
  console.log("hello from ScreenShow")
}

/* main form functions */
export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "mobiletimerecording1"
  let data = state.portal.testtables.timeentries
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}

let initialised = false
export const ScreenNavigateIn: OvlAction = async (_, { actions }) => {
  if (!initialised) {
    let dt = new Date()
    let convDate = dt.toISOString().substring(0, 10) + "T00:00:00"
    let fields: { [key: string]: FormFields } = {
      date: {
        value: getDateValue(convDate),
        type: "date",
      },
    }
    let mainFormInstanceId = "mobiletimerecordingmain1"
    let initForm: InitForm = {
      namespace: "testtables.mobiletimerecordingmain",
      instanceId: mainFormInstanceId,
      formType: "MobileTimeEntryMain",
      fields,
    }
    actions.ovl.form.InitForm(initForm)
    await actions.portal.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
      {
        selected: convDate,
      }
    )
    initialised = true
  }
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