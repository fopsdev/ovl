import { OvlBaseElement } from "../../library/OvlBaseElement"
import { html, TemplateResult } from "lit-html"

export let overlayToRender: {
  resolve?: any
  getTemplate: () => {}
  overlayDismissedCallback: any
  overlayClosedCallback: any
  template?: any
  elementToFocusAfterClose?: Element
}
overlayToRender = {
  overlayDismissedCallback: undefined,
  overlayClosedCallback: undefined,
  getTemplate: async () => {
    return new Promise((r) => {
      overlayToRender.resolve = r
    })
  },
}

export type OverlayState = {
  open: boolean
  closing: boolean
}

export class OvlOverlay extends OvlBaseElement {
  handleAnimationEnd = (e: AnimationEvent) => {
    if (
      this.state.ovl.libState.overlay.closing &&
      e.animationName === "fadeOut"
    ) {
      this.actions.ovl.internal.CloseOverlay()
    }
  }

  handleDismissed = (e: Event) => {
    //@ts-ignore
    if (e.target.id === "ovloverlay") {
      e.stopPropagation()
      e.preventDefault()
      if (overlayToRender.overlayDismissedCallback) {
        overlayToRender.overlayDismissedCallback()
      } else {
        this.actions.ovl.overlay.CloseOverlay()
      }
    }
  }

  init() {
    this.async = true
    super.init()
  }

  async getUIAsync() {
    if (!this.state.ovl.libState.overlay.open) {
      return null
    }

    let animation = "animated fadeIn faster"

    if (this.state.ovl.libState.overlay.closing) {
      animation = "animated fadeOut faster nopointerevents"
    }
    if (!overlayToRender.template) {
      overlayToRender.template = await overlayToRender.getTemplate()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation()
      if (e.key === "Escape") {
        if (overlayToRender.overlayDismissedCallback) {
          overlayToRender.overlayDismissedCallback()
        } else {
          this.actions.ovl.overlay.CloseOverlay()
        }
      }
    }

    return Promise.resolve(html`
      <div
        tabindex="0"
        id="ovloverlay"
        @keydown=${(e) => handleKeyDown(e)}
        @mousedown=${this.handleDismissed}
        class="fd-shell__overlay fd-overlay fd-overlay--modal ${animation}"
        aria-hidden="false"
      >
        ${overlayToRender.template}
      </div>
    `)
  }
  updated() {
    let el = document.getElementById("ovloverlay")
    if (el) {
      el.focus()
    }
    super.updated()
  }
  connectedCallback() {
    this.addEventListener("animationend", this.handleAnimationEnd, true)
    super.connectedCallback()
  }
  disconnectedCallback() {
    this.removeEventListener("animationend", this.handleAnimationEnd)
  }
}
