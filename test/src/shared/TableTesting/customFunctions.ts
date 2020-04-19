import { TableTesting, TblTableTesting, TableTestingColumn } from "./state"

// import { RowStatus, TableDef } from "../../library/Table/Table"
// import { Translation } from "./state"
import { overmind } from "../.."
import {
  TableDataAndDef,
  TableDef,
  TableData,
  ListFnReturnValue,
  RowStatus,
} from "../../../../ovl/src/library/Table/Table"
import { getTextSort } from "../../../../ovl/src/library/Table/helpers"
import { LookupListPostData } from "../../../../ovl/src/library/forms/Controls/helpers"
import {
  FormState,
  ValidateField,
  FieldChanged,
  ChangeField,
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { SnackAdd } from "../../../../ovl/src/library/helpers"

export const FormShow = async (
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from formshow hook. setting focus to item group")
  //@ts-ignore
  document.getElementById(formState.fields["U_ItmsGrpCod"].id).focus()
}

export const FormAfterRender = async (
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log(
    "hello from tabletesting formafterrender hook. setting focus to item group"
  )
  //@ts-ignore
  document.getElementById(formState.fields["U_ItmsGrpCod"].id).focus()
}

export const CustomAddRowColumnDefaultsHandler = async (
  newRow: TableTesting,
  tableDef: TableDataAndDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  newRow.U_Memo = "Defaulttext Memo"
}
export const CustomSelectRow = async (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  SnackAdd("Funktion noch nicht implementiert", "Warning")
}

export const RowChanged = async (
  value: FieldChanged,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  switch (value.fieldId) {
    case "U_ItmsGrpCod":
      // check if the entry is still in the list
      if (value.newConvertedVal) {
        let listdata = U_ItemCodeGetListFn(value.row, state, actions, effects)
        let itemCode = value.formState.fields["U_ItemCode"].value

        if (itemCode) {
          let itemGroup = listdata.data[itemCode]["ItmsGrpCod"]

          if (itemGroup !== value.newConvertedVal) {
            let cf: ChangeField = {
              fieldId: "U_ItemCode",
              formState: value.formState,
              value: "",
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

export const RowValidate = async (
  value: ValidateField,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  switch (value.fieldId as TableTestingColumn) {
    case "U_Alpha":
      Mandatory("U_Alpha", value.newVal, value.validationResult)
      break
  }
}

export const GetRowStatus = async (
  key: string,
  tableDef: TableDef,
  data: TableData,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): Promise<RowStatus> => {
  let row = <TableTesting>data.data[key]
  let res: RowStatus
  if (row.U_Alpha.toLowerCase().indexOf("test") > -1) {
    res = {
      status: "warning",
      msg: 'Text enthält "Test"',
    }
  } else if (row.U_Alpha.toLowerCase().indexOf("fehler") > -1) {
    res = {
      status: "error",
      msg: 'Text enthält "Fehler"',
    }
  }
  return Promise.resolve(res)
}

// /*
// use functionNameDisabledFn for functions that need to control its buttons disabled prop
// FunctionName in the following sample is "Edit"
// if no function present it will be always enabled
// if it should be disabled please provide a text (will be the tooltip) if it should be enabled just return empty string
// */

export const EditDisabledFn = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("noedit") > -1
      ? "Ändern nicht möglich da Text 'noedit' enthält!"
      : ""
  )
}

export const DeleteDisabledFn = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("nodelete") > -1
      ? 'Löschen nicht möglich da Text "nodelete" enthält!'
      : ""
  )
}

export const alphaThenMemoSortFn = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): number => {
  let rowA: TableTesting = data[a]
  let rowB: TableTesting = data[b]
  let res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  if (res === 0) {
    res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  }

  return res
}

export const memoThenAlphaSortFn = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): number => {
  let rowA: TableTesting = data[a]
  let rowB: TableTesting = data[b]
  let res = getTextSort(rowA.U_Memo, rowB.U_Memo)
  if (res === 0) {
    res = getTextSort(rowA.U_Alpha, rowB.U_Alpha)
  }

  return res
}

export const onlyTestSortFn = (
  a: string,
  b: string,
  data: TblTableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): number => {
  let rowA: TableTesting = data[a]
  if (rowA.U_Alpha.toLocaleLowerCase().indexOf("test") > -1) {
    return -1
  } else {
    return 1
  }
}

export const alphaStartsWithAFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  let row: TableTesting = data.data[key]

  return row.U_Alpha.startsWith("A")
}

export const alphaStartsWithBFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  let row: TableTesting = data.data[key]

  return row.U_Alpha.startsWith("B")
}

export const memoContainsTestFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  let row: TableTesting = data.data[key]
  return row.U_Memo.toLowerCase().indexOf("test") > -1
}

export const memoContainsTextFilterFn = (
  def: TableDef,
  data: TableData,
  key: string,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  let row: TableTesting = data.data[key]
  return row.U_Memo.toLowerCase().indexOf("text") > -1
}

// some list functions

export const U_ItemCodeGetListFn = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItemCode
}

export const U_ItemCodeLookupPostDataFn = (
  lookupData: LookupListPostData,
  row: {},
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  lookupData.paramList.U_ItmsGrpCod = row["U_ItmsGrpCod"]
}

export const U_ItmsGrpCodGetListFn = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItmsGrpCod
}

export const U_ParentCodeGetListFn = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.tableTesting
}

export const U_ParentCode2GetListFn = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return {
    data: state.testtables.tableTesting.data,
    lookupTypes: state.testtables.tableTesting.lookupTypes2,
  }
}

export const U_ItemCodeGetFilteredListFn = (
  list: ListFnReturnValue,
  formState: FormState,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): string[] => {
  return Object.keys(list.data).filter((f) => {
    return (
      !formState.fields.U_ItmsGrpCod.convertedValue ||
      list.data[f]["ItmsGrpCod"] ===
        formState.fields.U_ItmsGrpCod.convertedValue
    )
  })
}
