import { OvlFormElement, DataType } from "../forms/OvlFormElement"

import { EditRowDef, TableDataAndDef, DisplayMode } from "./Table"
import { html } from "lit-html"
import { T, ovltemp, resolvePath, isMobile } from "../../global/globals"
import { DialogResult } from "../actions"
import { customFunctions, overmind } from "../../index"
import { overlayToRender } from "../Overlay/Overlay"
import {
  FieldIsReadOnly,
  ViewRowCellClass,
  ViewHeaderCellClass,
} from "../../global/hooks"
import { CachedRendererData } from "./helpers"
import { CellClass } from "./Row"

export let cachedLabelRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()
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
  updated() {
    if (
      this.rowData.tableDef.features.focusToFirstEditableField &&
      !this.focusInit
    ) {
      this.focusInit = true
      let focusEl = document.getElementById("ovlRFNFocus_focus")
      //@ts-ignore
      focusEl.firstElementChild.focus()
    }
    super.updated()
  }

  handleCancel = async () => {
    if (!this.state.ovl.libState.indicator.open) {
      let cancel: boolean = true
      if (this.formState.dirty) {
        this.actions.ovl.dialog.OkCancelDialog({
          text: T("AppCancelForm"),
          default: 1,
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
            data: this.rowData.data,
          })
        }
        if (cancel) {
          this.actions.ovl.form.ResetForm(this.formState)
          this.actions.ovl.table.TableEditClose({
            key: this.rowData.key,
            tableDef: this.rowData.tableDef,
            data: this.rowData.data,
          })
          //this.actions.ovl.overlay.CloseOverlay()
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
          formState: this.formState,
        })
        if (!def.uiState.editRow[this.rowData.key].selected) {
          this.actions.ovl.overlay.CloseOverlay()
        }
      }
    }

    // const handleMainClick = (e: Event) => {
    //   e.stopPropagation()
    //   //e.preventDefault()
    // }

    let acceptEnabled = "fd-button--positive sap-icon--accept"

    if (!this.formState.valid || this.state.ovl.libState.indicator.open) {
      acceptEnabled = "fd-button nopointerevents"
    }

    let customRowCellClasses: { [key: string]: CellClass }
    let functionName = ViewRowCellClass
    let fn = resolvePath(customFunctions, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](
        def,
        this.rowData.row,
        isMobile,
        <DisplayMode>"Edit",
        this.state
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
        isMobile,
        <DisplayMode>"Edit",
        this.state
      )
    }
    if (!customHeaderCellClasses) {
      customHeaderCellClasses = {}
    }

    return html`
      <div id="ovl-bigeditform-${def.id}" class="fd-panel ovl-bigeditform">
        <div class="scrollableOverlay">
          ${Object.keys(columns).map((k) => {
            let customHeaderCellClass: CellClass = customHeaderCellClasses[k]
            let customRowCellClass: CellClass = customRowCellClasses[k]
            let col = columns[k]
            let columnsVisible = this.rowData.columnsVisible
            if (columnsVisible[k].indexOf("Edit") < 0) {
              return null
            }
            let uiItem
            let id = "ovlRFNFocus_" + k
            // let controlAlign = ""
            // if (this.rowData.columnsAlign[k]) {
            //   let align: string = this.rowData.columnsAlign[k]
            //   if (align.indexOf("right") > -1) {
            //     controlAlign = "text-align:right;"
            //   } else if (align.indexOf("center") > -1) {
            //     controlAlign = "text-align:center;"
            //   }
            // }
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
                readonly = true
              }
            }
            if (!readonly) {
              if (def.features.focusToFirstEditableField && !firstEditable) {
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
                      .props=${() => {
                        return {
                          fields: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
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
                          fields: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
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
                          fields: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
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
                          fields: fields[k],
                          customHeaderCellClass,
                          customRowCellClass,
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
                            fields: fields[k],
                            customHeaderCellClass,
                            customRowCellClass,
                          }
                        }}
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
            @click=${this.handleCancel}
            title="Abbrechen"
            class="fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
  }
}
