import { OvlAction } from "../../../../ovl/src"

export const CloseMainMenu: OvlAction = (_, { state }) => {
  state.timeportal.screens.shellbar.mainMenuExpanded = false
}
export const OpenMainMenu: OvlAction = (_, { state }) => {
  state.timeportal.screens.shellbar.mainMenuExpanded = true
}

export const CloseUserMenu: OvlAction = (_, { state }) => {
  state.timeportal.screens.shellbar.userMenuExpanded = false
}
export const OpenUserMenu: OvlAction = (_, { state }) => {
  state.timeportal.screens.shellbar.userMenuExpanded = true
}
