import { FieldFormat } from "../library/Forms/OvlFormElement"
import { SnackAdd } from "../library/helpers"
import { stateStore } from "../offlineStorage"
import { displayFormats } from "./displayFormats"
import { ovl, OvlState, OvlConfig } from ".."
import { TemplateResult } from "lit-html"
import { Rehydrate } from "./actions"
import { OvlFormState, ValidateResultErrors } from "../library/Forms/actions"

// export let api = { url: "" }
//export let translations: Translations = { t: {} }

export let modalDialog: GlobalModalDialogState = { text: undefined }
export let translationData = {}
export const ovltemp = "_ovltmp"
export const ovloffline = "_ovloff"

// we keep in those a shortcut to ovl.state.ovl.language...
// to simplify tracking
export let languageRef: typeof ovl.state.ovl.language

type GlobalModalDialogState = {
  text: string | TemplateResult
}

export const getLocalTimestampString = (): string => {
  var tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
}

//@ts-ignore
export let OvlTimestamp = 0
export const uuidv4 = () => {
  let dt = new Date().getTime()
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

export function isTouch() {
  return "ontouchstart" in window
}

let _isMobile = undefined
export function isMobile() {
  if (_isMobile === undefined) {
    var check = false
    ;(function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
      //@ts-ignore
    })(navigator.userAgent || navigator.vendor || window.opera)
    _isMobile = check
  }
  return _isMobile
}

let _isIOS = undefined
export function isIOS() {
  if (_isIOS === undefined) {
    _isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  }
  return _isIOS
}

let _isSafari = undefined

export const isSafari = () => {
  if (_isSafari === undefined) {
    _isSafari =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
  }
  return _isSafari
}

let _isFirefox = undefined
export const isFirefox = () => {
  if (_isFirefox === undefined) {
    _isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1
  }
  return _isFirefox
}

let _hasOSReducedMotion
export function hasOSReducedMotion() {
  if (_hasOSReducedMotion === undefined) {
    const query = "(prefers-reduced-motion: reduce)"
    _hasOSReducedMotion = window.matchMedia(query).matches
  }
  return _hasOSReducedMotion
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
      case "4digitsYear":
        fmt = displayFormats.date._4DigitsYear
        break
    }
  }
  if (!fmt) {
    if (isMobile()) {
      fmt = displayFormats.date._2DigitsYear
    } else {
      fmt = displayFormats.date.default
    }
  }
  return fmt.format(new Date(value))
}
export const getDecimalValue = (value: number, format?: FieldFormat) => {
  let fmt = displayFormats.decimal.default

  if (format) {
    switch (format) {
      case "4digits":
        fmt = displayFormats.decimal._4Digits
        break
      case "3digits":
        fmt = displayFormats.decimal._3Digits
        break
      case "0digits":
        fmt = displayFormats.decimal._0Digits
        break
    }
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
  //window.addEventListener("beforeunload", (e) => beforeUnload(e))
  // window.addEventListener("pagehide", e => pageHide(e))
  // window.addEventListener("unload", e => pageHide(e))
  document.addEventListener("visibilitychange", visibilityChange)
  document.addEventListener("focusout", (e) => focusOut(e))
}

// export const pageHide = async event => {
//   event.preventDefault()
//   if (OvlConfig.offline.offlineMode) {
//     await saveState(false, "pageHide")
//   }
// }

export const focusOut = async (event) => {
  if (OvlConfig.offline.enabled) {
    if (!event.relatedTarget) {
      await saveState(false, "FocusOut")
    }
  }
}

// export const beforeUnload = async (event) => {
//   if (
//     !OvlConfig._system.IsDev &&
//     OvlConfig.offline.offlineMode &&
//     !logoutAndClearFlag &&
//     !gotoFileFlag
//   ) {
//     event.preventDefault()
//     let dt = Date.now()
//     let st: number = OvlTimestamp
//     if (dt - st > 5000) {
//       event.returnValue = translations.t.AppQuitMessage
//     }
//     await saveState(false, "unload")
//     SnackAdd("Sie können das Fenster jetzt schliessen...", "Information", 3000)
//   }
// }
export const stringifyReplacer = (key, value) =>
  typeof value === "undefined" ? null : value
export const visibilityChange = async (event) => {
  if (OvlConfig.offline.enabled) {
    // console.log(document.visibilityState)
    // fires when user switches tabs, apps, goes to homescreen, etc.
    //@ts-ignore
    if (
      document.visibilityState === "hidden" ||
      //@ts-ignore
      document.visibilityState === "unloaded"
    ) {
      if (isIOS()) {
        saveState(false, "Visibility")
      } else {
        await saveState(false, "Visibility")
      }
    }
    if (isIOS() && document.visibilityState === "visible") {
      // rehydrate state here on ios. eg. switching from standalone app to a downloaded doc and back needs to rehydrate on ios (not on android,chrome)
      await ovl.actions.ovl.internal.RehydrateApp()
    }
  }
}

//export let ovlstatetimestamp: number = 0

export const rehydrateTestState = (id?: string) => {
  if (id === undefined) {
    id = ""
  }
  Rehydrate(ovl.actions, id)
}

export const saveTestState = (id?: string) => {
  if (id === undefined) {
    id = ""
  }
  saveState(true, "test", id)
}

export const saveState = async (
  force: boolean,
  reason: string,
  testId?: string
) => {
  if (
    testId !== undefined ||
    (OvlConfig.offline.enabled &&
      !logoutAndClearFlag &&
      ovl.state.ovl.uiState.isReady)
  ) {
    //@ts-ignore

    let stateStoreId = OvlConfig._system.persistStateId
    if (testId !== undefined) {
      stateStoreId = "Testing" + testId
    }
    console.log("save state to: " + stateStoreId)
    let diff = 0
    let dt = Date.now()
    if (!force) {
      let td: Date = await stateStore.get(OvlConfig._system.persistTimestampId)
      let ts = 0
      if (td !== undefined) {
        ts = td.getTime()
      }
      diff = dt - ts
    }
    if (force || diff > 5000) {
      await stateStore.set(OvlConfig._system.persistTimestampId, new Date(dt))
      OvlTimestamp = dt
      // let refstate = ovl.state
      let newObj: OvlState = JSON.parse(
        JSON.stringify(ovl.state),
        stringifyReplacer
      )
      newObj.ovl.uiState.stateSavedReason = reason

      if (OvlConfig.offline.saveStateCallback) {
        OvlConfig.offline.saveStateCallback(newObj)
      }

      return stateStore.set(stateStoreId, newObj)
    }
  }
}
export let logoutAndClearFlag = false
export let gotoFileFlag = false

export const logout = async () => {
  // window.removeEventListener("unload", e => unload(e))
  ovl.actions.ovl.indicator.SetIndicatorOpen()
  if (OvlConfig.offline.enabled) {
    //window.removeEventListener("beforeunload", (e) => beforeUnload(e))
    // window.removeEventListener("pagehide", e => pageHide(e))
    // window.removeEventListener("unload", e => pageHide(e))
    // document.removeEventListener("visibilitychange", visibilityChange)
    // document.removeEventListener("focusout", (e) => focusOut(e))

    logoutAndClearFlag = true
    try {
      // 1. unregister sw
      let regs = await navigator.serviceWorker.getRegistrations()
      if (regs) {
        await Promise.all(regs.map(async (reg) => await reg.unregister()))
      }
      // 2. get rid of any indexeddb state
      await stateStore.clear()

      // 3. get rid of any cached static assets
      // this is no more necessary since serviceworker iutsel deletes the cache
      let cacheKeys = await caches.keys()
      await Promise.all(
        cacheKeys.map(async (cacheName) => await caches.delete(cacheName))
      )
    } catch (e) {}
    ovl.state.ovl.user.token = ""
  }
  //@ts-ignore
  //setTimeout(() => {
  window.location.reload()
  //}, 5000)

  //window.location.reload(true)
}

export const toggleDebugTracking = () => {
  if (OvlConfig._system.debugTracking) {
    OvlConfig._system.debugTracking = false
    console.log("Disabled Debug Tracking")
  } else {
    OvlConfig._system.debugTracking = true
    console.log("Enabled Debug Tracking")
  }
}

export const logState = () => {
  console.log("ovl state:")
  console.log(JSON.parse(JSON.stringify(ovl.state), stringifyReplacer))
}

export const logFormValidationErrors = () => {
  console.log("ovl forms having validation errors:")
  let forms = ovl.state.ovl.forms
  let res = []
  Object.keys(forms).forEach((f) => {
    let formInstance = forms[f]
    Object.keys(formInstance).forEach((fi) => {
      let formState: OvlFormState = forms[f][fi]

      let fieldValidation = Object.keys(formState.fields)
        .filter((f) => formState.fields[f].validationResult.errors.length > 0)
        .map((m) => {
          let res: { errors: ValidateResultErrors[] } = { errors: [] }
          res[formState.fields[m].fieldKey] = formState.fields[m]
          res["errors"] = formState.fields[m].validationResult.errors
          return res
        })
      if (
        formState.validationResult.errors.length > 0 ||
        fieldValidation.some((s) => s.errors.length > 0)
      ) {
        res.push({
          formtype: formState.formType,
          formId: formState.formId,
          formErrors: formState.validationResult.errors,
          fieldErrors: fieldValidation,
        })
      }
    })
  })
  console.log(JSON.parse(JSON.stringify(res, stringifyReplacer)))
}

export const logActions = () => {
  console.log("ovl actions:")
  console.log(ovl.actions)
}
export const logEffects = () => {
  console.log("ovl effects:")
  console.log(ovl.effects)
}

export const SetFocus = (id: string) => {
  let el: any = document.getElementById(id)

  if (el) {
    el.focus()
    if (el.value && el.setSelectionRange) {
      try {
        let val = el.value
        el.setSelectionRange(val.length, val.length)
      } catch {}
    }
  }
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
  anchor.target = "_blank"
  if (OvlConfig.fetch.fileOpenMode) {
    OvlConfig.fetch.fileOpenMode(anchor, fileName)
  }

  document.body.appendChild(anchor)
  gotoFileFlag = true
  anchor.click()
  gotoFileFlag = false

  if (anchor.download) {
    SnackAdd("File has been downloaded", "Success")
  }
}

let TCache = new Map()
export const ResetT = () => {
  TCache = new Map()
}
export const T = (key: string, reps?: string[]): string => {
  if (!languageRef) {
    languageRef = ovl.state.ovl.language
  }
  // for tracking
  // because when used cached T we still need tracking
  languageRef.translations
  languageRef.language

  // check for mobile key and use translation for mobile users to get shorter translations if applicable (key_M)
  if (isMobile()) {
    let mobileKey = key + "_M"
    if (languageRef.translations[mobileKey]) {
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
  let str = languageRef.translations[key]
  if (str === undefined || str === null) {
    str = key
    //   // if (uiState.isReady) {
    //   //   console.warn("Ovl Translations: key " + key + " not found")
    //   // }
    //   return key
  }
  if (str.split("{").length !== str.split("}").length) {
    return str + " invalid{}"
  }
  let hashRes = new Set()
  try {
    str
      .split("{")
      .filter((f) => f.indexOf("}") > -1)
      .map((m) => m.substring(0, m.indexOf("}")))
      .forEach((s) => {
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
    console.error(e)
    return "error in translation string: " + str
  }
}

export const enableBodyScroll = (state: OvlState) => {
  let el = document.getElementsByTagName("body")[0]
  if (isMobile()) {
    el.classList.remove("ovl-body-noscroll-mobile")
  } else {
    el.classList.remove("ovl-body-noscroll")
  }

  el.classList.add("ovl-body-scroll")
}

export const disableBodyScroll = (state: OvlState) => {
  let el = document.getElementsByTagName("body")[0]
  el.classList.remove("ovl-body-scroll")

  if (isMobile()) {
    el.classList.add("ovl-body-noscroll-mobile")
  } else {
    el.classList.add("ovl-body-noscroll")
  }
}

export const resolvePath = (object, path, defaultValue?) => {
  return path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object)
}

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
