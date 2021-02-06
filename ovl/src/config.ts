// ######## manage global config stuff here ###################################################################################################
//@ts-ignore
import {
  OvlScreen,
  OvlState,
  OvlConfig,
  OvlActions,
  OvlFormValidationValidators,
} from "./index"
export { OvlConfig }
import { OvlAction } from "./index"
import { Field } from "./library/Forms/actions"
import { FormValidation, FormValidationField } from "./library/Forms/validators"
import { OvlScreenBatchingOption } from "./library/OvlBaseElement"

export type ApiUrlResolve = {
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
  formValidation: {
    validators?: { [key in OvlFormValidationValidators]: FormValidationField }
    validationDefaults: (tableDefId?: string) => FormValidation
    validatorsFunctions: {
      [key in OvlFormValidationValidators]: (
        field: Field,
        validation: FormValidationField,
        val?: any
      ) => boolean
    }
  }
  fetch: {
    useFetchDefaultParams?: {
      lang: boolean
      clientId: boolean
    }
    apiUrl: ApiUrlResolve
    fileOpenMode?: FileOpenFnType
  }
  screen: {
    initialScreen: OvlScreen
    defaultScreenBatching?: () => OvlScreenBatchingOption
  }

  /*actions that will be used from base but needs to be defined per app*/
  translation?: {
    ignoreLanguages?: boolean
    handleAdditionalTranslationResultActionPath?: (
      actions: OvlActions
    ) => OvlAction
  }

  init: {
    customInitActionPath?: (actions: OvlActions) => OvlAction
  }
  offline?: {
    customRehydrateActionPath?: (actions: OvlActions) => OvlAction
    saveStateCallback?: (stateToPersist: OvlState) => void
    offlineFirstOnReload?: boolean
  }
  /*check stateCleaner in ovl global to see the possibilities of this fn*/

  /* sticky headers (used eg. in tableheader) are tricky. they will overlap eg. the mainmenu popup or they don't work as expected currently on ios mobile 
     thats why we have a check function to check if they should be enabled
  */
  global: {
    stickyHeaderEnabled?: (state: OvlState) => {}
    defaultDialogTitle: string
    handleGlobalRefreshActionPath?: (actions: OvlActions) => OvlAction
  }
}
