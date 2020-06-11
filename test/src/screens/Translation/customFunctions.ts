import {
  ValidateFieldType,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { TableDef, TableData } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"

import { TblTranslationColumn } from "./state"
import { T } from "../../../../ovl/src/global/globals"
import { OvlState, OvlActions, OvlEffects } from "../../../../ovl/src"

export const FormShow = async (
  formState: FormState,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log("hello from translation formshow hook")
}

export const FormAfterRender = async (
  formState: FormState,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log("hello from  translation formafterrender hook.")
}

export const FormValidate = async (
  value: ValidateFieldType,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
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

export const FormAfterSave = async (
  {
    key,
    def,
    data,
    res,
  }: { key: string; def: TableDef; data: TableData; res: any },
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}

export const FormAfterDelete = async (
  {
    key,
    def,
    data,
    res,
  }: { key: string; def: TableDef; data: TableData; res: any },
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}
