import { SnackType } from "./Snack/Snack"
import { ResultType } from "./Dialog/Dialog"
import { DialogResult } from "./actions"
import { ovl } from ".."
import { TemplateResult } from "lit-html"
import { DialogType } from "./Dialog/OvlDialogBase"

export const DialogOkCancel = async (
  text: TemplateResult | string,
  defaultButton: ResultType = 1,
  type?: DialogType,
  customClass?: string
) => {
  ovl.actions.ovl.dialog.OkCancelDialog({
    text,
    default: defaultButton,
    type,
    customClass,
  })
  return await DialogResult()
}

export const DialogOk = async (
  text: TemplateResult | string,

  type?: DialogType,
  customClass?: string
) => {
  ovl.actions.ovl.dialog.OkDialog({
    text,
    type,
    customClass,
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
  key: string
) => {
  ovl.actions.ovl.internal.AddSnack({
    text,
    type,
    durationMs: 999999,
    key,
  })
}
export const SnackTrackedRemove = (key: string) => {
  setTimeout(() => {
    ovl.actions.ovl.internal.RemoveSnack(key)
  }, 2000)
}
