import { state } from "./state"
import * as actions from "./actions"
export { actions }
import * as effects from "./effects"
import onInitialize from "./onInitialize"

import { defineElements } from "./registerComponents"
import { IConfig } from "overmind"
defineElements()

export const config = {
  onInitialize,
  state,
  actions,
  effects
}

declare module "overmind" {
  // tslint:disable:interface-name
  interface Config extends IConfig<typeof config> {}
}
