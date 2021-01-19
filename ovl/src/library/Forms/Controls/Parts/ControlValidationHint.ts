import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import { ControlState, GetValueFromCustomFunction } from "../helpers"

export class OvlValidationHint extends OvlBaseElement {
  props: any
  field: ControlState
  init() {
    this.field = this.props(this.state)
  }
  async getUI() {
    return this.track(() => {
      let field = this.field.field
      let hints = field.validationResult.errors.join(", ")
      return html`
        <div
          class="fd-form-message fd-form-message--error ovl-formcontrol-validation ovl-formcontrol-validation__${field.fieldKey} ${hints &&
          field.watched &&
          !field.hasFocus
            ? ""
            : "hide"}"
        >
          ${hints}
        </div>
      `
    })
  }
}
