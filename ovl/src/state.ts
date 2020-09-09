import { FormsState } from "./library/forms/actions"
import { ModalDialogState } from "./library/Dialog/Dialog"
import { Translation } from "./global/globals"
import { ScreensState } from "./library/OvlBaseElement"

import { SnackState } from "./library/Snack/Snack"
import { OvlDialog } from "./index"
import { DialogsState } from "./library/Dialog/OvlDialogBase"

let forms: FormsState = undefined

let indicator = {
  open: true,
  refCounter: 1,
}

let snacks: { [key: string]: SnackState } = {}

let dialog: ModalDialogState = undefined

let translations: Translation = {}
let apiUrl = ""

let screens: ScreensState = {
  // screens prop will be prepared from script
  screens: undefined,
  nav: {
    nextScreen: undefined,
    currentScreen: undefined,
    screensHistory: [],
    formTypeToReset: undefined,
    formIdToReset: undefined,
  },
}

type User = {
  token: string
  role: string
  clientId: string
  loginCounter: number
}

let user: User = { token: "", clientId: "", role: "", loginCounter: 0 }

let language = {
  language: "",
  translations,
  showTranslationKeys: false,
  isReady: false,
}

let uiState = {
  hasOSReducedMotion: false,
  isDemo: false,
  isMobile: false,
  isTouch: false,
  isIOS: false,
  isReady: false,

  stateSavedReason: "",
  tableNeedsRebuild: false,
}

let libState = {
  dialog,
  snacks,
  indicator,
}

let app = {
  offline: false,

  discCacheVersion: Date.now(),
}

let dialogs: { [key in OvlDialog]?: DialogsState } = {}

export {
  app,
  user,
  language,
  uiState,
  apiUrl,
  libState,
  screens,
  forms,
  dialogs,
}
