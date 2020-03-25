/* uncomment when used from app */
// replace test with the app
import { overmind, config } from "../../test/src/index"
import { screens, Screen } from "../../test/src/stateScreens"
export { Screen }
import { IConfig } from "overmind"
export { overmind }
config.state.ovl.screens.screens = screens
declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}

//###############################################################
/* uncomment when used standalone for base dev 
import { baseOvermindConfig } from "./init"
import { createOvermind, IConfig } from "overmind"
import { screens, Screen } from "./state/stateScreens"
export {Screen}
baseOvermindConfig.state.ovl.screens.screens = screens
export const overmind = createOvermind(baseOvermindConfig, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})
declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof baseOvermindConfig> {}
}
*/
