import { html } from "lit-html"
import { OvlBaseElement } from "../../library/OvlBaseElement"
import { overlay2ToRender } from "../Overlay2/Overlay2"

export let overlayToRender: {
  resolve?: any
  getTemplate: () => {}
  overlayDismissedCallback: any
  overlayClosedCallback: any
  template?: any
  elementToFocusAfterClose?: Element
  elementToFocusAfterOpen?: Element
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
    super.init()
  }

  async getUI() {
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

    return this.track(async () => {
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

      return Promise.resolve(html`
        <div
          tabindex="0"
          id="ovloverlay"
          @keydown=${(e) => handleKeyDown(e)}
          @mousedown=${this.handleDismissed}
          class="fd-shell__overlay fd-overlay fd-overlay--modal ovl-overlay ${animation}"
          aria-hidden="false"
        >
          ${overlayToRender.template}
        </div>
      `)
    })
  }
  updated() {
    if (!this.state.ovl.libState.overlay.closing) {
      let el = overlayToRender.elementToFocusAfterOpen
      if (!el) {
        el = document.getElementById("ovloverlay")
      }
      if (el) {
        //@ts-ignore
        el.focus()
      }
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
