import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import { getDisplayValue } from "../../../Table/helpers"
import { ListFnReturnValue } from "../../../Table/Table"
import { ListState } from "../ListControl"

export type HitListState = {
  fieldId: string
  list: ListState
  listData: ListFnReturnValue
  filterValue: string
  filteredKeys: string[]
  type: "inline" | "overlay"
  animation: boolean
  selectedCallback?: any
}

export class OvlHitList extends OvlBaseElement {
  props: any
  controlState: HitListState
  selectedRow: number
  focusSet: boolean
  maxRow: number
  init() {
    this.focusSet = false
    this.controlState = this.props(this.state)
    this.selectedRow = 1
  }

  handleKeyDown(e: KeyboardEvent, rowKey: string) {
    let oldSelected = this.selectedRow
    if (e.key === "Enter") {
      this.controlState.selectedCallback(rowKey)
      this.click()
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      if (this.selectedRow > 1) {
        this.selectedRow--
      } else {
        if (this.controlState.type === "inline") {
          this.controlState.selectedCallback("@@ovlcanceled")
        }
      }
    } else if (e.key === "ArrowDown" || e.key === "Tab") {
      if (this.selectedRow < this.maxRow) {
        this.selectedRow++
      }
    }
    if (oldSelected !== this.selectedRow) {
      let target = document.getElementById(
        this.controlState.fieldId +
          this.controlState.type +
          "ovlhl_" +
          this.selectedRow
      )
      if (target) {
        e.preventDefault()
        target.focus()
        return false
      }
    }
  }

  handleClick(e: Event, key: string) {
    //@ts-ignore
    this.controlState.selectedCallback(key)
  }

  handleMainKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      if (this.controlState.type === "overlay") {
        this.controlState.selectedCallback("@@ovlcanceled")
        this.click()
      } else {
        this.controlState.selectedCallback("@@ovlescape")
      }
    }
  }

  getUI() {
    let rowNr = 0
    let list = this.controlState.list
    let listData = this.controlState.listData
    let filterValue = this.controlState.filterValue
    let filteredKeys = this.controlState.filteredKeys
    let animation = ""
    if (this.controlState.animation) {
      animation = "animated fadeIn faster"
    }
    let scrollable = ""
    if (this.controlState.type === "overlay") {
      scrollable = "scrollableOverlay"
    }

    let lookupTypes = listData.lookupTypes

    if (!lookupTypes) {
      // get the types from the data and assume its text
      let keys = Object.keys(listData.data)
      if (keys.length > 0) {
        lookupTypes = Object.keys(listData.data[keys[0]]).reduce((val, k) => {
          val[k] = "text"
          return val
        }, {})
      }
    }
    // check if we should remove the valueField from the displayed list
    if (
      list.displayValueField !== undefined &&
      list.displayValueField === false
    ) {
      // we have to clone it in order to remove an entry...its proxified thats why
      lookupTypes = JSON.parse(JSON.stringify(lookupTypes))
      delete lookupTypes[list.valueField]
    }

    let lookupTypesKeys = Object.keys(lookupTypes)

    let thead
    if (lookupTypesKeys.length > 1 || this.controlState.type === "overlay") {
      thead = html`
        <thead class="fd-table__header">
          <tr class="fd-table__row">
            ${lookupTypesKeys.map(k => {
              return html`
                <th class="fd-table__cell stickyTableHeader" scope="col">
                  ${k}
                </th>
              `
            })}
          </tr>
        </thead>
      `
    }

    return html`
      <div
        style="padding-right:2px;"
        @keydown=${e => this.handleMainKeyDown(e)}
        class="${scrollable} localList"
      >
        <table
          class="fd-table ${animation}"
          style="margin:2px; margin-bottom:0; padding:2px;padding-bottom:0px;"
        >
          ${thead}
          <tbody class="fd-table__body">
            ${filteredKeys.map(rowKey => {
              let row = listData.data[rowKey]
              rowNr++
              this.maxRow = rowNr
              return html`
                <tr
                  @click=${e => this.handleClick(e, rowKey)}
                  id="${this.controlState.fieldId}${this.controlState
                    .type}ovlhl_${rowNr}"
                  tabindex="0"
                  class="fd-table__row "
                  @keydown=${e => this.handleKeyDown(e, rowKey)}
                >
                  ${lookupTypesKeys.map(c => {
                    let val = getDisplayValue(
                      { datafield: c, type: lookupTypes[c] },
                      row
                    )
                    let leftPart = ""
                    let rightPart = ""
                    // mark hits
                    let filterHit = false
                    if (filterValue) {
                      let i = val
                        .toLowerCase()
                        .indexOf(filterValue.toLowerCase())
                      if (i > -1) {
                        leftPart = val.substring(0, i)
                        rightPart = val.substring(i + filterValue.length)
                        val = val.substring(i, i + filterValue.length)
                        filterHit = true
                        return html`
                          <td class="fd-table__cell">
                            ${leftPart}<b><i>${val}</i></b
                            >${rightPart}
                          </td>
                        `
                      }
                    }
                    if (!filterHit) {
                      return html`
                        <td class="fd-table__cell">
                          ${val}
                        </td>
                      `
                    }
                  })}
                </tr>
              `
            })}
          </tbody>
        </table>
      </div>
    `
  }
  afterRender() {
    //only set scrollable if bigger than windowheight
    if (!this.focusSet && this.controlState.type === "overlay") {
      this.focusSet = true
      //@@workaround because the control was no reacting to line-select-clicks because it was resizing on first click
      this.style.width = this.clientWidth + "px;"
      document
        .getElementById(
          this.controlState.fieldId + this.controlState.type + "ovlhl_1"
        )
        .focus()
    }
  }
}
