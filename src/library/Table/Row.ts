import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableRowDataDef } from "./RowWrapper"
import { getDisplayValue } from "./helpers"
import * as functions from "../../tableFunctions"

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
          if (
            functions[def.namespace] &&
            functions[def.namespace][functionName]
          ) {
            listdata = functions[def.namespace][functionName](this.state, row)
          }
        }
        let fieldvalue = getDisplayValue(col, row, listdata)
        return html`
          <td class="fd-table__cell ${align[k]}">
            ${fieldvalue}
          </td>
        `
      })}
    `
  }
}
