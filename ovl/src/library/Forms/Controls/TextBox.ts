import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ControlState, GetLabel } from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
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
    let customRowCell = this.field.customRowCellClass
    let customRowClassName = ""
    let customRowTooltip
    if (customRowCell) {
      customRowClassName = customRowCell.className
      customRowTooltip = customRowCell.tooltip
    }

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
    let align = ""
    if (field.ui && field.ui.align) {
      align = field.ui.align
    }

    let label = GetLabel(
      field,
      this.field.customHeaderCellClass,
      res,
      "text",
      align
    )
    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-textbox-container ovl-formcontrol-container__${field.fieldKey}"
      >
        ${label}
        <input
          title="${ifDefined(customRowTooltip ? customRowTooltip : undefined)}"
          @change=${(e) => this.handleChange(e)}
          @focusout=${(e) => this.handleFocusOut(e)}
          @keydown=${(e) => this.handleKeyDown(e)}
          style="${style} ${align}"
          autocomplete="off"
          inputmode="${inputMode}"
          class="fd-input ovl-focusable ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-formcontrol-textbox-input ovl-formcontrol-input__${field.fieldKey} ${customRowClassName}"
          type="${type}"
          id="${field.id}"
          value="${field.value}"
        />

        <span
          class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-textbox-validation ovl-formcontrol-validation__${field.fieldKey}"
        >
          ${field.validationResult.validationMsg}
        </span>
      </div>
    `
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)
    this.inputElement.value = this.field.field.value
  }
}
