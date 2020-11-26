import { OvlBaseElement } from "../../../../../ovl/ovl/src/library/OvlBaseElement"
import { html } from "../../../../../ovl/ovl/node_modules/lit-html"
import { ovl } from "../../../../../ovl/ovl/src"
import { RadialGauge } from "canvas-gauges"

import {
  badTachoAndSmileyColor,
  goodTachoAndSmileyColor,
  mediumTachoAndSmileyColor,
} from "../../screens/OccasionsDashboard/smileys"

export type TachoState = {
  calculatedValues: typeof ovl.state.app.occasionProcessDashboard.calculated_values
  mode: "full" | "quarter"
}

export class CompTacho extends OvlBaseElement {
  props: any
  data: TachoState
  tachoid: string
  tacho: any
  tachoHighlightsSerialzed: string
  init() {
    this.data = this.props(this.state)
    this.tachoid = "dashgauge" + (this.data.mode === "full" ? "1" : "2")
  }
  async getUI() {
    return this.track(() => {
      if (this.tacho === undefined) {
        let tachoTitle =
          this.data.mode === "full" ? "Fahrzeuge im Prozess" : "Per Quartal"
        return html`
          <div class="${this.tachoid}">
            <h2 class="dashtachotitle">${tachoTitle}</h2>
            <canvas id="${this.tachoid}"></canvas>
          </div>
        `
      }
    })
  }
  afterRender() {
    this.track(() => {
      // this startegy covers if a row was changed serverside (because we loop through the rows and check days)
      // and if one was added serverside because of using the def.uiState......so pretty much all we need to know :)
      let settings = this.state.app.occasionProcessDashboard.settings
      let size = (window.innerHeight * 30) / 100

      let tachoValue =
        this.data.mode === "full"
          ? this.data.calculatedValues.total.goodPerc
          : this.data.calculatedValues.quarter.goodPerc

      let perc1
      if (this.data.mode === "full") {
        perc1 = settings.smileyPerc1
      } else {
        perc1 = settings.smileyPerc1_2
      }

      let perc2
      if (this.data.mode === "full") {
        perc2 = settings.smileyPerc2
      } else {
        perc2 = settings.smileyPerc2_2
      }

      let tachoHighlights = [
        {
          from: 0,
          to: perc1,
          color: badTachoAndSmileyColor,
        },
        {
          from: perc1 + 1,
          to: perc2,
          color: mediumTachoAndSmileyColor,
        },
        {
          from: perc2 + 1,
          to: 100,
          color: goodTachoAndSmileyColor,
        },
      ]
      let tachoHighlightsUpdated = false
      let serializedTH = JSON.stringify(tachoHighlights)
      if (this.tachoHighlightsSerialzed !== serializedTH) {
        tachoHighlightsUpdated = true
      }
      this.tachoHighlightsSerialzed = serializedTH

      if (!this.tacho) {
        this.tacho = new RadialGauge({
          value: tachoValue,
          units: "%",
          renderTo: this.tachoid,
          width: size,
          height: size,
          highlights: tachoHighlights,
          animation: true,
          animationDuration: 1000,
          animationRule: "bounce",

          animateOnInit: true,
        }).draw()
      } else {
        this.tacho.value = tachoValue
        if (tachoHighlightsUpdated) {
          this.tacho.update({ highlights: tachoHighlights })
        }
      }
    })
  }
}
