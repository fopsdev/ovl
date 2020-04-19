import {
  ValidateField,
  FormState,
} from "../../../../ovl/src/library/forms/actions"
import { TableDef, TableData } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { overmind } from "../.."
import { TblTranslationColumn } from "./state"

export const FormShow = async (
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from translation formshow hook")
}

export const FormAfterRender = async (
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from  translation formafterrender hook.")
}

export const RowValidate = async (
  value: ValidateField,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let def: TableDef = state.portal.tables.translation.tableDef.translation
  switch (value.fieldId as TblTranslationColumn) {
    case "U_Group":
      Mandatory(
        def.columns[value.fieldId].caption,
        value.newVal,
        value.validationResult
      )
      break
    case "U_Code":
      Mandatory(
        def.columns[value.fieldId].caption,
        value.newVal,
        value.validationResult
      )
      break
  }
}

export const CustomSaveRowAfterSaveHandler = async (
  {
    key,
    def,
    data,
    res,
  }: { key: string; def: TableDef; data: TableData; res: any },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}

export const CustomDeleteRowAfterDeleteHandler = async (
  {
    key,
    def,
    data,
    res,
  }: { key: string; def: TableDef; data: TableData; res: any },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  await actions.ovl.internal.SetLanguage(state.ovl.language.language)
}
