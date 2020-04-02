/* uncomment when used from app */
// replace test with the app

import { IConfig } from "overmind"

// import { overmind, config } from "../../../kaltag/src/index"
// import { screens } from "../../../kaltag/src/stateScreens"
// import * as customFunctions from "../../../kaltag/src/customFunctions"

//#################### ovl test prj ######################################
import { overmind, config, TableDefIds } from "../..//test/src/index"
import { screens } from "../../test/src/stateScreens"
import * as customFunctions from "../../test/src/customFunctions"

//#################### ovl lib Standalone ######################################
/* uncomment when used standalone for base dev 
import { baseOvermindConfig } from "./init"
import { createOvermind } from "overmind"
import { screens } from "./state/stateScreens"
const overmind = createOvermind(baseOvermindConfig, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})
*/

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}

export { customFunctions, screens, overmind, TableDefIds }
export type Screen = keyof typeof screens
