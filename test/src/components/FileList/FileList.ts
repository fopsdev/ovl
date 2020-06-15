import { OvlBaseElement } from "../../../../ovl/src/library/OvlBaseElement"
import { html } from "../../../../ovl/node_modules/lit-html"
import { T } from "../../../../ovl/src/global/globals"

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

export type File = {
  type: FileType
  fileName: string
}

export type FileList = {
  files: File[]
}

type PopupState = {
  activeFilePopup: string
}
export type TogglePDFPopupState = {
  key: string
  obj: PopupState
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
    this.actions.ovl.internal.GetFile({
      id1: fileName,
      cat: fileType,
      id2: docNum,
    })
  }

  async getUI() {
    this.fileList = this.props(this.state)
    return this.track(() => {
      return html`
        <table class="fd-table ">
          <thead class="fd-table__header">
            <tr class="fd-table__row">
              <th class="fd-table__cell " scope="col">
                ${T("PortalFileName")}
              </th>
            </tr>
          </thead>
          <tbody class="fd-table__body">
            ${this.fileList.map((f) => {
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
                    @click=${(e) => {
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
    })
  }
}
