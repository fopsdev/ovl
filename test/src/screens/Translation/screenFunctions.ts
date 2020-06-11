import { TableDefIds } from "../../index"
import { OvlState, OvlActions, OvlEffects } from "../../../../ovl/src"

export const ScreenRefresh = async (
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let defId: TableDefIds = "translation"
  let data = state.portal.tables.translation
  actions.ovl.table.TableRefresh({ defId, data, forceServerDataRefresh: true })
}

export const ScreenNavigateIn = async (
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  let defId: TableDefIds = "translation"
  let data = state.portal.tables.translation
  await actions.ovl.table.TableRefresh({
    defId,
    data,
    ignoreRefreshedMessageSnack: true,
  })
}
