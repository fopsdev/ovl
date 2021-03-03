import { html } from "lit-html"
import { resolvePath } from "../../global/globals"
import {
  FieldRowCellSelectedHandler,
  ViewRowClass,
  FieldRowCellSelectedHandler_Type,
  ViewRowClass_Type,
  ViewRowClass_ReturnType,
} from "../../global/hooks"
import { ovl } from "../../index"
import { SnackAdd } from "../helpers"
import { OvlBaseElement } from "../OvlBaseElement"
import { NavProps } from "./RowControl"
import {
  DisplayMode,
  EditRowDef,
  EditRowSaveCancelDef,
  SelectedEditRow,
  SelectedRow,
  SelectedViewRow,
  SelectRowDef,
  OvlTableData,
  OvlTableDef,
  ViewRowDef,
  ViewRowClassContent,
} from "./Table"

export type TableRowDef = {
  data: OvlTableData
  selected: SelectedRow
  editSelected: SelectedEditRow
  viewRow: SelectedViewRow
  tableDef: OvlTableDef
  columnsAlign: {}
  columnsVisible: {}
  columnsCount: number
  key: string
  intersectionObserver: IntersectionObserver
}

export type TableRowDataDef = {
  row: {}
  tableDef: OvlTableDef
  key: string
  columnsAlign: {}
  columnsVisible: {}
  intersectionObserver: IntersectionObserver
}

export class TableRowWrapper extends OvlBaseElement {
  props: any
  row: TableRowDef
  columnsVisible: {}

  handleRowLongPress = (e) => {
    // if on touch device also display row status message as a snack
    if (this.state.ovl.uiState.isTouch) {
      let mobileTooltip
      if (e.target.title) {
        mobileTooltip = e.target.title
      } else if (e.target.parentNode && e.target.parentNode.title) {
        mobileTooltip = e.target.parentNode.title
      }
      if (mobileTooltip) {
        SnackAdd(mobileTooltip, "Information")
      }
    }
  }

  handleRowClick = async (e) => {
    let def = this.row.tableDef
    let key
    if (e.target.getAttribute("data-col")) {
      key = e.target.getAttribute("data-col")
    } else if (
      e.target.parentNode &&
      e.target.parentNode.getAttribute("data-col")
    ) {
      key = e.target.parentNode.getAttribute("data-col")
    }
    if (!key) {
      return
    }
    // first start custom event handler (hook)
    let functionName = FieldRowCellSelectedHandler.replace("%", key)
    let fn = resolvePath(this.actions.custom, def.namespace)
    if (fn && fn[functionName]) {
      if (
        !(await fn[functionName](<FieldRowCellSelectedHandler_Type>{
          classList: e.target.classList,
          def,
          data: this.row.data,
          rowKey: this.row.key,
          displayMode: <DisplayMode>"Table",
        }))
      ) {
        return
      }
    }

    let rowKey
    if (e.target.getAttribute("data-rowkey")) {
      rowKey = e.target.getAttribute("data-rowkey")
    } else if (
      e.target.parentNode &&
      e.target.parentNode.getAttribute("data-rowkey")
    ) {
      rowKey = e.target.parentNode.getAttribute("data-rowkey")
    } else if (
      e.target.parentNode &&
      e.target.parentNode.parentNode &&
      e.target.parentNode.parentNode.getAttribute("data-rowkey")
    ) {
      rowKey = e.target.parentNode.parentNode.getAttribute("data-rowkey")
    }
    if (!rowKey) {
      return
    }

    let val: SelectRowDef = {
      def,
      key: rowKey,
    }
    this.actions.ovl.table.TableSelectRow(val)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation()

    if (!this.state.ovl.uiState.isMobile) {
      if (e.key === "ArrowDown") {
        //@ts-ignore
        let node = e.target.parentNode
        node = node.nextElementSibling
        if (node.tagName === "OVL-TRG") {
          node = node.firstElementChild
          while (node && node.tagName !== "OVL-TROW") {
            node = node.nextElementSibling
          }
          if (node) {
            node.focus()
          }
        }
      } else if (e.key === "ArrowUp") {
        //@ts-ignore
        let node = e.target.parentNode
        node = node.previousElementSibling
        if (node.tagName === "OVL-TRG") {
          node = node.firstElementChild
          while (node && node.tagName !== "OVL-TROW") {
            node = node.nextElementSibling
          }
          if (node) {
            node.focus()
          }
        }
      } else if (e.key === " ") {
        e.preventDefault()
        //@ts-ignore
        let toSelectElement: any = e.target.parentNode
        if (toSelectElement) {
          let key = toSelectElement.row.key
          let val: SelectRowDef = {
            def: toSelectElement.row.tableDef,
            key,
          }
          this.actions.ovl.table.TableSelectRow(val)
        }
      }
    }
  }

  init() {
    this.row = this.props()
  }

  async getUI() {
    return this.track(async () => {
      let editFormBig
      let editSelected = this.row.editSelected
      let viewRow = this.row.viewRow
      let def = this.row.tableDef
      let key = this.row.key
      let data = this.row.data
      let rows = data.data
      let row = rows[key]
      if (!row) {
        return null
      }
      let detailView
      if (viewRow && viewRow.selected) {
        detailView = html` <ovl-trowdetailview
          id=${"trow" + def.id + key}
          .props=${() => {
            return <ViewRowDef>{
              tableDef: def,
              data: data,
              row: row,
              key: key,
              columnsAlign: this.row.columnsAlign,
              columnsVisible: this.row.columnsVisible,
            }
          }}
        >
        </ovl-trowdetailview>`
        this.state.ovl.dialogs.DetailView.visible = true
      }

      if (editSelected && editSelected.selected) {
        if (def.options.edit.editType === "inline") {
          if (this.state.ovl.dialogs.DetailView.visible) {
            def.uiState.viewRow[key].selected = false
            this.state.ovl.dialogs.DetailView.visible = false
            this.state.ovl.dialogs.DetailView.closing = false
          }

          let editRowSC = html`
            <ovl-trowsc
              class="fd-table__row"
              style="border-top: 2px solid #0cd7ed;border-bottom: 0px;"
              .props=${() => {
                return <EditRowSaveCancelDef>{
                  tableDef: def,
                  row: row,
                  data: data,
                  key: key,
                  columnsCount: this.row.columnsCount,
                }
              }}
            >
            </ovl-trowsc>
          `

          return Promise.resolve(html`
            <ovl-trowform
              class="fd-table__row ovl-table-${def.id} ovl-editform ovl-inlineeditform ovl-editform-${def.id}"
              style="border-top:2px solid #0cd7ed; border-bottom:2px solid #0cd7ed; "
              id=${"trow" + def.id + key}
              .props=${() => {
                return <EditRowDef>{
                  tableDef: def,
                  data: data,
                  row: row,
                  key: key,
                  columnsAlign: this.row.columnsAlign,
                  columnsVisible: this.row.columnsVisible,
                  mode: editSelected.mode,
                }
              }}
            >
            </ovl-trowform>
            ${editRowSC}
          `)
        } else if (def.options.edit.editType === "big") {
          editFormBig = html`
            <ovl-trowformb
              id=${"trow" + def.id + key}
              .props=${() => {
                return <EditRowDef>{
                  tableDef: def,
                  data: data,
                  row: row,
                  key: key,
                  columnsAlign: this.row.columnsAlign,
                  columnsVisible: this.row.columnsVisible,
                  mode: editSelected.mode,
                }
              }}
            >
            </ovl-trowformb>
          `
          this.state.ovl.dialogs.EditFormBig.visible = true
        }
      }
      let selected = this.row.selected
      let nav
      let selectedClass = ""
      if (selected) {
        if (selected.selected) {
          selectedClass = "ovl-row-selected"
        }
        if (selected.showNav) {
          nav = html`
            <ovl-trowcontrol
              class="fd-table__row ovl-table-navrow"
              style="border-bottom: 0px;"
              .props=${() => {
                return <NavProps>{
                  tableDef: def,
                  data: data,
                  key: key,
                  columnsCount: this.row.columnsCount,
                }
              }}
            >
            </ovl-trowcontrol>
          `
        }
      }
      let rowClass = ""
      let rowTooltipMsg = ""
      let fn = resolvePath(this.actions.custom, def.namespace)
      let fnName = ViewRowClass
      // also display offline save errors in rowstatus
      if (data.offline && data.offline.errors[key]) {
        let msgSet = data.offline.errors[key]

        rowClass = "ovl-row-offline--error"
        msgSet.forEach((m) => {
          rowTooltipMsg += " " + m
        })
      } else {
        if (fn && fn[fnName]) {
          let status: ViewRowClassContent = await fn[fnName](<
            ViewRowClass_Type
          >{
            rowKey: key,
            tableDef: this.row.tableDef,
            tableData: data,
          })
          if (status) {
            rowClass = status.className
            rowTooltipMsg = status.tooltip
          }
        }
      }
      return html`
        ${detailView} ${editFormBig}
        <ovl-trow
          @keydown=${(e) => this.handleKeyDown(e)}
          tabindex="0"
          class="fd-table__row ${rowClass} ovl-table-row ${selectedClass}  animated fadeIn faster"
          title="${rowTooltipMsg}"
          data-rowkey="${key}"
          @click="${this.handleRowClick}"
          @long-press="${this.handleRowLongPress}"
          .props=${() => {
            return <TableRowDataDef>{
              row: row,
              key: key,
              tableDef: def,
              columnsAlign: this.row.columnsAlign,
              columnsVisible: this.row.columnsVisible,
              intersectionObserver: this.row.intersectionObserver,
            }
          }}
          .columnsVisible=${this.columnsVisible}
        >
        </ovl-trow>
        ${nav}
      `
    })
  }
}
