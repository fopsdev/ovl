import {
  ValidateFieldType,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { TableDef, TableData } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"

import { TblTranslationColumn } from "./state"
import { T } from "../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../ovl/src"
import {
  FormAfterSave_Type,
  FormAfterDelete_Type,
  FormShow_Type,
  FormAfterRender_Type,
  FormValidate_Type,
} from "../../../../ovl/src/global/hooks"

export const FormShow: OvlAction<FormShow_Type> = async (value) => {
  console.log("hello from translation formshow hook")
}

export const FormAfterRender: OvlAction<FormAfterRender_Type> = async (
  value
) => {
  console.log("hello from  translation formafterrender hook.")
}

export const FormValidate: OvlAction<FormValidate_Type> = async (
  value,
  { state }
) => {
  let def: TableDef = state.demoApp.tables.translation.tableDef.translation
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

export const FormAfterSave: OvlAction<FormAfterSave_Type> = async (
  { key, def, data, res },
  { state, actions }
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}

export const FormAfterDelete: OvlAction<FormAfterDelete_Type> = async (
  { key, def, data, res },
  { state, actions }
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}
