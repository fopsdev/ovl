// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
export const OvlVersion = window.OvlVersion
// gives a nice dev experience with offlinemode. but take care to check "update on reload" and "bypass network" in the devtools and leave them open
//@ts-ignore
export const IsDev = window.OvlIsDev
// configure offline-mode
//@ts-ignore
export const OvlOfflineMode = window.OvlOfflineMode
// if the data-version changes clients will clear the persisted state (indexdb state)
//@ts-ignore
export const OvlDataVersion = window.OvlDataVersion
// shows a hint in version info from which event state was stored
//@ts-ignore
export const OvlShowSaveOrigin = window.OvlShowSaveOrigin

export const PersistStateId = "ovlstate" + OvlDataVersion
//@ts-ignore
export const PersistTimestampId = "ovltimestamp" + OvlDataVersion
//@ts-ignore
export const HasOfflineMode = !!window.indexedDB && !!OvlOfflineMode

// #####################################################################################################################################

import { html, render } from "lit-html"

import { IConfig, createOvermind } from "overmind"
import { state } from "./state"
import { Screen } from "./state/stateScreens"
export { Screen }
import * as actions from "./actions"
export { actions }
import * as effects from "./effects"
import onInitialize from "./onInitialize"

import { defineElements } from "./registerComponents"
defineElements()

export const config = {
  onInitialize,
  state,
  actions,
  effects
}

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}
export const overmind = createOvermind(config, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})

window.scrollTo(0, 1)

// just allow "back" functionality
// this gives us consistency across devices as well

history.pushState(null, null, document.URL)
window.addEventListener("popstate", function() {
  overmind.actions.ovl.global.NavigateBack()
  history.pushState(null, null, document.URL)
})
overmind.actions.ovl.global.InitApp()

render(
  html`
    <comp-shellbar></comp-shellbar>
    <ovl-snack> </ovl-snack>
  `,
  document.getElementById("app")
)
