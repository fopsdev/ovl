import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
export class CompTableTesting extends OvlBaseElement {
  init() {
    this.screen = "TableTesting"
  }
  getUI() {
    return html`
      <div class="${this.animatedClass}">
        <div>
          <ovl-table
            class="fd-table"
            .props=${state => {
              return {
                def: state.tables.tableTesting.tableDef.tab2,
                data: state.tables.tableTesting
              }
            }}
          >
          </ovl-table>
        </div>

        <div>
          <ovl-table
            class="fd-table"
            .props=${state => {
              return {
                def: state.tables.tableTesting.tableDef.tab1,
                data: state.tables.tableTesting
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
