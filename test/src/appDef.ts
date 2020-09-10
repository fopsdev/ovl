export let appScreens = {
  /* base screens */
  Shellbar: {},
  Audit: {},
  Translation: {},
  Settings: {},
  Dashboard: {},
  Quotation: {},
  Order: {},
  Orderdetail: {},
  Invoice: {},
  Feedback: {},
  TableTesting: {},
  MobileTimeEntry: {},
  MobileTimeEntryForm: {},
}

export let appDialogs = {
  Login: {},
}

export type appForms =
  | "Feedback"
  | "Settings"
  | "Login"
  | "OvlLanguage"
  | "MobileTimeEntry"
  | "MobileTimeEntryMain"

export type OvlTableDefIds =
  | "translation"
  | "audit"
  | "tab1"
  | "tab2"
  | "tab3"
  | "mobiletimerecording1"

export type OvlLanguage = "DE" | "FR"
