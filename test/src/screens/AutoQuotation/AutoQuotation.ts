import { html } from "../../../../../ovl/ovl/node_modules/lit-html"
import { postFormDataRequest } from "../../../../../ovl/ovl/src/effects"
import { apiUrl } from "../../../../../ovl/ovl/src/state"

import { OvlFormElement } from "../../../../../ovl/ovl/src/library/Forms/OvlFormElement"

import { OvlState, OvlTableDefIds } from "../../../../../ovl/ovl/src"

import { AutoQuotation } from "./state"
import { TableGetSelectedRowKeys } from "../../../../../ovl/ovl/src/library/Table/helpers"

export class CompAutoQuotation extends OvlFormElement {
  init() {
    this.screen = "AutoQuotation"
    this.formType = "AutoQuotation"
    super.init()
  }
  async getUI() {
    let handleCreate = async () => {
      let data = this.state.app.tables.autoQuotation
      let def = data.tableDef.autoQuotation
      this.actions.ovl.internal.TableMultipleCustomFunction({
        def,
        data,
        customFnId: "Optimize",
      })
    }

    return this.track(() => {
      // this is just a helper fn to get typed ids

      let fields = this.formState.fields
      let cutOffField = fields["CutOff"]
      let sawCutField = fields["SawCut"]
      let maxVsField = fields["Max_Vs"]
      let sources = fields["Sources"]

      const browseFile = () => {
        document.getElementById("quotationinput1").click()
      }
      const selectFile = async (e: Event) => {
        //@ts-ignore
        let file = e.target.files[0]
        if (!file) {
          return
        }
        this.state.app.screens.autoQuotation.okMessage = ""
        this.state.app.screens.autoQuotation.errorMessage = ""

        this.actions.ovl.table.TableInit({
          defId: "autoQuotation",
          data: this.state.app.tables.autoQuotation,
          resetStrategy: "ClearData",
        })

        let fileName = file.name
        let quotInput = document.getElementById("quotation_browse_input1")
        //let quotButton = document.getElementById("quotation_browse_button1")
        //@ts-ignore
        quotInput.value = fileName
        let att = new FormData()
        att.append("FileType", "bvx")
        att.append("FileName", fileName)
        att.append("File", file)
        let res = await postFormDataRequest(apiUrl + "assets/upload", att)

        if (res.data) {
          // fill in defaults
          this.state.app.screens.autoQuotation.bvxFileName = fileName
          res.data.forEach((e: AutoQuotation) => {
            e.cutoff = this.formState.fields["CutOff"].convertedValue
            e.max_vs = this.formState.fields["Max_Vs"].convertedValue
            e.sources = this.formState.fields["Sources"].convertedValue
            e.sawcut = this.formState.fields["SawCut"].convertedValue
          })

          let defId: OvlTableDefIds = "autoQuotation"
          let data = this.state.app.tables.autoQuotation
          await this.actions.ovl.table.TableRefresh({
            defId,
            data,
            localData: res.data,
          })
          let def = this.state.app.tables.autoQuotation.tableDef.autoQuotation

          this.actions.ovl.internal.TableSelectAll({
            tableDef: def,
            select: true,
          })
        } else {
          this.state.app.screens.autoQuotation.errorMessage =
            new Date().toLocaleTimeString() + ": " + res.message
        }
      }

      let errMsg = this.state.app.screens.autoQuotation.errorMessage
      let okMsg = this.state.app.screens.autoQuotation.okMessage

      let okIndicator
      let errIndicator

      if (okMsg) {
        okIndicator = html`<span
          class="animated fadeIn fd-info-label fd-info-label--accent-color-8"
          style="height:100%;max-height:100px;"
        >
          <span class="fd-info-label__text fd-has-type-1">${okMsg}</span>
        </span>`
      }

      if (errMsg) {
        errIndicator = html`<span
          class="animated fadeIn fd-info-label fd-info-label--accent-color-3"
          style="height:100%;max-height:100px;"
        >
          <span class="fd-info-label__text fd-has-type-1">${errMsg}</span>
        </span>`
      }
      let createButtonDisabled =
        TableGetSelectedRowKeys(
          this.state.app.tables.autoQuotation.tableDef.autoQuotation
        ).length < 1 ||
        this.state.ovl.libState.indicator.open ||
        this.screenClosing()
      return html`
        <div class="fd-layout-panel  ">
          <div class="fd-layout-panel__header">
            <div class="fd-layout-panel__head">
              <h3 class="fd-layout-panel__title">
                <b>Optimierung Angebot</b> (Ausgeführt durch:
                ${this.state.app.user.firstName +
                " " +
                this.state.app.user.lastName})
              </h3>
              <div style="margin-top:6px;">${errIndicator} ${okIndicator}</div>
            </div>
          </div>

          <div class="fd-layout-panel__body">
            <b>Optimierungsparameter</b> (werden automatisch in die selektierten
            Details übertragen)
            <div class="fd-form__group">
              <div class="fd-form-item ">
                <ovl-textbox
                  .props=${() => {
                    return { field: cutOffField }
                  }}
                >
                </ovl-textbox>
              </div>
              <div class="fd-form-item">
                <ovl-textbox
                  .props=${() => {
                    return { field: sawCutField }
                  }}
                >
                </ovl-textbox>
              </div>
              <div class="fd-form-item">
                <ovl-textbox
                  .props=${() => {
                    return { field: maxVsField }
                  }}
                >
                </ovl-textbox>
              </div>
              <div class="fd-form-item">
                <ovl-textbox
                  .props=${() => {
                    return { field: sources }
                  }}
                >
                </ovl-textbox>
              </div>

              <div class="fd-form-item">
                <div class="fd-file-uploader">
                  <input
                    aria-label="File upload"
                    class="fd-input
            fd-file-uploader__input"
                    style="width:98%;font-weight: bold;"
                    @click=${browseFile}
                    title="bvx file auswählen"
                    type="text"
                    id="quotation_browse_input1"
                    autocomplete="off"
                    placeholder="bvx file auswählen..."
                    readonly=""
                    value="${this.state.app.screens.autoQuotation.bvxFileName}"
                  />
                  <button
                    class="fd-button"
                    @click=${browseFile}
                    id="quotation_browse_button1"
                    aria-label="bvx file auswählen"
                  >
                    ...
                  </button>
                </div>
                <div
                  class="fd-file-uploader__hidden"
                  aria-live="polite"
                  aria-atomic="true"
                ></div>
                <input
                  id="quotationinput1"
                  class="fd-file-uploader__hidden"
                  type="file"
                  accept=".bvx"
                  @change=${selectFile}
                />
              </div>
            </div>

            <ovl-table
              class="fd-table"
              .props=${(state: OvlState) => {
                return {
                  def: state.app.tables.autoQuotation.tableDef.autoQuotation,
                  data: state.app.tables.autoQuotation,
                }
              }}
            >
            </ovl-table>
            <div class="fd-layout-panel__footer">
              <div>${okIndicator} ${errIndicator}</div>

              <div class="fd-layout-panel__actions">
                <button
                  ?disabled=${createButtonDisabled}
                  @click=${handleCreate}
                  class="fd-button"
                >
                  ${"Starte Optimierung Angebot"}
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    })
  }
}
