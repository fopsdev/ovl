import { TableTesting, TblTableTesting, TableTestingColumn } from "./state"
import {
  html,
  TemplateResult,
  render,
} from "../../../../ovl/node_modules/lit-html"

import { overmind } from "../.."
import {
  TableDataAndDef,
  TableDef,
  TableData,
  ListFnReturnValue,
  RowStatus,
  SelectedCustomFunctionResult,
  DisplayMode,
  ViewRowDef,
  EditRowDef,
} from "../../../../ovl/src/library/Table/Table"
import {
  getTextSort,
  getDisplayValue,
} from "../../../../ovl/src/library/Table/helpers"
import {
  LookupListPostData,
  GetLabel,
} from "../../../../ovl/src/library/forms/Controls/helpers"
import {
  FormState,
  ValidateFieldType,
  FieldChanged,
  ChangeField,
  Field,
} from "../../../../ovl/src/library/forms/actions"
import { Mandatory } from "../../../../ovl/src/library/forms/validators"
import { SnackAdd, DialogOk } from "../../../../ovl/src/library/helpers"
import { json } from "overmind"
import { CellClass } from "../../../../ovl/src/library/Table/Row"
import { OkDialog } from "../../../../ovl/src/library/Dialog/actions"
import { ViewRendererResult } from "../../../../ovl/src/library/Table/RowDetailView"

export const FormCustomColumnFn_ValidValues = async (
  fnName: string,
  coumnKey: string,
  def: TableDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log(
    "custom column function 'ValidValues' startet (nothing implemented)"
  )
}

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

export const ViewAfterRender = async (
  view: ViewRowDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log(
    "hello from tabletesting view afterrender hook. you may do some crazy stuff in here. why not add a chart?"
  )
  let newDiv = document.createElement("div")
  render(
    html`<comp-summarychart
      .props=${() => "height:500px;"}
    ></comp-summarychart>`,
    newDiv
  )
  let mainViewEl = document.getElementById("ovl-detailview-tab2")
  mainViewEl.firstElementChild.appendChild(newDiv)
}

export const ViewShow = async (
  view: ViewRowDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from tabletesting view show hook.")
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

export const ViewCustom_tab1_Render = (row: ViewRowDef): ViewRendererResult => {
  let res: ViewRendererResult = {
    type: "Body",
    result: undefined,
  }
  res.result = html`Custom Test Body`
  return res
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

export const Field_U_Memo_GetLabelText = (
  caption: string,
  columnKey: string,
  state: typeof overmind.state
): string => {
  return "Memo"
}

export const Edit_U_Memo_GetLabelAndValueRender = (
  field: Field,
  customHeaderCellClass: CellClass,
  customRowCellClass: CellClass,
  id: string,
  readonly: boolean
): TemplateResult => {
  // use the existing custom element for now.... but its possible to introduce new elements here
  if (readonly) {
    return html`${field.value}`
  } else {
    return html`
      <ovl-textarea
        id="${id}"
        class="fd-form__item "
        .props=${() => {
          return {
            field,
            customHeaderCellClass,
            customRowCellClass,
          }
        }}
      >
      </ovl-textarea>
    `
  }
}

export const Field_U_ItemCode_GetLabelRender = (
  columnKey: string,
  caption: string,
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  if (displayMode === "Detailview") {
    return html`Name(Code)`
  }
  if (displayMode === "Table") {
    return html`${caption}(Code)`
  }
  if (displayMode === "Edit") {
    return html`${caption}(C)`
  }
}

export const ViewGetCaptionRender = (
  caption: string,
  row: ViewRowDef,
  state: typeof overmind.state
): TemplateResult => {
  return html`Custom Caption ${caption}`
}

export const EditGetCaptionRender = (
  caption: string,
  row: EditRowDef,
  state: typeof overmind.state
): TemplateResult => {
  return html`Custom Caption ${caption}`
}

export const Field_U_ItemCode_GetValueRender = (
  columnKey: string,
  row: TableTesting,
  def: TableDef,
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  let itemCodeValue = getDisplayValue(
    "U_ItemCode",
    def.columns["U_ItemCode"],
    row,
    def.namespace
  )

  return html`${itemCodeValue} (${row.U_ItemCode})`
}

export const Field_MobileSummary_GetLabelRender = (
  columnKey: string,
  caption: string,
  def: TableDef,
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  return html`${caption}(has more details...)</b>`
}

export const Field_MobileSummary_GetValueRender = (
  columnKey: string,
  row: TableTesting,
  def: TableDef,
  align: string,
  displayMode: DisplayMode,
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

  return html` <b>${u_DateValue}</b> ${u_AlphaValue} ${u_ItemCodeValue} `
}

export const ViewRowCellClass = (
  def: TableDef,
  row: TableTesting,
  isMobile: boolean,
  displayMode: DisplayMode,
  state: typeof overmind.state,
  formState?: FormState
): { [key in keyof TableTesting]?: CellClass } => {
  let val
  if (displayMode.startsWith("Edit")) {
    val = formState.fields["U_Decimal"].convertedValue
    formState.fields["U_Decimal"].value
  } else {
    val = row.U_Decimal
  }
  if (val > 100) {
    return {
      U_Decimal: {
        className: "testrowcell",
        tooltip: "Pay attention!,greater than 100!",
      },
    }
  }
}

export const Field_U_Decimal_RowCellSelectedHandler = async (
  classList: DOMTokenList,
  def: TableDef,
  data: TableData,
  rowKey: string,
  displayMode: DisplayMode,
  state: typeof overmind.state,
  formState?: FormState
): Promise<boolean> => {
  // for this sample we just wanna make those cells clickable which has a specific custom class (see TableRowCellClass hook)
  if (classList.contains("testrowcell")) {
    let val
    if (displayMode.startsWith("Edit")) {
      val = formState.fields["U_Decimal"].value
      SnackAdd("U_Decimal selected! Value:" + val)
    } else {
      val = getDisplayValue(
        "U_Decimal",
        def.columns["U_Decimal"],
        data.data[rowKey],
        def.namespace
      )
      await DialogOk("U_Decimal selected! Value:" + val)
    }

    // do not use default event (select row in cas called from table)
    return false
  }
  return true
}

export const ViewHeaderCellClass = (
  def: TableDef,
  isMobile: boolean,
  displayMode: DisplayMode,
  state: typeof overmind.state
): { [key in keyof TableTesting]?: CellClass } => {
  return {
    U_ItemCode: {
      className: "testheadercell",
      tooltip: "Hey i'm a custom Tooltip!",
    },
  }
}

export const Field_U_ItemCode_HeaderCellSelectedHandler = async (
  classList: DOMTokenList,
  def: TableDef,
  displayMode: DisplayMode,
  state: typeof overmind.state
): Promise<boolean> => {
  if (classList.contains("testheadercell")) {
    await DialogOk("Header U_ItemCode selected!")
    // do not use default event (open tableheader menu)
    return false
  }
  return true
}
