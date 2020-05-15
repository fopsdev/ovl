import { html, TemplateResult } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { customFunctions, overmind } from "../.."
import { resolvePath, T } from "../../global/globals"
import {
  FieldGetLabelRender,
  FieldGetValueRender,
  FieldHeaderCellSelectedHandler,
  FieldRowCellSelectedHandler,
  ViewAfterRender,
  ViewCustomRender,
  ViewGetCaptionRender,
  ViewHeaderCellClass,
  ViewRowCellClass,
  ViewShow,
} from "../../global/hooks"
import { SnackAdd } from "../helpers"
import { overlayToRender } from "../Overlay/Overlay"
import { OvlBaseElement } from "../OvlBaseElement"
import {
  CachedRendererData,
  createDynamicRowFunctions,
  getDisplayValue,
  GetRendererFn,
  rowControlActionsHandler,
} from "./helpers"
import { CellClass } from "./Row"
import { RowControlAllAction } from "./RowControl"
import { DisplayMode, ViewRowDef } from "./Table"

export type ViewRendererResult = {
  result: TemplateResult
  type: "Full" | "Body"
}

export let cachedViewRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

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
  rowData: ViewRowDef
  formAfterRenderFn: any
  formShowFn: any
  formShowed: boolean

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
              <DisplayMode>"Detailview",
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
              <DisplayMode>"Detailview",
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

    // check if custom view needs to be rendered
    let viewRendererFn
    if (def.options.view && def.options.view.viewType === "custom") {
      viewRendererFn = GetRendererFn(
        def.namespace,
        cachedViewRendererFn,
        ViewCustomRender,
        def.id
      )
    }
    let viewRendererResult: ViewRendererResult
    if (viewRendererFn) {
      viewRendererResult = viewRendererFn(this.rowData)

      if (viewRendererResult.type === "Full") {
        return viewRendererResult.result
      }
    }

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
        this.state.ovl.uiState.isMobile,
        <DisplayMode>"DetailView",
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
        this.state.ovl.uiState.isMobile,
        <DisplayMode>"Detailview",
        this.state
      )
    }
    if (!customHeaderCellClasses) {
      customHeaderCellClasses = {}
    }

    let rowActions = Object.keys(rowControlActions)
    let scrollable = "scrollableOverlay"
    if (this.state.ovl.uiState.isMobile) {
      scrollable = "scrollableMobileOverlay"
    }

    let caption
    // lets see if we have a custom caption renderer
    if (def.options.view.customCaption) {
      let captionFunctionName = ViewGetCaptionRender
      let captionFn = resolvePath(customFunctions, def.namespace)

      let captionContent
      let captionTranslated
      if (def.options.view.customCaption.translationKey) {
        captionTranslated = T(def.options.view.customCaption.translationKey)
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

    let body
    let row = this.rowData.row
    if (viewRendererFn) {
      body = viewRendererResult.result
    } else {
      body = html`
        ${Object.keys(columns).map((k) => {
          let rendererFn = GetRendererFn(
            def.namespace,
            cachedRendererFn,
            FieldGetValueRender,
            k
          )
          let labelRendererFn = GetRendererFn(
            def.namespace,
            cachedLabelRendererFn,
            FieldGetLabelRender,
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
              row,
              def,
              this.rowData.columnsAlign[k],
              <DisplayMode>"Detailview",
              this.state
            )
          } else {
            if (col.control === "checkbox") {
              if (row[k] === col.ui.checkedValue) {
                uiItem = def.options.controlsRendering.checkbox.view.checked
              } else {
                uiItem = def.options.controlsRendering.checkbox.view.unchecked
              }
            } else {
              uiItem = getDisplayValue(k, col, row, def.namespace)
            }
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
            //l = GetLabelText(l, k, def.namespace, this.state)
            if (labelRendererFn) {
              l = labelRendererFn(
                k,
                l,
                this.rowData.columnsAlign[k],
                <DisplayMode>"Detailview",
                this.state
              )
            }

            label = html`<label
              title="${ifDefined(headertooltip ? headertooltip : undefined)}"
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

          return html`<div
            class="ovl-detailview-container ovl-detailview-container__${k}"
          >
            ${label} ${value}
          </div>`
        })}
      `
    }
    return html`
      <div id="ovl-detailview-${def.id}" class="fd-panel ovl-detailview">
        <div class="fd-panel ${scrollable}">
          ${caption}
          <div
            id="ovl-detailview-body-${def.id}"
            @click="${this.handleClick}"
            @long-press="${this.handleLongPress}"
            class="fd-panel__body ovl-detailview-body"
          >
            ${body}
          </div>
        </div>
        <div class="fd-panel__footer ovl-panel__footer ovl-detailview-footer">
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
  afterRender() {
    this.handleAfterRenderCustomHook()
  }

  updated() {
    this.handleFormShowCustomHook()
  }

  handleFormShowCustomHook() {
    if (!this.formShowed) {
      this.formShowed = true
      // preserve form control focus

      // call form Show hook
      if (this.formShowFn !== -1) {
        if (this.formShowFn) {
          this.callFormShow()
        } else {
          if (customFunctions) {
            let formFunctions = resolvePath(
              customFunctions,
              this.rowData.tableDef.namespace
            )
            if (formFunctions) {
              if (formFunctions[ViewShow]) {
                this.formShowFn = formFunctions[ViewShow]
                this.callFormShow()
                return
              }
            }
          }
          this.formShowFn = -1
        }
      }
    }
  }

  handleAfterRenderCustomHook() {
    if (this.formAfterRenderFn !== -1) {
      if (this.formAfterRenderFn) {
        this.callFormAfterRender()
      } else {
        if (customFunctions) {
          let formFunctions = resolvePath(
            customFunctions,
            this.rowData.tableDef.namespace
          )
          if (formFunctions) {
            if (formFunctions[ViewAfterRender]) {
              this.formAfterRenderFn = formFunctions[ViewAfterRender]
              this.callFormAfterRender()
              return
            }
          }
        }
        this.formAfterRenderFn = -1
      }
    }
  }
  callFormAfterRender() {
    this.formAfterRenderFn(
      this.rowData,
      this.state,
      this.actions,
      overmind.effects
    )
  }

  callFormShow() {
    setTimeout(() => {
      this.formShowFn(this.rowData, this.state, this.actions, overmind.effects)
    }, 200)
  }
}
