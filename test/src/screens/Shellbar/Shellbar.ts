import { html, TemplateResult } from "../../../../ovl/node_modules/lit-html"
import {
  T,
  logState,
  logActions,
  logEffects,
} from "../../../../ovl/src/global/globals"
import { OvlConfig } from "../../../../ovl/src/config"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
// @ts-ignore
import langpic_de from "../../../img/de.png"
// @ts-ignore
import langpic_fr from "../../../img/fr.png"
// @ts-ignore
import logo from "../../../img/logosmall.png"
import { logTrackingList } from "../../../../ovl/src/tracker/tracker"

import { ShellButtonOrMenu } from "../../components/Refresh/Refresh"

export type ShellbarState = {
  mainMenuExpanded: boolean
  userMenuExpanded: boolean
}

export class CompShellbar extends OvlBaseElement {
  async getUI() {
    const userMenuClick = (e: Event) => {
      e.stopPropagation()
      this.actions.app.system.shellbar.CloseMainMenu()
      if (this.state.app.screens.shellbar.userMenuExpanded) {
        this.actions.app.system.shellbar.CloseUserMenu()
      } else {
        this.actions.app.system.shellbar.OpenUserMenu()
      }
    }

    const handleTopLevelClick = (e: Event) => {
      e.stopPropagation()
      if (this.state.app.screens.shellbar.mainMenuExpanded) {
        this.actions.app.system.shellbar.CloseMainMenu()
      }
      if (this.state.app.screens.shellbar.userMenuExpanded) {
        this.actions.app.system.shellbar.CloseUserMenu()
      }
    }

    const openDashboard = (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("Dashboard")
    }

    const openOrderOverview = (e: Event) => {
      // this.actions.ovl.internal.GetFile({
      //   id1: "tst1.pdf",
      //   cat: "Test",
      // })
      this.actions.ovl.navigation.NavigateTo("Order")
    }

    const openQuotationOverview = (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("Quotation")
    }

    const openInvoiceOverview = (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("Invoice")
    }

    const handleLogout = (e: Event) => {
      this.actions.ovl.user.Logout()
    }

    const handleUserMenuLevelClick = (e: Event) => {
      e.stopPropagation()
      this.actions.app.system.shellbar.CloseUserMenu()
    }

    const handleLanguage = async (e: Event) => {
      let lang = "DE"
      if (this.state.ovl.language.language === "DE") {
        lang = "FR"
      }
      await this.actions.ovl.internal.SetLanguage(lang)
      this.actions.ovl.internal.SetTableNeedsRebuild(true)
    }

    const handleLanguageTable = (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("Translation")
    }

    const handleEffortTable = async (e: Event) => {
      // this.state.app.tables.effort.tableDef.effort.options.filter.static.U_User = this.state.app.logic.selectedRessource
      // await this.actions.ovl.table.TableRefresh({
      //   data: this.state.app.tables.effort,
      //   defId: "effort",
      // })
      // this.actions.ovl.navigation.NavigateTo("EffortTable")
    }

    const handleVersionClicked = async (e: Event) => {
      logTrackingList()
      logState()
      logActions()
      logEffects()
    }

    const handleAudit = async (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("Audit")
    }

    const handleMobileTimeEntry = async (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("MobileTimeEntry")
    }

    const handleCreateTestEntries = async (e: Event) => {
      this.actions.app.testtables.mobiletimerecording.CreateTestEntries()
    }

    const handleTestTable = async (e: Event) => {
      this.actions.ovl.navigation.NavigateTo("TableTesting")
    }

    return this.track(() => {
      let app
      let scrollable = "scrollable"
      if (this.state.ovl.uiState.isMobile) {
        scrollable = "scrollableMobile"
      }
      let appTitle: TemplateResult | string = ""
      let hideAllMenus = "hide"
      let login

      let feedbackForm = null
      let screenState = this.state.ovl.screens.screens
      if (
        screenState &&
        screenState["Feedback"] &&
        screenState["Feedback"].visible === true
      ) {
        feedbackForm = html`
          <comp-feedbackform
            id="${this.state.app.screens.feedback.type}"
          ></comp-feedbackform>
        `
      }

      if (this.state.ovl.language.isReady) {
        login = html`<ovl-login id="loginform"></ovl-login>`
      }
      if (this.state.ovl.uiState.isReady) {
        hideAllMenus = ""
        let devHint = OvlConfig._system.IsDev ? "DEV" : ""
        let demoHint = this.state.ovl.uiState.isDemo ? "TEST" : ""
        appTitle = T("AppTitle") + " " + devHint + " " + demoHint
        app = html`
          <div class="${scrollable}">
            <ovl-audit> </ovl-audit>
            <ovl-translation> </ovl-translation>
            <comp-dashboard> </comp-dashboard>
            <comp-tabletesting> </comp-tabletesting>
            <comp-mobiletimeentry id="mobiletimerecordingmain1">
            </comp-mobiletimeentry>
            <comp-mobiletimeentryform id="mobiletimerecording1">
            </comp-mobiletimeentryform>
            <comp-quotationoverview></comp-quotationoverview>
            <comp-orderoverview></comp-orderoverview>
            <comp-invoiceoverview></comp-invoiceoverview>
            <comp-orderdetaillayout></comp-orderdetaillayout>
            ${feedbackForm}
          </div>
        `
      }

      // hide a few things as long as not logged in

      let languageTableMenu
      let langpic = langpic_de
      let langtitle = T("AppLangDE")
      let auditMenu
      if (this.state.ovl.language.language === "DE") {
        langpic = langpic_fr
        langtitle = T("AppLangFR")
      }

      let mobileTimeEntryMenu
      let createMobileTimentriesMenu
      let tableTestingMenu

      let effortTableMenu
      if (this.state.ovl.screens.nav.currentScreen !== "Dashboard") {
        effortTableMenu = html`
          <li class="fd-menu__item">
            <a
              @click=${handleEffortTable}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span
                class="fd-menu__addon-before sap-icon--work-history "
              ></span>
              <span
                style="margin-left:4px;"
                class="fd-menu__title fd-has-type-1"
                >Leistungen</span
              >
            </a>
          </li>
        `
      }

      if (this.state.ovl.user.role === "Admin") {
        languageTableMenu = html`
          <li class="fd-menu__item">
            <a
              @click=${handleLanguageTable}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--table-view "></span>
              <span
                style="margin-left:4px;"
                class="fd-menu__title fd-has-type-1"
                >${T("AppTranslations")}</span
              >
            </a>
          </li>
        `

        auditMenu = html`
          <li class="fd-menu__item">
            <a
              @click=${handleAudit}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--history"></span>
              <span
                style="margin-left:4px;"
                class="fd-menu__title fd-has-type-1"
                >Audit</span
              >
            </a>
          </li>
        `

        tableTestingMenu = html` <li class="fd-menu__item">
          <a
            @click=${handleTestTable}
            role="menuitem"
            class="fd-menu__link fd-has-type-2"
          >
            <span class="fd-menu__addon-before sap-icon--table-view "></span>
            <span style="margin-left:4px;" class="fd-menu__title fd-has-type-1"
              >Table Testing</span
            >
          </a>
        </li>`

        mobileTimeEntryMenu = html` <li class="fd-menu__item">
          <a
            @click=${handleMobileTimeEntry}
            role="menuitem"
            class="fd-menu__link fd-has-type-2"
          >
            <span class="fd-menu__addon-before sap-icon--paper-plane"></span>
            <span style="margin-left:4px;" class="fd-menu__title fd-has-type-1"
              >Zeiterfassung</span
            >
          </a>
        </li>`

        createMobileTimentriesMenu = html` <li class="fd-menu__item">
          <a
            @click=${handleCreateTestEntries}
            role="menuitem"
            class="fd-menu__link fd-has-type-2"
          >
            <span class="fd-menu__addon-before sap-icon--paper-plane"></span>
            <span style="margin-left:4px;" class="fd-menu__title fd-has-type-1"
              >Batch Test: Zeiten hinzufügen</span
            >
          </a>
        </li>`
      }

      let version =
        OvlConfig._system.Version +
        (OvlConfig._system.IsDev ? " DEV" : "") +
        (OvlConfig._system.ShowSaveOrigin
          ? " " + this.state.ovl.uiState.stateSavedReason
          : "")

      let quotationMainMenu
      let salesOrderMainMenu
      let invoiceMainMenu
      let overviewMainMenu

      let quotationPopupMenu
      let salesOrderPopupMenu
      let invoicePopupMenu

      overviewMainMenu = html`<button
        class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2 ovl-shellbar-directmenu"
        @click="${(e) => openDashboard(e)}"
        aria-label=""
      >
        <span class="sap-icon--home"> </span>
        ${T("PortalDashboardTitle")}
      </button> `

      if (
        this.state.app.quotationDetail &&
        Object.keys(this.state.app.quotationDetail.quotations).length > 0
      ) {
        quotationMainMenu = html`<button
          class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2 ovl-shellbar-directmenu"
          @click="${(e) => openQuotationOverview(e)}"
          aria-label=""
        >
          <span class="sap-icon--tags"> </span>
          ${T("PortalQuotationTitle")}
        </button> `

        quotationPopupMenu = html`
          <li
            class="fd-menu__item ovl-shellbar-directandpopupmenu"
            role="button"
          >
            <a
              @click=${(e) => openQuotationOverview(e)}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--tags"></span>
              <span class="fd-menu__title fd-has-type-1"
                >${T("PortalQuotationTitle")}</span
              >
            </a>
          </li>
        `
      }

      if (
        this.state.app.orderDetail &&
        Object.keys(this.state.app.orderDetail.orders).length > 0
      ) {
        salesOrderMainMenu = html` <button
          @click="${(e) => openOrderOverview(e)}"
          class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2 ovl-shellbar-directmenu"
          aria-label=""
        >
          <span class="sap-icon--sales-order"> </span>
          ${T("PortalOrderTitle")}
        </button>`

        salesOrderPopupMenu = html`
          <li
            class="fd-menu__item ovl-shellbar-popupmenu ovl-shellbar-directandpopupmenu"
            role="presentation"
          >
            <a
              @click=${(e) => openOrderOverview(e)}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--sales-order"></span>
              <span class="fd-menu__title fd-has-type-1"
                >${T("PortalOrderTitle")}</span
              >
            </a>
          </li>
        `
      }
      if (
        (this.state.app.invoiceDetail || this.state.app.dpInvoiceDetail) &&
        (Object.keys(this.state.app.invoiceDetail.invoices).length > 0 ||
          Object.keys(this.state.app.dpInvoiceDetail.dpInvoices).length > 0)
      ) {
        invoiceMainMenu = html`
          <button
            @click="${(e) => openInvoiceOverview(e)}"
            class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2 ovl-shellbar-directmenu"
            aria-label=""
          >
            <span class="sap-icon--receipt"> </span>
            ${T("PortalInvoiceTitle")}
          </button>
        `
        invoicePopupMenu = html`
          <li
            class="fd-menu__item ovl-shellbar-popupmenu ovl-shellbar-directandpopupmenu"
            role="presentation"
          >
            <a
              @click=${(e) => openInvoiceOverview(e)}
              role="menuitem"
              class="fd-menu__link fd-has-type-2"
            >
              <span class="fd-menu__addon-before sap-icon--receipt"></span>
              <span class="fd-menu__title fd-has-type-1"
                >${T("PortalInvoiceTitle")}</span
              >
            </a>
          </li>
        `
      }

      let resHtml = html`
        <div
          class="fd-shell fd-shell--fundamentals fd-has-background-color-neutral-2"
          @click=${handleTopLevelClick}
        >
          <div class="fd-shell__header" style="height:44px;">
            <div
              style="background-color: var(--fd-color-shell-5);"
              class="fd-shellbar"
            >
              <div class="fd-shellbar__group fd-shellbar__group--product">
                <a href="#" class="fd-shellbar__logo"
                  ><img src="${logo}" width="48" height="24" alt="Kalt AG"
                /></a>
                <span class="fd-shellbar__title fd-has-type-4"
                  >${appTitle}</span
                >
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
                <div class="fd-shellbar__action">
                  ${overviewMainMenu} ${quotationMainMenu} ${salesOrderMainMenu}
                  ${invoiceMainMenu}
                  <ovl-refresh .refresh=${<ShellButtonOrMenu>"button"}>
                  </ovl-refresh>
                </div>

                <div class="fd-shellbar__action">
                  <div class="fd-popover fd-popover--right">
                    <div class="fd-popover__control">
                      <button
                        class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2"
                        aria-label=""
                        @click=${userMenuClick}
                        aria-controls="DD35G276"
                        aria-expanded="${this.state.app.screens.shellbar
                          .userMenuExpanded}"
                        aria-haspopup="true"
                      >
                        <span
                          class="sap-icon--role  fd-has-color-action-2"
                        ></span>
                      </button>
                    </div>
                    <div
                      @click=${handleUserMenuLevelClick}
                      class="fd-popover__body fd-popover__body--right"
                      aria-hidden="${!this.state.app.screens.shellbar
                        .userMenuExpanded}"
                      id="DD35G276"
                    >
                      <nav class="fd-menu">
                        <ul class="fd-menu__list" role="menu">
                          <li class="fd-menu__item" role="presentation">
                            <a
                              @click=${handleLanguage}
                              role="button"
                              class="fd-menu__link"
                            >
                              <span
                                style="margin-left:4px;"
                                class="fd-menu__title"
                              >
                                <img
                                  width="32px;"
                                  role="button"
                                  src=${langpic}
                                  title="${langtitle}"
                                />
                              </span>
                            </a>
                          </li>
                          ${quotationPopupMenu} ${salesOrderPopupMenu}
                          ${invoicePopupMenu} ${effortTableMenu}
                          ${languageTableMenu} ${auditMenu}
                          ${mobileTimeEntryMenu} ${createMobileTimentriesMenu}
                          ${tableTestingMenu}
                          <ovl-refresh .refresh=${<ShellButtonOrMenu>"menu"}>
                          </ovl-refresh>
                          <li class="fd-menu__item" role="presentation">
                            <a
                              @click=${handleLogout}
                              role="menuitem"
                              class="fd-menu__link fd-has-type-2"
                            >
                              <span
                                class="fd-menu__addon-before sap-icon--visits"
                              ></span>
                              <span class="fd-menu__title fd-has-type-1"
                                >${T("AppLogout")}</span
                              >
                            </a>
                          </li>

                          <li class="fd-menu__item">
                            <a
                              @click=${handleVersionClicked}
                              role="menuitem"
                              class="fd-menu__link fd-has-type-2"
                            >
                              <span
                                class="fd-menu__addon-before sap-icon--hint "
                              ></span>
                              <span class="fd-menu__title fd-has-type-1"
                                >Version: ${version}</span
                              >
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
              <main class="fd-app__main">${app}</main>
            </div>
          </div>
        </div>
        ${login}
        <ovl-dialog></ovl-dialog>
      `

      return resHtml
    })
  }
}
