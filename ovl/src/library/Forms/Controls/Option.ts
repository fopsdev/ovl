import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { ovl } from "../../.."
import { resolvePath } from "../../../global/globals"
import {
  FieldGetList,
  FieldGetList_ReturnType,
  FieldGetList_Type,
} from "../../../global/hooks"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  GetCustomInfo,
  GetRowFromFormState,
  GetOutlineValidationHint,
  GetInputClass,
  GetContainerClass,
} from "./helpers"

import { OvlFormState } from "../actions"
import { ChangeValueEventHelper, SetFocusEventHelper } from "../helper"
import { OvlControlBase } from "./OvlControlBase"

export class OvlOption extends OvlControlBase {
  handleChange(e: Event, value: any, id: string) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValueEventHelper(this, value, this.field.id)
  }
  async getUI() {
    this.InitControl()
    return this.track(() => {
      let field = this.field
      let list = field.list
      let listFn = FieldGetList.replace("%", field.fieldKey)
      let listData: FieldGetList_ReturnType = resolvePath(
        this.actions.custom,
        this.formState.namespace
      )[listFn](<FieldGetList_Type>{ row: GetRowFromFormState(this.formState) })
        .data

      let inline
      if (field.ui.inline) {
        inline = "fd-form-group--inline"
      }

      return html`
        <div
          class="${GetContainerClass(
            "option",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.controlState}>
          </ovl-controllabel>

          <div
            tabindex="${this.nonFocusable() ? "-1" : "0"}"
            class="fd-form-group ${inline} ${this.customInfo
              .customRowClassName}"
            id="${field.id}"
          >
            ${Object.keys(listData).map((rowKey) => {
              return html`
                <input
                  tabindex="${ifDefined(
                    this.nonFocusable() ? "-1" : undefined,
                    this
                  )}"
                  class="fd-radio ${GetInputClass(
                    "option",
                    field,
                    this.customInfo.customRowClassName
                  )}"
                  @click=${(e) => e.stopPropagation()}
                  @focus=${() => SetFocusEventHelper(this, field.id)}
                  @change=${(e) =>
                    this.handleChange(
                      e,
                      listData[rowKey][list.valueField],
                      field.id + rowKey
                    )}
                  @focusout=${(e) =>
                    SetFocusEventHelper(this, field.id + rowKey)}
                  type="radio"
                  class="fd-radio ${GetOutlineValidationHint(field)}"
                  id="${field.id + rowKey}"
                  name="${rowKey}"
                  ?checked=${field.convertedValue ===
                  listData[rowKey][list.valueField]}
                  .checked=${field.convertedValue ===
                  listData[rowKey][list.valueField]}
                />
                <label
                  class="fd-radio__label ovl-formcontrol-optionlabel ovl-formcontrol-optionlabel__${field.fieldKey}"
                  for="${field.id + rowKey}"
                >
                  ${listData[rowKey][list.displayField]}
                </label>
              `
            })}
          </div>
        </div>
        <ovl-controlcustomhint .props=${() => this.controlState}>
        </ovl-controlcustomhint>
        <ovl-controlvalidationhint .props=${() => this.controlState}>
        </ovl-controlvalidationhint>
      `
    })
  }
  afterRender() {
    super.afterRender()
  }
}
