import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetCustomInfo } from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { OvlFormState } from "../actions"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"

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

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, this.inputElement.value, this.field.field.id)
  }
  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customInfo = GetCustomInfo(this.field.customRowCellClass)
      let style = ""
      type TimeBoxType = "text" | "time"
      let type: TimeBoxType = "text"
      if (this.state.ovl.uiState.isMobile) {
        type = "time"
      }
      return html`
        <div
          class="ovl-formcontrol-container ovl-container-time ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>

          <input
            title="${ifDefined(
              customInfo.customRowTooltip
                ? customInfo.customRowTooltip
                : undefined,
              this
            )}"
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this, field.id)}
            style="${style} ${field.ui && field.ui.align ? field.ui.align : ""}"
            autocomplete="off"
            class="fd-input ovl-focusable ${GetOutlineValidationHint(
              field
            )}  ovl-formcontrol-input ovl-value-time ovl-value__${field.fieldKey} ${customInfo.customRowClassName}"
            type="${type}"
            id="${field.id}"
            value="${field.value}"
          />
        </div>
        <ovl-controlcustomhint .props=${() => this.field}>
        </ovl-controlcustomhint>
        <ovl-controlvalidationhint .props=${() => this.field}>
        </ovl-controlvalidationhint>
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
