import { OvlFormElement, DataType } from "../../library/forms/OvlFormElement"
import { TextBoxControlState } from "../../library/Forms/Controls/TextBox"
import { TextAreaControlState } from "../../library/Forms/Controls/TextArea"
import { EditRowDef, TableDataAndDef } from "./Table"
import { html } from "lit-html"
import { T } from "../../global/globals"
import { DialogResult } from "../../library/actions"
import { getDisplayValue } from "./helpers"
import * as functions from "../../tableFunctions"
import { overlayToRender } from "../Overlay/Overlay"
import { ListControlState } from "../forms/Controls/ListControl"

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
  afterRender() {
    let time = 0
    if (this.state.ovl.libState.overlay.closing) {
      overlayToRender.overlayClosedCallback = () => {
        this.setFocus()
      }
    } else {
      this.setFocus()
    }
  }

  setFocus() {
    if (!this.focusInit) {
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
      ${Object.keys(columns).map(k => {
        let col = columns[k]
        let columnsVisible = this.rowData.columnsVisible
        if (!columnsVisible[k]) {
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
        let editable = col.editable
        // @@hook
        let functionName = k + "EditableFn"
        if (
          functions[def.namespace] &&
          functions[def.namespace][functionName]
        ) {
          editable = functions[def.namespace][functionName](
            this.rowData.key,
            <TableDataAndDef>{
              def: this.rowData.tableDef,
              data: this.rowData.data
            },
            this.state
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
            editable = false
          }
        }
        if (k === "Name") {
          if (
            insertMode === "UDTAutoNumberBoth" ||
            insertMode === "UDTAutoGUIDBoth"
          ) {
            editable = false
          }
        }
        if (editable) {
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
                  .props=${state => {
                    return <TextBoxControlState>{
                      field: fields[k],
                      label: "",
                      type: "text",
                      align: controlAlign
                    }
                  }}
                >
                </ovl-textbox>
              `
              break
            case "textarea":
              uiItem = html`
                <ovl-textarea
                  id="${id}"
                  class="fd-form__item "
                  .props=${state => {
                    return <TextAreaControlState>{
                      field: fields[k],
                      label: "",
                      align: controlAlign
                    }
                  }}
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
                    .props="${state => {
                      let functionName = k + "GetListFn"

                      let list
                      if (
                        functions[def.namespace] &&
                        functions[def.namespace][functionName]
                      ) {
                        list = functions[def.namespace][functionName](
                          this.state,
                          this.rowData.row
                        )
                      }

                      return <ListControlState>{
                        field: fields[k],
                        label: "",
                        align: "left",
                        formState: this.formState,
                        namespace: def.namespace,
                        list: {
                          listFn: functions[def.namespace][k + "GetListFn"],
                          displayField: col.list.displayField,
                          valueField: col.list.valueField,
                          displayValueField: col.list.displayValueField,
                          serverEndpoint: col.list.serverEndpoint
                        },
                        fieldId: k
                      }
                    }}"
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
