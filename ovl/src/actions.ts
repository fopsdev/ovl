import {
  CloseOverlay,
  OpenOverlay,
  StartCloseOverlay,
} from "./library/Overlay/actions"

import {
  CloseOverlay2,
  OpenOverlay2,
  StartCloseOverlay2,
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
  FillListControl,
} from "./library/forms/actions"

import {
  NavigateBack,
  NavigateTo,
  Logout,
  InitApp,
  RehydrateAndUpdateApp,
  GetFile,
  PrepareApp,
  SetLanguage,
  SetVisibleFalse,
  SetTableNeedsRebuild,
  SetLastScrollPosition,
} from "./global/actions"

import {
  AddSnack,
  RemoveSnack,
  PlaceSnack,
  ClearSnack,
} from "./library/Snack/actions"

import {
  ModalDialogOpen,
  OkDialog,
  OkCancelDialog,
  DialogOpen,
} from "./library/Dialog/actions"
let dialog = {
  DialogOpen,
  ModalDialogOpen,
  OkDialog,
  OkCancelDialog,
}

let form = {
  InitForm,
  ResetForm,
  ResetFormAfterNavigation,
  ValidateForm,
}

import {
  DialogChanged,
  //DialogClosed,
  DialogDefaultChanged,
  SetIndicatorClose,
  SetIndicatorOpen,
  TableRefresh,
  TableRebuild,
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
  TableViewRow,
  TableCloseViewRow,
  TableAddRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableMultipleCustomFunction,
  TableViewRefresh,
  TableRefreshDataFromServer,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter,
  TableSetViewTab,
} from "./library/actions"

let navigation = { NavigateBack, NavigateTo }

let overlay = {
  OpenOverlay,
  OpenOverlay2,
  CloseOverlay: StartCloseOverlay,
  CloseOverlay2: StartCloseOverlay2,
}

let indicator = { SetIndicatorOpen, SetIndicatorClose }

let table = {
  TableRefresh,
  TableRebuild,
  TableSelectRow,
  TableEditRow,
  TableDeleteRow,
  TableEditClose,
  TableViewRefresh,
  TableRefreshDataFromServer,
  TableSort,
  TableFilter,
  TableClearFilter,
  TableAddRow,
  TableDirectSaveRow,
  TableSetViewTab,
}

let internal = {
  CloseOverlay,

  CloseOverlay2,
  SetTableNeedsRebuild,
  SetLastScrollPosition,
  PlaceSnack,
  ClearSnack,
  AddSnack,
  RemoveSnack,
  DialogChanged,
  //DialogClosed,
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
  TableViewRow,
  TableCloseViewRow,
  TableDeleteRowFromData,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableMultipleCustomFunction,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter,
  InitApp,
  RehydrateAndUpdateApp,
  GetFile,
  PrepareApp,
  SetLanguage,
  SetVisibleFalse,
  ChangeField,
  SetField,
  TouchField,
  SetFormValid,
  ValidateDataType,
  SetFormUndirty,
  ValidateSchema,
  ValidateList,
  FillListControl,
}

let user = { Logout }

export { indicator, navigation, overlay, internal, dialog, form, table, user }
