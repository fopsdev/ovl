import { OpenModalDialogState, ResultType } from "./Dialog"
import { OvlAction, OvlDialog, FormType } from "../../index"
import { FormValidate_Type } from "../../global/hooks"
import { modalDialog } from "../../global/globals"
import { TemplateResult } from "lit-html"

export type OpenDialogOptions = {
  dialogType: OvlDialog
  elementIdToFocusAfterOpen?: string
  elementIdToFocusAfterClose?: string
  formType?: FormType
  formId?: string
}

export const DialogClose: OvlAction<OvlDialog> = async (value, { state }) => {
  state.ovl.dialogs[value].closing = true
}

export const DialogOpen: OvlAction<OpenDialogOptions> = async (
  value,
  { state }
) => {
  let wait = 0
  let dlgState = state.ovl.dialogs[value.dialogType]
  if (dlgState.closing) {
    wait = 400
  }
  setTimeout(() => {
    let elFocusId = value.elementIdToFocusAfterOpen
    if (!elFocusId && value.formType) {
      elFocusId =
        value.formId +
        state.ovl.forms[value.formType][value.formId].lastTouchedField
    }
    dlgState.elementIdToFocusAfterOpen = elFocusId
    dlgState.elementIdToFocusAfterClose = value.elementIdToFocusAfterClose
    dlgState.visible = true
    dlgState.closing = false
  }, wait)
}

export const ModalDialogOpen: OvlAction<OpenModalDialogState> = async (
  value,
  { state, actions }
) => {
  if (!state.ovl.libState.dialog) {
    //@ts-ignore
    state.ovl.libState.dialog = {}
  }
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
  modalDialog.text = value.text
  state.ovl.libState.dialog.result = undefined
  let elementIdToFocusAfterOpen = "ovldialogcancel"
  if (state.ovl.libState.dialog.default == 1) {
    elementIdToFocusAfterOpen = "ovldialogok"
  }
  actions.ovl.dialog.DialogOpen({
    dialogType: "Modal",
    elementIdToFocusAfterOpen,
  })
}

type OkCancelDialog = {
  text: string | TemplateResult
  default: ResultType
}
export const OkCancelDialog: OvlAction<OkCancelDialog> = async (
  value,
  { actions }
) => {
  await actions.ovl.dialog.ModalDialogOpen({
    cancel: "AppCancel",
    ok: "AppOk",
    text: value.text,
    default: value.default,
  })
}

export const OkDialog: OvlAction<{ text: string }> = async (
  value,
  { actions }
) => {
  actions.ovl.dialog.ModalDialogOpen({
    cancel: "NoButton",
    ok: "AppOk",
    text: value.text,
    default: 1,
  })
}
