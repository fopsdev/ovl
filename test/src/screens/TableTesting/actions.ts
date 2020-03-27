import { AsyncAction } from "../../../../ovl/node_modules/overmind"

export const HandleRefresh: AsyncAction = async ({ actions, state }, value) => {
  let def = state.testtables.tableTesting.tableDef.tab1
  let data = state.testtables.tableTesting
  actions.ovl.table.TableRefreshDataFromServer({ def, data })
}
