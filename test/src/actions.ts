import {
  LoginValidateField,
  Login,
  ForgotPw,
  TogglePDFPopup,
  HandleAdditionalLanguageResult,
  OpenLanguageTable,
  CustomInit,
  HandleRefresh
} from "./global/actions"
let user = {
  LoginValidateField,
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit
}

let global = { TogglePDFPopup, HandleRefresh }

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

export const portal = {
  system: { shellbar, translations: { OpenLanguageTable }, user },
  global,
  settings,
  order,
  feedback
}

export const testtables = { tabletesting, mobiletimerecording }
