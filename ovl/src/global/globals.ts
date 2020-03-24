import {
  HasOfflineMode,
  IsDev,
  overmind,
  PersistStateId,
  PersistTimestampId
} from "../index"
import { FieldFormat } from "../library/Forms/OvlFormElement"
import { stateStore } from "../offlineStorage"
import { displayFormats } from "./disiplayFormats"

export let api = { url: "" }
export let translations: Translations = { t: {} }
export let translationData = {}
export const ovltemp = "_ovltmp"
//@ts-ignore
export let OvlTimestamp = 0
export const uuidv4 = () => {
  let dt = new Date().getTime()
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export const getDateValue = (value: string, format?: FieldFormat) => {
  if (!value) {
    return ""
  }
  let fmt
  if (format) {
    switch (format) {
      case "timestamp":
        fmt = displayFormats.date.defaultTimestamp
        break
      case "2digitsYear":
        fmt = displayFormats.date._2DigitsYear
        break
    }
  }
  if (!fmt) {
    //@ts-ignore
    if (window.isMobile.phone) {
      fmt = displayFormats.date._2DigitsYear
    } else {
      fmt = displayFormats.date.default
    }
  }
  return fmt.format(new Date(value))
}
export const getDecimalValue = (value: number, format?: FieldFormat) => {
  let fmt = displayFormats.decimal.default
  if (format && format === "4digits") {
    fmt = displayFormats.decimal._4Digits
  }
  return fmt.format(value)
}

// convienience function for date values
export let D = (date: string) => {
  return getDateValue(date)
}
// convienience function for decimal values
export let N = (decimal: number) => {
  return getDecimalValue(decimal)
}
// convienience function for decimal values
export let N4 = (decimal: number) => {
  return getDecimalValue(decimal, "4digits")
}

//ISO8601
export const GetWeekNr = (dt: Date) => {
  var tdt = new Date(dt.valueOf())
  var dayn = (dt.getDay() + 6) % 7
  tdt.setDate(tdt.getDate() - dayn + 3)
  var firstThursday = tdt.valueOf()
  tdt.setMonth(0, 1)
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7))
  }
  //@ts-ignore
  return 1 + Math.ceil((firstThursday - tdt) / 604800000)
}

export const addGlobalPersistEventListeners = () => {
  // its all about saving state to restore it when needed
  // ...
  window.addEventListener("beforeunload", e => beforeUnload(e))
  // window.addEventListener("pagehide", e => pageHide(e))
  // window.addEventListener("unload", e => pageHide(e))
  document.addEventListener("visibilitychange", visibilityChange)
  document.addEventListener("focusout", e => focusOut(e))
}

// export const pageHide = async event => {
//   if (HasOfflineMode) {
//     overmind.actions.ovl.internal.SetStateSaveRemark("pageHide")
//     await saveState()§
//   }
// }

export const focusOut = async event => {
  if (HasOfflineMode) {
    if (!event.relatedTarget) {
      await saveState(false, "FocusOut")
    }
  }
}

export const beforeUnload = async event => {
  if (
    !IsDev &&
    //@ts-ignore
    HasOfflineMode &&
    !logoutAndClearFlag &&
    !gotoFileFlag
  ) {
    event.preventDefault()
    let dt = Date.now()
    let st: number = OvlTimestamp
    if (dt - st > 5000) {
      event.returnValue = translations.t.AppQuitMessage
    }

    await saveState(false, "unload")
    overmind.actions.ovl.snack.AddSnack({
      durationMs: 3000,
      text: "Sie können das Fenster jetzt schliessen...",
      type: "Information"
    })
  }
}

export const visibilityChange = async event => {
  if (HasOfflineMode) {
    // fires when user switches tabs, apps, goes to homescreen, etc.
    //@ts-ignore
    if (
      document.visibilityState === "hidden" ||
      //@ts-ignore
      document.visibilityState === "unloaded"
    ) {
      saveState(false, "Visibility")
    }
    if (
      overmind.state.ovl.uiState.isIOS &&
      document.visibilityState === "visible"
    ) {
      // rehydrate state here on ios. eg. switching from standalone app to a downloaded doc and back needs to rehydrate on ios (not on android,chrome)
      await overmind.actions.ovl.internal.RehydrateAndUpdateApp()
    }
  }
}

//export let ovlstatetimestamp: number = 0
let saveReason = ""
export const saveState = async (force: boolean, reason: string) => {
  if (HasOfflineMode && !logoutAndClearFlag) {
    saveReason = reason
    if (overmind.state.ovl.screens.nav.currentScreen !== "Login") {
      let td: Date = await stateStore.get(PersistTimestampId)
      let ts
      if (td !== undefined) {
        ts = td.getTime()
      }
      let dt = Date.now()
      if (force || ts === undefined || dt - ts > 5000) {
        await stateStore.set(PersistTimestampId, new Date(dt))
        OvlTimestamp = dt
        // let refstate = overmind.state
        let newObj = {}
        // let dtStart = Date.now()
        stateCleaner(overmind.state, newObj, "state")
        // let dtEnd = Date.now()
        // console.log("stateCleaner " + ((dtEnd - dtStart) / 1000).toString())
        // dtStart = Date.now()
        // let t = JSON.stringify(refstate)
        // dtEnd = Date.now()
        // console.log("stringify " + ((dtEnd - dtStart) / 1000).toString())
        stateStore.set(PersistStateId, newObj)
      }
    }
  }
}
let logoutAndClearFlag = false
let gotoFileFlag = false

export const logout = async () => {
  // window.removeEventListener("unload", e => unload(e))
  overmind.actions.ovl.indicator.SetIndicatorOpen()
  if (HasOfflineMode) {
    window.removeEventListener("beforeunload", e => beforeUnload(e))
    // window.removeEventListener("pagehide", e => pageHide(e))
    // window.removeEventListener("unload", e => pageHide(e))
    document.removeEventListener("visibilitychange", visibilityChange)
    document.removeEventListener("focusout", e => focusOut(e))
  }
  try {
    // 1. unregister sw
    let regs = await navigator.serviceWorker.getRegistrations()
    if (regs) {
      await Promise.all(regs.map(async reg => reg.unregister()))
    }
    // 2. get rid of any indexeddb state
    await stateStore.clear()
    // 3. get rid of any cached static assets
    let cacheKeys = await caches.keys()
    await Promise.all(cacheKeys.map(cacheName => caches.delete(cacheName)))
  } catch (e) {}

  logoutAndClearFlag = true
  //@ts-ignore
  window.location.reload()
}

export const stateCleaner = (
  state: typeof overmind.state,
  newObj,
  parentKey: string
) => {
  Object.keys(state).forEach(key => {
    // Get this value and its type
    let value = state[key]
    let valuetype = typeof value
    if (value !== undefined) {
      //<IGNORES>
      // we don't want huge audit data in local storage (but we want the def)
      if (key === "audit" && value.data) {
        newObj[key] = {
          data: {},
          schema: {},
          // do stringify here because it also strips out symbols..
          tableDef: JSON.parse(JSON.stringify(value.tableDef))
        }
        return
      } else if (parentKey === "uiState" && key === "isReady") {
        newObj[key] = false
        return
      } else if (parentKey === "uiState" && key === "headerSelected") {
        newObj[key] = ""
        return
      } else if (parentKey === "uiState" && key === "stateSavedReason") {
        newObj[key] = saveReason
        return
      }
    }
    // we don't want symbols (causes troubles anyway with indexeddb serializer in some cases)
    if (valuetype === "symbol") {
      return
    }
    //</IGNORES>

    if (valuetype === "object") {
      if (value !== null) {
        let no
        if (Array.isArray(value)) {
          no = newObj[key] = []
        } else {
          no = newObj[key] = {}
        }
        stateCleaner(value, no, key)
      } else {
        newObj[key] = null
      }
    } else {
      newObj[key] = value
    }
  })
}

export const ShowFile = (blob, type, fileName) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  //var blob = new Blob([origblob], { type })
  //@ts-ignore
  window.URL = window.URL || window.webkitURL

  let anchor = document.createElement("a")
  anchor.href = window.URL.createObjectURL(blob)

  anchor.textContent = "dummy"
  anchor.style.display = "none"
  if (!overmind.state.ovl.uiState.isIOS) {
    anchor.download = fileName
    anchor.target = "_blank"
  }
  document.body.appendChild(anchor)
  gotoFileFlag = true
  anchor.click()
  gotoFileFlag = false

  if (!overmind.state.ovl.uiState.isIOS) {
    overmind.actions.ovl.snack.AddSnack({
      text: "File has been downloaded",
      durationMs: 5000,
      type: "Success"
    })
  }
}

let TCache = new Map()
export const ResetT = () => {
  TCache = new Map()
}
export const T = (key: string, reps?: string[]): string => {
  // check for mobile key and use translation for mobile users to get shorter translations if applicable (key_M)
  //@ts-ignore
  if (window.isMobile.phone) {
    let mobileKey = key + "_M"
    if (overmind.state.ovl.language.translations[mobileKey]) {
      key = mobileKey
    }
  }
  let cacheKey = key
  if (reps) {
    cacheKey += reps.join()
  }
  let cacheRes = TCache.get(cacheKey)
  if (cacheRes !== undefined) {
    return cacheRes
  }
  let str = overmind.state.ovl.language.translations[key]
  if (str === undefined || str === null) {
    if (overmind.state.ovl.uiState.isReady) {
      console.log("Ovl Translations: key " + key + " not found")
    }
    return ""
  }
  if (str.split("{").length !== str.split("}").length) {
    return str + " invalid{}"
  }
  let hashRes = new Set()
  try {
    str
      .split("{")
      .filter(f => f.indexOf("}") > -1)
      .map(m => m.substring(0, m.indexOf("}")))
      .forEach(s => {
        hashRes.add(s)
      })
    hashRes.forEach((s: string) => {
      let key: string = ""
      if (s.startsWith("T.")) {
        // its a translation itself eg. {T.AppMandatoryHint}
        key = s.substring(2)
        //console.log("found translation key: " + key)
        str = str.split("{" + s + "}").join(T(key, reps))
      } else if (s.startsWith("V.")) {
        // its a data point in state.sub.subscription - tree....eg. {V.OCRD.CardName, or V.DS_OSUB.U_YearFee}
        key = s.substring(2)
        //console.log("found variable key: " + key)
        let data = resolvePath(translationData, key, " not found ")
        str = str.split("{" + s + "}").join(data)
      } else {
        // needs to be a {0}, or {1}, ....
        // so use the replaces array parameter
        str = str.split("{" + s + "}").join(reps[parseInt(s)])
      }
    })
    TCache.set(cacheKey, str)
    return str
  } catch (e) {
    console.log(e)
    return "error in translation string: " + str
  }
}

const resolvePath = (object, path, defaultValue) =>
  path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object)

type Translations = {
  t: Translation
}

export type Variable = {
  [key: string]: string
}

export type Translation = {
  [key: string]: string
}

export interface IAttachmentDownload {
  FileName: string
}
export interface IAttachmentUpload {
  //File: IFormFile
  DocEntry: number
  FileType: string
}
