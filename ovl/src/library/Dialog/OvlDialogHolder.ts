import { OvlBaseDialog, DialogParts, DialogType } from "./OvlDialogBase"
import { OvlDialog } from "../.."
import { TemplateResult } from "lit-html"

export type DialogGetParts = {
  header?: () => TemplateResult | TemplateResult[]
  title?: () => string
  body?: () => TemplateResult | TemplateResult[]
  footer?: () => TemplateResult | TemplateResult[]
  keyHandlerFn?: any
  closedCallbackFn?: any
  dismissedCallbackFn?: any
  emptySpaceClickHandlerFn?: any
  updatedHandlerFn?: any
  type?: DialogType
  customClass?: () => string
}

export type DialogHolderParams = {
  dialogParts: DialogGetParts
  dialogType: OvlDialog
  zIndex: number
}
export class OvlDialogHolder extends OvlBaseDialog {
  props: any
  dialogHolderParams: DialogHolderParams
  init() {
    this.dialogType = this.dialogHolderParams.dialogType
    this.zIndex = this.dialogHolderParams.zIndex
  }
  updated() {
    if (this.dialogHolderParams.dialogParts.updatedHandlerFn) {
      this.dialogHolderParams.dialogParts.updatedHandlerFn()
    }
    super.updated()
  }
  async getUI() {
    let chk = this.checkDialog()
    if (chk != "go on") {
      return chk
    }
    return this.track(() => {
      this.state.ovl.dialogs[this.dialogType].closing
      let d = this.dialogHolderParams.dialogParts
      return this.getDialogTemplate({
        title: d.title ? d.title() : undefined,
        body: d.body ? d.body() : undefined,
        header: d.header ? d.header() : undefined,
        footer: d.footer ? d.footer() : undefined,
        customClass: d.customClass ? d.customClass() : undefined,
        type: d.type ? d.type : undefined,
        keyHandlerFn: d.keyHandlerFn,
        dismissHandlerFn: d.dismissedCallbackFn,
        emptySpaceClickHandlerFn: d.emptySpaceClickHandlerFn,
        closedCallbackFn: d.closedCallbackFn,
      })
    })
  }
}
