import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { GetLabel } from "./helpers"

export class OvlDate extends OvlBaseElement {
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

    let res = getUIValidationObject(field)

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
    let type: "date" | "text" = "text"
    if (this.state.ovl.uiState.isMobile) {
      type = "date"
    }
    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-date-container ovl-formcontrol-container__${field.id}"
      >
        ${label}
        <input
          @focusout=${(e) => this.handleFocusOut(e)}
          @keydown=${(e) => this.handleKeyDown(e)}
          style="${align}"
          autocomplete="off"
          class="fd-input ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-formcontrol-date-input ovl-formcontrol-input__${field.id}"
          type="${type}"
          id="${field.id}"
        />

        <span
          class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-date-validation ovl-formcontrol-validation__${field.id}"
        >
          ${field.validationResult.validationMsg}
        </span>
      </div>
    `
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.id)
    if (this.state.ovl.uiState.isMobile) {
      this.inputElement.value = this.field.convertedValue.substring(0, 10)
    } else {
      this.inputElement.value = this.field.value
    }
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
