import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { repeat } from "lit-html/directives/repeat"
import { TableRowDef } from "./RowWrapper"
import { DataType, Schema } from "../Forms/OvlFormElement"
import { customFunctions, overmind, TableDefIds } from "../../index"

import { HeaderMenuDef } from "./HeaderMenu"
import { FieldFormat } from "../Forms/OvlFormElement"
import { NavDef } from "./NavControl"
import { overlayToRender } from "../../library/Overlay/Overlay"
import { ovltemp, resolvePath, T } from "../../global/globals"
import { ListState } from "../Forms/Controls/ListControl"

export type SaveMode = "add" | "update"

export type BeforeSaveParam = {
  key: string
  mode: SaveMode
  tableDef: TableDataAndDef
  row: { [key: string]: {} }
}

type SortDirection = "asc" | "desc"

type IDField = "{ObjectKey}" | string

export type TableData = {
  data: {}
  schema: { [key: string]: Schema }
  tableDef: { [key in TableDefIds]?: TableDef }
  timestamp?: number
  lookupTypes?: { [key: string]: DataType }
  lookupTypes2?: { [key: string]: DataType }
  lookupTypes3?: { [key: string]: DataType }
}

export type TableDataAndDef = {
  def: TableDef
  data: TableData
}

export type RowStatus = {
  status: "valid" | "warning" | "error" | "information"
  msg: string
}

type StaticFilter = {
  [key: string]: {}
}

export type RowControlAction = {
  name: string
  icon: string
}

export type SelectedRow = {
  selected: boolean
  timestamp: number
  showNav: boolean
}

export type SelectedEditRow = {
  selected: boolean
}

export type TableDef = {
  initialised?: boolean
  id: TableDefIds
  title?: string
  namespace: string
  server: {
    endpoint: string
  }
  database: {
    dataIdField: IDField
    dbInsertMode: DBInsertMode
  }
  dataFetching?: {
    useSchema?: boolean
    useCustomDataFetching?: boolean
  }
  columns: ColumnsDef
  uiState?: {
    headerSelected?: string
    needsRefresh?: boolean
    dataFilteredAndSorted?: string[]
    rowsCount?: number
    selectedRow?: { [key: string]: SelectedRow }
    editRow?: { [key: string]: SelectedEditRow }
    currentlyAddingKey?: string
  }
  options?: {
    addedRowsPosition?: "bottom" /* | "top" */
    copyColumnsIgnore?: { [key: string]: string }
    customRowActions?: {
      // dynamically displays button when a row is selected
      // key will be the action name that will be executed when custom button is pressed
      // key + _VisibleFn can be a fn name in imported functions.ts which receives state and current row and should return a boolean which
      // makes the custom action button visible or not
      [key: string]: RowControlAction
    }
    navType?: "top/bottom" | "top" | "bottom"
    maxRows?: { maxRows: number; showHint: boolean; showInTitle?: boolean }
    sort?: Sort
    sortCustom?: { sorts: { [key: string]: CustomSort }; selected: string }
    paging?: Paging
    filter?: Filter
    filterCustom?: { [key: string]: CustomFilter }
    edit?: { editType: "inline" | "big" | "custom" }
  }
  features?: {
    page?: boolean
    multiselect?: boolean
    edit?: boolean
    add?: boolean
    delete?: boolean
    filter?: boolean

    // put a 0 if it always should be refreshed, put a -1 if never, other numbers > 0 are considered as seconds
    // this is taken into account when the refresh button is clicked
    forceFreshServerDataIfOlderThan?: number
    noButtonsAtTheBottom?: boolean
    showRefreshButton?: boolean
  }
}

export type EditRowDef = {
  tableDef: TableDef
  key: string
  row: {}
  data: TableData
  columnsAlign: {}
  columnsVisible: {}
}

export type EditRowSaveCancelDef = {
  tableDef: TableDef
  key: string
  row: {}
  data: TableData
  columnsCount: number
}

export type SelectRowDef = {
  key: string
  def: TableDef
  data: TableData
}

export type ControlType =
  | "text"
  | "textarea"
  | "list"
  | "bool"
  | "option"
  | "select"
  | "date"
  | "time"
export type ColumnAlign = "left" | "center" | "right"

export type ColumnsDef = {
  [key: string]: ColumnDef
}

type Sort = {
  field: string
  direction: SortDirection
}

type CustomSort = {
  description: string
  showInTitle: boolean
}

type Filter = {
  value: string
  showSelected: boolean
  // use the static portion of  filter to define tablerow to table relations (1:n)
  static?: StaticFilter
}
type CustomFilterType = "single" | "multi"

type CustomFilter = {
  description: string
  showInTitle: boolean
  type: CustomFilterType
  active: boolean
}

export type Paging = {
  page: number
  pageSize: number
}

export type HeaderClick = {
  key: string
  def: TableDef
  data: TableData
}

export type SortClick = {
  key: string
  def: TableDef
  data: TableData
  ascending: boolean
}

export type FilterClick = {
  value: string
  def: TableDef
  data: TableData
}

export type DBInsertMode =
  | "UDTAutoNumber"
  | "UDTAutoGUID"
  | "UDTAutoNumberBoth"
  | "UDTAutoGUIDBoth"
  | "AutoIdentity"
  | "AutoGUID"
  | "Manual"

export type ColumnDef = {
  control?: ControlType
  type?: DataType
  visible?: boolean
  editable?: boolean
  caption?: string
  width?: number
  list?: ListState
  align?: ColumnAlign
  format?: FieldFormat
  sortable?: boolean
  filter?: ColumnFilter
}

export type ColumnDisplayDef = {
  type?: DataType
  format?: FieldFormat
  list?: ListState
}

export type ListFnReturnValue = {
  data?: {
    [key: string]: {}
  }
  lookupTypes?: { [key: string]: DataType }
  /* use alternative lookups, maybe some selects doesn't need all the columns displayed in the select list, so here they are customizable */
  lookupTypes2?: { [key: string]: DataType }
  lookupTypes3?: { [key: string]: DataType }
}

export type ColumnFilter = {
  showFilter?: boolean
  top: number
  enabled?: boolean
  selected?: string
  isOthersSelected?: boolean
  othersCount?: number
  filterValues?: { [key: string]: ColumnFilterValue }
}

export type ColumnFilterValue = {
  value: any
  displayValue: string
  count: number
}

export type ColumnFilterTypes = "@@ovl_all" | "@@ovl_others"

export class TableHeader extends OvlBaseElement {
  props: any
  tabledata: TableDataAndDef

  handleNavClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleHeaderColumnClick = (e: Event, key: string) => {
    e.stopPropagation()
    e.preventDefault()
    let def = this.tabledata.def
    if (
      def.features.add ||
      def.features.filter ||
      def.features.multiselect ||
      def.columns[key].sortable
    ) {
      //@ts-ignore
      if (e.target.innerHTML.indexOf(" menuDisabled") < 0) {
        this.actions.ovl.internal.TableSelectHeader({
          def: this.tabledata.def,
          data: this.tabledata.data,

          key: key
        })
      }
    }
  }

  init() {
    this.async = true
    this.tabledata = this.props(this.state)
    // this prepares the table on first use
    //this.actions.ovl.table.TableRefresh(this.tabledata)
  }
  async getUIAsync() {
    let def = this.tabledata.def
    let dataAndSchema = this.tabledata.data
    let columns = def.columns
    let colWidths = Object.keys(columns)
      .filter(k => columns[k].width)
      .map(k => {
        let column = columns[k]

        return html`
          <col style="width:${column.width}%" />
        `
      })

    let columnsAlign = {}
    let columnsVisible = {}
    let columnsCount = 0
    let headerRows = html`
      ${Object.keys(columns).map(k => {
        let column = columns[k]

        let visible = true
        if (column.visible !== undefined) {
          visible = column.visible
        }
        //@@hook
        let functionName = k + "VisibleFn"
        let fn = resolvePath(customFunctions, def.namespace)
        if (fn && fn[functionName]) {
          visible = fn[functionName](
            this.tabledata,
            this.state,
            this.actions,
            overmind.effects
          )
        }

        columnsVisible[k] = visible
        if (!visible) {
          return null
        }

        let sortdirection = ""
        let sortCustom = def.options.sortCustom
        let hasCustomSort =
          sortCustom.sorts &&
          sortCustom.selected &&
          sortCustom.sorts[sortCustom.selected]
        if (column.sortable && !hasCustomSort) {
          sortdirection = "fd-table__sort-column"
          if (k === def.options.sort.field) {
            if (def.options.sort.direction === "asc") {
              sortdirection += " fd-table__sort-column--asc"
            } else {
              sortdirection += " fd-table__sort-column--dsc"
            }
          }
        }
        let cellBgColor = ""

        if (column.filter.enabled) {
          cellBgColor = "background-color: var(--fd-color-shell-2);"
        }

        if (k === def.uiState.headerSelected) {
          cellBgColor = "background-color: var(--fd-color-accent-7);"
        }
        columnsCount++
        let align: ColumnAlign = "left"
        if (column.align) {
          align = column.align
        } else {
          if (
            column.type &&
            (!column.control || column.control !== "list") &&
            (column.type === "decimal" || column.type === "int")
          ) {
            align = "right"
          }
        }
        let cssAlign = ""
        switch (align) {
          case "center":
            cssAlign = "fd-has-text-align-center"
            break

          case "right":
            cssAlign = "fd-has-text-align-right"
            break
        }
        columnsAlign[k] = cssAlign
        let caption = T(column.caption)
        if (!caption) {
          caption = k
        }
        return html`
          <th
            style="${cellBgColor}"
            @click="${e => this.handleHeaderColumnClick(e, k)}"
            class="ovltablecolumnheader ${sortdirection} fd-table__cell stickyTableHeader ${cssAlign} "
            scope="col"
          >
            ${caption}
          </th>
        `
      })}
    `

    let rowNavTop
    if (
      !def.uiState.headerSelected &&
      (def.options.navType === "top/bottom" || def.options.navType === "top")
    ) {
      rowNavTop = html`
        <ovl-tnavcontrol
          class="fd-table__row"
          .props=${() => {
            return { tableData: this.tabledata, type: "row" } as NavDef
          }}
        ></ovl-tnavcontrol>
      `
    }
    let rowNavBottom
    let dataFilteredAndSorted = def.uiState.dataFilteredAndSorted
    // get all the committed rows (no temporary keys)
    let dataRows = dataFilteredAndSorted
    let filteredRowsCount = dataRows.length
    let paging = def.options.paging
    // do paging only on committed rows
    if (def.features.page) {
      dataRows = dataRows.slice(
        paging.page * paging.pageSize,
        (paging.page + 1) * paging.pageSize
      )
    }

    // check if we hit maxsize...so give a hint at the end of the table

    let showMaxSizeHint = false
    if (
      !def.features.page &&
      def.options.maxRows.maxRows !== -1 &&
      def.options.maxRows.maxRows <
        dataRows.filter(f => {
          return f.indexOf(ovltemp) < 0
        }).length
    ) {
      dataRows = dataRows
        .filter(f => f.indexOf(ovltemp) < 0)
        .slice(0, def.options.maxRows.maxRows)
        .concat(dataRows.filter(f => f.indexOf(ovltemp) > -1))
      if (def.options.maxRows.showHint) {
        showMaxSizeHint = true
      }
    }

    let dataAndAddRows = dataRows
    // make sure to show freshly and not refreshed (=resorted) rows on the first page or last page depending on mode
    let page = -1
    if (def.features.page) {
      page = Math.ceil(filteredRowsCount / paging.pageSize) - 1
      if (page < 0) {
        page = 0
      }
    }

    // put the tablemenu to the ovberlay

    if (overlayToRender.resolve && def.uiState.headerSelected !== "") {
      overlayToRender.resolve(html`
        <ovl-tableheadermenu
          .props=${() => {
            return <HeaderMenuDef>{
              def: this.tabledata
            }
          }}
        ></ovl-tableheadermenu>
      `)
    }

    // if (def.options.addedRowsPosition === "bottom") {
    //   // add only if on last page

    //   if (!def.features.page || page === paging.page) {
    //     dataAndAddRows = dataRows.concat(
    //       Object.keys(data).filter(k => k.indexOf(ovltemp) > -1)
    //     )
    //   }
    // }
    // else if (def.options.addedRowsPosition === "top") {
    //   // only if on first page
    //   if (page === 0 || page < 0) {
    //     //@ts-ignore
    //     dataAndAddRows = dataAndSchema.addRows
    //       .slice(def.uiState.addRowsIndex)
    //       .reverse()
    //       .concat(dataRows)
    //   }
    // }

    if (
      def.options.navType === "top/bottom" ||
      def.options.navType === "bottom"
    ) {
      rowNavBottom = html`
        <ovl-tnavcontrol
          class="fd-table__row"
          .props=${() => {
            return { tableData: this.tabledata, type: "row" } as NavDef
          }}
        ></ovl-tnavcontrol>
      `
    }
    let alreadyRendered = {}
    let rows = repeat(
      dataAndAddRows,
      (k: string) => k,
      k => {
        if (alreadyRendered[k]) {
          return null
        }
        alreadyRendered[k] = true
        let row = html`
          <ovl-trg
            class="fd-table__body"
            .props=${() => {
              return <TableRowDef>{
                data: dataAndSchema,
                key: k,
                tableDef: def,
                columnsAlign,
                columnsVisible,
                columnsCount: columnsCount,
                selected: def.uiState.selectedRow[k],
                editSelected: def.uiState.editRow[k]
              }
            }}
          >
          </ovl-trg>
        `
        return html`
          ${row}
        `
      }
    )

    let maxSizeHint
    if (showMaxSizeHint) {
      maxSizeHint = html`
        <tr
          @click=${e =>
            this.handleHeaderColumnClick(
              e,
              this.tabledata.def.database.dataIdField
            )}
          class="fd-table__row"
        >
          <td class="fd-has-text-align-center" colspan="${columnsCount}">
            <div class="fd-alert fd-alert--warning" role="alert">
              <p class="fd-alert__text">
                Mehr als ${def.options.maxRows.maxRows} Zeilen
              </p>
            </div>
          </td>
        </tr>
      `
    }

    let title
    if (def.title) {
      title = def.title
    }
    // check if filters and sort need to be put in title
    let filterCustom = def.options.filterCustom
    let sortCustom = def.options.sortCustom

    let sortText = ""
    if (
      sortCustom.sorts &&
      sortCustom.selected &&
      sortCustom.sorts[sortCustom.selected].showInTitle
    ) {
      sortText = sortCustom.sorts[sortCustom.selected].description
    }
    let filterText = ""
    Object.keys(filterCustom)
      .filter(f => filterCustom[f].active && filterCustom[f].showInTitle)
      .map(m => {
        filterText = filterText + filterCustom[m].description + ", "
      })
    // if (filterText) {
    //   filterText = filterText.substring(0,filterText.length-1);
    // }
    let filterAndSortText = ""

    if (filterText) {
      filterAndSortText = "Filter: " + filterText
    }
    if (sortText) {
      filterAndSortText += "Sortierung: " + sortText + ", "
    }
    if (def.options.maxRows.maxRows && def.options.maxRows.showInTitle) {
      filterAndSortText += "Top: " + def.options.maxRows.maxRows + ", "
    }
    if (filterAndSortText) {
      filterAndSortText = filterAndSortText.substring(
        0,
        filterAndSortText.length - 2
      )
      filterAndSortText = "(" + filterAndSortText + ")"
    }

    return Promise.resolve(html`
      <caption>
        <b>${title}</b>
        ${filterAndSortText} ${rowNavTop}
      </caption>
      ${colWidths}
      <thead class="fd-table__header">
        <tr class="fd-table__row">
          ${headerRows}
        </tr>
      </thead>

      ${rows} ${maxSizeHint}
      <tr class="fd-table__row">
        <td class="fd-has-text-align-center" colspan="${columnsCount}">
          ${rowNavBottom}
        </td>
      </tr>
    `)
  }
}
