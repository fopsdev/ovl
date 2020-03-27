import { U_ItemCodeGetListFn } from "./functions"
import { TableTesting } from "./state"
import { AsyncAction } from "../../../../ovl/node_modules/overmind"
import {
  ValidateField,
  FieldChanged,
  ChangeField
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { TableDataAndDef } from "../../../../ovl/src/library/Table/Table"

// if the following actions are present the functionality will be enabled
// rowAdd
// rowDelete
// rowDuplicate
// rowValidate
// customRowEdit for eg. a custom Edit Screen
// rowPostback for saving a row

export const RowValidate: AsyncAction<ValidateField> = async (_, value) => {
  switch (value.fieldId) {
    case "U_Alpha":
      Mandatory("U_Alpha", value.newVal, value.validationResult)
      break

    // case "U_ItemCode":
    //   Mandatory("U_ItemCode", value.newVal, value.validationResult)
    //   break
  }
}

export const RowChanged: AsyncAction<FieldChanged> = async (
  { actions, state },
  value
) => {
  switch (value.fieldId) {
    case "ItmsGrpCod":
      // check if the entry is still in the list
      if (value.newConvertedVal) {
        let listdata = U_ItemCodeGetListFn(state, value.row)
        let itemCode = value.formState.fields["U_ItemCode"].value

        if (itemCode) {
          let itemGroup = listdata.data[itemCode]["ItmsGrpCod"]

          if (itemGroup !== value.newConvertedVal) {
            let cf: ChangeField = {
              fieldId: "U_ItemCode",
              formState: value.formState,
              value: ""
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
          value: "Ebenfalls Fops"
        }
        actions.ovl.internal.SetField(cf)
      }
  }
}

export const CustomAddRowColumnDefaultsHandler: AsyncAction<{
  newRow: TableTesting
  tableDef: TableDataAndDef
}> = async (_, value) => {
  value.newRow.U_Memo = "Hey ich bin neu!"
}
export const CustomSelectRow: AsyncAction = async ({ actions }, value) => {
  actions.ovl.snack.AddSnack({
    durationMs: 3000,
    text: "Funktion noch nicht implementiert",
    type: "Warning"
  })
}
