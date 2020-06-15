import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T, D } from "../../../../ovl/src/global/globals"
import { FileType } from "../../components/FileList/FileList"

export type DPInvoiceOverviewState = {
  activeFilePopup: string
}

export class CompDPInvoiceOverview extends OvlBaseElement {
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
        let id = e.target.getAttribute("aria-controls").replace("pQqQR219", "")
        if (this.state.ovl.screens.screens.Invoice.activeFilePopup === id) {
          id = ""
        }
        this.actions.portal.global.TogglePDFPopup({
          key: id,
          obj: this.state.ovl.screens.screens.Invoice,
        })
      }
    }

    const handleRemoveAllPDFPopup = (e) => {
      this.actions.portal.global.TogglePDFPopup({
        key: "",
        obj: this.state.ovl.screens.screens.Invoice,
      })
    }

    return this.track(() => {
      let detailCount = Object.keys(
        this.state.portal.dpInvoiceDetail.dpInvoices
      ).length
      if (detailCount === 0) {
        return null
      }

      return html`
      <div @click=${handleRemoveAllPDFPopup}">
        <div class="fd-container fd-container--fluid">
          <div class="fd-col--12">
            <div class="fd-panel">
              <div class="fd-panel__header">
                <div class="fd-panel__head">
                  <h3
                    class="sap-icon--receipt sap-icon--xl fd-panel__title fd-has-type-3"
                  >
                    ${T("PortalDPInvoices")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fd-container fd-container--fluid">
          <div class="fd-col--12">
            <div class="fd-panel">
              <div class="fd-panel__header fd-has-padding-tiny">
                <div class="fd-panel__head">
                  <h3 class="fd-panel__title">
                    ${T("PortalDPInvoiceListTitle", [detailCount.toString()])}
                    <!-- &nbsp;(<span class="fd-has-background-color-background-5">${T(
                      "PortalInvoiceOverdue"
                    )}</span>) -->
                  </h3>
                </div>
              </div>
              <div class="fd-panel__body fd-has-padding-tiny">
                <table class="fd-table fd-table--striped">
                  <thead class="fd-table__header">
                    <tr class="fd-table__row">
                    <th class="fd-table__cell" width="2%" scope="col">${T(
                      "PortalPDF"
                    )}</th>
                      <th class="fd-table__cell" width="20%" scope="col">${T(
                        "PortalNumber"
                      )}</th>
                      <th class="fd-table__cell" width="53%" scope="col">${T(
                        "PortalCommission"
                      )}</th>
                      <th class="fd-table__cell" width="25%" scope="col">${T(
                        "AppDate"
                      )}</th>
                      <!-- <th class="fd-table__cell" width="10%" scope="col" style="text-align: right;">
                        ${T("PortalInvoicePaidRate")}
                      </th> -->
                      
                      
                    </tr>
                  </thead>
                  <tbody class="fd-table__body">
                    ${Object.keys(this.state.portal.dpInvoiceDetail.dpInvoices)
                      .sort((a, b) => parseInt(b) - parseInt(a))
                      .map((k) => {
                        let o = this.state.portal.dpInvoiceDetail.dpInvoices[k]
                        let files = o.attachments.files
                        let bgColor = "fd-has-background-color-background-5"
                        let dueDate = new Date(o.docDueDate)
                        //add 7 days because it needs some time to get the payments into sap
                        dueDate.setDate(dueDate.getDate() + 1 + 7)
                        if (o.paidRate > 99 || dueDate.getTime() > Date.now()) {
                          bgColor = "fd-has-background-color-background-6"
                        }
                        return html`
                          <tr class="fd-table__row ${bgColor}">
                            <td class="fd-table__cell">
                              <div class="fd-popover">
                                <div class="fd-popover__control">
                                  <button
                                    ?disabled=${files.length === 0}
                                    @click=${handlePDFPopup}
                                    class="fd-button fd-button--compact sap-icon--pdf-attachment"
                                    aria-controls="pQqQR219${k}"
                                    aria-haspopup="true"
                                    aria-expanded="${k ===
                                    this.state.ovl.screens.screens.Invoice
                                      .activeFilePopup}"
                                    aria-label="More"
                                  ></button>
                                </div>
                                <div
                                  style="width:280px;"
                                  class="fd-popover__body"
                                  aria-hidden="${k !==
                                    this.state.ovl.screens.screens.Invoice
                                      .activeFilePopup ||
                                  this.state.portal.dpInvoiceDetail.dpInvoices[
                                    k
                                  ].attachments.files.length === 0}"
                                  id="pQqQR219${k}"
                                >
                                  <nav class="fd-menu">
                                    <ul class="fd-menu__list">
                                      ${this.state.portal.dpInvoiceDetail.dpInvoices[
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
                            <!-- <td style="text-align: right;">
                              ${Math.round(o.paidRate)}
                            </td> -->
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
