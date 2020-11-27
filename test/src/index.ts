import { html, render } from "../../ovl/node_modules/lit-html"

import { appForms, OvlTableDefIds, OvlLanguage } from "./appDef"
import { OvlConfig } from "../../ovl/src/config"
import { OvlState, ovl } from "../../ovl/src/index"
export { OvlTableDefIds, appForms, OvlLanguage }

OvlConfig._system.debugTracking = false

OvlConfig.fileOpenMode = (anchor: HTMLAnchorElement, fileName: string) => {
  // open directly in ep tab if known type...
  if (
    ".jpg,.png,.gif,.pdf,".indexOf(fileName.substr(fileName.length - 4, 4)) < 0
  ) {
    anchor.download = fileName
  }
}

OvlConfig.requiredActions = {
  customRehydrateActionPath: undefined,
  customInitActionPath: ovl.actions.app.system.user.CustomInit,
  handleAdditionalTranslationResultActionPath:
    ovl.actions.app.system.user.HandleAdditionalLanguageResult,
  handleGlobalRefreshActionPath: ovl.actions.app.global.HandleRefresh,
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
    !state.app.screens.shellbar.mainMenuExpanded &&
    !state.app.screens.shellbar.userMenuExpanded
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
