import { OvlTableDefIds } from "../../../../ovl/src"
import { OvlAction } from "../../../../ovl/src/index"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "audit"
  let data = state.app.tables.audit
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn = async (_, { state, actions }) => {
  let defId: OvlTableDefIds = "audit"
  let data = state.app.tables.audit
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}
