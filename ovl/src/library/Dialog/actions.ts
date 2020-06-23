import { OpenModalDialogState, ResultType } from "./Dialog"
import { Screen, OvlAction, OvlActions } from "../../index"

let currentScreen: Screen = undefined
// export let dialogAfterClose = {
//   elementToFocus: undefined,
//   currentScreen,
// }

export const ModalDialogOpen: OvlAction<OpenModalDialogState> = async (
  value,
  { state, actions }
) => {
  if (!state.ovl.libState.dialog) {
    //@ts-ignore
    state.ovl.libState.dialog = {}
  }
  if (!state.ovl.dialogs.Modal) {
    state.ovl.dialogs.Modal = { visible: false, isClosing: false }
  }
  let wait = 0
  if (state.ovl.dialogs.Modal.isClosing) {
    wait = 400
  }
  setTimeout(() => {
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
      state.ovl.libState.dialog.okText =
        state.ovl.language.translations[value.ok]
      if (!state.ovl.libState.dialog.okText) {
        state.ovl.libState.dialog.okText = "Ok"
      }
    } else {
      state.ovl.libState.dialog.okText = ""
    }
    state.ovl.libState.dialog.text = value.text
    state.ovl.libState.dialog.result = undefined
    let elementIdToFocusAfterOpen = "ovldialogcancel"
    if (state.ovl.libState.dialog.default == 1) {
      elementIdToFocusAfterOpen = "ovldialogok"
    }
    state.ovl.dialogs.Modal.elementIdToFocusAfterOpen = elementIdToFocusAfterOpen
    state.ovl.dialogs.Modal.visible = true
    state.ovl.dialogs.Modal.isClosing = false
  }, wait)
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
