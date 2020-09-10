import { html, TemplateResult } from "lit-html"
import { ifDefined } from "../../tracker/litdirectives/if-defined"
import { ovl } from "../.."
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
  ViewCustomTabRender,
  FieldHeaderCellSelectedHandler_Type,
  FieldRowCellSelectedHandler_Type,
  ViewRowCellClass_ReturnType,
  ViewRowCellClass_Type,
  ViewAfterRender_Type,
  ViewShow_Type,
  FieldGetValueRender_Type,
  FieldGetLabelRender_Type,
} from "../../global/hooks"
import { SnackAdd } from "../helpers"

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
import { DisplayMode, ViewRowDef, OvlTableDef } from "./Table"
import { DialogHolderParams } from "../Dialog/OvlDialogHolder"

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
    this.rowData = this.props()
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
    this.actions.ovl.dialog.DialogClose("DetailView")
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
        let fn = resolvePath(this.actions.custom, def.namespace)
        if (fn && fn[functionName]) {
          if (
            !(await fn[functionName](<FieldHeaderCellSelectedHandler_Type>{
              classList: e.target.classList,
              def,
              displayMode: <DisplayMode>"Detailview",
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
              displayMode: <DisplayMode>"Detailview",
            }))
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

  getBody = async () => {
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
    let customRowCellClasses: ViewRowCellClass_ReturnType
    let functionName = ViewRowCellClass
    let fn = resolvePath(this.actions.custom, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](<ViewRowCellClass_Type>{
        def,
        row: this.rowData.row,
        isMobile: this.state.ovl.uiState.isMobile,
        displayMode: <DisplayMode>"DetailView",
      })
    }
    if (!customRowCellClasses) {
      customRowCellClasses = {}
    }

    let customHeaderCellClasses: { [key: string]: CellClass }
    let functionName2 = ViewHeaderCellClass

    if (fn && fn[functionName2]) {
      customHeaderCellClasses = fn[functionName2](
        def,
        this.state.ovl.uiState.isMobile,
        <DisplayMode>"Detailview",
        this.state
      )
    }
    if (!customHeaderCellClasses) {
      customHeaderCellClasses = {}
    }

    let body
    let row = this.rowData.row

    let columnsVisible = this.rowData.columnsVisible

    // return await this.track(async () => {
    // some tabbed content prep
    let tabbedContent
    let tabbedControls
    let viewCustomTabFn
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
      Object.keys(def.options.tabs.view.tabs).filter(async (f) => {
        let tab = def.options.tabs.view.tabs[f]
        if (tab.hasCustomContent) {
          tabsFound.add(f)
          let viewCustomTabRenderFunctionName = ViewCustomTabRender.replace(
            "%",
            f
          )
          viewCustomTabFn = fn[viewCustomTabRenderFunctionName]
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
      if (!def.options.tabs.view.tabs[activeTab].hasCustomContent) {
        tabbedControls = this.getControls(
          Object.keys(def.columns).filter(
            (f) => def.columns[f].ui.viewTab === activeTab
          ),
          def,
          row,
          customHeaderCellClasses,
          customRowCellClasses,
          columnsVisible
        )
      } else {
        if (viewCustomTabFn) {
          tabbedControls = await viewCustomTabFn(
            this.rowData,
            this.state,
            this.actions,
            ovl.effects
          )
        }
      }
      tabbedContent = html`<div class="fd-layout-panel ovl-tab ovl-viewtab">
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
        tabindex="0"
        id="ovl-detailview-intersectionobserver"
        @click="${this.handleClick}"
        @long-press="${this.handleLongPress}"
      >
        ${bodyContent}
      </div>
    `
  }
  async getFooter() {
    return this.track(async () => {
      let rowControlActions: {
        [key: string]: RowControlAllAction
      } = await createDynamicRowFunctions(
        this.rowData.tableDef,
        this.rowData.data,
        this.rowData.key,
        true
      )
      let rowActions = Object.keys(rowControlActions)

      return html`
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
          class="fd-button fd-button--negative sap-icon--decline"
        ></button>
      `
    })
  }

  getHeader() {
    let def = this.rowData.tableDef
    let fn = resolvePath(this.actions.custom, def.namespace)
    // lets see if we have a custom caption renderer
    if (def.options.view.customCaption) {
      let captionFunctionName = ViewGetCaptionRender

      let captionContent
      let captionTranslated
      if (def.options.view.customCaption.translationKey) {
        captionTranslated = T(def.options.view.customCaption.translationKey)
      }
      if (fn[captionFunctionName]) {
        captionContent = fn[captionFunctionName](
          captionTranslated,
          this.rowData,
          this.state
        )
      } else {
        captionContent = captionTranslated
      }
      return html` ${captionContent} `
    } else {
      return null
    }
  }
  async getUI() {
    return this.track(() => {
      if (!this.state.ovl.dialogs.DetailView.visible) {
        return null
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the hiolder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts

      dialogHolderParams = {
        dialogParts: {
          afterRenderHandlerFn: () => {
            this.handleAfterRenderCustomHook()
            if (this.hasLazyImage && !this.intersectionObserver) {
              this.intersectionObserver = new IntersectionObserver(
                async (entries, observer) => {
                  for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i]
                    if (entry.intersectionRatio === 1) {
                      // get data path
                      //@ts-ignore
                      let params = entry.target.dataLinkObject
                      let res = await ovl.effects.ovl.getRequest(
                        this.state.ovl.apiUrl + "assets/get",
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
                  root: document.getElementById(
                    "ovl-detailview-intersectionobserver"
                  ),
                  threshold: 1,
                }
              )

              let lazyImages = this.querySelectorAll(".ovl-lazy-image")
              lazyImages.forEach((element) => {
                this.intersectionObserver.observe(element)
              })
            }
          },
          updatedHandlerFn: () => {
            if (!this.formShowed) {
              this.formShowed = true
              // preserve form control focus

              // call form Show hook
              if (this.formShowFn !== -1) {
                if (this.formShowFn) {
                  this.callFormShow()
                } else {
                  let formFunctions = resolvePath(
                    this.actions.custom,
                    this.rowData.tableDef.namespace
                  )
                  if (formFunctions) {
                    if (formFunctions[ViewShow]) {
                      this.formShowFn = formFunctions[ViewShow]
                      this.callFormShow()
                      return
                    }
                  }

                  this.formShowFn = -1
                }
              }
            }
          },
          dismissedCallbackFn: () => this.handleClose(),
          closedCallbackFn: () => {
            this.actions.ovl.internal.TableCloseViewRow({
              def: this.rowData.tableDef,
              key: this.rowData.key,
            })
          },
          body: () => this.getBody(),
          footer: async () => await this.getFooter(),
          header: () => this.getHeader(),
          customClass: () => {
            let def = this.rowData.tableDef
            return `ovl-table-${def.id} ovl-detailview  ovl-detailview-${def.id}`
          },
        },
        zIndex: 6,
        dialogType: "DetailView",
      }
      return html`<ovl-dialogholder
        .dialogHolderParams=${dialogHolderParams}
      ></ovl-dialogholder>`
    })
  }
  getControls(
    controls,
    def: OvlTableDef,
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
        uiItem = rendererFn(<FieldGetValueRender_Type>{
          columnKey: k,
          row,
          namespace: def.namespace,
          columnsDef: def.columns,
          align: this.rowData.columnsAlign[k],
          displayMode: <DisplayMode>"Detailview",
        })
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
          // let res = await ovl.effects.ovl.getRequest(
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
          l = labelRendererFn(<FieldGetLabelRender_Type>{
            columnKey: k,
            caption: l,
            align: this.rowData.columnsAlign[k],
            displayMode: <DisplayMode>"Detailview",
          })
        }

        label = html`<label
          title="${ifDefined(headertooltip ? headertooltip : undefined, this)}"
          data-col=${k}
          class="fd-form-label ovl-detailview-label ovl-label-${col.control +
          (col.asset
            ? col.asset.type
            : "")} ovl-label__${k} ${customHeaderCellClass}"
          >${l}</label
        >`
        // needs to be ignored to get css white-space: line-wrap work correctly
        // prettier-ignore
        value = html`<article title="${ifDefined(rowtooltip ? rowtooltip : undefined, this)}" data-col=${k} class="ovl-detailview-value ovl-value-${col.control + (col.asset ? col.asset.type : "")} ovl-value__${k} ${customRowCellClass}">${uiItem}</article>`
      }
      return html`<div
        class="ovl-detailview-container ovl-container-${col.control +
        (col.asset ? col.asset.type : "")} ovl-container__${k}"
      >
        ${label} ${value}
      </div>`
    })
  }

  handleAfterRenderCustomHook() {
    if (this.formAfterRenderFn !== -1) {
      if (this.formAfterRenderFn) {
        this.callFormAfterRender()
      } else {
        let formFunctions = resolvePath(
          this.actions.custom,
          this.rowData.tableDef.namespace
        )
        if (formFunctions) {
          if (formFunctions[ViewAfterRender]) {
            this.formAfterRenderFn = formFunctions[ViewAfterRender]
            this.callFormAfterRender()
            return
          }
        }

        this.formAfterRenderFn = -1
      }
    }
  }
  callFormAfterRender() {
    this.formAfterRenderFn(<ViewAfterRender_Type>{
      view: this.rowData,
      comp: this,
    })
  }

  callFormShow() {
    setTimeout(() => {
      this.formShowFn(<ViewShow_Type>{ view: this.rowData, comp: this })
    }, 200)
  }
}
