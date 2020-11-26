import { html } from "../../../../../ovl/ovl/node_modules/lit-html"

export const goodTachoAndSmileyColor = "rgba(63, 195, 128, .75)"
export const mediumTachoAndSmileyColor = "rgba(233, 212, 96, .75)"
export const badTachoAndSmileyColor = "rgba(200, 50, 50, .75)"

export let HappySmiley = html`
  <svg
    viewBox="0 0 473.931 473.931"
    width="18vw"
    height="18vh"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <title>background</title>
      <rect
        fill="none"
        id="canvas_background"
        height="602"
        width="802"
        y="-1"
        x="-1"
      />
    </g>
    <g>
      <title>Layer 1</title>
      <circle
        id="svg_1"
        fill=${goodTachoAndSmileyColor}
        r="236.966"
        cy="236.966"
        cx="236.966"
      />
      <g id="svg_2">
        <path
          id="svg_3"
          fill="#333333"
          d="m383.164,237.123c-1.332,80.699 -65.514,144.873 -146.213,146.206c-80.702,1.332 -144.907,-67.52 -146.206,-146.206c-0.198,-12.052 -18.907,-12.071 -18.709,0c1.5,90.921 73.993,163.414 164.914,164.914c90.929,1.5 163.455,-76.25 164.922,-164.914c0.199,-12.071 -18.51,-12.052 -18.708,0l0,0z"
        />
        <circle
          id="svg_4"
          fill="#333333"
          r="37.216"
          cy="155.227"
          cx="164.937"
        />
        <circle
          id="svg_5"
          fill="#333333"
          r="37.216"
          cy="155.227"
          cx="305.664"
        />
      </g>
      <g id="svg_6" />
      <g id="svg_7" />
      <g id="svg_8" />
      <g id="svg_9" />
      <g id="svg_10" />
      <g id="svg_11" />
      <g id="svg_12" />
      <g id="svg_13" />
      <g id="svg_14" />
      <g id="svg_15" />
      <g id="svg_16" />
      <g id="svg_17" />
      <g id="svg_18" />
      <g id="svg_19" />
      <g id="svg_20" />
    </g>
  </svg>
`
export let MediumSmiley = html`<svg
  viewBox="0 0 32 32"
  width="20vw"
  height="20vh"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle fill=${mediumTachoAndSmileyColor} cx="16" cy="16" r="13" />
  <line
    fill="#333333"
    x1="12"
    x2="12"
    y1="12"
    y2="16"
    stroke="#333333"
    stroke-width="2"
    stroke-linecap="round"
  />
  <line
    x1="20"
    x2="20"
    y1="12"
    y2="16"
    stroke="#333333"
    stroke-width="2"
    stroke-linecap="round"
  />
  <line
    x1="10"
    x2="22"
    y1="20"
    y2="20"
    stroke="#333333"
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>`

export let SadSmiley = html`<svg
  viewBox="0 0 32 32"
  width="20vw"
  height="20vh"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle fill=${badTachoAndSmileyColor} cx="16" cy="16" r="13" />
  <line
    fill="#333333"
    x1="12"
    x2="12"
    y1="12"
    y2="16"
    stroke="#333333"
    stroke-width="2"
    stroke-linecap="round"
  />
  <line
    x1="20"
    x2="20"
    y1="12"
    y2="16"
    stroke="#333333"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path fill="#333333" d="M10.7,21c1.4-1.2,3.3-2,5.3-2s3.9,0.8,5.3,2" />
</svg>`
