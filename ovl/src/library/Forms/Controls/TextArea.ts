import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { html } from "lit-html"
import { OvlFormState } from "../actions"

import {
  ControlState,
  GetCustomInfo,
  GetOutlineValidationHint,
} from "./helpers"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"

export class OvlTextArea extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState

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

      return html`
        <div
          class="ovl-formcontrol-container ovl-container-textarea ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <textarea
            title="${ifDefined(
              customInfo.customRowTooltip
                ? customInfo.customRowTooltip
                : undefined,
              this
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${() => RemoveFocus(this, field.id)}
            @focus=${() => SetFocus(this, field.id)}
            class="fd-textarea ovl-focusable ${GetOutlineValidationHint(
              field
            )} ovl-formcontrol-input  ovl-value-textarea ovl-value__${field.fieldKey} ${customInfo.customRowClassName} ${field
              .ui.readonly
              ? "ovl-disabled"
              : ""}"
            id="${field.id}"
            spellcheck="${field.ui.useSpellcheck ? "true" : "false"}"
          >
${field.value}</textarea
          >
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
}
