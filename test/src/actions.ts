import { LoginValidateField, Login, TogglePDFPopup } from "./global/actions"
let user = {
  LoginValidateField,
  Login
}

let global = { TogglePDFPopup }

import { SaveSettings, SettingsValidateField } from "./screens/Settings/actions"
let settings = {
  SaveSettings,
  SettingsValidateField
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
  global,
  user,
  settings,
  order,
  feedback,
  tabletesting,
  mobiletimerecording
}
