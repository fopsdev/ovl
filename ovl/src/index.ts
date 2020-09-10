export { OvlVersion } from "../../../kaltag/sw"
import { init } from "./prepare"
import {
  portalScreens,
  portalDialogs,
  CustomFormType,
  TableDefIds as OvlTableDefIds,
  Language as OvlLanguage,
} from "../../../kaltag/src/appDef"
import * as portalState from "../../../kaltag/src/state"
import * as portalActions from "../../../kaltag/src/actions"
import * as customActions from "../../../kaltag/src/customActions"
import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"

import { baseScreens, baseDialogs } from "./screensAndDialogs"

let _state = {
  portal: portalState,
}
let _actions = {
  portal: portalActions,
}
export type OvlState = { ovl: typeof ovlState; portal: typeof portalState }
export type OvlActions = {
  ovl: typeof ovlActions
  portal: typeof portalActions
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
  portalScreens,
  baseScreens,
  portalDialogs,
  baseDialogs,
  ovlActions,
  customActions,
  ovlEffects
)

export type OvlForm = CustomFormType | "TableRowEdit"
export type OvlDialog = keyof typeof baseDialogs | keyof typeof portalDialogs

export { OvlTableDefIds, OvlLanguage }
export type OvlScreen = keyof typeof baseScreens | keyof typeof portalScreens

import { defineElements } from "./registerComponents"
defineElements()
