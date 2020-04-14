import { overmind, TableDefIds } from "../../index"

export const ScreenRefresh = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "audit"
  let data = state.portal.tables.audit
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "audit"
  let data = state.portal.tables.audit
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    forceServerDataRefresh: true,
  })
}