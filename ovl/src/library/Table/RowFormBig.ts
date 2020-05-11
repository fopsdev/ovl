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
  FieldHeaderCellSelectedHandler,
  FieldRowCellSelectedHandler,
  EditGetCaptionRender,
  EditGetLabelAndValueRender,
} from "../../global/hooks"
import { CachedRendererData, GetRendererFn } from "./helpers"
import { CellClass } from "./Row"
import { SnackAdd } from "../helpers"

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
      let el = document.getElementById("ovlRFNFocus_focus")
      if (el) {
        overlayToRender.elementToFocusAfterOpen =
          el.firstElementChild.firstElementChild
      }
      //@ts-ignore
      //focusEl.firstElementChild.focus()
    }
    super.updated()
  }

  handleLongPress = (e) => {
    // if on touch device also display row status message as a snack
    if (this.state.ovl.uiState.isTouch) {
      let mobileTooltip

      let searchDataCol = e.target

      while (searchDataCol) {
        if (searchDataCol.title) {
          mobileTooltip = searchDataCol.title
          break
        }
        searchDataCol = searchDataCol.parentNode
      }

      if (mobileTooltip) {
        SnackAdd(mobileTooltip, "Information")
      }
    }
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
      if (e.target.classList.contains("ovl-formcontrol-label")) {
        let functionName = FieldHeaderCellSelectedHandler.replace("%", key)
        let fn = resolvePath(customFunctions, def.namespace)
        if (fn && fn[functionName]) {
          if (
            !(await fn[functionName](
              //@ts-ignore
              e.target.classList,
              def,
              <DisplayMode>"Edit",
              this.state
            ))
          ) {
            return
          }
        }
      } else {
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
              <DisplayMode>"Edit",
              this.state,
              this.formState
            ))
          ) {
            return
          }
        }
      }
    }
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
        this.state.ovl.uiState.isMobile,
        <DisplayMode>"Edit",
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
        <DisplayMode>"Edit",
        this.state
      )
    }
    if (!customHeaderCellClasses) {
      customHeaderCellClasses = {}
    }
    let scrollable = "scrollableOverlay"
    if (this.state.ovl.uiState.isMobile) {
      scrollable = "scrollableMobileOverlay"
    }

    let caption
    // lets see if we have a custom caption renderer
    let captionFunctionName = EditGetCaptionRender
    let captionFn = resolvePath(customFunctions, def.namespace)
    if (def.options.view || captionFn[captionFunctionName]) {
      let captionContent
      let captionTranslated
      if (def.options.edit.caption && def.options.edit.caption.translationKey) {
        captionTranslated = T(def.options.edit.caption.translationKey)
      }
      if (captionFn[captionFunctionName]) {
        captionContent = captionFn[captionFunctionName](
          captionTranslated,
          this.rowData,
          this.state
        )
      } else {
        captionContent = captionTranslated
      }
      caption = html`
        <div
          class="fd-panel__header ovl-panel__header ovl-detailview-header fd-has-type-1"
        >
          ${captionContent}
        </div>
      `
    }

    return html`
      <div id="ovl-bigeditform-${def.id}" class="fd-panel ovl-bigeditform">
        <div class="fd-panel ${scrollable}">
          ${caption}
          ${Object.keys(columns).map((k) => {
            let customHeaderCellClass: CellClass = customHeaderCellClasses[k]
            let customRowCellClass: CellClass = customRowCellClasses[k]
            let col = columns[k]
            let columnsVisible = this.rowData.columnsVisible
            if (columnsVisible[k].indexOf("Edit") < 0) {
              return null
            }
            let rendererFn = GetRendererFn(
              def,
              cachedRendererFn,
              EditGetLabelAndValueRender,
              k
            )
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
                def,
                this.rowData.data,
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
            }
            if (rendererFn) {
              uiItem = rendererFn(
                fields[k],
                customHeaderCellClass,
                customRowCellClass,
                id,
                readonly
              )
            } else {
              if (!readonly) {
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
            }

            return html`
              <div
                data-col="${k}"
                @click="${this.handleClick}"
                @long-press="${this.handleLongPress}"
                class="fd-panel__body"
              >
                ${uiItem}
              </div>
            `
          })}
        </div>
        <div class="fd-panel__footer ovl-bigedit-footer ovl-panel__footer">
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
