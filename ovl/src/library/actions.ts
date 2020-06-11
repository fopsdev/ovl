import { Action, OvlAction } from "overmind"
import { ResultType, DialogState } from "./Dialog/Dialog"
import {
  TableSetViewTab,
  TableRefresh,
  TableRebuild,
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
  TableViewRow,
  TableCloseViewRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableMultipleCustomFunction,
  TableViewRefresh,
  TableSelectCustomSort,
  TableRefreshDataFromServer,
  TableSelectCustomFilter,
  TableSelectColumnFilter,
} from "./Table/actions"
import { dialogAfterClose } from "./Dialog/actions"
export {
  TableSetViewTab,
  TableRefresh,
  TableRebuild,
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
  TableViewRow,
  TableCloseViewRow,
  TableAddRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleCustomFunction,
  TableMultipleEditRow,
  TableViewRefresh,
  TableRefreshDataFromServer,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter,
}

export type DialogChangedParam = {
  dialogState: DialogState
  result: ResultType
}

export const DialogChanged: OvlAction<DialogChangedParam> = (
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

export const DialogDefaultChanged: OvlAction<{ default: ResultType }> = (
  { state },
  value
) => {
  state.ovl.libState.dialog.default = value.default
}

export const DialogClosed: OvlAction = async ({ state }) => {
  state.ovl.libState.dialog.closing = false
  state.ovl.libState.dialog.visible = false
  state.ovl.libState.dialog.cancelText = "rerender force workaround"

  if (
    dialogAfterClose.elementToFocus &&
    state.ovl.screens.screenState[dialogAfterClose.currentScreen].visible &&
    !state.ovl.screens.screenState[dialogAfterClose.currentScreen].closing
  ) {
    //@ts-ignore
    dialogAfterClose.elementToFocus.focus()
  }
  dialogAfterClose.elementToFocus = undefined
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
