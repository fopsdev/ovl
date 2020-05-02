import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableRowDataDef } from "./RowWrapper"
import { getDisplayValue } from "./helpers"
import { customFunctions, overmind } from "../../index"
import { resolvePath } from "../../global/globals"
import { GetLabel } from "../forms/Controls/helpers"
import {
  FieldGetList,
  FieldGetTableRowRender,
  TableHeaderCellClass,
  TableRowCellClass,
} from "../../global/hooks"
import { FieldVisibility } from "./Table"

export type CellClass = {
  className: string
}

type CachedRendererData = {
  hasRenderer: boolean
  fn: any
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

    let customRowCellClasses: { [key: string]: CellClass }
    let functionName = TableRowCellClass
    let fn = resolvePath(customFunctions, def.namespace)
    if (fn && fn[functionName]) {
      customRowCellClasses = fn[functionName](def, row, isMobile, this.state)
    }
    if (!customRowCellClasses) {
      customRowCellClasses = {}
    }

    return html`
      ${Object.keys(columns).map((k) => {
        let customRowCellClass: string = ""
        if (customRowCellClasses[k]) {
          customRowCellClass = customRowCellClasses[k].className
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
        let cachedRendererKey = def.namespace + k
        let cachedRenderer = cachedRendererFn.get(cachedRendererKey)
        let rendererFn
        if (!cachedRenderer) {
          let functionName = FieldGetTableRowRender.replace("%", k)
          let fn = resolvePath(customFunctions, def.namespace)
          if (fn && fn[functionName]) {
            rendererFn = fn[functionName]
            cachedRendererFn.set(cachedRendererKey, {
              fn: rendererFn,
              hasRenderer: true,
            })
          } else {
            cachedRendererFn.set(cachedRendererKey, {
              fn: undefined,
              hasRenderer: false,
            })
          }
        } else if (cachedRenderer.hasRenderer) {
          rendererFn = cachedRenderer.fn
        }
        let rowPart
        if (!rendererFn) {
          rowPart = getDisplayValue(k, col, row, def.namespace)
        } else {
          rowPart = rendererFn(k, row, def, align[k], this.state)
        }
        return html`
          <td
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
