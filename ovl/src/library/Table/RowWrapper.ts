import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableData, TableDataAndDef, SelectedViewRow } from "./Table"
import { NavProps } from "./RowControl"
import { customFunctions, overmind } from "../../index"
import {
  TableDef,
  SelectedRow,
  SelectedEditRow,
  EditRowDef,
  SelectRowDef,
  EditRowSaveCancelDef,
} from "./Table"

import { resolvePath } from "../../global/globals"
import { SnackAdd } from "../helpers"
import { FormStatus, FieldRowCellSelectedHandler } from "../../global/hooks"
export type TableRowDef = {
  data: TableData
  selected: SelectedRow
  editSelected: SelectedEditRow
  viewRow: SelectedViewRow
  tableDef: TableDef
  columnsAlign: {}
  columnsVisible: {}
  columnsCount: number
  key: string
}

export type TableRowDataDef = {
  row: {}
  tableDef: TableDef
  key: string
  columnsAlign: {}
  columnsVisible: {}
}

export class TableRowWrapper extends OvlBaseElement {
  props: any
  row: TableRowDef

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

  handleRowClick = async (e: Event, k: string) => {
    let def = this.row.tableDef
    if (
      //@ts-ignore
      e.target.getAttribute("data-col")
    ) {
      // first start custom event handler (hook)
      //@ts-ignore
      let columnKey = e.target.getAttribute("data-col")
      let functionName = FieldRowCellSelectedHandler.replace("%", columnKey)
      let fn = resolvePath(customFunctions, def.namespace)
      if (fn && fn[functionName]) {
        if (
          !(await fn[functionName](
            //@ts-ignore
            e.target.classList,
            def,
            this.row.data,
            this.row.key,
            false,
            this.state
          ))
        ) {
          return
        }
      }
    }
    let val: SelectRowDef = {
      def,
      key: k,
      data: this.row.data,
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
            data: toSelectElement.row.TableData,
          }
          this.actions.ovl.table.TableSelectRow(val)
        }
      }
    }
  }

  init() {
    this.row = this.props()
    this.async = true
  }

  async getUIAsync() {
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

    if (viewRow.selected) {
      this.actions.ovl.overlay.OpenOverlay({
        templateResult: html`
          <ovl-trowdetailview
            id=${"trow" + def.id + key}
            .props=${() => {
              return <EditRowDef>{
                tableDef: def,
                data: data,
                row: row,
                key: key,
                columnsAlign: this.row.columnsAlign,
                columnsVisible: this.row.columnsVisible,
              }
            }}
          >
          </ovl-trowdetailview>
        `,
        elementToFocusAfterClose: document.activeElement,
      })
    }

    if (editSelected && editSelected.selected) {
      if (def.options.edit.editType === "inline") {
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
            class="fd-table__row"
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
              }
            }}
          >
          </ovl-trowform>
          ${editRowSC}
        `)
      } else if (def.options.edit.editType === "big") {
        this.actions.ovl.overlay.OpenOverlay({
          templateResult: html`
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
                }
              }}
            >
            </ovl-trowformb>
          `,
          elementToFocusAfterClose: document.activeElement,
        })
      }
    }
    let selected = this.row.selected
    let nav
    let selectedRowBg = ""
    if (selected) {
      if (selected.selected) {
        selectedRowBg = "background-color: var(--fd-color-accent-7)"
      }
      if (selected.showNav) {
        nav = html`
          <ovl-trowcontrol
            class="fd-table__row"
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
    let rowStatus = ""
    let rowStatusMsg = ""
    let fn = resolvePath(customFunctions, def.namespace)
    let fnName = FormStatus
    if (fn && fn[fnName]) {
      let status = await fn[fnName](
        key,
        this.row.tableDef,
        data,
        this.state,
        this.actions,
        overmind.effects
      )
      if (status) {
        rowStatus = "fd-table__row--" + status.status
        rowStatusMsg = status.msg
      }
    }

    return html`
      <ovl-trow
        @keydown=${(e) => this.handleKeyDown(e)}
        tabindex="0"
        style="${selectedRowBg}"
        class="fd-table__row ${rowStatus}  animated fadeIn faster"
        title="${rowStatusMsg}"
        @click="${(e) => this.handleRowClick(e, key)}"
        @long-press="${(e) => this.handleRowLongPress(e)}"
        .props=${() => {
          return <TableRowDataDef>{
            row: row,
            key: key,
            tableDef: def,
            columnsAlign: this.row.columnsAlign,
            columnsVisible: this.row.columnsVisible,
          }
        }}
      >
      </ovl-trow>
      ${nav}
    `
  }
}
