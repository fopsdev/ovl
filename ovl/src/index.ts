// <app setup>
export { OvlVersion } from "../../../app/sw"
import {
  appForms,
  appScreens,
  appDialogs,
  OvlTableDefIds,
  OvlLanguage,
} from "../../../app/src/appDef"
import * as appState from "../../../app/src/state"
import * as appActions from "../../../app/src/actions"
import * as customActions from "../../../app/src/customActions"
// </app setup>

// // <test setup>
// export { OvlVersion } from "../../test/sw"
// import {
//   appScreens,
//   appDialogs,
//   appForms,
//   OvlTableDefIds,
//   OvlLanguage,
// } from "../../test/src/appDef"
// import * as appState from "../../test/src/state"
// import * as appActions from "../../test/src/actions"
// import * as customActions from "../../test/src/customActions"
// // </test setup>

import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"
import { init } from "./prepare"
import { baseScreens, baseDialogs } from "./screensAndDialogs"

export type OvlState = { ovl: typeof ovlState; app: typeof appState }
export type OvlActions = {
  ovl: typeof ovlActions
  app: typeof appActions
  custom: typeof customActions
}
export type OvlEffects = { ovl: typeof ovlEffects }
export let ovl: {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
} = init(
  appState,
  appActions,
  appScreens,
  appDialogs,
  customActions,
  ovlState,
  ovlActions,
  ovlEffects,
  baseScreens,
  baseDialogs
)

export type OvlForm = appForms | "TableRowEdit"
export type OvlDialog = keyof typeof baseDialogs | keyof typeof appDialogs

export { OvlTableDefIds, OvlLanguage }
export type OvlScreen = keyof typeof baseScreens | keyof typeof appScreens
