import { overmind, TableDefIds } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"

export const ScreenRefresh = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "tab1"
  let data = state.testtables.tableTesting
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

export const ScreenNavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "tab1"
  let data = state.testtables.tableTesting
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

export const ScreenNavigateOut = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
    return Promise.resolve("Navigation abgebrochen durch User")
  }
}
