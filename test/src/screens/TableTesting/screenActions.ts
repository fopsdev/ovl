import { OvlTableDefIds } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"
import { ScreenNavigateOut_ReturnType } from "../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../ovl/src/index"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "tab1"
  let data = state.app.testtables.tableTesting
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
  let data = state.app.testtables.tableTesting
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
  if ((await DialogOkCancel({ text: "Test: Wirklich raus hier?" })) === 2) {
    return Promise.resolve("Navigation abgebrochen durch User")
  }
}
