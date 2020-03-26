import { html } from "../../../../ovl/node_modules/lit-html"
import { overmind } from "../.."
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"

export class CompTranslation extends OvlBaseElement {
  init() {
    this.screen = "Translation"
  }
  getUI() {
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
            .props=${(state: typeof overmind.state) => {
              return {
                def: state.portal.tables.translations.tableDef.translation,
                data: state.portal.tables.translations
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
