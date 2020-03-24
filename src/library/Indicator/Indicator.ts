import { html } from "lit-html"
import { OvlBaseElement } from "../../library/OvlBaseElement"

export type IndicatorState = {
  open: boolean
  refCounter: number
}

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
