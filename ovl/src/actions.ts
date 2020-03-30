import {
  CloseOverlay,
  OpenOverlay,
  StartCloseOverlay
} from "./library/Overlay/actions"

import {
  CloseOverlay2,
  OpenOverlay2,
  StartCloseOverlay2
} from "./library/Overlay2/actions"

import {
  InitForm,
  ChangeField,
  SetField,
  SetFormValid,
  TouchField,
  ResetForm,
  SetFormUndirty,
  ResetFormAfterNavigation,
  ValidateForm,
  ValidateDataType,
  ValidateSchema,
  ValidateList,
  FillListControl
} from "./library/forms/actions"

import {
  NavigateBack,
  NavigateTo,
  Logout,
  InitApp,
  RehydrateAndUpdateApp,
  GetFile,
  PrepareApp,
  ToggleLanguage,
  SetVisibleFalse
} from "./global/actions"

import {
  AddSnack,
  RemoveSnack,
  PlaceSnack,
  ClearSnack
} from "./library/Snack/actions"

import { DialogOpen, OkDialog, OkCancelDialog } from "./library/Dialog/actions"
let dialog = {
  DialogOpen,
  OkDialog,
  OkCancelDialog
}

let form = {
  InitForm,
  ResetForm,
  ResetFormAfterNavigation,
  ValidateForm
}

import {
  DialogChanged,
  DialogClosed,
  DialogDefaultChanged,
  SetIndicatorClose,
  SetIndicatorOpen,
  TableRefresh,
  TableSelectRow,
  TableClearFilter,
  TableSelectHeader,
  TableSort,
  TableFilter,
  TableFilterSelected,
  TableSetPage,
  TableDeleteRow,
  TableCopyRow,
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
} from "./library/actions"

let navigation = { NavigateBack, NavigateTo }

let overlay = { OpenOverlay, OpenOverlay2 }

let indicator = { SetIndicatorOpen, SetIndicatorClose }

let table = {
  TableRefresh,
  TableSelectRow,
  TableEditRow,
  TableDeleteRow,
  TableEditClose,
  TableViewRefresh,
  TableRefreshDataFromServer,
  TableSort,
  TableFilter,
  TableClearFilter,
  TableAddRow
}

let internal = {
  CloseOverlay,
  StartCloseOverlay,
  CloseOverlay2,
  StartCloseOverlay2,
  PlaceSnack,
  ClearSnack,
  AddSnack,
  RemoveSnack,
  DialogChanged,
  DialogClosed,
  DialogDefaultChanged,
  TableSelectHeader,
  TableFilterSelected,
  TableSetPage,
  TableCopyRow,
  TableDeleteRow,
  TableAddRow,
  TableEditRow,
  TableSelectAll,
  TableEditSaveRow,
  TableDirectSaveRow,
  TableMoreRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter,
  InitApp,
  RehydrateAndUpdateApp,
  GetFile,
  PrepareApp,
  ToggleLanguage,
  SetVisibleFalse,
  ChangeField,
  SetField,
  TouchField,
  SetFormValid,
  ValidateDataType,
  SetFormUndirty,
  ValidateSchema,
  ValidateList,
  FillListControl
}

let user = { Logout }

export let ovl = {
  indicator,
  navigation,
  overlay,
  internal,
  dialog,
  form,
  table,
  user
}
