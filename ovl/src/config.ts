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
    version: string
    isDev: boolean
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
    useDefaultParams?: {
      lang: boolean
      clientId: boolean
    }
    apiUrl: ApiUrlResolve
    fileOpenMode?: FileOpenFnType
    timeout: number
  }
  screen: {
    initial: OvlScreen
  }

  /*actions that will be used from base but needs to be defined per app*/
  translation?: {
    doNotUse?: boolean
    handleAdditionalTranslationResultActionPath?: (
      actions: OvlActions
    ) => OvlAction
  }

  init: {
    customInitActionPath?: (actions: OvlActions) => OvlAction
  }
  offline?: {
    enabled: boolean
    customRehydrateActionPath?: (actions: OvlActions) => OvlAction
    /*if there is state which shouldnt be persisted just delete it off here*/
    saveStateCallback?: (stateToPersist: OvlState) => void
    offlineFirstOnReload?: boolean
  }
  global: {
    /* sticky headers (used eg. in tableheader) are tricky. they will overlap eg. the mainmenu popup or they don't work as expected currently on ios mobile 
     thats why we have a check function to check if they should be enabled
  */
    stickyHeaderEnabled?: (state: OvlState) => {}
    defaultDialogTitle: string
    handleGlobalRefreshActionPath?: (actions: OvlActions) => OvlAction
  }
}
