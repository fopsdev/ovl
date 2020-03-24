import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { T } from "../../global/globals"

export class OvlBackButton extends OvlBaseElement {
  getUI() {
    const handleBack = (e: Event) => {
      this.actions.ovl.global.NavigateBack()
    }

    if (
      this.state.ovl.user.token &&
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
