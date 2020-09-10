import { OvlState, OvlActions, OvlEffects } from "."

type OvlActionContext = {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
}

export type OvlAction<T = {}, R = void> = (
  value?: T,
  context?: OvlActionContext
) => R
