import { uuidv4 } from "../../../../ovl/src/global/globals"
import {
  SnackAdd,
  SnackTrackedAdd,
  SnackTrackedRemove,
} from "../../../../ovl/src/library/helpers"
import { TableMobileTimeRecording } from "./MobileTimeRecordingDetail/state"
import { OvlAction } from "../../../../ovl/src/index"

export const MarkAsSynced: OvlAction<string[]> = (
  value,
  { state, actions }
) => {
  let data = state.app.testtables.timeentries
  let nd = new Date()
  value.forEach((f) => {
    data.data[f].U_Synced = nd.toUTCString()
  })
}

export const SetMobileTimeEntrySelectedDate: OvlAction<{
  selected: string
}> = async (value, { state, actions }) => {
  let data = state.app.testtables.timeentries
  let staticFilter = { U_Date: value.selected }

  await actions.ovl.table.TableRefresh({
    defId: "mobiletimerecording1",
    data,
    forceServerDataRefresh: true,
    staticFilter,
  })
}

export const CreateTestEntries: OvlAction = async (_, { state, actions }) => {
  let snackKey = uuidv4()
  SnackTrackedAdd("Datensätze werden hinzugefügt...", "Information", snackKey)
  let dt = new Date()
  for (let d = 0; d < 3; d++) {
    for (let z = 0; z < 40; z++) {
      let testEntry: TableMobileTimeRecording = {
        U_Type: "PROJECT",
        U_TypeId: "00000010",
        U_Date: dt.toISOString().substring(0, 10) + "T00:00:00",
        U_FromTime: "01:" + ("0" + z).slice(-2),
        U_ToTime: "02:" + ("0" + z).slice(-2),
        U_Duration: 1,
      }
      testEntry.Code = undefined
      await actions.ovl.table.TableDirectSaveRow({
        data: state.app.testtables.timeentries,
        defId: "mobiletimerecording1",
        rowToSave: testEntry,
        noSnack: true,
      })
    }
    dt.setDate(dt.getDate() + 1)
  }
  SnackTrackedRemove(snackKey)
  SnackAdd("100 Testeinträge erzeugt...", "Success")
}
