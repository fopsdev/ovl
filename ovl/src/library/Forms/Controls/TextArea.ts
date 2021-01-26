import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { html } from "lit-html"
import { OvlFormState } from "../actions"

import { GetOutlineValidationHint } from "./helpers"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"
import { OvlControlBase } from "./OvlControlBase"

export class OvlTextArea extends OvlControlBase {
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, this.inputElement.value, this.field.id)
  }

  async getUI() {
    this.InitControl()
    return this.track(() => {
      let field = this.field

      return html`
        <div
          class="ovl-formcontrol-container ovl-container-textarea ovl-container__${field.fieldKey} ${this
            .customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>
          <textarea
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this, field.id)}
            class="fd-textarea ovl-focusable ${GetOutlineValidationHint(
              field
            )} ovl-formcontrol-input  ovl-value-textarea ovl-value__${field.fieldKey} ${this
              .customInfo.customRowClassName} ${field.ui.readonly
              ? "ovl-disabled"
              : ""}"
            id="${field.id}"
            spellcheck="${field.ui.useSpellcheck ? "true" : "false"}"
          >
${field.value}</textarea
          >
        </div>
        <ovl-controlcustomhint .props=${() => this.controlState}>
        </ovl-controlcustomhint>
        <ovl-controlvalidationhint .props=${() => this.controlState}>
        </ovl-controlvalidationhint>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.value
    }
    super.afterRender()
  }
}
