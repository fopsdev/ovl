import { AsyncAction, Action } from "../../../../ovl/node_modules/overmind"
import { Translation } from "./state"
import { ValidateField } from "../../../../ovl/src/library/forms/actions"
import { TableDef, TableData } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { ResetT } from "../../../../ovl/src/global/globals"

export const OpenLanguageTable: Action = ({ state, actions }, value) => {
  let tabledata = state.portal.tables.translations.data
  Object.keys(state.ovl.language.translations).forEach(k => {
    if (!tabledata[k]) {
      tabledata[k] = { ID: k, Translation: state.ovl.language.translations[k] }
    } else {
      tabledata[k].ID = k
      tabledata[k].Translation = state.ovl.language.translations[k]
    }
  })
  actions.ovl.table.TableRefresh({
    def: state.portal.tables.translations.tableDef.translation,
    data: state.portal.tables.translations,
    init: true
  })
  actions.ovl.navigation.NavigateTo("Translation")
}

export const RowValidate: AsyncAction<ValidateField> = async (
  { state },
  value
) => {
  let def: TableDef = state.portal.tables.translations.tableDef.translation
  switch (<keyof Translation>value.fieldId) {
    case "ID":
      Mandatory(
        def.columns[value.fieldId].caption,
        value.newVal,
        value.validationResult
      )
      break
    case "Translation":
      Mandatory(
        def.columns[value.fieldId].caption,
        value.newVal,
        value.validationResult
      )
      break
  }
}

export const CustomSaveRowAfterSaveHandler: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
  res: Translation
}> = async ({ state }, value) => {
  let oldKey = value.key
  let newKey = value.res.ID
  // key could have changed
  delete state.ovl.language.translations[oldKey]
  state.ovl.language.translations[newKey] = value.res.Translation
  // clear text cache and force change on translatiosn which is tracked everywhere
  //state.ovl.language.translations = JSON.parse(JSON.stringify(state.ovl.language.translations))
  ResetT()
}

export const CustomDeleteRowAfterDeleteHandler: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
  res: {}
}> = async ({ state }, value) => {
  delete state.ovl.language.translations[value.key]
  // clear text cache and force change on translatiosn which is tracked everywhere
  //state.ovl.language.translations = JSON.parse(JSON.stringify(state.ovl.language.translations))
  ResetT()
}
