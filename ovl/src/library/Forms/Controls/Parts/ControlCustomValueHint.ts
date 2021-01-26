import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import {
  ControlState,
  GetRowFromFormState,
  GetValueFromCustomFunction,
} from "../helpers"

export class OvlCustomValueHint extends OvlBaseElement {
  props: any
  field: ControlState
  init() {
    this.field = this.props(this.state)
  }

  async getUI() {
    return this.track(() => {
      let customValue
      let field = this.field.field
      if (field.validationResult.errors.length === 0) {
        let align = ""
        if (field.ui && field.ui.align) {
          align = field.ui.align
        }
        let formState = this.state.ovl.forms[field.formType][field.formId]
        customValue = GetValueFromCustomFunction(
          formState.row,
          field,
          formState,
          align,
          this.state
        )
      }
      return html`
        <div
          class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-listcontrol-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
            ? ""
            : "hide"}"
        >
          ${customValue}
        </div>
      `
    })
  }
}
