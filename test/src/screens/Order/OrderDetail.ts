import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T, D } from "../../../../ovl/src/global/globals"

export class CompOrderDetail extends OvlBaseElement {
  getUI() {
    let key = this.state.ovl.screens.screens.Orderdetail.selectedOrder
    let order = this.state.portal.orderDetail.orders[key]

    return html`
      <div class="fd-panel">
        <div class="fd-panel__header">
          <div class="fd-panel__head">
            <h3 class="fd-panel__title">
              ${T("PortalDetails")}
            </h3>
          </div>
        </div>
        <div class="fd-panel__body">
          <div class="cols2">
            <div>
              ${T("PortalCardCode")}
            </div>
            <div>
              ${order.cardCode}
            </div>
            <div>
              ${T("PortalCardName")}
            </div>
            <div>
              ${order.cardName}
            </div>

            <div>
              ${T("PortalOrderDocNum")}
            </div>
            <div>
              ${key}
            </div>

            <div>
              ${T("PortalOrderDocDate")}
            </div>
            <div>
              ${D(order.docDate)}
            </div>

            <div>
              ${T("PortalDeliveryDate")}
            </div>
            <div>
              ${D(order.deliveryDate)}
            </div>

            <div>
              ${T("PortalCommission")}
            </div>
            <div>
              ${order.refNum}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
