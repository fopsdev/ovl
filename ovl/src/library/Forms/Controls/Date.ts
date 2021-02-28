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
  getDateISOString,
  getDateValue,
  isFirefox,
  isMobile,
  isSafari,
} from "../../../global/globals"
import { OvlControlBase } from "./OvlControlBase"
import { SnackAdd } from "../../helpers"
import { SetFieldDirty } from "../validators"

export class OvlDate extends OvlControlBase {
  //displayValue: string
  valueChangedCheck: any
  inputPickerElement: any
  init() {
    if (isMobile()) {
      this.addEventListener("input", (e) => this.handleChange(e, true))
    } else {
      this.addEventListener("change", (e) => this.handleChange(e, false))
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
  handleChange(e: Event, isMobile: boolean) {
    e.stopPropagation()
    e.preventDefault()

    let isInnerEvent = true
    //@ts-ignore
    if (e.target.id == "picker" + this.field.id) {
      let pickerVal = this.inputPickerElement.value

      if (pickerVal.length < 10) {
        this.inputElement.value = ""
        isInnerEvent = false
        SetFieldDirty(this.field, true)
      } else {
        let dval = new Date(pickerVal)
        this.inputElement.value = getDateValue(getDateISOString(dval))
      }
    } else if (isMobile) {
      isInnerEvent = false
      SetFieldDirty(this.field, true)
    }
    ChangeValueEventHelper(
      this,
      this.inputElement.value,
      this.field.id,
      isInnerEvent
    )
    //@ts-ignore
    if (e.target.id === this.field.id) {
      this.updatePickerElement()
    }
  }

  handleFocus() {
    this.valueChangedCheck = this.field.value
    SetFocusEventHelper(this, this.field.id)
  }

  handleFocusOut() {
    if (this.valueChangedCheck !== this.field.value) {
      ChangeValueEventHelper(this, this.field.value, this.field.id, false)
    }
    this.updatePickerElement()
    RemoveFocusEventHelper(this, this.field.id)
  }
  handlePickerFieldKeyUp(e: KeyboardEvent) {
    if (e.key === "Tab") {
      this.handleChange(e, false)
      document.getElementById("focusafter" + this.field.id).focus()
    }
  }

  handlePickerFieldFocusOut(e: Event) {
    let pickerVal = this.inputPickerElement.value
    if (pickerVal.length < 10) {
      this.inputElement.value = ""
      this.inputPickerElement.value = ""
    }
    ChangeValueEventHelper(this, this.field.value, this.field.id, false)
  }

  updatePickerElement() {
    if (this.inputPickerElement) {
      let dval = new Date(this.field.convertedValue)
      if (!isNaN(dval.getDate())) {
        this.inputPickerElement.value = getDateISOString(dval).replace(
          "T00:00:00",
          ""
        )
      } else {
        this.inputPickerElement.value = ""
      }
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
        if (isFirefox() && !field.value) {
          browserDatePickerButton = html` <span
            class="sap-icon sap-icon--calendar ovl-input-datepickerffbutton"
          ></span>`
        }
      }

      //this.displayValue = getDateValue(field.convertedValue, field.ui.format)
      let fieldValue = field.value
      if (type === "date") {
        let dval = new Date(field.convertedValue)
        fieldValue = getDateISOString(dval).replace("T00:00:00", "")
      }
      return html`
        <div
          class="${GetContainerClass(
            "date",
            field.fieldKey,
            this.customInfo.customRowClassContainerName
          )}"
        >
          <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
          <div
            class="ovl-inputcontainer-datebox  fd-input-group ${GetOutlineValidationHint(
              field
            )}"
          >
            <input
              tabindex="${ifDefined(
                this.nonFocusable() ? "-1" : undefined,
                this
              )}"
              @input=${(e) => {
                SetFieldDirty(this.field, true)
              }}
              @focus=${() => this.handleFocus()}
              @focusout=${() => this.handleFocusOut()}
              style="${field.ui.align ? field.ui.align : ""}"
              autocomplete="off"
              class="fd-input ${browserDatePickerClass} ${GetInputClass(
                "date",
                field,
                this.customInfo.customRowClassName,
                true
              )}"
              type="${type}"
              id="${field.id}"
              value="${fieldValue}"
              spellcheck="false"
            />

            ${browserDatePicker} ${browserDatePickerButton}
          </div>
          <div id="focusafter${field.id}" tabindex="-1"></div>
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
    if (
      this.inputElement &&
      (this.inputElement.type !== "date" || isMobile())
    ) {
      if (isMobile()) {
        this.inputElement.value = getDateISOString(
          new Date(this.field.convertedValue)
        ).replace("T00:00:00", "")
      } else {
        this.inputElement.value = this.field.value
      }
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
      this.removeEventListener("input", (e) => this.handleChange(e, true))
    } else {
      this.removeEventListener("change", (e) => this.handleChange(e, false))
    }
    super.disconnectedCallback()
  }
}
