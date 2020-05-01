import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { GetLabel } from "./helpers"

export class OvlTime extends OvlBaseElement {
  props: any
  field: Field
  inputElement: any
  init() {
    this.field = this.props(this.state)
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
  getUI() {
    let field = this.field

    let res = getUIValidationObject(field)
    let style = ""
    let label
    let labelText = GetLabel(field)
    if (labelText) {
      label = html`
        <label
          class="fd-form-label fd-has-type-1 ovl-formcontrol-label ovl-formcontrol-time-label ovl-formcontrol-label__${field.fieldKey}"
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

    type TimeBoxType = "text" | "time"
    let type: TimeBoxType = "text"
    if (this.state.ovl.uiState.isMobile) {
      type = "time"
    }
    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-time-container ovl-formcontrol-container__${field.fieldKey}"
      >
        ${label}
        <input
          @focusout=${(e) => this.handleFocusOut(e)}
          style="${style} ${align}"
          autocomplete="off"
          class="fd-input ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-formcontrol-time-input ovl-formcontrol-input__${field.fieldKey}"
          type="${type}"
          id="${field.id}"
          value="${field.value}"
        />
      </div>
      <span class="fd-form-message ${res.validationHide}">
        ${field.validationResult.validationMsg}
      </span>
    `
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)
    this.inputElement.value = this.field.value
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
