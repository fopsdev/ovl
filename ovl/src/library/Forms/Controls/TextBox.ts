import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"

import { GetContainerClass, GetInputClass } from "./helpers"

import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { OvlControlBase } from "./OvlControlBase"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlControlBase {
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
  }

  handleInput(e: KeyboardEvent) {
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
    this.field.dirty = true
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
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <input
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @focusout=${() => RemoveFocusEventHelper(this, field.id)}
            @focus=${() => SetFocusEventHelper(this.inputElement, field.id)}
            @change=${(e) => this.handleChange(e)}
            @input=${(e) => this.handleInput(e)}
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
          <ovl-controlcustomhint .props=${() => this.field}>
          </ovl-controlcustomhint>
          <ovl-controlvalidationhint .props=${() => this.field}>
          </ovl-controlvalidationhint>
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)
    // don't set if focus (in editing) because safari has troubles with it (cursor jumping)
    if (this.inputElement && !this.field.hasFocus) {
      this.inputElement.value = this.field.value
    }
    super.afterRender()
  }
}
