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
import { OvlFormValidationHint } from "./library/Forms/Controls/FormValidationHint"
import { OvlControlLabel } from "./library/Forms/Controls/Parts/ControlLabel"
import { AddOvlCustomElement } from "./global/globals"

// don't forget to add the display block in css - file
export const defineElements = () => {
  AddOvlCustomElement("ovl-trowcontrol", TableRowControl)
  AddOvlCustomElement("ovl-tnavcontrol", TableNavControl)
  AddOvlCustomElement("ovl-tableheadermenu", TableHeaderMenu)
  AddOvlCustomElement("ovl-table", TableHeader)
  AddOvlCustomElement("ovl-trow", TableRow)
  AddOvlCustomElement("ovl-trg", TableRowWrapper)
  AddOvlCustomElement("ovl-trowform", TableRowForm)
  AddOvlCustomElement("ovl-trowformb", TableRowFormBig)
  AddOvlCustomElement("ovl-trowdetailview", TableRowDetailView)
  AddOvlCustomElement("ovl-trowsc", TableRowSaveCancel)
  AddOvlCustomElement("ovl-textarea", OvlTextArea)
  AddOvlCustomElement("ovl-textbox", OvlTextbox)
  AddOvlCustomElement("ovl-checkbox", OvlCheckbox)
  AddOvlCustomElement("ovl-listcontrol", OvlListControl)
  AddOvlCustomElement("ovl-option", OvlOption)
  AddOvlCustomElement("ovl-hitlist", OvlHitList)
  AddOvlCustomElement("ovl-timebox", OvlTime)
  AddOvlCustomElement("ovl-datebox", OvlDate)
  AddOvlCustomElement("ovl-dialog", OvlDialog)
  AddOvlCustomElement("ovl-dialogholder", OvlDialogHolder)
  AddOvlCustomElement("ovl-snack", OvlSnack)
  AddOvlCustomElement("ovl-controlcustomhint", OvlCustomValueHint)
  AddOvlCustomElement("ovl-controlvalidationhint", OvlValidationHint)
  AddOvlCustomElement("ovl-formvalidationhint", OvlFormValidationHint)
  AddOvlCustomElement("ovl-controllabel", OvlControlLabel)
}
