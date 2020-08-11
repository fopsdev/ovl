import { TableDefIds, OvlAction } from "../../../../ovl/src"

export const ScreenRefresh: OvlAction = async (_, { state, actions }) => {
  let defId: TableDefIds = "audit"
  let data = state.demoApp.tables.audit
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn = async (_, { state, actions }) => {
  let defId: TableDefIds = "audit"
  let data = state.demoApp.tables.audit
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}
