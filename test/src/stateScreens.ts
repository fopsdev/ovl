import { SettingsFormState } from "./screens/Settings/SettingsForm"
import { OrderOverviewState } from "./screens/Order/OrderOverview"
import { QuotationOverviewState } from "./screens/Quotation/QuotationOverview"
import { InvoiceOverviewState } from "./screens/Invoice/InvoiceOverview"
import { DPInvoiceOverviewState } from "./screens/Invoice/DPInvoiceOverview"
import { OrderDetailFormState } from "./screens/Order/OrderDetailLayout"
import { FeedbackFormState } from "./screens/Feedback/FeedbackForm"
import { MobileTimeEntryFormState } from "./screens/MobileTimeRecording/MobileTimeRecordingForm"
import { DashboardState } from "./screens/Dashboard/Dashboard"
import { ShellbarState } from "../../ovl/src/screens/Shellbar/Shellbar"
import { LoginFormState } from "../../ovl/src/screens/Login/LoginForm"

let shellbar: ShellbarState = {
  mainMenuExpanded: false,
  userMenuExpanded: false
}

let login: LoginFormState = {}
let audit = {}

let settings: SettingsFormState = {}

let feedback: FeedbackFormState = {
  cardCode: "C20000",
  message: "Der Auftrag wurde zu meiner vollsten Zufriedenheit ausgeführt",
  orderDate: "01.12.2019",
  orderDeliveryDate: "01.12.2019",
  orderNum: "10002",
  title: "Positives Feedback erfassen",
  type: "OrderPositive",
  refNum: "Kommission 1",
  dirty: false
}

let dashboard: DashboardState = {}

let orderOverview: OrderOverviewState = {
  activeFilePopup: ""
}

let quotationOverview: QuotationOverviewState = {
  activeFilePopup: ""
}

let invoiceOverview: InvoiceOverviewState = {
  activeFilePopup: ""
}
let dpInvoiceOverview: DPInvoiceOverviewState = {
  activeFilePopup: ""
}

let orderDetailFormState: OrderDetailFormState = {
  selectedOrder: ""
}

let mobileTimeEntryFormState: MobileTimeEntryFormState = { rowKey: undefined }
let mobileTimeEntry = { selectedDate: "" }

export let screens = {
  /* base screens */
  Shellbar: <ShellbarState>{ userMenuExpanded: false, mainMenuExpanded: false },
  Login: {},
  Audit: {},
  Translation: {},
  /*                 */
  Settings: settings,
  Dashboard: dashboard,
  Quotation: quotationOverview,
  Order: orderOverview,
  Orderdetail: orderDetailFormState,
  Invoice: invoiceOverview,
  Feedback: feedback,
  TableTesting: {},
  MobileTimeEntry: mobileTimeEntry,
  MobileTimeEntryForm: mobileTimeEntryFormState
}
