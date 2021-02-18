import { html } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  GetContainerClass,
  GetInputClass,
  GetOutlineValidationHint,
} from "./helpers"

import {
  ChangeValueEventHelper,
  RemoveFocusEventHelper,
  SetFocusEventHelper,
} from "../helper"
import {
  getDateValue,
  isFirefox,
  isMobile,
  isSafari,
} from "../../../global/globals"
import { OvlControlBase } from "./OvlControlBase"
import { SnackAdd } from "../../helpers"

export class OvlDate extends OvlControlBase {
  //displayValue: string
  inputPickerElement: any
  init() {
    if (isMobile()) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
    }

    super.init()
  }

  // handlePickerInput(e: Event) {
  //   console.log(e)
  // }

  // handlePickerChange(e: Event) {
  //   console.log(e)
  //   if (!this.inputPickerElement.value) {
  //     this.inputElement.value = ""
  //   }
  //   e.stopPropagation()
  // }
  handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    //@ts-ignore
    if (e.target.id == "picker" + this.field.id) {
      let pickerVal = this.inputPickerElement.value

      if (pickerVal.length < 10) {
        this.inputElement.value = ""
      } else {
        let dval = new Date(pickerVal)
        this.inputElement.value = getDateValue(dval.toISOString())
      }
    }
    ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
    //@ts-ignore
    if (e.target.id == this.field.id) {
      this.updatePickerElement()
    }
  }

  handleFocusOut() {
    //ChangeValueEventHelper(this, this.inputElement.value, this.field.id)
    RemoveFocusEventHelper(this, this.field.id)
  }
  handlePickerFieldKeyUp(e: KeyboardEvent) {
    if (e.key === "Tab") {
      this.handleChange(e)
      this.inputElement.focus()
    }
  }

  handlePickerFieldFocusOut(e: Event) {
    let pickerVal = this.inputPickerElement.value
    if (pickerVal.length < 10) {
      this.inputElement.value = ""
      this.inputPickerElement.value = ""
    }
  }

  updatePickerElement() {
    let dval = new Date(this.field.convertedValue)
    if (!isNaN(dval.getDate())) {
      this.inputPickerElement.value =
        dval.getFullYear().toString() +
        "-" +
        (dval.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        dval.getDate().toString().padStart(2, "0")
    } else {
      this.inputPickerElement.value = ""
    }
  }
  async getUI() {
    super.InitControl()
    return this.track(() => {
      let field = this.field
      let type: "date" | "text" = "text"
      let browserDatePicker
      let browserDatePickerButton
      let browserDatePickerClass = "ovl-input-date"
      if (isMobile()) {
        type = "date"
      } else if (field.ui.useBrowserDatePicker && !isSafari()) {
        browserDatePickerClass = "ovl-input-datepickertarget"
        browserDatePicker = html`
          <input
            tabindex="-1"
            type="date"
            class="fd-input ovl-input-datepicker"
            @keydown=${(e) => this.handlePickerFieldKeyUp(e)}
            @focusout=${(e) => this.handlePickerFieldFocusOut(e)}
            id="picker${field.id}"
          />
        `
        // console.log(
        //   "is Firefox: " +
        //     isFirefox().toString() +
        //     ", field value: " +
        //     field.value
        // )
        if (isFirefox() && !field.value) {
          browserDatePickerButton = html` <span
            class="sap-icon sap-icon--calendar ovl-input-datepickerffbutton"
          ></span>`
        }
      }

      //this.displayValue = getDateValue(field.convertedValue, field.ui.format)
      return html`
        <div
          class="${GetContainerClass(
            "date",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <div class="ovl-inputcontainer-datebox">
            ${browserDatePicker} ${browserDatePickerButton}
            <input
              tabindex="${ifDefined(
                this.nonFocusable() ? "-1" : undefined,
                this
              )}"
              @focus=${() => SetFocusEventHelper(this, field.id)}
              @focusout=${() => this.handleFocusOut()}
              style="${field.ui.align ? field.ui.align : ""}"
              autocomplete="off"
              class="fd-input ${browserDatePickerClass} ${GetInputClass(
                "date",
                field,
                this.customInfo.customRowClassName
              )}"
              type="${type}"
              id="${field.id}"
              value="${field.value}"
              spellcheck="false"
            />
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
    // place picker under date with picker on the right just visible
    this.inputElement = document.getElementById(this.field.id)
    if (this.inputElement) {
      this.inputElement.value = this.field.value
    }
    if (this.inputPickerElement === undefined) {
      this.inputPickerElement = document.getElementById(
        "picker" + this.field.id
      )
      this.updatePickerElement()
    }
    super.afterRender()
  }
  disconnectedCallback() {
    if (isMobile()) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
