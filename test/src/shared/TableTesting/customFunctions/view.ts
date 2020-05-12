import { overmind } from "../../.."
import { html, render } from "../../../../../ovl/node_modules/lit-html/lit-html"
import { ViewRendererResult } from "../../../../../ovl/src/library/Table/RowDetailView"
import { ViewRowDef } from "../../../../../ovl/src/library/Table/Table"

export const ViewCustom_tab1_Render = (row: ViewRowDef): ViewRendererResult => {
  let res: ViewRendererResult = {
    type: "Body",
    result: undefined,
  }
  res.result = html`Custom Test Body`
  return res
}
export const ViewAfterRender = async (
  view: ViewRowDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log(
    "hello from tabletesting view afterrender hook. you may do some crazy stuff in here. why not add a chart?"
  )
  let newDiv = document.createElement("div")
  render(
    html`<comp-summarychart
      .props=${() => "height:500px;"}
    ></comp-summarychart>`,
    newDiv
  )
  let mainViewEl = document.getElementById("ovl-detailview-tab2")
  mainViewEl.firstElementChild.appendChild(newDiv)
}

export const ViewShow = async (
  view: ViewRowDef,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  console.log("hello from tabletesting view show hook.")
}
