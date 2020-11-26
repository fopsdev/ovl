import {
  Login,
  ForgotPw,
  HandleAdditionalLanguageResult,
  CustomInit,
  HandleRefresh,
  TogglePDFPopup,
} from "./global/actions"

import { OccasionsProcessDataPoll } from "./screens/OccasionsDashboard/actions"
let occasionsProcessDashboard = { OccasionsProcessDataPoll }

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

import { SaveFeedback } from "./screens/Feedback/actions"

import * as mobiletimerecording from "./screens/MobileTimeRecording/actions"

let system = { shellbar, user }
let testtables = { mobiletimerecording }
let feedback = { SaveFeedback }

export {
  system,
  global,
  settings,
  order,
  feedback,
  testtables,
  occasionsProcessDashboard,
}
