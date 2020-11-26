import { OvlBaseElement } from "../../../../../ovl/ovl/src/library/OvlBaseElement"
import { html } from "../../../../../ovl/ovl/node_modules/lit-html"
import { OvlState } from "../../../../../ovl/ovl/src"
import { TachoState } from "../../components/tacho/tacho"
// @ts-ignore
import bmwlogo from "../../../img/icon-192x192.png"

import { HappySmiley, MediumSmiley, SadSmiley } from "./smileys"

export type DashboardState = {}

export class CompOccasionsDashboard extends OvlBaseElement {
  async handleClick() {
    this.actions.app.occasionsProcessDashboard.OccasionsProcessDataPoll()
  }
  init() {
    this.screen = "OccasionsDashboard"
  }
  async getUI() {
    return this.track(() => {
      let calculatedState = this.state.app.occasionProcessDashboard
        .calculated_values
      let settingsState = this.state.app.occasionProcessDashboard.settings

      let result

      if (calculatedState.quarter.goodPerc <= settingsState.smileyPerc1_2) {
        result = SadSmiley
      } else if (
        calculatedState.quarter.goodPerc <= settingsState.smileyPerc2_2
      ) {
        result = MediumSmiley
      } else {
        result = HappySmiley
      }

      let goodInProcess = html`<span class="app-highlight app-rowstatus-ok"
        >${calculatedState.total.nrOfGoodLines}</span
      >`

      let mediumInProcess = html`<span
        class="app-highlight app-rowstatus-warning"
        >${calculatedState.total.nrOfMediumLines}</span
      >`

      let badInProcess = html`<span class="app-highlight app-rowstatus-bad"
        >${calculatedState.total.nrOfBadLines}</span
      >`

      let totalInProcess = html`<span class="app-highlight"
        >${calculatedState.total.totalLines}</span
      >`

      let goodClosed = html`<span class="app-highlight app-rowstatus-ok"
        >${calculatedState.quarter.nrOfGoodClosed}</span
      >`
      let mediumClosed = html`<span class="app-highlight app-rowstatus-warning"
        >${calculatedState.quarter.nrOfMediumClosed}</span
      >`

      let badClosed = html`<span class="app-highlight app-rowstatus-bad"
        >${calculatedState.quarter.nrOfBadClosed}</span
      >`

      // let goodInProcessQuarter = html`<span
      //   class="app-highlight app-rowstatus-ok"
      //   >${calculatedState.quarter.nrOfGoodLines}</span
      // >`

      // let mediumInProcessQuarter = html`<span
      //   class="app-highlight app-rowstatus-warning"
      //   >${calculatedState.quarter.nrOfMediumLines}</span
      // >`

      // let badInProcessQuarter = html`<span
      //   class="app-highlight app-rowstatus-bad"
      //   >${calculatedState.quarter.nrOfBadLines}</span
      // >`

      // let totalQuarter = html`<span class="app-highlight"
      //   >${calculatedState.total.totalLines +
      //   calculatedState.quarter.nrOfBadClosed +
      //   calculatedState.quarter.nrOfMediumClosed +
      //   calculatedState.quarter.nrOfGoodClosed}</span
      // >`

      return html`
        <div class="pyro">
          <div class="before"></div>
          <div class="after"></div>
        </div>
        <div
          class="dashboard-grid fd-page pyrodarken"
          @click=${() => this.handleClick()}
        >
          <div class="dashtitle">
            <img src=${bmwlogo} widt="64" height="64" />

            <h1>Occasions-Prozess Dashboard</h1>
          </div>
          <div class="dashtable">
            <caption>
              Fahrzeuge im Prozess: ${goodInProcess} ${mediumInProcess}
              ${badInProcess} , Total${totalInProcess}
            </caption>
            <ovl-table
              class="fd-table fd-layout-panel"
              .props=${(state: OvlState) => {
                return {
                  def:
                    state.app.occasionProcessDashboard.vehicles.tableDef
                      .Vehicles,
                  data: state.app.occasionProcessDashboard.vehicles,
                }
              }}
            >
            </ovl-table>
            <div class="dashboard-finishedperquarter">
              <caption>
                Per Quartal: Abgeschlossen ${goodClosed} ${mediumClosed}
                ${badClosed}
              </caption>
            </div>
          </div>

          <comp-tacho
            .props=${(state: OvlState): TachoState => {
              return {
                mode: "full",
                calculatedValues:
                  state.app.occasionProcessDashboard.calculated_values,
              }
            }}
          ></comp-tacho>
          <comp-tacho
            .props=${(state: OvlState): TachoState => {
              return {
                mode: "quarter",
                calculatedValues:
                  state.app.occasionProcessDashboard.calculated_values,
              }
            }}
          ></comp-tacho>
          <div class="dashresult">${result}</div>
        </div>
      `
    })
  }
}
