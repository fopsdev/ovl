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

type FileOpenFnType = (anchor: HTMLAnchorElement, fileName: string) => void

type OvlConfig = {
  _system: {
    debugTracking: boolean
    fetchTimeout: number
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
    customRehydrateActionPath: OvlAction
    handleAdditionalTranslationResultActionPath: OvlAction
    handleGlobalRefreshActionPath: OvlAction
  }
  /*check stateCleaner in ovl global to see the possibilities of this fn*/
  saveStateCallback: (stateToPersist: OvlState) => void
  /* sticky headers (used eg. in tableheader) are tricky. they will overlap eg. the mainmenu popup or they don't work as expected currently on ios mobile 
     thats why we have a check function to check if they should be enabled
  */
  stickyHeaderEnabled: (state: OvlState) => {}
  fileOpenMode: FileOpenFnType
  defaultDialogTitle?: string
  offlineFirstOnReload?: boolean
}

import { OvlState, OvlAction } from "./index"

// #####################################################################################################################################

let OvlConfig: OvlConfig = {
  _system: {
    debugTracking: false,
    fetchTimeout: 5000,
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
  fileOpenMode: (anchor, fileName) => {
    // sample if file should be downloaded
    // anchor.download=fileName
  },
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
OvlConfig._system.Version = OvlVersion
OvlConfig._system.PersistStateId = "ovlstate" + OvlConfig._system.Version
OvlConfig._system.PersistTimestampId =
  "ovltimestamp" + OvlConfig._system.Version
export { OvlConfig }
