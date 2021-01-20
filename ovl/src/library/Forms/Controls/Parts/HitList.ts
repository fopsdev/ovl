import { OvlBaseElement } from "../../../OvlBaseElement"
import { html } from "lit-html"
import { getDisplayValue } from "../../../Table/helpers"
import { ListDefinition } from "../../../Table/Table"
import { ListState } from "../ListControl"
import { T, stringifyReplacer } from "../../../../global/globals"

export type HitListState = {
  fieldId: string
  list: ListState
  listData: ListDefinition
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
    e.stopPropagation()
    if (e.key === "Escape") {
      if (this.controlState.type === "overlay") {
        this.controlState.selectedCallback("@@ovlcanceled")
        this.click()
      } else {
        this.controlState.selectedCallback("@@ovlescape")
      }
    }
  }

  async getUI() {
    return this.track(() => {
      let rowNr = 0
      let list = this.controlState.list
      let listData = this.controlState.listData
      let filterValue = this.controlState.filterValue
      let filteredKeys = this.controlState.filteredKeys
      let animation = ""
      if (this.controlState.animation) {
        animation = "animated fadeIn faster"
      }
      let lookupTypes = listData.lookupDef

      if (!lookupTypes) {
        // get the types from the data and assume its text
        let keys = Object.keys(listData.data)
        if (keys.length > 0) {
          lookupTypes = Object.keys(listData.data[keys[0]]).reduce((val, k) => {
            val[k] = { type: "text" }
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
        lookupTypes = JSON.parse(JSON.stringify(lookupTypes), stringifyReplacer)
        delete lookupTypes[list.valueField]
      }

      // if they lookupTypes contains an order property sort by that
      // because in that case they were delivered by the server which has no order guarantee for that kind of serialization (json.text)
      let lookupTypesKeys = Object.keys(lookupTypes).sort(
        (s) => (
          lookupTypes[s].order !== undefined ? lookupTypes[s].order : 0,
          lookupTypes[s].order !== undefined ? lookupTypes[s].order : 0
        )
      )

      let thead
      if (this.controlState.type === "overlay") {
        if (lookupTypesKeys.length > 0) {
          thead = html`
            <thead class="fd-table__header">
              <tr class="fd-table__row">
                ${lookupTypesKeys.map((k) => {
                  if (!lookupTypes[k].translationKey) {
                    return html`<th><br /></th>`
                  }
                  let caption = ""
                  if (lookupTypes[k].translationKey) {
                    caption = T(lookupTypes[k].translationKey)
                  } else {
                    caption = k
                  }

                  return html`
                    <th class="fd-table__cell stickyTableHeader" scope="col">
                      ${caption}
                    </th>
                  `
                })}
              </tr>
            </thead>
          `
        }
      }

      return html`
        <div
          id="ovlhitlist"
          class="ovl-hitlist"
          @keydown=${(e) => this.handleMainKeyDown(e)}
        >
          <table class="fd-table ${animation}">
            ${thead}
            <tbody class="fd-table__body">
              ${filteredKeys.map((rowKey) => {
                let row = listData.data[rowKey]
                rowNr++
                this.maxRow = rowNr
                return html`
                  <tr
                    @click=${(e) => this.handleClick(e, rowKey)}
                    id="${this.controlState.fieldId}${this.controlState
                      .type}ovlhl_${rowNr}"
                    tabindex="0"
                    class="fd-table__row "
                    @keyup=${(e) => this.handleKeyDown(e, rowKey)}
                  >
                    ${lookupTypesKeys.map((c) => {
                      let val = getDisplayValue(
                        c,
                        { type: lookupTypes[c].type },
                        row,
                        ""
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
                        return html` <td class="fd-table__cell">${val}</td> `
                      }
                    })}
                  </tr>
                `
              })}
            </tbody>
          </table>
        </div>
      `
    })
  }
}
