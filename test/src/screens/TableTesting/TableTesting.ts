import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
export class CompTableTesting extends OvlBaseElement {
  init() {
    this.screen = "TableTesting"
  }
  async getUI() {
    return html`
      <div class="">
        <div class="fd-layout-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.demoApp.testtables.tableTesting.tableDef.tab1,
                data: state.demoApp.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>
        <br />
        <br />
        <br />
        <div class="fd-layout-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.demoApp.testtables.tableTesting.tableDef.tab2,
                data: state.demoApp.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>

        <br />
        <br />
        <br />
        <div class="fd-layout-panel">
          <ovl-table
            class="fd-table"
            .props=${(state) => {
              return {
                def: state.demoApp.testtables.tableTesting.tableDef.tab3,
                data: state.demoApp.testtables.tableTesting,
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
