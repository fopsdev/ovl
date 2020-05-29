/* uncomment when used from app */
// replace test with the app

import { IConfig } from "overmind"
// import { overmind, config } from "../../../kaltag/src/index"
// import { screens } from "../../../kaltag/src/stateScreens"
// import * as customFunctions from "../../../kaltag/src/customFunctions"
//#################### ovl test prj ######################################
import {
  config,
  CustomFormType,
  overmind,
  TableDefIds,
  Language,
} from "../../test/src/index"
import { screens } from "../../test/src/stateScreens"

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
import * as customFunctions from "../../test/src/customFunctions"
export type FormType = CustomFormType | "TableRowEdit"
export { customFunctions, screens, overmind, TableDefIds, Language }
export type Screen = keyof typeof screens
