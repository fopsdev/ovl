// ######## manage global config stuff here ###################################################################################################
//@ts-ignore

export type Init = {
  customerTestUrlMatch: string
  customerTestUrl: string
  customerRealUrlMatch: string
  customerRealUrl: string
  itfliesServerUrlMatch: string
  itfliesServerUrl: string
  devServer: string
}

export type OvlConfig = {
  _system: {
    Version: string
    IsDev: boolean
    OfflineMode: boolean
    DataVersion: string
    ShowSaveOrigin: boolean
    PersistStateId: string
    PersistTimestampId: string
  }
  apiUrl: Init
  /*actions that will be used from base but needs to be defined per app*/
  requiredActions: {
    loginActionPath: string
    forgotPwActionPath: string
  }
  /*key will be parentkey to check and value will be currentkey (saveState needs the parent key and the current key to identify ignored state)*/
  saveStateIgnores: { [key: string]: string }
  /* all screens which can be navigated to */
  screens: {}
}

import { state } from "./state"
import * as actions from "./actions"
export { actions }
import * as effects from "./effects"
import onInitialize from "./onInitialize"
import { defineElements } from "./registerComponents"
import { IConfig } from "overmind"
import { screens, BaseScreen } from "./state/stateScreens"
defineElements()

export const baseOvermindConfig = {
  onInitialize,
  state,
  actions,
  effects
}

export type Screen = BaseScreen

let dataVersion = "1"
export let OvlConfig: OvlConfig = {
  _system: {
    Version: "0.5",
    IsDev: true,
    OfflineMode: false,
    DataVersion: dataVersion,
    ShowSaveOrigin: true,
    PersistStateId: "ovlstate" + dataVersion,
    PersistTimestampId: "ovltimestamp" + dataVersion
  },
  apiUrl: undefined,
  requiredActions: undefined,
  saveStateIgnores: undefined,
  screens
}
// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
if (window.OvlOfflineMode) {
  //@ts-ignore
  OvlConfig._system.OfflineMode = window.OvlOfflineMode
}
//@ts-ignore
if (window.OvlDataVersion) {
  //@ts-ignore
  OvlConfig._system.DataVersion = window.OvlDataVersion
}
//@ts-ignore
if (window.OvlIsDev) {
  //@ts-ignore
  OvlConfig._system.IsDev = window.OvlIsDev
}
//@ts-ignore
if (window.OvlShowSaveOrigin) {
  //@ts-ignore
  OvlConfig._system.ShowSaveOrigin = window.OvlShowSaveOrigin
}
//@ts-ignore
if (window.OvlVersion) {
  //@ts-ignore
  OvlConfig._system.Version = window.OvlVersion
}
OvlConfig._system.PersistStateId = "ovlstate" + OvlConfig._system.DataVersion
OvlConfig._system.PersistTimestampId =
  "ovltimestamp" + OvlConfig._system.DataVersion
// #####################################################################################################################################
