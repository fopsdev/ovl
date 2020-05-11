import {
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit,
  HandleRefresh,
  TogglePDFPopup,
} from "./global/actions"
let user = {
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit,
}

let global = { HandleRefresh, TogglePDFPopup }

import { SaveSettings } from "./screens/Settings/actions"
let settings = {
  SaveSettings,
}

import {
  CloseMainMenu,
  OpenMainMenu,
  OpenUserMenu,
  CloseUserMenu,
} from "./screens/Shellbar/actions"
let shellbar = {
  CloseMainMenu,
  OpenMainMenu,
  OpenUserMenu,
  CloseUserMenu,
}

import {
  PreparePositiveFeedback,
  PrepareNegativeFeedback,
  PrepareDeliveryDateFeedback,
  SelectOrder,
} from "./screens/Order/actions"
let order = {
  PreparePositiveFeedback,
  PrepareNegativeFeedback,
  PrepareDeliveryDateFeedback,
  SelectOrder,
}

import * as feedback from "./screens/Feedback/actions"

import * as mobiletimerecording from "./screens/MobileTimeRecording/actions"

export const portal = {
  system: { shellbar, user },
  global,
  settings,
  order,
  feedback,
}

export const testtables = { mobiletimerecording }
