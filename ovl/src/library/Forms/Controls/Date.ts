import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { GetOutlineValidationHint } from "./helpers"

import { ChangeValue, RemoveFocus, SetFocus } from "../helper"
import { getDateValue } from "../../../global/globals"
import { OvlControlBase } from "./OvlControlBase"

export class OvlDate extends OvlControlBase {
  displayValue: string
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

  handleKeyUp(e: KeyboardEvent) {
    ChangeValue(this, this.inputElement.value, this.field.id, true)
  }

  handleFocusOut() {
    ChangeValue(this, this.inputElement.value, this.field.id)
    RemoveFocus(this, this.field.id)
  }

  async getUI() {
    super.InitControl()
    return this.track(() => {
      let field = this.field
      let type: "date" | "text" = "text"
      if (this.state.ovl.uiState.isMobile) {
        type = "date"
      }

      this.displayValue = getDateValue(field.convertedValue, field.ui.format)
      return html`
        <div
          class="ovl-formcontrol-container ovl-container-date ovl-container__${field.fieldKey} ${this
            .customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>
          <input
            tabindex="${ifDefined(
              this.nonFocusable() ? "-1" : undefined,
              this
            )}"
            @focus=${() => SetFocus(this, field.id)}
            @focusout=${() => this.handleFocusOut()}
            @keyup=${(e) => this.handleKeyUp(e)}
            style="${field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            class="fd-input ovl-focusable ${GetOutlineValidationHint(
              field
            )} ovl-formcontrol-input ovl-value-date ovl-value__${field.fieldKey} ${this
              .customInfo.customRowClassName} ${field.ui.readonly
              ? "ovl-disabled"
              : ""}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
            spellcheck="false"
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
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.value
    }
    // if (this.inputElement && this.field.field.convertedValue) {
    //   if (this.state.ovl.uiState.isMobile) {
    //     this.inputElement.value = this.field.field.convertedValue.substring(
    //       0,
    //       10
    //     )
    //   } else {
    //     this.inputElement.value = this.field.field.value
    //   }
    // }
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
