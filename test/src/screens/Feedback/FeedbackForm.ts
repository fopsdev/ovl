import { html } from "../../../../ovl/node_modules/lit-html"
import { D, T } from "../../../../ovl/src/global/globals"
import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"

export type FeedbackType = "OrderPositive" | "OrderNegative" | "DeliveryDate"

export type FeedbackFormState = {
  title: string
  type: FeedbackType
  cardCode: string
  orderNum: string
  refNum: string
  orderDate: string
  orderDeliveryDate: string
  message: string
  dirty: boolean
}

export type FieldId = "msg"

export class CompFeedbackForm extends OvlFormElement {
  init() {
    this.formType = "Feedback"
    this.screen = "Feedback"
    super.init()
  }

  async getUI() {
    return this.track(() => {
      let fields = this.formState.fields
      const id = (id: FieldId) => this.getFormFieldId(id)
      let msgField = fields["msg"]

      let handleOk = () => {
        if (!this.state.ovl.libState.indicator.open) {
          this.actions.app.feedback.SaveFeedback(this.formState)
        }
      }
      let handleCancel = async () => {
        if (!this.state.ovl.libState.indicator.open) {
          let cancel: boolean = true
          if (this.formState.dirty) {
            if ((await DialogOkCancel({ text: T("AppCancelForm") })) === 2) {
              cancel = false
            }
          }
          if (cancel) {
            this.actions.ovl.form.ResetFormAfterNavigation(this.formState)

            this.actions.ovl.navigation.NavigateBack()
          }
        }
      }

      let feedback = this.state.app.screens.feedback

      return html`
        <div class="fd-layout-panel ">
          <div class="fd-layout-panel__header">
            <div class="fd-layout-panel__head">
              <h3 class="fd-layout-panel__title">${feedback.title}</h3>
            </div>
          </div>
          <div class="fd-layout-panel__body">
            <div class="cols2">
              <div>${T("PortalCardCode")}</div>
              <div>${feedback.cardCode}</div>
              <div>${T("PortalOrderDocNum")}</div>
              <div>${feedback.orderNum}</div>
              <div>${T("PortalCommission")}</div>
              <div>${feedback.refNum}</div>

              <div>${T("PortalOrderDocDate")}</div>
              <div>${D(feedback.orderDate)}</div>
              <div>${T("PortalDeliveryDate")}</div>
              <div>${D(feedback.orderDeliveryDate)}</div>
            </div>
          </div>
          <div class="fd-layout-panel__body">
            <div class="fd-form__set">
              <div>
                <ovl-textarea
                  .props=${() => {
                    return { field: msgField }
                  }}
                >
                </ovl-textarea>
              </div>
            </div>
            <br />
            <button
              ?disabled=${this.state.ovl.libState.indicator.open ||
              this.screenClosing()}
              @click=${handleOk}
              class="fd-button"
            >
              ${T("PortalFeedbackSend")}
            </button>
            <button
              ?disabled=${this.state.ovl.libState.indicator.open ||
              this.screenClosing()}
              @click=${handleCancel}
              class="fd-button"
            >
              ${T("AppCancel")}
            </button>
          </div>
        </div>
      `
    })
  }
}
