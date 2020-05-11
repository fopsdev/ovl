import { OvlBaseElement } from "../OvlBaseElement"
import { html, TemplateResult } from "lit-html"
import {
  TableDef,
  TableDataAndDef,
  ColumnFilter,
  ColumnFilterTypes,
} from "./Table"
import { filter } from "overmind"
import { getDisplayValue, getTextSort, TableFilterFn } from "./helpers"
import { NavDef } from "./NavControl"
import { overlayToRender } from "../../library/Overlay/Overlay"
import { SnackAdd } from "../helpers"
import { T, resolvePath } from "../../global/globals"
import { FormCustomColumnFn } from "../../global/hooks"
import { customFunctions, overmind } from "../.."

export type HeaderMenuDef = {
  def: TableDataAndDef
}

export class TableHeaderMenu extends OvlBaseElement {
  props: any
  headerMenu: HeaderMenuDef
  lastTemplateResult: TemplateResult
  filterDef: ColumnFilter
  filterDropDownHidden: boolean
  focusSet: boolean
  handleSortClick = (e: Event, key: string, ascending: boolean) => {
    this.actions.ovl.table.TableSort({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: key,
      ascending,
    })
  }

  handleFilterSetClick = (e: Event) => {
    //@ts-ignore
    let val = e.target.previousElementSibling.value

    this.actions.ovl.table.TableFilter({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      value: val,
    })
  }

  handleFilterSelectedClick = (e: Event) => {
    this.actions.ovl.internal.TableFilterSelected(this.headerMenu.def)
  }

  handleCustomColumnFunctionClick = (e: Event, key: string, name: string) => {
    let def = this.headerMenu.def.def
    let fnName = FormCustomColumnFn.replace("%", key)
    let fn = resolvePath(customFunctions, def.namespace)
    if (fn && fn[fnName]) {
      fn[fnName](
        name,
        this.headerMenu.def.def.uiState.headerSelected,
        def,
        this.state,
        this.actions,
        overmind.effects
      )
    }
  }

  handleCustomSelectedClick = (e: Event, key: string, name: string) => {
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
      this.actions.ovl.internal.TableSelectHeader({
        def: this.headerMenu.def.def,
        data: this.headerMenu.def.data,
        key: "",
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
    overlayToRender.overlayClosedCallback = () => {
      this.actions.ovl.table.TableAddRow(this.headerMenu.def)
    }
  }

  handleSelectAllClick = (e: Event, select: boolean) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableSelectAll({
      tableDef: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      select,
    })
    if (!select) {
      this.actions.ovl.internal.TableSelectHeader({
        def: this.headerMenu.def.def,
        data: this.headerMenu.def.data,

        key: "",
      })
    }
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
    this.actions.ovl.table.TableRefresh({
      defId: this.headerMenu.def.def.id,
      data: this.headerMenu.def.data,
    })
    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: "",
    })
  }

  handleFilterDropDown = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.filterDropDownHidden = !this.filterDropDownHidden
    // this is an internal state change, thats why we need to rerender manually...
    this.doRender()
  }

  handleFilterDropDownValue = (e: Event, key: ColumnFilterTypes) => {
    e.stopPropagation()
    e.preventDefault()

    this.filterDropDownHidden = !this.filterDropDownHidden
    // use a  action to set all necessary state now
    let def = this.headerMenu.def.def
    let currentFilter = def.columns[def.uiState.headerSelected].filter

    if (key === "@@ovl_all" && !currentFilter.enabled) {
      this.doRender()
      return
    } else if (
      key === "@@ovl_others" &&
      currentFilter.enabled &&
      currentFilter.isOthersSelected
    ) {
      this.doRender()
      return
    } else if (key === currentFilter.selected) {
      this.doRender()
      return
    }

    let colUid = def.uiState.headerSelected

    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: "",
    })
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
    this.actions.ovl.internal.TableSelectHeader({
      def: this.headerMenu.def.def,
      data: this.headerMenu.def.data,
      key: "",
    })
  }

  init() {
    this.headerMenu = this.props()
    this.filterDropDownHidden = true
    this.focusSet = false
    overlayToRender.overlayDismissedCallback = () => {
      this.actions.ovl.internal.TableSelectHeader({
        def: this.headerMenu.def.def,
        data: this.headerMenu.def.data,
        key: "",
      })
    }
  }
  getUI() {
    let def = this.headerMenu.def.def
    if (!def.uiState.headerSelected) {
      // whilst fade out leave the ui as it is
      return this.lastTemplateResult
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
          this.filterDef = JSON.parse(JSON.stringify(columnDef.filter))
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
                @click=${(e) => this.handleFilterDropDownValue(e, "@@ovl_all")}
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
                  @click=${(e) =>
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
              <div style="margin-bottom:6px;margin-left:24px;">
                <span class="sap-icon--filter"></span>
                <div class="fd-popover" style="width:90%;">
                  <div
                    @click=${this.handleFilterDropDown}
                    class="fd-popover__control"
                  >
                    <div class="fd-select">
                      <button
                        class="fd-select__control"
                        aria-controls="ovlh0C6A325"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        ${columnFilterSelectValue}
                      </button>
                    </div>
                  </div>
                  <div
                    class="fd-popover__body fd-popover__body--no-arrow"
                    aria-hidden="${this.filterDropDownHidden}"
                    id="ovlh0C6A325"
                    style="overflow: auto; "
                  >
                    <ul class="fd-list fd-list--no-border" role="listbox">
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
                            @click=${(e) =>
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
              </div>
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
        editSelectedRows = html`
          <li>
            <a
              @click=${(e) => {
                this.handleEdit(e)
              }}
              href="#"
              class="fd-menu__item sap-icon--edit"
            >
              Ändern selektierte Datensätze</a
            >
          </li>
        `
      }
      let copySelectedRows
      if (def.features.add && def.options.edit.editType === "inline") {
        copySelectedRows = html`
          <li>
            <a
              @click=${(e) => {
                this.handleCopy(e)
              }}
              href="#"
              class="fd-menu__item sap-icon--copy"
            >
              Duplizieren selektierte Datensätze</a
            >
          </li>
        `
      }
      let deleteSelectedRows
      if (def.features.delete) {
        deleteSelectedRows = html`
          <li>
            <a
              @click=${(e) => {
                this.handleDelete(e)
              }}
              href="#"
              class="fd-menu__item sap-icon--delete"
            >
              Löschen selektierte Datensätze</a
            >
          </li>
        `
      }
      let filterSelectedRows
      if (def.features.filter) {
        if (!def.options.filter.showSelected) {
          filterSelectedRows = html`
            <li>
              <a
                href="#"
                class="fd-menu__item sap-icon--filter"
                @click="${(e) => this.handleFilterSelectedClick(e)}"
              >
                Filter selektierte Datensätze</a
              >
            </li>
          `
        } else {
          filterSelectedRows = html`
            <li>
              <a
                href="#"
                class="fd-menu__item sap-icon--clear-filter"
                @click="${(e) => this.handleFilterSelectedClick(e)}"
              >
                Filter selektierte Datensätze entfernen</a
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
          let fnMultipleName = customFn.selected.name
          if (customFn.selected.translationKey) {
            fnMultipleName = T(customFn.selected.translationKey)
          }
          if (!fnMultipleName) {
            fnMultipleName = k
          }
          return html`
            <li>
              <a
                href="#"
                class="fd-menu__item ${customFn.icon}"
                @click="${(e) =>
                  this.handleCustomSelectedClick(e, k, fnMultipleName)}"
              >
                ${fnMultipleName}</a
              >
            </li>
          `
        })

      selectedFunctions = html`
        <div class="fd-menu__group">
          <h2 class="fd-menu__title">
            Funktionen Selektierte Zeilen(${count} Datensätze)
          </h2>
          <ul class="fd-menu__list">
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
          <li>
            <a
              href="#"
              class="fd-menu__item sap-icon--up ${ascendingDisabled}"
              @click="${(e) =>
                this.handleSortClick(e, def.uiState.headerSelected, true)}"
            >
              Ascending</a
            >
          </li>
          <li>
            <a
              href="#"
              class="fd-menu__item sap-icon--down ${descendingDisabled}"
              @click="${(e) =>
                this.handleSortClick(e, def.uiState.headerSelected, false)}"
            >
              Descending</a
            >
          </li>
        `
      }

      let customFns = def.options.customColumnActions
      let customColumnFunctions = Object.keys(customFns).map((k) => {
        let customFn = customFns[k]
        let fnName = customFn.name
        if (customFn.translationKey) {
          fnName = T(customFn.translationKey)
        }
        if (!fnName) {
          fnName = k
        }
        return html`
          <li>
            <a
              href="#"
              class="fd-menu__item ${customFn.icon}"
              @click="${(e) =>
                this.handleCustomColumnFunctionClick(e, k, fnName)}"
            >
              ${fnName}</a
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
          <div class="fd-menu__group">
            <h4 class="fd-menu__title">
              Funktionen Spalte <b>${columncaption}</b>
            </h4>
            ${columnFilter}
            <ul class="fd-menu__list">
              ${sortingFunctions} ${customColumnFunctions}
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
        let optionText = sortCustom.sorts[k].description

        if (sortCustom.selected === k) {
          return html`
            <li>
              <div class="container" href="#">
                <a href="#" id="sortCustomOption_${k}" class="fd-menu__item">
                  <span class="fd-menu__addon-before sap-icon--accept"></span
                  >${optionText}
                </a>
              </div>
            </li>
          `
        } else {
          return html`
            <li>
              <a href="#" id="sortCustomOption_${k}" class="fd-menu__item">
                <span class="fd-menu__addon-before"></span>
                ${optionText}
              </a>
            </li>
          `
        }
      })

      customSort = html`
        <div class="fd-menu__group">
          <h4 class="fd-menu__title">
            Generelle Sortierung
          </h4>
          <nav
            @click=${this.handleCustomSortClick}
            class="fd-menu fd-menu--addon-before"
          >
            <ul class="fd-menu__list fd-menu__list--seperated">
              ${options}
            </ul>
          </nav>
        </div>
      `
    }

    let customFilter
    let filterCustom = def.options.filterCustom
    let filterCustomKeys = Object.keys(filterCustom)
    if (filterCustomKeys.length > 0) {
      let options = filterCustomKeys.map((k) => {
        let optionText = filterCustom[k].description

        if (filterCustom[k].active) {
          return html`
            <li>
              <div class="container" href="#">
                <a href="#" id="filterCustomOption_${k}" class="fd-menu__item">
                  <span class="fd-menu__addon-before sap-icon--accept"></span
                  >${optionText}
                </a>
              </div>
            </li>
          `
        } else {
          return html`
            <li>
              <a href="#" id="filterCustomOption_${k}" class="fd-menu__item">
                <span class="fd-menu__addon-before"></span>
                ${optionText}
              </a>
            </li>
          `
        }
      })

      customFilter = html`
        <div class="fd-menu__group">
          <h4 class="fd-menu__title">
            Generelle Filter
          </h4>
          <nav
            @click=${this.handleCustomFilterClick}
            class="fd-menu fd-menu--addon-before"
          >
            <ul class="fd-menu__list fd-menu__list--seperated">
              ${options}
            </ul>
          </nav>
        </div>
      `
    }

    const handleFilterTextClick = (e: Event) => {
      e.stopPropagation()
    }

    let selectionFunctions

    if (def.features.multiselect) {
      selectionFunctions = html`
        <li>
          <a
            @click="${(e) => this.handleSelectAllClick(e, true)}"
            href="#"
            class="fd-menu__item sap-icon--multiselect-all"
          >
            Alle Datensätze selektieren</a
          >
        </li>

        <li>
          <a
            @click="${(e) => this.handleSelectAllClick(e, false)}"
            href="#"
            class="fd-menu__item sap-icon--multiselect-none ${unselectDisabled}"
          >
            Selektion aufheben</a
          >
        </li>
      `
    }

    let paging = this.headerMenu.def.def.options.paging
    let navcontrol
    if (def.features.page && dataFilteredAndSorted.length > paging.pageSize) {
      navcontrol = html`
        <ovl-tnavcontrol
          style="margin-left:24px;"
          .props=${() => {
            return {
              tableData: this.headerMenu.def,
              type: "header",
            } as NavDef
          }}
        ></ovl-tnavcontrol>
      `
    }

    let addRow

    if (def.features.add) {
      addRow = html`
        <li>
          <a
            @click="${(e) => this.handleAddRowClick(e)}"
            href="#"
            class="fd-menu__item sap-icon--add"
          >
            Datensatz hinzufügen</a
          >
        </li>
      `
    }

    let refresh = null
    if (this.headerMenu.def.def.uiState.needsRefresh === true) {
      refresh = html`
        <li>
          <a
            @click="${(e) => this.handleRefreshTableClick(e)}"
            href="#"
            class="fd-menu__item sap-icon--refresh"
          >
            Ansicht aktualisieren</a
          >
        </li>
      `
    }

    let filterRows

    if (def.features.filter) {
      filterRows = html`
        <li class="fd-menu__item fd-form__item sap-icon--filter">
          Filter
          <input
            @keydown="${this.handleFilterTextEnter}"
            @click="${handleFilterTextClick}"
            tabindex="0"
            style="width: 66%;"
            class="fd-input"
            type="text"
            value="${def.options.filter.value}"
          />
          <button
            @click="${this.handleFilterSetClick}"
            class="fd-button sap-icon--filter"
          ></button>
        </li>
      `
    }

    let tableFunctions
    if (filterRows || selectionFunctions || addRow) {
      tableFunctions = html`
        <div class="fd-menu__group">
          <h4 class="fd-menu__title">
            Funktionen Tabelle (${rowsCount} Datensätze)
          </h4>
          <ul class="fd-menu__list">
            ${filterRows} ${selectionFunctions} ${addRow} ${refresh}
          </ul>
        </div>
      `
    }
    let headerMenuwidth = "width:50vw;"
    if (this.state.ovl.uiState.isMobile) {
      headerMenuwidth = "width:90vw;"
    }

    const handleMainMouseDown = (e: Event) => {
      e.stopPropagation()
    }

    this.lastTemplateResult = html`
      <div>
        <div
          tabindex="0"
          id="ovl_headerMenu"
          style="${headerMenuwidth}"
          class="fd-panel"
          @mousedown=${handleMainMouseDown}
          @click="${(e) => this.handleCloseHeaderMenu(e)}"
          aria-hidden="false"
        >
          <nav class="fd-menu" id="ovl_headerMenuScroll">
            ${columnFunctions} ${customSort} ${customFilter}
            ${selectedFunctions} ${tableFunctions}
          </nav>

          <div class="fd-panel__footer" style="margin:2px; padding:2px;">
            <div style="margin-left: -20px;">
              ${navcontrol}
            </div>
            <div style="margin-left:12px;"></div>
            <button
              title="Abbrechen"
              class="fd-button--negative sap-icon--decline"
            ></button>
          </div>
        </div>
      </div>
    `
    return this.lastTemplateResult
  }
  updated() {
    //only set scrollable if bigger than windowheight
    let target = document.getElementById("ovl_headerMenu")
    if (target && !this.focusSet) {
      target.focus()
      this.focusSet = true
    }
    target = document.getElementById("ovl_headerMenuScroll")
    var rect = target.getBoundingClientRect()
    if (rect.height > window.innerHeight) {
      target.classList.add("scrollableOverlay")
    }

    let popover = document.getElementById("ovlh0C6A325")
    if (popover) {
      let popoverRect = popover.getBoundingClientRect()
      if (popoverRect.top + popoverRect.height > rect.top + rect.height) {
        popover.style.height =
          rect.height - popoverRect.top + rect.top - 32 + "px"
      }
    }
    super.updated()
  }
}
