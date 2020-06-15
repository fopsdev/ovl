// custom Functions (table, forms)
import { Screen } from "../../ovl/src"
import * as Audit from "./screens/Audit/screenFunctions"
import * as Feedback from "./screens/Feedback/screenFunctions"
import * as user from "./screens/Login/customFunctions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/formActions"
import * as mobiletimerecordingmain from "./screens/MobileTimeRecording/formActions"
// screenFunctions
import * as MobileTimeEntry from "./screens/MobileTimeRecording/screenActions"
import * as settings from "./screens/Settings/formActions"
import * as Settings from "./screens/Settings/screenActions"
import * as TableTesting from "./screens/TableTesting/screenActions"
import * as translations from "./screens/Translation/formActions"
import * as feedback from "./screens/Feedback/customFunctions"
import * as Translation from "./screens/Translation/screenActions"
import * as tabletesting from "./shared/TableTesting/customFunctions"
export let testtables = {
  tabletesting,
  mobiletimerecording,
  mobiletimerecordingmain,
}
export let portal = { settings, system: { user, translations }, feedback }

let screens: { [key in Screen]?: any } = {
  Translation,
  Audit,
  TableTesting,
  MobileTimeEntry,
  MobileTimeEntryForm: {},
  Settings,
  Feedback,
}
export { screens }
