/* uncomment when used from app */
// replace test with the app
import { overmind, config } from "../../test/src/index"
import { IConfig } from "overmind"
export { overmind }

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}

/* uncomment when used standalone for base dev 
import { baseOvermindConfig } from "./init"
import { createOvermind, IConfig } from "overmind"
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
