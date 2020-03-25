import { Action, AsyncAction } from "overmind"
import { overmind } from "../index"
import { OvlConfig, Init } from "../init"
import { DialogResult } from "../library/actions"
import {
  FormState,
  GetFormValidationErrors,
  InitForm
} from "../library/forms/actions"
import { FormFields } from "../library/forms/OvlFormElement"
import {
  FileInfoStore,
  fileStore,
  FileStore,
  fileStoreInfo,
  stateStore
} from "../offlineStorage"
import { api, logout, ResetT, saveState, ShowFile, T } from "./globals"

function isTouch() {
  return "ontouchstart" in window
}

export const NavigateTo: AsyncAction<string> = async (
  { state, actions },
  value
) => {
  if (state.ovl.screens.nav.currentScreen !== value) {
    state.ovl.screens.nav.nextScreen = value
    let user = state.ovl.user
    if (value === "Login" && user) {
      user.token = ""
    }
    // make sure that a screen is only once in the history
    // elsewise we need to handle different state (involves serializing and and and and...) as well
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
    SetClosingScreen(actions, state, state.ovl.screens.nav.currentScreen)
  }
}

export const NavigateBack: AsyncAction = async ({ state, actions }) => {
  if (state.ovl.screens.nav.screensHistory.length > 1) {
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
        actions.global.SetVisibleFalse(value)
      }
    }
  }
}

const SetVisibleScreen = async (
  state: typeof overmind.state,
  value: string
) => {
  let o = state.ovl.screens.screenState[value]
  if (o === undefined) {
    state.ovl.screens.screenState[value] = { visible: true, closing: false }
  } else {
    o.visible = true
    o.closing = false
  }
}

export const SetVisibleFalse: Action<string> = ({ state, actions }, value) => {
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
    actions.ovl.form.ResetForm(
      state.ovl.forms[state.ovl.screens.nav.formTypeToReset][
        state.ovl.screens.nav.formIdToReset
      ]
    )
    state.ovl.screens.nav.formTypeToReset = undefined
  }
  SetVisibleScreen(state, state.ovl.screens.nav.currentScreen)

  // state.ovl.uiState.stateSavedFrom = "screen"

  // saveState()
}

export const ToggleLanguage: AsyncAction = async (
  { state, effects },
  value
) => {
  let lang = ""
  if (state.ovl.language.language === "FR") {
    lang = "DE"
  } else {
    lang = "FR"
  }
  let res = await effects.postRequest(api.url + "users/translations", {
    language: lang
  })
  ResetT()
  state.ovl.language.translations = res.data.translations
  state.ovl.language.language = res.data.lang
  // state.portal.pics.salesContact = res.data.salesPic
  // state.portal.pics.technicalContact = res.data.technicianPic
  // state.portal.partner.technicalContact = res.data.technician
  // state.portal.partner.salesContact = res.data.sales
  localStorage.setItem("PortalLanguage", res.data.lang)
}

export const RefreshData: AsyncAction = async ({ state, actions, effects }) => {
  let res = await effects.postRequest("getdata", {
    features: state.ovl.user.features,
    language: state.ovl.language.language
  })
  if (!res.data) {
    return
  }

  // state.portal.partner.attachments = res.data.attachments

  // state.portal.chartData = res.data.chartData
  // state.portal.quotationDetail = {
  //   quotations: res.data.quotationDetail
  // }
  // state.portal.orderDetail = { orders: res.data.orderDetail }
  // state.portal.invoiceDetail = { invoices: res.data.invoiceDetail }
  // state.portal.dpInvoiceDetail = {
  //   dpInvoices: res.data.dpInvoiceDetail
  // }
  actions.ovl.snack.AddSnack({
    durationMs: 3000,
    text: "Daten aufgefrischt",
    type: "Success"
  })
}

export const ForgotPw: AsyncAction<FormState> = async (
  { state, actions, effects },
  value
) => {
  actions.ovl.dialog.OkCancelDialog({
    text: T("AppLoginForgotPasswordConfirm"),
    default: 2
  })
  switch (await DialogResult()) {
    case 1:
      let user = value.fields["user"].value
      let res = await effects.postRequest("requestresetpw", {
        user,
        language: state.ovl.language.language
      })
      if (res.status !== 200) {
        return
      }
      actions.ovl.snack.AddSnack({
        text: T("AppLoginForgotPasswordMsg"),
        durationMs: 20000,
        type: "Information"
      })
      break
  }
}

export const Logout: AsyncAction = async ({ state, actions }) => {
  actions.ovl.dialog.OkCancelDialog({
    text: "Wollen Sie sich wirklich abmelden?",
    default: 1
  })
  switch (await DialogResult()) {
    case 1:
      state.ovl.user.token = ""
      logout()
      break
    case 2:
      break
  }
}

export const OpenLanguageTable: Action = ({ state, actions }, value) => {
  let tabledata = state.ovl.language.tables.translations.data
  Object.keys(state.ovl.language.translations).forEach(k => {
    if (!tabledata[k]) {
      tabledata[k] = { ID: k, Translation: state.ovl.language.translations[k] }
    } else {
      tabledata[k].ID = k
      tabledata[k].Translation = state.ovl.language.translations[k]
    }
  })
  actions.ovl.table.TableRefresh({
    def: state.ovl.language.tables.translations.tableDef.translation,
    data: state.ovl.language.tables.translations,
    init: true
  })
  actions.ovl.navigation.NavigateTo("Translation")
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
  Object.keys(screenState).forEach(k => {
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
      docNum
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
      actions.ovl.snack.AddSnack({
        durationMs: 3000,
        text: "File not cached",
        type: "Information"
      })
    }
  }
}

export const RehydrateAndUpdateApp: AsyncAction = async ({
  actions,
  state,
  effects
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
        Object.keys(persistedState).forEach(k => {
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
          actions.ovl.dialog.OkDialog({
            text: "Update erforderlich!\n Bitte neu anmelden!"
          })
          await DialogResult()
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
  window.addEventListener("popstate", function() {
    overmind.actions.ovl.navigation.NavigateBack()
    history.pushState(null, null, document.URL)
  })

  // rehydrate state from indexeddb/check if update is needed
  await actions.ovl.internal.RehydrateAndUpdateApp()
  state.ovl.libState.indicator.open = false
  state.ovl.libState.indicator.refCounter = 0

  // @ts-ignore

  state.ovl.uiState.isMobile = window.isMobile.phone
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
  let fields: { [key: string]: FormFields } = {
    pw: { value: "" },
    user: { value: "" }
  }
  let initForm: InitForm = {
    validationActionName: "LoginValidateField",
    namespace: "internal",
    instanceId: "loginform",
    formType: "Login",
    fields
  }
  actions.ovl.form.InitForm(initForm)

  const query = "(prefers-reduced-motion: reduce)"
  state.ovl.uiState.hasOSReducedMotion = window.matchMedia(query).matches
  let lang = localStorage.getItem("PortalLanguage")

  let res = await effects.postRequest(api.url + "users/translations", {
    language: lang
  })

  if (!res || !res.data) {
    return
  }
  state.ovl.language.language = res.data.lang
  localStorage.setItem("PortalLanguage", res.data.lang)
  state.ovl.language.translations = res.data.translations
  // state.portal.pics.salesContact = res.data.salesPic
  // state.portal.pics.technicalContact = res.data.technicianPic

  // //init lookup values
  // res = await effects.postRequest(state.ovl.apiUrl + "lookup", {
  //   lang: state.ovl.language.language,
  //   lookupType: "initial"
  // })
  // state.tables.lookups.U_ItemCode = res.data.item
  // state.tables.lookups.ItmsGrpCod = res.data.itemGroup

  // state.tables.lookups.AbsenceTypeId = res.data.timeAbsences
  // state.tables.lookups.ProjectTypeId = res.data.timeProjects

  state.ovl.uiState.isReady = true

  // let dt = new Date()
  // let dateSelected = dt.toISOString().substring(0, 10)

  // await actions.mobiletimerecording.SetMobileTimeEntrySelectedDate({
  //   def: state.tables.timeentries.tableDef.mobiletimerecording1,
  //   selected: dateSelected
  // })
  // actions.ovl.navigation.NavigateTo("MobileTimeEntry")

  // //init tables
  // await actions.ovl.table.TableRefresh({
  //   def: state.tables.tableTesting.tableDef.tab1,
  //   data: state.tables.tableTesting,
  //   init: true
  // })

  // await actions.ovl.table.TableRefresh({
  //   def: state.tables.tableTesting.tableDef.tab2,
  //   data: state.tables.tableTesting,
  //   init: true,
  //   forceFreshServerData: -1
  // })

  // await actions.ovl.table.TableRefresh({
  //   def: state.tables.tableTesting.tableDef.tab3,
  //   data: state.tables.tableTesting,
  //   init: true,
  //   forceFreshServerData: -1
  // })

  // await actions.ovl.table.TableRefresh({
  //   def: state.tables.tableTesting.tableDef.tab4,
  //   data: state.tables.tableTesting,
  //   init: true
  // })

  // actions.ovl.navigation.NavigateTo("TableTesting")

  actions.ovl.navigation.NavigateTo("Login")
}
