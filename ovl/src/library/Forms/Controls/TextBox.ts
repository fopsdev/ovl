import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { GetLabel } from "./helpers"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlBaseElement {
  props: any
  field: Field
  inputElement: any
  init() {
    this.field = this.props(this.state)
  }

  handleFocusOut(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val: this.inputElement.value, id: this.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: {
          val: this.inputElement.value,
          id: this.field.id,
        },
      })
      this.inputElement.dispatchEvent(event)
    }
  }

  getUI() {
    let field = this.field
    let inputMode: any = "text"
    if (field.type === "decimal") {
      inputMode = "decimal"
    } else if (field.type === "int") {
      inputMode = "numeric"
    }

    let res = getUIValidationObject(field)
    let style = ""
    let type: TextBoxType = "text"
    if (field.ui && field.ui.isPassword) {
      type = "password"
    }
    let label
    let labelText = GetLabel(field)
    if (labelText) {
      label = html`
        <label
          class="fd-form-label fd-has-type-1"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${labelText}</label
        >
      `
    }
    let align = ""
    if (field.ui && field.ui.align) {
      align = field.ui.align
    }
    return html`
      ${label}
      <input
        @change=${(e) => this.handleChange(e)}
        @focusout=${(e) => this.handleFocusOut(e)}
        @keydown=${(e) => this.handleKeyDown(e)}
        style="${style} ${align}"
        autocomplete="off"
        inputmode="${inputMode}"
        class="fd-input ${res.validationType} fd-has-type-1"
        type="${type}"
        id="${field.id}"
        value="${field.value}"
      />
      <span class="fd-form-message ${res.validationHide}">
        ${field.validationResult.validationMsg}
      </span>
    `
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)
    this.inputElement.value = this.field.value
  }
}
