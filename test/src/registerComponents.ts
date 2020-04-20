import { OvlAudit } from "./screens/Audit/Audit"
import { CompLoginForm } from "./screens/Login/LoginForm"
import { CompShellbar } from "./screens/Shellbar/Shellbar"
import { CompTranslation } from "./screens/Translation/Translation"
import { OvlIndicator } from "./components/Indicator/Indicator"
import { OvlBackButton } from "./components/BackButton/BackButton"
import { OvlRefresh } from "./components/Refresh/Refresh"

import { CompFileList } from "./components/FileList/FileList"
import { CompDashboard } from "./screens/Dashboard/Dashboard"
import { CompSettingsForm } from "./screens/Settings/SettingsForm"
import { CompOrderOverview } from "./screens/Order/OrderOverview"
import { CompQuotationOverview } from "./screens/Quotation/QuotationOverview"
import { CompInvoiceOverview } from "./screens/Invoice/InvoiceOverview"
import { CompDPInvoiceOverview } from "./screens/Invoice/DPInvoiceOverview"
import { CompSummaryChart } from "./screens/Dashboard/SummaryChart/SummaryChart"
import { CompOrderFeedback } from "./screens/Order/OrderFeedback"
import { CompOrderDetailLayout } from "./screens/Order/OrderDetailLayout"
import { CompOrderDetail } from "./screens/Order/OrderDetail"
import { CompOrderTimeLine } from "./screens/Order/OrderTimeLine"
import { CompFeedbackForm } from "./screens/Feedback/FeedbackForm"

import { CompTableTesting } from "./screens/TableTesting/TableTesting"
import { CompMobileTimeEntry } from "./screens/MobileTimeRecording/MobileTimeRecordingMainForm"
import { CompMobileTimeEntryForm } from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/MobileTimeRecordingForm"

export const defineElements = () => {
  customElements.define("ovl-audit", OvlAudit)
  customElements.define("ovl-translation", CompTranslation)
  customElements.define("ovl-shellbar", CompShellbar)
  customElements.define("ovl-loginform", CompLoginForm)
  customElements.define("ovl-indicator", OvlIndicator)
  customElements.define("ovl-backbutton", OvlBackButton)
  customElements.define("ovl-refresh", OvlRefresh)
  customElements.define("comp-tabletesting", CompTableTesting)
  customElements.define("comp-mobiletimeentry", CompMobileTimeEntry)
  customElements.define("comp-mobiletimeentryform", CompMobileTimeEntryForm)
  customElements.define("comp-dashboard", CompDashboard)
  customElements.define("comp-settingsform", CompSettingsForm)
  customElements.define("comp-orderoverview", CompOrderOverview)
  customElements.define("comp-quotationoverview", CompQuotationOverview)
  customElements.define("comp-invoiceoverview", CompInvoiceOverview)
  customElements.define("comp-dpinvoiceoverview", CompDPInvoiceOverview)
  customElements.define("comp-filelist", CompFileList)
  customElements.define("comp-summarychart", CompSummaryChart)
  customElements.define("comp-orderfeedback", CompOrderFeedback)
  customElements.define("comp-orderdetaillayout", CompOrderDetailLayout)
  customElements.define("comp-orderdetail", CompOrderDetail)
  customElements.define("comp-ordertimeline", CompOrderTimeLine)
  customElements.define("comp-feedbackform", CompFeedbackForm)
}
