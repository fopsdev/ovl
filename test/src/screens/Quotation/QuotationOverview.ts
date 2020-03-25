import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { FileType } from "../../components/FileList/FileList"
import { html } from "lit-html"
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

    this.actions.ovl.internal.GetFile({ fileName, fileType, docNum })
  }

  getUI() {
    const handlePDFPopup = e => {
      if (!e.target.disabled) {
        e.stopPropagation()
        let id = e.target.getAttribute("aria-controls").replace("pQqQR214", "")
        if (this.state.ovl.screens.screens.Quotation.activeFilePopup === id) {
          id = ""
        }
        this.actions.portal.global.TogglePDFPopup({
          key: id,
          obj: this.state.ovl.screens.screens.Quotation
        })
      }
    }

    const handleRemoveAllPDFPopup = e => {
      this.actions.portal.global.TogglePDFPopup({
        key: "",
        obj: this.state.ovl.screens.screens.Quotation
      })
    }

    let detailCount = Object.keys(this.state.portal.quotationDetail.quotations)
      .length
    if (detailCount === 0) {
      return null
    }

    let statusColors = {
      Open: "fd-has-background-color-background-6",
      Closed: "fd-has-background-color-background-3",
      Canceled: "fd-has-background-color-background-5"
    }

    return html`
      <div @click=${handleRemoveAllPDFPopup} class="${this.animatedClass}">
        <div class="fd-container fd-container--fluid">
          <div class="fd-col--12">
            <div class="fd-panel">
              <div class="fd-panel__header">
                <div class="fd-panel__head">
                  <h3
                    class="sap-icon--tags sap-icon--xl fd-panel__title fd-has-type-3"
                  >
                    ${T("AppQuotations")}
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
                    ${T("AppQuotationListTitle", [detailCount.toString()])}
                    &nbsp;(
                    ${Object.keys(statusColors).map(
                      (k, i) =>
                        html`
                          <span class="${statusColors[k]}">
                            ${T("AppQuotationStatus" + k)}${Object.keys(
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
              <div class="fd-panel__body fd-has-padding-tiny">
                <table class="fd-table">
                  <thead class="fd-table__header">
                    <tr class="fd-table__row">
                      <th class="fd-table__cell" width="2%" scope="col">
                        ${T("AppPDF")}
                      </th>
                      <th class="fd-table__cell" width="20%" scope="col">
                        ${T("AppNumber")}
                      </th>
                      <th class="fd-table__cell" width="53%" scope="col">
                        ${T("AppCommission")}
                      </th>
                      <th class="fd-table__cell" width="25%" scope="col">
                        ${T("AppDate")}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="fd-table__body">
                    ${Object.keys(this.state.portal.quotationDetail.quotations)
                      .sort((a, b) => parseInt(b) - parseInt(a))
                      .map(k => {
                        let o = this.state.portal.quotationDetail.quotations[k]
                        let files = this.state.portal.quotationDetail
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
                                      this.state.ovl.screens.screens.Quotation
                                        .activeFilePopup}"
                                    aria-label="More"
                                  ></button>
                                </div>
                                <div
                                  style="width:280px;"
                                  class="fd-popover__body"
                                  aria-hidden="${k !==
                                    this.state.ovl.screens.screens.Quotation
                                      .activeFilePopup ||
                                    this.state.portal.quotationDetail
                                      .quotations[k].attachments.files
                                      .length === 0}"
                                  id="pQqQR214${k}"
                                >
                                  <nav class="fd-menu">
                                    <ul class="fd-menu__list">
                                      ${this.state.portal.quotationDetail.quotations[
                                        k
                                      ].attachments.files.map(f => {
                                        return html`
                                          <li>
                                            <a
                                              href=""
                                              @click=${e =>
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
  }
}
