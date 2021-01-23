import { OpenModalDialogState, ResultType } from "./Dialog"
import { OvlDialog, OvlForm, OvlConfig } from "../../index"
import {
  modalDialog,
  disableBodyScroll,
  T,
  enableBodyScroll,
} from "../../global/globals"
import { TemplateResult } from "lit-html"
import { DialogType } from "./OvlDialogBase"

import { OvlAction } from "../../index"

export type OpenDialogOptions = {
  dialogType: OvlDialog
  elementIdToFocusAfterOpen?: string
  elementIdToFocusAfterClose?: string
  formType?: OvlForm
  formId?: string
}

export const DialogClose: OvlAction<OvlDialog> = async (value, { state }) => {
  state.ovl.dialogs[value].closing = true

  enableBodyScroll(state)
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
        state.ovl.forms[value.formType][value.formId].fieldToFocus
    }
    dlgState.elementIdToFocusAfterOpen = elFocusId
    dlgState.elementIdToFocusAfterClose = value.elementIdToFocusAfterClose
    dlgState.visible = true
    disableBodyScroll(state)
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
  state.ovl.libState.dialog.type = value.type
  state.ovl.libState.dialog.customClass = value.customClass
  state.ovl.libState.dialog.title = value.title
  state.ovl.libState.dialog.default = value.default
  if (value.cancel !== "NoButton") {
    state.ovl.libState.dialog.cancelText =
      state.ovl.language.translations[value.cancel]
    if (!state.ovl.libState.dialog.cancelText) {
      state.ovl.libState.dialog.cancelText = value.cancel
    }
  } else {
    state.ovl.libState.dialog.cancelText = ""
  }
  if (value.ok !== "NoButton") {
    state.ovl.libState.dialog.okText = state.ovl.language.translations[value.ok]
    if (!state.ovl.libState.dialog.okText) {
      state.ovl.libState.dialog.okText = value.ok
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
  type?: DialogType
  customClass?: string
  title?: string
  okText?: string
  cancelText?: string
}
type OkDialog = {
  text: string | TemplateResult
  type?: DialogType
  customClass?: string
  title?: string
  okText?: string
}
export const OkCancelDialog: OvlAction<OkCancelDialog> = async (
  value,
  { actions, state }
) => {
  let type: DialogType = "standard"
  if (value.type) {
    type = value.type
  }
  let title = T("AppTitle")

  if (OvlConfig.defaultDialogTitle) {
    title = T(OvlConfig.defaultDialogTitle)
  }
  if (value.title) {
    title = value.title
  }
  let customClass = ""
  if (value.customClass) {
    customClass = value.customClass
  }
  await actions.ovl.dialog.ModalDialogOpen({
    title,
    customClass,
    type,
    cancel: value.cancelText || "AppCancel",
    ok: value.okText || "AppOk",
    text: value.text,
    default: value.default,
  })
}

export const OkDialog: OvlAction<OkDialog> = async (value, { actions }) => {
  let type: DialogType = "standard"
  if (value.type) {
    type = value.type
  }
  let customClass = ""
  if (value.customClass) {
    customClass = value.customClass
  }

  let title = T("AppTitle")
  if (OvlConfig.defaultDialogTitle) {
    title = T(OvlConfig.defaultDialogTitle)
  }
  if (value.title) {
    title = value.title
  }

  await actions.ovl.dialog.ModalDialogOpen({
    title,
    customClass,
    type,
    cancel: "NoButton",
    ok: "AppOk",
    text: value.text,
    default: 1,
  })
}
