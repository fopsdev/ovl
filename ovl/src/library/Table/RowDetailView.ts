import { html } from "lit-html"
import { T } from "../../global/globals"
import { overlayToRender } from "../Overlay/Overlay"
import { OvlBaseElement } from "../OvlBaseElement"
import {
  createDynamicRowFunctions,
  getDisplayValue,
  rowControlActionsHandler,
} from "./helpers"
import { RowControlAllAction } from "./RowControl"
import { EditRowDef } from "./Table"

type CachedRendererData = {
  hasRenderer: boolean
  fn: any
}
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

    let rowActions = Object.keys(rowControlActions)
    return html`
      <div id="ovl-detailview-${def.id}" class="fd-panel ovl-detailview">
        <div class="fd-panel scrollableOverlay">
          <div class="fd-panel__body ovl-detailview-container">
            ${Object.keys(columns).map((k) => {
              let col = columns[k]
              let columnsVisible = this.rowData.columnsVisible
              if (columnsVisible[k].indexOf("View") < 0) {
                return null
              }
              let uiItem
              uiItem = getDisplayValue(k, col, this.rowData.row, def.namespace)
              let label
              let value
              if (uiItem || (!uiItem && col.ui.showLabelIfNoValueInView)) {
                let l
                if (col.ui.labelTranslationKey) {
                  l = T(col.ui.labelTranslationKey)
                } else {
                  l = k
                }
                label = html`<label
                  class="fd-form-label ovl-detailview-label ovl-detailview-label__${k}"
                  >${l}</label
                >`

                value = html`<article
                  class="fd-has-type-1 ovl-value-view ovl-detailview-value ovl-detailview-value__${k}"
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
