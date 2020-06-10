import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T } from "../../../../ovl/src/global/globals"
import { overmind } from "../.."

export type DashboardState = {}

export class CompDashboard extends OvlBaseElement {
  init() {
    this.screen = "Dashboard"
  }

  async getUI() {
    let partner = this.state.portal.partner
    return html`
    <div class="${this.animatedClass}">
      <div>
      <div class="fd-container fd-container--fluid">
        <div class="fd-col--12">
          <div class="fd-panel ">
            <div class="fd-panel__header">
              <div class="fd-panel__head">
                <p class="fd-panel__title fd-has-type-2">
                ${T("PortalWelcome", [
                  this.state.portal.user.firstName,
                  this.state.portal.user.lastName,
                  partner.cardName,
                ])} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="fd-container fd-container--fluid">
        <div class="fd-col--4">
          <div class="fd-panel">
            <div class="fd-panel__header fd-has-padding-tiny fd-has-margin-tiny">
              <div class="fd-panel__head">
                <h3 class="fd-panel__title">
                  ${T("PortalFilesTitle")}
                </h3>
              </div>
            </div>
        <div class="fd-panel__body fd-has-padding-tiny fd-has-margin-tiny">
        <comp-filelist  .props=${(s: typeof overmind.state) =>
          s.portal.partner.attachments.files}></comp-filelist>
        </div>
        </div>
      </div>

        <div class="fd-col--4">
          <div class="fd-panel">
            <div class="fd-panel__header fd-has-padding-tiny fd-has-margin-tiny">
              <div class="fd-panel__head">
                <h3 class="fd-panel__title">
                  ${T("PortalContactSalesTitle")}
                </h3>
              </div>
            </div>
            <div class="fd-panel__body fd-has-padding-tiny fd-has-margin-tiny">
              <img style="border-radius:10px;" width="100vw" src="data:image/jpg;base64,${
                this.state.portal.pics.salesContact
              }"></img>

              <p class="fd-panel__description">
                <b>${partner.salesContact.firstName} ${
      partner.salesContact.lastName
    }</b>
                  <br>
                  ${partner.salesContact.phone}
                  <br>
                  ${partner.salesContact.email}
              </p>
            </div>
          </div>
        </div>

        <div class="fd-col--4">
          <div class="fd-panel">
            <div class="fd-panel__header fd-has-padding-tiny fd-has-margin-tiny">
              <div class="fd-panel__head">
                <h3 class="fd-panel__title">
                  ${T("PortalContactTechnicTitle")}
                </h3>
              </div>
            </div>
            <div class="fd-panel__body fd-has-padding-tiny fd-has-margin-tiny">
              <img style="border-radius:10px;" width="100vw" src="data:image/jpg;base64,${
                this.state.portal.pics.technicalContact
              }"></img>

              <p class="fd-panel__description">
              <b>${partner.technicalContact.firstName} ${
      partner.technicalContact.lastName
    }</b>
                  <br>
                  ${partner.technicalContact.phone}
                  <br>
                  ${partner.technicalContact.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="fd-container fd-container--fluid">
        <div class="fd-col--12">
          <div class="fd-panel">
            <div class="fd-panel__header">
              <div class="fd-panel__head">
                <comp-summarychart .props=${() =>
                  "width:100%;height:500px;"} > </comp-summarychart>
              </div>
            </div>
          </div>
      </div>
      </div>
      </div>
    `
  }
}
