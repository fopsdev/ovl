import { Action } from "overmind"

export const CloseMainMenu: Action = ({ state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = false
}
export const OpenMainMenu: Action = ({ state }) => {
  state.ovl.screens.screens.Shellbar.mainMenuExpanded = true
}

export const CloseUserMenu: Action = ({ state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = false
}
export const OpenUserMenu: Action = ({ state }) => {
  state.ovl.screens.screens.Shellbar.userMenuExpanded = true
}
