import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { html } from "lit-html"
import { Field, FormState } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ColumnAlign } from "../../Table/Table"
import { GetLabel, ControlState, GetValueFromCustomFunction } from "./helpers"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"

export class OvlTextArea extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: FormState

  // handleKeyUp(e: KeyboardEvent) {
  //   //if (e.key === "Enter") {
  //   let event = new CustomEvent("ovlchange", {
  //     bubbles: true,
  //     detail: {
  //       val: this.inputElement.value,
  //       id: this.field.field.id,
  //     },
  //   })
  //   this.inputElement.dispatchEvent(event)
  //   //}
  // }

  handleFocusOut(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlfocusout", {
      bubbles: true,
      detail: { id: this.field.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let event = new CustomEvent("ovlchange", {
      bubbles: true,
      detail: { val: this.inputElement.value, id: this.field.field.id },
    })
    this.inputElement.dispatchEvent(event)
  }

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]

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
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }
      let label = GetLabel(
        field,
        this.field.customHeaderCellClass,
        res,
        "textarea",
        align,
        this.formState,
        this
      )

      let customValue = GetValueFromCustomFunction(
        this.field.row,
        field,
        this.formState,
        align,
        this.field.isInline,
        this.state
      )

      return html`
        <div
          class="ovl-formcontrol-container ovl-container-textarea ovl-container__${field.fieldKey} ${customRowClassContainerName}"
        >
          ${label}
          <textarea
            title="${ifDefined(
              customRowTooltip ? customRowTooltip : undefined,
              this
            )}"
            @change=${(e) => this.handleChange(e)}
            @focusout=${(e) => this.handleFocusOut(e)}
            class="fd-textarea ovl-focusable ${res.validationType} ovl-formcontrol-input  ovl-value-textarea ovl-value__${field.fieldKey} ${customRowClassName}"
            id="${field.id}"
          >
${field.value}</textarea
          >
        </div>
        <span
          class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-textarea-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
            ? ""
            : "hide"}"
        >
          ${customValue}
        </span>

        <span
          class="fd-form-message fd-form-message--warning ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-textarea-validation ovl-formcontrol-validation__${field.fieldKey}"
        >
          ${field.validationResult.validationMsg}
        </span>
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
