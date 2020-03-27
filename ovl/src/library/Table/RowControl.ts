import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableDef, RowControlAction, TableData, TableDataAndDef } from "./Table"

import { functions } from "../../index"
import { ovltemp, resolvePath } from "../../global/globals"

export type NavProps = {
  tableDef: TableDef
  data: TableData
  key: string
  columnsCount: number
}

type RowControlAllAction = {
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
      this.actions.ovl.snack.AddSnack({
        type: "Information",
        durationMs: 5000,
        text: msg
      })
    }
  }

  handleClick = async (e: Event, key: string, isCustom: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    let customActionFound = false
    let customActions = resolvePath(this.actions, this.nav.tableDef.namespace)
    if (customActions) {
      let customActionName = "Custom" + key + "Row"
      let customAction = customActions[customActionName]

      if (customAction) {
        customActionFound = true
        await customAction({
          key: this.nav.key,
          def: this.nav.tableDef,
          data: this.nav.data
        })
      } else {
        if (isCustom) {
          throw Error(
            "Ovl logical error: Custom Action: " +
              customActionName +
              " not found!"
          )
        }
      }
    }
    if (!customActionFound) {
      let actionName = "Table" + key + "Row"
      this.actions.ovl.internal[actionName]({
        key: this.nav.key,
        def: this.nav.tableDef,
        data: this.nav.data
      })
    }
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

    let rowControlActions: { [key: string]: RowControlAllAction } = {}
    let fn = resolvePath(functions, def.namespace)
    // first all custom ones
    if (def.options.customRowActions) {
      let wait = Promise.all(
        Object.keys(def.options.customRowActions).map(async k => {
          let custom = def.options.customRowActions[k]
          let disabled = false
          let title = custom.name
          let functionName = k + "DisabledFn"

          if (fn && fn[functionName]) {
            disabled = true
            title = await fn[functionName](
              this.nav.key,
              <TableDataAndDef>{ def: def, data: this.nav.data },
              this.state
            )
            if (title) {
              rowControlActions[k] = {
                disabled: disabled,
                icon: custom.icon,
                custom: true,
                name: title
              }
            }
          } else {
            rowControlActions[k] = JSON.parse(JSON.stringify(custom))
            rowControlActions[k].disabled = false
            rowControlActions[k].custom = true
          }
        })
      )
      await wait
    }

    // then add the default ones
    // delete
    if (def.features.delete) {
      let deleteDisabled = false
      let deleteTitle = ""
      let functionName = "DeleteDisabledFn"

      if (fn && fn[functionName]) {
        deleteTitle = await fn[functionName](
          this.nav.key,
          <TableDataAndDef>{ def: def, data: this.nav.data },
          this.state
        )
        deleteDisabled = true
        if (deleteTitle) {
          rowControlActions["Delete"] = {
            disabled: deleteDisabled,
            icon: "sap-icon--delete",
            custom: false,
            name: deleteTitle
          }
        }
      }
      if (!rowControlActions["Delete"]) {
        rowControlActions["Delete"] = {
          disabled: false,
          icon: "sap-icon--delete",
          custom: false,
          name: "Datensatz löschen"
        }
      }
    }

    // copy
    if (def.features.add) {
      let copyDisabled = false
      let copyTitle = ""
      //@@hook
      let functionName = "CopyDisabledFn"

      if (fn && fn[functionName]) {
        copyTitle = await fn[functionName](
          this.nav.key,
          <TableDataAndDef>{ def: def, data: this.nav.data },
          this.state
        )
        copyDisabled = true
        if (copyTitle) {
          rowControlActions["Copy"] = {
            disabled: copyDisabled,
            icon: "sap-icon--copy",
            custom: false,
            name: copyTitle
          }
        }
      }
      if (!rowControlActions["Copy"]) {
        rowControlActions["Copy"] = {
          disabled: false,
          icon: "sap-icon--copy",
          custom: false,
          name: "Datensatz duplizieren"
        }
      }
    }

    if (def.features.edit) {
      // edit
      let editDisabled = false
      let editTitle = ""
      //@@hook
      let functionName = "EditDisabledFn"
      if (fn && fn[functionName]) {
        editTitle = await fn[functionName](
          this.nav.key,
          <TableDataAndDef>{ def: def, data: this.nav.data },
          this.state
        )
        editDisabled = true
        if (editTitle) {
          rowControlActions["Edit"] = {
            disabled: editDisabled,
            icon: "sap-icon--edit",
            custom: false,
            name: editTitle
          }
        }
      }
      if (!rowControlActions["Edit"]) {
        rowControlActions["Edit"] = {
          disabled: false,
          icon: "sap-icon--edit",
          custom: false,
          name: "Datensatz ändern"
        }
      }
    }

    // edit
    let moreDisabled = false
    let moreTitle = ""
    //@@hook
    let functionName = "MoreDisabledFn"
    if (fn && fn[functionName]) {
      moreTitle = fn[functionName](
        this.nav.key,
        <TableDataAndDef>{ def: def, data: this.nav.data },
        this.state
      )
      moreDisabled = true
      if (moreTitle) {
        rowControlActions["More"] = {
          disabled: moreDisabled,
          icon: "sap-icon--overflow",
          custom: false,
          name: moreTitle
        }
      }
    }
    if (!rowControlActions["More"]) {
      rowControlActions["More"] = {
        disabled: false,
        icon: "sap-icon--overflow",
        custom: false,
        name: "Tabellenfunktionen"
      }
    }

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
          @long-press="${e => this.handleRowLongPress(e, button.name)}"
          @click="${e => this.handleClick(e, k, button.custom)}"
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
