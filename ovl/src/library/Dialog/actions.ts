import { OpenDialogState, ResultType } from "./Dialog"
import { Screen, OvlAction, OvlActions } from "../../index"

let currentScreen: Screen = undefined
export let dialogAfterClose = {
  elementToFocus: undefined,
  currentScreen,
}

export const DialogOpen: OvlAction<OpenDialogState> = async (
  value,
  { state, actions }
) => {
  if (!state.ovl.libState.dialog) {
    //@ts-ignore
    state.ovl.libState.dialog = {}
  }
  if (state.ovl.libState.dialog.closing) {
    await actions.ovl.internal.DialogClosed()
  }
  dialogAfterClose.elementToFocus = document.activeElement
  dialogAfterClose.currentScreen = state.ovl.screens.nav.currentScreen
  state.ovl.libState.dialog.default = value.default
  if (value.cancel !== "NoButton") {
    state.ovl.libState.dialog.cancelText =
      state.ovl.language.translations[value.cancel]
    if (!state.ovl.libState.dialog.cancelText) {
      state.ovl.libState.dialog.cancelText = "Cancel"
    }
  } else {
    state.ovl.libState.dialog.cancelText = ""
  }
  if (value.ok !== "NoButton") {
    state.ovl.libState.dialog.okText = state.ovl.language.translations[value.ok]
    if (!state.ovl.libState.dialog.okText) {
      state.ovl.libState.dialog.okText = "Ok"
    }
  } else {
    state.ovl.libState.dialog.okText = ""
  }
  state.ovl.libState.dialog.text = value.text
  state.ovl.libState.dialog.result = undefined
  state.ovl.libState.dialog.visible = true
  state.ovl.libState.dialog.closing = false
}

type OkCancelDialog = {
  text: string
  default: ResultType
}
export const OkCancelDialog: OvlAction<OkCancelDialog> = async (
  value,
  { actions }
) =>
  await actions.ovl.dialog.DialogOpen({
    cancel: "AppCancel",
    ok: "AppOk",
    text: value.text,
    default: value.default,
  })

export const OkDialog: OvlAction<{ text: string }> = async (
  value,
  { actions }
) => {
  actions.ovl.dialog.DialogOpen({
    cancel: "NoButton",
    ok: "AppOk",
    text: value.text,
    default: 1,
  })
}
