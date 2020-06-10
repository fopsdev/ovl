import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { resolvePath } from "../../global/globals"
import { FieldGetValueRender, ViewRowCellClass } from "../../global/hooks"
import { customFunctions } from "../../index"
import { OvlBaseElement } from "../OvlBaseElement"
import { CachedRendererData, getDisplayValue, GetRendererFn } from "./helpers"
import { TableRowDataDef } from "./RowWrapper"
import { DisplayMode } from "./Table"

export type CellClass = {
  className?: string
  tooltip?: string
}

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()
export class TableRow extends OvlBaseElement {
  props: any
  row: TableRowDataDef
  hasLazyImage: boolean
  init() {
    this.row = this.props()
  }
  afterRender() {
    if (this.hasLazyImage) {
      let lazyImages = this.querySelectorAll(".ovl-lazy-image")
      lazyImages.forEach((element) => {
        this.row.intersectionObserver.observe(element)
      })
    }
  }
  async getUI() {
    let row = this.row.row
    let def = this.row.tableDef
    let columns = def.columns
    let align = this.row.columnsAlign
    let columnsVisible = this.row.columnsVisible
    let isMobile = this.state.ovl.uiState.isMobile

    // see if we can gbet custom class names for the row columns
    // eg. to color a cell
    // this will also be used for detailview, differentiating by param isDetail
    let customRowCellClasses: { [key: string]: CellClass }
    let functionName = ViewRowCellClass
    let fn = resolvePath(customFunctions, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](
        def,
        row,
        isMobile,
        <DisplayMode>"Table",
        this.state
      )
    }
    if (!customRowCellClasses) {
      customRowCellClasses = {}
    }

    return html`
      ${Object.keys(columns).map((k) => {
        let customRowCellClass: string = ""
        let tooltip
        if (customRowCellClasses[k]) {
          customRowCellClass = customRowCellClasses[k].className
          tooltip = customRowCellClasses[k].tooltip
        }
        let col = columns[k]
        let visible = columnsVisible[k]
        if (isMobile) {
          if (visible.indexOf("TableNotMobile") > -1) {
            return null
          }
        } else {
          if (visible.indexOf("TableOnlyMobile") > -1) {
            return null
          }
        }
        if (visible.indexOf("Table") < 0) {
          return null
        }

        // check for custom renderer
        let rowPart
        let rendererFn = GetRendererFn(
          def.namespace,
          cachedRendererFn,
          FieldGetValueRender,
          k
        )
        if (!rendererFn) {
          if (col.control === "checkbox") {
            if (row[k] === col.ui.checkedValue) {
              rowPart = def.options.controlsRendering.checkbox.table.checked
            } else {
              rowPart = def.options.controlsRendering.checkbox.table.unchecked
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
                rowPart = html`<img
                  class="ovl-lazy-image"
                  .dataLinkObject="${linkObject}"
                  src=""
                />`
              }
            }
          } else {
            rowPart = getDisplayValue(k, col, row, def.namespace)
          }
        } else {
          rowPart = rendererFn(
            k,
            row,
            def.namespace,
            def.columns,
            align[k],
            <DisplayMode>"Table",
            this.state
          )
        }

        // needs to be ignored to get css white-space: line-wrap work correctly
        // prettier-ignore
        return html`
          <td title="${ifDefined(tooltip ? tooltip : undefined)}" data-col="${k}" class="fd-table__cell ${align[k]} ovl-tableview-rowcell ovl-table-value-${col.control + (col.asset?col.asset.type: "")} ovl-table-value__${k} ${customRowCellClass}">${rowPart}</td>
        `
      })}
    `
  }
}
