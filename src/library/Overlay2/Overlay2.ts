import { OvlBaseElement } from "../OvlBaseElement"
import { html, TemplateResult } from "lit-html"

export let overlay2ToRender: {
  resolve?: any
  getTemplate: () => {}
  overlayDismissedCallback: any
  overlayClosedCallback: any
  template?: any
  elementToFocusAfterClose?: Element
}
overlay2ToRender = {
  overlayDismissedCallback: undefined,
  overlayClosedCallback: undefined,
  getTemplate: async () => {
    return new Promise(r => {
      overlay2ToRender.resolve = r
    })
  }
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
      this.actions.ovl.global.CloseOverlay2()
    }
  }

  handleDismissed = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    if (overlay2ToRender.overlayDismissedCallback) {
      overlay2ToRender.overlayDismissedCallback()
    } else {
      this.actions.ovl.global.StartCloseOverlay2()
    }
  }

  init() {
    this.async = true
    super.init()
  }

  async getUIAsync() {
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
        @click=${this.handleDismissed}
        class="fd-shell__overlay fd-overlay fd-overlay--modal ${animation}"
        aria-hidden="false"
      >
        ${overlay2ToRender.template}
      </div>
    `)
  }

  connectedCallback() {
    this.addEventListener("animationend", this.handleAnimationEnd, true)
    super.connectedCallback()
  }
  disconnectedCallback() {
    this.removeEventListener("animationend", this.handleAnimationEnd)
  }
}
