import { T, modalDialog } from "../../global/globals"
import { html, TemplateResult } from "lit-html"
import { OvlBaseElement } from "../OvlBaseElement"

export type DialogChangedParam = {
  dialogState: ModalDialogState
  result: ResultType
}
type OkType = "AppOk" | "AppYes" | "NoButton" | string
type CancelType = "AppCancel" | "AppNo" | "NoButton" | string

export type ResultType = undefined | 1 | 2

export type OpenModalDialogState = {
  title: string
  customClass: string
  type: DialogType
  text: string | TemplateResult
  ok: OkType
  cancel: CancelType
  default: ResultType
}

export type ModalDialogState = {
  title: string
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
import { ovl } from "../.."

export type LoginFormState = {}

export type FieldId = "pw" | "user"

export class OvlDialog extends OvlBaseElement {
  dialog: typeof ovl.state.ovl.libState.dialog
  dialogs: typeof ovl.state.ovl.dialogs

  constructor() {
    super()
    this.dialog = this.state.ovl.libState.dialog
    this.dialogs = this.state.ovl.dialogs
  }

  handleResult(result: ResultType) {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.dialog,
      result: result,
    })
  }

  handleOkClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.dialog,
      result: 1,
    })
  }

  handleCancelClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.dialog,
      result: 2,
    })
  }

  handleDefault(def: ResultType) {
    if (
      (def == 1 && this.dialog.okText == "") ||
      (def == 2 && this.dialog.cancelText == "")
    ) {
      return
    }
    this.actions.ovl.internal.DialogDefaultChanged({ default: def })
  }

  keyHandler = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.key)
    if (e.key == "Enter") {
      if (this.dialog.default == 1) {
        this.handleResult(1)
      } else {
        this.handleResult(2)
      }
    } else if (e.key == "ArrowRight") {
      if (this.dialog.default == 1) {
        this.handleDefault(2)
      }
    } else if (e.key == "ArrowLeft") {
      if (this.dialog.default == 2) {
        this.handleDefault(1)
      }
    } else if (e.key == "Tab") {
      if (this.dialog.default == 2) {
        this.handleDefault(1)
      } else {
        this.handleDefault(2)
      }
    } else if (e.key === "Escape") {
      if (this.dialog.cancelText !== "NoButton") {
        this.handleDefault(2)
        setTimeout(() => {
          this.handleResult(2)
        }, 100)
      } else {
        this.handleResult(1)
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
    if (this.dialog.okText) {
      okButton = html`<div class="fd-bar__element">
        <button
          @click=${this.handleOkClick}
          class="fd-dialog__decisive-button fd-button ${this.state.ovl.libState
            .dialog.okText == ""
            ? " hide"
            : ""}"
          aria-selected="${this.dialog.default == 1}"
          id="ovldialogok"
        >
          ${this.dialog.okText}
        </button>
      </div> `
    }

    if (this.dialog.cancelText) {
      cancelButton = html`
        <div class="fd-bar__element">
          <button
            @click=${this.handleCancelClick}
            class="fd-dialog__decisive-button fd-button ${this.state.ovl
              .libState.dialog.cancelText == ""
              ? " hide"
              : ""}"
            aria-selected="${this.dialog.default == 2}"
            id="ovldialogcancel"
          >
            ${this.dialog.cancelText}
          </button>
        </div>
      `
    }
    return html`${okButton} ${cancelButton}`
  }

  async getUI() {
    return this.track(() => {
      let dependsOn = this.dialogs.Modal.visible

      if (!dependsOn) {
        return null
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the hiolder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts

      dialogHolderParams = {
        dialogParts: {
          title: () => this.dialog.title,
          body: () => this.getBody(),
          footer: () => this.getFooter(),
          keyHandlerFn: this.keyHandler,
          dismissedCallbackFn: this.handleCancelClick,
          type: this.dialog.type,
          customClass: () => this.dialog.customClass,
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
