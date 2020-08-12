import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"
import { T } from "../../../../ovl/src/global/globals"
import { html } from "../../../../ovl/node_modules/lit-html"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"

export type SettingsFormState = {}

type FieldId = "pw" | "pw1" | "pw2"
export class CompSettingsForm extends OvlFormElement {
  init() {
    this.formType = "Settings"
    this.screen = "Settings"
    super.init()
  }
  async getUI() {
    let handleSave = () => {
      if (!this.state.ovl.libState.indicator.open) {
        this.actions.demoApp.settings.SaveSettings(this.formState)
      }
    }

    let handleCancel = async () => {
      if (!this.state.ovl.libState.indicator.open) {
        let cancel: boolean = true
        if (this.formState.dirty) {
          if ((await DialogOkCancel(T("AppCancelForm"), 1)) === 2) {
            cancel = false
          }
        }
        if (cancel) {
          this.actions.ovl.form.ResetFormAfterNavigation(this.formState)
          this.actions.ovl.navigation.NavigateBack()
        }
      }
    }
    return this.track(() => {
      // this is just a helper fn to get typed ids

      let fields = this.formState.fields
      let pwField = fields["pw"]
      let pw1Field = fields["pw1"]
      let pw2Field = fields["pw2"]
      let partner = this.state.demoApp.partner

      return html`
      <div class="fd-layout-panel  ">
        <div class="fd-layout-panel__header">
          <div class="fd-layout-panel__head">
            <h3 class="fd-layout-panel__title">
            ${T("AppSettings")}
                ${
                  this.state.demoApp.user.firstName +
                  " " +
                  this.state.demoApp.user.lastName
                }
            </h3>
          </div>
        </div>

            <div class="fd-layout-panel__body fd-has-padding-base fd-has-margin-base">
              <div class="fd-form__group">
                <div class="fd-form-item ">
                  <ovl-textbox
                    .props=${() => {
                      return { field: pwField }
                    }}
                  >
                  </ovl-textbox>
                </div>
                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${() => {
                      return { field: pw1Field }
                    }}
                  >
                  </ovl-textbox>
                </div>
                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${() => {
                      return { field: pw2Field }
                    }}
                  >
                  </ovl-textbox>
                </div>
              </div>
            </div>
            <div
              class="fd-layout-panel__footer fd-has-padding-base fd-has-margin-base"
            >
              <div class="fd-layout-panel__actions">
                <button
                  ?disabled=${
                    this.state.ovl.libState.indicator.open ||
                    this.state.ovl.screens.screens[this.screen].closing
                  }
                  @click=${handleSave}
                  class="fd-button"
                >
                  ${T("AppSave")}
                </button>
                <button
                  ?disabled=${
                    this.state.ovl.libState.indicator.open ||
                    this.screenClosing()
                  }
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
    })
  }
}
