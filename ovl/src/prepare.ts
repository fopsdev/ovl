import { actionTracking, createDeepProxy } from "./tracker/proxyHandler"
import { ovl, OvlState, OvlActions } from "."

const interceptorAsyncFn = (originalFn, key) => {
  return async (value) => {
    actionTracking.lastActionName = key
    actionTracking.actionRunning = true
    let res = await originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    actionTracking.actionRunning = false
    return res
  }
}

const interceptorFn = (originalFn, key) => {
  return (value) => {
    actionTracking.lastActionName = key
    actionTracking.actionRunning = true
    let res = originalFn(value, {
      state: ovl.state,
      actions: ovl.actions,
      effects: ovl.effects,
    })
    actionTracking.actionRunning = false
    return res
  }
}

const injectActions = (obj) =>
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "function") {
      let isAsync = obj[item].toString().startsWith("async")
      if (isAsync) {
        obj[item] = interceptorAsyncFn(obj[item], item)
      } else {
        obj[item] = interceptorFn(obj[item], item)
      }
    } else if (typeof obj[item] === "object") {
      injectActions(obj[item])
    }
  })

// prepare screens state
//@ts-ignore
export const init = (
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
) => {
  let _state: any = {}
  _state.ovl = ovlState
  _state.app = appState
  _state.ovl.screens.screens = {}
  Object.keys(appScreens)
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
  Object.keys(appDialogs)
    .concat(Object.keys(baseDialogs))
    .forEach((k) => {
      _state.ovl.dialogs[k] = {
        visible: false,
        closing: false,
      }
    })
  let _actions: any = {}
  _actions.ovl = ovlActions
  _actions.app = appActions
  _actions.custom = customActions

  let effects = {
    ovl: ovlEffects,
  }
  // find the functions in actions and inject our own action caller
  injectActions(_actions)
  return {
    state: <OvlState>createDeepProxy(_state),
    actions: <OvlActions>_actions,
    effects,
  }
}
import { defineElements } from "./registerComponents"
defineElements()
