import { OvlBaseElement } from "../OvlBaseElement"
import { FormState } from "./actions"
import { ListState } from "./Controls/ListControl"
import { FormType, customFunctions, overmind, Screen } from "../.."
import { resolvePath } from "../../global/globals"
import { ColumnAlign } from "../Table/Table"
import { FormAfterRender, FormShow } from "../../global/hooks"

export type FieldFormat =
  | "2digits"
  | "4digits"
  | "2digitsYear"
  | "4digitsYear"
  | "timestamp"

export type Schema = {
  type: DataType
  nullable: boolean
  maxLength: number
}

export type FormFields = {
  value: string
  type?: DataType
  list?: ListState
  ui?: {
    labelTranslationKey?: string
    useFieldKeyForLabel?: boolean
    format?: FieldFormat
    align?: ColumnAlign
    inline?: boolean
    isPassword?: boolean
    readonly?: boolean
  }
}

export type DataType = "text" | "date" | "decimal" | "int" | "bool" | "time"

export class OvlFormElement extends OvlBaseElement {
  formType: FormType
  formFields: { [key: string]: FormFields }
  formId: string

  schema: { [key: string]: Schema }
  namespace: string
  formState: FormState
  formAfterRenderFn: any
  formShowFn: any
  formShowed: boolean
  handleOvlFocusOut = async (e) => {
    let id = e.detail.id.replace(this.formId, "")
    if (id && this.formState.fields[id]) {
      this.actions.ovl.internal.TouchField({
        formState: this.formState,
        fieldId: id,
      })
    }
  }

  handleOvlChange = async (e) => {
    let id = e.detail.id.replace(this.formId, "")
    if (id && this.formState.fields[id]) {
      // change the field in state
      this.actions.ovl.internal.ChangeField({
        fieldId: id,
        formState: this.formState,
        value: e.detail.val,
        isInit: false,
      })
    }
  }

  getFormFieldId(id: string) {
    return this.formId + id
  }

  init() {
    this.addEventListener("ovlchange", this.handleOvlChange)
    this.addEventListener("ovlfocusout", this.handleOvlFocusOut)

    let id = this.getAttribute("id")

    if (!id) {
      throw new Error("ovl forms: attribute 'id' is mandatory for forms!")
    }
    this.formId = id
    if (!this.formType) {
      throw new Error(
        "ovl forms: " +
          this.formId +
          ": formtype is mandatory for forms (set it in init-method)!"
      )
    }
  }
  async doRender() {
    if (!this.screen || this.screenVisible()) {
      let forms = this.state.ovl.forms
      if (!forms[this.formType] || !forms[this.formType][this.formId]) {
        throw Error(
          "ovl forms: formstate not initialised: formtype:" +
            this.formType +
            " id:" +
            this.formId
        )
      } else {
        this.formState = forms[this.formType][this.formId]
      }
    }
    super.doRender()
  }

  afterRender() {
    this.handleAfterRenderCustomHook()
    this.handleFormShowCustomHook()
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("ovlchange", this.handleOvlChange)
    this.removeEventListener("ovlfocusout", this.handleOvlFocusOut)
  }

  handleAfterRenderCustomHook() {
    if (this.formState) {
      if (this.formAfterRenderFn !== -1) {
        if (this.formAfterRenderFn) {
          this.callFormAfterRender()
        } else {
          if (customFunctions) {
            let formFunctions = resolvePath(
              customFunctions,
              this.formState.namespace
            )
            if (formFunctions) {
              if (formFunctions[FormAfterRender]) {
                this.formAfterRenderFn = formFunctions[FormAfterRender]
                this.callFormAfterRender()
                return
              }
            }
          }
          this.formAfterRenderFn = -1
        }
      }
    }
  }

  handleFormShowCustomHook() {
    if (this.formState) {
      if (!this.formShowed) {
        this.formShowed = true
        // preserve form control focus
        let lastTouchedField = this.formState.fields[
          this.formState.lastTouchedField
        ]
        if (lastTouchedField) {
          let focusEl = document.getElementById(lastTouchedField.id)
          if (focusEl) {
            focusEl.focus()
          }
        }

        // call form Show hook
        if (this.formShowFn !== -1) {
          if (this.formShowFn) {
            this.callFormShow()
          } else {
            if (customFunctions) {
              let formFunctions = resolvePath(
                customFunctions,
                this.formState.namespace
              )
              if (formFunctions) {
                if (formFunctions[FormShow]) {
                  this.formShowFn = formFunctions[FormShow]
                  this.callFormShow()
                  return
                }
              }
            }
            this.formShowFn = -1
          }
        }
      } else {
        if (
          this.state.ovl.screens.nav.currentScreen !==
          this.state.ovl.screens.nav.nextScreen
        ) {
          this.formShowed = false
        }
      }
    }
  }

  callFormAfterRender() {
    this.formAfterRenderFn(
      this.formState,
      this.state,
      this.actions,
      overmind.effects
    )
  }
  callFormShow() {
    setTimeout(() => {
      this.formShowFn(
        this.formState,
        this.state,
        this.actions,
        overmind.effects
      )
    }, 200)
  }
}
