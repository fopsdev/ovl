import { LoginForm } from "./screens/Login/LoginForm"
import { OvlDialog } from "./library/Dialog/Dialog"
import { Shellbar } from "./screens/Shellbar/Shellbar"

import { OvlSnack } from "./library/Snack/Snack"
import { OvlIndicator } from "./library/Indicator/Indicator"
import { OvlBackButton } from "./library/BackButton/BackButton"
import { OvlRefresh } from "./library/Refresh/Refresh"
import { OvlOverlay } from "./library/Overlay/Overlay"
import { OvlOverlay2 } from "./library/Overlay2/Overlay2"
import { OvlAudit } from "./library/Audit/Audit"
import { OvlTextbox } from "./library/Forms/Controls/TextBox"
import { OvlListControl } from "./library/Forms/Controls/ListControl"
import { OvlHitList } from "./library/Forms/Controls/Parts/HitList"
import { OvlTextArea } from "./library/Forms/Controls/TextArea"
import { OvlOption } from "./library/Forms/Controls/Option"
import { OvlTime } from "./library/Forms/Controls/Time"
import { OvlDate } from "./library/Forms/Controls/Date"
import { TableHeader } from "./library/Table/Table"
import { TableRow } from "./library/Table/Row"
import { TableRowWrapper } from "./library/Table/RowWrapper"
import { TableRowForm } from "./library/Table/RowForm"
import { TableRowFormBig } from "./library/Table/RowFormBig"
import { TableRowSaveCancel } from "./library/Table/RowFormSaveCancel"
import { TableRowControl } from "./library/Table/RowControl"
import { TableNavControl } from "./library/Table/NavControl"
import { TableHeaderMenu } from "./library/Table/HeaderMenu"
import { Translation } from "./screens/Translation/Translation"
export const defineElements = () => {
  customElements.define("ovl-trowcontrol", TableRowControl)
  customElements.define("ovl-tnavcontrol", TableNavControl)
  customElements.define("ovl-tableheadermenu", TableHeaderMenu)
  customElements.define("ovl-table", TableHeader)
  customElements.define("ovl-trow", TableRow)
  customElements.define("ovl-trg", TableRowWrapper)
  customElements.define("ovl-trowform", TableRowForm)
  customElements.define("ovl-trowformb", TableRowFormBig)
  customElements.define("ovl-trowsc", TableRowSaveCancel)
  customElements.define("ovl-textarea", OvlTextArea)
  customElements.define("ovl-textbox", OvlTextbox)
  customElements.define("ovl-listcontrol", OvlListControl)
  customElements.define("ovl-option", OvlOption)
  customElements.define("ovl-hitlist", OvlHitList)
  customElements.define("ovl-timebox", OvlTime)
  customElements.define("ovl-datebox", OvlDate)
  customElements.define("ovl-dialog", OvlDialog)
  customElements.define("ovl-snack", OvlSnack)
  customElements.define("ovl-indicator", OvlIndicator)
  customElements.define("ovl-backbutton", OvlBackButton)
  customElements.define("ovl-refresh", OvlRefresh)
  customElements.define("ovl-overlay", OvlOverlay)
  customElements.define("ovl-overlay2", OvlOverlay2)
  customElements.define("ovl-audit", OvlAudit)
  customElements.define("ovl-translation", Translation)
  customElements.define("ovl-shellbar", Shellbar)
  customElements.define("ovl-loginform", LoginForm)
}
