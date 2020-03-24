import { Action, AsyncAction } from "overmind"
import { OpenDialogState, ResultType } from "./Dialog"

export let dialogAfterClose = { elementToFocus: undefined }

export const DialogOpen: AsyncAction<OpenDialogState> = async (
  { state },
  value
) => {
  dialogAfterClose.elementToFocus = document.activeElement
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
export const OkCancelDialog: AsyncAction<OkCancelDialog> = async (
  { actions },
  value
) =>
  await actions.ovl.dialog.DialogOpen({
    cancel: "AppCancel",
    ok: "AppOk",
    text: value.text,
    default: value.default
  })

export const OkDialog: AsyncAction<{ text: string }> = async (
  { actions },
  value
) => {
  actions.ovl.dialog.DialogOpen({
    cancel: "NoButton",
    ok: "AppOk",
    text: value.text,
    default: 1
  })
}
