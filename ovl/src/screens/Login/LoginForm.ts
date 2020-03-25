import { OvlFormElement, FormFields } from "../../library/Forms/OvlFormElement"
import { TextBoxControlState } from "../../library/Forms/Controls/TextBox"

import { html } from "lit-html"
import { T, resolvePath } from "../../global/globals"
import { OvlConfig } from "../../init"

export type LoginFormState = {}

export type FieldId = "pw" | "user"

export class LoginForm extends OvlFormElement {
  init() {
    this.screen = "Login"
    this.formType = "Login"
    super.init()
  }
  getUI() {
    let handleLogin = () => {
      let user = this.state.ovl.user
      if (!user || !user.token) {
        login()
      }
    }
    let login = async () => {
      try {
        let a = resolvePath(
          this.actions,
          OvlConfig.requiredActions.loginActionPath
        )
        a(this.formState)
      } catch {
        console.error(
          "Login Action as configured in OvlConfig: " +
            OvlConfig.requiredActions.loginActionPath +
            " not found!"
        )
      }
    }

    let handleKey = async (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        e.preventDefault()
        e.stopPropagation()
        let user = this.state.ovl.user
        if (!user || !user.token) {
          login()
        }
      }
    }

    let handleForgotPw = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        let a = resolvePath(
          this.actions,
          OvlConfig.requiredActions.forgotPwActionPath
        )
        a(this.formState)
      } catch {
        console.error(
          "ForgotPw Action as configured in OvlConfig: " +
            OvlConfig.requiredActions.forgotPwActionPath +
            " not found!"
        )
      }
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
