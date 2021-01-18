import {
  ChangeField,
  FieldChanged,
  ValidateFieldType,
} from "../../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../../ovl/src/library/forms/validators"
import { TableTestingColumn } from "../state"
import { Field_U_ItemCode_GetList } from "./list"

import {
  FormChanged_Type,
  FieldGetList_Type,
  FormValidate_Type,
} from "../../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/src/index"

export const FormChanged: OvlAction<FormChanged_Type> = async (
  value,
  { actions }
) => {
  switch (value.fieldId) {
    case "U_ItmsGrpCod":
      // check if the entry is still in the list
      if (value.newConvertedVal) {
        let listdata = actions.custom.testtables.tabletesting.Field_U_ItemCode_GetList(
          <FieldGetList_Type>{
            row: value.row,
          }
        )
        let itemCode = value.formState.fields["U_ItemCode"].convertedValue
        if (itemCode) {
          let itemGroup = listdata.data[itemCode]["ItmsGrpCod"]

          if (itemGroup !== value.newConvertedVal) {
            let cf: ChangeField = {
              fieldId: "U_ItemCode",
              formState: value.formState,
              value: "",
              isInit: true,
            }
            actions.ovl.internal.SetField(cf)
          }
        }
      }
      break
    case "U_Alpha":
      if (value.newConvertedVal === "Fops") {
        let cf: ChangeField = {
          fieldId: "U_Memo",
          formState: value.formState,
          value: "Ebenfalls Fops",
        }
        actions.ovl.internal.SetField(cf)
      }
  }
}

export const FormValidate: OvlAction<FormValidate_Type> = async (value) => {
  switch (value.fieldId as TableTestingColumn) {
    case "U_Alpha":
      Mandatory("U_Alpha", value.newVal, value.validationResult)
      break
  }
}
