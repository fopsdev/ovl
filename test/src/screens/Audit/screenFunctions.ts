import {
  OvlState,
  OvlActions,
  OvlEffects,
  TableDefIds,
} from "../../../../ovl/src"

export const ScreenRefresh = async (
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let defId: TableDefIds = "audit"
  let data = state.portal.tables.audit
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn = async (
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let defId: TableDefIds = "audit"
  let data = state.portal.tables.audit
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}
