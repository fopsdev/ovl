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
    default: defaultButton,
  })
  return await DialogResult()
}

export const DialogOk = async (text: string) => {
  overmind.actions.ovl.dialog.OkDialog({
    text,
  })
  return await DialogResult()
}

export const SnackAdd = (
  text: string,
  type: SnackType = "Success",
  durationMs: number = 4000
) => {
  overmind.actions.ovl.internal.AddSnack({ text, type, durationMs })
}
export const SnackTrackedAdd = (
  text: string,
  type: SnackType = "Success",
  key: string
) => {
  overmind.actions.ovl.internal.AddSnack({
    text,
    type,
    durationMs: 999999,
    key,
  })
}
export const SnackTrackedRemove = (key: string) => {
  setTimeout(() => {
    overmind.actions.ovl.internal.RemoveSnack(key)
  }, 2000)
}
