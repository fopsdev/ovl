import { SnackType } from "./Snack/Snack"
import { overmind } from "../../src/index"
import { ResultType } from "./Dialog/Dialog"
import { DialogResult } from "./actions"

export const DialogOkCancel = async (
  text: string,
  defaultButton: ResultType = 1
) => {
  overmind.actions.ovl.dialog.OkCancelDialog({
    text,
    default: defaultButton
  })
  return await DialogResult()
}

export const DialogOk = async (text: string) => {
  this.actions.ovl.dialog.OkDialog({
    text
  })
  return await DialogResult()
}

export const SnackAdd = async (
  text: string,
  type: SnackType = "Success",
  durationMs: number = 4000
) => {
  overmind.actions.ovl.internal.AddSnack({ text, type, durationMs })
}
export const SnackTrackedAdd = async (
  text: string,
  type: SnackType = "Success",
  key: string
) => {
  overmind.actions.ovl.internal.AddSnack({
    text,
    type,
    durationMs: 300000,
    key
  })
}
export const SnackTrackedRemove = async (key: string) => {
  setTimeout(() => overmind.actions.ovl.internal.RemoveSnack(key), 1000)
}
