import { CustomFormType, TableDefIds, Language } from "../../test/src/index"

import { portalState } from "../../test/src/state"
import * as portalActions from "../../test/src/actions"

import { screens } from "../../test/src/stateScreens"
import * as customFunctions from "../../test/src/customFunctions"
import { ovlState } from "./state"
import * as ovlActions from "./actions"
import { createDeepProxy } from "./tracker/proxyHandler"

export declare type OvlAction<T = {}> = (context?, value?: T) => void

let _state = {
  ovl: ovlState,
  portal: portalState,
}

export declare type OvlState = typeof _state
let state: OvlState = createDeepProxy(_state)

let _actions = {
  ovl: ovlActions,
  portal: portalActions,
}

export declare type OvlActions = typeof _actions

let _effects = {}

export declare type OvlEffects = typeof _effects

let effects = _effects

let actions: OvlActions = JSON.parse(JSON.stringify(_actions))

export let ovl = {
  state,
  actions,
  effects,
}

console.log(ovl)

export type FormType = CustomFormType | "TableRowEdit"
export { customFunctions, screens, TableDefIds, Language }
export type Screen = keyof typeof screens
