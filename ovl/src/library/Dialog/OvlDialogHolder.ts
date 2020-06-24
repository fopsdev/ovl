import { OvlBaseDialog, DialogParts } from "./OvlDialogBase"
import { DialogType } from "../.."
import { TemplateResult } from "lit-html"

export type DialogGetParts = {
  header?: () => TemplateResult | TemplateResult[]
  title?: () => string
  body?: () => TemplateResult | TemplateResult[]
  footer?: () => TemplateResult | TemplateResult[]
  keyHandlerFn?: any
}

export type DialogHolderParams = {
  dialogParts: DialogGetParts
  dialogType: DialogType
  zIndex: number
}
export class OvlDialogHolder extends OvlBaseDialog {
  props: any
  dialogHolderParams: DialogHolderParams
  init() {
    this.dialogType = this.dialogHolderParams.dialogType
    this.zIndex = this.dialogHolderParams.zIndex
  }
  async getUI() {
    let chk = this.checkDialog()
    if (chk != "go on") {
      return chk
    }
    return this.track(() => {
      this.state.ovl.dialogs[this.dialogType].isClosing
      let d = this.dialogHolderParams.dialogParts
      return this.getDialogTemplate({
        title: d.title ? d.title() : undefined,
        body: d.body ? d.body() : undefined,
        header: d.header ? d.header() : undefined,
        footer: d.footer ? d.footer() : undefined,
        keyHandlerFn: d.keyHandlerFn,
      })
    })
  }
}
