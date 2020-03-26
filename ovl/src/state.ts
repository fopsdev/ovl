import { FormsState } from "./library/forms/actions"
import { DialogState } from "./library/Dialog/Dialog"
import { Translation } from "./global/globals"
import { ScreensState } from "./library/OvlBaseElement"
import { OverlayState } from "./library/Overlay/Overlay"
import { SnackState } from "./library/Snack/Snack"

import { screens } from "./index"

let forms: FormsState = undefined

let indicator = {
  open: true,
  refCounter: 1
}

let snacks: { [key: string]: SnackState } = {}

let dialog: DialogState = undefined

let availableLanguages: string[] = []
let translations: Translation = {}
let apiUrl = ""

let nav: ScreensState = {
  nextScreen: undefined,
  currentScreen: undefined,
  screensHistory: [],
  formTypeToReset: undefined,
  formIdToReset: undefined
}

let overlay: OverlayState = { open: false, closing: false }
let overlay2: OverlayState = { open: false, closing: false }

type User = {
  token: string
}

let user: User = { token: "" }

export const state = {
  ovl: {
    user,
    language: {
      language: "",
      availableLanguages,
      translations,

      showTranslationKeys: false
    },
    uiState: {
      hasOSReducedMotion: false,
      isDemo: false,
      isMobile: false,
      isTouch: false,
      isIOS: false,
      isReady: false,
      stateSavedReason: ""
    },
    apiUrl,
    libState: {
      dialog,
      snacks,
      indicator,
      overlay,
      overlay2
    },
    screens: {
      screens: screens,
      nav,
      screenState: undefined
    },
    forms
  }
}
