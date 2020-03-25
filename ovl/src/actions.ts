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
  ResetFormAfterAnimation,
  ValidateForm,
  ValidateDataType,
  ValidateSchema,
  ValidateList,
  FillListControl
} from "./library/forms/actions"

import {
  CloseMainMenu,
  OpenMainMenu,
  OpenUserMenu,
  CloseUserMenu
} from "./screens/Shellbar/actions"
let shellbar = {
  CloseMainMenu,
  OpenMainMenu,
  OpenUserMenu,
  CloseUserMenu
}

import {
  NavigateBack,
  NavigateTo,
  ForgotPw,
  Logout,
  //Login,
  InitApp,
  RehydrateAndUpdateApp,
  GetFile,
  PrepareApp,
  RefreshData,
  ToggleLanguage,
  SetVisibleFalse,
  OpenLanguageTable
} from "./global/actions"

import {
  AddSnack,
  RemoveSnack,
  PlaceSnack,
  ClearSnack
} from "./library/Snack/actions"
let snack = {
  AddSnack,
  RemoveSnack
}

import { DialogOpen, OkDialog, OkCancelDialog } from "./library/Dialog/actions"
let dialog = {
  DialogOpen,
  OkDialog,
  OkCancelDialog
}

let form = {
  InitForm,
  ResetForm,
  ResetFormAfterAnimation,
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
  DialogChanged,
  DialogClosed,
  DialogDefaultChanged,
  TableSelectHeader,
  TableFilterSelected,
  TableSetPage,
  TableCopyRow,
  TableDeleteRow,
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
  RefreshData,
  ToggleLanguage,
  SetVisibleFalse,
  OpenLanguageTable,
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

import * as translation from "./screens/Translation/actions"

let user = { ForgotPw, Logout } //Login }

export let ovl = {
  indicator,
  navigation,
  overlay,
  internal,
  dialog,
  snack,
  shellbar,
  form,
  table,
  translation,
  user
}
