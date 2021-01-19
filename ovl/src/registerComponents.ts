import { OvlDialog } from "./library/Dialog/Dialog"
import { OvlDialogHolder } from "./library/Dialog/OvlDialogHolder"
import { OvlCheckbox } from "./library/Forms/Controls/CheckBox"
import { OvlDate } from "./library/Forms/Controls/Date"
import { OvlListControl } from "./library/Forms/Controls/ListControl"
import { OvlOption } from "./library/Forms/Controls/Option"
import { OvlHitList } from "./library/Forms/Controls/Parts/HitList"
import { OvlTextArea } from "./library/Forms/Controls/TextArea"
import { OvlTextbox } from "./library/Forms/Controls/TextBox"
import { OvlTime } from "./library/Forms/Controls/Time"
import { OvlSnack } from "./library/Snack/Snack"
import { TableHeaderMenu } from "./library/Table/HeaderMenu"
import { TableNavControl } from "./library/Table/NavControl"
import { TableRow } from "./library/Table/Row"
import { TableRowControl } from "./library/Table/RowControl"
import { TableRowDetailView } from "./library/Table/RowDetailView"
import { TableRowForm } from "./library/Table/RowForm"
import { TableRowFormBig } from "./library/Table/RowFormBig"
import { TableRowSaveCancel } from "./library/Table/RowFormSaveCancel"
import { TableRowWrapper } from "./library/Table/RowWrapper"
import { TableHeader } from "./library/Table/Table"
import { OvlCustomValueHint } from "./library/Forms/Controls/Parts/ControlCustomValueHint"
import { OvlValidationHint } from "./library/Forms/Controls/Parts/ControlValidationHint"
import { OvlControlLabel } from "./library/Forms/Controls/Parts/ControlLabel"

// don't forget to add the display block in css - file
export const defineElements = () => {
  customElements.define("ovl-trowcontrol", TableRowControl)
  customElements.define("ovl-tnavcontrol", TableNavControl)
  customElements.define("ovl-tableheadermenu", TableHeaderMenu)
  customElements.define("ovl-table", TableHeader)
  customElements.define("ovl-trow", TableRow)
  customElements.define("ovl-trg", TableRowWrapper)
  customElements.define("ovl-trowform", TableRowForm)
  customElements.define("ovl-trowformb", TableRowFormBig)
  customElements.define("ovl-trowdetailview", TableRowDetailView)
  customElements.define("ovl-trowsc", TableRowSaveCancel)
  customElements.define("ovl-textarea", OvlTextArea)
  customElements.define("ovl-textbox", OvlTextbox)
  customElements.define("ovl-checkbox", OvlCheckbox)
  customElements.define("ovl-listcontrol", OvlListControl)
  customElements.define("ovl-option", OvlOption)
  customElements.define("ovl-hitlist", OvlHitList)
  customElements.define("ovl-timebox", OvlTime)
  customElements.define("ovl-datebox", OvlDate)
  customElements.define("ovl-dialog", OvlDialog)
  customElements.define("ovl-dialogholder", OvlDialogHolder)
  customElements.define("ovl-snack", OvlSnack)
  customElements.define("ovl-controlcustomhint", OvlCustomValueHint)
  customElements.define("ovl-controlvalidationhint", OvlValidationHint)
  customElements.define("ovl-controllabel", OvlControlLabel)
}
