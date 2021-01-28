import { OvlBaseElement } from "../../OvlBaseElement"
import { html } from "lit-html"
import { logState, T } from "../../../global/globals"
import { OvlFormState } from "../actions"

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
      let msgs = res.map((m) => T(m.key, m.reps)).join(", ")

      return html`
        <div
          class="fd-form-message fd-form-message--error ovl-formcontrol-formvalidation"
        >
          ${msgs}
        </div>
      `
    })
  }
}
