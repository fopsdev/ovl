import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ControlState, GetLabel, GetValueFromCustomFunction } from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { FormState } from "../actions"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: FormState
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

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customRowCell = this.field.customRowCellClass
      let customRowClassName = ""
      let customRowTooltip
      let customRowClassContainerName = ""
      if (customRowCell) {
        customRowClassName = customRowCell.className
        customRowClassContainerName = customRowClassName + "Container"
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
        align,
        this.formState
      )
      return html`
        <div
          class="ovl-formcontrol-container ovl-container-textbox ovl-container__${field.fieldKey} ${customRowClassContainerName}"
        >
          ${label}
          <input
            title="${ifDefined(
              customRowTooltip ? customRowTooltip : undefined
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${(e) => this.handleFocusOut(e)}
            @keydown=${(e) => this.handleKeyDown(e)}
            style="${style} ${align}"
            autocomplete="off"
            inputmode="${inputMode}"
            class="fd-input ovl-focusable ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-table-value-textbox ovl-table-value__${field.fieldKey} ${customRowClassName}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
          />

          <span
            class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-textbox-custom ovl-formcontrol-custom__${field.fieldKey}"
          >
            ${GetValueFromCustomFunction(
              this.field.row,
              field,
              this.formState,
              align,
              this.field.isInline,
              this.state
            )}
          </span>

          <span
            class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-textbox-validation ovl-formcontrol-validation__${field.fieldKey}"
          >
            ${field.validationResult.validationMsg}
          </span>
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)
    this.inputElement.value = this.field.field.value
  }
  getDisplayValue() {}
}
