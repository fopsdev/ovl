import { OvlFormElement, DataType } from "../forms/OvlFormElement"
import { TextBoxControlState } from "../Forms/Controls/TextBox"
import { TextAreaControlState } from "../Forms/Controls/TextArea"
import { EditRowDef, TableDataAndDef } from "./Table"
import { html } from "lit-html"
import { T, ovltemp, resolvePath } from "../../global/globals"
import { DialogResult } from "../actions"
import { functions } from "../../index"
import { overlayToRender } from "../Overlay/Overlay"
import { ListControlState } from "../Forms/Controls/ListControl"

export class TableRowFormBig extends OvlFormElement {
  props: any
  rowData: EditRowDef
  focusInit: boolean
  init() {
    this.focusInit = false
    this.rowData = this.props()
    this.formType = "TableRowEdit"
    overlayToRender.overlayDismissedCallback = () => {
      this.handleCancel()
    }
    super.init()
  }
  afterRender() {
    if (!this.focusInit) {
      this.focusInit = true
      let focusEl = document.getElementById("ovlRFNFocus_focus")
      //@ts-ignore
      focusEl.firstElementChild.focus()
    }
  }

  handleCancel = async () => {
    if (!this.state.ovl.libState.indicator.open) {
      let cancel: boolean = true
      if (this.formState.dirty) {
        this.actions.ovl.dialog.OkCancelDialog({
          text: T("AppCancelForm"),
          default: 1
        })
        if ((await DialogResult()) === 2) {
          cancel = false
        }
      }

      let isAdd = this.rowData.key.indexOf(ovltemp) > -1
      if (cancel || isAdd) {
        if (isAdd) {
          this.actions.ovl.internal.TableDeleteRowFromData({
            key: this.rowData.key,
            def: this.rowData.tableDef,
            data: this.rowData.data
          })
        }
        if (cancel) {
          this.actions.ovl.form.ResetForm(this.formState)
          this.actions.ovl.table.TableEditClose({
            key: this.rowData.key,
            tableDef: this.rowData.tableDef,
            data: this.rowData.data
          })
        }
      }
    }
  }

  getUI() {
    let fields = this.formState.fields
    let def = this.rowData.tableDef
    let columns = def.columns
    let firstEditable = false

    let handleSave = () => {
      if (this.formState.valid && !this.state.ovl.libState.indicator.open) {
        this.actions.ovl.internal.TableEditSaveRow({
          key: this.rowData.key,
          def: this.rowData.tableDef,
          data: this.rowData.data,
          formState: this.formState
        })
        if (!def.uiState.editRow[this.rowData.key].selected) {
          this.actions.ovl.internal.StartCloseOverlay()
        }
      }
    }

    const handleMainClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
    }

    const handleMainMouseDown = (e: Event) => {
      e.stopPropagation()
    }

    let acceptEnabled = "fd-button--positive sap-icon--accept"

    if (!this.formState.valid || this.state.ovl.libState.indicator.open) {
      acceptEnabled = "fd-button nopointerevents"
    }
    let width = "50vw;"
    if (this.state.ovl.uiState.isMobile) {
      width = "99vw;"
    }
    return html`
      <div
        style="width:${width}"
        class="fd-panel"
        @mousedown=${handleMainMouseDown}
        @click=${handleMainClick}
      >
        <div class="scrollableOverlay">
          ${Object.keys(columns).map(k => {
            let col = columns[k]
            let columnsVisible = this.rowData.columnsVisible
            if (!columnsVisible[k]) {
              return null
            }
            let uiItem
            let id = "ovlRFNFocus_" + k
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
            let fn = resolvePath(functions, def.namespace)
            if (fn && fn[functionName]) {
              editable = fn[functionName](
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
                id = "ovlRFNFocus_focus"
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
                          label: col.caption,
                          type: "text",
                          align: "left"
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
                          label: col.caption,
                          align: "left"
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
                        .props="${() => {
                          return <ListControlState>{
                            field: fields[k],
                            label: col.caption,
                            align: "left",
                            formState: this.formState,
                            namespace: def.namespace,
                            list: {
                              listFn: fn[k + "GetListFn"],
                              displayField: col.list.displayField,
                              displayValueField: col.list.displayValueField,
                              valueField: col.list.valueField,
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
              <div class="fd-panel__body">
                ${uiItem}
              </div>
            `
          })}
        </div>
        <div class="fd-panel__footer" style="margin:2px; padding:2px;">
          <button
            @click=${handleSave}
            title="Datensatz speichern"
            class="${acceptEnabled}"
          ></button>
          <div style="margin-left:100px;"></div>
          <button
            @mousedown=${this.handleCancel}
            @click=${this.handleCancel}
            title="Abbrechen"
            class="fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
  }
}
