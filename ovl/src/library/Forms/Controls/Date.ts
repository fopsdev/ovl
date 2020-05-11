import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { GetLabel, ControlState } from "./helpers"
import { ifDefined } from "lit-html/directives/if-defined"

export class OvlDate extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  init() {
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
      detail: { id: this.field.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val: this.inputElement.value, id: this.field.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: {
          val: this.inputElement.value,
          id: this.field.field.id,
        },
      })
      this.inputElement.dispatchEvent(event)
    }
  }

  getUI() {
    this.field = this.props(this.state)
    let field = this.field.field
    let res = getUIValidationObject(field)

    let customRowCell = this.field.customRowCellClass
    let customRowClassName = ""
    let customRowTooltip
    if (customRowCell) {
      customRowClassName = customRowCell.className
      customRowTooltip = customRowCell.tooltip
    }

    let align = ""
    if (field.ui && field.ui.align) {
      align = field.ui.align
    }

    let label = GetLabel(field, this.field.customHeaderCellClass, res, align)
    let type: "date" | "text" = "text"
    if (this.state.ovl.uiState.isMobile) {
      type = "date"
    }
    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-date-container ovl-formcontrol-container__${field.fieldKey}"
      >
        ${label}
        <input
          title="${ifDefined(customRowTooltip ? customRowTooltip : undefined)}"
          @focusout=${(e) => this.handleFocusOut(e)}
          @keydown=${(e) => this.handleKeyDown(e)}
          style="${align}"
          autocomplete="off"
          class="fd-input ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-formcontrol-date-input ovl-formcontrol-input__${field.fieldKey} ${customRowClassName}"
          type="${type}"
          id="${field.id}"
        />

        <span
          class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-date-validation ovl-formcontrol-validation__${field.fieldKey}"
        >
          ${field.validationResult.validationMsg}
        </span>
      </div>
    `
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.field.id)
    if (this.state.ovl.uiState.isMobile) {
      this.inputElement.value = this.field.field.convertedValue.substring(0, 10)
    } else {
      this.inputElement.value = this.field.field.value
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
