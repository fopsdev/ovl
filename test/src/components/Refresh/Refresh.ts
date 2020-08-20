import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"

export type ShellButtonOrMenu = "button" | "menu"

export class OvlRefresh extends OvlBaseElement {
  refresh: ShellButtonOrMenu
  async getUI() {
    const handleRefresh = async (e: Event) => {
      if (!this.state.ovl.libState.indicator.open) {
        this.actions.demoApp.global.HandleRefresh()
      }
    }

    return this.track(() => {
      let buttonInactive = this.state.ovl.libState.indicator.open
        ? "ovl-disabled"
        : ""

      let refresh

      if (this.refresh === "button") {
        if (this.state.ovl.libState.indicator.open) {
          return html`
            <span
              class="fd-has-color-action-2 sap-icon--synchronize sap-icon--l sap-icon--animate-spin"
              style="padding-left:8px; padding-right:8px;"
            ></span>
          `
        }

        return html`
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
        return html`
          <li class="fd-menu__item" role="presentation">
            <a
              @click=${handleRefresh}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--refresh"></span>
              <span class="fd-menu__title fd-has-type-1"
                >${T("AppRefreshData")}</span
              >
            </a>
          </li>
        `
      }
    })
  }
}
