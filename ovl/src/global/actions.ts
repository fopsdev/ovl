import { OvlScreen, ovl, OvlState, OvlActions, OvlConfig } from "../index"
import { ApiUrlResolve, OvlConfigType } from "../config"
import { DialogOk, DialogOkCancel, SnackAdd } from "../library/helpers"
import {
  // FileInfoStore,
  // fileStore,
  // FileStore,
  //fileStoreInfo,
  stateStore,
} from "../offlineStorage"
import {
  hasOSReducedMotion,
  isIOS,
  isMobile,
  isTouch,
  logout,
  ResetT,
  saveState,
  ShowFile,
} from "./globals"
import {
  ScreenNavigateIn,
  ScreenNavigateIn_ReturnType,
  ScreenNavigateOut,
} from "./hooks"
import { setLastScrollPosition } from "../library/OvlBaseElement"
import { createDeepProxy } from "../tracker/proxyHandler"
import { OvlAction } from "../index"

export const SetLastScrollPosition: OvlAction = (_, { state }) => {
  setLastScrollPosition(state.ovl.screens)
}

export const NavigateTo: OvlAction<OvlScreen> = async (
  value,
  { state, actions, effects }
) => {
  if (state.ovl.screens.nav.currentScreen !== value) {
    let fn = actions.custom.screens
    if (fn) {
      let currentScreen: OvlScreen = state.ovl.screens.nav.currentScreen
      setLastScrollPosition(state.ovl.screens)
      if (fn[currentScreen] && fn[currentScreen][ScreenNavigateOut]) {
        let navErrorMessage = <string>(
          await fn[currentScreen][ScreenNavigateOut]()
        )
        if (navErrorMessage) {
          if (navErrorMessage.toLowerCase() === "error") {
            SnackAdd(navErrorMessage, "Error")
          }
          return
        }
      }
    }

    if (fn[value] && fn[value][ScreenNavigateIn]) {
      let fn2 = fn[value][ScreenNavigateIn]
      let navErrorMessage = await fn2()
      if (navErrorMessage) {
        if (navErrorMessage.toLowerCase() === "error") {
          SnackAdd(navErrorMessage, "Error")
        }
        return
      }
    }

    state.ovl.screens.nav.nextScreen = value

    let foundIndex = -1
    for (let z = 0; z < state.ovl.screens.nav.screensHistory.length; z++) {
      if (state.ovl.screens.nav.screensHistory[z] === value) {
        foundIndex = z
        break
      }
    }
    if (foundIndex !== -1) {
      state.ovl.screens.nav.screensHistory.splice(foundIndex, 1)
    }
    state.ovl.screens.nav.screensHistory.push(value)

    document.getElementById("app").focus()
    if (!state.ovl.screens.nav.currentScreen) {
      //@ts-ignore
      state.ovl.screens.nav.currentScreen = OvlConfig.initialScreen
      if (!state.ovl.screens.nav.currentScreen) {
        state.ovl.screens.nav.currentScreen = value
      }
      SetVisibleScreen(state, value)
    } else {
      SetClosingScreen(actions, state, state.ovl.screens.nav.currentScreen)
    }
  }
}

export const NavigateBack: OvlAction = async (
  _,
  { state, actions, effects }
) => {
  if (state.ovl.screens.nav.screensHistory.length > 1) {
    let fn = actions.custom.screens
    if (fn) {
      let currentScreen = state.ovl.screens.nav.currentScreen
      if (currentScreen) {
        // get the first scrollable class of the doc
        let o = state.ovl.screens.screens[currentScreen]

        let scrollable

        if (isMobile()) {
          scrollable = document.querySelector(".scrollableMobile")
        } else {
          scrollable = document.querySelector(".scrollable")
        }

        // and remember the scroll pos
        if (scrollable) {
          o.lastScrollTop = scrollable.scrollTop
        }
        if (fn[currentScreen] && fn[currentScreen][ScreenNavigateOut]) {
          let navErrorMessage = await fn[currentScreen][ScreenNavigateOut]()
          if (navErrorMessage) {
            if (navErrorMessage.toLowerCase() === "error") {
              SnackAdd(navErrorMessage, "Error")
            }
            return
          }
        }
      }
      let nextScreen =
        state.ovl.screens.nav.screensHistory[
          state.ovl.screens.nav.screensHistory.length - 2
        ]
      if (nextScreen) {
        if (fn[nextScreen] && fn[nextScreen][ScreenNavigateIn]) {
          let navErrorMessage = <string>await fn[nextScreen][ScreenNavigateIn]()
          if (navErrorMessage) {
            if (navErrorMessage.toLowerCase() === "error") {
              SnackAdd(navErrorMessage, "Error")
            }
            return
          }
        }
      }
    }

    state.ovl.screens.nav.screensHistory.pop()
    let screen =
      state.ovl.screens.nav.screensHistory[
        state.ovl.screens.nav.screensHistory.length - 1
      ]
    if (screen) {
      state.ovl.screens.nav.nextScreen = screen
      SetClosingScreen(actions, state, state.ovl.screens.nav.currentScreen)
    }
  }
  //}
}

const SetClosingScreen = (
  actions: OvlActions,
  state: OvlState,
  value: OvlScreen
) => {
  if (value !== undefined) {
    if (!hasOSReducedMotion()) {
      state.ovl.screens.screens[value].closing = true
    } else {
      actions.ovl.internal.SetVisible(value)
    }
  }
}

const SetVisibleScreen = async (state: OvlState, value: OvlScreen) => {
  state.ovl.screens.screens[value].visible = true
  state.ovl.screens.screens[value].closing = false
}

export const SetVisible: OvlAction<OvlScreen> = (value, { state, actions }) => {
  state.ovl.screens.screens[value].visible = false
  state.ovl.screens.screens[value].closing = false
  state.ovl.screens.nav.currentScreen = state.ovl.screens.nav.nextScreen
  // check if there is a form to reset
  if (state.ovl.screens.nav.formTypeToReset) {
    let formTypeToReset = state.ovl.screens.nav.formTypeToReset
    let formIdToReset = state.ovl.screens.nav.formIdToReset
    setTimeout(() => {
      actions.ovl.form.ResetForm(
        state.ovl.forms[formTypeToReset][formIdToReset]
      )
    }, 10)
    state.ovl.screens.nav.formTypeToReset = undefined
  }
  SetVisibleScreen(state, state.ovl.screens.nav.currentScreen)

  // state.ovl.uiState.stateSavedFrom = "screen"

  // saveState()
}

export const SetLanguage: OvlAction<string, Promise<boolean>> = async (
  value,
  { state, actions, effects }
) => {
  let lang = value
  let res = await effects.ovl.postRequest(
    state.ovl.apiUrl + "users/translations",
    {
      language: lang,
    }
  )
  if (res.data) {
    ResetT()
    state.ovl.language.translations = res.data.translations
    state.ovl.language.language = res.data.lang
    // also set body lang fro screenreaders, spellcheck, etc
    let body = document.getElementsByTagName("body")[0]
    let langCode
    switch (res.data.lang) {
      case "DE":
        langCode = "de-CH"
        break
      case "FR":
        langCode = "fr-CH"
        break
    }
    body.setAttribute("lang", langCode)
    if (OvlConfig.translation) {
      let fn = OvlConfig.translation.handleAdditionalTranslationResultActionPath
      if (fn) {
        fn(actions)(res.data)
      }
    }
    localStorage.setItem("PortalLanguage", res.data.lang)
    return true
  }
  return false
}

export const SetTableNeedsRebuild: OvlAction<boolean> = (value, { state }) => {
  state.ovl.uiState.tableNeedsRebuild = value
}

export const Logout: OvlAction = async (_, { state, actions }) => {
  if (state.ovl.app.offline && OvlConfig.offline.enabled) {
    SnackAdd(
      "Abmelden und Neuinitialisierung nur im Onlinemodus möglich!",
      "Error"
    )
    return
  }
  if (
    (await DialogOkCancel({ text: "Wollen Sie sich wirklich abmelden?" })) === 1
  ) {
    logout()
  }
}

export const AfterRehydrateApp: OvlAction = async (
  _,
  { actions, state, effects }
) => {
  // state.ovl.uiState.isReady = false
  state.ovl.libState.indicator.refCounter = 0

  // most of the following code is necessary because we still have some component state which is not handled by overmind
  // lession learned: use ovl.state wherever possible...
  // if (state.ovl.libState.overlay2.open) {
  //   await actions.ovl.internal.CloseOverlay2()
  // }
  // if (state.ovl.libState.overlay.open) {
  //   await actions.ovl.internal.CloseOverlay()
  // }

  state.ovl.libState.snacks = {}
  // set current screen visible, others false, just to be sure we are not in the middle of an animation
  // let screenToGo = state.ovl.screens.nav.nextScreen
  // if (!screenToGo) {
  //   screenToGo = state.ovl.screens.nav.currentScreen
  // }
  // state.ovl.screens.nav.currentScreen = screenToGo
  // state.ovl.screens.nav.nextScreen = undefined
  //actions.ovl.navigation.NavigateTo(screenToGo)
  if (OvlConfig.offline.customRehydrateActionPath) {
    OvlConfig.offline.customRehydrateActionPath(undefined)
  }
}

export const GetFile: OvlAction<{
  cat: string
  id1: string
  id2?: string
  ext?: string
}> = async (value, { actions, state, effects }) => {
  let cat = value.cat
  let id1 = value.id1
  let id2 = value.id2
  let ext = value.ext
  if (!id2) {
    id2 = ""
  }
  if (!ext) {
    ext = ""
  }

  //  let id = docNum + fileType + fileName
  if (isIOS() === true) {
    // saving state here fixes a ios handling issue when file gets opened and navigated back the page on ios safari (in standalone) reloads
    // that way it reloads to current state...
    saveState(true, "GetFile")
  }
  let res = await effects.ovl.getRequest(
    state.ovl.apiUrl + "assets/get",
    { cat, id1, id2, ext },
    true
  )

  if (res.status === 200) {
    let mimeType = res.headers["content-type"]
    // let fo: FileStore = { id, mimeType, content: res.data, fileName }
    // fileStore.set(fo)
    // let dt = new Date()
    // let foinfo: FileInfoStore = { id, lastAccess: dt, refreshed: dt }
    // fileStoreInfo.set(foinfo)
    ShowFile(res.data, mimeType, id1)
  } else if (res.status === 449) {
    //get file from store
    //let fo: FileStore = await fileStore.get(id)
    // if (fo) {
    //   if (isIOS() === true) {
    //     ShowFile(fo.content, fo.mimeType, fileName)
    //   } else {
    //     let blob = new Blob([fo.content], { type: fo.mimeType })
    //     ShowFile(blob, fo.mimeType, fileName)
    //   }
    //   let foinfo: FileInfoStore = await fileStoreInfo.get(id)
    //   foinfo.lastAccess = new Date()
    //   fileStoreInfo.set(foinfo)
    // } else {
    //   SnackAdd("File not cached", "Information")
    // }
  }
}

export const RehydrateApp: OvlAction<string, Promise<boolean>> = async (
  debugId,
  { state }
) => {
  if (debugId !== undefined || OvlConfig.offline.enabled) {
    try {
      let stateStoreId = OvlConfig._system.persistStateId
      if (debugId !== undefined) {
        stateStoreId = "Testing" + debugId
      }
      let persistedState = await stateStore.get(stateStoreId)
      if (!persistedState) {
        // clear also maybe old versions lingering around...
        stateStore.clear()
      } else {
        // go through 1st level keys and assign them

        // Object.keys(persistedState).forEach((k) => {
        //   state[k] = persistedState[k]
        // })
        mergeDeep(state, persistedState)
        state.ovl.libState.indicator.open = false
        state.ovl.libState.indicator.refCounter = 0
        return true
      }
    } catch (e) {
      console.error("Persisted Offlinedata could not be restored: ")
      console.error(e)
      return false
    }
  }
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export const Rehydrate = async (
  actions: OvlActions,
  id?: string
): Promise<boolean> => {
  try {
    if (await ovl.actions.ovl.internal.RehydrateApp(id)) {
      let fn = OvlConfig.offline.customRehydrateActionPath
      if (fn) {
        await fn(actions)()
      }

      return true
    }
  } catch (e) {
    console.log("Rehydrate Error:")
    console.log(e)
    return false
  }
  return false
}

export const InitApp: OvlAction = async (_, { actions, state, effects }) => {
  let value = OvlConfig.fetch.apiUrl
  history.pushState(null, null, document.URL)
  window.addEventListener("popstate", function (e) {
    if (!document.getElementById("ovl-dialog")) {
      ovl.actions.ovl.navigation.NavigateBack()
      history.pushState(null, null, document.URL)
    }
  })

  if (OvlConfig.fetch.useDefaultParams === undefined) {
    OvlConfig.fetch.useDefaultParams = { clientId: false, lang: false }
  }

  //ResetT()
  let currentLocation =
    window.location.hostname.toLowerCase() +
    ":" +
    window.location.port.toLowerCase()

  if (currentLocation.indexOf(value.customerTestUrlMatch) > -1) {
    state.ovl.uiState.isDemo = true
    state.ovl.apiUrl = value.customerTestUrl
  } else if (currentLocation.indexOf(value.customerRealUrlMatch) > -1) {
    state.ovl.apiUrl = value.customerRealUrl
  } else if (currentLocation.indexOf(value.itfliesServerUrlMatch) > -1) {
    state.ovl.apiUrl = value.itfliesServerUrl
  } else {
    state.ovl.uiState.isDemo = true
    state.ovl.apiUrl = value.devServer
  }

  if (OvlConfig.offline.offlineFirstOnReload) {
    console.log("Try Offline first...")
    if (await Rehydrate(actions)) {
      console.log("Offline first. Got offline data...")
      return
    }
  }

  let lang = localStorage.getItem("PortalLanguage")
  if (!(await actions.ovl.internal.SetLanguage(lang))) {
    if (!OvlConfig.offline.offlineFirstOnReload) {
      if (!(await Rehydrate(actions))) {
        //SnackAdd("No Api-Connection and no Offline data found!", "Error")
        return
      }
      console.log("Network start failed. Got offline data...")
      return
    }
  }

  // if (OvlConfig.translation && !OvlConfig.translation.doNotUse) {
  //   let lang = localStorage.getItem("PortalLanguage")
  //   let res = await effects.ovl.postRequest(
  //     state.ovl.apiUrl + "users/translations",
  //     {
  //       language: lang,
  //     }
  //   )
  //   if (!res || !res.data) {
  //     if (!OvlConfig.offline.offlineFirstOnReload) {
  //       if (!(await Rehydrate(actions))) {
  //         //SnackAdd("No Api-Connection and no Offline data found!", "Error")
  //         return
  //       }
  //       console.log("Network start failed. Got offline data...")
  //       return
  //     } else {
  //       SnackAdd("No Api-Connection!", "Error")
  //       return
  //     }
  //   }

  //   state.ovl.language.language = res.data.lang

  //   localStorage.setItem("PortalLanguage", res.data.lang)
  //   state.ovl.language.translations = res.data.translations
  //   state.ovl.language.isReady = true
  //   if (OvlConfig.translation) {
  //     let fn = OvlConfig.translation.handleAdditionalTranslationResultActionPath
  //     if (fn) {
  //       fn(actions)(res.data)
  //     }
  //   }
  //}

  state.ovl.libState.indicator.open = false
  state.ovl.libState.indicator.refCounter = 0
  // prepare login form

  let initialised = false
  if (OvlConfig.init.customInitActionPath) {
    let fn = OvlConfig.init.customInitActionPath(actions)

    if (fn) {
      //@ts-ignore
      initialised = await fn()
    }
  }
  if (!initialised) {
    if (OvlConfig.screen.initial) {
      actions.ovl.navigation.NavigateTo(OvlConfig.screen.initial)
    }
  }
}

let lastUpdateCheck: number = undefined
export const UpdateCheck = async () => {
  let now = Date.now()
  if (
    OvlConfig.offline.enabled &&
    /* updatecheck every ~3 minutes */
    (lastUpdateCheck === undefined || now - lastUpdateCheck > 60000 * 3)
  ) {
    lastUpdateCheck = now
    try {
      let updateCheck = await ovl.effects.ovl.getRequest(
        "./ovlnocache/" +
          OvlConfig._system.version.split(".").join("_") +
          ".js",
        undefined
      )
      if (updateCheck.status === 404) {
        // we need an update
        await DialogOk({ text: "Update erforderlich!\n Bitte neu anmelden!" })
        logout()
      }
    } catch (e) {}
  }
}
