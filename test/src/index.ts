import { html, render } from "../../ovl/node_modules/lit-html"
import { defineElements } from "./registerComponents"
import { CustomFormType, TableDefIds, Language } from "./state"
import * as portalActions from "../src/actions"
import { OvlConfig } from "../../ovl/src/init"
import { OvlState } from "../../ovl/src"
export { TableDefIds, CustomFormType, Language }

defineElements()

OvlConfig.requiredActions = {
  customPrepareActionPath: undefined,
  customInitActionPath: portalActions.system.user.CustomInit,
  handleAdditionalTranslationResultActionPath:
    portalActions.system.user.HandleAdditionalLanguageResult,
  handleGlobalRefreshActionPath: portalActions.global.HandleRefresh,
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
    !state.ovl.screens.screens.Shellbar.mainMenuExpanded &&
    !state.ovl.screens.screens.Shellbar.userMenuExpanded
  )
}

//ovl.actions.ovl.internal.InitApp(OvlConfig.apiUrl)

// window.scrollTo(0, 1)
// render(
//   html`
//     <ovl-shellbar></ovl-shellbar>
//     <ovl-snack> </ovl-snack>
//   `,
//   document.getElementById("app")
// )
