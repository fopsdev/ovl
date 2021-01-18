import { OvlAction } from "../../../../ovl/src/index"

export const CloseMainMenu: OvlAction = (_, { state }) => {
  state.app.screens.shellbar.mainMenuExpanded = false
}
export const OpenMainMenu: OvlAction = (_, { state }) => {
  state.app.screens.shellbar.mainMenuExpanded = true
}

export const CloseUserMenu: OvlAction = (_, { state }) => {
  state.app.screens.shellbar.userMenuExpanded = false
}
export const OpenUserMenu: OvlAction = (_, { state }) => {
  state.app.screens.shellbar.userMenuExpanded = true
}
