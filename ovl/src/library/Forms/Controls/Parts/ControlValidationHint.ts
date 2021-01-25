import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import { ControlState, GetValueFromCustomFunction } from "../helpers"
import { T } from "../../../../global/globals"

export class OvlValidationHint extends OvlBaseElement {
  props: any
  field: ControlState
  init() {
    this.field = this.props(this.state)
  }
  async getUI() {
    return this.track(() => {
      let field = this.field.field
      let hints = field.validationResult.errors
        .map((m) => T(m.key, m.reps))
        .join(", ")
      return html`
        <div
          class="fd-form-message fd-form-message--error ovl-formcontrol-validation ovl-formcontrol-validation__${field.fieldKey} ${hints &&
          field.watched &&
          !field.hasFocus &&
          !field.ui.readonly
            ? ""
            : "hide"}"
        >
          ${hints}
        </div>
      `
    })
  }
}
