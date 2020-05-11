import { Action, AsyncAction } from "overmind"
import { overmind, Screen, customFunctions } from "../index"
import { OvlConfig, Init } from "../init"

import {
  FileInfoStore,
  fileStore,
  FileStore,
  fileStoreInfo,
  stateStore,
} from "../offlineStorage"
import {
  isMobile,
  isTouch,
  api,
  logout,
  ResetT,
  saveState,
  ShowFile,
} from "./globals"
import { SnackAdd, DialogOkCancel, DialogOk } from "../library/helpers"
import { ScreenNavigateOut, ScreenNavigateIn } from "./hooks"

export const NavigateTo: AsyncAction<Screen> = async (
  { state, actions, effects },
  value
) => {
  if (state.ovl.screens.nav.currentScreen !== value) {
    let fn = customFunctions["screens"]
    if (fn) {
      let currentScreen = state.ovl.screens.nav.currentScreen
      if (currentScreen) {
        // get the first scrollable class of the doc
        let o = state.ovl.screens.screenState[currentScreen]
        let scrollable
        if (state.ovl.uiState.isMobile) {
          scrollable = document.querySelector(".scrollableMobile")
        } else {
          scrollable = document.querySelector(".scrollable")
        }

        // and remember the scroll pos
        if (scrollable && scrollable.scrollTop) {
          o.lastScrollTop = scrollable.scrollTop
        } else {
          o.lastScrollTop = undefined
        }

        if (fn[currentScreen] && fn[currentScreen][ScreenNavigateOut]) {
          let navErrorMessage = await fn[currentScreen][ScreenNavigateOut](
            state,
            actions,
            effects
          )
          if (navErrorMessage) {
            if (navErrorMessage.toLowerCase() !== "error") {
              SnackAdd(navErrorMessage, "Error")
            }
            return
          }
        }
      }
      if (fn[value] && fn[value][ScreenNavigateIn]) {
        let navErrorMessage = await fn[value][ScreenNavigateIn](
          state,
          actions,
          effects
        )
        if (navErrorMessage) {
          if (navErrorMessage.toLowerCase() !== "error") {
            SnackAdd(navErrorMessage, "Error")
          }
          return
        }
      }
    }

    state.ovl.screens.nav.nextScreen = value
    let user = state.ovl.user
    if (value === "Login" && user) {
      user.token = ""
    }
    // make sure that a screen is only once in the history
    // elsewise we need to handle different state (involves serializing and and and and...) as well
    if (value !== "Login") {
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
    }
    document.getElementById("app").focus()
    if (!state.ovl.screens.nav.currentScreen) {
      state.ovl.screens.nav.currentScreen = "Login"
      SetVisibleScreen(state, value)
    } else {
      SetClosingScreen(actions, state, state.ovl.screens.nav.currentScreen)
    }
  }
}

export const NavigateBack: AsyncAction = async ({
  state,
  actions,
  effects,
}) => {
  // if (
  //   !(
  //     state.ovl.libState.overlay.open ||
  //     state.ovl.libState.overlay2.open ||
  //     state.ovl.libState.dialog.visible
  //   )
  // ) {
  if (state.ovl.screens.nav.screensHistory.length > 1) {
    let fn = customFunctions["screens"]
    if (fn) {
      let currentScreen = state.ovl.screens.nav.currentScreen
      if (currentScreen) {
        // get the first scrollable class of the doc
        let o = state.ovl.screens.screenState[currentScreen]

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
          let navErrorMessage = await fn[currentScreen][ScreenNavigateOut](
            state,
            actions,
            effects
          )
          if (navErrorMessage) {
            if (navErrorMessage.toLowerCase() !== "error") {
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
          let navErrorMessage = await fn[nextScreen][ScreenNavigateIn](
            state,
            actions,
            effects
          )
          if (navErrorMessage) {
            if (navErrorMessage.toLowerCase() !== "error") {
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
  actions: any,
  state: typeof overmind.state,
  value: string
) => {
  if (value !== undefined) {
    let o = state.ovl.screens.screenState[value]
    if (o === undefined) {
      o = state.ovl.screens.screenState[value] = {}
    } else {
      if (!state.ovl.uiState.hasOSReducedMotion) {
        o.closing = true
      } else {
        actions.portal.global.SetVisibleFalse(value)
      }
    }
  }
}

const SetVisibleScreen = async (
  state: typeof overmind.state,
  value: string
) => {
  if (!state.ovl.screens.screenState) {
    state.ovl.screens.screenState = {}
  }
  let o = state.ovl.screens.screenState[value]
  if (o === undefined) {
    state.ovl.screens.screenState[value] = { visible: true, closing: false }
  } else {
    o.visible = true
    o.closing = false
  }
}

export const SetVisibleFalse: Action<string> = ({ state, actions }, value) => {
  if (!state.ovl.screens.screenState) {
    state.ovl.screens.screenState = {}
  }
  let o = state.ovl.screens.screenState[value]
  if (o === undefined) {
    o = state.ovl.screens.screenState[value] = {}
    //console.log(state.ovl.screens.screenState[value])
  }
  o.visible = false
  o.closing = false
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

export const SetLanguage: AsyncAction<string> = async (
  { state, actions, effects },
  value
) => {
  let lang = value
  let res = await effects.postRequest(api.url + "users/translations", {
    language: lang,
  })
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

export const Logout: AsyncAction = async ({ state, actions }) => {
  if ((await DialogOkCancel("Wollen Sie sich wirklich abmelden?", 1)) === 1) {
    state.ovl.user.token = ""
    logout()
  }
}

export const PrepareApp: AsyncAction = async ({ actions, state, effects }) => {
  state.ovl.uiState.isReady = false
  state.ovl.libState.indicator.refCounter = 0

  // most of the following code is necessary because we still have some component state which is not handled by overmind
  // lession learned: use overmind.state wherever possible...
  if (state.ovl.libState.overlay2.open) {
    await actions.ovl.internal.CloseOverlay2()
  }
  if (state.ovl.libState.overlay.open) {
    await actions.ovl.internal.CloseOverlay()
  }

  state.ovl.libState.snacks = {}
  // set current screen visible, others false, just to be sure we are not in the middle of an animation
  let screenToGo = state.ovl.screens.nav.nextScreen
  if (!screenToGo) {
    screenToGo = state.ovl.screens.nav.currentScreen
  }
  let screenState = state.ovl.screens.screenState
  if (!screenState[screenToGo]) {
    screenState[screenToGo] = { visible: true, closing: false }
  }
  Object.keys(screenState).forEach((k) => {
    let screen = screenState[k]
    if (k === screenToGo) {
      screen.visible = true
      screen.closing = false
    } else {
      screen.visible = false
      screen.closing = false
    }
  })
  state.ovl.screens.nav.currentScreen = screenToGo
  state.ovl.screens.nav.nextScreen = undefined
  //actions.ovl.navigation.NavigateTo(screenToGo)
  if (OvlConfig.requiredActions.customPrepareActionPath) {
    OvlConfig.requiredActions.customPrepareActionPath(undefined)
  }
}

export const GetFile: AsyncAction<{
  fileName: string
  fileType: string
  docNum: string
}> = async ({ actions, state, effects }, value) => {
  let docNum = value.docNum
  if (!docNum) {
    docNum = ""
  }
  let fileType = value.fileType
  let fileName = value.fileName
  let id = docNum + fileType + fileName
  if (state.ovl.uiState.isIOS === true) {
    // saving state here fixes a ios handling issue when file gets opened and navigated back the page on ios safari (in standalone) reloads
    // that way it reloads to current state...
    saveState(true, "GetFile")
  }
  let res = await effects.postRequest(
    state.ovl.apiUrl + "attachment/getfile",
    {
      fileName,
      fileType,
      docNum,
    },
    true
  )

  if (res.status === 200) {
    let mimeType = res.headers["content-type"]
    let fo: FileStore = { id, mimeType, content: res.data, fileName }
    fileStore.set(fo)
    let dt = new Date()
    let foinfo: FileInfoStore = { id, lastAccess: dt, refreshed: dt }
    fileStoreInfo.set(foinfo)
    ShowFile(res.data, mimeType, fileName)
  } else if (res.status === 449) {
    //get file from store
    let fo: FileStore = await fileStore.get(id)
    if (fo) {
      if (state.ovl.uiState.isIOS === true) {
        ShowFile(fo.content, fo.mimeType, fileName)
      } else {
        let blob = new Blob([fo.content], { type: fo.mimeType })
        ShowFile(blob, fo.mimeType, fileName)
      }
      let foinfo: FileInfoStore = await fileStoreInfo.get(id)
      foinfo.lastAccess = new Date()
      fileStoreInfo.set(foinfo)
    } else {
      SnackAdd("File not cached", "Information")
    }
  }
}

export const RehydrateAndUpdateApp: AsyncAction = async ({
  actions,
  state,
  effects,
}) => {
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
        await actions.ovl.internal.PrepareApp()
        api.url = state.ovl.apiUrl
        state.ovl.uiState.isReady = true

        let updateCheck = await effects.getRequest(
          "./updatecheck/ovldataversion" + OvlConfig._system.DataVersion + ".js"
        )
        if (updateCheck.status === 404) {
          // we need an update
          await DialogOk("Update erforderlich!\n Bitte neu anmelden!")
          logout()
        }
        return
      }
    } catch (e) {
      console.error("Persisted Offlinedata could not be restored: ")
      console.error(e)
    }
  }
}

export const InitApp: AsyncAction<Init> = async (
  { actions, state, effects },
  value
) => {
  history.pushState(null, null, document.URL)
  window.addEventListener("popstate", function (e) {
    overmind.actions.ovl.navigation.NavigateBack()
    history.pushState(null, null, document.URL)
  })

  // rehydrate state from indexeddb/check if update is needed
  await actions.ovl.internal.RehydrateAndUpdateApp()
  state.ovl.libState.indicator.open = false
  state.ovl.libState.indicator.refCounter = 0
  // @ts-ignore
  state.ovl.uiState.isMobile = isMobile()
  state.ovl.uiState.isTouch = isTouch()
  state.ovl.uiState.isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  let currentLocation = window.location.hostname.toLowerCase()
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
  api.url = state.ovl.apiUrl
  // prepare login form
  const query = "(prefers-reduced-motion: reduce)"
  state.ovl.uiState.hasOSReducedMotion = window.matchMedia(query).matches
  let lang = localStorage.getItem("PortalLanguage")
  let res = await effects.postRequest(api.url + "users/translations", {
    language: lang,
  })

  if (!res || !res.data) {
    return
  }
  state.ovl.language.language = res.data.lang
  localStorage.setItem("PortalLanguage", res.data.lang)
  state.ovl.language.translations = res.data.translations

  if (OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath) {
    OvlConfig.requiredActions.handleAdditionalTranslationResultActionPath(
      res.data
    )
  }
  state.ovl.uiState.isReady = true
  if (OvlConfig.requiredActions.customInitActionPath) {
    OvlConfig.requiredActions.customInitActionPath(res.data)
  }
}
