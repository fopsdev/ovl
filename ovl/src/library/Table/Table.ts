import { html } from "lit-html"
import { ifDefined } from "../../tracker/litdirectives/if-defined"
import { repeat } from "../../tracker/litdirectives/repeat"
import { ovltemp, resolvePath, T } from "../../global/globals"
import {
  FieldGetLabelRender,
  FieldHeaderCellSelectedHandler,
  FieldIsVisible,
  ViewHeaderCellClass,
  FieldHeaderCellSelectedHandler_Type,
  ViewHeaderCellClass_ReturnType,
  ViewHeaderCellClass_Type,
  FieldIsVisible_Type,
  FieldGetLabelRender_Type,
} from "../../global/hooks"
import { OvlTableDefIds, OvlLanguage, ovl } from "../../index"
import { OvlConfig } from "../../config"
import { ListState } from "../Forms/Controls/ListControl"
import {
  DataType,
  FieldFormat,
  LookupDef,
  Schema,
} from "../Forms/OvlFormElement"
import { SnackAdd } from "../helpers"
import {
  OvlBaseElement,
  scrollToLastPosition,
  setLastScrollPosition,
} from "../OvlBaseElement"
import { HeaderMenuDef } from "./HeaderMenu"
import { CachedRendererData, GetRendererFn } from "./helpers"
import { NavDef } from "./NavControl"
import { CellClass } from "./Row"
import { TableRowDef } from "./RowWrapper"

export type SaveMode = "add" | "update"

export type DisplayMode = "Table" | "Detailview" | "Edit" | "EditInline"

export type SelectedCustomFunctionResult = {
  // this msg will be concancenated in the result output
  msg: string
  success: boolean
}

export type AssetDefinition = {
  type?: string
  ids?: string[]
  extension?: string
  externalUrl?: string
}

export type BeforeSaveParam = {
  key: string
  mode: SaveMode
  tableDef: TableDataAndDef
  row: { [key: string]: {} }
  isOfflineRetry: boolean
}

type SortDirection = "asc" | "desc"

type IDField = "{ObjectKey}" | string

export type OvlTableData = {
  data: {}
  schema: { [key: string]: Schema }
  tableDef: { [key in OvlTableDefIds]?: OvlTableDef }
  timestamp?: number
  offline?: {
    addedKeys: { [key: string]: number }
    updatedKeys: { [key: string]: { columns: {}; timestamp: number } }
    deletedKeys: {}
    errors: {}
  }
  offlineSeq?: number
  index?: {}
}

export type TableDataAndDef = {
  def: OvlTableDef
  data: OvlTableData
}

export type RowStatus = {
  status: "valid" | "warning" | "error" | "information"
  msg: string
}

type StaticFilter = {
  [key: string]: {}
}

export type RowControlAction = {
  translationKey: string
  icon: string
  selected?: {
    translationKey?: string
    // if the call itself should be one call with all the valid keys in a object
    // if not callOnce then every valid selected row gets iterated and called
    callOnce?: boolean
  }
}

export type ColumnAction = {
  translationKey: string
  icon: string
}

export type SelectedRow = {
  selected: boolean
  timestamp: number
  showNav: boolean
}

export type EditMode = "edit" | "copy" | "add"

export type SelectedEditRow = {
  selected: boolean
  mode: EditMode
}

export type SelectedViewRow = {
  selected: boolean
}

export type DetailViewMode = "None" | "Enabled" | "EnabledOnlyMobile"

export type OvlTableDef = {
  initialised?: boolean
  id?: OvlTableDefIds
  titleTranslationKey?: string
  namespace: string
  //translationGroup?: string
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
  columns: OvlColumnsDef
  uiState?: {
    headerSelected?: string
    needsRefresh?: boolean
    dataFilteredAndSorted?: string[]
    rowsCount?: number
    selectedRow?: { [key: string]: SelectedRow }
    editRow?: { [key: string]: SelectedEditRow }
    editInlineLastFocus?: string
    viewRow?: { [key: string]: SelectedViewRow }
    currentlyAddingKey?: string
    sort?: Sort
    sortCustom?: { sorts: { [key: string]: CustomSort }; selected: string }
    paging?: Paging
    filter?: Filter
    filterCustom?: { [key: string]: CustomFilter }
  }
  options?: {
    addedRowsPosition?: "bottom" /* | "top" */
    copyColumnsIgnore?: { [key: string]: string }
    customRowActions?: {
      // dynamically displays button when a row is selected or the detailview is called
      // key will be the function name that will be executed when custom button is pressed
      // check hooks.ts for the required fn names

      [key: string]: RowControlAction
    }
    customColumnActions?: {
      // dynamically displays menuentry in headerform
      // key will be the function name that will be executed when custom button is pressed
      // check hooks.ts for the required fn names
      [key: string]: ColumnAction
    }

    navType?: "top/bottom" | "top" | "bottom"
    maxRows?: { maxRows: number; showHint: boolean; showInTitle?: boolean }
    initial_sort?: Sort
    initial_sortCustom?: {
      sorts: { [key: string]: CustomSort }
      selected: string
    }
    initial_paging?: Paging
    initial_filter?: Filter
    initial_filterCustom?: { [key: string]: CustomFilter }
    tabs?: Tabs
    edit?: {
      customCaption?: {
        editTranslationKey: string
        copyTranslationKey: string
        addTranslationKey: string
      }
      editType: "inline" | "big" | "custom"
    }
    view?: {
      customCaption?: { translationKey: string }
      viewType?: "default" | "custom"
    }
    controlsRendering?: {
      checkbox?: {
        view?: { checked: string; unchecked: string }
        table?: { checked: string; unchecked: string }
      }
    }
  }
  features?: {
    detailView?: DetailViewMode
    page?: boolean
    multiselect?: boolean
    edit?: boolean
    add?: boolean
    delete?: boolean
    filter?: boolean
    headerMenu?: boolean
    // put a 0 if it always should be refreshed, put a -1 if never, other numbers > 0 are considered as seconds
    // this is taken into account when the refresh button is clicked
    forceFreshServerDataIfOlderThan?: number
    noButtonsAtTheBottom?: boolean
    showRefreshButton?: boolean
    focusToFirstEditableField?: boolean
  }
}

export type EditRowDef = {
  tableDef: OvlTableDef
  key: string
  row: {}
  data: OvlTableData
  columnsAlign: {}
  columnsVisible: {}
  mode: EditMode
}

export type ViewRowDef = {
  tableDef: OvlTableDef
  key: string
  row: {}
  data: OvlTableData
  columnsAlign: {}
  columnsVisible: {}
}

export type EditRowSaveCancelDef = {
  tableDef: OvlTableDef
  key: string
  row: {}
  data: OvlTableData
  columnsCount: number
}

export type SelectRowDef = {
  key: string
  def: OvlTableDef
  data: OvlTableData
}

export type Tabs = {
  edit: {
    selected?: string | number
    tabs: {
      [key: string]: { translationKey: string; hasCustomContent?: boolean }
    }
  }
  view: {
    selected?: string | number
    tabs: {
      [key: string]: { translationKey: string; hasCustomContent?: boolean }
    }
  }
}

export type ControlType =
  | "text"
  | "textarea"
  | "list"
  | "checkbox"
  | "option"
  | "select"
  | "date"
  | "time"
  | "link"
export type ColumnAlign = "left" | "center" | "right"

export type OvlColumnsDef = {
  [key: string]: ColumnDef
}

type Sort = {
  field: string
  direction: SortDirection
}

type CustomSort = {
  translationKey: string
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
  translationKey: string
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
  def: OvlTableDef
  data: OvlTableData
}

export type SortClick = {
  key: string
  def: OvlTableDef
  data: OvlTableData
  ascending: boolean
}

export type FilterClick = {
  value: string
  def: OvlTableDef
  data: OvlTableData
}

export type DBInsertMode =
  | "UDTAutoNumber"
  | "UDTAutoGUID"
  | "UDTAutoNumberBoth"
  | "UDTAutoGUIDBoth"
  | "AutoIdentity"
  | "AutoGUID"
  | "Manual"

export type FieldVisibility =
  | "TableNotMobile_Edit_View"
  | "TableOnlyMobile"
  | "Table_Edit_View"
  | "Edit_View"
  | "View"
  | "Edit"
  | "none"

export type AssetType = "Image" | "File" | "SAPImage" | "SAPFile"

export type ColumnDef = {
  control?: ControlType
  type?: DataType
  width?: number
  list?: ListState
  sortable?: boolean
  filter?: ColumnFilter
  ui?: {
    align?: ColumnAlign
    labelTranslationKey?: string
    format?: FieldFormat
    isPassword?: boolean
    inline?: boolean
    readonly?: boolean
    visibility?: FieldVisibility
    translationVisibility?: FieldVisibility
    showLabelIfNoValueInView?: boolean
    checkedValue?: string | boolean
    language?: OvlLanguage
    editTab?: string | number
    viewTab?: string | number
  }
  asset?: {
    type: AssetType
    validCategories: {
      [key: string]: { idColumn: string; validFileExtensions: string[] }
    }
  }
}

export type ColumnDisplayDef = {
  type?: DataType
  ui?: { format?: FieldFormat }
  list?: ListState
}

export type ListFnReturnValue = {
  data?: {
    [key: string]: {}
  }
  lookupDef?: { [key: string]: LookupDef }
  // index object is needed if lookup is referencing a regular table (which object indexes(keys) are not the primary key for handling, offline reasons)
  index?: {}
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

export let cachedRendererFn: Map<string, CachedRendererData> = new Map<
  string,
  CachedRendererData
>()

export class TableHeader extends OvlBaseElement {
  props: any
  tabledata: TableDataAndDef
  intersectionObserver: IntersectionObserver
  handleNavClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleHeaderColumnClick = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    let def = this.tabledata.def
    let key
    if (e.target.getAttribute("data-col")) {
      key = e.target.getAttribute("data-col")
    } else if (
      e.target.parentNode &&
      e.target.parentNode.getAttribute("data-col")
    ) {
      key = e.target.parentNode.getAttribute("data-col")
    }
    if (!key) {
      return
    }

    // first start custom event handler (hook)
    //@ts-ignore
    let functionName = FieldHeaderCellSelectedHandler.replace("%", key)
    let fn = resolvePath(this.actions.custom, def.namespace)
    if (fn && fn[functionName]) {
      if (
        !(await fn[functionName](<FieldHeaderCellSelectedHandler_Type>{
          //@ts-ignore
          classList: e.target.classList,
          def,
          displayMode: <DisplayMode>"Table",
        }))
      ) {
        return
      }
    }

    if (
      def.features.headerMenu &&
      (def.features.add ||
        def.features.filter ||
        def.features.multiselect ||
        def.columns[key].sortable)
    ) {
      //@ts-ignore
      if (e.target.innerHTML.indexOf(" menuDisabled") < 0) {
        this.actions.ovl.internal.TableSelectHeader({
          def: this.tabledata.def,
          data: this.tabledata.data,

          key: key,
        })
      }
    }
  }

  handleLongPress = (e) => {
    // if on touch device also display row status message as a snack
    if (this.state.ovl.uiState.isTouch) {
      let mobileTooltip
      if (e.target.title) {
        mobileTooltip = e.target.title
      } else if (e.target.parentNode && e.target.parentNode.title) {
        mobileTooltip = e.target.parentNode.title
      }
      if (mobileTooltip) {
        SnackAdd(mobileTooltip, "Information")
      }
    }
  }

  init() {
    this.tabledata = this.props(this.state)
    this.classList.add("ovl-tableview")
    this.classList.add("ovl-table-" + this.tabledata.def.id)
    this.classList.add("ovl-tableview-" + this.tabledata.def.id)
    this.intersectionObserver = new IntersectionObserver(
      async (entries, observer) => {
        for (let i = 0; i < entries.length; i++) {
          let entry = entries[i]
          if (entry.intersectionRatio === 1) {
            // get data path
            //@ts-ignore
            let params = entry.target.dataLinkObject
            params["mode"] = "Thumb"
            let res = await ovl.effects.ovl.getRequest(
              this.state.ovl.apiUrl + "assets/get",
              params,
              true
            )
            if (res.data) {
              const urlCreator = window.URL || window.webkitURL
              //@ts-ignore
              entry.target.src = urlCreator.createObjectURL(res.data)
              observer.unobserve(entry.target)
            }
          }
        }
      },
      {
        root: document.getElementById("ovl-intersectionobserver"),
        threshold: 1,
      }
    )

    // this prepares the table on first use
    //this.actions.ovl.table.TableRefresh(this.tabledata)
  }
  disconnectedCallback() {
    this.intersectionObserver.disconnect()
    super.disconnectedCallback()
  }

  async getUI() {
    return this.track(() => {
      if (this.tableRebuildCheck()) {
        return null
      }
      let def = this.tabledata.def
      if (!def.initialised) {
        throw new Error(
          "ovl tabledef: " +
            def.id +
            " is not initialised. Make sure to call TableRefresh at least once before using it"
        )
      }

      let dataAndSchema = this.tabledata.data
      let columns = def.columns
      let colWidths = Object.keys(columns)
        .filter((k) => columns[k].width)
        .map((k) => {
          let column = columns[k]

          return html` <col style="width:${column.width}%" /> `
        })

      let columnsAlign = {}
      let columnsVisible = {}
      let columnsCount = 0
      let isMobile = this.state.ovl.uiState.isMobile
      let customHeaderCellClasses: ViewHeaderCellClass_ReturnType
      let functionName = ViewHeaderCellClass
      let fn = resolvePath(this.actions.custom, def.namespace)
      if (fn && fn[functionName]) {
        customHeaderCellClasses = fn[functionName](<ViewHeaderCellClass_Type>{
          def,
          isMobile,
          displayMode: <DisplayMode>"Table",
        })
      }
      if (!customHeaderCellClasses) {
        customHeaderCellClasses = {}
      }

      let headerRows = html`
        ${Object.keys(columns).map((k) => {
          let column = columns[k]

          let visible: FieldVisibility = "Table_Edit_View"

          if (
            column.ui.language &&
            column.ui.language !== this.state.ovl.language.language
          ) {
            visible = column.ui.translationVisibility
          } else {
            visible = column.ui.visibility
          }

          //@@hook
          let functionName = FieldIsVisible.replace("%", k)
          let fn = resolvePath(this.actions.custom, def.namespace)
          if (fn && fn[functionName]) {
            visible = fn[functionName](<FieldIsVisible_Type>{
              data: this.tabledata.data,
              def,
            })
          }

          columnsVisible[k] = visible
          if (isMobile) {
            if (visible.indexOf("TableNotMobile") > -1) {
              return null
            }
          } else {
            if (visible.indexOf("TableOnlyMobile") > -1) {
              return null
            }
          }
          if (visible.indexOf("Table") < 0) {
            return null
          }

          let sortdirection = ""
          let sortCustom = def.uiState.sortCustom
          let hasCustomSort =
            sortCustom.sorts &&
            sortCustom.selected &&
            sortCustom.sorts[sortCustom.selected]
          if (column.sortable && !hasCustomSort) {
            sortdirection = "fd-table__sort-column"
            if (k === def.uiState.sort.field) {
              if (def.uiState.sort.direction === "asc") {
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
          if (column.ui.align) {
            align = column.ui.align
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
          let caption
          if (column.ui.labelTranslationKey) {
            caption = T(column.ui.labelTranslationKey)
          }
          if (!caption) {
            caption = k
          }

          //caption = GetLabelText(caption, k, def.namespace, this.state)

          let stickyTableHeader
          if (OvlConfig.stickyHeaderEnabled(this.state)) {
            stickyTableHeader = "stickyTableHeader"
          }

          // check for custom header renderer
          let rendererFn = GetRendererFn(
            def.namespace,
            cachedRendererFn,
            FieldGetLabelRender,
            k
          )
          let headerPart
          if (!rendererFn) {
            headerPart = caption
          } else {
            headerPart = rendererFn(<FieldGetLabelRender_Type>{
              columnKey: k,
              caption,
              align: align[k],
              displayMode: <DisplayMode>"Table",
            })
          }

          let customHeaderCellClass: string = ""
          let tooltip
          if (customHeaderCellClasses[k]) {
            customHeaderCellClass = customHeaderCellClasses[k].className
            tooltip = customHeaderCellClasses[k].tooltip
          }

          return html`
            <th
              data-col="${k}"
              title="${ifDefined(tooltip ? tooltip : undefined, this)}"
              style="${cellBgColor}"
              class="${sortdirection} fd-table__cell  ${cssAlign} ${stickyTableHeader}  ovl-tableview-headercell ovl-table-columnheader-${k} ovl-table-column-${k} ovl-label-${column.control +
              (column.asset
                ? column.asset.type
                : "")} ovl-label__${k} ${customHeaderCellClass}"
              scope="col"
            >
              ${headerPart}
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
      let paging = def.uiState.paging
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
          dataRows.filter((f) => {
            return f.indexOf(ovltemp) < 0
          }).length
      ) {
        dataRows = dataRows
          .filter((f) => f.indexOf(ovltemp) < 0)
          .slice(0, def.options.maxRows.maxRows)
          .concat(dataRows.filter((f) => f.indexOf(ovltemp) > -1))
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

      let tableHeaderMenu = html`
        <ovl-tableheadermenu
          .props=${() => {
            return <HeaderMenuDef>{
              def: this.tabledata,
            }
          }}
        ></ovl-tableheadermenu>
      `

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
      let doNotRender = {}
      if (dataAndSchema.offline) {
        let delKeys = dataAndSchema.offline.deletedKeys
        if (delKeys) {
          Object.keys(delKeys).forEach((f) => {
            doNotRender[f] = true
          })
        }
      }
      let rows = repeat(
        dataAndAddRows,
        (k: string) => k,
        (k) => {
          if (doNotRender[k]) {
            return null
          }
          doNotRender[k] = true
          let row = html`
            <ovl-trg
              class="fd-table__body ovl-tableview-row"
              .props=${() => {
                return <TableRowDef>{
                  data: dataAndSchema,
                  key: k,
                  tableDef: def,
                  columnsAlign,
                  columnsVisible,
                  columnsCount: columnsCount,
                  selected: def.uiState.selectedRow[k],
                  viewRow: def.uiState.viewRow[k],
                  editSelected: def.uiState.editRow[k],
                  intersectionObserver: this.intersectionObserver,
                }
              }}
            >
            </ovl-trg>
          `
          return html` ${row} `
        },
        //@ts-ignore
        this
      )

      let maxSizeHint
      if (showMaxSizeHint) {
        maxSizeHint = html`
          <tr
            data-col="${def.database.dataIdField}"
            @click="${this.handleHeaderColumnClick}"
            class="fd-table__row"
          >
            <td
              data-col="${def.database.dataIdField}"
              class="fd-has-text-align-center"
              colspan="${columnsCount}"
            >
              <div
                data-col="${def.database.dataIdField}"
                class="fd-alert fd-alert--warning"
                role="alert"
              >
                <p class="fd-alert__text">
                  Mehr als ${def.options.maxRows.maxRows} Zeilen
                </p>
              </div>
            </td>
          </tr>
        `
      }

      let title
      if (def.titleTranslationKey) {
        title = T(def.titleTranslationKey)
      }
      // check if filters and sort need to be put in title
      let filterCustom = def.uiState.filterCustom
      let sortCustom = def.uiState.sortCustom

      let sortText = ""
      if (
        sortCustom.sorts &&
        sortCustom.selected &&
        sortCustom.sorts[sortCustom.selected].showInTitle
      ) {
        let description = T(
          sortCustom.sorts[sortCustom.selected].translationKey
        )
        sortText = description
      }
      let filterText = ""
      Object.keys(filterCustom)
        .filter((f) => filterCustom[f].active && filterCustom[f].showInTitle)
        .map((m) => {
          let description = T(filterCustom[m].translationKey)

          filterText = filterText + description + ", "
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
          <tr
            @long-press="${this.handleLongPress}"
            @click="${this.handleHeaderColumnClick}"
            class="fd-table__row ovl-tableview-header-${def.id} ovl-tableview-header"
          >
            ${headerRows}
          </tr>
        </thead>

        ${rows} ${maxSizeHint}

        <tr class="fd-table__row">
          <td class="fd-has-text-align-center" colspan="${columnsCount}">
            ${rowNavBottom}
          </td>
        </tr>
        ${tableHeaderMenu}
      `)
    })
  }
  tableRebuildCheck() {
    if (this.state.ovl.uiState.tableNeedsRebuild) {
      // needed bacause calculated props (childs are refering to calculated values from here)
      // this ensures the screen gets reevaluated correctly
      this.actions.ovl.internal.SetLastScrollPosition()
      setTimeout(() => {
        this.actions.ovl.internal.SetTableNeedsRebuild(false)
        setTimeout(() => {
          scrollToLastPosition(this.state)
        }, 300)
      }, 1)
      return true
    }
    return false
  }
}
