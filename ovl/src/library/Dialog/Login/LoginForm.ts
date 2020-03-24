import { OvlFormElement } from "../../forms/OvlFormElement"
import { TextBoxControlState } from "../../forms/Controls/TextBox"
import { FormFields } from "../../Forms/OvlFormElement"
import { html } from "lit-html"
import { T } from "../../../global/globals"

export type LoginFormState = {}

export type FieldId = "pw" | "user"

export class CompLoginForm extends OvlFormElement {
  init() {
    this.screen = "Login"
    this.formType = "Login"
    super.init()
  }
  getUI() {
    let handleLogin = () => {
      if (!this.state.ovl.user.token) {
        //this.actions.ovl.global.Login(this.formState)
      }
    }

    let handleKey = async (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        e.preventDefault()
        e.stopPropagation()
        // let fields = this.formState.fields
        // let userField = fields["user"]
        // let pwField = fields["pw"]
        // if (document.activeElement.id === userField.id || document.activeElement.id === pwField.id) {

        // }
        //await this.actions.ovl.form.ValidateForm(this.formState)
        if (!this.state.ovl.user.token) {
          //this.actions.ovl.global.Login(this.formState)
        }
      }
    }

    let handleForgotPw = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      this.actions.ovl.global.ForgotPw(this.formState)
    }

    let fields = this.formState.fields
    let userField = fields["user"]
    let pwField = fields["pw"]

    let hideForgotPassword = " hide "
    if (
      this.formState.fields.user.validationResult.valid &&
      this.formState.fields.user.value
    ) {
      hideForgotPassword = ""
    }

    return html`
      <div
        class="ovldialogcentered ${this.animatedClass}"
        @keydown=${handleKey}
      >
        <div class="fd-modal" style="z-index:1003;">
          <div class="fd-modal__content" role="document">
            <div
              class="fd-modal__header fd-has-padding-tiny fd-has-margin-tiny"
            >
              <h3 class="fd-modal__title">${T("AppLoginPlease")}</h3>
            </div>
            <div class="fd-modal__body fd-has-padding-base fd-has-margin-base">
              <div class="fd-form__group">
                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${state => {
                      return <TextBoxControlState>{
                        field: userField,
                        label: T("AppLoginUser"),
                        type: "text"
                      }
                    }}
                  >
                  </ovl-textbox>
                </div>
                <div class="fd-form-item">
                  <ovl-textbox
                    .props=${state => {
                      return <TextBoxControlState>{
                        field: pwField,
                        label: T("AppLoginPassword"),
                        type: "password"
                      }
                    }}
                  >
                  </ovl-textbox>
                </div>
              </div>
            </div>
            <footer
              class="fd-modal__footer fd-has-padding-base fd-has-margin-base"
            >
              <div class="fd-modal__actions">
                <button
                  @click=${handleLogin}
                  ?disabled="${this.state.ovl.libState.indicator.open ||
                    this.screenClosing()}"
                  class="fd-button"
                >
                  ${T("AppLogin")}
                </button>
                <a
                  @click=${handleForgotPw}
                  href="#"
                  class="fd-link fd-has-float-left ${hideForgotPassword}"
                  >${T("AppLoginForgotPassword")}</a
                >
              </div>
            </footer>
          </div>
        </div>
      </div>
    `
  }
}
