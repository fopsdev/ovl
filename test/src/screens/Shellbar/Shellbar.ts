import { html, TemplateResult } from "../../../../ovl/node_modules/lit-html"
import { T } from "../../../../ovl/src/global/globals"
import { OvlConfig } from "../../../../ovl/src/init"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
// @ts-ignore
import langpic_de from "../../../img/de.png"
// @ts-ignore
import langpic_fr from "../../../img/fr.png"
// @ts-ignore
import logo from "../../../img/logosmall.png"
import { logTrackingList } from "../../../../ovl/src/tracker/tracker"
import { logState, logActions, logEffects } from "../../../../ovl/src"
import { tabletesting } from "../../shared/TableTesting/customActions"

export type ShellbarState = {
  mainMenuExpanded: boolean
  userMenuExpanded: boolean
}

export class CompShellbar extends OvlBaseElement {
  async getUI() {
    const userMenuClick = (e: Event) => {
      e.stopPropagation()
      this.actions.demoApp.system.shellbar.CloseMainMenu()
      if (this.state.demoApp.screens.shellbar.userMenuExpanded) {
        this.actions.demoApp.system.shellbar.CloseUserMenu()
      } else {
        this.actions.demoApp.system.shellbar.OpenUserMenu()
      }
    }

    const handleTopLevelClick = (e: Event) => {
      e.stopPropagation()
      if (this.state.demoApp.screens.shellbar.mainMenuExpanded) {
        this.actions.demoApp.system.shellbar.CloseMainMenu()
      }
      if (this.state.demoApp.screens.shellbar.userMenuExpanded) {
        this.actions.demoApp.system.shellbar.CloseUserMenu()
      }
    }

    const handleLogout = (e: Event) => {
      this.actions.ovl.user.Logout()
    }

    const handleUserMenuLevelClick = (e: Event) => {
      e.stopPropagation()
      this.actions.demoApp.system.shellbar.CloseUserMenu()
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
      // this.state.demoApp.tables.effort.tableDef.effort.options.filter.static.U_User = this.state.demoApp.logic.selectedRessource
      // await this.actions.ovl.table.TableRefresh({
      //   data: this.state.demoApp.tables.effort,
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
      this.actions.demoApp.testtables.mobiletimerecording.CreateTestEntries()
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

      if (this.state.ovl.language.isReady) {
        login = html`<ovl-login id="loginform"></ovl-login>`
      }
      if (this.state.ovl.uiState.isReady) {
        hideAllMenus = ""
        let devHint = OvlConfig._system.IsDev ? "DEV" : ""
        let demoHint = this.state.ovl.uiState.isDemo ? "TEST" : ""
        app = html`
          <div class="${scrollable}">
            <ovl-audit> </ovl-audit>
            <ovl-translation> </ovl-translation>
            <comp-dashboard> </comp-dashboard>
            <comp-tabletesting> </comp-tabletesting>
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
      // we have a tabindex on this first div so it can get the focus and not too many saveStates (has a focusOut handler) get called
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
                <ovl-indicator> </ovl-indicator>
                <div class="fd-shellbar__action">
                  <div class="fd-popover fd-popover--right">
                    <div class="fd-popover__control">
                      <button
                        class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2"
                        aria-label=""
                        @click=${userMenuClick}
                        aria-controls="DD35G276"
                        aria-expanded="${this.state.demoApp.screens.shellbar
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
                      style="width:280px;"
                      class="fd-popover__body fd-popover__body--right"
                      aria-hidden="${!this.state.demoApp.screens.shellbar
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
                          ${effortTableMenu} ${languageTableMenu} ${auditMenu}
                          ${mobileTimeEntryMenu} ${createMobileTimentriesMenu}
                          ${tableTestingMenu}
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
              <main class="fd-app__main">
                ${app}
              </main>
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

// import { html } from "../../../../ovl/node_modules/lit-html"
// import { T } from "../../../../ovl/src/global/globals"
// import { OvlConfig } from "../../../../ovl/src/init"
// import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
// // @ts-ignore
// import langpic_de from "../../../img/de.png"
// // @ts-ignore
// import langpic_fr from "../../../img/fr.png"
// // @ts-ignore
// import logo from "../../../img/icon-192x192.png"
// import { ShellButtonOrMenu } from "../../components/Refresh/Refresh"
// import { logTrackingList } from "../../../../ovl/src/tracker/tracker"
// import { logState } from "../../../../ovl/src"

// export type ShellbarState = {
//   mainMenuExpanded: boolean
//   userMenuExpanded: boolean
// }

// export class CompShellbar extends OvlBaseElement {
//   async getUI() {
//     const mainMenuClick = (e: Event) => {
//       e.stopPropagation()
//       this.actions.demoApp.system.shellbar.CloseUserMenu()
//       if (this.state.demoApp.screens.shellbar.mainMenuExpanded) {
//         this.actions.demoApp.system.shellbar.CloseMainMenu()
//       } else {
//         this.actions.demoApp.system.shellbar.OpenMainMenu()
//       }
//     }

//     const userMenuClick = (e: Event) => {
//       e.stopPropagation()
//       this.actions.demoApp.system.shellbar.CloseMainMenu()
//       if (this.state.demoApp.screens.shellbar.userMenuExpanded) {
//         this.actions.demoApp.system.shellbar.CloseUserMenu()
//       } else {
//         this.actions.demoApp.system.shellbar.OpenUserMenu()
//       }
//     }

//     const openOrderOverview = (e: Event) => {
//       // this.actions.global.GetFile({
//       //   fileName: "tst1.pdf",
//       //   fileType: "Test",
//       //   docNum: ""
//       // })
//       this.actions.ovl.navigation.NavigateTo("Order")
//     }

//     const openQuotationOverview = (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Quotation")
//     }

//     const openInvoiceOverview = (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Invoice")
//     }

//     const openDashboard = (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Dashboard")
//     }

//     const handleTopLevelClick = (e: Event) => {
//       e.stopPropagation()
//       if (this.state.demoApp.screens.shellbar.mainMenuExpanded) {
//         this.actions.demoApp.system.shellbar.CloseMainMenu()
//       }
//       if (this.state.demoApp.screens.shellbar.userMenuExpanded) {
//         this.actions.demoApp.system.shellbar.CloseUserMenu()
//       }
//     }
//     const handleMainMenuLevelClick = (e: Event) => {
//       e.stopPropagation()
//       this.actions.demoApp.system.shellbar.CloseMainMenu()
//     }

//     const handleLogout = (e: Event) => {
//       this.actions.ovl.user.Logout()
//     }

//     const handleSettings = (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Settings")
//     }

//     const handleUserMenuLevelClick = (e: Event) => {
//       e.stopPropagation()
//       this.actions.demoApp.system.shellbar.CloseUserMenu()
//     }

//     const handleLanguage = async (e: Event) => {
//       let lang = "DE"
//       if (this.state.ovl.language.language === "DE") {
//         lang = "FR"
//       }
//       await this.actions.ovl.internal.SetLanguage(lang)
//       this.actions.ovl.internal.SetTableNeedsRebuild(true)
//     }

//     const handleLanguageTable = (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Translation")
//     }

//     const handleVersionClicked = async (e: Event) => {
//       logTrackingList()
//       logState()
//     }

//     const handleAudit = async (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("Audit")
//     }

//     const handleMobileTimeEntry = async (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("MobileTimeEntry")
//     }

//     const handleCreateTestEntries = async (e: Event) => {
//       this.actions.demoApp.testtables.mobiletimerecording.CreateTestEntries()
//     }

//     const handleTestTable = async (e: Event) => {
//       this.actions.ovl.navigation.NavigateTo("TableTesting")
//     }

//     return this.track(() => {
//       let feedbackForm = null
//       let screenState = this.state.ovl.screens.screens
//       if (
//         screenState &&
//         screenState["Feedback"] &&
//         screenState["Feedback"].visible === true
//       ) {
//         feedbackForm = html`
//           <comp-feedbackform
//             id="${this.state.demoApp.screens.feedback.type}"
//           ></comp-feedbackform>
//         `
//       }

//       let app

//       let scrollable = "scrollable"
//       if (this.state.ovl.uiState.isMobile) {
//         scrollable = "scrollableMobile"
//       }

//       if (this.state.ovl.uiState.isReady) {
//         app = html`
//           <div id="ovl-intersectionobserver" class="${scrollable}">
//             <ovl-loginform id="loginform"></ovl-loginform>
//             <comp-settingsform id="settingsform"></comp-settingsform>
//             <ovl-audit> </ovl-audit>
//             <comp-mobiletimeentry id="mobiletimerecordingmain1">
//             </comp-mobiletimeentry>
//             <comp-mobiletimeentryform id="mobiletimerecording1">
//             </comp-mobiletimeentryform>

//             <ovl-translation> </ovl-translation>
//             <comp-tabletesting> </comp-tabletesting>
//             <comp-dashboard> </comp-dashboard>
//             <comp-orderoverview> </comp-orderoverview>
//             <comp-quotationoverview> </comp-quotationoverview>
//             <comp-invoiceoverview> </comp-invoiceoverview>
//             <comp-orderdetaillayout></comp-orderdetaillayout>
//             ${feedbackForm}
//           </div>
//         `
//       }

//       // hide a few things as long as not logged in
//       let hideAllMenus = ""
//       let user = this.state.ovl.user
//       let portal = this.state.demoApp
//       let partner = this.state.demoApp.partner
//       // if user not logged in or a form is dirty hide menus
//       let quotationMainMenu
//       let quotationListMenu
//       let orderMainMenu
//       let orderListMenu
//       let invoiceMainMenu
//       let invoiceListMenu
//       let languageTableMenu
//       let langpic = langpic_de
//       let langtitle = T("AppLangDE")
//       let testTableMenu
//       let mobileTimeEntry
//       let createMobileTimentries
//       let auditMenu
//       let userName

//       if (!user.token) {
//         hideAllMenus = "hide"
//       } else {
//         userName =
//           this.state.demoApp.user.firstName +
//           " " +
//           this.state.demoApp.user.lastName +
//           ", " +
//           partner.cardName
//         if (
//           portal.quotationDetail &&
//           Object.keys(portal.quotationDetail.quotations).length > 0
//         ) {
//           quotationMainMenu = html`
//             <button
//               style="padding-left:2px;padding-right:2px;"
//               @click=${openQuotationOverview}
//               class=" fd-button fd-shellbar__button fd-has-color-action-2"
//               aria-label=""
//             >
//               <span class="sap-icon--tags sap-icon--l fd-has-color-action-2">
//                 ${T("PortalQuotationTitle")}</span
//               >
//             </button>
//           `
//           quotationListMenu = html`
//             <li>
//               <a
//                 @click=${openQuotationOverview}
//                 role="button"
//                 class="fd-menu__item sap-icon--tags sap-icon--l"
//               >
//                 ${T("PortalQuotationTitle")}</a
//               >
//             </li>
//           `
//         }
//         if (
//           portal.orderDetail &&
//           Object.keys(portal.orderDetail.orders).length
//         ) {
//           orderMainMenu = html`
//             <button
//               style="padding-left:2px;padding-right:2px;"
//               @click=${openOrderOverview}
//               class=" fd-button fd-shellbar__button fd-has-color-action-2"
//               aria-label=""
//             >
//               <span
//                 class="sap-icon--sales-order sap-icon--l fd-has-color-action-2"
//               >
//                 ${T("PortalOrderTitle")}</span
//               >
//             </button>
//           `
//           orderListMenu = html`
//             <li>
//               <a
//                 @click=${openOrderOverview}
//                 role="button"
//                 class="fd-menu__item sap-icon--sales-order sap-icon--l"
//               >
//                 ${T("PortalOrderTitle")}</a
//               >
//             </li>
//           `
//         }
//         if (
//           (portal.invoiceDetail &&
//             Object.keys(portal.invoiceDetail.invoices).length > 0) ||
//           (portal.dpInvoiceDetail &&
//             Object.keys(portal.dpInvoiceDetail.dpInvoices).length > 0)
//         ) {
//           invoiceMainMenu = html`
//             <button
//               style="padding-left:2px;padding-right:2px;"
//               @click=${openInvoiceOverview}
//               class=" fd-button fd-shellbar__button fd-has-color-action-2"
//               aria-label=""
//             >
//               <span class="sap-icon--receipt sap-icon--l fd-has-color-action-2">
//                 ${T("PortalInvoiceTitle")}</span
//               >
//             </button>
//           `
//           invoiceListMenu = html`
//             <li>
//               <a
//                 @click=${openInvoiceOverview}
//                 role="button"
//                 class="fd-menu__item sap-icon--receipt sap-icon--l"
//               >
//                 ${T("PortalInvoiceTitle")}</a
//               >
//             </li>
//           `
//         }
//         if (this.state.ovl.language.language === "DE") {
//           langpic = langpic_fr
//           langtitle = T("AppLangFR")
//         }

//         if (this.state.demoApp.user.role === "Admin") {
//           languageTableMenu = html`
//             <li>
//               <a
//                 @click=${handleLanguageTable}
//                 role="button"
//                 class="fd-menu__item sap-icon--table-view sap-icon--l"
//               >
//                 ${T("AppTranslations")}</a
//               >
//             </li>
//           `
//         }

//         if (
//           this.state.demoApp.user.role === "Admin" &&
//           this.state.demoApp.user.userName === "info@itflies.ch"
//         ) {
//           testTableMenu = html`
//             <li>
//               <a
//                 @click=${handleTestTable}
//                 role="button"
//                 class="fd-menu__item sap-icon--paper-plane sap-icon--l"
//               >
//                 Tabellentest</a
//               >
//             </li>
//           `
//           mobileTimeEntry = html`
//             <li>
//               <a
//                 @click=${handleMobileTimeEntry}
//                 role="button"
//                 class="fd-menu__item sap-icon--paper-plane sap-icon--l"
//               >
//                 Zeiterfassung</a
//               >
//             </li>
//           `
//           createMobileTimentries = html`
//             <li>
//               <a
//                 @click=${handleCreateTestEntries}
//                 role="button"
//                 class="fd-menu__item sap-icon--paper-plane sap-icon--l"
//               >
//                 BatchTest: Zeiten hinzufügen</a
//               >
//             </li>
//           `
//         }

//         if (this.state.demoApp.user.role === "Admin") {
//           auditMenu = html`
//             <li>
//               <a
//                 @click=${handleAudit}
//                 role="button"
//                 class="fd-menu__item sap-icon--history sap-icon--l"
//               >
//                 Audit</a
//               >
//             </li>
//           `
//         }
//       }
//       let version =
//         OvlConfig._system.Version +
//         (OvlConfig._system.IsDev ? " DEV" : "") +
//         (OvlConfig._system.ShowSaveOrigin
//           ? " " + this.state.ovl.uiState.stateSavedReason
//           : "")
//       // we have a tabindex on this first div so it can get the focus and not too many saveStates (has a focusOut handler) get called
//       let resHtml = html`
//         <div
//           class="fd-shell fd-shell--fundamentals fd-has-background-color-neutral-2"
//           @click=${handleTopLevelClick}
//         >
//           <div class="fd-shell__header">
//             <div
//               style="background-color: var(--fd-color-shell-5);"
//               class="fd-shellbar"
//             >
//               <div class="fd-shellbar__group fd-shellbar__group--product">
//                 <a href="#" class="fd-shellbar__logo"
//                   ><img src="${logo}" width="48" height="24" alt="Kalt AG"
//                 /></a>
//                 <span class="fd-shellbar__title fd-has-type-4"
//                   >${T("AppShortTitle") +
//                   (OvlConfig._system.IsDev ? "DEVDEVDEV" : "")}</span
//                 >
//                 <ovl-indicator> </ovl-indicator>
//               </div>

//               <ovl-backbutton
//                 style="margin-left:-40%;"
//                 class="fd-shellbar__group fd-shellbar__group--copilot"
//               >
//               </ovl-backbutton>

//               <div
//                 style="margin-left:-40%;"
//                 class="fd-shellbar__group fd-shellbar__group--actions ${hideAllMenus}"
//               >
//                 <div class="fd-shellbar__action fd-shellbar__action--desktop ">
//                   <button
//                     style="padding-left:2px;padding-right:2px;"
//                     @click=${openDashboard}
//                     class="fd-button fd-shellbar__button fd-has-color-action-2"
//                     aria-label=""
//                   >
//                     <span
//                       class="sap-icon--home sap-icon--l fd-has-color-action-2"
//                     >
//                       ${T("PortalDashboardTitle")}</span
//                     >
//                   </button>

//                   ${quotationMainMenu} ${orderMainMenu} ${invoiceMainMenu}

//                   <ovl-refresh .refresh=${<ShellButtonOrMenu>"button"}>
//                   </ovl-refresh>
//                 </div>

//                 <div class="fd-shellbar__action fd-shellbar__action--mobile">
//                   <div class="fd-shellbar-collapse">
//                     <div class="fd-popover fd-popover--right">
//                       <div class="fd-popover__control">
//                         <div
//                           class="fd-shellbar-collapse--control"
//                           aria-controls="CWaGX278"
//                           aria-expanded="${this.state.demoApp.screens.shellbar
//                             .mainMenuExpanded}"
//                           aria-haspopup="true"
//                           role="button"
//                         >
//                           <button
//                             @click=${mainMenuClick}
//                             class="fd-button fd-shellbar__button sap-icon--overflow"
//                             aria-controls="undefined"
//                             aria-haspopup="true"
//                             aria-expanded="${this.state.demoApp.screens.shellbar
//                               .mainMenuExpanded}"
//                           ></button>
//                         </div>
//                       </div>
//                       <div
//                         @click=${handleMainMenuLevelClick}
//                         style="width:280px;"
//                         class="fd-popover__body fd-popover__body--right"
//                         aria-hidden="${!this.state.demoApp.screens.shellbar
//                           .mainMenuExpanded}"
//                         id="CWaGX278"
//                       >
//                         <nav class="fd-menu">
//                           <ul class="fd-menu__list">
//                             <li>
//                               <a
//                                 @click=${openDashboard}
//                                 role="button"
//                                 class="fd-menu__item sap-icon--home sap-icon--l"
//                               >
//                                 ${T("PortalDashboardTitle")}</a
//                               >
//                             </li>
//                             ${quotationListMenu} ${orderListMenu}
//                             ${invoiceListMenu}
//                             <ovl-refresh .refresh=${<ShellButtonOrMenu>"menu"}>
//                             </ovl-refresh>
//                           </ul>
//                         </nav>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="fd-shellbar__action">
//                   <div class="fd-popover fd-popover--right">
//                     <div class="fd-popover__control">
//                       <button
//                         class="fd-button fd-shellbar__button fd-has-type-1 fd-has-color-action-2"
//                         title="${userName}"
//                         aria-label=""
//                         @click=${userMenuClick}
//                         aria-controls="DD35G276"
//                         aria-expanded="${this.state.demoApp.screens.shellbar
//                           .userMenuExpanded}"
//                         aria-haspopup="true"
//                       >
//                         <span
//                           class="sap-icon--role sap-icon--l fd-has-color-action-2"
//                         ></span>
//                       </button>
//                     </div>
//                     <div
//                       @click=${handleUserMenuLevelClick}
//                       style="width:280px;"
//                       class="fd-popover__body fd-popover__body--right"
//                       aria-hidden="${!this.state.demoApp.screens.shellbar
//                         .userMenuExpanded}"
//                       id="DD35G276"
//                     >
//                       <nav class="fd-menu">
//                         <ul class="fd-menu__list">
//                           <li @click=${handleLanguage}>
//                             <img
//                               role="button"
//                               class="fd-menu__item"
//                               width="70px"
//                               src=${langpic}
//                               title="${langtitle}"
//                             />
//                           </li>
//                           <li>
//                             <a
//                               @click=${handleSettings}
//                               role="button"
//                               class="fd-menu__item sap-icon--settings sap-icon--l"
//                             >
//                               ${T("AppSettings")}</a
//                             >
//                           </li>
//                           ${languageTableMenu} ${testTableMenu} ${auditMenu}
//                           ${mobileTimeEntry} ${createMobileTimentries}
//                           <li>
//                             <a
//                               @click=${handleLogout}
//                               role="button"
//                               class="fd-menu__item sap-icon--visits sap-icon--l"
//                             >
//                               ${T("AppLogout")}</a
//                             >
//                           </li>

//                           <li>
//                             <a
//                               @click=${handleVersionClicked}
//                               class="fd-menu__item"
//                             >
//                               Version: ${version}
//                             </a>
//                           </li>
//                         </ul>
//                       </nav>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="fd-shell__app">
//             <div class="fd-app ">
//               <main class="fd-app__main">
//                 ${app}
//               </main>
//             </div>
//           </div>
//         </div>
//         <ovl-dialog></ovl-dialog>
//       `

//       return resHtml
//     })
//   }
// }
