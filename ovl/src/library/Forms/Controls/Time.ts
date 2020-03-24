import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"

export type TimeControlState = {
  field: Field
  label: string
  align?: ColumnAlign
}

export class OvlTime extends OvlBaseElement {
  props: any
  controlState: TimeControlState
  inputElement: any
  init() {
    this.controlState = this.props(this.state)
    if (this.state.ovl.uiState.isMobile) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
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
    let style = ""
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

    type TimeBoxType = "text" | "time"
    let type: TimeBoxType = "text"
    if (this.state.ovl.uiState.isMobile) {
      type = "time"
    }
    return html`
      ${label}
      <input
        @focusout=${e => this.handleFocusOut(e)}
        style="${style} ${align}"
        autocomplete="off"
        class="fd-input ${res.validationType}"
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
  disconnectedCallback() {
    if (this.state.ovl.uiState.isMobile) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
