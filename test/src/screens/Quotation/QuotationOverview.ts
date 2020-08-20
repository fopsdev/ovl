import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { FileType } from "../../components/FileList/FileList"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T, D } from "../../../../ovl/src/global/globals"

export type QuotationOverviewState = {
  activeFilePopup: string
}

export class CompQuotationOverview extends OvlBaseElement {
  init() {
    this.screen = "Quotation"
  }
  handleFile(e: Event, fileName: string, fileType: FileType, docNum: string) {
    e.preventDefault()

    this.actions.ovl.internal.GetFile({
      id1: fileName,
      cat: fileType,
      id2: docNum,
    })
  }

  async getUI() {
    const handlePDFPopup = (e) => {
      if (!e.target.disabled) {
        e.stopPropagation()
        let id = e.target.getAttribute("aria-controls").replace("pQqQR214", "")
        if (this.state.demoApp.screens.quotation.activeFilePopup === id) {
          id = ""
        }
        this.actions.demoApp.global.TogglePDFPopup({
          key: id,
          obj: this.state.demoApp.screens.quotation,
        })
      }
    }

    const handleRemoveAllPDFPopup = (e) => {
      this.actions.demoApp.global.TogglePDFPopup({
        key: "",
        obj: this.state.demoApp.screens.quotation,
      })
    }
    return this.track(() => {
      let detailCount = Object.keys(
        this.state.demoApp.quotationDetail.quotations
      ).length
      if (detailCount === 0) {
        return null
      }

      let statusColors = {
        Open: "fd-has-background-color-background-6",
        Closed: "fd-has-background-color-background-3",
        Canceled: "fd-has-background-color-background-5",
      }

      return html`
        <div @click=${handleRemoveAllPDFPopup} class="">
          <div class="fd-container fd-container--fluid">
            <div class="fd-col--12">
              <div class="fd-layout-panel">
                <div class="fd-layout-panel__header">
                  <div class="fd-layout-panel__head">
                    <h3
                      class="sap-icon--tags sap-icon--xl fd-layout-panel__title fd-has-type-3"
                    >
                      ${T("PortalQuotations")}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fd-container fd-container--fluid">
            <div class="fd-col--12">
              <div class="fd-layout-panel">
                <div class="fd-layout-panel__header fd-has-padding-tiny">
                  <div class="fd-layout-panel__head">
                    <h3 class="fd-layout-panel__title">
                      ${T("PortalQuotationListTitle", [detailCount.toString()])}
                      &nbsp;(
                      ${Object.keys(statusColors).map(
                        (k, i) =>
                          html`
                            <span class="${statusColors[k]}">
                              ${T("PortalQuotationStatus" + k)}${Object.keys(
                                statusColors
                              ).length -
                                1 ===
                              i
                                ? ""
                                : ","}</span
                            >
                          `
                      )}
                      )
                    </h3>
                  </div>
                </div>
                <div class="fd-layout-panel__body fd-has-padding-tiny">
                  <table class="fd-table">
                    <thead class="fd-table__header">
                      <tr class="fd-table__row">
                        <th class="fd-table__cell" width="2%" scope="col">
                          ${T("PortalPDF")}
                        </th>
                        <th class="fd-table__cell" width="20%" scope="col">
                          ${T("PortalNumber")}
                        </th>
                        <th class="fd-table__cell" width="53%" scope="col">
                          ${T("PortalCommission")}
                        </th>
                        <th class="fd-table__cell" width="25%" scope="col">
                          ${T("AppDate")}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="fd-table__body">
                      ${Object.keys(
                        this.state.demoApp.quotationDetail.quotations
                      )
                        .sort((a, b) => parseInt(b) - parseInt(a))
                        .map((k) => {
                          let o = this.state.demoApp.quotationDetail.quotations[
                            k
                          ]
                          let files = this.state.demoApp.quotationDetail
                            .quotations[k].attachments.files

                          return html`
                            <tr class="fd-table__row ${statusColors[o.status]}">
                              <td class="fd-table__cell">
                                <div class="fd-popover">
                                  <div class="fd-popover__control">
                                    <button
                                      ?disabled=${files.length === 0}
                                      @click=${handlePDFPopup}
                                      class="fd-button fd-button--compact sap-icon--pdf-attachment"
                                      aria-controls="pQqQR214${k}"
                                      aria-haspopup="true"
                                      aria-expanded="${k ===
                                      this.state.demoApp.screens.quotation
                                        .activeFilePopup}"
                                      aria-label="More"
                                    ></button>
                                  </div>
                                  <div
                                    style="width:280px;"
                                    class="fd-popover__body"
                                    aria-hidden="${k !==
                                      this.state.demoApp.screens.quotation
                                        .activeFilePopup ||
                                    this.state.demoApp.quotationDetail
                                      .quotations[k].attachments.files
                                      .length === 0}"
                                    id="pQqQR214${k}"
                                  >
                                    <nav class="fd-menu">
                                      <ul class="fd-menu__list">
                                        ${this.state.demoApp.quotationDetail.quotations[
                                          k
                                        ].attachments.files.map((f) => {
                                          return html`
                                            <li>
                                              <a
                                                href=""
                                                @click=${(e) =>
                                                  this.handleFile(
                                                    e,
                                                    f.fileName,
                                                    f.type,
                                                    k
                                                  )}
                                                class="fd-menu__item"
                                                >${f.fileName}</a
                                              >
                                            </li>
                                          `
                                        })}
                                      </ul>
                                    </nav>
                                  </div>
                                </div>
                              </td>

                              <td class="fd-table__cell">
                                ${k}
                              </td>
                              <td class="fd-table__cell">
                                ${o.refNum}
                              </td>
                              <td style="width:28%;">
                                ${D(o.docDate)}
                              </td>
                            </tr>
                          `
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })
  }
}
