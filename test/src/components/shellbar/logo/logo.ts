import { OvlBaseElement } from "../../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../../ovl/node_modules/lit-html/lit-html"
//@ts-ignore
import logo from "../../../../img/logo.png"
export class OvlLogo extends OvlBaseElement {
  getUI() {
    return html`
      <img src="${logo}" width="48" height="24" alt="Kalt AG" />
    `
  }
}
