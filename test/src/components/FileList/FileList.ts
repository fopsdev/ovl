import { OvlBaseElement } from "../../library/OvlBaseElement"
import { html } from "lit-html"
import { T } from "../../global/globals"

export type FileType =
  | "MainAttachment"
  | "PartnerAttachment"
  | "Order"
  | "OrderAttachment"
  | "StepConfirmation"
  | "StepAVOR"
  | "StepProduction"
  | "StepDelivery"
  | "Quotation"
  | "Invoice"
  | "DPInvoice"
  | "Test"

type File = {
  type: FileType
  fileName: string
}

export type FileList = {
  files: File[]
}

export class CompFileList extends OvlBaseElement {
  props: any
  fileList: File[]
  // init() {
  // }
  handleFile(e: Event, fileName: string, fileType: FileType) {
    e.preventDefault()
    e.stopPropagation()
    let docNum = this.state.ovl.screens.screens.Orderdetail.selectedOrder
    this.actions.global.GetFile({ fileName, fileType, docNum })
  }

  getUI() {
    this.fileList = this.props(this.state)

    return html`
      <table class="fd-table ">
        <thead class="fd-table__header">
          <tr class="fd-table__row">
            <th class="fd-table__cell " scope="col">
              ${T("AppFileName")}
            </th>
          </tr>
        </thead>
        <tbody class="fd-table__body">
          ${this.fileList.map(f => {
            if (f.type === "MainAttachment") {
              let endNames = f.fileName.split(".")
              let toCheck = endNames[endNames.length - 2]
              let toCheckEnd = toCheck.substring(toCheck.length - 3)
              if (
                !(
                  this.state.ovl.language.language.toLowerCase() ===
                    toCheckEnd.substring(1).toLowerCase() ||
                  toCheckEnd.indexOf("_") < 0
                )
              ) {
                return html``
              }
            }
            return html`
              <tr class="fd-table__row">              
                <td class="fd-table__cell ">
                  <a
                    href=""
                    @click=${e => {
                      this.handleFile(e, f.fileName, f.type)
                    }}
                    class="fd-link fd-has-font-weight-semi"
                    >${f.fileName}</a
                  >
                </td>
              </tr></tr>
            `
          })}
        </tbody>
      </table>
    `
  }
}
