import { html } from "lit-html"

import { GetContainerClass, GetInputClass } from "./helpers"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { OvlControlBase } from "./OvlControlBase"
import { SetFieldDirty } from "../FieldAPI"

export class OvlTextArea extends OvlControlBase {
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
  }

  async getUI() {
    this.InitControl()
    return this.track(() => {
      let field = this.field
      return html`
        <div
          class="${GetContainerClass(
            "textarea",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <textarea
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @input=${(e) => {
              SetFieldDirty(this.field, true)
            }}
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocusEventHelper(this, field.id)}
            @focus=${() => SetFocusEventHelper(this, field.id)}
            class="fd-textarea ${GetInputClass(
              "textarea",
              field,
              this.customInfo.customRowClassName
            )}"
            id="${field.id}"
            spellcheck="${field.ui.useSpellcheck ? "true" : "false"}"
          >
${field.value}</textarea
          >
        </div>
        <ovl-controlcustomhint .props=${() => this.field}>
        </ovl-controlcustomhint>
        <ovl-controlvalidationhint .props=${() => this.field}>
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
