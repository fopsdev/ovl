import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { isMobile } from "../../global/globals"

export type SnackType = "Information" | "Warning" | "Success" | "Error"

export let SnackId = { id: 0 }

const nrOfSnacks = 3

export type SnackState = {
  text: string
  type: SnackType
  durationMs?: number
  id?: number
  status?: "queued" | "running"
  key?: string
}

export type SnackAddState = {
  text: string
  type: SnackType
  durationMs?: number
  key?: string
}

export const RemoveSnack = (div) => {
  if (div) {
    div.classList.remove("fadeInSnack")
    div.classList.add("fadeOutSnack")
  }
}

export class OvlSnack extends OvlBaseElement {
  init() {
    this.addEventListener("animationend", this.handleAnimationEnd)
  }

  handleAnimationEnd = (e) => {
    let el = document.getElementById(e.target.id)
    if (e.animationName === "fadeInSnack") {
      el.classList.remove("fadeInSnack")
    } else if (e.animationName === "fadeOutSnack") {
      el.classList.remove("fadeOutSnack")
      this.actions.ovl.internal.ClearSnack(e.target.id)
    }
  }

  async getUI() {
    return this.track(() => {
      // this render just defines the slots...
      // all other handling is in the ...Snack - Actions
      let res = []
      for (let z = 0; z < nrOfSnacks; z++) {
        res.push(html` <div></div> `)
      }

      let width = ""
      if (isMobile()) {
        width = "width: 100vw;"
      }
      return html`
        <div style="${width}" id="ovlsnack" class="ovl-snacks">
          ${res.map((m) => m)}
        </div>
      `
    })
  }
}
