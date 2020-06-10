import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"

export class OvlBackButton extends OvlBaseElement {
  async getUI() {
    const handleBack = (e: Event) => {
      this.actions.ovl.navigation.NavigateBack()
    }
    let user = this.state.ovl.user
    if (
      user &&
      user.token &&
      this.state.ovl.screens.nav.screensHistory.length > 1
    ) {
      return html`
        <button
          style="z-index:2;"
          @click=${handleBack}
          class=" fd-button fd-shellbar__button fd-has-type-4 fd-has-color-action-2"
          aria-label=""
          title=${T("AppBack")}
        >
          <span
            class="sap-icon--sys-back sap-icon--l fd-has-color-action-2"
          ></span>
        </button>
      `
    } else {
      return null
    }
  }
}
