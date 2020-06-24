import { FormsState } from "./library/forms/actions"
import { ModalDialogState } from "./library/Dialog/Dialog"
import { Translation } from "./global/globals"
import { ScreensState } from "./library/OvlBaseElement"
import { OverlayState } from "./library/Overlay/Overlay"
import { SnackState } from "./library/Snack/Snack"
import { screens as screensState, DialogType } from "./index"
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
  loginCounter: number
}

let user: User = { token: "", customId: "", role: "", loginCounter: 0 }

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
let dialogs: { [key in DialogType]?: DialogsState } = {
  Login: {
    isClosing: false,
    visible: false,
    elementIdToFocusAfterOpen: "loginformuser",
  },
  Modal: { isClosing: false, visible: false },
  TableHeaderMenu: { isClosing: false, visible: false },
}

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
