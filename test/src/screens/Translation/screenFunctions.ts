import { overmind, TableDefIds } from "../../index"

export const ScreenRefresh = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "translation"
  let data = state.portal.tables.translation
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let defId: TableDefIds = "translation"
  let data = state.portal.tables.translation
  actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}
