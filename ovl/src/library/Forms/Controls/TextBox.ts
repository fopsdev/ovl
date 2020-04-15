import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"

type TextBoxType = "text" | "password" | "text-security"
export type TextBoxControlState = {
  field: Field
  label: string
  type: TextBoxType
  align?: ColumnAlign
}

export class OvlTextbox extends OvlBaseElement {
  props: any
  controlState: TextBoxControlState
  inputElement: any
  init() {
    this.controlState = this.props(this.state)
  }

  handleFocusOut(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.controlState.field.id }
    })
    this.inputElement.dispatchEvent(event)
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val: this.inputElement.value, id: this.controlState.field.id }
    })
    this.inputElement.dispatchEvent(event)
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: { val: this.inputElement.value, id: this.controlState.field.id }
      })
      this.inputElement.dispatchEvent(event)
    }
  }

  getUI() {
    let field = this.controlState.field

    let res = getUIValidationObject(field)
    let style = ""
    let type: TextBoxType = "text"
    if (this.controlState.type === "text-security") {
      style = "-webkit-text-security: disc;"
    } else {
      type = this.controlState.type
    }
    let label
    if (this.controlState.label) {
      label = html`
        <label
          class="fd-form-label"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${this.controlState.label}</label
        >
      `
    }
    let align = ""
    if (this.controlState.align) {
      align = this.controlState.align
    }
    return html`
      ${label}
      <input
        @change=${e => this.handleChange(e)}
        @focusout=${e => this.handleFocusOut(e)}
        @keydown=${e => this.handleKeyDown(e)}
        style="${style} ${align}"
        autocomplete="off"
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
    this.inputElement = document.getElementById(this.controlState.field.id)
    this.inputElement.value = this.controlState.field.value
  }
}
