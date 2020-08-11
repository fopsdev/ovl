import { TableDefIds } from "../../index"
import { OvlAction } from "../../../../ovl/src"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "translation"
  let data = state.demoApp.tables.translation
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "translation"
  let data = state.demoApp.tables.translation
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}
