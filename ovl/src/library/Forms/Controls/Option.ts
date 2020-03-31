import { OvlBaseElement } from "../../OvlBaseElement"
import { ColumnAlign } from "../../Table/Table"
import { html } from "lit-html"
import { Field, FormState } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ListState } from "./ListControl"
import { GetRowFromFormState } from "./helpers"
import { overmind } from "../../.."

export type OptionControlState = {
  field: Field
  label: string
  inline: boolean
  align?: ColumnAlign
  list: ListState
  formState: FormState
}

export class OvlOption extends OvlBaseElement {
  props: any
  controlState: OptionControlState

  init() {
    this.controlState = this.props(this.state)
  }

  handleFocusOut(e: Event, id: string) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.controlState.field.id }
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
        id: this.controlState.field.id
      }
    })
    document.getElementById(id).dispatchEvent(event)
  }
  getUI() {
    let field = this.controlState.field
    let list = this.controlState.list
    let listData = list.listFn(
      GetRowFromFormState(this.controlState.formState),
      this.state,
      this.actions,
      overmind.effects
    ).data

    let res = getUIValidationObject(field)
    let label
    if (this.controlState.label) {
      label = html`
        <label
          class="fd-form-label"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${this.controlState.label}</label
        >
      `
    }
    let align = ""
    if (this.controlState.align) {
      align = this.controlState.align
    }

    let inline
    if (this.controlState.inline) {
      inline = "fd-form-group--inline"
    }

    return html`
      ${label}
      <div class="fd-form-group ${inline}">
        ${Object.keys(listData).map(rowKey => {
          return html`
            <div class="fd-form-group__item fd-form-item">
              <input
                @click=${e => e.stopPropagation()}
                @change=${e =>
                  this.handleChange(
                    e,
                    listData[rowKey][list.valueField],
                    field.id + rowKey
                  )}
                @focusout=${e =>
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
              <label class="fd-radio__label" for="${field.id + rowKey}">
                ${listData[rowKey][list.displayField]}
              </label>
            </div>
          `
        })}
      </div>
      <div
        style="margin-top:-20px;margin-bottom: 12px;"
        class="fd-form-message ${res.validationHide}"
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
