import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  GetContainerClass,
  GetCustomInfo,
  GetInputClass,
  GetOutlineValidationHint,
} from "./helpers"
import { OvlFormState } from "../actions"
import { OvlState } from "../../.."
import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import { OvlControlBase } from "./OvlControlBase"

type TextBoxType = "text" | "password" | "text-security"

export class OvlCheckbox extends OvlControlBase {
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let field = this.field
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
    ChangeValueEventHelper(this, val, field.id)
  }

  async getUI() {
    this.InitControl()
    return this.track(() => {
      let field = this.field
      return html`
        <div
          class="${GetContainerClass(
            "checkbox",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>
          <div class="fd-form-item">
            <input
              tabindex="${ifDefined(
                this.nonFocusable() ? "-1" : undefined,
                this
              )}"
              @change=${(e) => this.handleChange(e)}
              @focusout=${() => RemoveFocusEventHelper(this, field.id)}
              @focus=${() => SetFocusEventHelper(this.inputElement, field.id)}
              style="${field.ui.align ? field.ui.align : ""}"
              autocomplete="off"
              class="fd-checkbox ${GetInputClass(
                "checkbox",
                field,
                this.customInfo.customRowClassName
              )}"
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
          <ovl-controlcustomhint .props=${() => this.controlState}>
          </ovl-controlcustomhint>
          <ovl-controlvalidationhint .props=${() => this.controlState}>
          </ovl-controlvalidationhint>
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)
    this.inputElement.value = this.field.value
    super.afterRender()
  }
}
