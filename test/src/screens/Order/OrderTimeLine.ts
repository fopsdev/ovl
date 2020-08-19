import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T, D } from "../../../../ovl/src/global/globals"

export class CompOrderTimeLine extends OvlBaseElement {
  async getUI() {
    return this.track(() => {
      let key = this.state.ovl.screens.screens.Orderdetail.selectedOrder
      let order = this.state.demoApp.orderDetail.orders[key]

      return html`
        <div class="fd-container fd-container--fluid">
          <div class="fd-col--3">
            <div class="fd-layout-panel">
              <div
                class="fd-layout-panel__header fd-has-padding-tiny timelinenextarrow"
              >
                <div class="fd-layout-panel__head">
                  <h3 class="fd-layout-panel__title">
                    ${T("PortalOrderConfirm")}
                  </h3>
                  <p class="fd-layout-panel__description">
                    ${order.steps.step1.date !== null
                      ? T("PortalSendDate")
                      : ""}
                    <b>${D(order.steps.step1.date)}</b>
                  </p>
                </div>
              </div>
              <div class="fd-layout-panel__body fd-has-padding-tiny">
                <comp-filelist
                  .props=${(s) =>
                    s.portal.orderDetail.orders[key].steps.step1.attachments
                      .files}
                ></comp-filelist>
                <div class="timelinenextarrowdown" style="height:80px;"></div>
              </div>
            </div>
          </div>
          <div class="fd-col--3">
            <div class="fd-layout-panel">
              <div
                class="fd-layout-panel__header fd-has-padding-tiny timelinenextarrow"
              >
                <div class="fd-layout-panel__head">
                  <h3 class="fd-layout-panel__title">
                    ${T("PortalOrderPrepare")}
                  </h3>
                  <p class="fd-layout-panel__description">
                    ${order.steps.step2.date !== null
                      ? T("PortalSendDate")
                      : ""}
                    <b>${D(order.steps.step2.date)}</b>
                  </p>
                </div>
              </div>
              <div class="fd-layout-panel__body fd-has-padding-tiny">
                <comp-filelist
                  .props=${(s) =>
                    s.portal.orderDetail.orders[key].steps.step2.attachments
                      .files}
                ></comp-filelist>
                <div class="timelinenextarrowdown" style="height:80px;"></div>
              </div>
            </div>
          </div>
          <div class="fd-col--3">
            <div class="fd-layout-panel">
              <div
                class="fd-layout-panel__header fd-has-padding-tiny timelinenextarrow"
              >
                <div class="fd-layout-panel__head">
                  <h3 class="fd-layout-panel__title">
                    ${T("PortalOrderProduction")}
                  </h3>
                  <p class="fd-layout-panel__description">
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="fd-layout-panel__body fd-has-padding-tiny">
                <comp-filelist
                  .props=${(s) =>
                    s.portal.orderDetail.orders[key].steps.step3.attachments
                      .files}
                ></comp-filelist>
                <div class="timelinenextarrowdown" style="height:80px;"></div>
              </div>
            </div>
          </div>
          <div class="fd-col--3">
            <div class="fd-layout-panel">
              <div class="fd-layout-panel__header fd-has-padding-tiny">
                <div class="fd-layout-panel__head">
                  <h3 class="fd-layout-panel__title">
                    ${T("PortalOrderDelivery")}
                  </h3>
                  <p class="fd-layout-panel__description">
                    ${order.steps.step4.date !== null
                      ? T("PortalSendDate")
                      : ""}
                    <b>${D(order.steps.step4.date)}</b>
                  </p>
                </div>
              </div>
              <div class="fd-layout-panel__body fd-has-padding-tiny">
                <comp-filelist
                  .props=${(s) =>
                    s.portal.orderDetail.orders[key].steps.step4.attachments
                      .files}
                ></comp-filelist>
              </div>
            </div>
          </div>
        </div>
      `
    })
  }
}
