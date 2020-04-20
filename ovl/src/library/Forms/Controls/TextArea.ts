import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ColumnAlign } from "../../Table/Table"
import { GetLabel } from "./helpers"

export type TextAreaControlState = {
  field: Field
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
        detail: {
          val: this.inputElement.value,
          id: this.controlState.field.id,
        },
      })
      this.inputElement.dispatchEvent(event)
    }
  }

  handleFocusOut(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.controlState.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val: this.inputElement.value, id: this.controlState.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  getUI() {
    let field = this.controlState.field

    let res = getUIValidationObject(field)

    let label
    let labelText = GetLabel(field)
    if (labelText) {
      label = html`
        <label
          class="fd-form-label"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${labelText}${res.needsAttention ? "*" : ""}</label
        >
      `
    }
    let align = ""
    if (field.ui && field.ui.align) {
      align = field.ui.align
    }

    return html`
      ${label}
      <textarea
        @keydown=${(e) => this.handleKeyDown(e)}
        @change=${(e) => this.handleChange(e)}
        @focusout=${(e) => this.handleFocusOut(e)}
        style="${align}"
        class="fd-textarea ${res.validationType} fd-has-type-1"
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
