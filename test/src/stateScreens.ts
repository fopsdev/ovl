import { SettingsFormState } from "./screens/Settings/SettingsForm"
import { OrderOverviewState } from "./screens/Order/OrderOverview"
import { QuotationOverviewState } from "./screens/Quotation/QuotationOverview"
import { InvoiceOverviewState } from "./screens/Invoice/InvoiceOverview"
import { DPInvoiceOverviewState } from "./screens/Invoice/DPInvoiceOverview"
import { OrderDetailFormState } from "./screens/Order/OrderDetailLayout"
import { FeedbackFormState } from "./screens/Feedback/FeedbackForm"
import { MobileTimeEntryFormState } from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/MobileTimeRecordingForm"
import { DashboardState } from "./screens/Dashboard/Dashboard"
import { ShellbarState } from "./screens/Shellbar/Shellbar"
import { LoginFormState } from "./screens/Login/LoginForm"

let shellbar: ShellbarState = {
  mainMenuExpanded: false,
  userMenuExpanded: false,
}

let login: LoginFormState = {}
let audit = {}

let settings: SettingsFormState = {}

let feedback: FeedbackFormState = {
  cardCode: undefined,
  dirty: undefined,
  message: undefined,
  orderDate: undefined,
  orderDeliveryDate: undefined,
  orderNum: undefined,
  refNum: undefined,
  title: undefined,
  type: undefined,
}

let dashboard: DashboardState = {}

let orderOverview: OrderOverviewState = {
  activeFilePopup: "",
}

let quotationOverview: QuotationOverviewState = {
  activeFilePopup: "",
}

let invoiceOverview: InvoiceOverviewState = {
  activeFilePopup: "",
}

let orderDetailFormState: OrderDetailFormState = {
  selectedOrder: "",
}

let mobileTimeEntryFormState: MobileTimeEntryFormState = { rowKey: undefined }
let mobileTimeEntry = { selectedDate: "" }

export let screens = {
  /* base screens */
  Shellbar: shellbar,
  Login: {},
  Audit: {},
  Translation: {},
  Settings: settings,
  Dashboard: dashboard,
  Quotation: quotationOverview,
  Order: orderOverview,
  Orderdetail: orderDetailFormState,
  Invoice: invoiceOverview,
  Feedback: feedback,
  TableTesting: {},
  MobileTimeEntry: mobileTimeEntry,
  MobileTimeEntryForm: mobileTimeEntryFormState,
}

export type Screen = keyof typeof screens
