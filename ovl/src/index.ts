// <app setup>
export { OvlVersion } from "../../../app/sw"
import {
  OvlAppDialogs,
  OvlAppForms,
  OvlAppLanguage,
  OvlAppScreens,
  OvlAppTableDefIds,
  OvlConfig,
  OvlFormValidationValidators,
} from "../../../app/src/appDef"
import * as appState from "../../../app/src/state"
import * as appActions from "../../../app/src/actions"
import * as customActions from "../../../app/src/customActions"
export { OvlFormValidationValidators }
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
import { defineElements } from "./registerComponents"
import { startRender } from "../../../app/src"
import {
  logActions,
  logState,
  rehydrateTestState,
  saveTestState,
  toggleDebugTracking,
} from "./global/globals"
import { logTrackingList } from "./tracker/tracker"

// some global vars which help debugging as well in live environment in Desktop Browsers (F12)
globalThis.OvlLogActions = logActions
globalThis.OvlLogState = logState
globalThis.OvlToggleDebugTracking = toggleDebugTracking
globalThis.OvlLogTrackingList = logTrackingList
globalThis.OvlSaveTestState = saveTestState
globalThis.OvlRehydrateTestState = rehydrateTestState
globalThis.OvlConfig = OvlConfig

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
  OvlConfig.app.screens,
  OvlConfig.app.dialogs,
  customActions,
  ovlState,
  ovlActions,
  ovlEffects,
  baseScreens,
  baseDialogs,
  OvlConfig.app.forms
)
defineElements()
setTimeout(async () => {
  await ovl.actions.ovl.internal.InitApp()
  startRender()
}, 0)

export type OvlForm = OvlAppForms | "TableRowEdit"
export type OvlDialog = OvlAppDialogs | keyof typeof baseDialogs
export type OvlTableDefIds = OvlAppTableDefIds
export type OvlLanguage = OvlAppLanguage
export type OvlScreen = OvlAppScreens | keyof typeof baseScreens

export { OvlConfig }

type OvlActionContext = {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
}

export type OvlAction<T = {}, R = void> = (
  value?: T,
  context?: OvlActionContext
) => R
