import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"

import { T } from "../../../../global/globals"
import { Field } from "../../actions"

export class OvlValidationHint extends OvlBaseElement {
  props: any
  field: Field
  init() {
    this.field = this.props(this.state)
  }
  async getUI() {
    return this.track(() => {
      let field = this.field
      let errors = field.validationResult.errors
        .filter(
          (f) =>
            f.displayType === "Always" ||
            (f.displayType === "WhenTouched" && field.watched)
        )
        .map((m) => T(m.translationKey, m.translationReps))
        .join(", ")
      return html`
        <div
          class="fd-form-message fd-form-message--error ovl-formcontrol-validation ovl-formcontrol-validation__${field.fieldKey} ${errors &&
          !field.hasFocus &&
          !field.ui.readonly
            ? ""
            : "hide"}"
        >
          ${errors}
        </div>
      `
    })
  }
}
