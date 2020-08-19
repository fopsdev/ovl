import { html, TemplateResult } from "lit-html"
import { ovl } from "../.."
import { resolvePath, T, stringifyReplacer } from "../../global/globals"
import { FormCustomColumnFn, FormCustomColumnFn_Type } from "../../global/hooks"
import { getDisplayValue, getTextSort, TableFilterFn } from "./helpers"
import { NavDef } from "./NavControl"
import { ColumnFilter, ColumnFilterTypes, TableDataAndDef } from "./Table"
import { OvlBaseElement } from "../OvlBaseElement"
import { DialogHolderParams } from "../Dialog/OvlDialogHolder"

export type HeaderMenuDef = {
  def: TableDataAndDef
}

export class TableHeaderMenu extends OvlBaseElement {
  props: any
  headerMenu: HeaderMenuDef
  //lastTemplateResult: TemplateResult
  filterDef: ColumnFilter
  filterDropDownHidden: boolean
  focusSet: boolean
  handleSortClick = (e: Event, key: string, ascending: boolean) => {
    e.stopPropagation()
    e.preventDefault()

    this.actions.ovl.table.TableSort({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: key,
      ascending,
    })
  }

  handleFilterSetClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    //@ts-ignore
    let val = e.target.previousElementSibling.value
    this.actions.ovl.table.TableFilter({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      value: val,
    })
  }
  handleFilterUnSetClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    //@ts-ignore
    this.actions.ovl.table.TableFilter({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      value: "",
    })
  }

  handleFilterSelectedClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    this.actions.ovl.internal.TableFilterSelected(this.headerMenu.def)
  }

  handleCustomColumnFunctionClick = (e: Event, key: string, name: string) => {
    e.stopPropagation()
    e.preventDefault()

    let def = this.headerMenu.def.def
    let fnName = FormCustomColumnFn.replace("%", key)
    let fn = resolvePath(this.actions.custom, def.namespace)
    if (fn && fn[fnName]) {
      fn[fnName](<FormCustomColumnFn_Type>{
        fnName: name,
        columnKey: this.headerMenu.def.def.uiState.headerSelected,
        def,
      })
    }
  }

  handleCustomSelectedClick = (e: Event, key: string, name: string) => {
    e.stopPropagation()
    e.preventDefault()

    this.actions.ovl.internal.TableMultipleCustomFunction({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      customFnId: key,
      customFnName: name,
    })
  }

  handleFilterTextEnter = (e: KeyboardEvent) => {
    //@ts-ignore
    if (e.key === "Enter") {
      // @ts-ignore
      let val = e.target.value
      this.actions.ovl.table.TableFilter({
        def: this.headerMenu.def.def,
        data: this.headerMenu.def.data,
        value: val,
      })
    }
  }

  handleAddRowClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: "",
    })
    //    overlayToRender.overlayClosedCallback = () => {
    this.actions.ovl.table.TableAddRow(this.headerMenu.def)
    //    }
  }

  handleSelectAllClick = (e: Event, select: boolean) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableSelectAll({
      tableDef: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      select,
    })
  }

  handleCloseHeaderMenu = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: "",
    })
  }

  handleDelete = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableMultipleDeleteRow({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
    })
  }

  handleCopy = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableMultipleCopyRow({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
    })
  }

  handleEdit = async (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableMultipleEditRow({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
    })
  }

  handleRefreshTableClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.table.TableViewRefresh(this.headerMenu.def)
    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,

      key: "",
    })
  }

  handleCustomSortClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    //@ts-ignore
    let id = e.target.id.split("_")[1]
    let def = this.headerMenu.def.def
    let sortCustom = def.options.sortCustom
    if (sortCustom.selected !== id) {
    }

    this.actions.ovl.internal.TableSelectCustomSort({
      id,
      def,
    })
    // this.actions.ovl.internal.TableSelectHeader({
    //   def: this.headerMenu.def.def,
    //   data: this.headerMenu.def.data,
    //   key: "",
    // })

    this.actions.ovl.table.TableRefresh({
      defId: this.headerMenu.def.def.id,
      data: this.headerMenu.def.data,
    })
  }

  handleFilterDropDown = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.filterDropDownHidden = !this.filterDropDownHidden
    // this is an internal state change, thats why we need to rerender manually...
    //@ts-ignore
    this.getElementsByTagName("ovl-dialogholder")[0].doRender()
  }

  handleFilterDropDownValue = (e: Event, key: ColumnFilterTypes) => {
    e.stopPropagation()
    e.preventDefault()

    this.filterDropDownHidden = !this.filterDropDownHidden
    // use a  action to set all necessary state now
    let def = this.headerMenu.def.def
    let currentFilter = def.columns[def.uiState.headerSelected].filter

    if (key === "@@ovl_all" && !currentFilter.enabled) {
      //@ts-ignore
      this.getElementsByTagName("ovl-dialogholder")[0].doRender()
      return
    } else if (
      key === "@@ovl_others" &&
      currentFilter.enabled &&
      currentFilter.isOthersSelected
    ) {
      //@ts-ignore
      this.getElementsByTagName("ovl-dialogholder")[0].doRender()
      return
    } else if (key === currentFilter.selected) {
      //@ts-ignore
      this.getElementsByTagName("ovl-dialogholder")[0].doRender()
      return
    }

    let colUid = def.uiState.headerSelected

    this.actions.ovl.internal.TableSelectColumnFilter({
      key,
      def,
      columnId: colUid,
      othersCount: this.filterDef.othersCount,
      filter: this.filterDef.filterValues,
    })

    this.actions.ovl.table.TableRefresh({
      defId: this.headerMenu.def.def.id,
      data: this.headerMenu.def.data,
    })
  }

  handleCustomFilterClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    //@ts-ignore
    let id = e.target.id.split("_")[1]
    let def = this.headerMenu.def.def

    this.actions.ovl.internal.TableSelectCustomFilter({
      id,
      def,
    })
    this.actions.ovl.table.TableRefresh({
      defId: this.headerMenu.def.def.id,
      data: this.headerMenu.def.data,
    })
  }

  init() {
    this.headerMenu = this.props()
    this.filterDropDownHidden = true
  }
  getBody = () => {
    const handleMainMouseDown = (e: Event) => {
      e.stopPropagation()
    }

    let def = this.headerMenu.def.def
    if (def.uiState.headerSelected === "") {
      return undefined
    }
    let columns = def.columns
    let selectedColumn = def.uiState.headerSelected
    let selectedFunctions
    let count = 0
    let dataFilteredAndSorted = this.headerMenu.def.def.uiState
      .dataFilteredAndSorted
    let rowsCount = dataFilteredAndSorted.length //this.headerMenu.def.data.addRows
    let unselectDisabled = "menuDisabled"

    let ascendingDisabled = ""
    let descendingDisabled = ""

    if (selectedColumn === def.options.sort.field) {
      if (def.options.sort.direction === "asc") {
        ascendingDisabled = "menuDisabled"
      }
      if (def.options.sort.direction === "desc") {
        descendingDisabled = "menuDisabled"
      }
      if (
        def.options.sort.field === def.database.dataIdField &&
        def.database.dbInsertMode.indexOf("GUID") > -1
      ) {
        ascendingDisabled = "menuDisabled"
        descendingDisabled = "menuDisabled"
      }
    }

    let columnFilter

    // create a result to see which values are used how many times
    // then create a list top down (20 rows) which displays this information
    if (selectedColumn !== "-1") {
      if (
        selectedColumn !== def.database.dataIdField &&
        columns[selectedColumn].filter.showFilter
      ) {
        if (
          !(
            selectedColumn === "Name" &&
            (def.database.dbInsertMode === "UDTAutoGUIDBoth" ||
              def.database.dbInsertMode === "UDTAutoNumberBoth")
          )
        ) {
          let data = this.headerMenu.def.data.data
          let dataKeys = TableFilterFn(
            this.headerMenu.def,
            def.uiState.headerSelected
          )

          let allText = "Alle..."
          let othersText = "Alle anderen..."
          let emptyText = "(leer)"
          let alreadyProcessed: Set<string> = new Set()
          let columnDef = columns[selectedColumn]
          this.filterDef = JSON.parse(
            JSON.stringify(columnDef.filter),
            stringifyReplacer
          )
          let filterDef = this.filterDef
          let result1: {
            [key: string]: { val: any; displayVal: string; count: number }
          } = {}

          let totalCount = 0
          for (let i = 0; i < dataKeys.length; i++) {
            let k1 = dataKeys[i]
            let count = 1
            if (!alreadyProcessed.has(k1)) {
              alreadyProcessed.add(k1)
              let val = data[k1][selectedColumn]
              let displayVal = getDisplayValue(
                selectedColumn,
                columnDef,
                data[k1],
                def.namespace
              )
              let keyval = val
              if (!keyval) {
                keyval = "@@ovl_empty"
              }
              result1[keyval] = { val, displayVal: displayVal, count: 0 }
              for (let i = 0; i < dataKeys.length; i++) {
                let k2 = dataKeys[i]
                if (!alreadyProcessed.has(k2)) {
                  let val2 = data[k2][selectedColumn]
                  if (val === val2) {
                    alreadyProcessed.add(k2)
                    count++
                  }
                }
              }
              totalCount += count
              result1[keyval].count = count
            }
          }
          let result = Object.keys(result1).sort(
            (a, b) => result1[b].count - result1[a].count
          )
          if (result.length > filterDef.top) {
            result.splice(columnDef.filter.top)
          }
          // calcuclate othersCount
          count = 0
          result.sort((a, b) => {
            let valA = result1[a].val
            if (a === "@@ovl_empty") {
              return 1
            }
            let valB = result1[b].val
            if (b === "@@ovl_empty") {
              return -1
            }

            if (
              columnDef.type === "text" ||
              columnDef.type === "date" ||
              columnDef.type === "bool"
            ) {
              return getTextSort(valA, valB)
            } else {
              return valB - valA
            }
          })
          filterDef.filterValues = {}
          result.forEach((k) => {
            count += result1[k].count
            filterDef.filterValues[k] = {
              count: result1[k].count,
              displayValue: result1[k].displayVal,
              value: result1[k].val,
            }
          })
          filterDef.othersCount = totalCount - count

          let filterKeys = result //Object.keys(this.filterDef.filterValues)

          if (filterKeys.length > 0) {
            let columnFilterSelectValue = ""
            let defFilter = def.columns[def.uiState.headerSelected].filter
            if (defFilter.isOthersSelected) {
              columnFilterSelectValue = othersText
            } else if (defFilter.selected === "") {
              columnFilterSelectValue = allText
            } else {
              columnFilterSelectValue =
                defFilter.filterValues[defFilter.selected].displayValue
              if (
                !columnFilterSelectValue ||
                columnFilterSelectValue === "@@ovl_empty"
              ) {
                columnFilterSelectValue = emptyText
              }
            }
            let all = html`
              <li
                @mousedown=${(e) =>
                  this.handleFilterDropDownValue(e, "@@ovl_all")}
                class="fd-list__item"
                role="option"
              >
                <span class="fd-list__title sap-icon--clear-filter">
                  &nbsp;&nbsp;${allText} (${totalCount})</span
                >
              </li>
            `

            let others
            if (this.filterDef.othersCount > 0) {
              others = html`
                <li
                  @mousedown=${(e) =>
                    this.handleFilterDropDownValue(e, "@@ovl_others")}
                  class="fd-list__item"
                  role="option"
                >
                  <span class="fd-list__title"
                    >${othersText} (${this.filterDef.othersCount})</span
                  >
                </li>
              `
            }
            columnFilter = html`
              <li role="listitem" class="fd-list__item">
                <span class="fd-list__icon sap-icon--filter"></span>
                <div class="fd-popover" style="width:100%;">
                  <div
                    @mousedown=${this.handleFilterDropDown}
                    class="fd-popover__control"
                  >
                    <div class="fd-select">
                      <div
                        class="fd-select__control"
                        role="button"
                        tabindex="0"
                        aria-controls="ovlh0C6A325"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        ${columnFilterSelectValue}
                        <span
                          class="fd-button fd-button--transparent sap-icon--slim-arrow-down fd-select__button"
                        ></span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--dropdown"
                    aria-hidden="${this.filterDropDownHidden}"
                    id="ovlh0C6A325"
                    style="overflow: auto;"
                  >
                    <ul class="fd-list fd-list--dropdown" role="listbox">
                      ${all}
                      ${filterKeys.map((k) => {
                        let displayTemplate
                        let displayVal = this.filterDef.filterValues[k]
                          .displayValue
                        if (!displayVal) {
                          displayVal = emptyText
                          displayTemplate = html` ${displayVal} `
                        } else {
                          displayTemplate = html` <b>${displayVal}</b> `
                        }

                        return html`
                          <li
                            @mousedown=${(e) =>
                              this.handleFilterDropDownValue(
                                e,
                                <ColumnFilterTypes>(<any>k)
                              )}
                            class="fd-list__item"
                            role="option"
                          >
                            <span class="fd-list__title"
                              >${displayTemplate}
                              ${" (" +
                              this.filterDef.filterValues[k].count +
                              ")"}</span
                            >
                          </li>
                        `
                      })}
                      ${others}
                    </ul>
                  </div>
                </div>
              </li>
            `
          }
        }
      }
    }

    if (def.features.multiselect) {
      let selectRow = this.headerMenu.def.def.uiState.selectedRow
      count = Object.keys(selectRow).filter((k) => selectRow[k].selected).length
    }

    if (def.features.multiselect && count > 0) {
      unselectDisabled = ""

      let editSelectedRows
      if (def.features.edit && def.options.edit.editType === "inline") {
        editSelectedRows = html`<li
          role="listitem"
          class="fd-list__item fd-list__item--link"
        >
          <a
            href="#"
            class="fd-list__link"
            @click="${(e) => this.handleEdit(e)}"
          >
            <span class="fd-list__icon sap-icon--edit"></span>
            <span class="fd-list__title">Ändern selektierte Datensätze</span></a
          >
        </li>`
      }
      let copySelectedRows
      if (def.features.add && def.options.edit.editType === "inline") {
        copySelectedRows = html`<li
          role="listitem"
          class="fd-list__item fd-list__item--link"
        >
          <a
            href="#"
            class="fd-list__link"
            @click="${(e) => this.handleCopy(e)}"
          >
            <span class="fd-list__icon sap-icon--copy"></span>
            <span class="fd-list__title"
              >Duplizieren selektierte Datensätze</span
            ></a
          >
        </li> `
      }
      let deleteSelectedRows
      if (def.features.delete) {
        deleteSelectedRows = html`
          <li role="listitem" class="fd-list__item fd-list__item--link">
            <a
              href="#"
              class="fd-list__link"
              @click="${(e) => this.handleDelete(e)}"
            >
              <span class="fd-list__icon sap-icon--delete"></span>
              <span class="fd-list__title"
                >Löschen selektierte Datensätze</span
              ></a
            >
          </li>
        `
      }
      let filterSelectedRows
      if (def.features.filter) {
        if (!def.options.filter.showSelected) {
          filterSelectedRows = html`
            <li role="listitem" class="fd-list__item fd-list__item--link">
              <a
                href="#"
                class="fd-list__link"
                @click="${(e) => this.handleFilterSelectedClick(e)}"
              >
                <span class="fd-list__icon sap-icon--filter"></span>
                <span class="fd-list__title"
                  >Filter selektierte Datensätze</span
                ></a
              >
            </li>
          `
        } else {
          filterSelectedRows = html`
            <li role="listitem" class="fd-list__item fd-list__item--link">
              <a
                href="#"
                class="fd-list__link"
                @click="${(e) => this.handleFilterSelectedClick(e)}"
              >
                <span class="fd-list__icon sap-icon--clear-filter"></span>
                <span class="fd-list__title"
                  >Filter selektierte Datensätze entfernen</span
                ></a
              >
            </li>
          `
        }
      }

      // custom fns are also capable to be used in selection
      let customFns = def.options.customRowActions
      let customSelectedFunctions = Object.keys(customFns)
        .filter((k) => customFns[k].selected)
        .map((k) => {
          let customFn = customFns[k]
          let fnMultipleName = T(customFn.selected.translationKey)

          if (!fnMultipleName) {
            fnMultipleName = k
          }
          let icon = "fd-list__icon sap-icon--wrench"
          if (customFn.icon) {
            icon = "fd-list__icon " + customFn.icon
          }
          return html`
            <li role="listitem" class="fd-list__item fd-list__item--link">
              <a
                href="#"
                class="fd-list__link"
                @click="${(e) =>
                  this.handleCustomSelectedClick(e, k, fnMultipleName)}"
              >
                <span class="${icon}"></span>
                <span class="fd-list__title">${fnMultipleName}</span></a
              >
            </li>
          `
        })

      selectedFunctions = html`
        <div class="ovl-bigdialog-listtitle">
          Funktionen Selektierte Zeilen(${count} Datensätze)
          <ul class="fd-list fd-list--navigation" role="list">
            ${filterSelectedRows} ${editSelectedRows} ${copySelectedRows}
            ${deleteSelectedRows} ${customSelectedFunctions}
          </ul>
        </div>
      `
    }

    let columnFunctions

    if (def.uiState.headerSelected !== "") {
      let sortingFunctions
      if (columns[def.uiState.headerSelected].sortable) {
        sortingFunctions = html`
          <li
            class="fd-list__item fd-list__item--link  ${ascendingDisabled}"
            role="listitem"
          >
            <a
              href="#"
              class="fd-list__link"
              @click="${(e) =>
                this.handleSortClick(e, def.uiState.headerSelected, true)}"
            >
              <span class="fd-list__icon sap-icon--up"></span>
              <span class="fd-list__title">Ascending</span></a
            >
          </li>
          <li
            class="fd-list__item fd-list__item--link  ${descendingDisabled}"
            role="listitem"
          >
            <a
              href="#"
              class="fd-list__link"
              @click="${(e) =>
                this.handleSortClick(e, def.uiState.headerSelected, false)}"
            >
              <span class="fd-list__icon sap-icon--down"></span>
              <span class="fd-list__title">Descending</span></a
            >
          </li>
        `
      }

      let customFns = def.options.customColumnActions
      let customColumnFunctions = Object.keys(customFns).map((k) => {
        let customFn = customFns[k]
        let fnName = T(customFn.translationKey)

        if (!fnName) {
          fnName = k
        }
        let icon = "fd-list__icon sap-icon--table-column "
        if (customFn.icon) {
          icon = "fd-list__icon " + customFn.icon
        }
        return html`
          <li class="fd-list__item fd-list__item--link" role="listitem">
            <a
              href="#"
              class="fd-list__link"
              @click="${(e) =>
                this.handleCustomColumnFunctionClick(e, k, fnName)}"
            >
              <span class="${icon}"></span>
              <span class="fd-list__title">${fnName}</span></a
            >
          </li>
        `
      })

      if (sortingFunctions || customColumnFunctions) {
        let columncaption =
          columns[def.uiState.headerSelected].ui.labelTranslationKey
        if (columncaption) {
          columncaption = T(columncaption)
        }
        if (!columncaption) {
          columncaption = def.uiState.headerSelected
        }
        columnFunctions = html`
          <div class="ovl-bigdialog-listtitle">
            Funktionen Spalte <b>${columncaption}</b>

            <ul class="fd-list fd-list--navigation" role="list">
              ${columnFilter} ${sortingFunctions} ${customColumnFunctions}
            </ul>
          </div>
        `
      }
    }

    let customSort
    let sortCustom = def.options.sortCustom
    let sortCustomKeys = Object.keys(sortCustom.sorts)
    if (sortCustomKeys.length > 0) {
      let options = sortCustomKeys.map((k) => {
        let description = T(sortCustom.sorts[k].translationKey)

        let optionText = description

        if (sortCustom.selected === k) {
          return html`
            <li class="fd-list__item fd-list__item--link" role="listitem">
              <a id="sortCustomOption_${k}" href="#" class="fd-list__link">
                <span class="fd-list__icon sap-icon--accept"></span>
                <span class="fd-list__title">${optionText}</span></a
              >
            </li>
          `
        } else {
          return html`
            <li class="fd-list__item fd-list__item--link" role="listitem">
              <a id="sortCustomOption_${k}" href="#" class="fd-list__link">
                <span class="fd-list__title">${optionText}</span></a
              >
            </li>
          `
        }
      })

      customSort = html`
        <div class="ovl-bigdialog-listtitle">
          Generelle Sortierung

          <ul
            class="fd-list fd-list--navigation"
            role="list"
            @click=${this.handleCustomSortClick}
          >
            ${options}
          </ul>
        </div>
      `
    }

    let customFilter
    let filterCustom = def.options.filterCustom
    let filterCustomKeys = Object.keys(filterCustom)
    if (filterCustomKeys.length > 0) {
      let options = filterCustomKeys.map((k) => {
        let description = T(filterCustom[k].translationKey)

        let optionText = description

        if (filterCustom[k].active) {
          return html`
            <li class="fd-list__item fd-list__item--link" role="listitem">
              <a id="filterCustomOption_${k}" href="#" class="fd-list__link">
                <span class="fd-list__icon sap-icon--accept"></span>
                <span class="fd-list__title">${optionText}</span></a
              >
            </li>
          `
        } else {
          return html`
            <li class="fd-list__item fd-list__item--link" role="listitem">
              <a id="filterCustomOption_${k}" href="#" class="fd-list__link">
                <span class="fd-list__title">${optionText}</span></a
              >
            </li>
          `
        }
      })

      customFilter = html`
        <div class="ovl-bigdialog-listtitle">
          Generelle Filter

          <ul
            class="fd-list fd-list--navigation"
            role="list"
            @click=${this.handleCustomFilterClick}
          >
            ${options}
          </ul>
        </div>
      `
    }

    const handleFilterTextClick = (e: Event) => {
      e.stopPropagation()
    }

    let selectionFunctions

    if (def.features.multiselect) {
      selectionFunctions = html`
        <li role="listitem" class="fd-list__item fd-list__item--link">
          <a
            @click="${(e) => this.handleSelectAllClick(e, true)}"
            href="#"
            class="fd-list__link"
          >
            <span class="fd-list__icon sap-icon--multiselect"></span>
            <span class="fd-list__title">Alle Datensätze selektieren</span></a
          >
        </li>

        <li role="listitem" class="fd-list__item fd-list__item--link">
          <a
            @click="${(e) => this.handleSelectAllClick(e, false)}"
            href="#"
            class="fd-list__link"
          >
            <span class="fd-list__icon sap-icon--multiselect-none"></span>
            <span class="fd-list__title">Selektion aufheben</span></a
          >
        </li>
      `
    }

    let addRow

    if (def.features.add) {
      addRow = html`
        <li role="listitem" class="fd-list__item fd-list__item--link">
          <a
            @click="${(e) => this.handleAddRowClick(e)}"
            href="#"
            class="fd-list__link"
          >
            <span class="fd-list__icon sap-icon--add"></span>
            <span class="fd-list__title">Datensatz hinzufügen</span></a
          >
        </li>
      `
    }

    let refresh = null
    if (this.headerMenu.def.def.uiState.needsRefresh === true) {
      refresh = html`
        <li role="listitem" class="fd-list__item fd-list__item--link">
          <a
            @click="${(e) => this.handleRefreshTableClick(e)}"
            href="#"
            class="fd-list__link"
          >
            <span class="fd-list__icon sap-icon--refresh"></span>
            <span class="fd-list__title">Ansicht aktualisieren</span></a
          >
        </li>
      `
    }

    let filterRows

    if (def.features.filter) {
      filterRows = html`
        <li role="listitem" class="fd-list__item">
          <span class="fd-list__icon sap-icon--filter"></span>

          <input
            @keydown="${this.handleFilterTextEnter}"
            @click="${handleFilterTextClick}"
            tabindex="0"
            style="width: 88%;"
            class="fd-input"
            type="text"
            value="${def.options.filter.value}"
          />
          <button
            @click="${this.handleFilterSetClick}"
            class="fd-button sap-icon--filter"
          ></button>
          <button
            ?disabled=${!def.options.filter.value}
            @click="${this.handleFilterUnSetClick}"
            class="fd-button sap-icon--clear-filter"
          ></button>
        </li>
      `
    }

    let tableFunctions
    if (filterRows || selectionFunctions || addRow) {
      tableFunctions = html`
        <div class="ovl-bigdialog-listtitle">
          Funktionen Tabelle (${rowsCount} Datensätze)

          <ul class="fd-list fd-list--navigation" role="list">
            ${filterRows} ${selectionFunctions} ${addRow} ${refresh}
          </ul>
        </div>
      `
    }

    return html`
      <div class="ovl-bigdialog-content ovl-tableheadermenu-content">
        <div>
          ${columnFunctions} ${customSort} ${customFilter} ${selectedFunctions}
          ${tableFunctions}
        </div>
      </div>
    `
  }

  visibleHandling = (dependsOn: any) => {
    let dlgState = this.state.ovl.dialogs.TableHeaderMenu
    if (!dlgState.visible && dependsOn) {
      dlgState.visible = true
    }
    if (dlgState.visible && !dependsOn) {
      dlgState.closing = true
    }
  }
  async getFooter() {
    let navcontrol
    let def = this.headerMenu.def.def
    let paging = this.headerMenu.def.def.options.paging
    if (
      def.features.page &&
      def.uiState.dataFilteredAndSorted.length > paging.pageSize
    ) {
      navcontrol = html`
        <ovl-tnavcontrol
          .props=${() => {
            return {
              tableData: this.headerMenu.def,
              type: "header",
            } as NavDef
          }}
        ></ovl-tnavcontrol>
      `
    }

    return html` ${navcontrol}
      <button
        @click="${(e) => this.handleCloseHeaderMenu(e)}"
        style="margin-left:4px;"
        title="Abbrechen"
        class="fd-button fd-button--negative sap-icon--decline"
      ></button>`
  }
  async getUI() {
    return this.track(() => {
      let dependsOn = this.headerMenu.def.def.uiState.headerSelected
      this.visibleHandling(dependsOn)
      if (!this.state.ovl.dialogs.TableHeaderMenu.visible) {
        return null
      }
      let dialogHolderParams: DialogHolderParams
      // tracking needs to be recorded on the holder object
      // thats why we use functions here to get the templates
      // to make it look nicer i even used methods for the different parts
      dialogHolderParams = {
        dialogParts: {
          footer: () => this.getFooter(),
          body: () => this.getBody(),
          emptySpaceClickHandlerFn: (e: Event) => {
            e.stopPropagation()
            e.preventDefault()
            this.filterDropDownHidden = true
            //@ts-ignore
            this.getElementsByTagName("ovl-dialogholder")[0].doRender()
          },
          dismissedCallbackFn: () => {
            this.actions.ovl.internal.TableSelectHeader({
              def: this.headerMenu.def.def,
              data: this.headerMenu.def.data,
              key: "",
            })
          },
          customClass: () => {
            let def = this.headerMenu.def.def
            return `ovl-table-${def.id} ovl-tableheadermenu ovl-tableheadermenu-${def.id}`
          },
        },
        zIndex: 6,
        dialogType: "TableHeaderMenu",
      }

      return html`<ovl-dialogholder
        .dialogHolderParams=${dialogHolderParams}
      ></ovl-dialogholder>`
    })
  }
}
