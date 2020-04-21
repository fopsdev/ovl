// custom Functions (table, forms)
import { Screen } from "../../ovl/src"
import * as Audit from "./screens/Audit/screenFunctions"
import * as Feedback from "./screens/Feedback/screenFunctions"
import * as user from "./screens/Login/customFunctions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/customFunctions"
import * as mobiletimerecordingmain from "./screens/MobileTimeRecording/customFunctions"
// screenFunctions
import * as MobileTimeEntry from "./screens/MobileTimeRecording/screenFunctions"
import * as settings from "./screens/settings/customFunctions"
import * as Settings from "./screens/settings/screenFunctions"
import * as TableTesting from "./screens/TableTesting/screenFunctions"
import * as translations from "./screens/Translation/customFunctions"
import * as feedback from "./screens/Feedback/customFunctions"
import * as Translation from "./screens/Translation/screenFunctions"
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
