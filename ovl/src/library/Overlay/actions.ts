import { overlayToRender, OvlOverlay } from "../../library/Overlay/Overlay"
import { TemplateResult } from "lit-html"
//import { dialogAfterClose } from "../Dialog/actions"
import { OvlAction } from "../.."

export const OpenOverlay: OvlAction<{
  templateResult: TemplateResult
  elementToFocusAfterClose?: Element
}> = async (value, { state }) => {
  if (state.ovl.libState.overlay.open === false) {
    state.ovl.libState.overlay.closing = false
    overlayToRender.overlayDismissedCallback = null
    overlayToRender.overlayClosedCallback = null
    overlayToRender.resolve = null
    overlayToRender.template = null
    overlayToRender.elementToFocusAfterClose = null
    if (value) {
      if (value.templateResult) {
        overlayToRender.template = value.templateResult
      }
      if (value.elementToFocusAfterClose) {
        overlayToRender.elementToFocusAfterClose =
          value.elementToFocusAfterClose
      }
    }

    state.ovl.libState.overlay.open = true
  }
}

export const StartCloseOverlay: OvlAction = async (_, { state }) => {
  if (state.ovl.libState.overlay.open === true) {
    overlayToRender.resolve = null
    if (!state.ovl.uiState.hasOSReducedMotion) {
      state.ovl.libState.overlay.closing = true
    } else {
      state.ovl.libState.overlay.open = false
      state.ovl.libState.overlay.closing = false
    }
  }
}

export const CloseOverlay: OvlAction = async (_, { state }) => {
  state.ovl.libState.overlay.open = false
  state.ovl.libState.overlay.closing = false
  if (overlayToRender.overlayClosedCallback) {
    overlayToRender.overlayClosedCallback()
  }
  if (overlayToRender.elementToFocusAfterClose) {
    // if (state.ovl.libState.dialog && state.ovl.libState.dialog.visible) {
    //   //dialogAfterClose.elementToFocus = overlayToRender.elementToFocusAfterClose
    // } else {
    //   //@ts-ignore
    //   overlayToRender.elementToFocusAfterClose.focus()
    // }
  }
}
