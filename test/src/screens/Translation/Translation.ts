import { html } from "../../../../ovl/node_modules/lit-html"

import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"
import { OvlState } from "../../../../ovl/src"

export class CompTranslation extends OvlBaseElement {
  init() {
    this.screen = "Translation"
  }
  async getUI() {
    return this.track(() => {
      return html`
        <div class="fd-panel ${this.animatedClass}">
          <div class="fd-panel__header">
            <div class="fd-panel__head">
              <h3 class="fd-panel__title">
                ${T("AppTranslations")}
              </h3>
            </div>
          </div>

          <div class="fd-panel__body fd-has-padding-base fd-has-margin-base">
            <ovl-table
              class="fd-table"
              .props=${(state: OvlState) => {
                return {
                  def: state.portal.tables.translation.tableDef.translation,
                  data: state.portal.tables.translation,
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
