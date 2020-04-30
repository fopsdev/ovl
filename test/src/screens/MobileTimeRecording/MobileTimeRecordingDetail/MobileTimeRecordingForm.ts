import { html } from "../../../../../ovl/node_modules/lit-html"
import { N, T } from "../../../../../ovl/src/global/globals"
import { OvlFormElement } from "../../../../../ovl/src/library/forms/OvlFormElement"
import { customFunctions } from "../../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../../ovl/src/library/helpers"

export type MobileTimeEntryFormState = {
  rowKey: string
}

export class CompMobileTimeEntryForm extends OvlFormElement {
  init() {
    this.formType = "MobileTimeEntry"
    this.screen = "MobileTimeEntryForm"

    super.init()
  }
  async handleSave(e) {
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    if (this.formState.valid && !this.state.ovl.libState.indicator.open) {
      await this.actions.ovl.internal.TableEditSaveRow({
        key: def.uiState.currentlyAddingKey,
        def,
        data: this.state.testtables.timeentries,
        formState: this.formState,
      })
    }
    if (def.uiState.currentlyAddingKey === undefined) {
      // this means it was succesfully saved
      this.actions.ovl.navigation.NavigateBack()
    }
  }
  async handleCancel(e) {
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
  getUI() {
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let typeField = this.formState.fields["U_Type"]
    let typeIdField = this.formState.fields["U_TypeId"]
    let fromTimeField = this.formState.fields["U_FromTime"]
    let toTimeField = this.formState.fields["U_ToTime"]
    let durationField = this.formState.fields["U_Duration"]
    let duration = N(durationField.convertedValue)
    let acceptEnabled = "fd-button--positive sap-icon--accept"
    if (!this.formState.valid) {
      acceptEnabled = "fd-button nopointerevents"
    }
    return html`
      <div class="fd-panel ${this.animatedClass}">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
              Zeit erfassen
            </h3>
          </div>
        </div>
        <div class="fd-panel__body">
          <ovl-option
            class="fd-form__item "
            .props="${() => {
              let col = def.columns["U_Type"]
              return typeField
            }}"
          >
          </ovl-option>
        </div>
        <div class="fd-panel__body">
          <ovl-listcontrol
            class="fd-form__item "
            .props="${() => {
              return typeIdField
            }}"
          >
          </ovl-listcontrol>
        </div>
        <div class="fd-panel__body">
          <ovl-timebox
            class="fd-form__item "
            .props=${() => {
              return fromTimeField
            }}
          >
          </ovl-timebox>
        </div>

        <div class="fd-panel__body">
          <ovl-timebox
            class="fd-form__item "
            .props=${() => {
              return toTimeField
            }}
          >
          </ovl-timebox>
        </div>

        <div class="fd-panel__body">
          Dauer: ${duration}
        </div>

        <div class="fd-panel__footer">
          <button
            ?disabled=${this.state.ovl.libState.indicator.open ||
            this.screenClosing()}
            @click=${(e) => this.handleSave(e)}
            class="fd-button fd-button--positive ${acceptEnabled}"
          ></button>
          <div style="margin-left:100px;"></div>
          <button
            ?disabled=${this.state.ovl.libState.indicator.open ||
            this.screenClosing()}
            @mousedown=${(e) => this.handleCancel(e)}
            @click=${(e) => this.handleCancel(e)}
            class="fd-button fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
  }
}
