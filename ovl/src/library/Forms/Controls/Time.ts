import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  GetCustomInfo,
  GetOutlineValidationHint,
} from "./helpers"

import { OvlFormState } from "../actions"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"
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
    ChangeValue(this, this.inputElement.value, this.field.id)
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
          class="ovl-formcontrol-container ovl-container-time ovl-container__${field.fieldKey} ${this
            .customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>

          <input
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this, field.id)}
            style="${field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            spellcheck="false"
            class="fd-input ovl-focusable ${GetOutlineValidationHint(
              field
            )}  ovl-formcontrol-input ovl-value-time ovl-value__${field.fieldKey} ${this
              .customInfo.customRowClassName} ${field.ui.readonly
              ? "ovl-disabled"
              : ""}"
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
