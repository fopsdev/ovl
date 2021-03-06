import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetLabel, GetValueFromCustomFunction } from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { OvlFormState } from "../actions"

type TextBoxType = "text" | "password" | "text-security"

export class OvlCheckbox extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState
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
    let field = this.field.field
    let val: string | boolean = field.value
    if (val === field.ui.checkedValue) {
      if (typeof val === "string") {
        val = "N"
      } else {
        val = false
      }
    } else {
      if (typeof val === "string") {
        val = field.ui.checkedValue
      } else {
        val = true
      }
    }
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val, id: field.id },
    })
    this.inputElement.dispatchEvent(event)
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

      let res = getUIValidationObject(field)
      let align = ""
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }

      let label = GetLabel(
        field,
        this.field.customHeaderCellClass,
        res,
        "checkbox",
        align,
        this.formState,
        this
      )
      let customValue = GetValueFromCustomFunction(
        this.field.row,
        field,
        this.formState,
        align,
        this.field.isInline,
        this.state
      )
      return html`
        <div
          class="ovl-formcontrol-container ovl-container-checkbox ovl-container__${field.fieldKey} ${customRowClassContainerName}"
        >
          ${label}

          <div class="fd-form-item">
            <input
              title="${ifDefined(
                customRowTooltip ? customRowTooltip : undefined,
                this
              )}"
              @change=${(e) => this.handleChange(e)}
              @focusout=${(e) => this.handleFocusOut(e)}
              style="${align}"
              autocomplete="off"
              class="fd-checkbox ovl-focusable ${res.validationType} ovl-formcontrol-input ovl-value-checkbox-input ovl-value__${field.fieldKey} ${customRowClassName}"
              type="checkbox"
              id="${field.id}"
              ?checked=${field.value === field.ui.checkedValue}
            />
            <label
              class="fd-checkbox__label ovl-formcontrol-checkbox-input ovl-value__${field.fieldKey} "
              for="${field.id}"
            >
            </label>
          </div>
          <span
            class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-textbox-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
              ? ""
              : "hide"}"
          >
            ${customValue}
          </span>

          <span
            class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-checkbox-validation ovl-formcontrol-validation__${field.fieldKey}"
          >
            ${field.validationResult.errors.join(", ")}
          </span>
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)
    this.inputElement.value = this.field.field.value
  }
}
