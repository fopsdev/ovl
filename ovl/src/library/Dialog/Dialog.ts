import { T, modalDialog } from "../../global/globals"
import { html, TemplateResult } from "lit-html"
import { OvlBaseElement } from "../OvlBaseElement"

export type DialogChangedParam = {
  dialogState: ModalDialogState
  result: ResultType
}
type OkType = "AppOk" | "AppYes" | "NoButton"
type CancelType = "AppCancel" | "AppNo" | "NoButton"

export type ResultType = undefined | 1 | 2

export type OpenModalDialogState = {
  customClass: string
  type: DialogType
  text: string | TemplateResult
  ok: OkType
  cancel: CancelType
  default: ResultType
}

export type ModalDialogState = {
  customClass: string
  type: DialogType
  text: string | TemplateResult
  okText: string
  cancelText: string
  result: ResultType
  default: ResultType
}

import { DialogHolderParams } from "./OvlDialogHolder"
import { DialogType } from "./OvlDialogBase"

export type LoginFormState = {}

export type FieldId = "pw" | "user"

export class OvlDialog extends OvlBaseElement {
  handleResult(result: ResultType) {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: result,
    })
  }

  handleOkClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: 1,
    })
  }

  handleCancelClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: 2,
    })
  }

  handleDefault(def: ResultType) {
    if (
      (def == 1 && this.state.ovl.libState.dialog.okText == "") ||
      (def == 2 && this.state.ovl.libState.dialog.cancelText == "")
    ) {
      return
    }
    this.actions.ovl.internal.DialogDefaultChanged({ default: def })
  }

  keyHandler = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.key == "Enter") {
      if (this.state.ovl.libState.dialog.default == 1) {
        this.handleResult(1)
      } else {
        this.handleResult(2)
      }
    } else if (e.key == "ArrowRight") {
      if (this.state.ovl.libState.dialog.default == 1) {
        this.handleDefault(2)
      }
    } else if (e.key == "ArrowLeft") {
      if (this.state.ovl.libState.dialog.default == 2) {
        this.handleDefault(1)
      }
    } else if (e.key == "Tab") {
      if (this.state.ovl.libState.dialog.default == 2) {
        this.handleDefault(1)
      } else {
        this.handleDefault(2)
      }
    }
  }
  getBody = () => {
    let lines
    if (typeof modalDialog.text === "string") {
      lines = modalDialog.text.split(/\r?\n/)
      return lines.map((e) => html` ${e}<br /> `)
    } else {
      lines = modalDialog.text
    }
    return lines
  }
  getFooter = () => {
    let okButton = null
    let cancelButton = null
    if (this.state.ovl.libState.dialog.okText) {
      okButton = html`<div class="fd-bar__element">
        <button
          @click=${this.handleOkClick}
          class="fd-dialog__decisive-button fd-button ${this.state.ovl.libState
            .dialog.okText == ""
            ? " hide"
            : ""}"
          aria-selected="${this.state.ovl.libState.dialog.default == 1}"
          id="ovldialogok"
        >
          ${T("AppOk")}
        </button>
      </div> `
    }

    if (this.state.ovl.libState.dialog.cancelText) {
      cancelButton = html`
        <div class="fd-bar__element">
          <button
            @click=${this.handleCancelClick}
            class="fd-dialog__decisive-button fd-button ${this.state.ovl
              .libState.dialog.cancelText == ""
              ? " hide"
              : ""}"
            aria-selected="${this.state.ovl.libState.dialog.default == 2}"
            id="ovldialogcancel"
          >
            ${T("AppCancel")}
          </button>
        </div>
      `
    }
    return html`${okButton} ${cancelButton}`
  }

  async getUI() {
    return this.track(() => {
      let dependsOn = this.state.ovl.dialogs.Modal.visible

      if (!dependsOn) {
        return null
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the hiolder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts

      dialogHolderParams = {
        dialogParts: {
          title: () => "Zeiterfassung",
          body: () => this.getBody(),
          footer: () => this.getFooter(),
          keyHandlerFn: this.keyHandler,
          dismissedCallbackFn: this.handleCancelClick,
          type: this.state.ovl.libState.dialog.type,
          customClass: () => this.state.ovl.libState.dialog.customClass,
        },
        zIndex: 1001,
        dialogType: "Modal",
      }
      return html`<ovl-dialogholder
        .dialogHolderParams=${dialogHolderParams}
      ></ovl-dialogholder>`
    })
  }
}
