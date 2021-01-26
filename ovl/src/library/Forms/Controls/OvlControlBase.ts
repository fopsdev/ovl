import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { Field, OvlFormState } from "../actions"
import { ControlState, GetCustomInfo } from "./helpers"

export class OvlControlBase extends OvlBaseElement {
  props: any
  controlState: ControlState
  field: Field
  inputElement: any
  formState: OvlFormState
  customInfo: {
    customRowClassName: string
    customRowTooltip: string
    customRowClassContainerName: string
  }

  handleAnimationEnd = (e) => {
    if (
      this.field.ui.visible.indexOf("Hide") > -1 &&
      e.animationName === "fadeOutControl"
    ) {
      this.classList.add("hide")
    }
  }

  InitControl() {
    this.controlState = this.props(this.state)
    this.customInfo = GetCustomInfo(this.controlState.customRowCellClass)
    this.field = this.controlState.field
    this.formState = this.state.ovl.forms[this.field.formType][
      this.field.formId
    ]

    if (this.field.ui.readonly) {
      this.classList.add("ovl-disabled__cursor-not-allowed")
    } else {
      this.classList.remove("ovl-disabled__cursor-not-allowed")
    }

    if (
      this.field.ui.visible === "true" ||
      (this.field.ui.visible === "fadeIn" &&
        this.state.ovl.uiState.hasOSReducedMotion)
    ) {
      this.classList.remove("hide")
    } else if (
      this.field.ui.visible === "false" ||
      (this.field.ui.visible === "fadeOut" &&
        this.state.ovl.uiState.hasOSReducedMotion)
    ) {
      this.classList.add("hide")
    } else if (this.field.ui.visible === "fadeIn") {
      this.classList.add("fadeInControl")
      this.classList.remove("fadeOutControl")

      this.classList.remove("hide")
    } else if (
      this.field.ui.visible === "fadeOut" ||
      this.field.ui.visible === "fadeOutHide"
    ) {
      this.classList.add("fadeOutControl")
      this.classList.remove("fadeInControl")
    }
  }

  // this is needed because other methods still allow to tab into the control
  nonFocusable() {
    return (
      this.field.ui.readonly ||
      this.field.ui.visible === "false" ||
      this.field.ui.visible.indexOf("fadeOut") > -1
    )
  }
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("animationend", this.handleAnimationEnd, true)
    //this.addEventListener("animationstart", this.handleAnimationStart, true)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("animationend", this.handleAnimationEnd, true)
    //this.removeEventListener("animationstart", this.handleAnimationStart, true)
  }

  afterRender() {
    // title="${ifDefined(
    //     this.customInfo.customRowTooltip
    //       ? this.customInfo.customRowTooltip
    //       : undefined,
    //     this
    //   )}"

    if (this.customInfo.customRowTooltip) {
      this.setAttribute("title", this.customInfo.customRowTooltip)
    } else {
      this.removeAttribute("title")
    }
  }
}
