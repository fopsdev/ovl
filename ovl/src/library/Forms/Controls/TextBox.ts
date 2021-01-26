import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import {
  ControlState,
  GetCustomInfo,
  GetOutlineValidationHint,
} from "./helpers"

import { OvlFormState } from "../actions"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"
import { OvlControlBase } from "./OvlControlBase"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlControlBase {
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, this.inputElement.value, this.field.id)
  }

  handleKeyUp(e: KeyboardEvent) {
    //if (e.key === "Enter") {
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: {
        val: this.inputElement.value,
        id: this.field.id,
        isInnerEvent: true,
      },
    })
    this.inputElement.dispatchEvent(event)
    //}
  }

  async getUI() {
    return this.track(() => {
      super.InitControl()
      let inputMode: any = "text"
      if (this.field.type === "decimal") {
        inputMode = "decimal"
      } else if (this.field.type === "int") {
        inputMode = "numeric"
      }

      let style = ""
      let type: TextBoxType = "text"
      if (this.field.ui && this.field.ui.isPassword) {
        type = "password"
      }
      return html`
        <div
          class="fd-form-item ovl-formcontrol-container ovl-container-textbox ovl-container__${this
            .field.fieldKey} ${this.customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>
          <input
            tabindex="${ifDefined(
              this.needsTabIndex() ? "-1" : undefined,
              this
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocus(this, this.field.id)}
            @focus=${() => SetFocus(this.inputElement, this.field.id)}
            @keyup=${(e) => this.handleKeyUp(e)}
            style="${style} ${this.field.ui && this.field.ui.align
              ? this.field.ui.align
              : ""}"
            autocomplete="${this.field.ui.autocomplete ? "on" : "new-password"}"
            spellcheck="${this.field.ui.useSpellcheck ? "true" : "false"}"
            inputmode="${inputMode}"
            ?readonly="${this.field.ui.readonly}"
            class="fd-input ${GetOutlineValidationHint(this.field)} ${this
              .customInfo
              .customRowClassName} ovl-focusable ovl-formcontrol-input ovl-value-textbox ovl-value__${this
              .field.fieldKey} ${this.field.ui.readonly ? "ovl-disabled" : ""}"
            type="${type}"
            id="${this.field.id}"
            value="${this.field.value}"
          />
          <ovl-controlcustomhint .props=${() => this.controlState}>
          </ovl-controlcustomhint>
          <ovl-controlvalidationhint .props=${() => this.controlState}>
          </ovl-controlvalidationhint>
        </div>
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
