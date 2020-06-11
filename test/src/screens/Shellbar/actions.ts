import { OvlAction } from "../../../../ovl/src"

export const CloseMainMenu: OvlAction = ({ state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = false
}
export const OpenMainMenu: OvlAction = ({ state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = true
}

export const CloseUserMenu: OvlAction = ({ state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = false
}
export const OpenUserMenu: OvlAction = ({ state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = true
}
