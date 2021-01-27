// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
import { OvlScreen, OvlState, OvlConfig, OvlActions } from "./index"
export { OvlConfig }
import { OvlAction } from "./index"

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
    version: string
    isDev: boolean
    offlineMode: boolean
    showSaveOrigin: boolean
    persistStateId: string
    persistTimestampId: string
  }
  app: {
    dialogs: {}
    forms: {}
    tableDefIds: {}
    languages: {}
    screens: {}
  }
  // makes handling of server error message and sync stuff easier
  fetchDefaultParams?: {
    lang: boolean
    clientId: boolean
  }
  initialScreen?: OvlScreen
  apiUrl: Init
  /*actions that will be used from base but needs to be defined per app*/
  hookInActions: {
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
