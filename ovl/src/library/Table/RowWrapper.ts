import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableData, TableDataAndDef } from "./Table"
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
export type TableRowDef = {
  data: TableData
  selected: SelectedRow
  editSelected: SelectedEditRow
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

  handleRowLongPress = (e: Event) => {
    // if on touch device also display row status message as a snack
    if (
      this.state.ovl.uiState.isTouch &&
      //@ts-ignore
      e.target.parentNode &&
      //@ts-ignore
      e.target.parentNode.title
    ) {
      //@ts-ignore
      SnackAdd(e.target.parentNode.title, "Information")
    }
  }

  handleRowClick = (e: Event, k: string) => {
    let val: SelectRowDef = {
      def: this.row.tableDef,
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
    let def = this.row.tableDef
    let key = this.row.key
    let data = this.row.data
    let rows = data.data
    let row = rows[key]
    if (!row) {
      return null
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
              class="fd-table__row"
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
    if (fn && fn.GetRowStatus) {
      let status = await fn.GetRowStatus(
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
