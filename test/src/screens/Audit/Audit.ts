import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T } from "../../../../ovl/src/global/globals"
import { OvlState } from "../../../../ovl/src"

export class OvlAudit extends OvlBaseElement {
  init() {
    this.screen = "Audit"
  }
  async getUI() {
    return this.track(() => {
      return html`
        <div class="fd-layout-panel ">
          <div class="fd-layout-panel__header">
            <div class="fd-layout-panel__head">
              <h3 class="fd-layout-panel__title">
                ${T("AppAudit")}
              </h3>
            </div>
          </div>

          <div
            class="fd-layout-panel__body fd-has-padding-base fd-has-margin-base"
          >
            <ovl-table
              class="fd-table"
              .props=${(state: OvlState) => {
                return {
                  def: state.demoApp.tables.audit.tableDef.audit,
                  data: state.demoApp.tables.audit,
                }
              }}
            >
            </ovl-table>
          </div>
        </div>
      `
    })
  }
}
