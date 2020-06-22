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
    return this.track(() => {
      if (
        !this.state.ovl.libState.dialog ||
        !this.state.ovl.libState.dialog.visible
      ) {
        return null
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

      let animation = "animated fadeIn faster"
      if (this.state.ovl.libState.dialog.closing) {
        animation = "animated fadeOut faster nopointerevents"
      }

      return html`
        <div
          style="z-index:10;"
          class="fd-dialog fd-dialog fd-dialog--active ${animation}"
        >
          <div
            class="fd-dialog__content fd-dialog__content--s"
            role="dialog"
            aria-modal="true"
            @keydown=${this.keyHandler}
          >
            <header class="fd-dialog__header fd-bar">
              <div class="fd-bar__left">
                <div class="fd-bar__element">
                  <h3 class="fd-dialog__title">
                    ${T("AppTitle")}
                  </h3>
                </div>
              </div>
            </header>
            <div class="fd-dialog__body ">
              ${lines.map((e) => html` ${e}<br /> `)}
            </div>
            <footer class="fd-dialog__footer fd-bar fd-bar--footer ">
              <div class="fd-bar__right">
                ${okButton} ${cancelButton}
              </div>
            </footer>
          </div>
        </div>
      `
    })
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
