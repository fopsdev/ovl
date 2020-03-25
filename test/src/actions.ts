import { LoginValidateField } from "./global/actions"
let user = {
  LoginValidateField
}
export { login }

import { SaveSettings, SettingsValidateField } from "./screens/Settings/actions"
let settings = {
  SaveSettings,
  SettingsValidateField
}
export { settings }

import {
  PreparePositiveFeedback,
  PrepareNegativeFeedback,
  PrepareDeliveryDateFeedback,
  SelectOrder
} from "./screens/Order/actions"
let order = {
  PreparePositiveFeedback,
  PrepareNegativeFeedback,
  PrepareDeliveryDateFeedback,
  SelectOrder
}
export { order }

import { SaveFeedback, FeedbackValidateField } from "./screens/Feedback/actions"
let feedback = {
  SaveFeedback,
  FeedbackValidateField
}
export { feedback }

let forms = {
  InitForm,
  ChangeField,
  SetField,
  TouchField,
  SetFormValid,
  ResetForm,
  ResetFormAfterAnimation,
  ValidateForm,
  ValidateDataType,
  SetFormUndirty,
  ValidateSchema,
  ValidateList,
  FillListControl
}
export { forms }

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
  RefreshDataFromServer,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter
} from "./library/actions"

let internal = {
  PlaceSnack,
  ClearSnack,
  DialogChanged,
  DialogClosed,
  DialogDefaultChanged,

  SetIndicatorOpen,
  SetIndicatorClose,
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
  TableMoreRow,
  TableAddRow,
  TableDeleteRowFromData,
  LoginValidateField,
  TableMultipleDeleteRow,
  TableMultipleCopyRow,
  TableMultipleEditRow,
  TableViewRefresh,
  RefreshDataFromServer,
  TableSelectCustomSort,
  TableSelectCustomFilter,
  TableSelectColumnFilter
}
export { internal }

import * as translation from "./screens/Translation/actions"
export { translation }

import * as tabletesting from "./shared/TableTesting/actions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/actions"
export { tabletesting, mobiletimerecording }
