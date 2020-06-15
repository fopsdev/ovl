import { html } from "../../../../ovl/node_modules/lit-html"
import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { T } from "../../../../ovl/src/global/globals"

export type OrderDetailFormState = {
  selectedOrder: string
}

export class CompOrderDetailLayout extends OvlBaseElement {
  init() {
    this.screen = "Orderdetail"
  }

  async getUI() {
    return this.track(() => {
      let key = this.state.ovl.screens.screens.Orderdetail.selectedOrder

      return html`
      <div class="${this.animatedClass}">
      <section
          class="fd-section fd-has-type-2" style="text-align: center;"
          <h3
            class="sap-icon--sales-order sap-icon--xl fd-panel__title"
          >
            ${T("PortalOrderDetail", [key])}
          </h3>
        
      </section>
        <div class="fd-container fd-container--fluid">
          <div class="fd-col--6">
            <comp-orderdetail></comp-orderdetail>
          
          </div>

        
          <div class="fd-col--6">
            <comp-orderfeedback></comp-orderfeedback>
          </div>
        </div>
        
        <section
          class="fd-section fd-has-type-1"
          style="text-align: center;"
        >
          ${T("PortalOrderTimelineTitle")}
        </section>
        <comp-ordertimeline></comp-ordertimeline>
        <section
          class="fd-section  fd-has-type-1"
          style="text-align: center;"
        >
          ${T("PortalOrderFilesTitle")}
        </section>

        <div class="fd-container fd-container--fluid">
          <div class="fd-col--12">
            <div class="fd-panel">
              <div class="fd-panel__body">
                <comp-filelist .props=${(s) =>
                  s.portal.orderDetail.orders[key].attachments.files.filter(
                    (f) => f.type === "OrderAttachment"
                  )}></comp-filelist>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    })
  }
}
