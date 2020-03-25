import { FormsState } from "./library/forms/actions"

import { IndicatorState } from "./library/Indicator/Indicator"
import { DialogState } from "./library/Dialog/Dialog"

import { TableData } from "./library/Table/Table"
import { tblTranslation } from "./screens/Translation/state"
import { Translation, T } from "./global/globals"
import { ScreensState } from "./library/OvlBaseElement"
//import { screens } from "./state/stateScreens"
import { OverlayState } from "./library/Overlay/Overlay"
import { tblAudit } from "./library/Audit/state"
import { SnackState } from "./library/Snack/Snack"

//@ts-ignore
let forms: FormsState = {}

let indicator: IndicatorState = {
  open: true,
  refCounter: 1
}

let snacks: { [key: string]: SnackState } = {}

let dialog: DialogState = {
  cancelText: "Cancel",
  okText: "Ok",
  text: "This is a \ndialog",
  visible: false,
  closing: false,
  result: undefined,
  default: 1
}

type BaseRole = "User" | "Admin"
type Language = "DE" | "FR"
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

type User = {
  userName: string
  language: Language
  firstName: string
  lastName: string
  token: string
  role: BaseRole
  features: any
  userCode: number
}

let user: User

let overlay: OverlayState = { open: false, closing: false }
let overlay2: OverlayState = { open: false, closing: false }
export const state = {
  ovl: {
    language: {
      language: "",
      availableLanguages,
      translations,
      tables: {
        translations: <TableData>{
          data: {},
          schema: {},
          tableDef: {
            translation: tblTranslation
          }
        }
      },
      showTranslationKeys: false
    },
    audit: {
      tables: {
        audit: <TableData>{
          data: {},
          schema: {},
          tableDef: {
            audit: tblAudit
          }
        }
      }
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
    user,
    libState: {
      dialog,
      snacks,
      indicator,
      overlay,
      overlay2
    },
    screens: {
      screens: undefined,
      nav,
      screenState: { Login: { visible: true, closing: false } }
    },
    forms
  }
}
