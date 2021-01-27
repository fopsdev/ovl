import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  GetContainerClass,
  GetCustomInfo,
  GetInputClass,
  GetOutlineValidationHint,
} from "./helpers"

import { OvlFormState } from "../actions"
import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { OvlControlBase } from "./OvlControlBase"

export class OvlTime extends OvlControlBase {
  init() {
    if (this.state.ovl.uiState.isMobile) {
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
      if (this.state.ovl.uiState.isMobile) {
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
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>

          <input
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
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
  disconnectedCallback() {
    if (this.state.ovl.uiState.isMobile) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
