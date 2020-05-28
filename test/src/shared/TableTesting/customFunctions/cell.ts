import { overmind } from "../../.."
import {
  html,
  TemplateResult,
} from "../../../../../ovl/node_modules/lit-html/lit-html"
import { Field, FormState } from "../../../../../ovl/src/library/forms/actions"
import { DialogOk, SnackAdd } from "../../../../../ovl/src/library/helpers"
import { getDisplayValue } from "../../../../../ovl/src/library/Table/helpers"
import { CellClass } from "../../../../../ovl/src/library/Table/Row"
import {
  DisplayMode,
  EditMode,
  EditRowDef,
  TableData,
  TableDef,
  ViewRowDef,
  ColumnDisplayDef,
} from "../../../../../ovl/src/library/Table/Table"
import { TableTesting } from "../state"

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
  mode: EditMode,
  state: typeof overmind.state
): TemplateResult => {
  return html`Custom Caption ${caption}`
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

export const Field_U_ItemCode_GetValueRender = (
  columnKey: string,
  currentVal: string,
  row: TableTesting,
  namespace: string,
  columnsDef: { [key: string]: ColumnDisplayDef },
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  let itemCodeValue = getDisplayValue(
    "U_ItemCode",
    columnsDef["U_ItemCode"],
    row,
    namespace
  )

  return html`${itemCodeValue} (${row.U_ItemCode})`
}

export const Field_MobileSummary_GetLabelRender = (
  columnKey: string,
  caption: string,
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  return html`${caption}(has more details...)</b>`
}

export const Field_U_Alpha_GetValueRender = (
  columnKey: string,
  currentVal: string,
  row: TableTesting,
  namespace: string,
  columnsDef: { [key: string]: ColumnDisplayDef },
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  debugger
  let u_alpha = row.U_Alpha
  let additionalComment = ""
  if (currentVal && currentVal.toLowerCase().indexOf("todo") > -1) {
    additionalComment = "(hat todos)"
  }
  if (displayMode.startsWith("Edit")) {
    return html`<b>${additionalComment}</b>`
  } else {
    return html`${currentVal} <b>${additionalComment}</b>`
  }
}

export const Field_MobileSummary_GetValueRender = (
  columnKey: string,
  currentVal: string,
  row: TableTesting,
  namespace: string,
  columnsDef: { [key: string]: ColumnDisplayDef },
  align: string,
  displayMode: DisplayMode,
  state: typeof overmind.state
): TemplateResult => {
  let u_AlphaValue = getDisplayValue(
    "U_Alpha",
    columnsDef["U_Alpha"],
    row,
    namespace
  )
  let u_ItemCodeValue = getDisplayValue(
    "U_ItemCode",
    columnsDef["U_ItemCode"],
    row,
    namespace
  )

  let u_DateValue = getDisplayValue(
    "U_Date",
    columnsDef["U_Date"],
    row,
    namespace
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
