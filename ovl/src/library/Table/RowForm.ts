import { html } from "lit-html"
import { resolvePath } from "../../global/globals"
import {
  FieldIsReadOnly,
  FieldRowCellSelectedHandler,
  ViewHeaderCellClass,
  ViewRowCellClass,
} from "../../global/hooks"
import { customFunctions, ovl } from "../../index"
import { OvlFormElement } from "../../library/forms/OvlFormElement"
import { CellClass } from "./Row"
import { DisplayMode, EditRowDef } from "./Table"

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
  handleClick = async (e) => {
    let searchDataCol = e.target
    let key

    while (searchDataCol) {
      if (searchDataCol.getAttribute("data-col")) {
        key = searchDataCol.getAttribute("data-col")
        break
      }
      searchDataCol = searchDataCol.parentNode
    }

    if (key) {
      let def = this.rowData.tableDef
      let functionName = FieldRowCellSelectedHandler.replace("%", key)
      let fn = resolvePath(customFunctions, def.namespace)
      if (fn && fn[functionName]) {
        if (
          !(await fn[functionName](
            //@ts-ignore
            e.target.classList,
            def,
            this.rowData.data,
            this.rowData.key,
            <DisplayMode>"EditInline",
            this.state,
            this.formState
          ))
        ) {
          return
        }
      }
    }
  }

  updated() {
    // if (this.state.ovl.libState.overlay.closing) {
    //   overlayToRender.overlayClosedCallback = () => {
    //     this.setFocus()
    //   }
    // } else {
    this.setFocus()
    //}

    // if there is a custom afterrender
    super.updated()
  }
  setFocus() {
    if (
      this.rowData.tableDef.features.focusToFirstEditableField &&
      !this.focusInit
    ) {
      this.focusInit = true

      let el = document.getElementById(this.rowData.key + "ovlRFNFocus_focus")
      let target
      if (el) {
        let focusEl: HTMLCollection = el.getElementsByClassName("ovl-focusable")
        if (focusEl.length > 0) {
          target = focusEl[0]
        }
      }

      target.focus()

      var rect = target.getBoundingClientRect()
      if (rect.bottom > window.innerHeight) {
        target.scrollIntoView(false)
      }
      if (rect.top < 0) {
        target.scrollIntoView()
      }
    }
  }

  async getUI() {
    return this.track(() => {
      let def = this.rowData.tableDef
      let fields = this.formState.fields

      let customRowCellClasses: { [key: string]: CellClass }
      let functionName = ViewRowCellClass
      let fn = resolvePath(customFunctions, def.namespace)
      if (fn && fn[functionName]) {
        customRowCellClasses = fn[functionName](
          def,
          this.rowData.row,
          this.state.ovl.uiState.isMobile,
          <DisplayMode>"EditInline",
          this.state,
          this.formState
        )
      }

      if (!customRowCellClasses) {
        customRowCellClasses = {}
      }

      let customHeaderCellClasses: { [key: string]: CellClass }
      let functionName2 = ViewHeaderCellClass
      let fn2 = resolvePath(customFunctions, def.namespace)
      if (fn2 && fn[functionName2]) {
        customHeaderCellClasses = fn2[functionName2](
          def,
          this.state.ovl.uiState.isMobile,
          <DisplayMode>"EditInline",
          this.state
        )
      }
      if (!customHeaderCellClasses) {
        customHeaderCellClasses = {}
      }

      let columns = def.columns
      let firstEditable = false
      return html`
        ${Object.keys(columns).map((k) => {
          let customHeaderCellClass: CellClass = customHeaderCellClasses[k]
          let customRowCellClass: CellClass = customRowCellClasses[k]

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
              ovl.effects
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
                    .props=${() => {
                      return {
                        field: fields[k],
                        customHeaderCellClass,
                        customRowCellClass,
                        row: this.rowData.row,
                        isInline: true,
                      }
                    }}
                  >
                  </ovl-textbox>
                `
                break
              case "date":
                uiItem = html`
                  <ovl-datebox
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => {
                      return {
                        field: fields[k],
                        customHeaderCellClass,
                        customRowCellClass,
                        row: this.rowData.row,
                        isInline: true,
                      }
                    }}
                  >
                  </ovl-datebox>
                `
                break

              case "time":
                uiItem = html`
                  <ovl-timebox
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => {
                      return {
                        field: fields[k],
                        customHeaderCellClass,
                        customRowCellClass,
                        row: this.rowData.row,
                        isInline: true,
                      }
                    }}
                  >
                  </ovl-timebox>
                `
                break

              case "textarea":
                uiItem = html`
                  <ovl-textarea
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => {
                      return {
                        field: fields[k],
                        customHeaderCellClass,
                        customRowCellClass,
                        row: this.rowData.row,
                        isInline: true,
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
                      .props=${() => {
                        return {
                          field: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
                          row: this.rowData.row,
                          isInline: true,
                        }
                      }}
                    >
                    </ovl-listcontrol>
                  `
                }
                break
              case "checkbox":
                {
                  uiItem = html`
                    <ovl-checkbox
                      id="${id}"
                      class="fd-form__item "
                      .props=${() => {
                        return {
                          field: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
                          row: this.rowData.row,
                          isInline: true,
                        }
                      }}
                    >
                    </ovl-checkbox>
                  `
                }
                break
            }
          } else {
            uiItem = fields[k].value
          }

          return html`
            <td
              @click="${this.handleClick}"
              data-col=${k}
              class="fd-table__cell"
              style="vertical-align:middle;"
            >
              ${uiItem}
            </td>
          `
        })}
      `
    })
  }
}
