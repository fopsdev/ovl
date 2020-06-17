import { html } from "../../../../ovl/node_modules/lit-html/lit-html"
import { TableDataAndDef } from "../../../../ovl/src/library/Table/Table"
import { getFormFieldsFromColumns } from "../../../../ovl/src/library/Table/helpers"
import { InitForm, FormState } from "../../../../ovl/src/library/forms/actions"
import { ovltemp, N, api, uuidv4 } from "../../../../ovl/src/global/globals"
import { GetListDisplayValue } from "../../../../ovl/src/library/forms/Controls/helpers"
import { Field_U_TypeId_GetList } from "./MobileTimeRecordingDetail/formActions"

import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"
import { displayFormats } from "../../../../ovl/src/global/displayFormats"
import {
  SnackAdd,
  SnackTrackedAdd,
  SnackTrackedRemove,
} from "../../../../ovl/src/library/helpers"
import {
  tblMobileTimeRecording,
  TableMobileTimeRecording,
} from "./MobileTimeRecordingDetail/state"
import { ovl } from "../../../../ovl/src"
import { FieldGetList_Type } from "../../../../ovl/src/global/hooks"
export class CompMobileTimeEntry extends OvlFormElement {
  init() {
    this.screen = "MobileTimeEntry"
    this.formType = "MobileTimeEntryMain"
    super.init()
  }

  getKeysToSync = () => {
    let data = this.state.portal.testtables.timeentries
    let def = data.tableDef.mobiletimerecording1
    //let rowKeys = Object.keys(data.data)
    return def.uiState.dataFilteredAndSorted.filter((k) => {
      return (
        !(<TableMobileTimeRecording>data.data[k]).U_Synced &&
        k.indexOf(ovltemp) < 0
      )
    })
  }

  handleAddToSAPClick = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    let data = this.state.portal.testtables.timeentries
    let rowKeys = this.getKeysToSync()
    let guids = rowKeys.map((m) => {
      return { timeentry_id: data.data[m].Code }
    })
    let snackUid = uuidv4()
    SnackTrackedAdd("Zeit(en) werden übermittelt...", "Information", snackUid)
    await ovl.effects.ovl.postRequest(api.url + "job/addworktime", guids)
    // tag data as synched
    this.actions.portal.testtables.mobiletimerecording.MarkAsSynced(rowKeys)

    SnackTrackedRemove(snackUid)
    SnackAdd("Zeit(en) erfolgreich übermittelt.")
  }
  handleAddRowClick = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    let def = this.state.portal.testtables.timeentries.tableDef
      .mobiletimerecording1
    let data = this.state.portal.testtables.timeentries
    let tableDataAndDef: TableDataAndDef = {
      data,
      def,
    }
    let rowKey = def.uiState.currentlyAddingKey
    // only add row if there is not already one in addmode
    let forceOverwrite = false
    if (rowKey === undefined || data.data[rowKey] === undefined) {
      if (rowKey === undefined) {
        forceOverwrite = true
      }
      await this.actions.ovl.internal.TableAddRow(tableDataAndDef)
      rowKey = def.uiState.currentlyAddingKey
    }
    let formFields = getFormFieldsFromColumns(def, data.data[rowKey])
    let initForm: InitForm = {
      fields: formFields,
      formType: "MobileTimeEntry",
      instanceId: def.id,
      namespace: def.namespace,
      schema: data.schema,
      forceOverwrite,
    }
    this.actions.ovl.form.InitForm(initForm)
    this.actions.ovl.navigation.NavigateTo("MobileTimeEntryForm")
  }

  async handleDelete(e: Event, key: string) {
    let def = this.state.portal.testtables.timeentries.tableDef
      .mobiletimerecording1
    let data = this.state.portal.testtables.timeentries
    await this.actions.ovl.internal.TableDeleteRow({ key, def, data })
    let formState: FormState
    if (this.state.ovl.forms.MobileTimeEntry) {
      formState = this.state.ovl.forms.MobileTimeEntry["mobiletimerecording1"]
      if (formState) {
        // we have some range validations which checks existing time entries.
        // thats why we need to kick the validation again when an entry got deleted
        this.actions.ovl.form.ValidateForm(formState)
      }
    }
  }
  async getUI() {
    return this.track(() => {
      let def = this.state.portal.testtables.timeentries.tableDef
        .mobiletimerecording1
      let dataKeys = def.uiState.dataFilteredAndSorted.filter(
        (k) => k.indexOf(ovltemp) === -1
      )
      let data = this.state.portal.testtables.timeentries.data
      let fields = this.formState.fields
      let dateField = fields["date"]
      let fd = new Date(dateField.convertedValue)
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      let fullDate = fd.toLocaleDateString(
        displayFormats.mostPreferedLanguage,
        options
      )
      return html`
        <div class="fd-panel ${this.animatedClass}">
          <div class="fd-tile">
            <div class="fd-tile__content fd-has-type-2">
              Zeiterfassung für
              ${this.state.portal.user.firstName +
              " " +
              this.state.portal.user.lastName}
            </div>
          </div>

          <div class="fd-container fd-container--fluid">
            <div class="fd-col--4">
              <div class="fd-tile">
                <div class="fd-tile__content">
                  <ovl-datebox
                    class="fd-form-item "
                    .props="${() => {
                      return { field: dateField }
                    }}"
                  >
                  </ovl-datebox>
                </div>
              </div>
            </div>
            <div class="fd-col--4">
              <div class="fd-tile">
                <div class="fd-tile__content">
                  <div class="fd-form-item fd-has-type-1 ">
                    <input
                      class="fd-input"
                      tabindex="9999"
                      type="text"
                      value="${fullDate}"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="fd-col--4">
              <div class="fd-tile">
                <div class="fd-tile__content">
                  <div class="fd-form-item ">
                    <button
                      @click=${(e) => this.handleAddRowClick(e)}
                      class="fd-button--emphasized sap-icon--add"
                      style="margin-top:4px;"
                      title="Datensatz hinzufügen"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <ul class="fd-list">
            ${dataKeys.map((k) => {
              let declineButton
              if (!data[k].U_Synced) {
                declineButton = html`
                  <span
                    @click=${(e) => this.handleDelete(e, k)}
                    class="fd-list__icon sap-icon--decline"
                  ></span>
                `
              }
              let listValue1 = GetListDisplayValue(
                def.columns.U_TypeId.list,
                data[k].U_TypeId,
                Field_U_TypeId_GetList(<FieldGetList_Type>{ row: data[k] })
              )
              let listValue2 =
                data[k].U_FromTime +
                " - " +
                data[k].U_ToTime +
                " = " +
                N(data[k].U_Duration) +
                " Std."
              return html`
                <li
                  class="fd-list__item animated fadeIn"
                  style="padding-top:12px;padding-bottom:12px;height:auto;"
                >
                  <span
                    style="white-space: normal;width: 100%;"
                    class="fd-list__title fd-has-type-2"
                    >${listValue1} <br />
                    ${listValue2}</span
                  >
                  ${declineButton}
                </li>
              `
            })}
          </ul>

          <div class="fd-tile">
            <div class="fd-tile__content fd-has-type-2">
              <button
                ?disabled=${this.getKeysToSync().length === 0}
                @click=${(e) => this.handleAddToSAPClick(e)}
                class="fd-button--emphasized sap-icon--add"
                title="Zeiten ins SAP übertragen..."
              >
                Sync to SAP
              </button>
            </div>
          </div>
        </div>
      `
    })
  }
}
