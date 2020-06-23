import { OvlBaseElement } from "../OvlBaseElement"
import { TemplateResult, html } from "lit-html"
import { DialogType } from "../.."

export type DialogsState = {
  elementIdToFocusAfterOpen?: string
  elementIdToFocusAfterClose?: string
  visible: boolean
  isClosing: boolean
}

export type DialogParts = {
  header?: TemplateResult | TemplateResult[]
  title?: string
  body?: TemplateResult | TemplateResult[]
  footer?: TemplateResult | TemplateResult[]
  keyHandlerFn?: any
}

export class OvlBaseDialog extends OvlBaseElement {
  dialogType: DialogType
  zIndex: number
  opened: boolean
  elementIdToFocusAfterClose: string
  elementToFocusAfterClose: Element
  lastTemplateResult: TemplateResult

  defaultKeyHandler = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  getDialogTemplate = (dialogParts: DialogParts): TemplateResult => {
    if (!this.opened) {
      let dialogState = this.state.ovl.dialogs.Modal

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
        <header class="fd-dialog__header fd-bar">
          <div class="fd-bar__left">
            ${header} ${title}
          </div>
        </header>
      `
    }
    let body
    if (dialogParts.body) {
      body = html`<div class="fd-dialog__body ">${dialogParts.body}</div>`
    }

    let footer
    if (dialogParts.footer) {
      footer = html`<footer class="fd-dialog__footer fd-bar fd-bar--footer ">
        <div class="fd-bar__right">
          ${dialogParts.footer}
        </div>
      </footer>`
    }

    this.lastTemplateResult = html`<div
      style="z-index:${this.zIndex};"
      class="fd-dialog fd-dialog--active animated fadeIn faster"
    >
      <div
        class="fd-dialog__content fd-dialog__content--s"
        role="dialog"
        aria-modal="true"
        @keydown=${keyHandler}
      >
        ${fullheader} ${body} ${footer}
      </div>
    </div>`
    return this.lastTemplateResult
  }

  closeDialog = () => {
    if (this.state.ovl.uiState.hasOSReducedMotion) {
      this.removeDialog()
    } else {
      this.state.ovl.dialogs[this.dialogType].isClosing = true
      let el = this.getElementsByClassName("fd-dialog")[0]
      el.classList.remove("fadeIn")
      el.classList.add("fadeOut")
    }
    //this.animation = "animated fadeOut faster"
  }
  // openDialog = (openDialogOptions?: OpenDialogOptions) => {
  //   if (!this.opened) {
  //     let zindex = 2
  //     this.elementIdToFocusAfterClose = undefined
  //     this.elementToFocusAfterClose = undefined

  //     if (openDialogOptions) {
  //       if (!openDialogOptions.elementIdToFocusAfterClose) {
  //         this.elementToFocusAfterClose = document.activeElement
  //       } else {
  //         this.elementIdToFocusAfterClose =
  //           openDialogOptions.elementIdToFocusAfterClose
  //       }
  //       if (openDialogOptions.zIndex) {
  //         zindex = 2
  //       }
  //     }
  //     this.style.zIndex = zindex.toString()
  //     if (openDialogOptions && openDialogOptions.elementIdToFocusAfterOpen) {
  //       setTimeout(() => {
  //         document
  //           .getElementById(openDialogOptions.elementIdToFocusAfterOpen)
  //           .focus()
  //       }, 200)
  //     }
  //   }
  //   this.opened = true
  // }

  handleAnimationEnd = (e) => {
    if (e.animationName === "fadeOut") {
      this.removeDialog()
    }
  }
  removeDialog = () => {
    this.opened = false
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
  }
  checkDialog = (): TemplateResult | null => {
    if (!this.state.ovl.dialogs[this.dialogType]) {
      return null
    }
    if (!this.state.ovl.dialogs[this.dialogType].visible) {
      return null
    }
    if (this.state.ovl.dialogs[this.dialogType].isClosing) {
      this.closeDialog()
      return this.lastTemplateResult
    }
    return undefined
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
