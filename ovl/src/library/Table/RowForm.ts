import { html } from "lit-html"
import { isMobile, resolvePath, SetFocus } from "../../global/globals"
import {
  FieldIsReadOnly,
  FieldRowCellSelectedHandler,
  ViewHeaderCellClass,
  ViewRowCellClass,
  FieldRowCellSelectedHandler_Type,
  ViewRowCellClass_Type,
  ViewRowCellClass_ReturnType,
  ViewHeaderCellClass_Type,
  ViewHeaderCellClass_ReturnType,
  FieldIsReadOnly_ReturnType,
  FieldIsReadOnly_Type,
} from "../../global/hooks"
import { ovl } from "../../index"
import { OvlFormElement } from "../../library/forms/OvlFormElement"
import { CellClass } from "./Row"
import { DisplayMode, EditRowDef } from "./Table"

export class TableRowForm extends OvlFormElement {
  props: any
  rowData: EditRowDef
  focusInit: boolean
  textBoxesToRerender: string[]
  init() {
    this.focusInit = false
    this.rowData = this.props()
    // <form init>
    this.formType = "TableRowEdit"
    this.textBoxesToRerender = []
    super.init()
    // </form init>
  }
  handleClick = async (e) => {
    let searchDataCol = e.target
    let key

    while (searchDataCol) {
      if (searchDataCol.getAttribute("data-col")) {
        key = searchDataCol.getAttribute("data-col")
        break
      }
      searchDataCol = searchDataCol.parentNode
    }

    if (key) {
      let def = this.rowData.tableDef
      let functionName = FieldRowCellSelectedHandler.replace("%", key)
      let fn = resolvePath(this.actions.custom, def.namespace)
      if (fn && fn[functionName]) {
        if (
          !(await fn[functionName](<FieldRowCellSelectedHandler_Type>{
            classList: e.target.classList,
            def,
            data: this.rowData.data,
            rowKey: this.rowData.key,
            displayMode: <DisplayMode>"EditInline",
            formState: this.formState,
          }))
        ) {
          return
        }
      }
    }
  }
  afterRender() {
    // workaround because cellstyle gets not rerendered on textbox itself
    this.textBoxesToRerender.forEach((k) => {
      let renderEl = document.getElementById(k)
      if (renderEl) {
        //@ts-ignore
        renderEl.doRender()
      }
    })
    this.textBoxesToRerender = []

    super.afterRender()
  }
  updated() {
    // if (this.state.ovl.libState.overlay.closing) {
    //   overlayToRender.overlayClosedCallback = () => {
    //     this.setFocus()
    //   }
    // } else {
    this.setFocus()
    //}

    // if there is a custom afterrender
    super.updated()
  }
  setFocus() {
    if (
      (this.rowData.tableDef.features.focusToFirstEditableField ||
        this.formState.fieldToFocus) &&
      !this.focusInit
    ) {
      this.focusInit = true

      let el
      let target
      if (!this.formState.fieldToFocus) {
        el = document.getElementById(this.rowData.key + "ovlRFNFocus_focus")
        if (el) {
          let focusEl: HTMLCollection = el.getElementsByClassName(
            "ovl-focusable"
          )
          if (focusEl.length > 0) {
            target = focusEl[0]
          }
        }
      } else {
        target = document.getElementById(
          this.formState.fields[this.formState.fieldToFocus].id
        )
      }

      if (target) {
        SetFocus(target)
      }

      var rect = target.getBoundingClientRect()
      if (rect.bottom > window.innerHeight) {
        target.scrollIntoView(false)
      }
      if (rect.top < 0) {
        target.scrollIntoView()
      }
    }
  }

  async getUI() {
    return this.track(() => {
      let def = this.rowData.tableDef
      let fields = this.formState.fields

      let customRowCellClasses: ViewRowCellClass_ReturnType
      let functionName = ViewRowCellClass
      let fn = resolvePath(this.actions.custom, def.namespace)
      if (fn && fn[functionName]) {
        customRowCellClasses = fn[functionName](<ViewRowCellClass_Type>{
          columns: def.columns,
          row: this.rowData.row,
          isMobile: isMobile(),
          displayMode: <DisplayMode>"EditInline",
          namespace: def.namespace,
          tableDefId: def.id,
        })
      }

      if (!customRowCellClasses) {
        customRowCellClasses = {}
      }

      let customHeaderCellClasses: ViewHeaderCellClass_ReturnType
      let functionName2 = ViewHeaderCellClass
      let fn2 = resolvePath(this.actions.custom, def.namespace)
      if (fn2 && fn[functionName2]) {
        customHeaderCellClasses = fn2[functionName2](<ViewHeaderCellClass_Type>{
          columns: def.columns,
          isMobile: isMobile(),
          displayMode: <DisplayMode>"EditInline",
          namespace: def.namespace,
          tableDefId: def.id,
        })
      }
      if (!customHeaderCellClasses) {
        customHeaderCellClasses = {}
      }

      let columns = def.columns
      let firstEditable = false
      return html`
        ${Object.keys(columns).map((k) => {
          let customHeaderCellClass: CellClass = customHeaderCellClasses[k]
          let customRowCellClass: CellClass = customRowCellClasses[k]

          let col = columns[k]
          let columnsVisible = this.rowData.columnsVisible
          if (columnsVisible[k].indexOf("Edit") < 0) {
            return null
          }
          let uiItem
          let id = this.rowData.key + "ovlRFNFocus_" + k
          let controlAlign = ""
          if (this.rowData.columnsAlign[k]) {
            let align: string = this.rowData.columnsAlign[k]
            if (align.indexOf("right") > -1) {
              controlAlign = "text-align:right;"
            } else if (align.indexOf("center") > -1) {
              controlAlign = "text-align:center;"
            }
          }
          let readonly: FieldIsReadOnly_ReturnType = col.ui.readonly
          // @@hook
          let functionName = FieldIsReadOnly.replace("%", k)
          let fn = resolvePath(this.actions.custom, def.namespace)
          if (fn && fn[functionName]) {
            readonly = fn[functionName](<FieldIsReadOnly_Type>{
              rowKey: this.rowData.key,
              def: this.rowData.tableDef,
              data: this.rowData.data,
            })
          }
          let insertMode = this.rowData.tableDef.database.dbInsertMode
          if (k === "Code") {
            if (
              insertMode === "UDTAutoNumber" ||
              insertMode === "UDTAutoGUID" ||
              insertMode === "UDTAutoNumberBoth" ||
              insertMode === "UDTAutoGUIDBoth"
            ) {
              readonly = true
            }
          }
          if (k === "Name") {
            if (
              insertMode === "UDTAutoNumberBoth" ||
              insertMode === "UDTAutoGUIDBoth"
            ) {
              readonly = true
            }
          }
          if (!readonly) {
            if (!firstEditable) {
              id = this.rowData.key + "ovlRFNFocus_focus"
              firstEditable = true
            }
            //@@todo switch case for the other controltypes (combo, area, check,...)
            switch (col.control) {
              case "text":
                this.textBoxesToRerender.push(id)
                uiItem = html`
                  <ovl-textbox
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => fields[k]}
                  >
                  </ovl-textbox>
                `
                break
              case "date":
                uiItem = html`
                  <ovl-datebox
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => fields[k]}
                  >
                  </ovl-datebox>
                `
                break

              case "time":
                uiItem = html`
                  <ovl-timebox
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => fields[k]}
                  >
                  </ovl-timebox>
                `
                break

              case "textarea":
                uiItem = html`
                  <ovl-textarea
                    id="${id}"
                    class="fd-form__item "
                    .props=${() => fields[k]}
                  >
                  </ovl-textarea>
                `
                break
              case "list":
                {
                  uiItem = html`
                    <ovl-listcontrol
                      id="${id}"
                      class="fd-form__item "
                      .props=${() => fields[k]}
                    >
                    </ovl-listcontrol>
                  `
                }
                break
              case "checkbox":
                {
                  uiItem = html`
                    <ovl-checkbox
                      id="${id}"
                      class="fd-form__item "
                      .props=${() => fields[k]}
                    >
                    </ovl-checkbox>
                  `
                }
                break
            }
          } else {
            uiItem = fields[k].value
          }

          return html`
            <td
              @click="${this.handleClick}"
              data-col=${k}
              class="fd-table__cell"
              style="vertical-align:middle;"
            >
              ${uiItem}
            </td>
          `
        })}
      `
    })
  }
}
