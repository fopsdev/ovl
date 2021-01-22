import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ControlState, GetCustomInfo } from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { OvlFormState } from "../actions"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"

type TextBoxType = "text" | "password" | "text-security"

export class OvlTextbox extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, this.inputElement.value, this.field.field.id)
  }

  handleKeyUp(e: KeyboardEvent) {
    //if (e.key === "Enter") {
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: {
        val: this.inputElement.value,
        id: this.field.field.id,
        isInnerEvent: true,
      },
    })
    this.inputElement.dispatchEvent(event)
    //}
  }

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customInfo = GetCustomInfo(this.field.customRowCellClass)
      let inputMode: any = "text"
      if (field.type === "decimal") {
        inputMode = "decimal"
      } else if (field.type === "int") {
        inputMode = "numeric"
      }

      let style = ""
      let type: TextBoxType = "text"
      if (field.ui && field.ui.isPassword) {
        type = "password"
      }
      let readOnly = field.ui.readonly
      return html`
        <div
          class="fd-form-item ovl-formcontrol-container ovl-container-textbox ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <input
            title="${ifDefined(
              customInfo.customRowTooltip
                ? customInfo.customRowTooltip
                : undefined,
              this
            )}"
            ?readonly=${readOnly}
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this.inputElement, field.id)}
            @keyup=${(e) => this.handleKeyUp(e)}
            style="${style} ${field.ui && field.ui.align ? field.ui.align : ""}"
            autocomplete="${field.ui.autocomplete
              ? field.ui.autocomplete
              : "on"}"
            spellcheck="${!field.ui.disableSpellcheck ? "true" : "false"}"
            inputmode="${inputMode}"
            class="fd-input ${GetOutlineValidationHint(
              field
            )} ${customInfo.customRowClassName} ovl-focusable ovl-formcontrol-input ovl-value-textbox ovl-value__${field.fieldKey} ${customInfo.customRowClassName}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
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
    this.inputElement = document.getElementById(this.field.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.field.value
    }
  }
  getDisplayValue() {}
}
