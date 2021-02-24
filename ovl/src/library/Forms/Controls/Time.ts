import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { GetContainerClass, GetInputClass } from "./helpers"

import { OvlFormState } from "../actions"
import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { OvlControlBase } from "./OvlControlBase"
import { isMobile } from "../../../global/globals"
import { SetFieldDirty } from "../validators"

export class OvlTime extends OvlControlBase {
  init() {
    if (isMobile()) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
    }
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
  }
  async getUI() {
    this.InitControl()
    return this.track(() => {
      let field = this.field
      type TimeBoxType = "text" | "time"
      let type: TimeBoxType = "text"
      if (isMobile()) {
        type = "time"
      }
      return html`
        <div
          class="${GetContainerClass(
            "time",
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
            @input=${(e) => {
              SetFieldDirty(this.field, true)
            }}
            @focusout=${() => RemoveFocusEventHelper(this, field.id)}
            @focus=${() => SetFocusEventHelper(this, field.id)}
            style="${field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            spellcheck="false"
            class="fd-input ${GetInputClass(
              "time",
              field,
              this.customInfo.customRowClassName
            )}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
          />
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
  disconnectedCallback() {
    if (isMobile()) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
