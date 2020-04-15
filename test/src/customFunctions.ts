// custom Functions (table, forms)
import * as translations from "./screens/Translation/customFunctions"
import * as user from "./screens/Login/customFunctions"
import * as settings from "./screens/settings/customFunctions"
import * as tabletesting from "./shared/TableTesting/customFunctions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/customFunctions"
export let testtables = { tabletesting, mobiletimerecording }
export let portal = { settings, system: { user, translations } }

// screenFunctions

import * as MobileTimeEntry from "./screens/MobileTimeRecording/screenFunctions"
import * as Translation from "./screens/Translation/screenFunctions"
import * as Audit from "./screens/Audit/screenFunctions"
import * as TableTesting from "./screens/TableTesting/screenFunctions"
import * as Settings from "./screens/settings/screenFunctions"
import * as Feedback from "./screens/Feedback/screenFunctions"

import { Screen } from "../../ovl/src"
let screens: { [key in Screen]?: any } = {
  Translation,
  Audit,
  TableTesting,
  MobileTimeEntry,
  Settings,
  Feedback
}
export { screens }
