import { OvlTableDef } from "../../../../ovl/src/library/Table/Table"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"

import { TblTranslationColumn } from "./state"
import { T } from "../../../../ovl/src/global/globals"

import {
  FormAfterSave_Type,
  FormAfterDelete_Type,
  FormShow_Type,
  FormAfterRender_Type,
  FormValidate_Type,
  FormSaveError_ReturnType,
  FormSaveError_Type,
} from "../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../ovl/src/index"

export const FormSaveError: OvlAction<
  FormSaveError_Type,
  FormSaveError_ReturnType
> = async (value) => {
  if (
    value.res.status === 422 ||
    (value.res.type && value.res.type === "UniqueKeyViolation")
  ) {
    // Integrity Error
    // In this case most probably because Group and Code are not unique
    let field = value.formState.fields["U_Group"]
    field.watched = true
    field.validationResult.errors.push("Gruppe/Code schon vorhanden!")
    return true
  }
  return false
}

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
  let def: OvlTableDef = state.app.tables.translation.tableDef.translation
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
