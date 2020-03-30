import { OvlDialog } from "./library/Dialog/Dialog"
import { OvlSnack } from "./library/Snack/Snack"
import { OvlOverlay } from "./library/Overlay/Overlay"
import { OvlOverlay2 } from "./library/Overlay2/Overlay2"

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

  customElements.define("ovl-overlay", OvlOverlay)
  customElements.define("ovl-overlay2", OvlOverlay2)
}
