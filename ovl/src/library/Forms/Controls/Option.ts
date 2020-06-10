import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import { customFunctions, overmind } from "../../.."
import { resolvePath } from "../../../global/globals"
import { FieldGetList } from "../../../global/hooks"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  GetLabel,
  GetRowFromFormState,
  GetValueFromCustomFunction,
} from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { FormState } from "../actions"

export class OvlOption extends OvlBaseElement {
  props: any
  field: ControlState
  formState: FormState
  handleFocusOut(e: Event, id: string) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.field.field.id },
    })
    document.getElementById(id).dispatchEvent(event)
  }

  handleChange(e: Event, value: any, id: string) {
    e.stopPropagation()
    e.preventDefault()

    let event = new CustomEvent("ovlchange", {
      bubbles: true,

      detail: {
        //@ts-ignore
        val: value,
        id: this.field.field.id,
      },
    })
    document.getElementById(id).dispatchEvent(event)
  }
  async getUI() {
    this.field = this.props(this.state)
    let field = this.field.field
    this.formState = this.state.ovl.forms[field.formType][field.formId]
    let list = field.list
    let listFn = FieldGetList.replace("%", field.fieldKey)
    let listData = resolvePath(customFunctions, this.formState.namespace)[
      listFn
    ](
      GetRowFromFormState(this.formState),
      this.state,
      this.actions,
      overmind.effects
    ).data

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
    if (field.ui.align) {
      align = field.ui.align
    }

    let label = GetLabel(
      field,
      this.field.customHeaderCellClass,
      res,
      "option",
      align,
      this.formState
    )

    let inline
    if (field.ui && field.ui.inline) {
      inline = "fd-form-group--inline"
    }

    return html`
      <div
        class="ovl-formcontrol-container ovl-container-option ovl-container__${field.fieldKey} ${customRowClassContainerName}"
      >
        ${label}

        <div
          tabindex="0"
          title="${ifDefined(customRowTooltip ? customRowTooltip : undefined)}"
          class="fd-form-group ${inline} ${customRowClassName}"
          id="${this.field.field.id}"
        >
          ${Object.keys(listData).map((rowKey) => {
            return html`
              <input
                class="fd-radio ovl-focusable ovl-formcontrol-input ovl-table-value-option ovl-table-value__${field.fieldKey}"
                @click=${(e) => e.stopPropagation()}
                @change=${(e) =>
                  this.handleChange(
                    e,
                    listData[rowKey][list.valueField],
                    field.id + rowKey
                  )}
                @focusout=${(e) =>
                  this.handleFocusOut(
                    e,

                    field.id + rowKey
                  )}
                type="radio"
                class="fd-radio"
                id="${field.id + rowKey}"
                name="${list.valueField}"
                ?checked=${field.convertedValue ===
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
      <span
        class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-option-custom ovl-formcontrol-custom__${field.fieldKey}"
      >
        ${GetValueFromCustomFunction(
          this.field.row,
          field,
          this.formState,
          align,
          this.field.isInline,
          this.state
        )}
      </span>

      <span
        class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-option-validation ovl-formcontrol-validation__${field.fieldKey}"
      >
        ${field.validationResult.validationMsg}
      </span>
    `
  }
}
// <input
// @change=${e => this.handleChange(e)}
// @focusout=${e => this.handleFocusOut(e)}
// style="${style} ${align}"
// autocomplete="off"
// class="fd-input ${res.validationType}"
// type="${type}"
// id="${field.id}"
// value="${field.value}"
// />
