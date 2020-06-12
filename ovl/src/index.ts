import { CustomFormType, TableDefIds, Language } from "../../test/src/index"
import { screens } from "../../test/src/stateScreens"
import * as customFunctions from "../../test/src/customFunctions"
import * as portalState from "../../test/src/state"
import * as portalActions from "../../test/src/actions"

import { createDeepProxy } from "./tracker/proxyHandler"
import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"

export type OvlAction<T = {}> = (context?, value?: T) => void

let _state = {
  ovl: ovlState,
  portal: portalState,
}

let state: OvlState = createDeepProxy(_state)

let actions = {
  ovl: ovlActions,
  portal: portalActions,
}

let effects = {
  ovl: ovlEffects,
}

export let ovl = {
  state,
  actions,
  effects,
}

const interceptorFn = (originalFn) => {
  return (value) => {
    console.log(originalFn.name + " called...")
    originalFn(
      {
        state: ovl.state,
        actions: ovl.actions,
        effects: ovl.effects,
      },
      value
    )
  }
}

const getMethods = (obj) =>
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "function") {
      obj[item] = interceptorFn(obj[item])
    } else if (typeof obj[item] === "object") {
      getMethods(obj[item])
    }
  })
// find the functions in actions and inject our own action caller
getMethods(actions)

export const logState = () => {
  console.log(ovl.state)
}

export type OvlState = typeof _state
export type OvlActions = typeof actions
export type OvlEffects = typeof effects
export type FormType = CustomFormType | "TableRowEdit"
export { customFunctions, screens, TableDefIds, Language }
export type Screen = keyof typeof screens
import { defineElements } from "./registerComponents"
defineElements()
