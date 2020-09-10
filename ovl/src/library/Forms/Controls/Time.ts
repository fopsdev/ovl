import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetLabel, GetValueFromCustomFunction } from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { OvlFormState } from "../actions"

export class OvlTime extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState
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
      let style = ""
      let align = ""
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }
      let label = GetLabel(
        field,
        this.field.customHeaderCellClass,
        res,
        "time",
        align,
        this.formState,
        this
      )

      type TimeBoxType = "text" | "time"
      let type: TimeBoxType = "text"
      if (this.state.ovl.uiState.isMobile) {
        type = "time"
      }
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
          class="ovl-formcontrol-container ovl-container-time ovl-container__${field.fieldKey} ${customRowClassContainerName}"
        >
          ${label}
          <input
            title="${ifDefined(
              customRowTooltip ? customRowTooltip : undefined,
              this
            )}"
            @focusout=${(e) => this.handleFocusOut(e)}
            style="${style} ${align}"
            autocomplete="off"
            class="fd-input ovl-focusable ${res.validationType}  ovl-formcontrol-input ovl-value-time ovl-value__${field.fieldKey} ${customRowClassName}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
          />
        </div>
        <span
          class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-time-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
            ? ""
            : "hide"}"
        >
          ${customValue}
        </span>

        <span
          class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-time-validation ovl-formcontrol-time__${field.fieldKey}"
        >
          ${field.validationResult.validationMsg}
        </span>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)
    if (this.inputElement) {
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
