import { OvlBaseElement } from "../OvlBaseElement"
import { TemplateResult, html } from "lit-html"
import { OvlDialog, FormType } from "../.."
import { SetFocus } from "../../global/globals"

export type DialogsState = {
  elementIdToFocusAfterOpen?: string
  elementIdToFocusAfterClose?: string
  visible: boolean
  closing: boolean
  formType?: FormType
  formId?: string
}

export type DialogType =
  | "standard"
  | "confirmation"
  | "error"
  | "success"
  | "warning"
  | "information"

export type DialogParts = {
  header?: TemplateResult | TemplateResult[]
  title?: string
  body?: TemplateResult | TemplateResult[]
  footer?: TemplateResult | TemplateResult[]
  customClass?: string
  keyHandlerFn?: any
  dismissHandlerFn?: any
  emptySpaceClickHandlerFn?: any
  closedCallbackFn?: any
  type?: DialogType
}

export class OvlBaseDialog extends OvlBaseElement {
  dialogType: OvlDialog
  zIndex: number
  opened: boolean
  elementIdToFocusAfterClose: string
  elementToFocusAfterClose: Element

  closedCallbackFn: any
  dismissCallbackFn: any

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
      let elementToFocus = dialogState.elementIdToFocusAfterOpen
      if (!elementToFocus) {
        elementToFocus = "ovl-dialog"
      }
      if (elementToFocus) {
        setTimeout(() => {
          SetFocus(document.getElementById(elementToFocus))
        }, 100)
      }
    }
    this.opened = true

    // now put together the template

    let handleTopLevelClick = (e: Event) => {
      e.stopPropagation()
      //e.preventDefault()
      if (dialogParts.emptySpaceClickHandlerFn) {
        dialogParts.emptySpaceClickHandlerFn()
      }
    }

    let handleDismiss = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()

      if (dialogParts.dismissHandlerFn) {
        dialogParts.dismissHandlerFn()
      }
    }
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
            <h3 class="fd-message-box__title">
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
        <header class="fd-message-box__header fd-bar ovl-dialog-header">
          <div class="fd-bar__left">
            ${header} ${title}
          </div>
        </header>
      `
    }
    let scrollable = "scrollableOverlay"
    if (this.state.ovl.uiState.isMobile) {
      scrollable = "scrollableMobileOverlay"
    }

    let body
    if (dialogParts.body) {
      body = html`<div
        class="fd-message-box__body ovl-dialog-body ${scrollable}"
      >
        ${dialogParts.body}
      </div>`
    }

    let footer
    if (dialogParts.footer) {
      footer = html`<footer
        class="fd-message-box__footer fd-bar fd-bar--footer ovl-dialog-footer"
      >
        <div class="fd-bar__right">
          ${dialogParts.footer}
        </div>
      </footer>`
    }
    let disableIfClosing = ""
    if (dialogState.closing) {
      disableIfClosing = "ovl-disabled"
    }
    let customClass = ""
    if (dialogParts.customClass) {
      customClass = dialogParts.customClass
    }
    let typeClass = ""
    if (dialogParts.type) {
      typeClass = "fd-message-box--" + dialogParts.type
    }

    return html`<div
      style="z-index:${this.zIndex};"
      class="fd-message-box ${typeClass} fd-message-box--active fadeInDialog ${disableIfClosing} "
      @mousedown="${handleDismiss}"
    >
      <div
        class="fd-message-box__content ovl-dialog ovl-dialog-${this
          .dialogType} ${customClass}"
        role="dialog"
        tabindex="0   "
        aria-modal="true"
        @mousedown="${handleTopLevelClick}"
        @keydown=${keyHandler}
        id="ovl-dialog"
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
      let el = this.getElementsByClassName("fd-message-box")[0]
      if (el) {
        el.classList.remove("fadeInDialog")
        el.classList.add("fadeOutDialog")
      }
    }
  }

  handleAnimationEnd = (e: AnimationEvent) => {
    e.stopPropagation()
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
    this.state.ovl.dialogs[this.dialogType].closing = false

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

    if (this.state.ovl.dialogs[this.dialogType].closing) {
      this.closeDialog()
      return undefined
    }
    return "go on"
  }

  connectedCallback() {
    if (!this.state.ovl.dialogs[this.dialogType]) {
      this.state.ovl.dialogs[this.dialogType] = {
        visible: false,
        closing: false,
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
