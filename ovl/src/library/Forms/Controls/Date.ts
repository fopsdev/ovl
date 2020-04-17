import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"

export type DateControlState = {
  field: Field
  label: string
  align?: ColumnAlign
}

export class OvlDate extends OvlBaseElement {
  props: any
  controlState: DateControlState
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

  getUI() {
    let field = this.controlState.field

    let res = getUIValidationObject(field)

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
    let type: "date" | "text" = "text"
    if (this.state.ovl.uiState.isMobile) {
      type = "date"
    }
    return html`
      <div>
        ${label}
        <input
          @focusout=${(e) => this.handleFocusOut(e)}
          @keydown=${(e) => this.handleKeyDown(e)}
          style="${align}"
          autocomplete="off"
          class="fd-input ${res.validationType} fd-has-type-1"
          type="${type}"
          id="${field.id}"
        />

        <span class="fd-form-message ${res.validationHide}">
          ${field.validationResult.validationMsg}
        </span>
      </div>
    `
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.controlState.field.id)
    if (this.state.ovl.uiState.isMobile) {
      this.inputElement.value = this.controlState.field.convertedValue.substring(
        0,
        10
      )
    } else {
      this.inputElement.value = this.controlState.field.value
    }
    // let selectEl = document.getElementById(
    //   "select" + this.controlState.field.id
    // )
    // if (selectEl) {
    //   debugger
    //   selectEl.style.zIndex = this.inputElement.style.zIndex - 1
    //   //   selectEl.style.paddingTop =
    //   //     "-" +
    //   //     (
    //   //       parseInt(this.inputElement.offsetTop) +
    //   //       parseInt(this.inputElement.offsetHeight)
    //   //     ).toString() +
    //   //     "px"
    //   //   selectEl.style.marginLeft = this.inputElement.offsetLeft - 12 + "px"
    // }
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
