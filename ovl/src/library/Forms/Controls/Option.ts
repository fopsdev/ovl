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
import { ControlState, GetCustomInfo, GetRowFromFormState } from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { OvlFormState } from "../actions"
import { ChangeValue, SetFocus } from "../helper"

export class OvlOption extends OvlBaseElement {
  props: any
  field: ControlState
  formState: OvlFormState

  handleChange(e: Event, value: any, id: string) {
    e.stopPropagation()
    e.preventDefault()
    ChangeValue(this, value, this.field.field.id)
  }
  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let list = field.list
      let listFn = FieldGetList.replace("%", field.fieldKey)
      let listData: FieldGetList_ReturnType = resolvePath(
        this.actions.custom,
        this.formState.namespace
      )[listFn](<FieldGetList_Type>{ row: GetRowFromFormState(this.formState) })
        .data

      let customInfo = GetCustomInfo(this.field.customRowCellClass)
      let inline
      if (field.ui && field.ui.inline) {
        inline = "fd-form-group--inline"
      }

      return html`
        <div
          class="ovl-formcontrol-container ovl-container-option ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>

          <div
            tabindex="0"
            title="${ifDefined(
              customInfo.customRowTooltip
                ? customInfo.customRowTooltip
                : undefined,
              this
            )}"
            class="fd-form-group ${inline} ${customInfo.customRowClassName}"
            id="${field.id}"
          >
            ${Object.keys(listData).map((rowKey) => {
              return html`
                <input
                  class="fd-radio ovl-focusable ovl-formcontrol-input ovl-value-option ovl-value__${field.fieldKey}"
                  @click=${(e) => e.stopPropagation()}
                  @focus=${() => SetFocus(this, field.id)}
                  @change=${(e) =>
                    this.handleChange(
                      e,
                      listData[rowKey][list.valueField],
                      field.id + rowKey
                    )}
                  @focusout=${(e) =>
                    SetFocus(
                      this,

                      field.id + rowKey
                    )}
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
        <ovl-controlcustomhint .props=${() => this.field}>
        </ovl-controlcustomhint>
        <ovl-controlvalidationhint .props=${() => this.field}>
        </ovl-controlvalidationhint>
      `
    })
  }
}
