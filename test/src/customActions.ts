import * as user from "./screens/Login/formActions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/formActions"
import * as mobiletimerecordingmain from "./screens/MobileTimeRecording/formActions"
import * as settings from "./screens/Settings/formActions"
import * as translations from "./screens/Translation/formActions"
import * as feedback from "./screens/Feedback/formActions"
import * as tabletesting from "./shared/TableTesting/customActions"
import * as screens from "./customScreenActions"
let testtables = {
  tabletesting,
  mobiletimerecording,
  mobiletimerecordingmain,
}
let system = { user, translations }
export { screens, testtables, settings, system, feedback }
