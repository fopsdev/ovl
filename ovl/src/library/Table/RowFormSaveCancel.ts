import { OvlBaseElement } from "../OvlBaseElement"
import { EditRowSaveCancelDef } from "./Table"
import { html } from "lit-html"
import { T, ovltemp } from "../../global/globals"
import { DialogResult } from "../actions"
import { FormState } from "../forms/actions"

import { dialogAfterClose } from "../Dialog/actions"

export class TableRowSaveCancel extends OvlBaseElement {
  props: any
  rowData: EditRowSaveCancelDef
  formState: FormState
  init() {
    this.rowData = this.props()
    this.formState = this.state.ovl.forms["TableRowEdit"][
      "trow" + this.rowData.tableDef.id + this.rowData.key
    ]
  }
  async getUI() {
    let handleSave = () => {
      if (this.formState.valid && !this.state.ovl.libState.indicator.open) {
        this.actions.ovl.internal.TableEditSaveRow({
          key: this.rowData.key,
          def: this.rowData.tableDef,
          data: this.rowData.data,
          formState: this.formState,
        })
      }
    }

    let handleCancel = async () => {
      if (!this.state.ovl.libState.indicator.open) {
        let cancel: boolean = true
        if (this.formState.dirty) {
          this.actions.ovl.dialog.OkCancelDialog({
            text: T("AppCancelForm"),
            default: 1,
          })
          if ((await DialogResult()) === 2) {
            cancel = false
          }
          // } else {
          //   dialogAfterClose.elementToFocus = undefined
          // }
        }
        let isAdd = this.rowData.key.indexOf(ovltemp) > -1
        if (cancel || isAdd) {
          if (isAdd) {
            this.actions.ovl.internal.TableDeleteRowFromData({
              key: this.rowData.key,
              def: this.rowData.tableDef,
              data: this.rowData.data,
            })
          }
          this.actions.ovl.form.ResetForm(this.formState)
          this.actions.ovl.table.TableEditClose({
            key: this.rowData.key,
            tableDef: this.rowData.tableDef,
            data: this.rowData.data,
          })
        }
      }
    }
    return this.track(() => {
      let acceptEnabled = "fd-button--positive sap-icon--accept"

      if (!this.formState.valid || this.state.ovl.libState.indicator.open) {
        acceptEnabled = "fd-button nopointerevents"
      }
      return html`
        <td
          colspan="${this.rowData.columnsCount}"
          class="fd-table__cell fd-has-text-align-center"
          style="margin:0;padding:0;"
        >
          <div
            class="fd-button-group animated fadeIn faster"
            role="group"
            aria-label="RowSaveCancel"
            style="margin-top:-2px;"
          >
            <button
              @click=${handleSave}
              title="Datensatz speichern"
              style="border-top-left-radius: 0px; border-left: 2px solid #0cd7ed;border-bottom: 2px solid #0cd7ed;border-top: 2px solid #ffffff; border-right:none;"
              class="${acceptEnabled}"
            ></button>

            <button
              @mousedown=${handleCancel}
              @click=${handleCancel}
              title="Abbrechen"
              style="border-top-right-radius: 0px; border-right: 2px solid #0cd7ed; border-bottom: 2px solid #0cd7ed;border-top: 2px solid #ffffff; border-left:none;"
              class="fd-button--negative sap-icon--decline"
            ></button>
          </div>
        </td>
      `
    })
  }
}
