import { OvlBaseElement } from "../OvlBaseElement"
import { TemplateResult, html } from "lit-html"
import { DialogType, FormType } from "../.."

export type DialogsState = {
  elementIdToFocusAfterOpen?: string
  elementIdToFocusAfterClose?: string
  visible: boolean
  isClosing: boolean
  formType?: FormType
  formId?: string
}

export type DialogParts = {
  header?: TemplateResult | TemplateResult[]
  title?: string
  body?: TemplateResult | TemplateResult[]
  footer?: TemplateResult | TemplateResult[]
  customClass?: string
  keyHandlerFn?: any
  closedCallbackFn?: any
}

export class OvlBaseDialog extends OvlBaseElement {
  dialogType: DialogType
  zIndex: number
  opened: boolean
  elementIdToFocusAfterClose: string
  elementToFocusAfterClose: Element

  closedCallbackFn: any

  defaultKeyHandler = (e: Event) => {}

  getDialogTemplate = (dialogParts: DialogParts): TemplateResult => {
    if (!this.closedCallbackFn && dialogParts.closedCallbackFn) {
      this.closedCallbackFn = dialogParts.closedCallbackFn
    }
    let dialogState = this.state.ovl.dialogs[this.dialogType]
    if (!this.opened) {
      if (!dialogState.elementIdToFocusAfterClose) {
        this.elementToFocusAfterClose = document.activeElement
      } else {
        this.elementIdToFocusAfterClose = dialogState.elementIdToFocusAfterClose
      }

      if (dialogState.elementIdToFocusAfterOpen) {
        setTimeout(() => {
          document.getElementById(dialogState.elementIdToFocusAfterOpen).focus()
        }, 200)
      }
    }
    this.opened = true

    // now put together the template
    let keyHandler = this.defaultKeyHandler
    if (dialogParts.keyHandlerFn) {
      keyHandler = dialogParts.keyHandlerFn
    }

    let fullheader
    if (dialogParts.header || dialogParts.title) {
      let title
      if (dialogParts.title) {
        title = html`
          <div class="fd-bar__element">
            <h3 class="fd-dialog__title">
              ${dialogParts.title}
            </h3>
          </div>
        `
      }
      let header
      if (dialogParts.header) {
        title = html`
          <div class="fd-bar__element">
            ${dialogParts.header}
          </div>
        `
      }

      fullheader = html`
        <header class="fd-dialog__header fd-bar ovl-dialog-header">
          <div class="fd-bar__left">
            ${header} ${title}
          </div>
        </header>
      `
    }
    let body
    if (dialogParts.body) {
      body = html`<div class="fd-dialog__body ovl-dialog-body">
        ${dialogParts.body}
      </div>`
    }

    let footer
    if (dialogParts.footer) {
      footer = html`<footer
        class="fd-dialog__footer fd-bar fd-bar--footer ovl-dialog-footer"
      >
        <div class="fd-bar__right">
          ${dialogParts.footer}
        </div>
      </footer>`
    }
    let disableIfClosing = ""
    if (dialogState.isClosing) {
      disableIfClosing = "ovl-disabled"
    }
    let customClass = ""
    if (dialogParts.customClass) {
      customClass = dialogParts.customClass
    }
    return html`<div
      style="z-index:${this.zIndex};"
      class="fd-dialog fd-dialog--active fadeInDialog ${disableIfClosing} "
    >
      <div
        class="fd-dialog__content ovl-dialog ovl-dialog-${this
          .dialogType} ${customClass}"
        role="dialog"
        aria-modal="true"
        @keydown=${keyHandler}
      >
        ${fullheader} ${body} ${footer}
      </div>
    </div>`
  }

  closeDialog = () => {
    if (this.state.ovl.uiState.hasOSReducedMotion) {
      this.removeDialog()
    } else {
      //this.state.ovl.dialogs[this.dialogType].isClosing = true
      let el = this.getElementsByClassName("fd-dialog")[0]
      if (el) {
        el.classList.remove("fadeInDialog")
        el.classList.add("fadeOutDialog")
      }
    }
  }

  handleAnimationEnd = (e) => {
    if (e.animationName === "fadeOutDialog") {
      this.removeDialog()
    }
  }
  removeDialog = () => {
    this.opened = false
    if (this.closedCallbackFn) {
      this.closedCallbackFn()
    }
    if (this.elementIdToFocusAfterClose) {
      document.getElementById(this.elementIdToFocusAfterClose).focus()
    } else if (this.elementToFocusAfterClose) {
      //@ts-ignore
      if (this.elementToFocusAfterClose.focus) {
        //@ts-ignore
        this.elementToFocusAfterClose.focus()
      }
    }
    this.state.ovl.dialogs[this.dialogType].visible = false
    this.state.ovl.dialogs[this.dialogType].isClosing = false

    // also reset form if necessary
    if (this.state.ovl.screens.nav.formTypeToReset) {
      let formTypeToReset = this.state.ovl.screens.nav.formTypeToReset
      let formIdToReset = this.state.ovl.screens.nav.formIdToReset
      setTimeout(() => {
        this.actions.ovl.form.ResetForm(
          this.state.ovl.forms[formTypeToReset][formIdToReset]
        )
      }, 10)
      this.state.ovl.screens.nav.formTypeToReset = undefined
    }
  }
  checkDialog = (): TemplateResult | null | "go on" => {
    if (!this.state.ovl.dialogs[this.dialogType]) {
      return null
    }
    if (!this.state.ovl.dialogs[this.dialogType].visible) {
      return null
    }

    if (this.state.ovl.dialogs[this.dialogType].isClosing) {
      this.closeDialog()
      return undefined
    }
    return "go on"
  }

  connectedCallback() {
    if (!this.state.ovl.dialogs[this.dialogType]) {
      this.state.ovl.dialogs[this.dialogType] = {
        visible: false,
        isClosing: false,
      }
    }

    this.addEventListener("animationend", this.handleAnimationEnd)
    super.connectedCallback()
  }
  disconnectedCallback() {
    this.removeEventListener("animationend", this.handleAnimationEnd)
    super.disconnectedCallback()
  }
}
