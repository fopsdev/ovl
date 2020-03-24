import { Action, AsyncAction } from "overmind"
import { overlay2ToRender, OvlOverlay2 } from "../Overlay2/Overlay2"
import { TemplateResult } from "lit-html"

export const OpenOverlay2: AsyncAction<{
  templateResult: TemplateResult
  elementToFocusAfterClose?: Element
}> = async ({ state }, value) => {
  if (state.ovl.libState.overlay2.open === false) {
    state.ovl.libState.overlay2.closing = false
    overlay2ToRender.overlayDismissedCallback = null
    overlay2ToRender.overlayClosedCallback = null
    overlay2ToRender.resolve = null
    overlay2ToRender.template = null
    overlay2ToRender.elementToFocusAfterClose = null

    if (value) {
      if (value.templateResult) {
        overlay2ToRender.template = value.templateResult
      }
      if (value.elementToFocusAfterClose) {
        overlay2ToRender.elementToFocusAfterClose =
          value.elementToFocusAfterClose
      }
    }
    state.ovl.libState.overlay2.open = true
  }
}

export const StartCloseOverlay2: AsyncAction = async ({ state }, _) => {
  if (state.ovl.libState.overlay2.open === true) {
    overlay2ToRender.resolve = null
    if (!state.ovl.uiState.hasOSReducedMotion) {
      state.ovl.libState.overlay2.closing = true
    } else {
      state.ovl.libState.overlay2.open = false
      state.ovl.libState.overlay2.closing = false
    }
  }
}

export const CloseOverlay2: AsyncAction = async ({ state }, _) => {
  state.ovl.libState.overlay2.open = false
  state.ovl.libState.overlay2.closing = false
  if (overlay2ToRender.overlayClosedCallback) {
    overlay2ToRender.overlayClosedCallback()
  }
  if (overlay2ToRender.elementToFocusAfterClose) {
    //@ts-ignore
    overlay2ToRender.elementToFocusAfterClose.focus()
  }
}
