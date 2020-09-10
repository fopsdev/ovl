import { html, render } from "../../ovl/node_modules/lit-html"

import { CustomFormType, OvlTableDefIds, OvlLanguage } from "./state"
import { OvlConfig } from "../../ovl/src/init"
import {
  OvlState,
  ovl,
  logState,
  logActions,
  logEffects,
} from "../../ovl/src/index"
export { OvlTableDefIds, CustomFormType, OvlLanguage }

OvlConfig._system.debugTracking = false

OvlConfig.requiredActions = {
  customRehydrateActionPath: undefined,
  customInitActionPath: ovl.actions.demoApp.system.user.CustomInit,
  handleAdditionalTranslationResultActionPath:
    ovl.actions.demoApp.system.user.HandleAdditionalLanguageResult,
  handleGlobalRefreshActionPath: ovl.actions.demoApp.global.HandleRefresh,
}

OvlConfig.apiUrl = {
  customerRealUrlMatch: "kundenportal.kaltag.ch",
  customerRealUrl: "https://api-portal.kaltag.ch/api/",
  customerTestUrlMatch: "test",
  customerTestUrl: "https://testapi-portal.kaltag.ch/api/",
  itfliesServerUrlMatch: "itflies",
  itfliesServerUrl: "https://itflies2.ddns.net/api/",
  devServer: "http://192.168.1.117:1233/api/",
}

OvlConfig.stickyHeaderEnabled = (state: OvlState) => {
  return (
    !state.ovl.uiState.isIOS &&
    !state.demoApp.screens.shellbar.mainMenuExpanded &&
    !state.demoApp.screens.shellbar.userMenuExpanded
  )
}

import { defineElements } from "./registerComponents"
defineElements()

ovl.actions.ovl.internal.InitApp(OvlConfig.apiUrl)
window.scrollTo(0, 1)
render(
  html`
    <ovl-shellbar></ovl-shellbar>
    <ovl-snack> </ovl-snack>
  `,
  document.getElementById("app")
)
