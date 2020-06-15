import { OvlAction } from "../../../../ovl/src"

export const CloseMainMenu: OvlAction = (_, { state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = false
}
export const OpenMainMenu: OvlAction = (_, { state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = true
}

export const CloseUserMenu: OvlAction = (_, { state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = false
}
export const OpenUserMenu: OvlAction = (_, { state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = true
}
