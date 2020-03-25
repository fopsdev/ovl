import { html } from "lit-html"
// @ts-ignore
import langpic_de from "../../../img/de.png"
// @ts-ignore
import langpic_fr from "../../../img/fr.png"
// @ts-ignore
import { T } from "../../global/globals"
import { OvlBaseElement } from "../../library/OvlBaseElement"
import { ShellButtonOrMenu } from "../../library/Refresh/Refresh"

export type ShellbarState = {
  mainMenuExpanded: boolean
  userMenuExpanded: boolean
}

export class Shellbar extends OvlBaseElement {
  getUI() {
    let app = null

    let scrollable = "scrollable"
    if (this.state.ovl.uiState.isMobile) {
      scrollable = "scrollableMobile"
    }

    if (this.state.ovl.uiState.isReady) {
      app = html`
        <div class="${scrollable}">
          <ovl-app></ovl-app>
          <ovl-loginform id="loginform"></ovl-loginform>
          <ovl-audit> </ovl-audit>
          <ovl-translation> </ovl-translation>
        </div>
      `
    }

    const mainMenuClick = (e: Event) => {
      e.stopPropagation()
      this.actions.ovl.shellbar.CloseUserMenu()
      if (this.state.ovl.screens.screens.Shellbar.mainMenuExpanded) {
        this.actions.ovl.shellbar.CloseMainMenu()
      } else {
        this.actions.ovl.shellbar.OpenMainMenu()
      }
    }

    const userMenuClick = (e: Event) => {
      e.stopPropagation()
      this.actions.ovl.shellbar.CloseMainMenu()
      if (this.state.ovl.screens.screens.Shellbar.userMenuExpanded) {
        this.actions.ovl.shellbar.CloseUserMenu()
      } else {
        this.actions.ovl.shellbar.OpenUserMenu()
      }
    }

    const handleTopLevelClick = (e: Event) => {
      e.stopPropagation()
      if (this.state.ovl.screens.screens.Shellbar.mainMenuExpanded) {
        this.actions.ovl.shellbar.CloseMainMenu()
      }
      if (this.state.ovl.screens.screens.Shellbar.userMenuExpanded) {
        this.actions.ovl.shellbar.CloseUserMenu()
      }
    }
    const handleMainMenuLevelClick = (e: Event) => {
      e.stopPropagation()
      this.actions.ovl.shellbar.CloseMainMenu()
    }

    const handleLogout = (e: Event) => {
      this.actions.ovl.user.Logout()
    }
    const handleUserMenuLevelClick = (e: Event) => {
      e.stopPropagation()
      this.actions.ovl.shellbar.CloseUserMenu()
    }

    const handleLanguage = async (e: Event) => {
      await this.actions.ovl.internal.ToggleLanguage()
      if (this.state.ovl.screens.nav.currentScreen === "Translation") {
        this.actions.ovl.internal.OpenLanguageTable()
      }
    }

    const handleLanguageTable = (e: Event) => {
      this.actions.ovl.internal.OpenLanguageTable()
    }

    const handleAudit = async (e: Event) => {
      await this.actions.ovl.table.TableRefresh({
        def: this.state.ovl.audit.tables.audit.tableDef.audit,
        data: this.state.ovl.audit.tables.audit,
        init: true,
        forceFreshServerData: 0
      })
      this.actions.ovl.navigation.NavigateTo("Audit")
    }

    // hide a few things as long as not logged in
    let hideAllMenus = ""
    let user = this.state.ovl.user

    let auditMenu
    let langpic
    let languageTableMenu
    let langtitle
    let userName
    // if user not logged in then shellbar is not full ready
    if (!user || !user.token) {
      hideAllMenus = "hide"
    } else {
      userName = user.firstName + " " + user.lastName
      langpic = langpic_de
      langtitle = T("AppLangDE")
      if (this.state.ovl.language.language === "DE") {
        langpic = langpic_fr
        langtitle = T("AppLangFR")
      }

      if (this.state.ovl.user.role === "Admin") {
        languageTableMenu = html`
          <li>
            <a
              @click=${handleLanguageTable}
              role="button"
              class="fd-menu__item sap-icon--table-view sap-icon--l"
            >
              ${T("AppTranslations")}</a
            >
          </li>
        `
      }

      if (this.state.ovl.user.role === "Admin") {
        auditMenu = html`
          <li>
            <a
              @click=${handleAudit}
              role="button"
              class="fd-menu__item sap-icon--history sap-icon--l"
            >
              Audit</a
            >
          </li>
        `
      }
    }
    // we have a tabindex on this first div so it can get the focus and not too many saveStates (has a focusOut handler) get called
    return html`
      <div
        class="fd-shell fd-shell--fundamentals fd-has-background-color-neutral-2"
        @click=${handleTopLevelClick}
      >
        <div class="fd-shell__header">
          <div
            style="background-color: var(--fd-color-shell-5);"
            class="fd-shellbar"
          >
            <div class="fd-shellbar__group fd-shellbar__group--product">
              <a href="#" class="fd-shellbar__logo"><ovl-logo></ovl-logo></a>
              <span class="fd-shellbar__title fd-has-type-4"
                >${T("AppShortTitle")}</span
              >
              <ovl-indicator> </ovl-indicator>
            </div>

            <ovl-backbutton
              style="margin-left:-40%;"
              class="fd-shellbar__group fd-shellbar__group--copilot"
            >
            </ovl-backbutton>

            <div
              style="margin-left:-40%;"
              class="fd-shellbar__group fd-shellbar__group--actions ${hideAllMenus}"
            >
              <div class="fd-shellbar__action fd-shellbar__action--desktop ">
                <ovl-refresh .refresh=${<ShellButtonOrMenu>"button"}>
                </ovl-refresh>
              </div>

              <div class="fd-shellbar__action fd-shellbar__action--mobile">
                <div class="fd-shellbar-collapse">
                  <div class="fd-popover fd-popover--right">
                    <div class="fd-popover__control">
                      <div
                        class="fd-shellbar-collapse--control"
                        aria-controls="CWaGX278"
                        aria-expanded="${this.state.ovl.screens.screens.Shellbar
                          .mainMenuExpanded}"
                        aria-haspopup="true"
                        role="button"
                      >
                        <button
                          @click=${mainMenuClick}
                          class="fd-button fd-shellbar__button sap-icon--overflow"
                          aria-controls="undefined"
                          aria-haspopup="true"
                          aria-expanded="${this.state.ovl.screens.screens
                            .Shellbar.mainMenuExpanded}"
                        ></button>
                      </div>
                    </div>
                    <div
                      @click=${handleMainMenuLevelClick}
                      style="width:280px;"
                      class="fd-popover__body fd-popover__body--right"
                      aria-hidden="${!this.state.ovl.screens.screens.Shellbar
                        .mainMenuExpanded}"
                      id="CWaGX278"
                    >
                      <nav class="fd-menu">
                        <ul class="fd-menu__list">
                          <ovl-refresh .refresh=${<ShellButtonOrMenu>"menu"}>
                          </ovl-refresh>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fd-shellbar__action">
                <div class="fd-popover fd-popover--right">
                  <div class="fd-popover__control">
                    <button
                      class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2"
                      title=${userName}
                      aria-label=""
                      @click=${userMenuClick}
                      aria-controls="DD35G276"
                      aria-expanded="${this.state.ovl.screens.screens.Shellbar
                        .userMenuExpanded}"
                      aria-haspopup="true"
                    >
                      <span
                        class="sap-icon--role sap-icon--l fd-has-color-action-2"
                      ></span>
                    </button>
                  </div>
                  <div
                    @click=${handleUserMenuLevelClick}
                    style="width:280px;"
                    class="fd-popover__body fd-popover__body--right"
                    aria-hidden="${!this.state.ovl.screens.screens.Shellbar
                      .userMenuExpanded}"
                    id="DD35G276"
                  >
                    <nav class="fd-menu">
                      <ul class="fd-menu__list">
                        <li @click=${handleLanguage}>
                          <img
                            role="button"
                            class="fd-menu__item"
                            width="70px"
                            src=${langpic}
                            title="${langtitle}"
                          />
                        </li>
                        <li>
                          <a
                            @click=${handleLogout}
                            role="button"
                            class="fd-menu__item sap-icon--visits sap-icon--l"
                          >
                            ${T("AppLogout")}</a
                          >
                        </li>

                        <li>
                          <a class="fd-menu__item">
                            Version:
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fd-shell__app">
          <div class="fd-app ">
            <main class="fd-app__main">
              ${app}
            </main>
          </div>
        </div>
      </div>
      <ovl-overlay> </ovl-overlay>
      <ovl-overlay2> </ovl-overlay2>
      <ovl-dialog></ovl-dialog>
    `
  }
}
