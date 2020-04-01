import { Action } from "../../../../ovl/node_modules/overmind"

export const OpenLanguageTable: Action = ({ state, actions }, value) => {
  actions.ovl.table.TableRefresh({
    def: state.portal.tables.translations.tableDef.translation,
    data: state.portal.tables.translations,
    init: true
  })
  actions.ovl.navigation.NavigateTo("Translation")
}
