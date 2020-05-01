import { TableTesting, TblTableTesting, TableTestingColumn } from "./state"
import { html, TemplateResult } from "../../../../ovl/node_modules/lit-html"
import { overmind } from "../.."
import {
  TableDataAndDef,
  TableDef,
  TableData,
  ListFnReturnValue,
  RowStatus,
  SelectedCustomFunctionResult,
} from "../../../../ovl/src/library/Table/Table"
import {
  getTextSort,
  getDisplayValue,
} from "../../../../ovl/src/library/Table/helpers"
import { LookupListPostData } from "../../../../ovl/src/library/forms/Controls/helpers"
import {
  FormState,
  ValidateFieldType,
  FieldChanged,
  ChangeField,
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { SnackAdd } from "../../../../ovl/src/library/helpers"
import { json } from "overmind"

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
    "hello from tabletesting formafterrender hook. you may do some crazy stuff in here"
  )
}

export const FormCopy = async (
  key: string,
  newRow: TableTesting,
  tableDef: TableDataAndDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  newRow.U_Memo = newRow.U_Memo + " Copy!"
}

export const FormAdd = async (
  newRow: TableTesting,
  tableDef: TableDataAndDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  newRow.U_Memo = "Defaulttext Memo"
}
export const FormSelect = async (
  rowKey: string,
  def: TableDef,
  data: TableData,
  isLastOrOnlyOne: boolean,
  startedFromSelectedResult: SelectedCustomFunctionResult,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  // this sample shows how to deal with msg and succss when also used from headerform (multiple rows selected))
  let msg = ""
  if (isLastOrOnlyOne) {
    msg = "Funktion noch nicht implementiert!"
  }
  if (startedFromSelectedResult) {
    startedFromSelectedResult.msg = msg
    startedFromSelectedResult.success = false
    return
  }
  SnackAdd(msg, "Warning")
}

export const FormChanged = async (
  value: FieldChanged,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  switch (value.fieldId) {
    case "U_ItmsGrpCod":
      // check if the entry is still in the list
      if (value.newConvertedVal) {
        let listdata = Field_U_ItemCode_GetList(
          value.row,
          state,
          actions,
          effects
        )
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

export const FormValidate = async (
  value: ValidateFieldType,
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

export const FormStatus = async (
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

export const FormCanEdit = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state,
  effects: typeof overmind.effects
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("noedit") > -1
      ? "Ändern nicht möglich da Text 'noedit' enthält!"
      : ""
  )
}

export const FormCanDelete = async (
  rowKey: string,
  tableDefAndData: TableDataAndDef,
  state: typeof overmind.state,
  effects: typeof overmind.effects
): Promise<string> => {
  let row = <TableTesting>tableDefAndData.data.data[rowKey]
  return Promise.resolve(
    row.U_Alpha && row.U_Alpha.indexOf("nodelete") > -1
      ? 'Löschen nicht möglich da Text "nodelete" enthält!'
      : ""
  )
}

export const Form_alphaThenMemo_Sort = (
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

export const Form_memoThenAlpha_Sort = (
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

export const Form_onlyTest_Sort = (
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

export const Form_alphaStartsWithA_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  return row.U_Alpha.startsWith("A")
}

export const Form_alphaStartsWithB_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  return row.U_Alpha.startsWith("B")
}

export const Form_memoContainsTest_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  return row.U_Memo.toLowerCase().indexOf("test") > -1
}

export const Form_memoContainsText_Filter = (
  def: TableDef,
  data: TableData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): boolean => {
  return row.U_Memo.toLowerCase().indexOf("text") > -1
}

// some list functions
export const Field_U_ItemCode_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItemCode
}

export const Field_U_ItemCode_LookupPostData = (
  lookupData: LookupListPostData,
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  lookupData.paramList.U_ItmsGrpCod = row["U_ItmsGrpCod"]
}

export const Field_U_ItmsGrpCod_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.lookups.U_ItmsGrpCod
}

export const Field_U_ParentCode_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return state.testtables.tableTesting
}

export const Field_U_ParentCode2_GetList = (
  row: TableTesting,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
): ListFnReturnValue => {
  return {
    data: state.testtables.tableTesting.data,
    lookupDef: state.testtables.tableTesting.lookupDef2,
  }
}

export const Field_U_ItemCode_GetFilteredList = (
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

export const Field_MobileSummary_GetTableHeaderRender = (
  columnKey: string,
  caption: string,
  def: TableDef,
  align: string,
  state: typeof overmind.state
): TemplateResult => {
  return html`<b>${caption}</b>`
}

export const Field_MobileSummary_GetTableRowRender = (
  columnKey: string,
  row: TableTesting,
  def: TableDef,
  align: string,
  state: typeof overmind.state
): TemplateResult => {
  let u_AlphaValue = getDisplayValue(
    "U_Alpha",
    def.columns["U_Alpha"],
    row,
    def.namespace
  )
  let u_ItemCodeValue = getDisplayValue(
    "U_ItemCode",
    def.columns["U_ItemCode"],
    row,
    def.namespace
  )

  let u_DateValue = getDisplayValue(
    "U_Date",
    def.columns["U_Date"],
    row,
    def.namespace
  )

  return html`
    <td class="fd-table__cell align}">
      <b>${u_DateValue}</b> ${u_AlphaValue} ${u_ItemCodeValue}
    </td>
  `
}
