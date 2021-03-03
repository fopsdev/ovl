import { SnackType } from "./Snack/Snack"
import { ResultType } from "./Dialog/Dialog"
import { DialogResult } from "./actions"
import { ovl } from ".."
import { TemplateResult } from "lit-html"
import { DialogType } from "./Dialog/OvlDialogBase"
import { uuidv4 } from "../global/globals"

type DialogOkCancelHelper = {
  text: TemplateResult | string
  defaultButton?: ResultType
  type?: DialogType
  customClass?: string
  okText?: string
  cancelText?: string
}

export const DialogOkCancel = async (options: DialogOkCancelHelper) => {
  ovl.actions.ovl.dialog.OkCancelDialog({
    text: options.text,
    default: options.defaultButton || 1,
    type: options.type || "confirmation",
    customClass: options.customClass,
    okText: options.okText,
    cancelText: options.cancelText,
  })
  return await DialogResult()
}

type DialogOkHelper = {
  text: TemplateResult | string
  type?: DialogType
  customClass?: string
  okText?: string
}

export const DialogOk = async (options: DialogOkHelper) => {
  ovl.actions.ovl.dialog.OkDialog({
    text: options.text,
    type: options.type || "information",
    customClass: options.customClass,
    okText: options.okText,
  })
  return await DialogResult()
}

export const SnackAdd = (
  text: string,
  type: SnackType = "Success",
  durationMs: number = 4000
) => {
  ovl.actions.ovl.internal.AddSnack({ text, type, durationMs })
}
export const SnackTrackedAdd = (
  text: string,
  type: SnackType = "Success",
  key?: string
) => {
  if (!key) {
    key = uuidv4()
  }
  ovl.actions.ovl.internal.AddSnack({
    text,
    type,
    durationMs: 999999,
    key,
  })
  return key
}
export const SnackTrackedRemove = (key: string) => {
  setTimeout(() => {
    ovl.actions.ovl.internal.RemoveSnack(key)
  }, 2000)
}
