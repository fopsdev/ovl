import {
  getDateValue,
  getDecimalValue,
  ovltemp,
  resolvePath,
  T,
  uuidv4,
  ovloffline,
} from "../../global/globals"
import {
  FieldGetList,
  FormCanCopy,
  FormCanCustom,
  FormCanDelete,
  FormCanDetail,
  FormCanEdit,
  FormCanMore,
  FormCustomFilter,
  FieldGetList_ReturnType,
  FieldGetList_Type,
  FormCustomFilter_Type,
  FormCan_ReturnType,
  FormCan_Type,
  FormCustomFn,
  FormCustomFn_Type,
} from "../../global/hooks"
import { TableDefIds, ovl, OvlActions } from "../../index"
import { GetListDisplayValue } from "../forms/Controls/helpers"
import { DataType, FormFields } from "../forms/OvlFormElement"
import { overlayToRender } from "../Overlay/Overlay"
import { RowControlAllAction } from "./RowControl"
import { ColumnDisplayDef, TableData, TableDataAndDef, TableDef } from "./Table"
import { TableRowDetailView } from "./RowDetailView"

export const getTextSort = (valA: string, valB: string): number => {
  if (valA === null) {
    valA = ""
  }
  if (valB === null) {
    valB = ""
  }
  if (valA < valB) {
    return -1
  } else if (valA > valB) {
    return 1
  } else return 0
}

export const getDateSort = (valA: string, valB: string): number => {
  const aDate = new Date(valA).getTime()
  const bDate = new Date(valB).getTime()
  return aDate - bDate
}
export let cachedListFn: Map<string, any> = new Map<string, any>()
export const getDisplayValue = (
  key: string,
  col: ColumnDisplayDef,
  row: any,
  namespace: string
): string => {
  let value = row[key]

  if (col.list && namespace) {
    let cachedListKey = namespace + key
    let listFn = cachedListFn.get(cachedListKey)
    if (!listFn) {
      listFn = resolvePath(ovl.actions.custom, namespace)[
        FieldGetList.replace("%", key)
      ]
      cachedListFn.set(cachedListKey, listFn)
    }
    let listdata: FieldGetList_ReturnType = listFn(<FieldGetList_Type>{ row })
    return GetListDisplayValue(col.list, value, listdata)
  }
  let format
  if (col.ui) {
    format = col.ui.format
  }
  switch (col.type) {
    case "date":
      if (!value) {
        return ""
      }
      return getDateValue(value, format)
    case "decimal":
      if ((!value && value != 0) || value === "") {
        return ""
      }
      return getDecimalValue(value, format)
    default:
      if (!value) {
        value = ""
      }
      return value.toString()
  }
}

// some housekeeping if a new row gets added or the key changes
// should be used as well from customSaveRows...
// provide tempId if coming from an db add operation and now the definbitve key is known
// this code is super complex. pls do not just adjust it without thinking all the use cases through
export const setTableRow = (
  tableDataAndDef: TableDataAndDef,
  tempId: string,
  newId: string,
  newData: any,
  editMode: boolean,
  actions: OvlActions,
  copy?: boolean,
  isOfflineRetry?: boolean
) => {
  let def = tableDataAndDef.def
  let data = tableDataAndDef.data
  let rows = data.data
  if (newId === undefined) {
    newId = ovltemp + uuidv4()
  }
  let isAdd = false

  if (
    (newId &&
      (newId.indexOf(ovltemp) > -1 ||
        (isOfflineRetry && newId.indexOf(ovloffline) > -1))) ||
    (tempId &&
      (tempId.indexOf(ovltemp) > -1 ||
        (isOfflineRetry && tempId.indexOf(ovloffline) > -1)))
  ) {
    isAdd = true
  }
  let isSwitcher = false

  if (tempId || tempId === "") {
    if ((newId || newId === "") && newId !== tempId) {
      // its a temporary row which now is saved as a definitve one
      // so exchange the key in the current tabledef
      isSwitcher = true
      let i = def.uiState.dataFilteredAndSorted.indexOf(tempId)

      if (def.uiState.dataFilteredAndSorted.indexOf(newId) < 0) {
        if (i > -1) {
          def.uiState.dataFilteredAndSorted.splice(i, 1)
        }
        def.uiState.dataFilteredAndSorted.push(newId)
      } else if (i > -1) {
        def.uiState.dataFilteredAndSorted.splice(i, 1)
      }
      def.uiState.currentlyAddingKey = undefined
      delete def.uiState.selectedRow[tempId]
      delete def.uiState.editRow[tempId]
      delete def.uiState.viewRow[tempId]
      if (!def.uiState.selectedRow[newId]) {
        def.uiState.selectedRow[newId] = {
          selected: false,
          showNav: false,
          timestamp: 0,
        }
        def.uiState.editRow[newId] = { selected: false, mode: undefined }
        def.uiState.viewRow[newId] = { selected: false }
      }
      Object.keys(tableDataAndDef.data.tableDef).forEach((k) => {
        // for the other tabledefs
        if (k !== def.id) {
          let cdef = tableDataAndDef.data.tableDef[k]
          let selectedRow = cdef.uiState.selectedRow
          let editRow = cdef.uiState.editRow
          if (!selectedRow[newId]) {
            selectedRow[newId] = {
              selected: false,
              showNav: false,
              timestamp: 0,
            }
            editRow[newId] = { selected: false, mode: undefined }
          }
          let dataFilteredAndSorted = cdef.uiState.dataFilteredAndSorted
          // its now a "good" one so also push it to the displayed lists
          if (dataFilteredAndSorted.indexOf(newId) < 0) {
            dataFilteredAndSorted.push(newId)
          }
        }
      })
      delete rows[tempId]
    }
  } else {
    if (isAdd) {
      //newData[def.database.dataIdField] = newId
      if (def.uiState.dataFilteredAndSorted.indexOf(newId) < 0) {
        def.uiState.currentlyAddingKey = newId
        def.uiState.dataFilteredAndSorted.push(newId)
      }
      def.uiState.selectedRow[newId] = {
        selected: false,
        showNav: false,
        timestamp: 0,
      }
      let mode: any = "add"
      if (copy) {
        mode = "copy"
      }
      def.uiState.editRow[newId] = { selected: false, mode }
      def.uiState.viewRow[newId] = { selected: false }
      let paging = def.options.paging
      let rowsCount = def.uiState.dataFilteredAndSorted.length
      if (def.options.addedRowsPosition === "bottom") {
        if (def.features.page) {
          paging.page = Math.ceil(rowsCount / paging.pageSize - 1)
        }
      } else {
        if (def.features.page) {
          paging.page = 0
        }
      }
    }
  }

  // do aproperty wise update so the ui gets notified properly
  // if the defiitive one is already occupied (rows[newId]) that means that the row was deleted from somewhere else
  // so we just overwrite it and that case should been handled well
  let newKeys = Object.keys(newData)
  if (newKeys.length > 0) {
    if (rows[newId] === undefined) {
      rows[newId] = {}
    }
  }
  //window.ovldbg = true
  let destRow = rows[newId]
  //rows[newId] = newData
  newKeys.forEach((k) => {
    destRow[k] = newData[k]
  })
  if (isAdd && !isSwitcher) {
    actions.ovl.table.TableEditRow({ key: newId, def, data: data })
  }
}
// same applies to this method...use it from your customdeleters
export const deleteTableRow = (
  tableDataAndDef: TableDataAndDef,
  key: string
) => {
  Object.keys(tableDataAndDef.data.tableDef).forEach((k) => {
    let def = tableDataAndDef.data.tableDef[k] as TableDef
    let editRows = def.uiState.editRow
    let selectRows = def.uiState.selectedRow
    delete editRows[key]
    delete selectRows[key]

    let i = def.uiState.dataFilteredAndSorted.indexOf(key)
    if (i > -1) {
      def.uiState.dataFilteredAndSorted.splice(i, 1)
    }
  })
  let data = tableDataAndDef.data
  let index = data.index
  let rowId = data.data[key][tableDataAndDef.def.database.dataIdField]
  delete index[rowId]
  delete data.data[key]
}

export const selectLatestRow = (def: TableDef, data: TableData) => {
  let selRows = def.uiState.selectedRow //data.selectedRow[def.id]
  let selectedAndSortedKeys = Object.keys(selRows)
    .filter((k) => selRows[k].selected)
    .sort((a, b) => selRows[b].timestamp - selRows[a].timestamp)
  if (selectedAndSortedKeys.length > 0) {
    selRows[selectedAndSortedKeys[0]].showNav = true
    for (let i = 1; i < selectedAndSortedKeys.length; i++) {
      selRows[selectedAndSortedKeys[i]].showNav = false
      if (!def.features.multiselect) {
        selRows[selectedAndSortedKeys[i]].selected = false
      }
    }
  }
}

export const setPage = (data: TableData) => {
  Object.keys(data.tableDef).forEach((k) => {
    let def = data.tableDef[k]
    if (def.features.page) {
      let paging = def.options.paging
      let rowsCount = def.uiState.rowsCount
      let dataFilteredAndSorted = def.uiState.dataFilteredAndSorted
      let count = dataFilteredAndSorted.length
      rowsCount = count
      let pages = Math.ceil(rowsCount / paging.pageSize) - 1
      if (paging.page > pages) {
        paging.page = pages
        if (paging.page < 0) {
          paging.page = 0
        }
      } else {
        paging.page = paging.page
      }
    }
  })
}

export const setRefresh = (
  def: TableDataAndDef,
  isAdd: boolean,
  updatedData: {},
  key: string,
  serverRefresh: string
) => {
  let dataFilteredAndSorted = def.def.uiState.dataFilteredAndSorted
  if (dataFilteredAndSorted.length > 0) {
    // set all tables to refresh
    Object.keys(def.data.tableDef).forEach((r) => {
      let tableDef = def.data.tableDef[r]
      let needsRefresh = isAdd
      if (
        !needsRefresh &&
        tableDef.features.filter &&
        tableDef.options.filter.value !== ""
      ) {
        needsRefresh = true
      }
      if (!needsRefresh) {
        // there is potentially also a refresh needed if there is any active customSort or customFilter
        let sortCustom = tableDef.options.sortCustom

        if (
          sortCustom.sorts &&
          sortCustom.selected &&
          sortCustom.sorts[sortCustom.selected]
        ) {
          needsRefresh = true
        }
      }
      if (!needsRefresh) {
        let filterCustom = tableDef.options.filterCustom
        needsRefresh = Object.keys(filterCustom).some(
          (s) => filterCustom[s].active
        )
      }

      if (!needsRefresh && updatedData) {
        Object.keys(updatedData).forEach((k) => {
          if (updatedData[k] !== def.data.data[key][k]) {
            // now check if an updated column is a sort column. this would also result in a refresh
            if (k === tableDef.options.sort.field) {
              needsRefresh = true
            }
            // as well check if its a columnSort
            if (tableDef.columns[k] && tableDef.columns[k].filter.enabled) {
              needsRefresh = true
            }
          }
        })
      }
      if (!needsRefresh && serverRefresh && serverRefresh !== r) {
        needsRefresh = true
      }
      if (needsRefresh) {
        tableDef.uiState.needsRefresh = true
      }
    })
  }
}

export const initTableState = (
  def: TableDef,
  data: TableData,
  defId: TableDefIds,
  isMobile: boolean
) => {
  if (!def.initialised) {
    // prepare state/ complete state / set sensible defaults

    def.id = defId
    if (data === undefined) {
      throw Error("ovl state init: data object not present")
    }
    if (data.data === undefined) {
      data.data = {}
    }

    if (data.schema === undefined) {
      data.schema = {}
    }

    if (data.offline === undefined) {
      data.offlineSeq = 0
      data.offline = {
        addedKeys: {},
        deletedKeys: {},
        errors: {},
        updatedKeys: {},
      }
    }
    if (data.index === undefined) {
      data.index = {}
    }

    if (!def.database.dataIdField) {
      if (def.database.dbInsertMode.indexOf("UDT") > -1) {
        def.database.dataIdField = "Code"
      }
    }

    if (def.options === undefined) {
      def.options = {}
    }
    let options = def.options

    // if (options.tabs) {

    // }
    // if (def.translationGroup === undefined) {
    //   // assume tranlsation group is the same as namespace first group if not defined
    //   let firstGroup = def.namespace.split(".")[0]
    //   def.translationGroup =
    //     firstGroup.charAt(0).toUpperCase() + firstGroup.slice(1)
    // }

    if (options.addedRowsPosition === undefined) {
      options.addedRowsPosition = "bottom"
    }
    if (options.copyColumnsIgnore === undefined) {
      options.copyColumnsIgnore = {}
    }
    if (options.customRowActions === undefined) {
      options.customRowActions = {}
    }
    if (options.customColumnActions === undefined) {
      options.customColumnActions = {}
    }

    if (options.navType === undefined) {
      options.navType = "bottom"
    }
    if (options.maxRows === undefined) {
      options.maxRows = { maxRows: -1, showHint: true }
    }
    if (options.filter === undefined) {
      options.filter = { showSelected: false, value: "", static: {} }
    }
    if (options.filter.static === undefined) {
      options.filter.static = {}
    }

    if (options.sort === undefined) {
      options.sort = { direction: "asc", field: def.database.dataIdField }
    }

    if (options.paging === undefined) {
      options.paging = { page: 0, pageSize: 10000 }
    }

    if (options.edit === undefined) {
      options.edit = { editType: "inline" }
    }
    if (options.view === undefined) {
      options.view = { viewType: "default" }
    }
    if (options.view.viewType === undefined) {
      options.view.viewType = "default"
    }

    if (options.sortCustom === undefined) {
      options.sortCustom = { sorts: {}, selected: "" }
    }

    if (options.filterCustom === undefined) {
      options.filterCustom = {}
    }

    if (
      options.controlsRendering === undefined ||
      options.controlsRendering.checkbox === undefined
    ) {
      options.controlsRendering = {
        checkbox: {
          view: { checked: "✔️", unchecked: "☐" },
          table: { checked: "✔️", unchecked: "" },
        },
      }
      if (options.controlsRendering.checkbox.view === undefined) {
        options.controlsRendering.checkbox.view = {
          checked: "✔️",
          unchecked: "☐",
        }
      }
      if (options.controlsRendering.checkbox.table === undefined) {
        options.controlsRendering.checkbox.table = {
          checked: "✔️",
          unchecked: "",
        }
      }
    }

    if (def.uiState === undefined) {
      def.uiState = {}
    }
    let uiState = def.uiState

    if (uiState.viewRow === undefined) {
      uiState.viewRow = {}
    }

    if (uiState.headerSelected === undefined) {
      uiState.headerSelected = ""
    }

    if (uiState.currentlyAddingKey === undefined) {
      uiState.currentlyAddingKey = ""
    }

    if (uiState.dataFilteredAndSorted === undefined) {
      uiState.dataFilteredAndSorted = []
    }

    if (uiState.editRow === undefined) {
      uiState.editRow = {}
    }

    if (uiState.selectedRow === undefined) {
      uiState.selectedRow = {}
    }

    if (uiState.needsRefresh === undefined) {
      uiState.needsRefresh = false
    }

    if (uiState.rowsCount === undefined) {
      uiState.rowsCount = 0
    }

    if (def.features === undefined) {
      def.features = {}
    }
    let features = def.features

    if (features.focusToFirstEditableField === undefined) {
      features.focusToFirstEditableField = true
    }

    if (features.detailView === undefined) {
      features.detailView = "None"
    }

    if (features.headerMenu === undefined) {
      features.headerMenu = true
    }

    if (features.add === undefined) {
      features.add = true
    }
    if (features.delete === undefined) {
      features.delete = true
    }
    if (features.edit === undefined) {
      features.edit = true
    }
    if (features.filter === undefined) {
      features.filter = true
    }
    if (features.multiselect === undefined) {
      features.multiselect = true
    }
    if (features.page === undefined) {
      features.page = false
    }
    if (features.noButtonsAtTheBottom === undefined) {
      features.noButtonsAtTheBottom = false
    }
    if (features.showRefreshButton === undefined) {
      features.showRefreshButton = true
    }

    if (features.forceFreshServerDataIfOlderThan === undefined) {
      features.forceFreshServerDataIfOlderThan = -1
    }

    if (!def.dataFetching) {
      def.dataFetching = {}
    }

    let dataFetching = def.dataFetching

    if (dataFetching.useSchema === undefined) {
      dataFetching.useSchema = true
    }

    if (dataFetching.useCustomDataFetching === undefined) {
      dataFetching.useCustomDataFetching = false
    }

    // set some values if we are on mobile
    if (isMobile) {
      def.options.edit.editType = "big"
    }

    // update columns to always include idfield and sortfield if not there (as visible false)
    let columns = def.columns
    if (def.database.dataIdField && !def.columns[def.database.dataIdField]) {
      columns[def.database.dataIdField] = {
        ui: { visibility: "none" },
        sortable: true,
      }
    }
    if (def.options.sort.field && !def.columns[def.options.sort.field]) {
      columns[def.options.sort.field] = {
        ui: { visibility: "none" },
        sortable: true,
      }
    }
    // default controltype to textbox
    Object.keys(def.columns).forEach((f) => {
      let col = def.columns[f]
      if (col.ui === undefined) {
        col.ui = {}
      }
      if (col.ui.visibility === undefined) {
        col.ui.visibility = "Table_Edit_View"
      }
      if (col.ui.language) {
        if (col.ui.translationVisibility === undefined) {
          col.ui.translationVisibility = "Edit"
        }
      }
      if (col.ui.showLabelIfNoValueInView === undefined) {
        col.ui.showLabelIfNoValueInView = true
      }
      if (col.control === undefined) {
        col.control = "text"
      }
      if (col.filter === undefined) {
        col.filter = {
          enabled: false,
          filterValues: {},
          isOthersSelected: false,
          othersCount: 0,
          selected: "",
          top: 10,
          showFilter: false,
        }
      } else {
        col.filter.showFilter = true
      }
      if (col.filter.enabled === undefined) {
        col.filter.enabled = false
      }
      if (col.list) {
        if (col.list.acceptEmpty === undefined) {
          col.list.acceptEmpty = true
        }
        if (col.list.acceptOnlyListValues === undefined) {
          col.list.acceptOnlyListValues = false
        }
      }
      if (col.filter.filterValues === undefined) {
        col.filter.filterValues = {}
      }
      if (col.filter.isOthersSelected === undefined) {
        col.filter.isOthersSelected = false
      }
      if (col.filter.othersCount === undefined) {
        col.filter.othersCount = 0
      }
      if (col.filter.selected === undefined) {
        col.filter.selected = ""
      }
    })
  }
}

export const TableRefreshServerData = async (
  def: TableDef,
  data: TableData,
  actions: OvlActions,
  forceServerDataRefresh?: boolean
) => {
  if (!data.timestamp || !!forceServerDataRefresh) {
    // now if there is no data do a get request

    await actions.ovl.table.TableRefreshDataFromServer({
      def,
      data,
    })
  }
  if (!def.initialised) {
    let schema = data.schema
    if (def.dataFetching.useSchema && schema !== undefined) {
      Object.keys(def.columns).forEach((f) => {
        let col = def.columns[f]
        if (!col.type && schema[f]) {
          col.type = schema[f].type
        }
      })
    }
  }
}

export const TableFilterFn = (
  tableDataAndDef: TableDataAndDef,
  calledFromColumnFilterId?: string
) => {
  // filter should only operate on rows not in add-mode
  let def = tableDataAndDef.def
  let lang = ovl.state.ovl.language.language
  let data = tableDataAndDef.data.data
  let columns = def.columns
  let restable = Object.keys(data).filter((f) => f.indexOf(ovltemp) < 0)
  const staticFilter = def.options.filter.static
  // make sure that
  // 1. staticFilter gets applied (for master - details scenarios)
  // 2. temp rows in add mode get filtered out (they are handled in addRwos array)
  // 3. rows which point to null gets filtered out (eg. delete => sets em to null)

  let filterKeys = Object.keys(staticFilter)
  if (filterKeys.length > 0) {
    restable = restable.filter((v) =>
      filterKeys.some((m) => {
        return data[v][m] === staticFilter[m]
      })
    )
  }

  let filterCustom = def.options.filterCustom
  let customFilter = Object.keys(filterCustom).filter(
    (k) => filterCustom[k].active
  )
  let customFilterFn = customFilter.reduce((val, k) => {
    let functionName = FormCustomFilter.replace("%", k)
    let fn = resolvePath(ovl.actions.custom, def.namespace)
    if (fn && fn[functionName]) {
      val.push(fn[functionName])
      return val
    } else {
      throw new Error(
        "ovl customFilter function: " + functionName + " not found!"
      )
    }
  }, [])
  let hasCustomFilter = customFilterFn.length > 0
  let selectedRow = def.uiState.selectedRow
  let hasColumnFilter = Object.keys(columns).some(
    (s) => columns[s].filter.enabled
  )

  let visibleColumns = Object.keys(columns).filter(
    (f) => columns[f].ui.visibility.indexOf("Table") > -1
  )

  // restable is now filtered by static filter already, thats fine and our starting point for the next 4 filters

  // 1. selectedFilter = just ignore other filters
  // 2. columnFilters
  // 3. customFilters
  // 4. tableFilter

  // 1st Selected filter is easy. When activated just return the selected rows

  if (
    calledFromColumnFilterId === undefined &&
    def.options.filter.showSelected
  ) {
    return Object.keys(selectedRow).filter((k) => selectedRow[k].selected)
  }

  // now do the columnfilters
  if (hasColumnFilter) {
    restable = restable.filter((rowKey) => {
      // now go column by column
      return !visibleColumns
        .filter(
          (k) => columns[k].filter.enabled && k !== calledFromColumnFilterId
        )
        .some((columnId) => {
          let column = columns[columnId]

          let filter = column.filter
          let row = data[rowKey]
          if (filter.isOthersSelected) {
            // match only others
            return Object.keys(filter.filterValues).some((k) => {
              let selectedFilter = filter.filterValues[k]

              if (selectedFilter.value === row[columnId]) {
                return true
              }
            })
          } else {
            // match exact
            let selectedFilter = filter.filterValues[filter.selected]
            return selectedFilter.value !== row[columnId]
          }
        })
    })
  }

  // now the customFilters
  if (hasCustomFilter) {
    restable = restable.filter((rowKey) => {
      let data = tableDataAndDef.data
      let row = data.data[rowKey]
      return !customFilterFn.some(
        (f) => !f({ def, lang, data, row } as FormCustomFilter_Type)
      )
    })
  }

  // if tablefiltering is switched off thats it, just return
  if (!def.features.filter) {
    return restable
  }
  let hasTableFilter = def.options.filter.value !== ""
  //and the tableFilter which checks all the columns
  if (hasTableFilter) {
    restable = restable.filter((rowKey) => {
      return visibleColumns.some((columnId) => {
        let column = columns[columnId]
        const dispValue = getDisplayValue(
          columnId,
          column,
          data[rowKey],
          def.namespace
        )
        return (
          dispValue
            .toLowerCase()
            .indexOf(def.options.filter.value.toLowerCase()) > -1
        )
      })
    })
  }

  return restable
}

export const getFormFieldsFromColumns = (
  def: TableDef,
  row,
  noLabel?: boolean
) => {
  let formFields: { [key: string]: FormFields } = {}
  let columns = def.columns
  Object.keys(columns).map((k) => {
    let col = columns[k]
    let dispVal = getDisplayValue(k, col, row, "")
    let type: DataType = undefined
    if (col.type) {
      type = col.type
    }
    formFields[k] = {
      type,
      value: dispVal,
      list: col.list ? JSON.parse(JSON.stringify(col.list)) : undefined,
      ui: col.ui ? JSON.parse(JSON.stringify(col.ui)) : undefined,
      asset: col.asset ? JSON.parse(JSON.stringify(col.asset)) : undefined,
    }
    if (!formFields[k].ui) {
      formFields[k].ui = {}
    }
    formFields[k].ui.noLabel = !!noLabel
  })
  return formFields
}

export const createDynamicRowFunctions = async (
  def: TableDef,
  data: TableData,
  key: string,
  isDetailView: boolean
) => {
  let rowControlActions: { [key: string]: RowControlAllAction } = {}
  let fn = resolvePath(ovl.actions.custom, def.namespace)

  let chk = def.dataFetching.useCustomDataFetching

  // first all custom ones

  if (def.options.customRowActions) {
    //await Promise.all(
    Object.keys(def.options.customRowActions).map(async (k) => {
      let custom = def.options.customRowActions[k]
      let disabled = false

      let title: string = T(custom.translationKey)
      let functionName = FormCanCustom.replace("%", k)

      if (fn && fn[functionName]) {
        disabled = true
        title = await fn[functionName]({
          rowKey: key,
          tableDef: def,
          tableData: data,
        } as FormCan_Type)
        if (title) {
          rowControlActions[k] = {
            disabled: disabled,
            icon: custom.icon,
            custom: true,
            name: title,
          }
        }
      } else {
        rowControlActions[k] = JSON.parse(JSON.stringify(custom))
        rowControlActions[k].disabled = false
        rowControlActions[k].name = title
        rowControlActions[k].custom = true
      }
    })
    //)
  }

  // then add the default ones
  // delete
  if (def.features.delete) {
    let deleteDisabled = false
    let deleteTitle = ""
    let functionName = FormCanDelete
    //@show christian
    // the following path is tracked
    def.dataFetching.useSchema
    if (fn && fn[functionName]) {
      deleteTitle = await fn[functionName](<FormCan_Type>{
        rowKey: key,
        tableDef: def,
        tableData: data,
      })

      // the following access is NOT (correctly) tracked
      def.database.dataIdField
      deleteDisabled = true
      if (deleteTitle) {
        rowControlActions["Delete"] = {
          disabled: deleteDisabled,
          icon: "sap-icon--delete",
          custom: false,
          name: deleteTitle,
        }
      }
    }
    if (!rowControlActions["Delete"]) {
      rowControlActions["Delete"] = {
        disabled: false,
        icon: "sap-icon--delete",
        custom: false,
        name: T("AppRowFunctionDelete"),
      }
    }
  }

  // copy
  if (def.features.add) {
    let copyDisabled = false
    let copyTitle = ""
    //@@hook
    let functionName = FormCanCopy

    if (fn && fn[functionName]) {
      copyTitle = await fn[functionName](<FormCan_Type>{
        rowKey: key,
        tableDef: def,
        tableData: data,
      })
      copyDisabled = true
      if (copyTitle) {
        rowControlActions["Copy"] = {
          disabled: copyDisabled,
          icon: "sap-icon--copy",
          custom: false,
          name: copyTitle,
        }
      }
    }
    if (!rowControlActions["Copy"]) {
      rowControlActions["Copy"] = {
        disabled: false,
        icon: "sap-icon--copy",
        custom: false,
        name: T("AppRowFunctionCopy"),
      }
    }
  }

  if (def.features.edit) {
    // edit
    let editDisabled = false
    let editTitle = ""
    //@@hook
    let functionName = FormCanEdit
    if (fn && fn[functionName]) {
      editTitle = await fn[functionName](<FormCan_Type>{
        rowKey: key,
        tableDef: def,
        tableData: data,
      })
      editDisabled = true
      if (editTitle) {
        rowControlActions["Edit"] = {
          disabled: editDisabled,
          icon: "sap-icon--edit",
          custom: false,
          name: editTitle,
        }
      }
    }
    if (!rowControlActions["Edit"]) {
      rowControlActions["Edit"] = {
        disabled: false,
        icon: "sap-icon--edit",
        custom: false,
        name: T("AppRowFunctionEdit"),
      }
    }
  }
  // detailview
  if (!isDetailView) {
    if (
      def.features.detailView === "Enabled" ||
      (ovl.state.ovl.uiState.isMobile &&
        def.features.detailView === "EnabledOnlyMobile")
    ) {
      let detailDisabled = false
      let detailTitle = ""
      //@@hook
      let functionName = FormCanDetail
      if (fn && fn[functionName]) {
        detailTitle = await fn[functionName](<FormCan_Type>{
          rowKey: key,
          tableDef: def,
          tableData: data,
        })
        detailDisabled = true
        if (detailTitle) {
          rowControlActions["View"] = {
            disabled: detailDisabled,
            icon: "sap-icon--detail-view",
            custom: false,
            name: detailTitle,
          }
        }
      }
      if (!rowControlActions["View"]) {
        rowControlActions["View"] = {
          disabled: false,
          icon: "sap-icon--detail-view",
          custom: false,
          name: T("AppRowFunctionDetailView"),
        }
      }
    }
  }
  if (!isDetailView && def.features.headerMenu) {
    // more
    let moreDisabled = false
    let moreTitle = ""
    //@@hook
    let functionName = FormCanMore
    if (fn && fn[functionName]) {
      moreTitle = fn[functionName](<FormCan_Type>{
        rowKey: key,
        tableDef: def,
        tableData: data,
      })
      moreDisabled = true
      if (moreTitle) {
        rowControlActions["More"] = {
          disabled: moreDisabled,
          icon: "sap-icon--overflow",
          custom: false,
          name: moreTitle,
        }
      }
    }
    if (!rowControlActions["More"]) {
      rowControlActions["More"] = {
        disabled: false,
        icon: "sap-icon--overflow",
        custom: false,
        name: T("AppRowFunctionMore"),
      }
    }
  }
  return rowControlActions
}
export const rowControlActionsHandler = async (
  isCustom: boolean,

  key: string,
  def: TableDef,
  data: TableData,
  rowKey: string,
  isDetailView: boolean
) => {
  if (isCustom) {
    let customFns = resolvePath(ovl.actions.custom, def.namespace)
    if (customFns) {
      let customFunctionName = FormCustomFn + key
      let customFunction = customFns[customFunctionName]

      if (customFunction) {
        if (isDetailView) {
          overlayToRender.overlayClosedCallback = async () => {
            ovl.actions.ovl.internal.TableCloseViewRow({
              key: rowKey,
              def,
            })
            await customFunction(<FormCustomFn_Type>{
              rowKey,
              def,
              data,
              isLastOrOnlyOne: true,
              startedFromSelectedResult: null,
            })
          }
          ovl.actions.ovl.overlay.CloseOverlay()
        } else {
          await customFunction(<FormCustomFn_Type>{
            rowKey,
            def,
            data,
            isLastOrOnlyOne: true,
            startedFromSelectedResult: null,
          })
        }
      } else {
        throw Error(
          "Ovl error: Custom Action: " + customFunctionName + " not found!"
        )
      }
    }
  } else {
    let actionName = "Table" + key + "Row"
    if (isDetailView) {
      overlayToRender.overlayClosedCallback = async () => {
        await ovl.actions.ovl.internal.TableCloseViewRow({
          key: rowKey,
          def,
        })

        await ovl.actions.ovl.internal[actionName]({
          key: rowKey,
          def,
          data,
        })
      }
      ovl.actions.ovl.overlay.CloseOverlay()
    } else {
      await ovl.actions.ovl.internal[actionName]({
        key: rowKey,
        def,
        data,
      })
    }
  }
}
export type CachedRendererData = {
  hasRenderer: boolean
  fn: any
}

export const GetRendererFn = (
  namespace: string,
  cachedRendererFn: Map<string, CachedRendererData>,
  hookDef: string,
  fieldKey: string
) => {
  let cachedRendererKey = namespace + fieldKey
  let cachedRenderer = cachedRendererFn.get(cachedRendererKey)
  let rendererFn
  if (!cachedRenderer) {
    let functionName = hookDef.replace("%", fieldKey)
    let fn = resolvePath(ovl.actions.custom, namespace)
    if (fn && fn[functionName]) {
      rendererFn = fn[functionName]
      cachedRendererFn.set(cachedRendererKey, {
        fn: rendererFn,
        hasRenderer: true,
      })
    } else {
      cachedRendererFn.set(cachedRendererKey, {
        fn: undefined,
        hasRenderer: false,
      })
    }
  } else if (cachedRenderer.hasRenderer) {
    rendererFn = cachedRenderer.fn
  }
  return rendererFn
}
