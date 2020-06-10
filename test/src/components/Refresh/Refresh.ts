import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"

export type ShellButtonOrMenu = "button" | "menu"

export class OvlRefresh extends OvlBaseElement {
  refresh: ShellButtonOrMenu
  async getUI() {
    const handleRefresh = async (e: Event) => {
      if (!this.state.ovl.libState.indicator.open) {
        this.actions.portal.global.HandleRefresh()
      }
    }

    let buttonInactive = this.state.ovl.libState.indicator.open
      ? "nopointerevents"
      : ""

    let refresh
    if (this.refresh === "button") {
      refresh = html`
        <button
          @click=${handleRefresh}
          class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2 ${buttonInactive}"
          title=${T("AppRefreshData")}
          aria-label=""
        >
          <span
            class="sap-icon--refresh sap-icon--l fd-has-color-action-2"
          ></span>
        </button>
      `
    } else {
      refresh = html`
        <li>
          <a
            @click=${handleRefresh}
            role="button"
            class="fd-menu__item sap-icon--refresh sap-icon--l"
          >
            ${T("AppRefreshData")}</a
          >
        </li>
      `
    }

    return refresh
  }
}
