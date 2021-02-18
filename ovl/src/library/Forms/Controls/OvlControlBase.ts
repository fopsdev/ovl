import { hasOSReducedMotion } from "../../../global/globals"
import { OvlBaseElement } from "../../../library/OvlBaseElement"
import { ControlVisiblity, Field, OvlFormState } from "../actions"
import { GetCustomInfo } from "./helpers"

export class OvlControlBase extends OvlBaseElement {
  props: any
  field: Field
  inputElement: any
  formState: OvlFormState
  customInfo: {
    customRowClassName: string
    customRowTooltip: string
    customRowClassContainerName: string
  }

  handleAnimationEnd = (e) => {
    if (e.animationName === "fadeOutControl") {
      if (this.field.ui.visible.indexOf("Hide") > -1) {
        this.classList.add("hide")
      }
    }
  }
  init() {
    this.field = this.props(this.state)

    this.formState = this.state.ovl.forms[this.field.formType][
      this.field.formId
    ]
  }
  InitControl() {
    this.customInfo = GetCustomInfo(
      this.formState.viewRowCell,
      this.field.fieldKey
    )

    if (this.customInfo.customRowTooltip) {
      this.setAttribute("title", this.customInfo.customRowTooltip)
    } else {
      this.removeAttribute("title")
    }

    if (this.field.ui.readonly) {
      this.classList.add("ovl-disabled__cursor-not-allowed")
    } else {
      this.classList.remove("ovl-disabled__cursor-not-allowed")
    }

    if (
      this.field.ui.visible === "true" ||
      (this.field.ui.visible === "fadeIn" && hasOSReducedMotion())
    ) {
      this.classList.remove("hide")
    } else if (
      this.field.ui.visible === "false" ||
      (this.field.ui.visible === "fadeOut" && hasOSReducedMotion())
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
    this.setAttribute("title", "")
    this.addEventListener("animationend", this.handleAnimationEnd, true)

    //this.addEventListener("animationstart", this.handleAnimationStart, true)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("animationend", this.handleAnimationEnd, true)
    //this.removeEventListener("animationstart", this.handleAnimationStart, true)
  }
}
export const SetControlVisibility = (
  field: Field,
  visible: ControlVisiblity
) => {
  if (
    (visible === "fadeIn" && field.ui.visible === "true") ||
    (visible.indexOf("fadeOut") > -1 && field.ui.visible === "false")
  ) {
    return
  }
  field.ui.visible = visible
}
export const IsControlVisible = (field: Field, visible: ControlVisiblity) => {
  return field.ui.visible === "fadeIn" || field.ui.visible === "true"
}
