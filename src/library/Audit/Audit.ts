import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { overmind } from "../.."
import { T } from "../../global/globals"

export class OvlAudit extends OvlBaseElement {
  init() {
    this.screen = "Audit"
  }
  getUI() {
    return html`
      <div class="fd-panel ${this.animatedClass}">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
              ${T("AppAudit")}
            </h3>
          </div>
        </div>

        <div class="fd-panel__body fd-has-padding-base fd-has-margin-base">
          <ovl-table
            class="fd-table"
            .props=${(state: typeof overmind.state) => {
              return {
                def: state.ovl.audit.tables.audit.tableDef.audit,
                data: state.ovl.audit.tables.audit
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
