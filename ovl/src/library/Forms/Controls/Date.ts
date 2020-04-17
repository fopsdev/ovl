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
      this.addEventListener("input", this.handleSelectChange)
    } else {
      this.addEventListener("change", this.handleSelectChange)
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

  handleSelectChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: {
        val:
          //@ts-ignore
          document.getElementById("select" + this.controlState.field.id).value,
        id: this.controlState.field.id,
      },
    })
    this.inputElement.dispatchEvent(event)
    document.getElementById("select" + this.controlState.field.id).value = null
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
    return html`
      ${label}
      <div class="dateInputCols2">
        <input
          @change=${(e) => this.handleChange(e)}
          @focusout=${(e) => this.handleFocusOut(e)}
          @keydown=${(e) => this.handleKeyDown(e)}
          style="${align} border-right:none"
          autocomplete="off"
          class="fd-input ${res.validationType} fd-has-type-1"
          type="text"
          id="${field.id}"
          value="${field.value}"
        />

        <input
          tabindex="9999"
          class="fd-input ${res.validationType} fd-has-type-1"
          style="padding-right:0px;margin-right:2px;margin-left:-28px;z-index:0; outline: none;"
          autocomplete="off"
          type="date"
          id="select${field.id}"
        />
      </div>
      <span class="fd-form-message ${res.validationHide}">
        ${field.validationResult.validationMsg}
      </span>
    `
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.controlState.field.id)
    this.inputElement.value = this.controlState.field.value
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
      this.removeEventListener("input", this.handleSelectChange)
    } else {
      this.removeEventListener("change", this.handleSelectChange)
    }
    super.disconnectedCallback()
  }
}
