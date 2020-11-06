import {
  OvlBaseDialog,
  DialogParts,
  DialogType,
  DialogsState,
} from "./OvlDialogBase"
import { OvlDialog } from "../.."
import { TemplateResult } from "lit-html"

export type DialogGetParts = {
  header?: () => TemplateResult | TemplateResult[] | Promise<any>
  title?: () => string
  body?: () => TemplateResult | TemplateResult[] | Promise<any>
  footer?: () => TemplateResult | TemplateResult[] | Promise<any>
  keyHandlerFn?: any
  closedCallbackFn?: any
  dismissedCallbackFn?: any
  emptySpaceClickHandlerFn?: any
  updatedHandlerFn?: any
  afterRenderHandlerFn?: any
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

  afterRender() {
    if (this.dialogHolderParams.dialogParts.afterRenderHandlerFn) {
      this.dialogHolderParams.dialogParts.afterRenderHandlerFn()
    }
    super.afterRender()
  }

  async getUI() {
    console.log("checkDialog in Holder")
    let chk = this.checkDialog()
    if (chk != "go on") {
      return chk
    }

    //now that we are here that means there is an dialog opening
    // so if there are other dialogs in closing state steal the focusAfterClose from them...
    let dialogs = this.state.ovl.dialogs
    let dialogClosingKey = Object.keys(dialogs).filter((k) => {
      let dlg: DialogsState = dialogs[k]
      return dlg.closing
    })
    if (dialogClosingKey.length > 0) {
      let closingDialog: DialogsState = dialogs[dialogClosingKey[0]]
      dialogs[this.dialogType].elementIdToFocusAfterClose =
        closingDialog.elementIdToFocusAfterClose
      closingDialog.elementIdToFocusAfterClose = undefined
    }

    return await this.track(async () => {
      dialogs[this.dialogType].closing
      let d = this.dialogHolderParams.dialogParts
      return await this.getDialogTemplate({
        title: d.title ? await d.title() : undefined,
        body: d.body ? await this.track(async () => await d.body()) : undefined,
        header: d.header
          ? await this.track(async () => await d.header())
          : undefined,
        footer: d.footer
          ? await this.track(async () => await d.footer())
          : undefined,
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
