import {
  html,
  render,
  TemplateResult,
} from "../../../../../ovl/node_modules/lit-html/lit-html"
import { ViewRendererResult } from "../../../../../ovl/src/library/Table/RowDetailView"
import { ViewRowDef } from "../../../../../ovl/src/library/Table/Table"
import { OvlAction } from "../../../../../ovl/src"
import {
  ViewCustomRender_Type,
  ViewCustomRender_ReturnType,
  ViewAfterRender_Type,
  ViewShow_Type,
  ViewCustomTabRender_Type,
  ViewCustomTabRender_ReturnType,
} from "../../../../../ovl/src/global/hooks"

export const ViewCustom_tab1_Render: OvlAction<
  ViewCustomRender_Type,
  ViewCustomRender_ReturnType
> = (row) => {
  let res: ViewRendererResult = {
    type: "Body",
    result: undefined,
  }
  res.result = html`Custom Test Body`
  return res
}
export const ViewAfterRender: OvlAction<ViewAfterRender_Type> = async ({
  view,
}) => {
  console.log(
    "hello from tabletesting view afterrender hook. you may do some crazy stuff in here. why not add a chart?"
  )
  let mainViewEl: HTMLCollection = document.getElementsByClassName(
    "ovl-detailview-body"
  )
  if (mainViewEl.length > 0) {
    let div
    div = document.getElementById("customViewChart")
    let createdDiv: boolean
    if (!div) {
      createdDiv = true
      div = document.createElement("div")
    }
    render(
      html`<div id="customViewChart">
        <comp-summarychart .props=${() => "height:500px;"}></comp-summarychart>
      </div>`,
      div
    )
    if (createdDiv) {
      mainViewEl[0].appendChild(div)
    }
  }
}

export const ViewShow: OvlAction<ViewShow_Type> = async ({ view }) => {
  console.log("hello from tabletesting view show hook.")
}

export const ViewCustomTab_TabX_Render: OvlAction<
  ViewCustomTabRender_Type,
  ViewCustomTabRender_ReturnType
> = async ({ view }) => {
  return html`<b>I'm a custom Tab!</b> Yeah!`
}
