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

import { SaveSettings } from "./screens/Settings/actions"
let settings = {
  SaveSettings
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

import * as mobiletimerecording from "./screens/MobileTimeRecording/actions"
import * as translations from "./screens/Translation/actions"

import { HandleScreenRefresh } from "./screens/TableTesting/actions"

let screens = { TableTesting: { HandleScreenRefresh } }

export const portal = {
  system: { shellbar, translations, user },
  global,
  settings,
  order,
  feedback,
  screens
}

export const testtables = { mobiletimerecording }
