import { OvlFormElement } from "../../library/forms/OvlFormElement"
import { html } from "lit-html"
import { T, getDecimalValue, N } from "../../global/globals"
import { DialogResult } from "../../library/actions"
import { OptionControlState } from "../../library/Forms/Controls/Option"
import * as functions from "../../tableFunctions"
import { ListControlState } from "../../library/forms/Controls/ListControl"
import { TimeControlState } from "../../library/Forms/Controls/Time"

export type MobileTimeEntryFormState = {
  rowKey: string
}

export class CompMobileTimeEntryForm extends OvlFormElement {
  focusInit: boolean
  init() {
    this.formType = "MobileTimeEntry"
    this.screen = "MobileTimeEntryForm"
    this.focusInit = false
    super.init()
  }
  async handleSave(e) {
    let def = this.state.tables.timeentries.tableDef.mobiletimerecording1
    if (this.formState.valid && !this.state.ovl.libState.indicator.open) {
      await this.actions.internal.TableEditSaveRow({
        key: def.uiState.currentlyAddingKey,
        def,
        data: this.state.tables.timeentries,
        formState: this.formState
      })
    }
    if (def.uiState.currentlyAddingKey === undefined) {
      // this means it was succesfully saved
      this.actions.global.NavigateBack()
    }
  }
  async handleCancel(e) {
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
  getUI() {
    let def = this.state.tables.timeentries.tableDef.mobiletimerecording1
    let typeField = this.formState.fields["U_Type"]
    let typeIdField = this.formState.fields["U_TypeId"]
    let fromTimeField = this.formState.fields["U_FromTime"]
    let toTimeField = this.formState.fields["U_ToTime"]
    let durationField = this.formState.fields["U_Duration"]
    let duration = N(durationField.convertedValue)
    let saveText
    let acceptEnabled = "fd-button--positive sap-icon--accept"
    if (!this.formState.valid) {
      acceptEnabled = "fd-button nopointerevents"
      saveText = ""
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
            id="${typeField.id}"
            class="fd-form__item "
            .props="${() => {
              let col = def.columns["U_Type"]
              return <OptionControlState>{
                field: typeField,
                label: col.caption,
                align: "left",
                formState: this.formState,
                namespace: def.namespace,
                list: {
                  listFn: functions[def.namespace].U_TypeGetListFn,
                  displayField: col.list.displayField,
                  valueField: col.list.valueField
                },
                inline: true
              }
            }}"
          >
          </ovl-option>
        </div>
        <div class="fd-panel__body">
          <ovl-listcontrol
            class="fd-form__item "
            .props="${() => {
              let col = def.columns["U_TypeId"]
              return <ListControlState>{
                field: typeIdField,
                label: col.caption,
                align: "left",
                formState: this.formState,
                namespace: def.namespace,
                list: {
                  listFn: functions[def.namespace].U_TypeIdGetListFn,
                  displayField: col.list.displayField,
                  displayValueField: col.list.displayValueField,
                  valueField: col.list.valueField,
                  serverEndpoint: col.list.serverEndpoint
                },
                fieldId: "U_TypeId"
              }
            }}"
          >
          </ovl-listcontrol>
        </div>
        <div class="fd-panel__body">
          <ovl-timebox
            class="fd-form__item "
            .props=${state => {
              let col = def.columns["U_FromTime"]
              return <TimeControlState>{
                field: fromTimeField,
                label: col.caption,
                align: "left"
              }
            }}
          >
          </ovl-timebox>
        </div>

        <div class="fd-panel__body">
          <ovl-timebox
            class="fd-form__item "
            .props=${state => {
              let col = def.columns["U_ToTime"]
              return <TimeControlState>{
                field: toTimeField,
                label: col.caption,
                align: "left"
              }
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
            @click=${e => this.handleSave(e)}
            class="fd-button fd-button--positive ${acceptEnabled}"
          ></button>
          <div style="margin-left:100px;"></div>
          <button
            ?disabled=${this.state.ovl.libState.indicator.open ||
              this.screenClosing()}
            @mousedown=${e => this.handleCancel(e)}
            @click=${e => this.handleCancel(e)}
            class="fd-button fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
  }
}
