import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetCustomInfo } from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { OvlFormState } from "../actions"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"
import { getDisplayValue } from "../../Table/helpers"
import { getDateValue } from "../../../global/globals"

export class OvlDate extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState
  displayValue: string
  init() {
    if (this.state.ovl.uiState.isMobile) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
    }
  }
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, this.inputElement.value, this.field.field.id)
  }

  handleKeyUp(e: KeyboardEvent) {
    ChangeValue(this, this.inputElement.value, this.field.field.id, true)
  }

  handleFocusOut() {
    ChangeValue(this, this.inputElement.value, this.field.field.id)
    RemoveFocus(this, this.field.field.id)
  }

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customInfo = GetCustomInfo(this.field.customRowCellClass)
      let type: "date" | "text" = "text"
      if (this.state.ovl.uiState.isMobile) {
        type = "date"
      }

      this.displayValue = getDateValue(field.convertedValue, field.ui.format)
      return html`
        <div
          class="ovl-formcontrol-container ovl-container-date ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <input
            title="${ifDefined(
              customInfo.customRowTooltip
                ? customInfo.customRowTooltip
                : undefined,
              this
            )}"
            @focus=${() => SetFocus(this, field.id)}
            @focusout=${() => this.handleFocusOut()}
            @keyup=${(e) => this.handleKeyUp(e)}
            style="${field.ui && field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            class="fd-input ovl-focusable ${GetOutlineValidationHint(
              field
            )} ovl-formcontrol-input ovl-value-date ovl-value__${field.fieldKey} ${customInfo.customRowClassName} ${field
              .ui.readonly
              ? "ovl-disabled"
              : ""}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
            spellcheck="false"
          />

          <ovl-controlcustomhint .props=${() => this.field}>
          </ovl-controlcustomhint>
          <ovl-controlvalidationhint .props=${() => this.field}>
          </ovl-controlvalidationhint>
        </div>
      `
    })
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.field.value
    }
    // if (this.inputElement && this.field.field.convertedValue) {
    //   if (this.state.ovl.uiState.isMobile) {
    //     this.inputElement.value = this.field.field.convertedValue.substring(
    //       0,
    //       10
    //     )
    //   } else {
    //     this.inputElement.value = this.field.field.value
    //   }
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
