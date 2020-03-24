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

import { html, render } from "../../ovl/node_modules/lit-html"
import { createOvermind } from "../../ovl/node_modules/overmind"
import { config as ovlconfig } from "../../ovl/src/init"

export const overmind = createOvermind(ovlconfig, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})

window.scrollTo(0, 1)

overmind.actions.ovl.internal.InitApp()

render(
  html`
    <comp-shellbar></comp-shellbar>
    <ovl-snack> </ovl-snack>
  `,
  document.getElementById("app")
)
