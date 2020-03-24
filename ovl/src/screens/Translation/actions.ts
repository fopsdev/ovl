import { AsyncAction } from "overmind"
import { ResetT } from "../../global/globals"
import { ValidateField } from "../../library/Forms/actions"
import { Mandatory } from "../../library/forms/validators"
import { TableData, TableDef } from "../../library/Table/Table"
import { Translation } from "./state"

export const RowValidate: AsyncAction<ValidateField> = async (
  { state },
  value
) => {
  let def: TableDef =
    state.ovl.language.tables.translations.tableDef.translation
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
  // clear text cache
  ResetT()
}

export const CustomDeleteRowAfterDeleteHandler: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
  res: {}
}> = async ({ state }, value) => {
  delete state.ovl.language.translations[value.key]
  // clear text cache
  ResetT()
}
