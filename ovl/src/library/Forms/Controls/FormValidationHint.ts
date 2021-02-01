import { OvlBaseElement } from "../../OvlBaseElement"
import { html } from "lit-html"
import { logState, T } from "../../../global/globals"
import { OvlFormState, ValidateResultErrors } from "../actions"
import { _getValidationText } from "./helpers"

export class OvlFormValidationHint extends OvlBaseElement {
  props: any
  formState: OvlFormState
  init() {
    this.formState = this.props(this.state)
  }
  async getUI() {
    return this.track(() => {
      let res = this.formState.validationResult.visibleErrors
      if (res.length === 0) {
        return null
      }

      let msgs = _getValidationText(<ValidateResultErrors[]>res)
      return html`
        <div
          class="fadeInControl fd-form-message fd-form-message--error ovl-formcontrol-formvalidation"
        >
          ${msgs}
        </div>
      `
    })
  }
}
