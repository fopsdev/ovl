import { OvlTableDefIds } from "../../index"
import { OvlAction } from "../../../../ovl/src/index"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "translation"
  let data = state.app.tables.translation
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "translation"
  let data = state.app.tables.translation
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}
