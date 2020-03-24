import { ShellbarState } from "../screens/Shellbar/Shellbar"
import { LoginFormState } from "../screens/Login/LoginForm"

let shellbar: ShellbarState = {
  mainMenuExpanded: false,
  userMenuExpanded: false
}

let login: LoginFormState = {}

export let screens = {
  Login: login,
  Shellbar: shellbar,
  Translation: undefined,
  Audit: undefined
}

export type Screen = keyof typeof screens
