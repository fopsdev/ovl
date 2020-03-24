// ######## manage global config stuff here ###################################################################################################
//@ts-ignore

type OvlConfig = {
  Version: string
  IsDev: boolean
  OfflineMode: boolean
  DataVersion: string
  ShowSaveOrigin: boolean
  PersistStateId: string
  PersistTimestampId: string
}

import { state } from "./state"
import * as actions from "./actions"
export { actions }
import * as effects from "./effects"
import onInitialize from "./onInitialize"
import { defineElements } from "./registerComponents"
import { IConfig } from "overmind"
defineElements()

export type Init = {
  customerTestUrlMatch: string
  customerTestUrl: string
  customerRealUrlMatch: string
  customerRealUrl: string
  itfliesServerUrlMatch: string
  itfliesServerUrl: string
  devServer: string
}

export const config = {
  onInitialize,
  state,
  actions,
  effects
}

let dataVersion = "1"
export let ovlBaseConfig: OvlConfig = {
  Version: "0.5",
  IsDev: true,
  OfflineMode: false,
  DataVersion: dataVersion,
  ShowSaveOrigin: true,
  PersistStateId: "ovlstate" + dataVersion,
  PersistTimestampId: "ovltimestamp" + dataVersion
}
// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
if (window.OvlOfflineMode) {
  //@ts-ignore
  ovlBaseConfig.OfflineMode = window.OvlOfflineMode
}
//@ts-ignore
if (window.OvlDataVersion) {
  //@ts-ignore
  ovlBaseConfig.DataVersion = window.OvlDataVersion
}
//@ts-ignore
if (window.OvlIsDev) {
  //@ts-ignore
  ovlBaseConfig.IsDev = window.OvlIsDev
}
//@ts-ignore
if (window.OvlShowSaveOrigin) {
  //@ts-ignore
  ovlBaseConfig.ShowSaveOrigin = window.OvlShowSaveOrigin
}
//@ts-ignore
if (window.OvlVersion) {
  //@ts-ignore
  ovlBaseConfig.Version = window.OvlVersion
}
ovlBaseConfig.PersistStateId = "ovlstate" + ovlBaseConfig.DataVersion
ovlBaseConfig.PersistTimestampId = "ovltimestamp" + ovlBaseConfig.DataVersion
// #####################################################################################################################################

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}
