import { OvlBaseElement } from "../../library/OvlBaseElement"
import { html } from "lit-html"
import { T } from "../../global/globals"
import { FormFields } from "../../library/forms/OvlFormElement"
import { InitForm } from "../../library/forms/actions"

export class CompOrderFeedback extends OvlBaseElement {
  initFeedback() {
    let fields: { [key: string]: FormFields } = {
      msg: { value: this.state.ovl.screens.screens.Feedback.message }
    }
    let initForm: InitForm = {
      validationActionName: "FeedbackValidateField",
      namespace: "feedback",
      instanceId: this.state.ovl.screens.screens.Feedback.type,
      formType: "Feedback",
      fields
    }
    this.actions.forms.InitForm(initForm)
  }
  getUI() {
    const handlePositiveFeedback = (e: Event) => {
      this.actions.order.PreparePositiveFeedback({
        message: T("AppFeedbackDefaultPositive")
      })

      this.initFeedback()
      this.actions.global.NavigateTo("Feedback")
    }

    const handleNegativeFeedback = (e: Event) => {
      this.actions.order.PrepareNegativeFeedback({
        message: T("AppFeedbackDefaultNegative")
      })
      this.initFeedback()
      this.actions.global.NavigateTo("Feedback")
    }

    const handleDeliveryDateFeedback = (e: Event) => {
      this.actions.order.PrepareDeliveryDateFeedback({
        message: T("AppFeedbackDefaultDeliveryMsg")
      })
      this.initFeedback()
      this.actions.global.NavigateTo("Feedback")
    }

    return html`
      <div class="fd-panel">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
              ${T("AppOrderFeedback")}
            </h3>
          </div>
        </div>
        <div class="fd-panel__body">
          <div>
            <button
              style="width:100%;"
              @click=${handlePositiveFeedback}
              class="fd-button fd-button--positive sap-icon--thumb-up"
            >
              ${T("AppPositiveFeedback")}
            </button>
          </div>
          <div>
            <button
              style="width:100%;"
              @click=${handleNegativeFeedback}
              class="fd-button fd-button--negative sap-icon--thumb-down"
            >
              ${T("AppNegativeFeedback")}
            </button>
          </div>
          <div>
            <button
              style="width:100%;"
              @click=${handleDeliveryDateFeedback}
              class="fd-button sap-icon--date-time"
            >
              ${T("AppDeliveryDateFeedback")}
            </button>
          </div>
        </div>
      </div>
    `
  }
}
