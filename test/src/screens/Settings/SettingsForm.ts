import { OvlFormElement, FormFields } from "../../library/forms/OvlFormElement"
import { TextBoxControlState } from "../../library/Forms/Controls/TextBox"
import { html } from "lit-html"
import { T } from "../../global/globals"
import { DialogResult } from "../../library/actions"

export type SettingsFormState = {}

type FieldId = "pw" | "pw1" | "pw2"
export class CompSettingsForm extends OvlFormElement {
  init() {
    this.formType = "Settings"
    this.screen = "Settings"
    super.init()
  }
  getUI() {
    let handleSave = () => {
      if (!this.state.ovl.libState.indicator.open) {
        this.actions.settings.SaveSettings(this.formState)
      }
    }

    let handleCancel = async () => {
      if (!this.state.ovl.libState.indicator.open) {
        let cancel: boolean = true
        if (this.formState.dirty) {
          this.actions.dialog.OkCancelDialog({
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
          this.actions.forms.ResetFormAfterAnimation(this.formState)
          this.actions.global.NavigateBack()
        }
      }
    }
    // this is just a helper fn to get typed ids

    let fields = this.formState.fields
    let pwField = fields["pw"]
    let pw1Field = fields["pw1"]
    let pw2Field = fields["pw2"]
    let partner = this.state.portal.partner

    return html`
      <div class="fd-panel ${this.animatedClass} ovldialogcentered">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
            ${T("AppSettings")}
                ${this.state.ovl.user.firstName +
                  " " +
                  this.state.ovl.user.lastName}

            </h3>
          </div>
        </div>

            <div class="fd-panel__body fd-has-padding-base fd-has-margin-base">
              <div class="fd-form__group">
                <div class="fd-form-item ">
                  <ovl-textbox
                    .props=${state => {
                      return <TextBoxControlState>{
                        field: pwField,
                        label: T("AppLoginPassword"),
                        type: "text-security"
                      }
                    }}
                  >
                  </ovl-textbox>
                </div>

                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${state => {
                      return <TextBoxControlState>{
                        field: pw1Field,
                        label: T("AppSettingsPasswordNew"),
                        type: "text-security"
                      }
                    }}
                  >
                  </ovl-textbox>
                </div>
                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${state => {
                      return <TextBoxControlState>{
                        field: pw2Field,
                        label: T("AppSettingsPasswordNewConfirmation"),
                        type: "text-security"
                      }
                    }}
                  >
                  </ovl-textbox>
                </div>
              </div>
            </div>
            <div
              class="fd-panel__footer fd-has-padding-base fd-has-margin-base"
            >
              <div class="fd-panel__actions">
                <button
                  ?disabled=${this.state.ovl.libState.indicator.open ||
                    this.state.ovl.screens.screenState[this.screen].closing}
                  @click=${handleSave}
                  class="fd-button"
                >
                  ${T("AppSave")}
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
          </div>
        </div>
      
    `
  }
}
