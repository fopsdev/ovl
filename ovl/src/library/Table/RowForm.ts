import { OvlFormElement, DataType } from "../../library/forms/OvlFormElement"

import { EditRowDef, TableDataAndDef } from "./Table"
import { html } from "lit-html"
import { resolvePath } from "../../global/globals"
import { customFunctions, overmind } from "../../index"
import { overlayToRender } from "../Overlay/Overlay"

import { FieldIsReadOnly } from "../../global/hooks"

export class TableRowForm extends OvlFormElement {
  props: any
  rowData: EditRowDef
  focusInit: boolean

  init() {
    this.focusInit = false
    this.rowData = this.props()
    // <form init>
    this.formType = "TableRowEdit"
    super.init()
    // </form init>
  }
  updated() {
    if (this.state.ovl.libState.overlay.closing) {
      overlayToRender.overlayClosedCallback = () => {
        this.setFocus()
      }
    } else {
      this.setFocus()
    }

    // if there is a custom afterrender
    super.updated()
  }
  setFocus() {
    if (
      this.rowData.tableDef.features.focusToFirstEditableField &&
      !this.focusInit
    ) {
      this.focusInit = true
      let focusEl = document.getElementById(
        this.rowData.key + "ovlRFNFocus_focus"
      )
      //@ts-ignore
      focusEl.firstElementChild.focus()
      let target = focusEl.firstElementChild
      var rect = target.getBoundingClientRect()
      if (rect.bottom > window.innerHeight) {
        target.scrollIntoView(false)
      }
      if (rect.top < 0) {
        target.scrollIntoView()
      }
    }
  }

  getUI() {
    let def = this.rowData.tableDef
    let fields = this.formState.fields
    let columns = def.columns
    let firstEditable = false
    return html`
      ${Object.keys(columns).map((k) => {
        let col = columns[k]
        let columnsVisible = this.rowData.columnsVisible
        if (columnsVisible[k].indexOf("Edit") < 0) {
          return null
        }
        let uiItem
        let id = this.rowData.key + "ovlRFNFocus_" + k
        let controlAlign = ""
        if (this.rowData.columnsAlign[k]) {
          let align: string = this.rowData.columnsAlign[k]
          if (align.indexOf("right") > -1) {
            controlAlign = "text-align:right;"
          } else if (align.indexOf("center") > -1) {
            controlAlign = "text-align:center;"
          }
        }
        let readonly = col.ui.readonly
        // @@hook
        let functionName = FieldIsReadOnly.replace("%", k)
        let fn = resolvePath(customFunctions, def.namespace)
        if (fn && fn[functionName]) {
          readonly = fn[functionName](
            this.rowData.key,
            this.rowData.tableDef,
            this.rowData.data,
            this.state,
            this.actions,
            overmind.effects
          )
        }
        let insertMode = this.rowData.tableDef.database.dbInsertMode
        if (k === "Code") {
          if (
            insertMode === "UDTAutoNumber" ||
            insertMode === "UDTAutoGUID" ||
            insertMode === "UDTAutoNumberBoth" ||
            insertMode === "UDTAutoGUIDBoth"
          ) {
            readonly = true
          }
        }
        if (k === "Name") {
          if (
            insertMode === "UDTAutoNumberBoth" ||
            insertMode === "UDTAutoGUIDBoth"
          ) {
            readonly = false
          }
        }
        if (!readonly) {
          if (!firstEditable) {
            id = this.rowData.key + "ovlRFNFocus_focus"
            firstEditable = true
          }
          //@@todo switch case for the other controltypes (combo, area, check,...)
          switch (col.control) {
            case "text":
              uiItem = html`
                <ovl-textbox
                  id="${id}"
                  class="fd-form__item "
                  .props="${() => fields[k]}"
                >
                </ovl-textbox>
              `
              break
            case "date":
              uiItem = html`
                <ovl-datebox
                  id="${id}"
                  class="fd-form__item "
                  .props=${() => fields[k]}
                >
                </ovl-datebox>
              `
              break

            case "textarea":
              uiItem = html`
                <ovl-textarea
                  id="${id}"
                  class="fd-form__item "
                  .props=${() => fields[k]}
                >
                </ovl-textarea>
              `
              break
            case "list":
              {
                uiItem = html`
                  <ovl-listcontrol
                    id="${id}"
                    class="fd-form__item "
                    .props="${() => fields[k]}"
                  >
                  </ovl-listcontrol>
                `
              }
              break
          }
        } else {
          uiItem = fields[k].value
        }

        return html`
          <td class="fd-table__cell" style="vertical-align:middle;">
            ${uiItem}
          </td>
        `
      })}
    `
  }
}
