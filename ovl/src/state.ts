import { FormsState } from "./library/forms/actions"
import { DialogState } from "./library/Dialog/Dialog"
import { Translation } from "./global/globals"
import { ScreensState } from "./library/OvlBaseElement"
import { OverlayState } from "./library/Overlay/Overlay"
import { SnackState } from "./library/Snack/Snack"
import { screens as screensState } from "./index"

let forms: FormsState = undefined

let indicator = {
  open: true,
  refCounter: 1,
}

let snacks: { [key: string]: SnackState } = {}

let dialog: DialogState = undefined

let translations: Translation = {}
let apiUrl = ""

let nav: ScreensState = {
  nextScreen: undefined,
  currentScreen: undefined,
  screensHistory: [],
  formTypeToReset: undefined,
  formIdToReset: undefined,
}

let overlay: OverlayState = { open: false, closing: false }
let overlay2: OverlayState = { open: false, closing: false }

type User = {
  token: string
  role: string
  customId: string
}

let user: User = { token: "", customId: "", role: "" }

let language = {
  language: "",
  translations,
  showTranslationKeys: false,
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
  overlay,
  overlay2,
}

let app = {
  offline: false,
}

let screens = {
  screens: screensState,
  nav,
  screenState: undefined,
}

export { app, user, language, uiState, apiUrl, libState, screens, forms }
