import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import {
  ControlState,
  GetContainerClass,
  GetCustomInfo,
  GetInputClass,
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
    super.InitControl()
    return this.track(() => {
      let field = this.field
      let inputMode: any = "text"
      if (field.type === "decimal") {
        inputMode = "decimal"
      } else if (field.type === "int") {
        inputMode = "numeric"
      }
      let type: TextBoxType = "text"
      if (field.ui && field.ui.isPassword) {
        type = "password"
      }
      return html`
        <div
          class="${GetContainerClass(
            "textbox",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>
          <input
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this.inputElement, field.id)}
            @keyup=${(e) => this.handleKeyUp(e)}
            style="${field.ui.align ? field.ui.align : ""}"
            autocomplete="${field.ui.autocomplete ? "on" : "new-password"}"
            spellcheck="${field.ui.useSpellcheck ? "true" : "false"}"
            inputmode="${inputMode}"
            ?readonly="${field.ui.readonly}"
            class="fd-input ${GetInputClass(
              "textbox",
              field,
              this.customInfo.customRowClassName
            )}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
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
