/* uncomment when used from app */
// replace test with the app

import { overmind, config } from "../../../kaltag/src/index"
import { IConfig } from "overmind"
import { screens } from "../../../kaltag/src/stateScreens"
import * as functions from "../../../kaltag/src/functions"
export type Screen = keyof typeof screens
export { functions, screens, overmind }
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
