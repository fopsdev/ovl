import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableRowDataDef } from "./RowWrapper"
import { getDisplayValue } from "./helpers"
import { customFunctions, overmind } from "../../index"
import { resolvePath } from "../../global/globals"
import { GetLabel } from "../forms/Controls/helpers"
import { FieldGetList, FieldGetTableRowRender } from "../../global/hooks"
import { FieldVisibility } from "./Table"

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
    return html`
      ${Object.keys(columns).map((k) => {
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
        if (!rendererFn) {
          let displayValue = getDisplayValue(k, col, row, def.namespace)
          return html`
            <td class="fd-table__cell ${align[k]}">
              ${displayValue}
            </td>
          `
        } else {
          return rendererFn(k, row, def, align[k], this.state)
        }
      })}
    `
  }
}
