import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T, D } from "../../../../ovl/src/global/globals"

export class CompOrderDetail extends OvlBaseElement {
  async getUI() {
    return this.track(() => {
      let key = this.state.demoApp.screens.orderdetail.selectedOrder
      let order = this.state.demoApp.orderDetail.orders[key]

      return html`
        <div class="fd-layout-panel">
          <div class="fd-layout-panel__header">
            <div class="fd-layout-panel__head">
              <h3 class="fd-layout-panel__title">
                ${T("PortalDetails")}
              </h3>
            </div>
          </div>
          <div class="fd-layout-panel__body">
            <div class="cols2">
              <div class="portal-orderdetail-cardcode-label">
                ${T("PortalCardCode")}
              </div>
              <div class="portal-orderdetail-cardcode-value">
                ${order.cardCode}
              </div>
              <div class="portal-orderdetail-cardname-label">
                ${T("PortalCardName")}
              </div>
              <div class="portal-orderdetail-cardname-value">
                ${order.cardName}
              </div>

              <div class="portal-orderdetail-docnum-label">
                ${T("PortalOrderDocNum")}
              </div>
              <div class="portal-orderdetail-docnum-value">
                ${key}
              </div>

              <div class="portal-orderdetail-docdate-label">
                ${T("PortalOrderDocDate")}
              </div>
              <div class="portal-orderdetail-docdate-value">
                ${D(order.docDate)}
              </div>

              <div class="portal-orderdetail-deliverydate-label">
                ${T("PortalDeliveryDate")}
              </div>
              <div class="portal-orderdetail-deliverydate-value">
                ${D(order.deliveryDate)}
              </div>

              <div class="portal-orderdetail-commission-label">
                ${T("PortalCommission")}
              </div>
              <div class="portal-orderdetail-commission-value">
                ${order.refNum}
              </div>
            </div>
          </div>
        </div>
      `
    })
  }
}
