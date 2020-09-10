import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { FileType } from "../../components/FileList/FileList"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T, D } from "../../../../ovl/src/global/globals"

export type OrderOverviewState = {
  activeFilePopup: string
}

export class CompOrderOverview extends OvlBaseElement {
  init() {
    this.screen = "Order"
  }
  handleFile(e: Event, fileName: string, fileType: FileType, docNum: string) {
    e.preventDefault()
    this.actions.ovl.internal.GetFile({
      id1: fileName,
      cat: fileType,
      id2: docNum,
    })
  }
  handleDetail(e: Event, key: string) {
    //@ts-ignore
    if (
      (!this.state.app.screens.order.activeFilePopup &&
        //@ts-ignore
        e.target.localName === "td") ||
      //@ts-ignore
      e.target.localName === "button"
    ) {
      this.actions.app.order.SelectOrder(key)
      this.actions.ovl.navigation.NavigateTo("Orderdetail")
      e.stopPropagation()
    }
  }
  async getUI() {
    const handlePDFPopup = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      //@ts-ignore
      if (!e.target.disabled) {
        //@ts-ignore
        let id = e.target.getAttribute("aria-controls").replace("pQqQR215", "")
        if (this.state.app.screens.order.activeFilePopup === id) {
          id = ""
        }
        this.actions.app.global.TogglePDFPopup({
          key: id,
          obj: this.state.app.screens.order,
        })
      }
    }

    const handleRemoveAllPDFPopup = (e) => {
      this.actions.app.global.TogglePDFPopup({
        key: "",
        obj: this.state.app.screens.order,
      })
    }
    return this.track(() => {
      let detailCount = Object.keys(this.state.app.orderDetail.orders).length
      if (detailCount === 0) {
        return null
      }
      return html`
        <div @click=${handleRemoveAllPDFPopup} class="">
          <div class="fd-container fd-container--fluid">
            <div class="fd-col--12">
              <div class="fd-layout-panel">
                <div class="fd-layout-panel__header">
                  <div class="fd-layout-panel__head">
                    <h3
                      class="sap-icon--sales-order sap-icon--xl fd-layout-panel__title fd-has-type-3"
                    >
                      ${T("PortalOrders")}
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
                      ${T("PortalOrderListTitle", [detailCount.toString()])}
                    </h3>
                  </div>
                </div>
                <div class="fd-layout-panel__body fd-has-padding-tiny">
                  <table class="fd-table fd-table--striped">
                    <thead class="fd-table__header">
                      <tr class="fd-table__row">
                        <th class="fd-table__cell" width="2%" scope="col">
                          ${T("PortalPDF")}
                        </th>
                        <th class="fd-table__cell" width="4%" scope="col">
                          ${T("PortalNumber")}
                        </th>
                        <th class="fd-table__cell" width="38%" scope="col">
                          ${T("PortalCommission")}
                        </th>
                        <th class="fd-table__cell" width="26%" scope="col">
                          ${T("AppDate")}
                        </th>
                        <th class="fd-table__cell" width="28%" scope="col">
                          ${T("PortalDeliveryDate")}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="fd-table__body">
                      ${Object.keys(this.state.app.orderDetail.orders)
                        .sort((a, b) => parseInt(b) - parseInt(a))
                        .map((k) => {
                          let order = this.state.app.orderDetail.orders[k]
                          //console.log(order)
                          let files = order.steps["step2"].attachments.files
                          return html`
                            <tr
                              class="fd-table__row fd-has-padding-base fd-has-margin-base"
                              @click=${(e) => this.handleDetail(e, k)}
                            >
                              <td class="fd-table__cell">
                                <div class="fd-popover">
                                  <div class="fd-popover__control">
                                    <button
                                      ?disabled=${files.length === 0}
                                      @click=${handlePDFPopup}
                                      class="fd-button fd-button--compact sap-icon--pdf-attachment"
                                      aria-controls="pQqQR215${k}"
                                      aria-haspopup="true"
                                      aria-expanded="${k ===
                                      this.state.app.screens.order
                                        .activeFilePopup}"
                                      aria-label="More"
                                    ></button>
                                  </div>
                                  <div
                                    class="fd-popover__body"
                                    aria-hidden="${k !==
                                      this.state.app.screens.order
                                        .activeFilePopup ||
                                    this.state.app.orderDetail.orders[k].steps[
                                      "step2"
                                    ].attachments.files.filter(
                                      (m) => m.type === "Order"
                                    ).length === 0}"
                                    id="pQqQR215${k}"
                                  >
                                    <nav class="fd-menu">
                                      <ul class="fd-menu__list">
                                        ${this.state.app.orderDetail.orders[
                                          k
                                        ].attachments.files
                                          .filter((m) => m.type === "Order")
                                          .map((f) => {
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
                                <button
                                  title="${T("PortalDetails")}"
                                  @click=${(e) => this.handleDetail(e, k)}
                                  class="fd-button fd-button--compact fd-has-font-weight-semi"
                                >
                                  ${k}
                                </button>
                              </td>
                              <td class="fd-table__cell">${order.refNum}</td>
                              <td class="fd-table__cell">
                                ${D(order.docDate)}
                              </td>
                              <td class="fd-table__cell">
                                ${D(order.deliveryDate)}
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
