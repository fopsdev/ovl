import { ovl } from "../.."
import { ControlVisiblity, Field } from "./actions"
import { setFormDirty } from "./validators"

export const IsFieldNothing = (field: Field) => {
  return field.convertedValue === undefined || field.convertedValue === null
}

export const IsFieldEmpty = (field: Field) => {
  return (
    field.convertedValue === undefined ||
    field.convertedValue === null ||
    field.convertedValue === ""
  )
}

export const SetFieldInactive = (field: Field, inactive: boolean) => {
  field.inactive = inactive
}

export const IsFieldInactive = (field: Field) => {
  return field.inactive
}

export const SetFieldDirty = (field: Field, dirty: boolean) => {
  if (field.dirty !== dirty) {
    field.dirty = dirty
    setFormDirty(ovl.state.ovl.forms[field.formType][field.formId])
  }
}

export const SetFieldVisibility = (field: Field, visible: ControlVisiblity) => {
  if (!field._state.closing) {
    field.ui.visible = visible
    field.watched = false
    // get the parent (<ovl-control>)
    let el = document.getElementById("ovl_" + field.id)
    if (!field._state.visible && visible === "fadeIn") {
      if (el) {
        el.classList.remove("fadeOutControl")
        el.classList.remove("ovl-hideControl")
        el.classList.add("fadeInControl")
      } else {
        // we are accessing the el from another screen probably. so el is not defined...no fadeIn required just set to true
        // same bwlow for fadeOzt from another screen...
        field._state.visible = true
      }
    } else if (visible === "true") {
      if (el) {
        el.classList.remove("fadeInControl")
        el.classList.remove("fadeOutControl")
        el.classList.remove("ovl-hideControl")
      }
      field._state.visible = true
    } else if (field._state.visible && visible === "fadeOut") {
      if (el) {
        el.classList.remove("fadeInControl")
        el.classList.add("fadeOutControl")
      } else {
        field._state.visible = false
      }
    } else if (visible === "false") {
      if (el) {
        el.classList.remove("fadeInControl")
        el.classList.remove("fadeOutControl")

        el.classList.add("ovl-hideControl")
      }
      field._state.visible = false
    }
  }
}
export const IsFieldVisible = (field: Field) => {
  return field._state.visible
}

export const IsFieldDirty = (field: Field) => {
  return field.dirty
}

export const GetFieldDisplayValue = (field: Field): string => {
  return field.value
}

export const GetFieldConvertedValue = (field: Field) => {
  return field.convertedValue
}
