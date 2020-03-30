import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { TableDataAndDef } from "../../../../ovl/src/library/Table/Table"
import { getFormFieldsFromColumns } from "../../../../ovl/src/library/Table/helpers"
import { InitForm, FormState } from "../../../../ovl/src/library/forms/actions"
import { ovltemp, N } from "../../../../ovl/src/global/globals"
import { GetListDisplayValue } from "../../../../ovl/src/library/forms/Controls/helpers"
import { U_TypeIdGetListFn } from "./functions"
export class CompMobileTimeEntry extends OvlBaseElement {
  dateInputElement: any
  dateInputId: string
  init() {
    this.screen = "MobileTimeEntry"
    this.dateInputId = "mobiletimeentrydateselect"
    if (this.state.ovl.uiState.isMobile) {
      this.addEventListener("input", this.handleChange)
    } else {
      this.addEventListener("change", this.handleChange)
    }
  }
  handleAddRowClick = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let data = this.state.testtables.timeentries
    let tableDataAndDef: TableDataAndDef = {
      data,
      def
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
      validationActionName: "RowValidate",
      changedActionName: "RowChanged",
      forceOverwrite
    }
    this.actions.ovl.form.InitForm(initForm)
    this.actions.ovl.navigation.NavigateTo("MobileTimeEntryForm")
  }

  async handleChange(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let inputVal = this.dateInputElement.value
    let dt
    if (inputVal) {
      dt = new Date(inputVal)
    } else {
      dt = new Date()
    }
    let val = ""
    if (dt) {
      val = dt.toISOString().substring(0, 10)
      this.dateInputElement.value = val
    }
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    // only add row if there is not already one in addmode
    await this.actions.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
      {
        def,
        selected: val
      }
    )
    let formState: FormState
    if (this.state.ovl.forms.MobileTimeEntry) {
      formState = this.state.ovl.forms.MobileTimeEntry["mobiletimerecording1"]
      if (formState) {
        this.actions.ovl.form.ValidateForm(formState)
      }
    }
  }

  async handleDelete(e: Event, key: string) {
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let data = this.state.testtables.timeentries
    await this.actions.ovl.internal.TableDeleteRow({ key, def, data })
    let formState: FormState
    if (this.state.ovl.forms.MobileTimeEntry) {
      formState = this.state.ovl.forms.MobileTimeEntry["mobiletimerecording1"]
      if (formState) {
        // we have some range validations which checks existing tie entries.
        // thats why we need to kick the validation again when an entry got deleted
        this.actions.ovl.form.ValidateForm(formState)
      }
    }
  }
  getUI() {
    let dateSelected = this.state.ovl.screens.screens.MobileTimeEntry
      .selectedDate
    let def = this.state.testtables.timeentries.tableDef.mobiletimerecording1
    let dataKeys = def.uiState.dataFilteredAndSorted.filter(
      k => k.indexOf(ovltemp) === -1
    )
    let data = this.state.testtables.timeentries.data
    return html`
      <div class="fd-panel ${this.animatedClass}">
        <div class="fd-input-group" style="height:10vh;">
          <input
            style="border:none;margin-top:14px;"
            autocomplete="off"
            class="fd-input fd-has-type-3"
            type="date"
            required
            id="${this.dateInputId}"
            value="${dateSelected}"
          />
          <button
            @click=${e => this.handleAddRowClick(e)}
            class="fd-button--emphasized sap-icon--add"
            style="margin-top:4px;margin-left:4px;margin-right:4px;margin-top:14px;padding:0;width:260px;"
            title="Datensatz hinzufügen"
          >
            Zeit hinzufügen
          </button>
        </div>

        <ul class="fd-list">
          ${dataKeys.map(k => {
            let listValue1 = GetListDisplayValue(
              def.columns.U_TypeId.list,
              data[k].U_TypeId,
              U_TypeIdGetListFn(this.state, data[k])
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
                class="fd-list__item"
                style="padding-top:12px;padding-bottom:12px;height:auto;"
              >
                <span
                  style="white-space: normal;width: 100%;word-rap: break-word;"
                  class="fd-list__title fd-has-type-2"
                  >${listValue1} <br />
                  ${listValue2}</span
                >
                <span
                  @click=${e => this.handleDelete(e, k)}
                  class="fd-list__icon sap-icon--decline"
                ></span>
              </li>
            `
          })}
        </ul>
      </div>
    `
  }
  afterRender() {
    //if (!this.dateInputElement) {
    this.dateInputElement = document.getElementById(this.dateInputId)
    //}
  }
  disconnectedCallback() {
    if (this.state.ovl.uiState.isMobile) {
      this.removeEventListener("input", this.handleChange)
    } else {
      this.removeEventListener("change", this.handleChange)
    }
    super.disconnectedCallback()
  }
}
