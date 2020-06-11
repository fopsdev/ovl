import { CustomFormType, TableDefIds, Language } from "../../test/src/index"

import { portalState } from "../../test/src/state"
import * as portalActions from "../../test/src/actions"

import { screens } from "../../test/src/stateScreens"
import * as customFunctions from "../../test/src/customFunctions"
import { ovlState } from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"
import { createDeepProxy } from "./tracker/proxyHandler"

export declare type OvlAction<T = {}> = (context?, value?: T) => void

let _state = {
  ovl: ovlState,
  portal: portalState,
}

export declare type OvlState = typeof _state
let state: OvlState = createDeepProxy(_state)

let actions = {
  ovl: ovlActions,
  portal: portalActions,
}

// find the functions in actions and inject our own action caller
const getMethods = (obj) =>
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "function") {
      console.log(item)
    } else if (typeof obj[item] === "object") {
      getMethods(obj[item])
    }
  })

export declare type OvlActions = typeof actions

let effects = {
  ovl: ovlEffects,
}

export declare type OvlEffects = typeof effects

export let ovl = {
  state,
  actions,
  effects,
}

import { defineElements } from "./registerComponents"
defineElements()

export type FormType = CustomFormType | "TableRowEdit"
export { customFunctions, screens, TableDefIds, Language }
export type Screen = keyof typeof screens
