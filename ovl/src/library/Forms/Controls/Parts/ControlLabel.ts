import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import {
  cachedRendererFn,
  ControlState,
  GetValueFromCustomFunction,
} from "../helpers"
import { ovl } from "../../../.."
import { T } from "../../../../global/globals"
import {
  FieldGetLabelRender,
  FieldGetLabelRender_Type,
} from "../../../../global/hooks"
import { ifDefined } from "../../../../tracker/litdirectives/if-defined"
import { GetRendererFn } from "../../../Table/helpers"
import { DisplayMode } from "../../../Table/Table"

export class OvlControlLabel extends OvlBaseElement {
  props: any
  field: ControlState
  init() {
    this.field = this.props(this.state)
  }

  async getUI() {
    return this.track(() => {
      let field = this.field.field
      let customHeaderCell = this.field.customHeaderCellClass
      let caption = ""
      let align = ""
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }
      let formState = this.state.ovl.forms[field.formType][field.formId]
      if (field.ui) {
        if (field.ui.noLabel) {
          return null
        }
        if (field.ui.labelTranslationKey) {
          caption = T(field.ui.labelTranslationKey)
        }
        if (!caption) {
          caption = field.fieldKey
        }
      }

      let customHeaderClassName = ""
      let customHeaderTooltip
      if (customHeaderCell) {
        customHeaderClassName = customHeaderCell.className
        customHeaderTooltip = customHeaderCell.tooltip
      }
      let state = ovl.state
      //let formState: FormState = state.ovl.forms[field.formType][field.formId]
      let rendererFn = GetRendererFn(
        formState.namespace,
        cachedRendererFn,
        FieldGetLabelRender,
        field.fieldKey
      )

      if (rendererFn) {
        caption = rendererFn(<FieldGetLabelRender_Type>{
          columnKey: field.fieldKey,
          caption,
          align,
          displayMode: <DisplayMode>"Edit",
          state,
        })
      }

      return html`
        <label
          title="${ifDefined(
            customHeaderTooltip ? customHeaderTooltip : undefined,
            this
          )}"
          class="fd-form-label  ovl-formcontrol-label ovl-label__${field.fieldKey} ${customHeaderClassName}"
          aria-required="${field.validationResult.errors.length > 0 &&
          !field.watched}"
          for="${field.id}"
          >${caption}</label
        >
      `
    })
  }
}
