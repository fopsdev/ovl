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
  api,
  logout,
  ResetT,
  saveState,
  ShowFile,
  T,
  resolvePath,
} from "./globals"
import { SnackAdd, DialogOkCancel, DialogOk } from "../library/helpers"
import { ScreenNavigateOut, ScreenNavigateIn } from "./hooks"

function isTouch() {
  return "ontouchstart" in window
}

export function isMobile() {
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
  return check
}

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
  window.addEventListener("popstate", function () {
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
