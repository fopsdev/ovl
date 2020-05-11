import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field, FormState } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ListState } from "./ListControl"
import { GetRowFromFormState, GetLabel, ControlState } from "./helpers"
import { overmind, customFunctions } from "../../.."
import { resolvePath } from "../../../global/globals"
import { FieldGetList } from "../../../global/hooks"
import { ifDefined } from "lit-html/directives/if-defined"

export class OvlOption extends OvlBaseElement {
  props: any
  field: ControlState
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
  getUI() {
    this.field = this.props(this.state)
    let field = this.field.field
    let formState = this.state.ovl.forms[field.formType][field.formId]
    let list = field.list
    let listFn = FieldGetList.replace("%", field.fieldKey)
    let listData = resolvePath(customFunctions, formState.namespace)[listFn](
      GetRowFromFormState(formState),
      this.state,
      this.actions,
      overmind.effects
    ).data

    let customRowCell = this.field.customRowCellClass
    let customRowClassName = ""
    let customRowTooltip
    if (customRowCell) {
      customRowClassName = customRowCell.className
      customRowTooltip = customRowCell.tooltip
    }

    let res = getUIValidationObject(field)
    let align = ""
    if (field.ui.align) {
      align = field.ui.align
    }

    let label = GetLabel(field, this.field.customHeaderCellClass, res, align)

    let inline
    if (field.ui && field.ui.inline) {
      inline = "fd-form-group--inline"
    }

    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-option-container ovl-formcontrol-container__${field.fieldKey}"
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
                class="fd-radio ovl-formcontrol-input ovl-formcontrol-option-input ovl-formcontrol-input__${field.fieldKey}"
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
      <div
        style="margin-top:-20px;margin-bottom: 12px;"
        class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-option-validation ovl-formcontrol-validation__${field.fieldKey}"
      >
        ${field.validationResult.validationMsg}
      </div>
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
