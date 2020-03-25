import { html } from "../../../../ovl/node_modules/lit-html"
import { D, T } from "../../../../ovl/src/global/globals"
import { DialogResult } from "../../../../ovl/src/library/actions"
import { TextAreaControlState } from "../../../../ovl/src/library/Forms/Controls/TextArea"
import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"

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

  getUI() {
    let fields = this.formState.fields
    const id = (id: FieldId) => this.getFormFieldId(id)
    let msgField = fields["msg"]

    let handleOk = () => {
      if (!this.state.ovl.libState.indicator.open) {
        this.actions.portal.feedback.SaveFeedback(this.formState)
      }
    }
    let handleCancel = async () => {
      if (!this.state.ovl.libState.indicator.open) {
        let cancel: boolean = true
        if (this.formState.dirty) {
          this.actions.ovl.dialog.OkCancelDialog({
            text: T("AppCancelForm"),
            default: 1
          })
          switch (await DialogResult()) {
            case 1:
              break
            case 2:
              cancel = false
              break
          }
        }
        if (cancel) {
          this.actions.ovl.form.ResetFormAfterAnimation(this.formState)
          this.actions.ovl.navigation.NavigateBack()
        }
      }
    }

    let feedback = this.state.ovl.screens.screens.Feedback

    return html`
      <div class="fd-panel ${this.animatedClass}">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
              ${feedback.title}
            </h3>
          </div>
        </div>
        <div class="fd-panel__body">
          <div class="cols2">
            <div>
              ${T("AppCardCode")}
            </div>
            <div>
              ${feedback.cardCode}
            </div>
            <div>
              ${T("AppOrderDocNum")}
            </div>
            <div>
              ${feedback.orderNum}
            </div>
            <div>
              ${T("AppCommission")}
            </div>
            <div>
              ${feedback.refNum}
            </div>

            <div>
              ${T("AppOrderDocDate")}
            </div>
            <div>
              ${D(feedback.orderDate)}
            </div>
            <div>
              ${T("AppDeliveryDate")}
            </div>
            <div>
              ${D(feedback.orderDeliveryDate)}
            </div>
          </div>
        </div>
        <div class="fd-panel__body">
          <div class="fd-form__set">
            <div class="fd-form__item">
              <ovl-textarea
                .props=${state => {
                  return <TextAreaControlState>{
                    field: msgField,
                    label: T("AppFeedbackPleaseEnterText")
                  }
                }}
              >
              </ovl-textarea>
            </div>
          </div>
          <button
            ?disabled=${this.state.ovl.libState.indicator.open ||
              this.screenClosing()}
            @click=${handleOk}
            class="fd-button"
          >
            ${T("AppFeedbackSend")}
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
  }
}