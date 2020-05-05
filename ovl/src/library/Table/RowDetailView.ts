import { html } from "lit-html"
import { T, resolvePath, isMobile } from "../../global/globals"
import { overlayToRender } from "../Overlay/Overlay"
import { OvlBaseElement } from "../OvlBaseElement"
import {
  createDynamicRowFunctions,
  getDisplayValue,
  rowControlActionsHandler,
  CachedRendererData,
  GetRendererFn,
} from "./helpers"
import { RowControlAllAction } from "./RowControl"
import { EditRowDef } from "./Table"
import { CellClass } from "./Row"
import {
  ViewRowCellClass,
  ViewHeaderCellClass,
  FieldRowCellSelectedHandler,
  FieldHeaderCellSelectedHandler,
  FieldGetViewValueRender,
  FieldGetViewLabelRender,
} from "../../global/hooks"
import { customFunctions } from "../.."
import { ifDefined } from "lit-html/directives/if-defined"
import { SnackAdd } from "../helpers"

export let cachedLabelRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export class TableRowDetailView extends OvlBaseElement {
  props: any
  rowData: EditRowDef

  init() {
    this.async = true
    this.rowData = this.props()
    overlayToRender.overlayClosedCallback = () => {
      this.actions.ovl.internal.TableCloseViewRow({
        key: this.rowData.key,
        def: this.rowData.tableDef,
      })
    }
    super.init()
  }
  handleAction = (e: Event, key: string, isCustom: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    rowControlActionsHandler(
      isCustom,
      key,
      this.rowData.tableDef,
      this.rowData.data,
      this.rowData.key,
      true
    )
  }
  handleClose = () => {
    this.actions.ovl.overlay.CloseOverlay()
  }

  handleClick = async (e) => {
    if (e.target.getAttribute("data-col")) {
      let key = e.target.getAttribute("data-col")
      let def = this.rowData.tableDef
      if (e.target.classList.contains("ovl-detailview-label")) {
        let functionName = FieldHeaderCellSelectedHandler.replace("%", key)
        let fn = resolvePath(customFunctions, def.namespace)
        if (fn && fn[functionName]) {
          if (
            !(await fn[functionName](
              //@ts-ignore
              e.target.classList,
              def,
              true,
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
              true,
              this.state
            ))
          ) {
            return
          }
        }
      }
    }
  }

  handleLongPress = (e) => {
    // if on touch device also display row status message as a snack
    if (this.state.ovl.uiState.isTouch) {
      let mobileTooltip
      if (e.target.title) {
        mobileTooltip = e.target.title
      }
      if (mobileTooltip) {
        SnackAdd(mobileTooltip, "Information")
      }
    }
  }

  async getUIAsync() {
    let def = this.rowData.tableDef
    let columns = def.columns
    let rowControlActions: {
      [key: string]: RowControlAllAction
    } = await createDynamicRowFunctions(
      def,
      this.rowData.data,
      this.rowData.key,
      true
    )

    let customRowCellClasses: { [key: string]: CellClass }
    let functionName = ViewRowCellClass
    let fn = resolvePath(customFunctions, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](
        def,
        this.rowData.row,
        isMobile,
        true,
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
        false,
        this.state
      )
    }
    if (!customHeaderCellClasses) {
      customHeaderCellClasses = {}
    }

    let rowActions = Object.keys(rowControlActions)
    return html`
      <div id="ovl-detailview-${def.id}" class="fd-panel ovl-detailview">
        <div class="fd-panel scrollableOverlay">
          <div
            @click="${this.handleClick}"
            @long-press="${this.handleLongPress}"
            class="fd-panel__body ovl-detailview-container"
          >
            ${Object.keys(columns).map((k) => {
              let rendererFn = GetRendererFn(
                def,
                cachedRendererFn,
                FieldGetViewValueRender,
                k
              )
              let labelRendererFn = GetRendererFn(
                def,
                cachedLabelRendererFn,
                FieldGetViewLabelRender,
                k
              )
              let customHeaderCellClass = ""
              let headertooltip
              if (customHeaderCellClasses[k]) {
                customHeaderCellClass = customHeaderCellClasses[k].className
                headertooltip = customHeaderCellClasses[k].tooltip
              }
              let rowtooltip
              let customRowCellClass = ""
              if (customRowCellClasses[k]) {
                customRowCellClass = customRowCellClasses[k].className
                rowtooltip = customRowCellClasses[k].tooltip
              }
              let col = columns[k]
              let columnsVisible = this.rowData.columnsVisible
              if (columnsVisible[k].indexOf("View") < 0) {
                return null
              }
              let uiItem
              if (rendererFn) {
                uiItem = rendererFn(
                  k,
                  this.rowData.row,
                  def,
                  this.rowData.columnsAlign[k],
                  this.state
                )
              } else {
                uiItem = getDisplayValue(
                  k,
                  col,
                  this.rowData.row,
                  def.namespace
                )
              }
              let label
              let value
              if (uiItem || (!uiItem && col.ui.showLabelIfNoValueInView)) {
                let l
                if (col.ui.labelTranslationKey) {
                  l = T(col.ui.labelTranslationKey)
                } else {
                  l = k
                }
                if (labelRendererFn) {
                  l = labelRendererFn(k, l, def, "", this.state)
                }

                label = html`<label
                  title="${ifDefined(
                    headertooltip ? headertooltip : undefined
                  )}"
                  data-col=${k}
                  class="fd-form-label ovl-detailview-label ovl-detailview-label__${k} ${customHeaderCellClass}"
                  >${l}</label
                >`
                value = html`<article
                  title="${ifDefined(rowtooltip ? rowtooltip : undefined)}"
                  data-col=${k}
                  class="fd-has-type-1 ovl-value-view ovl-detailview-value ovl-detailview-value__${k} ${customRowCellClass}"
                >
                  ${uiItem}
                </article>`
              }

              return html`${label} ${value}`
            })}
          </div>
        </div>
        <div class="fd-panel__footer" style="margin:2px; padding:2px;">
          ${rowActions.map((k, i) => {
            let button = rowControlActions[k]
            return html`<button
                @click=${(e) => this.handleAction(e, k, button.custom)}
                title="${button.name}"
                class="fd-button ${button.icon}"
                ?disabled=${button.disabled}
                id="${k + this.rowData.key}"
              ></button>
              <div style="margin-left:4px;"></div>`
          })}
          <button
            @click=${this.handleClose}
            title="Abbrechen"
            class="fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
  }
}
