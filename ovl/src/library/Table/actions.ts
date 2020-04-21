import { Action, AsyncAction } from "overmind"
import { postRequest } from "../../effects"
import { api, ovltemp, uuidv4, resolvePath, T } from "../../global/globals"
import { customFunctions, TableDefIds } from "../../index"
import { DialogResult } from "../actions"
import { FormState, InitForm } from "../forms/actions"
import { KeyValueListFromServerFn } from "../forms/Controls/helpers"
import { ValidationAddError } from "../Forms/helper"
import {
  getDateSort,
  getFormFieldsFromColumns,
  getTextSort,
  initTableState,
  selectLatestRow,
  setPage,
  setRefresh,
  TableFilterFn,
  TableRefreshServerData,
} from "../Table/helpers"
import { deleteTableRow, setTableRow } from "./Helpers"
import {
  BeforeSaveParam,
  ColumnFilterTypes,
  ColumnFilterValue,
  FilterClick,
  HeaderClick,
  ListFnReturnValue,
  Paging,
  SaveMode,
  SelectRowDef,
  SortClick,
  TableData,
  TableDataAndDef,
  TableDef,
} from "./Table"
import { overmind } from "../.."
import { SnackAdd, SnackTrackedAdd, SnackTrackedRemove } from "../helpers"
import {
  FieldGetList,
  FormCustomSort,
  FormCustomSave,
  FormBeforeSave,
  FormSaveError,
  FormAfterSave,
  FormCopy,
  FormAdd,
  FormDeleteError,
  FormAfterDelete,
  FormCanDelete,
  FormCanCopy,
  FormCanEdit,
} from "../../global/hooks"

const minimumFilterChars = 3

export const TableSetPage: Action<{ paging: Paging; page: number }> = (
  _,
  pageDef
) => {
  if (pageDef.page > -1) {
    pageDef.paging.page = pageDef.page
  }
}

export const TableClearFilter: Action<TableDataAndDef> = (
  { actions },
  value
) => {
  let def = value.def
  if (def.options.filter.showSelected) {
    def.options.filter.showSelected = false
  } else {
    def.options.filter.value = ""
  }
  def.uiState.headerSelected = ""
  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableFilterSelected: Action<TableDataAndDef> = (
  { actions },
  value
) => {
  let def = value.def
  def.options.filter.showSelected = !def.options.filter.showSelected
  actions.ovl.internal.TableSetPage({
    paging: value.def.options.paging,
    page: 0,
  })
  actions.ovl.table.TableRefresh({ defId: def.id, data: value.data })
}

export const TableSelectHeader: Action<HeaderClick> = (
  { actions, state },
  def
) => {
  if (!state.ovl.libState.overlay.closing) {
    if (def.key !== "") {
      actions.ovl.overlay.OpenOverlay({
        templateResult: null,
        elementToFocusAfterClose: document.activeElement,
      })
    } else {
      actions.ovl.internal.StartCloseOverlay()
    }
    def.def.uiState.headerSelected = def.key
  }
}

export const TableSort: Action<SortClick> = ({ actions }, value) => {
  let def = value.def
  def.options.sort.field = value.key
  if (value.ascending) {
    def.options.sort.direction = "asc"
  } else {
    def.options.sort.direction = "desc"
  }
  def.options.sortCustom.selected = ""
  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableFilter: Action<FilterClick> = ({ actions }, value) => {
  let def = value.def
  def.options.filter.value = value.value
  def.options.filter.showSelected = false

  if (value.def.features.page) {
    actions.ovl.internal.TableSetPage({
      paging: value.def.options.paging,
      page: 0,
    })
  }

  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableSelectAll: Action<{
  tableDef: TableDef
  data: TableData
  select: boolean
}> = ({ actions }, def) => {
  let selectedRows = def.tableDef.uiState.selectedRow
  Object.keys(selectedRows).forEach((k) => {
    selectedRows[k].selected = false
    selectedRows[k].showNav = false
  })
  if (def.select) {
    def.tableDef.uiState.dataFilteredAndSorted.forEach((k) => {
      selectedRows[k].selected = true
    })
  }
}

export const TableSelectRow: Action<SelectRowDef> = (_, selectRow) => {
  let selRows = selectRow.def.uiState.selectedRow
  let sel = selRows[selectRow.key]
  // toggle selected state
  sel.selected = !sel.selected
  if (sel.selected) {
    sel.timestamp = new Date().getTime()
  } else {
    sel.showNav = false
  }
  // only the "freshest click" should display nav
  selectLatestRow(selectRow.def, selectRow.data)
}

export const TableViewRefresh: Action<TableDataAndDef> = (
  { actions },
  value
) => {
  actions.ovl.table.TableRefresh({
    defId: value.def.id,
    data: value.data,
  })
}

export const TableRefreshDataFromServer: AsyncAction<{
  def: TableDef
  data: TableData
}> = async ({ state, actions, effects }, value) => {
  let def = value.def
  let data = value.data.data
  let schema = value.data.schema

  let getSchema = false
  if (def.dataFetching.useSchema && Object.keys(schema).length === 0) {
    getSchema = true
  }

  let url = state.ovl.apiUrl + def.server.endpoint + "/get"
  let postData = {
    lang: state.ovl.language.language,
    getSchema,
    insertMode: def.database.dbInsertMode,
  }
  let res = await effects.postRequest(url, postData)
  // sync needsRefresh with eventually other tables
  if (!res.data) {
    return
  }
  let serverData = res.data.data
  let keysFromServer = Object.keys(serverData)
  let localData = value.data.data
  let localKeys = Object.keys(localData)
  let needsRefresh = false
  // check if rows were added meanwhile
  needsRefresh = keysFromServer.some((k) => localData[k] === undefined)

  // delete check is not needed its handled by design

  // check if rows were deleted meanwhile
  let rowsDeleted = false
  localKeys.forEach((k) => {
    if (serverData[k] === undefined) {
      rowsDeleted = true
      deleteTableRow({ def: value.def, data: value.data }, k)
    }
  })

  // for now also if a field got changed on the server it will be displayed
  // but there is possibly a resort necessary. this case is not handled yet
  // if (!needsRefresh) {
  //   // check if something changed row by row
  //   needsRefresh = localKeys.some(
  //     k => JSON.stringify(serverData[k]) !== JSON.stringify(localData[k])
  //   )
  // }
  if (needsRefresh) {
    setRefresh({ def: value.def, data: value.data }, false, null, null, def.id)
  }
  // do a row and column copy so we get the notications

  let columns = def.columns
  let dataFieldsToLookups: { [key: string]: string } = Object.keys(columns)
    .filter((f) => columns[f].list && columns[f].list.serverEndpoint)
    .reduce((val, k) => {
      val[k] = k
      return val
    }, {})
  // console.log("lookupinfo ")
  // console.log(dataFieldsToLookups)
  keysFromServer.forEach((k) => {
    if (localData[k] === undefined) {
      localData[k] = {}
    }
    Object.keys(serverData[k]).forEach((c) => {
      localData[k][c] = serverData[k][c]
      // check for lookups which needs to be refreshed/reloaded
      if (dataFieldsToLookups[c]) {
        // its a lookup column, also check if lookup description is available
        let lookupDefKey = dataFieldsToLookups[c]
        let lookupColumnDef = def.columns[lookupDefKey]
        let functionName = FieldGetList.replace("%", lookupDefKey)
        let fn = resolvePath(customFunctions, def.namespace)
        if (!fn || !fn[functionName]) {
          console.error(
            "ovl needs a function: " +
              functionName +
              " to be defined in customFunctions at: " +
              def.namespace
          )
        }
        let listdata: ListFnReturnValue = fn[functionName](
          serverData[k],
          state,
          actions,
          effects
        )

        let value = localData[k][c]
        let listValueFound = true
        if (listdata.data && value && !listdata.data[value]) {
          listValueFound = false
        }
        if (!listValueFound) {
          console.error("lookups need refresh for")
          console.error(value)
          KeyValueListFromServerFn(
            state,
            lookupColumnDef.list,
            listdata,
            "",
            serverData[k],
            def.namespace,
            lookupDefKey,
            effects,
            { Id: value }
          )
          // check if lookup was succesful
          // if not there is something fishy and report it
          if (listdata.data && value && !listdata.data[value]) {
            SnackAdd(
              "Lookup: " +
                value +
                " für Spalte: " +
                (lookupColumnDef.ui.labelTranslationKey
                  ? T(lookupColumnDef.ui.labelTranslationKey)
                  : k) +
                " nicht gefunden...",
              "Warning"
            )
          }
        }
      }
    })
  })
  if (rowsDeleted) {
    setPage(def, value.data, data)
  }

  // don't ever do that. would result in a new refernece and all the existing comps uisng some state from it are lost
  //value.data.data = res.data.data

  if (res.data.schema && Object.keys(res.data.schema).length > 0) {
    value.data.schema = res.data.schema
  }

  value.data.timestamp = Date.now()
}
let lastRefreshMsg: number = 0
export const TableRefresh: AsyncAction<{
  ignoreRefreshedMessageSnack?: boolean
  refreshServerDataIfOlderThan?: number
  forceServerDataRefresh?: boolean
  defId: TableDefIds
  data: TableData
}> = async ({ actions, state, effects }, value) => {
  let dataAndState = value.data
  let def = dataAndState.tableDef[value.defId]

  initTableState(def, dataAndState, value.defId, state.ovl.uiState.isMobile)
  // if (dataAndState.timestamp === undefined) {
  //   if (!ignoreRefreshedMessageSnack) {
  //     ignoreRefreshedMessageSnack = true
  //   }
  // }

  let ignoreRefreshedMessageSnack = value.ignoreRefreshedMessageSnack
  let forceServerDataRefresh = value.forceServerDataRefresh
  let refreshedBecauseOfAge = false
  if (!forceServerDataRefresh) {
    let refreshServerDataIfOlderThan = value.refreshServerDataIfOlderThan
    if (!def.dataFetching.useCustomDataFetching) {
      if (refreshServerDataIfOlderThan) {
        def.features.forceFreshServerDataIfOlderThan = refreshServerDataIfOlderThan
      } else {
        if (def.features.forceFreshServerDataIfOlderThan) {
          refreshServerDataIfOlderThan =
            def.features.forceFreshServerDataIfOlderThan
        }
      }
      refreshedBecauseOfAge =
        refreshServerDataIfOlderThan > 0 &&
        dataAndState.timestamp + refreshServerDataIfOlderThan * 1000 <
          Date.now()

      if (refreshedBecauseOfAge) {
        forceServerDataRefresh = true
      }
    }
  }
  let snackId

  if (refreshedBecauseOfAge || !ignoreRefreshedMessageSnack) {
    snackId = uuidv4()
    SnackTrackedAdd("Ansicht wird aktualisiert...", "Success", snackId)
  }
  if (!def.dataFetching.useCustomDataFetching) {
    await TableRefreshServerData(
      def,
      dataAndState,
      actions,
      forceServerDataRefresh
    )
  }
  def.initialised = true
  let data = dataAndState
  setTimeout(() => {
    actions.ovl.table.TableRebuild({
      data,
      defId: value.defId,
      snackId,
    })
  }, 5)
}

export const TableRebuild: AsyncAction<{
  snackId: string
  defId: string
  data: TableData
}> = async ({ actions, state, effects }, value) => {
  let snackId = value.snackId
  let def = value.data.tableDef[value.defId]
  let data = value.data.data

  try {
    let customSortFn = undefined
    let sortCustom = def.options.sortCustom
    let fn = resolvePath(customFunctions, def.namespace)
    if (sortCustom.selected && sortCustom.sorts[sortCustom.selected]) {
      let functionName = FormCustomSort.replace("%", sortCustom.selected)
      if (fn && fn[functionName]) {
        customSortFn = fn[functionName]
      } else {
        throw new Error(
          "ovl customSort function: " +
            functionName +
            " in customFunctions not found!"
        )
      }
    }
    let restable = TableFilterFn({ def, data: value.data })
    const sortfield = def.options.sort.field

    const ascending = def.options.sort.direction === "asc" ? 1 : -1
    let res: number = 0
    restable = restable.sort((a, b) => {
      if (customSortFn !== undefined) {
        return customSortFn(a, b, data, state, actions, effects)
      } else {
        let valB = data[b][sortfield]
        let valA = data[a][sortfield]
        let type = def.columns[sortfield].type
        if (!type) {
          type = "text"
        }
        switch (type) {
          case "date":
            res = getDateSort(valA, valB)
            break
          case "time":
          case "text":
            res = getTextSort(valA, valB)
            break
          case "decimal":
          case "int":
            res = valA - valB
            break
        }
        return res * ascending
      }
    })
    let selectedRow = def.uiState.selectedRow
    restable.forEach((k) => {
      if (!selectedRow[k]) {
        selectedRow[k] = {
          selected: false,
          showNav: false,
          timestamp: 0,
        }
      }
      let editRow = def.uiState.editRow
      if (!editRow[k]) {
        editRow[k] = {
          selected: false,
        }
      }
    })
    def.uiState.rowsCount = restable.length
    if (def.features.page) {
      let paging = def.options.paging
      let nrOfPages = Math.ceil(restable.length / paging.pageSize)
      if (paging.page > nrOfPages - 1) {
        paging.page = nrOfPages - 1
        if (paging.page < 0) {
          paging.page = 0
        }
      }
    }

    def.uiState.dataFilteredAndSorted = restable
    def.uiState.needsRefresh = false
  } finally {
    if (snackId) {
      SnackTrackedRemove(snackId)
    }
  }
}

export const TableDirectSaveRow: AsyncAction<{
  data: TableData
  defId: TableDefIds
  rowToSave: {}
  noSnack?: boolean
}> = async ({ state, actions }, value) => {
  let data = value.data
  let def = data.tableDef[value.defId]
  let rowToSave = value.rowToSave
  let key = rowToSave[def.database.dataIdField]
  if (!def.initialised) {
    initTableState(def, data, value.defId, state.ovl.uiState.isMobile)
  }
  if (key === undefined) {
    key = ovltemp + uuidv4()
  }
  if (key.indexOf(ovltemp) > -1) {
    data.data[key] = JSON.parse(JSON.stringify(rowToSave))
  }
  delete rowToSave[def.database.dataIdField]
  await TableEditSaveRowHelper(
    key,
    def,
    data,
    null,
    state,
    actions,
    rowToSave,
    value.noSnack
  )
}

export const TableEditSaveRow: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
  formState: FormState
}> = async ({ actions, state }, value) => {
  await TableEditSaveRowHelper(
    value.key,
    value.def,
    value.data,
    value.formState,
    state,
    actions
  )
}

const TableEditSaveRowHelper = async (
  key: string,
  def: TableDef,
  data: TableData,
  formState: FormState | null,
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  rowToSave?: {},
  noSnack?: boolean
) => {
  let rows = data.data
  let row = rows[key]
  // lets check if its an add or an update
  // we will only send updated cols in case of update
  let isAdd = key.startsWith(ovltemp)
  let hasFormState = formState !== null
  let newData
  if (hasFormState) {
    newData = Object.keys(formState.fields)
      .filter(
        (k) =>
          (formState.fields[k].dirty &&
            formState.fields[k].convertedValue !== row[k]) ||
          isAdd
      )
      .reduce((val: {}, k, i) => {
        val[k] = formState.fields[k].convertedValue
        return val
      }, {})
  } else {
    newData = rowToSave
  }
  let res: any = {}
  let fn = resolvePath(customFunctions, def.namespace)
  let saveRowFnName = FormCustomSave
  if (fn && fn[saveRowFnName]) {
    // ok there is a customSaveRow - Function
    await fn[saveRowFnName](
      {
        key,
        tableDef: def,
        newData,
      },
      state,
      actions,
      overmind.effects
    )
  } else {
    if (Object.keys(newData).length > 0) {
      if (hasFormState && def.options.filter.static) {
        let filterKeys = Object.keys(def.options.filter.static)
        if (isAdd) {
          filterKeys.map((m) => {
            newData[m] = def.options.filter.static[m]
          })
        }
      }

      let mode: SaveMode = "update"
      if (isAdd) {
        mode = "add"
      }
      let beforeSaveRowFnName = FormBeforeSave
      let fn = resolvePath(customFunctions, def.namespace)
      if (fn && fn[beforeSaveRowFnName]) {
        await fn[beforeSaveRowFnName](
          <BeforeSaveParam>{
            key,
            mode,
            tableDef: { def, data },
            row: newData,
          },
          state,
          actions,
          overmind.effects
        )
      }
      res = await postRequest(api.url + def.server.endpoint + "/" + mode, {
        lang: state.ovl.language.language,
        idField: def.database.dataIdField,
        idValue: key,
        insertMode: def.database.dbInsertMode,
        data: newData,
      })
      if (!res.data) {
        // 449 means offline in our context
        if (res.status === 449) {
          return
        }
        let saveErrorFnName = FormSaveError
        // handleError @@hook
        let fn = resolvePath(customFunctions, def.namespace)
        if (fn && fn[saveErrorFnName]) {
          await fn[saveErrorFnName](
            {
              key,
              def,
              data,
              res,
            },
            state,
            actions,
            overmind.effects
          )
        } else {
          if (hasFormState) {
            formState.valid = false
          }
          if (!noSnack) {
            SnackAdd(res.message, "Error", 10000)
          }
          if (
            (hasFormState && res.type === "UDTNameEmpty") ||
            res.type === "UDTNameUnique"
          ) {
            ValidationAddError(
              "UniqueKeyViolation",
              res.message,
              formState.fields["Name"].validationResult
            )
          }
        }
        return
      }

      def.uiState.currentlyAddingKey = undefined

      // handle the result dance
      let newId = res.data[def.database.dataIdField]
      if (isAdd) {
        // get the definitive id
        // update/create necessary objects for the table to work
        setTableRow({ def, data }, key, newId, res.data, false, actions)
        setRefresh({ def, data }, isAdd, res.data, key, null)
      } else {
        // just update the table data with all returned columns
        // set Refresh needs to be before setTableRow becuase it compares old/new data
        setRefresh({ def, data }, isAdd, res.data, key, null)
        setTableRow({ def, data }, key, newId, res.data, false, actions)
      }
      if (!noSnack) {
        SnackAdd("Datensatz gespeichert", "Success")
      }

      // afterSave @@hook
      let afterSaveFnName = FormAfterSave
      if (fn && fn[afterSaveFnName]) {
        await fn[afterSaveFnName](
          {
            key,
            def,
            data,
            res: res.data,
          },
          state,
          actions,
          overmind.effects
        )
      }
    }
    if (hasFormState) {
      actions.ovl.internal.SetFormUndirty(formState)
    }
    actions.ovl.table.TableEditClose({
      key,
      tableDef: def,
      data,
    })
  }
}

export const TableSelectCustomSort: Action<{
  id: string
  def: TableDef
}> = ({ actions }, value) => {
  if (value.def.options.sortCustom.selected !== value.id) {
    value.def.options.sortCustom.selected = value.id
  } else {
    value.def.options.sortCustom.selected = ""
  }
}

export const TableSelectColumnFilter: Action<{
  key: ColumnFilterTypes
  def: TableDef
  columnId: string
  othersCount: number
  filter: { [key: string]: ColumnFilterValue }
}> = ({ actions }, value) => {
  let key = value.key
  let def = value.def
  let columnId = value.columnId
  let filter = def.columns[columnId].filter
  value.def.options.filter.showSelected = false
  if (key === "@@ovl_all") {
    filter.enabled = false
    filter.selected = ""
    filter.isOthersSelected = false
    filter.filterValues = {}
  } else if (key === "@@ovl_others") {
    filter.enabled = true
    filter.othersCount = value.othersCount
    filter.isOthersSelected = true
    filter.selected = ""
    filter.filterValues = value.filter
  } else {
    filter.enabled = true
    filter.othersCount = 0
    filter.isOthersSelected = false
    filter.selected = key
    filter.filterValues = value.filter
  }
}

export const TableSelectCustomFilter: Action<{
  id: string
  def: TableDef
}> = ({ actions }, value) => {
  let def = value.def
  let id = value.id
  let filterCustom = def.options.filterCustom
  if (!filterCustom[id].active) {
    let isSingle = filterCustom[id].type === "single"
    // make sure only one filter in the "single" group is active
    if (isSingle) {
      Object.keys(def.options.filterCustom)
        .filter((k) => filterCustom[k].type === "single")
        .forEach((k) => {
          filterCustom[k].active = false
        })
    }
    value.def.options.filter.showSelected = false
    filterCustom[id].active = true
  } else {
    filterCustom[id].active = false
  }
}

export const TableEditClose: Action<{
  key: string
  tableDef: TableDef
  data: TableData
}> = ({ actions }, value) => {
  let editRow = value.tableDef.uiState.editRow
  if (editRow[value.key]) {
    editRow[value.key].selected = false
  }
  if (value.tableDef.options.edit.editType === "big") {
    actions.ovl.internal.StartCloseOverlay()
  }
}

export const TableEditRow: Action<{
  key: string
  def: TableDef
  data: TableData
}> = ({ actions }, value) => {
  // init editform explicitly with table values
  let def = value.def
  let instanceId = "trow" + def.id + value.key
  let columns = def.columns

  let formFields = getFormFieldsFromColumns(
    def,
    value.data.data[value.key],
    def.options.edit.editType !== "big"
  )

  let initForm: InitForm = {
    fields: formFields,
    formType: "TableRowEdit",
    instanceId,
    namespace: def.namespace,
    schema: value.data.schema,
    forceOverwrite: true,
  }
  actions.ovl.form.InitForm(initForm)
  let editRow = value.def.uiState.editRow
  editRow[value.key].selected = true
}

export const TableMoreRow: Action<{
  key: string
  def: TableDef
  data: TableData
}> = ({ actions }, value) => {
  actions.ovl.internal.TableSelectHeader({
    def: value.def,
    data: value.data,
    key: value.def.database.dataIdField,
  })
}

export const TableCopyRow: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
}> = async ({ state, actions, effects }, value) => {
  let def = value.def
  let key = value.key
  let rows = value.data.data
  let row = rows[value.key]
  let newRow = JSON.parse(JSON.stringify(row))
  Object.keys(def.options.copyColumnsIgnore).forEach((c) => {
    newRow[c] = null
  })
  // copyRow @@hook
  let copyFnName = FormCopy
  let fn = resolvePath(customFunctions, def.namespace)
  if (fn && fn[copyFnName]) {
    await fn[copyFnName](
      {
        key,
        newRow,
        def: value.def,
        data: value.data,
      },
      state,
      actions,
      effects
    )
  }
  let insertMode = value.def.database.dbInsertMode
  if (insertMode !== "Manual") {
    newRow[def.database.dataIdField] = ""
  }
  if (insertMode === "UDTAutoGUIDBoth" || insertMode === "UDTAutoNumberBoth") {
    newRow["Name"] = ""
  }

  setTableRow(
    { def: def, data: value.data },
    undefined,
    undefined,
    newRow,
    true,
    actions
  )
}

export const TableAddRow: AsyncAction<TableDataAndDef> = async (
  { actions, state, effects },
  value
) => {
  let def = value.def
  let newRow = Object.keys(def.columns).reduce((val, key) => {
    let column = def.columns[key]
    if (column) {
      // if there is a columnfilter us that value
      if (
        column.filter.enabled &&
        column.filter.filterValues[column.filter.selected]
      ) {
        val[key] = column.filter.filterValues[column.filter.selected].value
      } else {
        val[key] = ""
      }
      return val
    }
  }, {})

  // addRow (Default Values) @@hook
  let fn = resolvePath(customFunctions, def.namespace)
  let addFnName = FormAdd
  if (fn && fn[addFnName]) {
    await fn[addFnName](newRow, value, state, actions, effects)
  }
  let insertMode = value.def.database.dbInsertMode
  if (insertMode !== "Manual") {
    newRow[def.database.dataIdField] = ""
  }
  if (insertMode === "UDTAutoGUIDBoth" || insertMode === "UDTAutoNumberBoth") {
    if (!newRow["Name"]) {
      newRow["Name"] = ""
    }
  }
  setTableRow(value, undefined, undefined, newRow, true, actions)
  if (def.features.page) {
    let dataFilteredAndSorted = def.uiState.dataFilteredAndSorted
    let count = dataFilteredAndSorted.length
    def.uiState.rowsCount = count
    let paging = def.options.paging
    if (def.options.addedRowsPosition === "bottom") {
      let pages = Math.ceil(count / paging.pageSize) - 1
      paging.page = pages
      if (paging.page < 0) {
        paging.page = 0
      }
    } else {
      paging.page = 0
    }
  }
}

export const TableDeleteRow: AsyncAction<{
  key: string
  def: TableDef
  data: TableData
  isMass?: boolean
}> = async ({ actions, state, effects }, value) => {
  let def = value.def
  let key = value.key
  let cancel: boolean = false

  if (!value.isMass) {
    actions.ovl.dialog.OkCancelDialog({
      text: "Datensatz löschen?",
      default: 1,
    })
    if ((await DialogResult()) === 2) {
      cancel = true
    }
  }
  if (!cancel) {
    let res = await postRequest(api.url + def.server.endpoint + "/delete", {
      lang: state.ovl.language.language,
      idField: def.database.dataIdField,
      idValue: key,
      insertMode: def.database.dbInsertMode,
    })
    if (!res.data) {
      // handleError @@hook
      let fn = resolvePath(customFunctions, def.namespace)
      let deleteErrorFnName = FormDeleteError
      if (fn && fn[deleteErrorFnName]) {
        await fn[deleteErrorFnName](
          {
            key,
            tableDef: def,
            res: res.data,
          },
          state,
          actions,
          effects
        )
      }
      return
    }
    deleteTableRow({ def: def, data: value.data }, key)

    if (!value.isMass) {
      SnackAdd("Datensatz gelöscht", "Success")
    }
    if (!value.isMass) {
      selectLatestRow(def, value.data)
      let rows = value.data.data
      setPage(def, value.data, rows)
    }

    // afterDelete @@hook
    let fn = resolvePath(customFunctions, def.namespace)
    let afterDeleteFnName = FormAfterDelete
    if (fn && fn[afterDeleteFnName]) {
      await fn[afterDeleteFnName](
        {
          key,
          def: def,
          data: value.data,
          res: res.data,
        },
        state,
        actions,
        effects
      )
    }
  }
}

export const TableMultipleDeleteRow: AsyncAction<{
  def: TableDef
  data: TableData
}> = async ({ actions, state, effects }, value) => {
  let def = value.def
  let rows = value.data.data
  let data = value.data
  let deletedCounter = 0
  let cancel: boolean = false

  let canNotDeleteMsg = ""
  let selectedObjects = []
  let functionName = FormCanDelete
  let fn = null
  let fnc = resolvePath(customFunctions, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }
  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res = await fn(
            k,
            <TableDataAndDef>{ def: def, data: value.data },
            state,
            actions,
            effects
          )
          if (res) {
            canNotDeleteMsg +=
              "\n" + res + "\n(Id:" + rows[k][def.database.dataIdField] + ")"
          } else {
            selectedObjects.push(k)
          }
        } else {
          selectedObjects.push(k)
        }
      }
    })
  )
  await wait
  let doMsg = selectedObjects.length.toString() + " Datensätze löschen?"

  if (canNotDeleteMsg) {
    if (selectedObjects.length > 0) {
      canNotDeleteMsg =
        "Es können nicht alle Datensätze gelöscht werden:" +
        canNotDeleteMsg +
        "\n" +
        doMsg
    } else {
      canNotDeleteMsg =
        "Keine Datensätze zum Löschen gefunden:" + canNotDeleteMsg
    }
  } else {
    canNotDeleteMsg = doMsg
  }
  if (selectedObjects.length > 0) {
    actions.ovl.dialog.OkCancelDialog({
      text: canNotDeleteMsg,
      default: 1,
    })
  } else {
    actions.ovl.dialog.OkDialog({
      text: canNotDeleteMsg,
    })
  }

  if ((await DialogResult()) === 2 || selectedObjects.length === 0) {
    cancel = true
  }
  if (!cancel) {
    wait = Promise.all(
      selectedObjects.map(async (k) => {
        await actions.ovl.internal.TableDeleteRow({
          key: k,
          def: def,
          data: value.data,
          isMass: true,
        })
        if (!rows[k]) {
          deletedCounter++
        }
      })
    )
    await wait
    SnackAdd(
      deletedCounter.toString() + " Datensätze gelöscht...",
      "Information"
    )
    selectLatestRow(def, value.data)
    let rows2 = value.data.data
    setPage(def, value.data, rows2)
    actions.ovl.internal.TableSelectHeader({
      def: value.def,
      data: value.data,
      key: "",
    })
  }
}

export const TableMultipleCopyRow: AsyncAction<{
  def: TableDef
  data: TableData
}> = async ({ actions, state, effects }, value) => {
  let def = value.def
  let data = value.data
  let rows = value.data.data
  let cancel: boolean = false
  let canNotCopyMsg = ""
  let selectedObjects = []
  let functionName = FormCanCopy
  let fn = null
  let fnc = resolvePath(customFunctions, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }

  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res = await fn(
            k,
            <TableDataAndDef>{ def: def, data: value.data },
            state,
            actions,
            effects
          )
          if (res) {
            canNotCopyMsg +=
              "\n" + res + "\n(Id:" + rows[k][def.database.dataIdField] + ")"
          } else {
            selectedObjects.push(k)
          }
        } else {
          selectedObjects.push(k)
        }
      }
    })
  )
  await wait

  let doMsg = selectedObjects.length.toString() + " Datensätze duplizieren?"

  if (canNotCopyMsg) {
    if (selectedObjects.length > 0) {
      canNotCopyMsg =
        "Es können nicht alle Datensätze dupliziert werden:" +
        canNotCopyMsg +
        "\n" +
        doMsg
    } else {
      canNotCopyMsg =
        "Keine Datensätze zum Duplizieren gefunden:" + canNotCopyMsg
    }
  } else {
    canNotCopyMsg = doMsg
  }

  if (selectedObjects.length > 0) {
    actions.ovl.dialog.OkCancelDialog({
      text: canNotCopyMsg,
      default: 1,
    })
  } else {
    actions.ovl.dialog.OkDialog({
      text: canNotCopyMsg,
    })
  }

  if ((await DialogResult()) === 2 || selectedObjects.length === 0) {
    cancel = true
  }
  if (!cancel) {
    wait = Promise.all(
      selectedObjects.map(async (k) => {
        await actions.ovl.internal.TableCopyRow({
          key: k,
          def: def,
          data: value.data,
        })
      })
    )
    await wait
    SnackAdd("Datensätze zum Duplizieren vorbereitet", "Information")
    actions.ovl.internal.TableSelectHeader({
      def: def,
      data: value.data,
      key: "",
    })
  }
}

export const TableMultipleEditRow: AsyncAction<{
  def: TableDef
  data: TableData
}> = async ({ actions, state, effects }, value) => {
  let def = value.def
  let data = value.data
  let rows = value.data.data
  let cancel: boolean = false
  let canNotEditMsg = ""
  let selectedObjects = []
  let functionName = FormCanEdit
  let fn = null
  let fnc = resolvePath(customFunctions, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }
  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res = await fn(
            k,
            <TableDataAndDef>{ def: def, data: value.data },
            state,
            actions,
            effects
          )
          if (res) {
            canNotEditMsg +=
              "\n" + res + "\n(Id:" + rows[k][def.database.dataIdField] + ")"
          } else {
            selectedObjects.push(k)
          }
        } else {
          selectedObjects.push(k)
        }
      }
    })
  )
  await wait

  let doMsg = selectedObjects.length.toString() + " Datensätze editieren?"

  if (canNotEditMsg) {
    if (selectedObjects.length > 0) {
      canNotEditMsg =
        "Es können nicht alle Datensätze editiert werden:" +
        canNotEditMsg +
        "\n" +
        doMsg
    } else {
      canNotEditMsg = "Keine Datensätze zum Editieren gefunden:" + canNotEditMsg
    }
  } else {
    canNotEditMsg = doMsg
  }

  if (selectedObjects.length > 0) {
    actions.ovl.dialog.OkCancelDialog({
      text: canNotEditMsg,
      default: 1,
    })
  } else {
    actions.ovl.dialog.OkDialog({
      text: canNotEditMsg,
    })
  }

  if ((await DialogResult()) === 2 || selectedObjects.length === 0) {
    cancel = true
  }
  if (!cancel) {
    wait = Promise.all(
      selectedObjects.map(async (k) => {
        await actions.ovl.table.TableEditRow({
          key: k,
          def: def,
          data: value.data,
        })
      })
    )
    await wait
    SnackAdd("Datensätze zum Editieren vorbereitet", "Information")
    actions.ovl.internal.TableSelectHeader({
      def: def,
      data: value.data,
      key: "",
    })
  }
}
export const TableDeleteRowFromData: Action<{
  key: string
  def: TableDef
  data: TableData
}> = (_, value) => {
  let key = value.key
  let data = value.data.data
  delete data[key]
  let def = value.def
  let i = def.uiState.dataFilteredAndSorted.indexOf(key)
  def.uiState.dataFilteredAndSorted.splice(i, 1)
  delete def.uiState.selectedRow[key]
  delete def.uiState.editRow[key]
}
