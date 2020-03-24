import { Action, AsyncAction } from "overmind"
import { ResultType } from "./Dialog/Dialog"
import {
  TableRefresh,
  TableSelectRow,
  TableClearFilter,
  TableSelectHeader,
  TableSort,
  TableFilter,
  TableFilterSelected,
  TableSetPage,
  TableCopyRow,
  TableEditRow,
  TableDeleteRow,
  TableSelectAll,
  TableEditSaveRow,
  TableDirectSaveRow,
  TableEditClose,
  TableAddRow,
  TableMoreRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableViewRefresh,
  TableSelectCustomSort,
  TableRefreshDataFromServer,
  TableSelectCustomFilter,
  TableSelectColumnFilter
} from "./Table/actions"
import { dialogAfterClose } from "./Dialog/actions"
export {
  TableRefresh,
  TableSelectRow,
  TableClearFilter,
  TableSelectHeader,
  TableSort,
  TableFilter,
  TableFilterSelected,
  TableSetPage,
  TableCopyRow,
  TableDeleteRow,
  TableEditRow,
  TableSelectAll,
  TableEditSaveRow,
  TableDirectSaveRow,
  TableEditClose,
  TableMoreRow,
  TableAddRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableViewRefresh,
  TableRefreshDataFromServer,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter
}

export type DialogChangedParam = {
  dialogState: DialogState
  result: ResultType
}

export type DialogState = {
  text: string
  okText: string
  cancelText: string
  visible: boolean
  closing: boolean
  result: ResultType
  default: ResultType
}

export const DialogChanged: Action<DialogChangedParam> = (
  { state, actions },
  value
) => {
  value.dialogState.result = value.result
  if (!state.ovl.uiState.hasOSReducedMotion) {
    state.ovl.libState.dialog.closing = true
  } else {
    actions.ovl.internal.DialogClosed()
  }
  if (dialogResolver) {
    dialogResolver(value.result)
  }
}

export const DialogDefaultChanged: Action<{ default: ResultType }> = (
  { state },
  value
) => {
  state.ovl.libState.dialog.default = value.default
}

export const DialogClosed: AsyncAction = async ({ state }) => {
  state.ovl.libState.dialog.closing = false
  state.ovl.libState.dialog.visible = false
  state.ovl.libState.dialog.cancelText = "rerender force workaround"

  if (dialogAfterClose.elementToFocus) {
    //@ts-ignore
    dialogAfterClose.elementToFocus.focus()
    dialogAfterClose.elementToFocus = undefined
  }
}

let dialogResolver: (value?: any) => void
export const DialogResult = () => {
  return new Promise((resolve, reject) => {
    dialogResolver = resolve
  })
}

export const SetIndicatorOpen: Action = ({ state }) => {
  state.ovl.libState.indicator.refCounter++
  state.ovl.libState.indicator.open = true
}

export const SetIndicatorClose: Action = ({ state }) => {
  state.ovl.libState.indicator.refCounter--
  if (state.ovl.libState.indicator.refCounter < 1) {
    state.ovl.libState.indicator.open = false
  }
}
