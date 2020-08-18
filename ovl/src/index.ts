export { OvlVersion } from "../../test/sw"

import {
  demoAppScreens,
  demoAppDialogs,
  CustomFormType,
  TableDefIds,
  Language,
} from "../../test/src/appDef"
import * as demoAppState from "../../test/src/state"
import * as demoAppActions from "../../test/src/actions"
import * as customActions from "../../test/src/customActions"

import { createDeepProxy, currentAction } from "./tracker/proxyHandler"
import * as ovlState from "./state"
import * as ovlActions from "./actions"
import * as ovlEffects from "./effects"

import { baseScreens, baseDialogs } from "./screensAndDialogs"

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
  demoApp: demoAppState,
}

// prepare screens state
//@ts-ignore
_state.ovl.screens.screens = {}
Object.keys(demoAppScreens)
  .concat(Object.keys(baseScreens))
  .forEach((k) => {
    _state.ovl.screens.screens[k] = {
      visible: false,
      closing: false,
      lastScrollTop: undefined,
    }
  })

// prepare dialogs state
//@ts-ignore
_state.ovl.dialogs = {}
Object.keys(demoAppDialogs)
  .concat(Object.keys(baseDialogs))
  .forEach((k) => {
    _state.ovl.dialogs[k] = {
      visible: false,
      closing: false,
    }
  })

let state: OvlState = createDeepProxy(_state)

let actions = {
  ovl: ovlActions,
  demoApp: demoAppActions,
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

const interceptorAsyncFn = (originalFn, key) => {
  return async (value) => {
    currentAction.name = key
    let res = await originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    currentAction.name = undefined
    return res
  }
}

const interceptorFn = (originalFn, key) => {
  return (value) => {
    currentAction.name = key
    let res = originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    currentAction.name = undefined
    return res
  }
}

const getMethods = (obj) =>
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "function") {
      let isAsync = obj[item].toString().startsWith("async")
      if (isAsync) {
        obj[item] = interceptorAsyncFn(obj[item], item)
      } else {
        obj[item] = interceptorFn(obj[item], item)
      }
    } else if (typeof obj[item] === "object") {
      getMethods(obj[item])
    }
  })
// find the functions in actions and inject our own action caller
getMethods(actions)

export const logState = () => {
  console.log("ovl state:")
  console.log(JSON.parse(JSON.stringify(ovl.state), stringifyReplacer))
}
export const logActions = () => {
  console.log("ovl actions:")
  console.log(ovl.actions)
}
export const logEffects = () => {
  console.log("ovl effects:")
  console.log(ovl.effects)
}

export type OvlState = typeof _state
export type OvlActions = typeof actions
export type OvlEffects = typeof effects
export type FormType = CustomFormType | "TableRowEdit"
export type OvlDialog = keyof typeof baseDialogs | keyof typeof demoAppDialogs

export { TableDefIds, Language }
export type OvlScreen = keyof typeof baseScreens | keyof typeof demoAppScreens

import { defineElements } from "./registerComponents"
import { stringifyReplacer } from "./global/globals"
defineElements()
