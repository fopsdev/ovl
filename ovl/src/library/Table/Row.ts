import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableRowDataDef } from "./RowWrapper"
import { getDisplayValue } from "./helpers"
import { customFunctions, overmind } from "../../index"
import { resolvePath } from "../../global/globals"

export let cachedFn: Map<string, any> = new Map<string, any>()
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
    return html`
      ${Object.keys(columns).map(k => {
        let col = columns[k]
        if (!columnsVisible[k]) {
          return null
        }
        let listdata
        if (col.list) {
          let functionName = k + "GetListFn"
          let cacheKey = functionName + def.namespace
          let cFn = cachedFn.get(cacheKey)
          if (cFn) {
            listdata = cFn(row, this.state, this.actions, overmind.effects)
          } else {
            let fn = resolvePath(customFunctions, def.namespace)
            if (fn && fn[functionName]) {
              let fnToCall = fn[functionName]
              listdata = fnToCall(
                row,
                this.state,
                this.actions,
                overmind.effects
              )
              cachedFn.set(cacheKey, fnToCall)
            }
          }
        }
        let fieldvalue = getDisplayValue(k, col, row, listdata)
        return html`
          <td class="fd-table__cell ${align[k]}">
            ${fieldvalue}
          </td>
        `
      })}
    `
  }
}
