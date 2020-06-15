import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { FormFields } from "../../../../ovl/src/library/forms/OvlFormElement"
import { InitForm } from "../../../../ovl/src/library/forms/actions"
import { T } from "../../../../ovl/src/global/globals"
import { html } from "../../../../ovl/node_modules/lit-html"

export class CompOrderFeedback extends OvlBaseElement {
  async getUI() {
    const handlePositiveFeedback = (e: Event) => {
      this.actions.portal.order.PreparePositiveFeedback({
        message: T("PortalFeedbackDefaultPositive"),
      })

      this.actions.ovl.navigation.NavigateTo("Feedback")
    }

    const handleNegativeFeedback = (e: Event) => {
      this.actions.portal.order.PrepareNegativeFeedback({
        message: T("PortalFeedbackDefaultNegative"),
      })
      this.actions.ovl.navigation.NavigateTo("Feedback")
    }

    const handleDeliveryDateFeedback = (e: Event) => {
      this.actions.portal.order.PrepareDeliveryDateFeedback({
        message: T("PortalFeedbackDefaultDeliveryMsg"),
      })
      this.actions.ovl.navigation.NavigateTo("Feedback")
    }
    return this.track(() => {
      return html`
        <div class="fd-panel">
          <div class="fd-panel__header">
            <div class="fd-panel__head">
              <h3 class="fd-panel__title">
                ${T("PortalOrderFeedback")}
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
                ${T("PortalPositiveFeedback")}
              </button>
            </div>
            <div>
              <button
                style="width:100%;"
                @click=${handleNegativeFeedback}
                class="fd-button fd-button--negative sap-icon--thumb-down"
              >
                ${T("PortalNegativeFeedback")}
              </button>
            </div>
            <div>
              <button
                style="width:100%;"
                @click=${handleDeliveryDateFeedback}
                class="fd-button sap-icon--date-time"
              >
                ${T("PortalDeliveryDateFeedback")}
              </button>
            </div>
          </div>
        </div>
      `
    })
  }
}
