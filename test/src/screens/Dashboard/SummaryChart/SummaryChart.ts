import { OvlBaseElement } from "../../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../../ovl/node_modules/lit-html"
import { T, stringifyReplacer } from "../../../../../ovl/src/global/globals"

export class CompSummaryChart extends OvlBaseElement {
  chart: any
  props: any
  chartProps: string
  init() {
    this.chartProps = this.props()
  }
  async getUI() {
    return this.track(() => {
      return html`
        <div class="chartwidth">
          <canvas
            id="canvas"
            style="${this.chartProps}"
            class="chartjs-render-monitor"
          ></canvas>
        </div>
      `
    })
  }
  getData() {
    //@ts-ignore
    let color = Chart.helpers.color
    return {
      labels: this.state.demoApp.chartData.labels.map(
        (m, i) =>
          T("AppMonth" + m.toString()) +
          " " +
          this.state.demoApp.chartData.labels_ext[i].toString()
      ),
      datasets: [
        {
          label: T("PortalCurrentYear"),
          data: JSON.parse(
            JSON.stringify(
              this.state.demoApp.chartData.values_1,
              stringifyReplacer
            )
          ),
          //@ts-ignore
          backgroundColor: color("rgb(255, 0, 0)").alpha(0.5).rgbString(),
          //@ts-ignore
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 1,
        },
        {
          label: T("PortalLastYear"),
          data: JSON.parse(
            JSON.stringify(
              this.state.demoApp.chartData.values_2,
              stringifyReplacer
            )
          ),
          //@ts-ignore
          backgroundColor: color("rgb(54, 162, 235)").alpha(0.5).rgbString(),
          //@ts-ignore
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.chart) {
      this.chart.destroy()
    }
  }

  afterRender() {
    if (!this.chart) {
      //@ts-ignore
      var ctx = document.getElementById("canvas").getContext("2d")
      //@ts-ignore
      let color = Chart.helpers.color

      //@ts-ignore
      this.chart = new Chart(ctx, {
        type: "bar",

        data: this.getData(),
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                },
              },
            ],
          },
          responsive: true,
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: T("PortalChartOrderQtyTitle"),
          },
        },
      })
      //console.log(this.chart)
      //this.chart.update()
    } else {
      this.chart.data = this.getData()
      this.chart.options.title.text = T("PortalChartOrderQtyTitle")
      this.chart.update()
    }
  }
}
