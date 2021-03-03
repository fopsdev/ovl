import * as user from "./screens/Login/formActions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/formActions"
import * as mobiletimerecordingmain from "./screens/MobileTimeRecording/formActions"
import * as settings from "./screens/Settings/formActions"
import * as translations from "./screens/Translation/formActions"
import * as feedback from "./screens/Feedback/formActions"
import * as vehicles from "./screens/OccasionsDashboard/formActions"

import { tabletesting } from "./shared/TableTesting/customActions"
import * as tableautoquotations from "./screens/AutoQuotation/tableActions"
import * as autoquotationform from "./screens/AutoQuotation/formActions"
import * as screens from "./customScreenActions"

let autoquotation = { form: autoquotationform, table: tableautoquotations }

let testtables = {
  tabletesting,
  mobiletimerecording,
  mobiletimerecordingmain,
}
let system = { user, translations }

export {
  screens,
  testtables,
  settings,
  system,
  feedback,
  vehicles,
  autoquotation,
}
