import { html } from "../../../../ovl/node_modules/lit-html/lit-html"
import { TableDataAndDef } from "../../../../ovl/src/library/Table/Table"
import { getFormFieldsFromColumns } from "../../../../ovl/src/library/Table/helpers"
import { InitForm, FormState } from "../../../../ovl/src/library/forms/actions"
import { ovltemp, N, api } from "../../../../ovl/src/global/globals"
import { GetListDisplayValue } from "../../../../ovl/src/library/forms/Controls/helpers"
import { U_TypeIdGetListFn } from "./customFunctions"
import { overmind } from "../../../../ovl/src"
import { OvlFormElement } from "../../../../ovl/src/library/forms/OvlFormElement"
import { TextBoxControlState } from "../../../../ovl/src/library/Forms/Controls/TextBox"
import { displayFormats } from "../../../../ovl/src/global/displayFormats"
export class CompMobileTimeEntry extends OvlFormElement {
  init() {
    this.screen = "MobileTimeEntry"
    this.formType = "MobileTimeEntryMain"
    super.init()
  }

  handleAddToSAPClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    let data = this.state.testtables.timeentries
    let def = data.tableDef.mobiletimerecording1
    //let rowKeys = Object.keys(data.data)
    let rowKeys = def.uiState.dataFilteredAndSorted.filter(
      (k) => k.indexOf(ovltemp) < 0
    )
    let guids = rowKeys.map((m) => {
      return { timeentry_id: data.data[m].Code }
    })
    overmind.effects.postRequest(api.url + "job/addworktime", guids)
  }
  handleAddRowClick = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let data = this.state.testtables.timeentries
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
      validationFnName: "RowValidate",
      changedFnName: "RowChanged",
      forceOverwrite,
    }
    this.actions.ovl.form.InitForm(initForm)
    this.actions.ovl.navigation.NavigateTo("MobileTimeEntryForm")
  }

  async handleDelete(e: Event, key: string) {
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let data = this.state.testtables.timeentries
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
  getUI() {
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let dataKeys = def.uiState.dataFilteredAndSorted.filter(
      (k) => k.indexOf(ovltemp) === -1
    )
    let data = this.state.testtables.timeentries.data
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
                <ovl-textbox
                  class="fd-form__item "
                  .props="${() => {
                    return <TextBoxControlState>{
                      field: dateField,
                      type: "text",
                    }
                  }}"
                >
                </ovl-textbox>
              </div>
            </div>
          </div>
          <div class="fd-col--4">
            <div class="fd-tile">
              <div class="fd-tile__content">
                <div class="fd-form-item fd-has-type-1 ">
                  ${fullDate}
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
            let listValue1 = GetListDisplayValue(
              def.columns.U_TypeId.list,
              data[k].U_TypeId,
              U_TypeIdGetListFn(
                data[k],
                this.state,
                this.actions,
                overmind.effects
              )
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
                <span
                  @click=${(e) => this.handleDelete(e, k)}
                  class="fd-list__icon sap-icon--decline"
                ></span>
              </li>
            `
          })}
        </ul>

        <div class="fd-tile">
          <div class="fd-tile__content fd-has-type-2">
            <button
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
  }
  afterRender() {}
}
