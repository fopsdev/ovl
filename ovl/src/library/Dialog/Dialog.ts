import { OvlBaseElement } from "../OvlBaseElement"
import { T } from "../../global/globals"
import { html, nothing } from "lit-html"

export type DialogChangedParam = {
  dialogState: DialogState
  result: ResultType
}
type OkType = "AppOk" | "AppYes" | "NoButton"
type CancelType = "AppCancel" | "AppNo" | "NoButton"

export type ResultType = undefined | 1 | 2

export type OpenDialogState = {
  text: string
  ok: OkType
  cancel: CancelType
  default: ResultType
}

export type DialogState = {
  text: string
  okText: string
  cancelText: string
  visible: boolean
  closing: boolean
  result: ResultType
  default: ResultType
}

export class OvlDialog extends OvlBaseElement {
  props: any

  focusSet: boolean

  handleAnimationEnd = (e) => {
    if (e.animationName === "fadeOut") {
      this.focusSet = false
      this.actions.ovl.internal.DialogClosed()
    }
  }

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

  init() {
    this.focusSet = false
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

  async getUI() {
    if (
      !this.state.ovl.libState.dialog ||
      !this.state.ovl.libState.dialog.visible
    ) {
      return null
    }

    let okButton = null
    let cancelButton = null
    if (this.state.ovl.libState.dialog.okText) {
      okButton = html`
        <button
          @click=${this.handleOkClick}
          class="fd-button ${this.state.ovl.libState.dialog.okText == ""
            ? " hide"
            : ""}"
          aria-selected="${this.state.ovl.libState.dialog.default == 1}"
          id="ovldialogok"
        >
          ${T("AppOk")}
        </button>
      `
    }

    if (this.state.ovl.libState.dialog.cancelText) {
      cancelButton = html`
        <button
          @click=${this.handleCancelClick}
          class="fd-button ${this.state.ovl.libState.dialog.cancelText == ""
            ? " hide"
            : ""}"
          aria-selected="${this.state.ovl.libState.dialog.default == 2}"
          id="ovldialogcancel"
        >
          ${T("AppCancel")}
        </button>
      `
    }
    let lines: string[] = this.state.ovl.libState.dialog.text.split(/\r?\n/)

    let animation = "animated fadeIn faster"
    if (this.state.ovl.libState.dialog.closing) {
      animation = "animated fadeOut faster nopointerevents"
    }

    return html`
      <div
        style="z-index:1007;"
        class="fd-shell__overlay fd-overlay fd-overlay--modal ${animation}"
        aria-hidden="false"
      >
        <div class="fd-panel" tabindex="0" @keydown=${this.keyHandler}>
          <div class="fd-modal__content" role="document">
            <div class="fd-modal__header ">
              <h3 class="fd-modal__title" style="text-align: center;">
                ${T("AppTitle")}
              </h3>
            </div>
            <div class="fd-modal__body ">
              ${lines.map((e) => html` ${e}<br /> `)}
            </div>
            <footer class="fd-modal__footer ">
              <div class="fd-modal__actions">
                ${okButton} ${cancelButton}
              </div>
            </footer>
          </div>
        </div>
      </div>
    `
  }
  updated() {
    // set focus to default element
    // workaround because autofocus attribute only works 1st time
    if (
      this.state.ovl.libState.dialog &&
      this.state.ovl.libState.dialog.visible &&
      !this.focusSet
    ) {
      let id = "ovldialogcancel"
      if (this.state.ovl.libState.dialog.default == 1) {
        id = "ovldialogok"
      }
      document.getElementById(id).focus()
    }
    super.updated()
  }
  connectedCallback() {
    this.addEventListener("animationend", this.handleAnimationEnd)
    super.connectedCallback()
  }
  disconnectedCallback() {
    this.removeEventListener("animationend", this.handleAnimationEnd)
    super.disconnectedCallback()
  }
}
