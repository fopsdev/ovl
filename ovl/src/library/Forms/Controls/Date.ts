import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import { ControlState, GetLabel, GetValueFromCustomFunction } from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { FormState } from "../actions"
import { ColumnDisplayDef } from "../../Table/Table"

export class OvlDate extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  formState: FormState
  init() {
    if (this.state.ovl.uiState.isMobile) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
    }
  }

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

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: {
          val: this.inputElement.value,
          id: this.field.field.id,
        },
      })
      this.inputElement.dispatchEvent(event)
    }
  }

  async getUI() {
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let res = getUIValidationObject(field)

      // let columnsDef: ColumnDisplayDef

      // columnsDef = { list: field.list, type: field.type, ui: field.ui }

      let customRowCell = this.field.customRowCellClass
      let customRowClassName = ""
      let customRowTooltip
      let customRowClassContainerName = ""
      if (customRowCell) {
        customRowClassName = customRowCell.className
        customRowClassContainerName = customRowClassName + "Container"
        customRowTooltip = customRowCell.tooltip
      }

      let align = ""
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }

      let label = GetLabel(
        field,
        this.field.customHeaderCellClass,
        res,
        "date",
        align,
        this.formState,
        this
      )
      let type: "date" | "text" = "text"
      if (this.state.ovl.uiState.isMobile) {
        type = "date"
      }
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
          class="ovl-formcontrol-container ovl-container-date ovl-container__${field.fieldKey} ${customRowClassContainerName}"
        >
          ${label}
          <input
            title="${ifDefined(
              customRowTooltip ? customRowTooltip : undefined,
              this
            )}"
            @focusout=${(e) => this.handleFocusOut(e)}
            @keydown=${(e) => this.handleKeyDown(e)}
            style="${align}"
            autocomplete="off"
            class="fd-input ovl-focusable ${res.validationType} fd-has-type-1 ovl-formcontrol-input ovl-table-value-date ovl-table-value__${field.fieldKey} ${customRowClassName}"
            type="${type}"
            id="${field.id}"
          />

          <span
            class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-date-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
              ? ""
              : "hide"}"
          >
            ${customValue}
          </span>

          <span
            class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-date-validation ovl-formcontrol-validation__${field.fieldKey}"
          >
            ${field.validationResult.validationMsg}
          </span>
        </div>
      `
    })
  }
  afterRender() {
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.field.id)
    if (this.inputElement) {
      if (this.state.ovl.uiState.isMobile) {
        this.inputElement.value = this.field.field.convertedValue.substring(
          0,
          10
        )
      } else {
        this.inputElement.value = this.field.field.value
      }
    }
  }
  disconnectedCallback() {
    if (this.state.ovl.uiState.isMobile) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
