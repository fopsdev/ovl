import { OvlTableDefIds, OvlAction } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"
import { ScreenNavigateOut_ReturnType } from "../../../../ovl/src/global/hooks"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "tab1"
  let data = state.demoApp.testtables.tableTesting
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
  defId = "tab2"
  actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}

export const ScreenNavigateIn: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "tab1"
  let data = state.demoApp.testtables.tableTesting
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
    refreshServerDataIfOlderThan: 10,
  })
  defId = "tab2"
  actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })

  defId = "tab3"
  actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}

export const ScreenNavigateOut: OvlAction<
  {},
  ScreenNavigateOut_ReturnType
> = async (_) => {
  if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
    return Promise.resolve("Navigation abgebrochen durch User")
  }
}
