import { OvlScreen, ovl, OvlState, OvlActions } from "../index"
import { Init, OvlConfig } from "../config"
import { DialogOk, DialogOkCancel, SnackAdd } from "../library/helpers"
import {
  // FileInfoStore,
  // fileStore,
  // FileStore,
  //fileStoreInfo,
  stateStore,
} from "../offlineStorage"
import {
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
import { OvlAction } from "../ovlTypes"

export const SetLastScrollPosition: OvlAction = (_, { state }) => {
  setLastScrollPosition(state)
}

export const NavigateTo: OvlAction<OvlScreen> = async (
  value,
  { state, actions, effects }
) => {
  if (state.ovl.screens.nav.currentScreen !== value) {
    let fn = actions.custom.screens
    if (fn) {
      let currentScreen: OvlScreen = state.ovl.screens.nav.currentScreen
      setLastScrollPosition(state)
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
      let fn2: () => ScreenNavigateIn_ReturnType = fn[value][ScreenNavigateIn]
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

        if (state.ovl.uiState.isMobile) {
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
    if (!state.ovl.uiState.hasOSReducedMotion) {
      state.ovl.screens.screens[value].closing = true
    } else {
      actions.ovl.internal.SetVisibleFalse(value)
    }
  }
}

const SetVisibleScreen = async (state: OvlState, value: OvlScreen) => {
  state.ovl.screens.screens[value].visible = true
  state.ovl.screens.screens[value].closing = false
}

export const SetVisibleFalse: OvlAction<OvlScreen> = (
  value,
  { state, actions }
) => {
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

export const SetLanguage: OvlAction<string> = async (
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
  ResetT()
  state.ovl.language.translations = res.data.translations
  state.ovl.language.language = res.data.lang
  if (OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath) {
    OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath(
      res.data
    )
  }
  localStorage.setItem("PortalLanguage", res.data.lang)
}

export const SetTableNeedsRebuild: OvlAction<boolean> = (value, { state }) => {
  state.ovl.uiState.tableNeedsRebuild = value
}

export const Logout: OvlAction = async (_, { state, actions }) => {
  if (state.ovl.app.offline && OvlConfig._system.OfflineMode) {
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
  if (OvlConfig.requiredActions.customRehydrateActionPath) {
    OvlConfig.requiredActions.customRehydrateActionPath(undefined)
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
  if (state.ovl.uiState.isIOS === true) {
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
    //   if (state.ovl.uiState.isIOS === true) {
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

export const RehydrateApp: OvlAction<any, Promise<boolean>> = async (
  _,
  { state }
) => {
  if (OvlConfig._system.OfflineMode) {
    try {
      let persistedState = await stateStore.get(
        OvlConfig._system.PersistStateId
      )
      if (!persistedState) {
        // clear also maybe old versions lingering around...
        stateStore.clear()
      } else {
        // go through 1st level keys and assign them
        Object.keys(persistedState).forEach((k) => {
          state[k] = persistedState[k]
        })
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

export const InitApp: OvlAction<Init> = async (
  value,
  { actions, state, effects }
) => {
  history.pushState(null, null, document.URL)
  window.addEventListener("popstate", function (e) {
    if (!document.getElementById("ovl-dialog")) {
      ovl.actions.ovl.navigation.NavigateBack()
      history.pushState(null, null, document.URL)
    }
  })
  ResetT()
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

  if (OvlConfig.offlineFirstOnReload) {
    console.log("Try Offline first...")
    if (await Rehydrate()) {
      console.log("Offline first. Got offline data...")
      return
    }
  }

  if (!OvlConfig.ignoreLanguages) {
    let lang = localStorage.getItem("PortalLanguage")
    let res = await effects.ovl.postRequest(
      state.ovl.apiUrl + "users/translations",
      {
        language: lang,
      }
    )
    if (!res || !res.data) {
      if (!OvlConfig.offlineFirstOnReload) {
        if (!(await Rehydrate())) {
          //SnackAdd("No Api-Connection and no Offline data found!", "Error")
          return
        }
        console.log("Network start failed. Got offline data...")
        return
      } else {
        SnackAdd("No Api-Connection!", "Error")
        return
      }
    }

    state.ovl.language.language = res.data.lang

    localStorage.setItem("PortalLanguage", res.data.lang)
    state.ovl.language.translations = res.data.translations
    state.ovl.language.isReady = true

    if (OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath) {
      OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath(
        res.data
      )
    }
  }

  state.ovl.libState.indicator.open = false
  state.ovl.libState.indicator.refCounter = 0
  // @ts-ignore
  state.ovl.uiState.isMobile = isMobile()
  state.ovl.uiState.isTouch = isTouch()
  state.ovl.uiState.isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  // prepare login form
  const query = "(prefers-reduced-motion: reduce)"
  state.ovl.uiState.hasOSReducedMotion = window.matchMedia(query).matches

  if (OvlConfig.requiredActions.customInitActionPath) {
    OvlConfig.requiredActions.customInitActionPath()
  }
}
let lastUpdateCheck: number = undefined
export const UpdateCheck = async () => {
  let now = Date.now()
  if (
    OvlConfig._system.OfflineMode &&
    /* updatecheck every ~3 minutes */
    (lastUpdateCheck === undefined || now - lastUpdateCheck > 60000 * 3)
  ) {
    lastUpdateCheck = now
    try {
      let updateCheck = await ovl.effects.ovl.getRequest(
        "./ovlnocache/" +
          OvlConfig._system.Version.split(".").join("_") +
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

export const Rehydrate = async (): Promise<boolean> => {
  try {
    if (await ovl.actions.ovl.internal.RehydrateApp()) {
      if (OvlConfig.requiredActions.customRehydrateActionPath) {
        await OvlConfig.requiredActions.customRehydrateActionPath()
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
