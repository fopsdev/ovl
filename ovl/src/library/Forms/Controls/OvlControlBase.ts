import { Field_objectBuildingType_GetList } from "../../../../../../app/src/screens/NewServiceStep2/formActions"
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
      this.classList.add("ovl-hideControl")
      this.field._state.closing = false
      this.field._state.visible = false
    }
    if (e.animationName === "fadeInControl") {
      this.field._state.closing = false
      this.field._state.visible = true
    }
  }
  init() {
    this.field = this.props(this.state)

    this.formState = this.state.ovl.forms[this.field.formType][
      this.field.formId
    ]

    // if (this.field.fieldKey === "objectLocationConfirmed") {
    //   debugger
    //   console.log("init field confirmation " + this.field.ui.visible)
    // }
    // SetControlVisibility(this.field, this.field.ui.visible)
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
    if (!this.field._state.visible && this.field.ui.visible !== "fadeIn") {
      this.classList.add("ovl-hideControl")
    }
    this.id = "ovl_" + this.field.id
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
