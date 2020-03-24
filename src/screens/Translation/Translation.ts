import { OvlBaseElement } from "../../library/OvlBaseElement"
import { html } from "lit-html"
import { overmind } from "../.."
import { T } from "../../global/globals"

export class Translation extends OvlBaseElement {
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
                def:
                  state.ovl.language.tables.translations.tableDef.translation,
                data: state.ovl.language.tables.translations
              }
            }}
          >
          </ovl-table>
        </div>
      </div>
    `
  }
}
