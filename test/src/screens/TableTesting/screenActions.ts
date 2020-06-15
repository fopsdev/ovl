import { TableDefIds, OvlAction } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "tab1"
  let data = state.portal.testtables.tableTesting
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
  let defId: TableDefIds = "tab1"
  let data = state.portal.testtables.tableTesting
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

export const ScreenNavigateOut: OvlAction = async (_) => {
  if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
    return Promise.resolve("Navigation abgebrochen durch User")
  }
}
