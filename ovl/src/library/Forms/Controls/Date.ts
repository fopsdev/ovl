import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  GetContainerClass,
  GetInputClass,
  GetOutlineValidationHint,
} from "./helpers"

import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { getDateValue, isMobile } from "../../../global/globals"
import { OvlControlBase } from "./OvlControlBase"

export class OvlDate extends OvlControlBase {
  displayValue: string
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

  handleFocusOut() {
    //ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
    RemoveFocusEventHelper(this, this.field.id)
  }
  async getUI() {
    super.InitControl()
    return this.track(() => {
      let field = this.field
      let type: "date" | "text" = "text"
      if (isMobile()) {
        type = "date"
      }

      this.displayValue = getDateValue(field.convertedValue, field.ui.format)
      return html`
        <div
          class="${GetContainerClass(
            "date",
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
            @focus=${() => SetFocusEventHelper(this, field.id)}
            @focusout=${() => this.handleFocusOut()}
            style="${field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            class="fd-input ${GetInputClass(
              "date",
              field,
              this.customInfo.customRowClassName
            )}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
            spellcheck="false"
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
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.value
    }
    // if (this.inputElement && this.field.field.convertedValue) {
    //   if (isMobile()) {
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
    if (isMobile()) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
