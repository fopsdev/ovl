import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { TableRowDataDef } from "./RowWrapper"
import { getDisplayValue, CachedRendererData, GetRendererFn } from "./helpers"
import { customFunctions, overmind } from "../../index"
import { resolvePath } from "../../global/globals"
import { GetLabel } from "../forms/Controls/helpers"
import {
  FieldGetList,
  FieldGetValueRender,
  ViewHeaderCellClass,
  ViewRowCellClass,
} from "../../global/hooks"
import { FieldVisibility, DisplayMode } from "./Table"

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
  init() {
    this.row = this.props()
  }

  getUI() {
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
          rowPart = getDisplayValue(k, col, row, def.namespace)
        } else {
          rowPart = rendererFn(
            k,
            row,
            def,
            align[k],
            <DisplayMode>"Table",
            this.state
          )
        }
        return html`
          <td
            title="${ifDefined(tooltip ? tooltip : undefined)}"
            data-col="${k}"
            class="fd-table__cell ${align[
              k
            ]} ovl-tableview-rowcell ovl-tableview-rowcell__${k} ${customRowCellClass}"
          >
            ${rowPart}
          </td>
        `
      })}
    `
  }
}
