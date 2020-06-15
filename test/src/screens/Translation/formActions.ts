import {
  ValidateFieldType,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { TableDef, TableData } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"

import { TblTranslationColumn } from "./state"
import { T } from "../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../ovl/src"

export const FormShow: OvlAction<FormState> = async (formState) => {
  console.log("hello from translation formshow hook")
}

export const FormAfterRender: OvlAction<FormState> = async (formState) => {
  console.log("hello from  translation formafterrender hook.")
}

export const FormValidate: OvlAction<ValidateFieldType> = async (
  value,
  { state }
) => {
  let def: TableDef = state.portal.tables.translation.tableDef.translation
  switch (value.fieldId as TblTranslationColumn) {
    case "U_Group":
      Mandatory(
        T(def.columns[value.fieldId].ui.labelTranslationKey),
        value.newVal,
        value.validationResult
      )
      break
    case "U_Code":
      Mandatory(
        T(def.columns[value.fieldId].ui.labelTranslationKey),
        value.newVal,
        value.validationResult
      )
      break
  }
}

export const FormAfterSave: OvlAction<{
  key: string
  def: TableDef
  data: TableData
  res: any
}> = async ({ key, def, data, res }, { state, actions }) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}

export const FormAfterDelete: OvlAction<{
  key: string
  def: TableDef
  data: TableData
  res: any
}> = async ({ key, def, data, res }, { state, actions }) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}
