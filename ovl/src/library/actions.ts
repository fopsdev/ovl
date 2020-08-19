import { ResultType, ModalDialogState } from "./Dialog/Dialog"
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
  TableOfflineRetryDeleteRow,
  TableOfflineRetrySaveRow,
  TableOfflineHandler,
} from "./Table/actions"
//import { dialogAfterClose } from "./Dialog/actions"
import { OvlAction } from ".."
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
  TableOfflineRetrySaveRow,
  TableOfflineRetryDeleteRow,
  TableOfflineHandler,
}

export type DialogChangedParam = {
  dialogState: ModalDialogState
  result: ResultType
}

export const DialogChanged: OvlAction<DialogChangedParam> = (
  value,
  { state, actions }
) => {
  state.ovl.dialogs.Modal.closing = true
  value.dialogState.result = value.result
  if (dialogResolver) {
    dialogResolver(value.result)
  }
}

export const DialogDefaultChanged: OvlAction<{ default: ResultType }> = (
  value,
  { state }
) => {
  state.ovl.libState.dialog.default = value.default
}

let dialogResolver: (value?: any) => void
export const DialogResult = () => {
  return new Promise((resolve, reject) => {
    dialogResolver = resolve
  })
}

export const SetIndicatorOpen: OvlAction = (_, { state }) => {
  state.ovl.libState.indicator.refCounter++
  state.ovl.libState.indicator.open = true
}

export const SetIndicatorClose: OvlAction = (_, { state }) => {
  state.ovl.libState.indicator.refCounter--
  if (state.ovl.libState.indicator.refCounter < 1) {
    state.ovl.libState.indicator.open = false
  }
}
