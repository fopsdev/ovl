import { html } from "lit-html"
import { ovltemp, resolvePath, T } from "../../global/globals"
import {
  EditGetCaptionRender,
  EditGetLabelAndValueRender,
  FieldHeaderCellSelectedHandler,
  FieldIsReadOnly,
  FieldRowCellSelectedHandler,
  ViewHeaderCellClass,
  ViewRowCellClass,
  FieldHeaderCellSelectedHandler_Type,
  FieldRowCellSelectedHandler_Type,
  ViewRowCellClass_ReturnType,
  ViewRowCellClass_Type,
  ViewHeaderCellClass_ReturnType,
  ViewHeaderCellClass_Type,
  EditGetCaptionRender_Type,
  FieldIsReadOnly_ReturnType,
  FieldIsReadOnly_Type,
  FieldGetValueRender_Type,
  EditGetLabelAndValueRenderer_Type,
} from "../../global/hooks"

import { DialogResult } from "../actions"
import { OvlFormElement } from "../forms/OvlFormElement"
import { SnackAdd } from "../helpers"
import { overlayToRender } from "../Overlay/Overlay"
import { CachedRendererData, GetRendererFn } from "./helpers"
import { CellClass } from "./Row"
import { DisplayMode, EditRowDef } from "./Table"
import { DialogHolderParams } from "../Dialog/OvlDialogHolder"

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()
export class TableRowFormBig extends OvlFormElement {
  props: any
  rowData: EditRowDef
  focusInit: boolean
  wasAdd: boolean

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
        let focusEl: HTMLCollection = el.getElementsByClassName("ovl-focusable")
        if (focusEl.length > 0) {
          overlayToRender.elementToFocusAfterOpen = focusEl[0]
        }
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
        let fn = resolvePath(this.actions.custom, def.namespace)
        if (fn && fn[functionName]) {
          if (
            !(await fn[functionName](<FieldHeaderCellSelectedHandler_Type>{
              //@ts-ignore
              classList: e.target.classList,
              def,
              displayMode: <DisplayMode>"Edit",
            }))
          ) {
            return
          }
        }
      } else {
        let functionName = FieldRowCellSelectedHandler.replace("%", key)
        let fn = resolvePath(this.actions.custom, def.namespace)
        if (fn && fn[functionName]) {
          if (
            !(await fn[functionName](<FieldRowCellSelectedHandler_Type>{
              classList: e.target.classList,
              def,
              data: this.rowData.data,
              rowKey: this.rowData.key,
              displayMode: <DisplayMode>"Edit",
              formState: this.formState,
            }))
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
      this.wasAdd = this.rowData.key.indexOf(ovltemp) > -1
      if (cancel) {
        this.actions.ovl.form.ResetForm(this.formState)
        this.actions.ovl.dialog.DialogClose("EditFormBig")
      }
    }
  }
  closeEdit = () => {
    debugger
    if (this.wasAdd) {
      this.actions.ovl.internal.TableDeleteRowFromData({
        key: this.rowData.key,
        def: this.rowData.tableDef,
        data: this.rowData.data,
      })
    } else {
      this.actions.ovl.table.TableEditClose({
        key: this.rowData.key,
        tableDef: this.rowData.tableDef,
        data: this.rowData.data,
      })
    }
  }

  getBody = () => {
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
        // meanwhile save could have changed formState.valid because of save error
        if (this.formState.valid) {
          this.actions.ovl.dialog.DialogClose("EditFormBig")
        }
      }
    }

    let acceptEnabled = "fd-button--positive sap-icon--accept"

    if (!this.formState.valid || this.state.ovl.libState.indicator.open) {
      acceptEnabled = "fd-button nopointerevents"
    }

    let customRowCellClasses: ViewRowCellClass_ReturnType
    let functionName = ViewRowCellClass
    let fn = resolvePath(this.actions.custom, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](<ViewRowCellClass_Type>{
        def,
        row: this.rowData.row,
        isMobile: this.state.ovl.uiState.isMobile,
        displayMode: <DisplayMode>"Edit",
        formState: this.formState,
      })
    }

    if (!customRowCellClasses) {
      customRowCellClasses = {}
    }

    let customHeaderCellClasses: ViewHeaderCellClass_ReturnType
    let functionName2 = ViewHeaderCellClass
    let fn2 = resolvePath(this.actions.custom, def.namespace)
    if (fn2 && fn[functionName2]) {
      customHeaderCellClasses = fn2[functionName2](<ViewHeaderCellClass_Type>{
        def,
        isMobile: this.state.ovl.uiState.isMobile,
        displayMode: <DisplayMode>"Edit",
      })
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
    if (def.options.edit.customCaption) {
      let captionFunctionName = EditGetCaptionRender
      let captionFn = resolvePath(this.actions.custom, def.namespace)

      let captionContent
      let captionTranslated
      if (def.options.edit.customCaption) {
        switch (this.rowData.mode) {
          case "edit":
            captionTranslated = T(
              def.options.edit.customCaption.editTranslationKey
            )
            break
          case "add":
            captionTranslated = T(
              def.options.edit.customCaption.addTranslationKey
            )
            break
          case "copy":
            captionTranslated = T(
              def.options.edit.customCaption.copyTranslationKey
            )
            break
        }
      }
      if (captionFn[captionFunctionName]) {
        captionContent = captionFn[captionFunctionName](<
          EditGetCaptionRender_Type
        >{
          caption: captionTranslated,
          row: this.rowData,
          mode: this.rowData.mode,
        })
      } else {
        captionContent = captionTranslated
      }
      if (captionContent) {
        caption = html`
          <div
            class="fd-layout-panel__header ovl-panel__header ovl-detailview-header fd-has-type-1"
          >
            ${captionContent}
          </div>
        `
      }
    }
    return html`
      <div
        class="ovl-table-${def.id} ovl-editform ovl-bigeditform ovl-editform-${def.id}"
      >
        <div class="${scrollable}">
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
              def.namespace,
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
            let fn = resolvePath(this.actions.custom, def.namespace)
            if (fn && fn[functionName]) {
              readonly = fn[functionName](<FieldIsReadOnly_Type>{
                rowKey: this.rowData.key,
                def,
                data: this.rowData.data,
              })
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
              uiItem = rendererFn(<EditGetLabelAndValueRenderer_Type>{
                field: fields[k],
                customHeaderCellClass,
                customRowCellClass,
                id,
                readonly,
              })
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
                            row: this.rowData.row,
                            isInline: false,
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
                            isInline: false,
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
                            isInline: false,
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
                            isInline: false,
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
                              isInline: false,
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
                              isInline: false,
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
            }

            return html`
              <div
                data-col="${k}"
                @click="${this.handleClick}"
                @long-press="${this.handleLongPress}"
                class="fd-layout-panel__body"
              >
                ${uiItem}
              </div>
            `
          })}
        </div>
        <div
          class="fd-layout-panel__footer ovl-bigedit-footer ovl-panel__footer"
        >
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
  async getUI() {
    return this.track(() => {
      if (!this.state.ovl.dialogs.EditFormBig.visible) {
        return null
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the hiolder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts

      dialogHolderParams = {
        dialogParts: {
          body: () => this.getBody(),
          closedCallbackFn: this.closeEdit,
        },
        zIndex: 6,
        dialogType: "EditFormBig",
      }
      return html`<ovl-dialogholder
        .dialogHolderParams=${dialogHolderParams}
      ></ovl-dialogholder>`
    })
  }
}
