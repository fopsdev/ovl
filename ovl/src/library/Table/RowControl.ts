import { html } from "lit-html"
import { ovltemp } from "../../global/globals"
import { SnackAdd } from "../helpers"
import { OvlBaseElement } from "../OvlBaseElement"
import { createDynamicRowFunctions, rowControlActionsHandler } from "./helpers"
import { TableData, TableDef } from "./Table"

export type NavProps = {
  tableDef: TableDef
  data: TableData
  key: string
  columnsCount: number
}

export type RowControlAllAction = {
  name: string
  icon: string
  disabled: boolean
  custom: boolean
}

export class TableRowControl extends OvlBaseElement {
  props: any
  nav: NavProps

  init() {
    this.nav = this.props()
    this.async = true
  }

  handleRowLongPress = (e: Event, msg: string) => {
    // fallback for touch devices which can't display tooltips (title attribute)
    if (this.state.ovl.uiState.isTouch && msg) {
      SnackAdd(msg, "Information")
    }
  }

  handleClick = async (e: Event, key: string, isCustom: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    rowControlActionsHandler(
      isCustom,
      key,
      this.nav.tableDef,
      this.nav.data,
      this.nav.key,
      false
    )
  }

  async getUIAsync() {
    let compact = ""
    let selectedRowBg = "background-color: var(--fd-color-accent-7)"
    let key = this.nav.key
    let def = this.nav.tableDef
    let row = this.nav.data.data
    if (!row[key] || key.indexOf(ovltemp) > -1) {
      return null
    }

    // put together a dynamic list of actions
    // consisting of "default" deit/copy/delete ones and the ones from state custom

    let rowControlActions: {
      [key: string]: RowControlAllAction
    } = await createDynamicRowFunctions(def, this.nav.data, key, false)
    let rowControlButtons

    let firstBorder = "border-top:none;border-top-left-radius:0px;"
    let middleBorder = "border-top:none;"
    let lastBorder = "border-top:none;border-top-right-radius:0px;"
    let rowActions = Object.keys(rowControlActions)
    let rowActionsCount = rowActions.length
    rowControlButtons = rowActions.map((k, i) => {
      let button = rowControlActions[k]
      let border = middleBorder
      if (i === 0) {
        border = firstBorder
      } else if (i === rowActionsCount - 1) {
        border = lastBorder
      }
      return html`
        <button
          @long-press="${(e) => this.handleRowLongPress(e, button.name)}"
          @click="${(e) => this.handleClick(e, k, button.custom)}"
          ?disabled=${button.disabled}
          id="${k + this.nav.key}"
          title="${button.name}"
          class="fd-button ${compact} ${button.icon}"
          style="${selectedRowBg};${border}"
        ></button>
      `
    })

    if (rowControlButtons.length === 0) {
      return null
    }
    return Promise.resolve(html`
      <td
        class="fd-table__cell fd-has-text-align-center"
        style="margin:0;padding:0;"
        colspan="${this.nav.columnsCount}"
      >
        <div
          style="margin-top:-1px;"
          class="fd-button-group animated fadeIn faster"
          role="group"
          aria-label="Rowcontrol"
        >
          ${rowControlButtons}
        </div>
      </td>
    `)
  }
}
