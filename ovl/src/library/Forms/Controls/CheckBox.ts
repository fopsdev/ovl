import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetCustomInfo } from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { OvlFormState } from "../actions"
import { OvlState } from "../../.."
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"

type TextBoxType = "text" | "password" | "text-security"

export class OvlCheckbox extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: OvlFormState
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
    ChangeValue(this, val, field.id)
  }

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customInfo = GetCustomInfo(this.field.customRowCellClass)

      return html`
        <div
          class="ovl-formcontrol-container ovl-container-checkbox ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <div class="fd-form-item">
            <input
              title="${ifDefined(
                customInfo.customRowTooltip
                  ? customInfo.customRowTooltip
                  : undefined,
                this
              )}"
              @change=${(e) => this.handleChange(e)}
              @focusout=${() => RemoveFocus(this, field.id)}
              @focus=${() => SetFocus(this.inputElement, field.id)}
              style="${field.ui && field.ui.align ? field.ui.align : ""}"
              autocomplete="off"
              class="fd-checkbox ovl-focusable ${GetOutlineValidationHint(
                field
              )} ovl-formcontrol-input ovl-value-checkbox-input ovl-value__${field.fieldKey} ${customInfo.customRowClassName}"
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
    this.inputElement.value = this.field.field.value
  }
}
