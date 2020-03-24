import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ColumnAlign } from "../../Table/Table"

export type TextAreaControlState = {
  field: Field
  align: ColumnAlign
  label: string
}

export class OvlTextArea extends OvlBaseElement {
  props: any
  controlState: TextAreaControlState
  inputElement: any
  init() {
    this.controlState = this.props(this.state)
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

  getUI() {
    let field = this.controlState.field
    field.autoCorrectedValue
    let res = getUIValidationObject(field)

    let label
    if (this.controlState.label) {
      label = html`
        <label
          class="fd-form-label"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${this.controlState.label}${res.needsAttention ? "*" : ""}</label
        >
      `
    }
    let align = ""
    if (this.controlState.align) {
      align = this.controlState.align
    }

    return html`
      ${label}
      <textarea
        @keydown=${e => this.handleKeyDown(e)}
        @change=${e => this.handleChange(e)}
        @focusout=${e => this.handleFocusOut(e)}
        style="${align}"
        class="fd-textarea ${res.validationType}"
        id="${field.id}"
      >
${field.value}</textarea
      >
      <span
        class="fd-form-message fd-form-message--warning ${res.validationHide}"
      >
        ${field.validationResult.validationMsg}
      </span>
    `
  }
  afterRender() {
    this.inputElement = document.getElementById(this.controlState.field.id)
    this.inputElement.value = this.controlState.field.value
  }
}
