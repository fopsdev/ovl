import { html, render } from "../../ovl/node_modules/lit-html"
import { createOvermind } from "../../ovl/node_modules/overmind"
import { config as ovlconfig, Init } from "../../ovl/src/init"

export const overmind = createOvermind(ovlconfig, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})

let init: Init = {
  customerRealUrlMatch: "kundenportal.kaltag.ch",
  customerRealUrl: "https://api-portal.kaltag.ch/api/",
  customerTestUrlMatch: "test",
  customerTestUrl: "https://testapi-portal.kaltag.ch/api/",
  itfliesServerUrlMatch: "itflies",
  itfliesServerUrl: "https://itflies2.ddns.net/api/",
  devServer: "http://192.168.1.117:1233/api/"
}

overmind.actions.ovl.internal.InitApp(init)

window.scrollTo(0, 1)

render(
  html`
    <ovl-shellbar></ovl-shellbar>
    <ovl-snack> </ovl-snack>
  `,
  document.getElementById("app")
)
