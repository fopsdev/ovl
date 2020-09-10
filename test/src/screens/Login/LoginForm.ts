import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T } from "../../../../ovl/src/global/globals"
import { DialogHolderParams } from "../../../../ovl/src/library/Dialog/OvlDialogHolder"

export type LoginFormState = {}

export type FieldId = "pw" | "user"

export class CompLoginForm extends OvlFormElement {
  init() {
    this.formType = "Login"
    super.init()
  }
  getBody = () => {
    let fields = this.formState.fields
    let userField = fields["user"]
    let pwField = fields["pw"]
    let pwBox = html`
      <div class="fd-form-item">
        <ovl-textbox
          .props=${() => {
            return { field: pwField }
          }}
        >
        </ovl-textbox>
      </div>
    `

    let hideForgotPassword = " hide "
    if (
      !this.state.ovl.libState.indicator.open &&
      this.formState.fields.user.validationResult.valid &&
      this.formState.fields.user.value
    ) {
      hideForgotPassword = ""
    }

    let handleForgotPw = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      this.actions.app.system.user.ForgotPw(this.formState)
    }

    return html`
      <div class="fd-form__group">
        <div class="fd-form-item">
          <ovl-textbox
            .props=${() => {
              return { field: userField }
            }}
          >
          </ovl-textbox>
        </div>
        ${pwBox}
        <a
          @click=${handleForgotPw}
          href="#"
          class="fd-link ${hideForgotPassword}"
          >${T("AppLoginForgotPassword")}</a
        >
      </div>
    `
  }
  getFooter = () => {
    let handleLogin = () => {
      if (!this.state.ovl.user.token) {
        this.actions.app.system.user.Login(this.formState)
      }
    }

    return html`<button
      @click=${handleLogin}
      ?disabled="${this.state.ovl.libState.indicator.open ||
      this.screenClosing()}"
      class="fd-dialog__decisive-button fd-button"
      id="ovlloginbutton"
    >
      ${T("AppLogin")}
    </button> `
  }

  visibleHandling = (dependsOn: boolean) => {
    let dlgState = this.state.ovl.dialogs.Login

    if (!dlgState.visible && dependsOn) {
      dlgState.visible = true
    }
    if (dlgState.visible && !dependsOn) {
      dlgState.closing = true
    }
  }

  async getUI() {
    return this.track(() => {
      this.visibleHandling(!this.state.ovl.user.token)
      if (
        !this.state.ovl.dialogs.Login.visible //||
      ) {
        return null
      }
      let handleKey = async (e: KeyboardEvent) => {
        if (e.key == "Enter") {
          e.preventDefault()
          e.stopPropagation()
          document.getElementById("ovlloginbutton").focus()
          if (!this.state.ovl.user.token) {
            this.actions.app.system.user.Login(this.formState)
          }
        }
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the hiolder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts

      dialogHolderParams = {
        dialogParts: {
          title: () => T("AppLoginPlease"),
          body: () => this.getBody(),
          footer: () => this.getFooter(),
          keyHandlerFn: handleKey,
        },
        zIndex: 12,
        dialogType: "Login",
      }
      return html`<ovl-dialogholder
        .dialogHolderParams=${dialogHolderParams}
      ></ovl-dialogholder>`
    })
  }
}
