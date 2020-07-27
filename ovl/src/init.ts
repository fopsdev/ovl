// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
import { OvlScreen, OvlVersion } from "./index"

export type Init = {
  customerTestUrlMatch: string
  customerTestUrl: string
  customerRealUrlMatch: string
  customerRealUrl: string
  itfliesServerUrlMatch: string
  itfliesServerUrl: string
  devServer: string
}

type OvlConfig = {
  _system: {
    Version: string
    IsDev: boolean
    OfflineMode: boolean
    ShowSaveOrigin: boolean
    PersistStateId: string
    PersistTimestampId: string
  }
  initialScreen?: OvlScreen
  apiUrl: Init
  /*actions that will be used from base but needs to be defined per app*/
  requiredActions: {
    customInitActionPath: OvlAction
    customAfterRehydrateActionPath: OvlAction
    handleAdditionalTranslationResultActionPath: OvlAction
    handleGlobalRefreshActionPath: OvlAction
  }
  /*check stateCleaner in ovl global to see the possibilities of this fn*/
  saveStateCallback: (parentKey: string, key: string, obj: any) => {}
  /* sticky headers (used eg. in tableheader) are tricky. they will overlap eg. the mainmenu popup or they don't work as expected currently on ios mobile 
     thats why we have a check function to check if they should be enabled
  */
  stickyHeaderEnabled: (state: OvlState) => {}
  defaultDialogTitle?: string
}

import { OvlState, OvlAction } from "./index"

// #####################################################################################################################################

let OvlConfig: OvlConfig = {
  _system: {
    Version: "0.5",
    IsDev: false,
    OfflineMode: false,
    ShowSaveOrigin: true,
    PersistStateId: "ovlstate",
    PersistTimestampId: "ovltimestamp",
  },
  //@ts-ignore
  initialScreen: "",
  apiUrl: undefined,
  requiredActions: undefined,
  saveStateCallback: undefined,
  stickyHeaderEnabled: () => false,
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
console.log("set config Version")
console.log(OvlVersion)
OvlConfig._system.Version = OvlVersion
OvlConfig._system.PersistStateId = "ovlstate" + OvlConfig._system.Version
OvlConfig._system.PersistTimestampId =
  "ovltimestamp" + OvlConfig._system.Version
export { OvlConfig }
