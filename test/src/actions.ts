import {
  LoginValidateField,
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit,
  HandleRefresh,
  TogglePDFPopup
} from "./global/actions"
let user = {
  LoginValidateField,
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit
}

let global = { HandleRefresh, TogglePDFPopup }

import { SaveSettings, SettingsValidateField } from "./screens/Settings/actions"
let settings = {
  SaveSettings,
  SettingsValidateField
}

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

import { SaveFeedback, FeedbackValidateField } from "./screens/Feedback/actions"
let feedback = {
  SaveFeedback,
  FeedbackValidateField
}

import * as tabletesting from "./shared/TableTesting/actions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/actions"
import * as translations from "./screens/Translation/actions"

import * as TableTesting from "./screens/TableTesting/actions"

let screens = { TableTesting }

export const portal = {
  system: { shellbar, translations, user },
  global,
  settings,
  order,
  feedback,
  screens
}

export const testtables = { tabletesting, mobiletimerecording }
