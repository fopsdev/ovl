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
              ${T("AppDetails")}
            </h3>
          </div>
        </div>
        <div class="fd-panel__body">
          <div class="cols2">
            <div>
              ${T("AppCardCode")}
            </div>
            <div>
              ${order.cardCode}
            </div>
            <div>
              ${T("AppCardName")}
            </div>
            <div>
              ${order.cardName}
            </div>

            <div>
              ${T("AppOrderDocNum")}
            </div>
            <div>
              ${key}
            </div>

            <div>
              ${T("AppOrderDocDate")}
            </div>
            <div>
              ${D(order.docDate)}
            </div>

            <div>
              ${T("AppDeliveryDate")}
            </div>
            <div>
              ${D(order.deliveryDate)}
            </div>

            <div>
              ${T("AppCommission")}
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
