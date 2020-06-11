import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
export class CompTableTesting extends OvlBaseElement {
  init() {
    this.screen = "TableTesting"
  }
  async getUI() {
    return html`
      <div class="${this.animatedClass}">
        <div class="fd-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.portal.testtables.tableTesting.tableDef.tab1,
                data: state.portal.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>
        <br />
        <br />
        <br />
        <div class="fd-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.portal.testtables.tableTesting.tableDef.tab2,
                data: state.portal.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>

        <br />
        <br />
        <br />
        <div class="fd-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.portal.testtables.tableTesting.tableDef.tab3,
                data: state.portal.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
