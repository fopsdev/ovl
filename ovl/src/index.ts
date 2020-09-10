export { OvlVersion } from "../../../app/sw"
import { init } from "./prepare"
import {
  appScreens,
  appDialogs,
  CustomFormType,
  TableDefIds as OvlTableDefIds,
  Language as OvlLanguage,
} from "../../../app/src/appDef"
import * as appState from "../../../app/src/state"
import * as appActions from "../../../app/src/actions"
import * as customActions from "../../../app/src/customActions"
import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"

import { baseScreens, baseDialogs } from "./screensAndDialogs"

let _state = {
  portal: appState,
}
let _actions = {
  portal: appActions,
}
export type OvlState = { ovl: typeof ovlState; portal: typeof appState }
export type OvlActions = {
  ovl: typeof ovlActions
  portal: typeof appActions
  custom: typeof customActions
}
export type OvlEffects = { ovl: typeof ovlEffects }
export let ovl: {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
} = init(
  _state,
  _actions,
  ovlState,
  appScreens,
  baseScreens,
  appDialogs,
  baseDialogs,
  ovlActions,
  customActions,
  ovlEffects
)

export type OvlForm = CustomFormType | "TableRowEdit"
export type OvlDialog = keyof typeof baseDialogs | keyof typeof appDialogs

export { OvlTableDefIds, OvlLanguage }
export type OvlScreen = keyof typeof baseScreens | keyof typeof appScreens
