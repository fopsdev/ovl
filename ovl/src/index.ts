// replace test with the app
import { overmind, config } from "../../test/src/index"
import { IConfig } from "overmind"
export { overmind }

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}

// // if standalone
// import { ovlconfig } from "./init"
// export const overmind = createOvermind(ovlconfig, {
//     devtools: true,
//     logProxies: true,
//     delimiter: " "

//   })
// declare module "overmind" {
//     // tslint:disable:interface-name
//     interface Config extends IConfig<typeof baseOvermindConfig> {}
//   }
