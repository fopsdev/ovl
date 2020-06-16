import { CustomFormType, TableDefIds, Language } from "../../test/src/index"
import { screens } from "../../test/src/stateScreens"
import * as portalState from "../../test/src/state"
import * as portalActions from "../../test/src/actions"
import * as customActions from "../../test/src/customActions"

import { createDeepProxy } from "./tracker/proxyHandler"
import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"

type OvlActionContext = {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
}

export type OvlAction<T = {}, R = void> = (
  value?: T,
  context?: OvlActionContext
) => R

//export type OvlAction<T = {}, R = void> = (context?: any, value?: T) => R

let _state = {
  ovl: ovlState,
  portal: portalState,
}

let state: OvlState = createDeepProxy(_state)

let actions = {
  ovl: ovlActions,
  portal: portalActions,
  custom: customActions,
}

let effects = {
  ovl: ovlEffects,
}

export let ovl = {
  state,
  actions,
  effects,
}

const interceptorAsyncFn = (originalFn) => {
  return async (value) => {
    //console.log(originalFn.name + " called...")
    let res = await originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    return res
  }
}

const interceptorFn = (originalFn) => {
  return (value) => {
    //console.log(originalFn.name + " called...")
    let res = originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    return res
  }
}

const getMethods = (obj) =>
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "function") {
      let isAsync = obj[item].toString().startsWith("async")
      if (isAsync) {
        obj[item] = interceptorAsyncFn(obj[item])
      } else {
        //console.log(obj[item])
        obj[item] = interceptorFn(obj[item])
      }
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
export { screens, TableDefIds, Language }
export type Screen = keyof typeof screens
import { defineElements } from "./registerComponents"
defineElements()
