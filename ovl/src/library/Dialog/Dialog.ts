import { T } from "../../global/globals"
import { html } from "lit-html"
import { OvlBaseDialog } from "./OvlDialogBase"

export type DialogChangedParam = {
  dialogState: ModalDialogState
  result: ResultType
}
type OkType = "AppOk" | "AppYes" | "NoButton"
type CancelType = "AppCancel" | "AppNo" | "NoButton"

export type ResultType = undefined | 1 | 2

export type OpenModalDialogState = {
  text: string
  ok: OkType
  cancel: CancelType
  default: ResultType
}

export type ModalDialogState = {
  text: string
  okText: string
  cancelText: string
  result: ResultType
  default: ResultType
}

export class OvlDialog extends OvlBaseDialog {
  props: any

  handleResult(result: ResultType) {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: result,
    })
    this.closeDialog()
  }

  handleOkClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: 1,
    })
    this.closeDialog()
  }

  handleCancelClick = () => {
    this.actions.ovl.internal.DialogChanged({
      dialogState: this.state.ovl.libState.dialog,
      result: 2,
    })
    this.closeDialog()
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
  init() {
    this.dialogType = "Modal"
    this.zIndex = 10
  }
  async getUI() {
    return this.track(() => {
      let chk = this.checkDialog()
      if (chk !== undefined) {
        return chk
      }
      let okButton = null
      let cancelButton = null
      if (this.state.ovl.libState.dialog.okText) {
        okButton = html`<div class="fd-bar__element">
          <button
            @click=${this.handleOkClick}
            class="fd-dialog__decisive-button fd-button ${this.state.ovl
              .libState.dialog.okText == ""
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
      let lines: string[] = this.state.ovl.libState.dialog.text.split(/\r?\n/)

      // let animation = "animated fadeIn faster"
      // if (this.state.ovl.libState.dialog.closing) {
      //   animation = "animated fadeOut faster nopointerevents"
      // }

      let body = lines.map((e) => html` ${e}<br /> `)

      let footer = html`${okButton} ${cancelButton}`

      return this.getDialogTemplate({
        body,
        footer,
        title: T("AppDialogTitle"),
      })
    })
  }
  // connectedCallback() {
  //   this.addEventListener("animationend", this.handleAnimationEnd)
  //   super.connectedCallback()
  // }
  // disconnectedCallback() {
  //   this.removeEventListener("animationend", this.handleAnimationEnd)
  //   super.disconnectedCallback()
  // }
}
