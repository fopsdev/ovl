import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"

export class OvlIndicator extends OvlBaseElement {
  getUI() {
    let hideIndicator = "hide"
    if (this.state.ovl.libState.indicator.open) {
      hideIndicator = ""
    }
    return html`
      <span
        style="margin-left: 8px; color:white;"
        class="sap-icon--synchronize sap-icon--xl sap-icon--animate-spin ${hideIndicator}"
      ></span>
    `
  }
}
