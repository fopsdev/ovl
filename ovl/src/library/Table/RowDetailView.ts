import { html, TemplateResult } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { customFunctions, overmind } from "../.."
import { api, resolvePath, T } from "../../global/globals"
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
import { DisplayMode, ViewRowDef, TableDef } from "./Table"

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
  hasLazyImage: boolean
  intersectionObserver: IntersectionObserver

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

  handleTabClick = (e: Event, key: string | number) => {
    e.preventDefault()
    e.stopPropagation()
    this.actions.ovl.table.TableSetViewTab({
      def: this.rowData.tableDef.options.tabs,
      key,
    })
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

    console.log(this.trackedTree.pathDependencies)
    let columns = def.columns
    let rowControlActions: {
      [key: string]: RowControlAllAction
    } = await createDynamicRowFunctions(
      def,
      this.rowData.data,
      this.rowData.key,
      true
    )
    console.log(this.trackedTree.pathDependencies)

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

    let columnsVisible = this.rowData.columnsVisible
    // some tabbed content prep
    let tabbedContent

    let hasTabs =
      def.options.tabs !== undefined && def.options.tabs.view !== undefined
    let tabsFound = new Set<string | number>()
    if (hasTabs) {
      //console.log(def.options.tabs.view)
      // lets first see how many tabs are there if any
      Object.keys(columns).forEach((k) => {
        let col = columns[k]
        if (columnsVisible[k].indexOf("View") > -1) {
          if (col.ui.viewTab) {
            tabsFound.add(col.ui.viewTab)
          }
        }
      })
      // also add custom tabs which have a customfunction defined
      Object.keys(def.options.tabs.view.tabs).filter((f) => {
        let tab = def.options.tabs.view.tabs[f]
        if (tab.hasCustomContent) {
        }
      })

      if (tabsFound.size === 0) {
        hasTabs = false
      }
    }
    if (hasTabs) {
      let activeTab = def.options.tabs.view.selected
      if (!activeTab) {
        Object.keys(def.options.tabs.view.tabs).some((k) => {
          if (tabsFound.has(k)) {
            activeTab = k
            return true
          }
        })
      }
      let tabbedControls = this.getControls(
        Object.keys(def.columns).filter(
          (f) => def.columns[f].ui.viewTab === activeTab
        ),
        def,
        row,
        customHeaderCellClasses,
        customRowCellClasses,
        columnsVisible
      )

      tabbedContent = html`<div class="fd-panel ovl-tab ovl-viewtab">
        <ul class="fd-tabs fd-tabs--l ovl-tabs ovl-viewtabs" role="tablist">
          ${Array.from(tabsFound).map((k) => {
            let tab = def.options.tabs.view.tabs[k]
            let selected = k === activeTab
            return html`
              
                <li class="fd-tabs__item ovl-tab-header ovl-viewtab-header ovl-tab-header__${k}">
                  <a
                    class="fd-tabs__link"
                    @click=${(e) => this.handleTabClick(e, k)}
                    aria-controls="${k}"
                    aria-selected="${selected}"
                    href="#${k}"
                    role="tab"
                  >
                    <span class="fd-tabs__tag">
                      ${T(tab.translationKey)}
                    </span>
                  </a>
                </li>
              </div>
            `
          })}
        </ul>
        <div
          class="fd-tabs__panel ovl-tabcontent ovl-viewtabcontent ovl-tabcontent__${activeTab}"
          aria-expanded="true"
          id="${activeTab}"
          role="tabpanel"
        >
          ${tabbedControls}
        </div>
      </div>`
    }
    let bodyContent
    if (viewRendererFn) {
      bodyContent = viewRendererResult.result
    } else {
      body = this.getControls(
        Object.keys(def.columns).filter((f) => !def.columns[f].ui.viewTab),
        def,
        row,
        customHeaderCellClasses,
        customRowCellClasses,
        columnsVisible
      )
      bodyContent = html`${body} ${tabbedContent}`
    }

    return html`
      <div
        class="fd-panel ovl-detailview ovl-table-${def.id} ovl-detailview-${def.id}"
      >
        <div
          tabindex="0"
          id="ovl-detailview-intersectionobserver"
          class="fd-panel ${scrollable}"
        >
          ${caption}
          <div
            @click="${this.handleClick}"
            @long-press="${this.handleLongPress}"
            class="fd-panel__body ovl-detailview-body-${def.id} ovl-detailview-body"
          >
            ${bodyContent}
          </div>
        </div>
        <div
          class="fd-panel__footer ovl-panel__footer ovl-detailview-footer-${def.id} ovl-detailview-footer"
        >
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
  getControls(
    controls,
    def: TableDef,
    row,
    customHeaderCellClasses,
    customRowCellClasses,
    columnsVisible
  ) {
    let columns = def.columns
    return controls.map((k) => {
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

      if (columnsVisible[k].indexOf("View") < 0) {
        return null
      }
      let uiItem
      if (rendererFn) {
        uiItem = rendererFn(
          k,
          row,
          def.namespace,
          def.columns,
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
        } else if (col.control === "link") {
          if (col.asset.type === "Image") {
            let linkValue = row[k]

            if (linkValue) {
              let linkObject = JSON.parse(linkValue)
              if (linkObject.cat !== "Ext") {
                if (linkObject.id1) {
                  linkObject.id1 = row[linkObject.id1]
                }
                if (linkObject.id2) {
                  linkObject.id2 = row[linkObject.id2]
                }
              }
              this.hasLazyImage = true
              uiItem = html`<img
                class="ovl-lazy-image"
                .dataLinkObject="${linkObject}"
                src=""
              />`
            }
          }
        } else {
          // let res = await overmind.effects.getRequest(
          //   api.url + "assets/get",
          //   params,
          //   true
          // )
          // if (res.data) {
          //   const urlCreator = window.URL || window.webkitURL
          //   //@ts-ignore
          //   entry.target.src = urlCreator.createObjectURL(res.data)

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
          class="fd-form-label ovl-detailview-label ovl-table-label-${col.control +
          (col.asset
            ? col.asset.type
            : "")} ovl-table-label__${k} ${customHeaderCellClass}"
          >${l}</label
        >`
        // needs to be ignored to get css white-space: line-wrap work correctly
        // prettier-ignore
        value = html`<article title="${ifDefined(rowtooltip ? rowtooltip : undefined)}" data-col=${k} class="fd-has-type-1 ovl-detailview-value ovl-table-value-${col.control + (col.asset ? col.asset.type : "")} ovl-table-value__${k} ${customRowCellClass}">${uiItem}</article>`
      }
      return html`<div
        class="ovl-detailview-container ovl-container-${col.control +
        (col.asset ? col.asset.type : "")} ovl-container__${k}"
      >
        ${label} ${value}
      </div>`
    })
  }
  afterRender() {
    this.handleAfterRenderCustomHook()

    overlayToRender.elementToFocusAfterOpen = document.getElementById(
      "ovl-detailview-intersectionobserver"
    )

    if (this.hasLazyImage && !this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        async (entries, observer) => {
          for (let i = 0; i < entries.length; i++) {
            let entry = entries[i]
            if (entry.intersectionRatio === 1) {
              // get data path
              //@ts-ignore
              let params = entry.target.dataLinkObject
              let res = await overmind.effects.getRequest(
                api.url + "assets/get",
                params,
                true
              )
              if (res.data) {
                const urlCreator = window.URL || window.webkitURL
                //@ts-ignore
                entry.target.src = urlCreator.createObjectURL(res.data)
                observer.unobserve(entry.target)
              }
            }
          }
        },
        {
          root: document.getElementById("ovl-detailview-intersectionobserver"),
          threshold: 1,
        }
      )

      let lazyImages = this.querySelectorAll(".ovl-lazy-image")
      lazyImages.forEach((element) => {
        this.intersectionObserver.observe(element)
      })
    }
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
