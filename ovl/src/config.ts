// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
import { OvlScreen, OvlVersion, OvlState, OvlConfig, OvlActions } from "./index"
export { OvlConfig }
import { OvlAction } from "./ovlTypes"

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

export type OvlConfigType = {
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
    customInitActionPath?: (actions: OvlActions) => OvlAction
    customRehydrateActionPath?: (actions: OvlActions) => OvlAction
    handleAdditionalTranslationResultActionPath?: (
      actions: OvlActions
    ) => OvlAction
    handleGlobalRefreshActionPath?: (actions: OvlActions) => OvlAction
  }
  /*check stateCleaner in ovl global to see the possibilities of this fn*/
  saveStateCallback?: (stateToPersist: OvlState) => void
  /* sticky headers (used eg. in tableheader) are tricky. they will overlap eg. the mainmenu popup or they don't work as expected currently on ios mobile 
     thats why we have a check function to check if they should be enabled
  */
  stickyHeaderEnabled?: (state: OvlState) => {}
  fileOpenMode?: FileOpenFnType
  defaultDialogTitle?: string
  offlineFirstOnReload?: boolean
  ignoreLanguages?: boolean
}

// #####################################################################################################################################

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
