import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field, FormState } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ListState } from "./ListControl"
import { GetRowFromFormState, GetLabel } from "./helpers"
import { overmind, customFunctions } from "../../.."
import { resolvePath } from "../../../global/globals"
import { FieldGetList } from "../../../global/hooks"

export class OvlOption extends OvlBaseElement {
  props: any
  field: Field

  init() {
    this.field = this.props(this.state)
  }

  handleFocusOut(e: Event, id: string) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.field.id },
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
        id: this.field.id,
      },
    })
    document.getElementById(id).dispatchEvent(event)
  }
  getUI() {
    let field = this.field
    let formState = this.state.ovl.forms[field.formType][field.formId]
    let list = this.field.list
    let listFn = FieldGetList.replace("%", field.fieldKey)
    let listData = resolvePath(customFunctions, formState.namespace)[listFn](
      GetRowFromFormState(formState),
      this.state,
      this.actions,
      overmind.effects
    ).data

    let res = getUIValidationObject(field)
    let label
    let labelText = GetLabel(field)
    if (labelText) {
      label = html`
        <label
          class="fd-form-label fd-has-type-1 ovl-formcontrol-label ovl-formcontrol-option-label ovl-formcontrol-label__${field.fieldKey}"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${labelText}</label
        >
      `
    }
    let align = ""
    if (field.ui.align) {
      align = field.ui.align
    }

    let inline
    if (field.ui && field.ui.inline) {
      inline = "fd-form-group--inline"
    }

    return html`
      <div
        class="ovl-formcontrol-container ovl-formcontrol-option-container ovl-formcontrol-container__${field.fieldKey}"
      >
        ${label}

        <div class="fd-form-group ${inline}">
          ${Object.keys(listData).map((rowKey) => {
            return html`
              <div
                class="fd-form-group__item fd-form-item"
                id="${this.field.id}"
                tabindex="0"
              >
                <input
                  class="ovl-formcontrol-input ovl-formcontrol-option-input ovl-formcontrol-input__${field.fieldKey}"
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
              </div>
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
