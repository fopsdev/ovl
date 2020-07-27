export { OvlVersion } from "../../../kaltag/sw"

import {
  timePortalScreens,
  timePortalDialogs,
  CustomFormType,
  TableDefIds,
  Language,
} from "../../../kaltag/src/appDef"
import * as timePortalState from "../../../kaltag/src/state"
import * as timePortalActions from "../../../kaltag/src/actions"
import * as customActions from "../../../kaltag/src/customActions"

import { createDeepProxy } from "./tracker/proxyHandler"
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
  timeportal: timePortalState,
}

// prepare screens state
//@ts-ignore
_state.ovl.screens.screens = {}
Object.keys(timePortalScreens)
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
Object.keys(timePortalDialogs)
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
  timeportal: timePortalActions,
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
        obj[item] = interceptorFn(obj[item])
      }
    } else if (typeof obj[item] === "object") {
      getMethods(obj[item])
    }
  })
// find the functions in actions and inject our own action caller
getMethods(actions)

export const logState = () => {
  console.log("ovl state:")
  console.log(ovl.state)
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
export type OvlDialog =
  | keyof typeof baseDialogs
  | keyof typeof timePortalDialogs

export { TableDefIds, Language }
export type OvlScreen =
  | keyof typeof baseScreens
  | keyof typeof timePortalScreens

import { defineElements } from "./registerComponents"
defineElements()
