import { OvlBaseElement } from "../../OvlBaseElement"
import { html } from "lit-html"
import { logState, T } from "../../../global/globals"
import { OvlFormState } from "../actions"

export class OvlFormValidationHint extends OvlBaseElement {
  props: any
  formState: OvlFormState
  init() {
    this.formState = this.props(this.state)
  }
  async getUI() {
    return this.track(() => {
      // get all the errors with a dependency to fields
      let errors = this.formState.validationResult.errors

      let fields = this.formState.fields

      let allUnWatchedFieldsErrorKeys: Set<string> = new Set()
      Object.keys(fields)
        .filter((f) => fields[f].watched === false)
        .forEach((f) =>
          fields[f].validationResult.errors.forEach((f2) => {
            allUnWatchedFieldsErrorKeys.add(f2.key)
          })
        )

      let allWatchedFieldsErrorKeys: Set<string> = new Set()
      Object.keys(fields)
        .filter((f) => fields[f].watched)
        .forEach((f) =>
          fields[f].validationResult.errors.forEach((f2) => {
            allWatchedFieldsErrorKeys.add(f2.key)
          })
        )

      let res1 = errors.filter(
        (f) =>
          f.displayType === "WhenAllRelatedFieldsTouched" &&
          !allUnWatchedFieldsErrorKeys.has(f.key)
      )

      let res2 = errors.filter(
        (f) =>
          f.displayType === "WhenFirstFieldTouched" &&
          allWatchedFieldsErrorKeys.has(f.key)
      )

      let res3 = errors.filter((f) => f.displayType === "Always")

      let res = res1.concat(res2).concat(res3)
      if (res.length === 0) {
        return null
      }
      let msgs = res.map((m) => T(m.key, m.reps)).join(", ")

      return html`
        <div
          class="fd-form-message fd-form-message--error ovl-formcontrol-formvalidation"
        >
          ${msgs}
        </div>
      `
    })
  }
}
