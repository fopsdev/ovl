import { OvlBaseElement } from "../OvlBaseElement"
import { html, TemplateResult } from "lit-html"

export let overlay2ToRender: {
  resolve?: any
  getTemplate: () => {}
  overlayDismissedCallback: any
  overlayClosedCallback: any
  template?: any
  elementToFocusAfterClose?: Element
  elementToFocusAfterOpen?: Element
}
overlay2ToRender = {
  overlayDismissedCallback: undefined,
  overlayClosedCallback: undefined,
  getTemplate: async () => {
    return new Promise((r) => {
      overlay2ToRender.resolve = r
    })
  },
}

export type OverlayState = {
  open: boolean
  closing: boolean
}

export class OvlOverlay2 extends OvlBaseElement {
  handleAnimationEnd = (e: AnimationEvent) => {
    if (
      this.state.ovl.libState.overlay2.closing &&
      e.animationName === "fadeOut"
    ) {
      this.actions.ovl.internal.CloseOverlay2()
    }
  }

  handleDismissed = (e: Event) => {
    //@ts-ignore
    if (e.target.id === "ovloverlay2") {
      e.stopPropagation()
      e.preventDefault()
      if (overlay2ToRender.overlayDismissedCallback) {
        overlay2ToRender.overlayDismissedCallback()
      } else {
        this.actions.ovl.overlay.CloseOverlay2()
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
        if (overlay2ToRender.overlayDismissedCallback) {
          overlay2ToRender.overlayDismissedCallback()
        } else {
          this.actions.ovl.overlay.CloseOverlay2()
        }
      }
    }

    if (!this.state.ovl.libState.overlay2.open) {
      return null
    }

    let animation = "animated fadeIn faster"

    if (this.state.ovl.libState.overlay2.closing) {
      animation = "animated fadeOut faster nopointerevents"
    }

    if (!overlay2ToRender.template) {
      overlay2ToRender.template = await overlay2ToRender.getTemplate()
    }

    return Promise.resolve(html`
      <div
        id="ovloverlay2"
        tabindex="0"
        @keydown=${(e) => handleKeyDown(e)}
        @mousedown=${this.handleDismissed}
        id="ovloverlay2"
        class="fd-shell__overlay fd-overlay fd-overlay--modal ovl-overlay ${animation}"
        aria-hidden="false"
      >
        ${overlay2ToRender.template}
      </div>
    `)
  }
  updated() {
    if (!this.state.ovl.libState.overlay2.closing) {
      let el = overlay2ToRender.elementToFocusAfterOpen
      if (!el) {
        el = document.getElementById("ovloverlay2")
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
