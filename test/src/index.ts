import { html, render } from "../../ovl/node_modules/lit-html"
import { createOvermind } from "../../ovl/node_modules/overmind"
import { merge } from "../../ovl/node_modules/overmind/config"
import { Init, baseOvermindConfig, OvlConfig } from "../../ovl/src/init"
import { defineElements } from "./registerComponents"
import * as actions from "./actions"
import * as state from "./state"

defineElements()

let appOvermindConfig = { actions, state }

export const config = merge(baseOvermindConfig, appOvermindConfig)

export const overmind = createOvermind(config, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})
OvlConfig.requiredActions = {
  loginActionPath: "portal.user.Login",
  forgotPwActionPath: "portal.user.ForgotPw"
}

OvlConfig.apiUrl = {
  customerRealUrlMatch: "kundenportal.kaltag.ch",
  customerRealUrl: "https://api-portal.kaltag.ch/api/",
  customerTestUrlMatch: "test",
  customerTestUrl: "https://testapi-portal.kaltag.ch/api/",
  itfliesServerUrlMatch: "itflies",
  itfliesServerUrl: "https://itflies2.ddns.net/api/",
  devServer: "http://192.168.1.117:1233/api/"
}

overmind.actions.ovl.internal.InitApp(OvlConfig.apiUrl)

window.scrollTo(0, 1)
render(
  html`
    <ovl-shellbar></ovl-shellbar>
    <ovl-snack> </ovl-snack>
  `,
  document.getElementById("app")
)
