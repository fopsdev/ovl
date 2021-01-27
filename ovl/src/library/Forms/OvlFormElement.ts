import { OvlForm, ovl } from "../.."
import { resolvePath, SetFocus } from "../../global/globals"
import {
  FormAfterRender,
  FormShow,
  FormAfterRender_Type,
  FormShow_Type,
} from "../../global/hooks"
import { OvlBaseElement } from "../OvlBaseElement"
import { ColumnAlign } from "../Table/Table"
import { OvlFormState } from "./actions"
import { ListState } from "./Controls/ListControl"

export type FieldFormat =
  | "2digits"
  | "4digits"
  | "3digits"
  | "0digits"
  | "2digitsYear"
  | "4digitsYear"
  | "timestamp"

export type Schema = {
  type: DataType
  nullable: boolean
  maxLength: number
}

export type FormField = {
  value: any
  type?: DataType
  list?: ListState
  ui?: {
    labelTranslationKey?: string
    noLabel?: boolean
    format?: FieldFormat
    align?: ColumnAlign
    inline?: boolean
    isPassword?: boolean
    readonly?: boolean
    showLabelIfNoValueInView?: boolean
    useSpellcheck?: boolean
    autocomplete?: boolean
    checkedValue?: string | boolean
    visible?: "true" | "false" | "fadeIn" | "fadeOut" | "fadeOutHide"
  }
  asset?: {
    validFileExtensions: string[]
    validCategories: string[]
    idColumns: string[]
  }
}

export type DataType = "text" | "date" | "decimal" | "int" | "bool" | "time"

export type LookupDef = {
  type: DataType
  translationKey?: string
  order?: number
}

export type FormShowed = {
  formType: OvlForm
  instanceId: string
}

export class OvlFormElement extends OvlBaseElement {
  formType: OvlForm
  formFields: { [key: string]: FormField }
  formId: string

  schema: { [key: string]: Schema }
  namespace: string
  formState: OvlFormState
  formAfterRenderFn: any
  formShowFn: any
  //formShowed: boolean
  handleOvlFocusOut = async (e) => {
    let id = e.detail.id.replace(this.formId, "")
    if (id && this.formState.fields[id]) {
      if (!this.formState.fields[id].ui.readonly) {
        this.actions.ovl.internal.TouchField({
          formState: this.formState,
          fieldId: id,
        })

        this.actions.ovl.internal.FocusField({
          formState: this.formState,
          fieldId: id,
          hasFocus: false,
        })
      }
    }
  }

  handleOvlChange = async (e) => {
    let id = e.detail.id.replace(this.formId, "")
    if (id && this.formState.fields[id]) {
      // change the field in state
      this.actions.ovl.internal.ChangeField({
        fieldKey: id,
        formState: this.formState,
        value: e.detail.val,
        isInit: false,
        isInnerEvent: e.detail.isInnerEvent === true,
      })
    }
  }

  handleOvlFocusIn = async (e) => {
    let id = e.detail.id.replace(this.formId, "")
    if (
      id &&
      this.formState.fields[id] &&
      !this.formState.fields[id].ui.readonly
    ) {
      this.actions.ovl.internal.FocusField({
        formState: this.formState,
        fieldId: id,
        hasFocus: true,
      })
    }
  }

  getFormFieldId(id: string) {
    return this.formId + id
  }

  init() {
    this.addEventListener("ovlchange", this.handleOvlChange)
    this.addEventListener("ovlfocusout", this.handleOvlFocusOut)
    this.addEventListener("ovlfocusin", this.handleOvlFocusIn)

    if (!this.formType) {
      throw new Error(
        "ovl forms: " +
          this.formId +
          ": formtype is mandatory for forms (set it in init-method)!"
      )
    }
    if (!this.formId) {
      let id = this.getAttribute("id")
      if (!id) {
        id = this.formType
        //throw new Error("ovl forms: attribute 'id' is mandatory for forms!")
      }
      this.formId = id
    }
  }
  async doRender() {
    if (this.screenClosing()) {
      //whilst screenclosing reset all the formShowed to false so they can show again...
      let formsState = this.state.ovl.forms
      let formShowedToReset: FormShowed[] = this.state.ovl.screens
        .formShowedToReset
      formShowedToReset.forEach((formInfo: FormShowed) => {
        formsState[formInfo.formType][formInfo.instanceId].formShowed = false
      })
      formShowedToReset = []
    }

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
  }
  updated() {
    this.handleFormShowCustomHook()
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("ovlchange", this.handleOvlChange)
    this.removeEventListener("ovlfocusout", this.handleOvlFocusOut)
    this.removeEventListener("ovlfocusin", this.handleOvlFocusIn)
  }

  handleAfterRenderCustomHook() {
    if (this.formState) {
      if (this.formAfterRenderFn !== -1) {
        if (this.formAfterRenderFn) {
          this.callFormAfterRender()
        } else {
          let formFunctions = resolvePath(
            this.actions.custom,
            this.formState.namespace
          )
          if (formFunctions) {
            if (formFunctions[FormAfterRender]) {
              this.formAfterRenderFn = formFunctions[FormAfterRender]
              this.callFormAfterRender()
              return
            }
          }
          this.formAfterRenderFn = -1
        }
      }
    }
  }

  handleFormShowCustomHook() {
    if (!this.screenClosing() && this.formState && !this.formState.formShowed) {
      this.formState.formShowed = true
      this.state.ovl.screens.formShowedToReset.push({
        formType: this.formType,
        instanceId: this.formId,
      })
      // call form Show hook
      if (this.formShowFn !== -1) {
        if (this.formShowFn) {
          this.callFormShow()
        } else {
          let formFunctions = resolvePath(
            this.actions.custom,
            this.formState.namespace
          )
          if (formFunctions) {
            if (formFunctions[FormShow]) {
              this.formShowFn = formFunctions[FormShow]
              this.callFormShow()
            }
          } else {
            this.formShowFn = -1
          }
        }
      }

      let fsLastTouchedField = this.formState.fieldToFocus
      if (fsLastTouchedField) {
        let lastTouchedField = this.formState.fields[fsLastTouchedField]
        if (lastTouchedField) {
          SetFocus(lastTouchedField.id)
        }
      }
    }
  }

  callFormAfterRender() {
    this.formAfterRenderFn(<FormAfterRender_Type>{
      formState: this.formState,
      comp: this,
    })
  }
  callFormShow() {
    //setTimeout(() => {
    this.formShowFn(<FormShow_Type>{ formState: this.formState, comp: this })
    //}, 200)
  }
}
