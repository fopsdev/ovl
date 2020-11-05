import { postRequest } from "../../effects"
import {
  ovltemp,
  resolvePath,
  T,
  uuidv4,
  ovloffline,
  saveState,
  stringifyReplacer,
} from "../../global/globals"
import {
  FieldGetList,
  FormAdd,
  FormAfterDelete,
  FormAfterSave,
  FormBeforeSave,
  FormCanCopy,
  FormCanCustom,
  FormCanDelete,
  FormCanEdit,
  FormCopy,
  FormCustomSave,
  FormCustomSort,
  FormDeleteError,
  FormSaveError,
  FieldGetList_ReturnType,
  FieldGetList_Type,
  FormCustomSort_Type,
  FormCustomSort_ReturnType,
  FormCustomSave_Type,
  FormBeforeSave_Type,
  FormSaveError_Type,
  FormCopy_Type,
  FormAdd_Type,
  FormDeleteError_Type,
  FormAfterDelete_Type,
  FormCan_Type,
  FormCustomFn_Type,
  FormCan_ReturnType,
  FormAfterSave_Type,
} from "../../global/hooks"
import { OvlTableDefIds, OvlState, OvlActions, ovl } from "../../index"
import { OvlAction } from "../../ovlTypes"
import { DialogResult } from "../actions"
import { OvlFormState, InitForm } from "../forms/actions"
import { KeyValueListFromServerFn } from "../forms/Controls/helpers"
import { ValidationAddError } from "../Forms/helper"
import {
  DialogOk,
  SnackAdd,
  SnackTrackedAdd,
  SnackTrackedRemove,
} from "../helpers"
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
  addRowPage,
  addRowDefInit,
} from "../Table/helpers"
import { deleteTableRow /*setTableRow*/ } from "./Helpers"
import {
  BeforeSaveParam,
  ColumnFilterTypes,
  ColumnFilterValue,
  FilterClick,
  HeaderClick,
  ListFnReturnValue,
  Paging,
  SaveMode,
  SelectedCustomFunctionResult,
  SelectRowDef,
  SortClick,
  OvlTableData,
  TableDataAndDef,
  OvlTableDef,
  Tabs,
  SelectedEditRow,
} from "./Table"
import { OvlConfig } from "../../config"

const minimumFilterChars = 3

export const TableSetPage: OvlAction<{ paging: Paging; page: number }> = (
  pageDef
) => {
  if (pageDef.page > -1) {
    pageDef.paging.page = pageDef.page
  }
}

export const TableClearFilter: OvlAction<TableDataAndDef> = (
  value,
  { actions }
) => {
  let def = value.def
  if (def.uiState.filter.showSelected) {
    def.uiState.filter.showSelected = false
  } else {
    def.uiState.filter.value = ""
  }
  def.uiState.headerSelected = ""
  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableFilterSelected: OvlAction<TableDataAndDef> = (
  value,
  { actions }
) => {
  let def = value.def
  def.uiState.filter.showSelected = !def.uiState.filter.showSelected
  actions.ovl.internal.TableSetPage({
    paging: value.def.uiState.paging,
    page: 0,
  })
  actions.ovl.table.TableRefresh({ defId: def.id, data: value.data })
}

export const TableSelectHeader: OvlAction<HeaderClick> = (
  def,
  { actions, state }
) => {
  def.def.uiState.headerSelected = def.key
  // if (def.key === "") {
  //   state.ovl.dialogs.TableHeaderMenu.isClosing = true
  // }
}

export const TableSort: OvlAction<SortClick> = (value, { actions }) => {
  let def = value.def
  def.uiState.headerSelected = ""
  def.uiState.sort.field = value.key
  if (value.ascending) {
    def.uiState.sort.direction = "asc"
  } else {
    def.uiState.sort.direction = "desc"
  }
  def.uiState.sortCustom.selected = ""
  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableFilter: OvlAction<FilterClick> = (value, { actions }) => {
  let def = value.def
  def.uiState.headerSelected = ""
  def.uiState.filter.value = value.value
  def.uiState.filter.showSelected = false

  if (value.def.features.page) {
    actions.ovl.internal.TableSetPage({
      paging: value.def.uiState.paging,
      page: 0,
    })
  }
  actions.ovl.table.TableRefresh({ defId: value.def.id, data: value.data })
}

export const TableSelectAll: OvlAction<{
  tableDef: OvlTableDef
  data: OvlTableData
  select: boolean
}> = (def, { actions }) => {
  if (!def.select) {
    def.tableDef.uiState.headerSelected = ""
  }
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

export const TableSetViewTab: OvlAction<{ def: Tabs; key: string | number }> = (
  value
) => {
  value.def.view.selected = value.key
}

export const TableSelectRow: OvlAction<SelectRowDef> = (selectRow) => {
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

export const TableViewRefresh: OvlAction<TableDataAndDef> = (
  value,
  { actions }
) => {
  actions.ovl.table.TableRefresh({
    defId: value.def.id,
    data: value.data,
  })
}

export const TableRefreshDataFromServer: OvlAction<{
  def: OvlTableDef
  data: OvlTableData
  localData?: {}
}> = async (value, { state, actions, effects }) => {
  let def = value.def
  let data = value.data.data

  // try {
  //   actions.ovl.internal.TableOfflineHandler({
  //     data: value.data,
  //     defId: value.def.id,
  //     key: undefined,
  //   })
  // } catch (e) {
  //   SnackAdd(
  //     "Data could not be refreshed for table: " +
  //       def.id +
  //       ", because there was offline data which could not be saved",
  //     "Error"
  //   )
  //   return
  // }

  // offline flag is handled separately
  // so as long as we are offline there will be no refresh
  // thats a good idea because there could be offline data which first needs to be persisted back before refreshing data
  if (
    !value.localData &&
    state.ovl.app.offline &&
    OvlConfig._system.OfflineMode
  ) {
    return
  }

  let schema = value.data.schema
  let getSchema = false
  let res
  if (!value.localData) {
    if (def.dataFetching.useSchema && Object.keys(schema).length === 0) {
      getSchema = true
    }

    let url = state.ovl.apiUrl + def.server.endpoint + "/get"
    let postData = {
      lang: state.ovl.language.language,
      getSchema,
      insertMode: def.database.dbInsertMode,
    }

    res = await effects.ovl.postRequest(url, postData)
    // sync needsRefresh with eventually other tables
  } else {
    res = { data: { data: value.localData } }
  }
  if (!res.data || !res.data.data) {
    return
  }

  let idfield = def.database.dataIdField
  let serverData: [] = res.data.data
  // create hashsets for faster processing...
  let keysFromServer = new Map<string, number>()

  serverData.forEach((f, i) => {
    keysFromServer.set(f[idfield], i)
  })
  let localData = value.data.data
  let localKeys = new Map<string, string>()

  Object.keys(localData).forEach((f) => {
    localKeys.set(localData[f][idfield], f)
  })
  let needsRefresh = false
  // check if rows were added meanwhile
  let keysArrayFromServer = Array.from(keysFromServer.keys())
  needsRefresh = keysArrayFromServer.some((k) => !localKeys.has(k))
  // delete check is not needed its handled by design
  // check if rows were deleted meanwhile
  let rowsDeleted = false
  Array.from(localKeys.keys()).forEach((k) => {
    if (!keysFromServer.has(k)) {
      rowsDeleted = true
      deleteTableRow({ def: value.def, data: value.data }, localKeys.get(k))
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
  //console.log(dataFieldsToLookups)

  if (res.data.schema && Object.keys(res.data.schema).length > 0) {
    value.data.schema = res.data.schema
  }
  schema = value.data.schema

  keysArrayFromServer.forEach((k) => {
    let dataKey = localKeys.get(k)
    if (!dataKey) {
      dataKey = uuidv4()
      localData[dataKey] = {}
    }
    let i = keysFromServer.get(k)
    // add a copy of the code field as well... (to support case when user changes db idfield)
    let sd = serverData[i]
    localData[dataKey]["_ovl" + idfield] = sd[idfield]
    value.data.index[sd[idfield] as string] = dataKey
    Object.keys(sd).forEach(async (c) => {
      localData[dataKey][c] = serverData[i][c]
      // check for lookups which needs to be refreshed/reloaded
      if (dataFieldsToLookups[c]) {
        // its a lookup column, also check if lookup description is available
        let lookupDefKey = dataFieldsToLookups[c]
        let lookupColumnDef = def.columns[lookupDefKey]
        let functionName = FieldGetList.replace("%", lookupDefKey)
        let fn = resolvePath(actions.custom, def.namespace)
        if (!fn || !fn[functionName]) {
          console.error(
            "ovl needs a function: " +
              functionName +
              " to be defined in customFunctions at: " +
              def.namespace
          )
        }
        let listdata: FieldGetList_ReturnType = fn[functionName]({
          row: serverData[i],
        } as FieldGetList_Type)

        let value = localData[dataKey][c]
        let listValueFound = true
        if (listdata.data && value && !listdata.data[value]) {
          listValueFound = false
        }
        if (!listValueFound) {
          console.error("lookups need refresh for")
          console.error(value)
          await KeyValueListFromServerFn(
            state,
            lookupColumnDef.list,
            listdata,
            "",
            serverData[i],
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
                  : c) +
                " nicht gefunden...",
              "Warning"
            )
          }
        }
      }
    })
  })
  if (rowsDeleted) {
    setPage(value.data)
  }

  value.data.timestamp = Date.now()
}

export const TableInit: OvlAction<{
  defId: OvlTableDefIds
  data: OvlTableData
  clearData?: boolean
  keepFilters?: boolean
  keepSorting?: boolean
}> = async (value, { actions, state }) => {
  let dataAndState = value.data
  let def = dataAndState.tableDef[value.defId]

  initTableState(def, dataAndState, value.defId, state.ovl.uiState.isMobile)
  def.initialised = true
  if (value.clearData) {
    // set default values
    dataAndState.index = {}
    dataAndState.offline = {
      addedKeys: {},
      deletedKeys: {},
      errors: {},
      updatedKeys: {},
    }
    dataAndState.offlineSeq = 0
    dataAndState.timestamp = 0
    dataAndState.data = {}
  }
  def.uiState.currentlyAddingKey = undefined
  def.uiState.dataFilteredAndSorted = []
  def.uiState.editRow = {}
  def.uiState.headerSelected = ""
  def.uiState.needsRefresh = false
  def.uiState.rowsCount = 0
  def.uiState.selectedRow = {}
  def.uiState.viewRow = {}
  def.uiState.paging = JSON.parse(JSON.stringify(def.options.initial_paging))

  if (value.keepSorting === undefined || value.keepSorting === false) {
    def.uiState.sort = JSON.parse(JSON.stringify(def.options.initial_sort))
    def.uiState.sortCustom = JSON.parse(
      JSON.stringify(def.options.initial_sortCustom)
    )
  }
  if (value.keepFilters === undefined || value.keepFilters === false) {
    def.uiState.filter = JSON.parse(JSON.stringify(def.options.initial_filter))
    def.uiState.filterCustom = JSON.parse(
      JSON.stringify(def.options.initial_filterCustom)
    )
  }
}

export const TableRefresh: OvlAction<{
  ignoreRefreshedMessageSnack?: boolean
  refreshServerDataIfOlderThan?: number
  forceServerDataRefresh?: boolean
  localData?: {}
  defId: OvlTableDefIds
  data: OvlTableData
}> = async (value, { actions, state, effects }) => {
  let dataAndState = value.data
  let def = dataAndState.tableDef[value.defId]

  initTableState(def, dataAndState, value.defId, state.ovl.uiState.isMobile)
  // if (!value.localData && !def.server.endpoint) {
  //   def.initialised = true
  //   return
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

  if (
    !def.dataFetching.useCustomDataFetching &&
    (def.server.endpoint || value.localData)
  ) {
    await TableRefreshServerData(
      def,
      dataAndState,
      actions,
      forceServerDataRefresh,
      value.localData
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

export const TableRebuild: OvlAction<{
  snackId: string
  defId: string
  data: OvlTableData
}> = async (value, { actions, state, effects }) => {
  let snackId = value.snackId
  let def = <OvlTableDef>value.data.tableDef[value.defId]
  let data = value.data.data
  let lang = state.ovl.language.language
  try {
    let customSortFn = undefined
    let sortCustom = def.uiState.sortCustom
    let fn = resolvePath(actions.custom, def.namespace)
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
    const sortfield = def.uiState.sort.field

    const ascending = def.uiState.sort.direction === "asc" ? 1 : -1
    let res: number = 0
    restable = restable.sort((a, b) => {
      if (customSortFn !== undefined) {
        return <FormCustomSort_ReturnType>(
          customSortFn(<FormCustomSort_Type>{ def, lang, a, b, data })
        )
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
          mode: undefined,
        }
      }
      let viewRow = def.uiState.viewRow
      if (!viewRow[k]) {
        viewRow[k] = { selected: false }
      }
    })
    def.uiState.rowsCount = restable.length
    if (def.features.page) {
      let paging = def.uiState.paging
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

export const TableOfflineRetrySaveRow: OvlAction<
  {
    data: OvlTableData
    defId: OvlTableDefIds
    rowToSave: {}
    key: string
  },
  Promise<string>
> = async (value, { state, actions }) => {
  let data = value.data
  let def = data.tableDef[value.defId]
  let rowToSave = value.rowToSave
  let key = value.key

  return await TableEditSaveRowHelper(
    key,
    def,
    data,
    null,
    state,
    actions,
    rowToSave,
    true,
    true
  )
}

export const TableDirectSaveRow: OvlAction<{
  data: OvlTableData
  defId: OvlTableDefIds
  rowToSave: {}
  noSnack?: boolean
}> = async (value, { state, actions }) => {
  let data = value.data
  let def = data.tableDef[value.defId]
  let rowToSave = value.rowToSave
  let rowId = rowToSave[def.database.dataIdField]
  let key
  if (rowId === undefined) {
    key = uuidv4()
    rowId = ovltemp + key
    rowToSave[def.database.dataIdField] = rowId
    rowToSave["_ovl" + def.database.dataIdField] = rowId
  }
  let rows = data.data
  if (!key) {
    key = Object.keys(rows).filter(
      (f) => rows[f][def.database.dataIdField] === rowId
    )[0]
  }
  if (!rowToSave["_ovl" + def.database.dataIdField]) {
    rowToSave["_ovl" + def.database.dataIdField] =
      rowToSave[def.database.dataIdField]
  }
  if (!def.initialised) {
    initTableState(def, data, value.defId, state.ovl.uiState.isMobile)
  }
  if (rowId.indexOf(ovltemp) > -1) {
    data.data[key] = JSON.parse(JSON.stringify(rowToSave), stringifyReplacer)
  }
  //delete rowToSave[def.database.dataIdField]
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

export const TableEditSaveRow: OvlAction<
  {
    key: string
    def: OvlTableDef
    data: OvlTableData
    formState: OvlFormState
  },
  Promise<string>
> = async (value, { actions, state }) => {
  return await TableEditSaveRowHelper(
    value.key,
    value.def,
    value.data,
    value.formState,
    state,
    actions
  )
}

const EditSaveRowOfflineHelper = (
  def: OvlTableDef,
  data: OvlTableData,
  rowCopy: any,
  res: any,
  newData: any,
  isAdd: boolean,
  rowid: string,
  key: string
) => {
  res.data = rowCopy
  Object.keys(newData).forEach((k) => {
    res.data[k] = newData[k]
  })
  //TableOfflineEnsureState(data)
  if (isAdd) {
    // its an add
    let newRowId = rowid.replace(ovltemp, ovloffline)
    res.data[def.database.dataIdField] = newRowId
    res.data["_ovl" + def.database.dataIdField] = newRowId
    if (def.database.dbInsertMode.lastIndexOf("Both") > -1) {
      res.data.Name = newRowId
    }
    let addedKeys = data.offline.addedKeys
    data.offlineSeq++
    addedKeys[key] = data.offlineSeq
  } else {
    // its an update
    // so just flag the used columns
    let updatedKeys = data.offline.updatedKeys
    // if its an offline key it will be handled by add already
    if (key.indexOf(ovloffline) < 0) {
      if (!updatedKeys[key]) {
        data.offlineSeq++
        updatedKeys[key] = { columns: {}, timestamp: data.offlineSeq }
      }
      Object.keys(newData).forEach((k) => {
        updatedKeys[key].columns[k] = true
      })
    }
  }
  TablesNeedsRefresh(data)
  //saveState(true, "OffMode")
}

const TablesNeedsRefresh = (data: OvlTableData) => {
  let tableDef = data.tableDef
  Object.keys(tableDef).forEach((k) => {
    let d: OvlTableDef = tableDef[k]
    if (
      d.uiState.sort.field ||
      d.uiState.sortCustom.selected ||
      d.uiState.filter.value ||
      Object.keys(d.uiState.filterCustom).length > 0
    )
      d.uiState.needsRefresh = true
  })
}

const TableEditSaveRowHelper = async (
  key: string,
  def: OvlTableDef,
  data: OvlTableData,
  formState: OvlFormState | null,
  state: OvlState,
  actions: OvlActions,
  rowToSave?: {},
  noSnack?: boolean,
  isOfflineRetry?: boolean
): Promise<string> => {
  let rows = data.data
  let row = rows[key]
  let fn = resolvePath(actions.custom, def.namespace)
  let rowId = row["_ovl" + def.database.dataIdField]
  let isAdd = !!(
    rowId.indexOf(ovltemp) > -1 ||
    (isOfflineRetry && rowId.indexOf(ovloffline) > -1)
  )

  if (!isOfflineRetry) {
    if (data.offline) {
      delete data.offline.errors[key]
    }
  }

  let hasFormState = formState !== null
  let newData
  if (hasFormState) {
    newData = Object.keys(formState.fields)
      .filter((k) => {
        return (
          (formState.fields[k].dirty &&
            formState.fields[k].convertedValue !== row[k]) ||
          isAdd
        )
      })
      .reduce((val: {}, k, i) => {
        val[k] = formState.fields[k].convertedValue
        return val
      }, {})
  } else {
    newData = rowToSave
  }
  if (!newData || Object.keys(newData).length === 0) {
    // there is nothing to update...
    return key
  }
  if (!newData[def.database.dataIdField]) {
    newData[def.database.dataIdField] = rowId
  }
  if (!newData["_ovl" + def.database.dataIdField]) {
    newData["_ovl" + def.database.dataIdField] = rowId
  }
  if (def.database.dbInsertMode.lastIndexOf("Both") > -1) {
    newData.Name = rowId
  }
  let newId
  let res: any = {}

  let saveRowFnName = FormCustomSave
  if (fn && fn[saveRowFnName]) {
    // ok there is a customSaveRow - Function
    await fn[saveRowFnName](<FormCustomSave_Type>{
      key,
      tableDef: def,
      newData,
      isOfflineRetry,
    })
  } else {
    if (Object.keys(newData).length > 0) {
      if (hasFormState && def.uiState.filter.static) {
        let filterKeys = Object.keys(def.uiState.filter.static)
        if (isAdd) {
          filterKeys.map((m) => {
            newData[m] = def.uiState.filter.static[m]
          })
        }
      }

      let mode: SaveMode = "update"
      if (isAdd) {
        mode = "add"
      }
      let beforeSaveRowFnName = FormBeforeSave
      //let fn = resolvePath(actions.custom, def.namespace)
      if (fn && fn[beforeSaveRowFnName]) {
        await fn[beforeSaveRowFnName](<FormBeforeSave_Type>{
          key,
          mode,
          tableDef: { def, data },
          row: newData,
          isOfflineRetry,
        })
      }
      let offlineHandled = false
      if (!isAdd && rowId.indexOf(ovloffline) > -1) {
        // its an update on a offline row so just ignore the server part
        // the offline handler will take car on addinge the row with all the updates
        let destRow = data.data[key]
        //rows[newId] = newData
        Object.keys(newData).forEach((k) => {
          destRow[k] = newData[k]
        })
        offlineHandled = true
        if (
          OvlConfig._system.OfflineMode &&
          !isOfflineRetry &&
          data.offline &&
          !state.ovl.app.offline
        ) {
          await actions.ovl.internal.TableOfflineHandler({
            data,
            defId: def.id,
            key,
          })
          // if this row now has an offline error just return
          if (data.offline.errors[key]) {
            if (hasFormState) {
              formState.valid = false
            }
            return
          }
        }
      }
      if (!offlineHandled) {
        let rowCopy = JSON.parse(JSON.stringify(newData), stringifyReplacer)
        if (
          state.ovl.app.offline &&
          OvlConfig._system.OfflineMode &&
          !isOfflineRetry
        ) {
          EditSaveRowOfflineHelper(
            def,
            data,
            rowCopy,
            res,
            newData,
            isAdd,
            rowId,
            key
          )
        } else {
          let oldid = newData["_ovl" + def.database.dataIdField]
          delete newData["_ovl" + def.database.dataIdField]
          try {
            if (def.server.endpoint) {
              res = await postRequest(
                state.ovl.apiUrl + def.server.endpoint + "/" + mode,
                {
                  lang: state.ovl.language.language,
                  idField: def.database.dataIdField,
                  idValue: rowId,
                  insertMode: def.database.dbInsertMode,
                  data: newData,
                  customId: ovl.state.ovl.user.clientId,
                },
                false,
                noSnack
              )
            } else {
              res.data = newData
            }
          } catch (e) {
            newData["_ovl" + def.database.dataIdField] = oldid
            throw e
          }
          if (res.data) {
            state.ovl.app.offline = false
            newId = res.data[def.database.dataIdField]
          }
          let idtowrite = newId
          if (!idtowrite) {
            idtowrite = oldid
          }
          newData["_ovl" + def.database.dataIdField] = idtowrite

          if (!res.data) {
            // 449 means offline in our context
            if (res.status === 449) {
              // handle offline
              if (OvlConfig._system.OfflineMode) {
                if (!isOfflineRetry) {
                  EditSaveRowOfflineHelper(
                    def,
                    data,
                    rowCopy,
                    res,
                    newData,
                    isAdd,
                    rowId,
                    key
                  )
                } else {
                  // if its offlineRetry don't do anything in case of offline error (elsewise the same data will be tried to be added again for offline handling)
                  return
                }
              }
            }
            // it wasn't the offline case so lets do some proper error handling
            else {
              // for sure make formState invalid so the user cannot continue
              // feel free to set it to true in your customErrorHandler
              if (hasFormState) {
                formState.valid = false
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
              let saveErrorFnName = FormSaveError
              // handleError @@hook
              let fn = resolvePath(actions.custom, def.namespace)
              let throwError = true
              if (fn && fn[saveErrorFnName]) {
                throwError = !(await fn[saveErrorFnName](<FormSaveError_Type>{
                  key,
                  def,
                  data,
                  res,
                  formState,
                  isAdd,
                  isOfflineRetry,
                }))
              }
              if (throwError) {
                throw {
                  status: res.status,
                  message: res.message,
                  key,
                }
              }
              return
            }
          }
        }
        // handle the result dance
        //newId = res.data[def.database.dataIdField]

        let destRow = data.data[key]
        //rows[newId] = newData
        Object.keys(res.data).forEach((k) => {
          destRow[k] = res.data[k]
        })
        destRow["_ovl" + def.database.dataIdField] =
          res.data[def.database.dataIdField]

        def.uiState.currentlyAddingKey = undefined
      }
      // keep index up to date

      let rowId2 = data.data[key]["_ovl" + def.database.dataIdField]
      if (rowId !== rowId2) {
        // key changed so lets update index
        delete data.index[rowId]
      }
      data.index[rowId2] = key

      TablesNeedsRefresh(data)

      if (!noSnack) {
        SnackAdd("Datensatz gespeichert", "Success")
      }

      // afterSave @@hook
      let afterSaveFnName = FormAfterSave
      if (fn && fn[afterSaveFnName]) {
        await fn[afterSaveFnName]({
          key,
          def,
          data,
          res: res.data,
          isOfflineRetry,
        } as FormAfterSave_Type)
      }
    }
    if (hasFormState) {
      actions.ovl.internal.SetFormUndirty(formState)
    }
  }
  return newId
}

export const TableOfflineHandler: OvlAction<
  { data: OvlTableData; defId: OvlTableDefIds; key: string },
  Promise<{ newKey: string }>
> = async (value, { state, actions }) => {
  if (
    !state.ovl.uiState.isReady ||
    !value.data.offline ||
    !value.data.tableDef[value.defId].initialised
  ) {
    return
  }
  //let lastRetry = state.ovl.app.offlineLastRetry
  let newKey
  let dn = Date.now()
  if (!state.ovl.app.offline /* || !lastRetry || dn - lastRetry > 40000 */) {
    //state.ovl.app.offlineLastRetry = dn
    let data = value.data
    let defId = value.defId
    let key = value.key
    let deletedKeys = data.offline.deletedKeys
    let errors = data.offline.errors

    let deletedKeysKeys = Object.keys(deletedKeys)
    let i = 0
    while (i < deletedKeysKeys.length) {
      let k = deletedKeysKeys[i]
      try {
        if (
          await actions.ovl.internal.TableOfflineRetryDeleteRow({
            data,
            defId,
            key: k,
          })
        ) {
          delete deletedKeys[k]
        }
      } catch (e) {
        OfflineHandlerErrorHelper(e, errors)
      }
      i++
    }

    let addedKeys = data.offline.addedKeys
    let addedKeysKeys = Object.keys(addedKeys)
    let updatedKeys = data.offline.updatedKeys
    let updatedKeysKeys = Object.keys(updatedKeys)
    let addAndUpdateSequence: {
      type: string
      key: string
      timestamp: number
    }[] = []
    addedKeysKeys.forEach((f) => {
      addAndUpdateSequence.push({
        type: "add",
        key: f,
        timestamp: addedKeys[f],
      })
    })
    updatedKeysKeys.forEach((f) => {
      addAndUpdateSequence.push({
        type: "update",
        key: f,
        timestamp: updatedKeys[f].timestamp,
      })
    })
    addAndUpdateSequence.sort((a, b) => a.timestamp - b.timestamp)
    i = 0
    while (i < addAndUpdateSequence.length) {
      let e = addAndUpdateSequence[i]
      let k = e.key
      if (e.type === "add") {
        let resKey
        try {
          resKey = await actions.ovl.internal.TableOfflineRetrySaveRow({
            data,
            defId,
            rowToSave: data.data[k],
            key: k,
          })
        } catch (e) {
          OfflineHandlerErrorHelper(e, errors)
        }
        if (resKey) {
          delete addedKeys[k]
        }
      } else {
        let resKey
        try {
          let rowToSave = {}
          Object.keys(updatedKeys[k].columns).forEach((f) => {
            rowToSave[f] = data.data[k][f]
          })
          resKey = await actions.ovl.internal.TableOfflineRetrySaveRow({
            data,
            defId,
            rowToSave,
            key: k,
          })
        } catch (e) {
          OfflineHandlerErrorHelper(e, errors)
        }
        if (resKey) {
          delete updatedKeys[k]
        }
      }
      i++
    }
  }
  return { newKey }
}

const OfflineHandlerErrorHelper = (e: any, errors: any) => {
  let err: [] = errors[e.key]
  let msg: string = e.message
  if (!err) {
    err = []
    errors[e.key] = err
  }
  if (err.indexOf(<never>msg) < 0) {
    err.push(<never>msg)
  }
}

export const TableSelectCustomSort: OvlAction<{
  id: string
  def: OvlTableDef
}> = (value) => {
  value.def.uiState.headerSelected = ""
  if (value.def.uiState.sortCustom.selected !== value.id) {
    value.def.uiState.sortCustom.selected = value.id
  } else {
    value.def.uiState.sortCustom.selected = ""
  }
}

export const TableSelectColumnFilter: OvlAction<{
  key: ColumnFilterTypes
  def: OvlTableDef
  columnId: string
  othersCount: number
  filter: { [key: string]: ColumnFilterValue }
}> = (value) => {
  let key = value.key
  let def = value.def
  let columnId = value.columnId
  let filter = def.columns[columnId].filter
  def.uiState.headerSelected = ""
  value.def.uiState.filter.showSelected = false
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

export const TableSelectCustomFilter: OvlAction<{
  id: string
  def: OvlTableDef
}> = (value) => {
  let def = value.def
  let id = value.id
  let filterCustom = def.uiState.filterCustom
  def.uiState.headerSelected = ""
  if (!filterCustom[id].active) {
    let isSingle = filterCustom[id].type === "single"
    // make sure only one filter in the "single" group is active
    if (isSingle) {
      Object.keys(def.uiState.filterCustom)
        .filter((k) => filterCustom[k].type === "single")
        .forEach((k) => {
          filterCustom[k].active = false
        })
    }
    value.def.uiState.filter.showSelected = false
    filterCustom[id].active = true
  } else {
    filterCustom[id].active = false
  }
}

export const TableEditClose: OvlAction<{
  key: string
  tableDef: OvlTableDef
  data: OvlTableData
}> = (value, { actions }) => {
  let editRow = value.tableDef.uiState.editRow
  if (editRow[value.key]) {
    editRow[value.key].selected = false
    editRow[value.key].mode = undefined
  }
}

export const TableEditRow: OvlAction<{
  key: string
  def: OvlTableDef
  data: OvlTableData
}> = (value, { actions }) => {
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
  if (editRow[value.key].mode === undefined) {
    editRow[value.key].mode = "edit"
  }
}

export const TableMoreRow: OvlAction<{
  key: string
  def: OvlTableDef
  data: OvlTableData
}> = (value, { actions }) => {
  actions.ovl.internal.TableSelectHeader({
    def: value.def,
    data: value.data,
    key: value.def.database.dataIdField,
  })
}

export const TableViewRow: OvlAction<{
  key: string
  def: OvlTableDef
  data: OvlTableData
}> = (value) => {
  let def = value.def
  def.uiState.viewRow[value.key].selected = true
}
export const TableCloseViewRow: OvlAction<{
  key: string
  def: OvlTableDef
}> = (value) => {
  let def = value.def

  def.uiState.viewRow[value.key].selected = false
}

export const TableCopyRow: OvlAction<{
  key: string
  def: OvlTableDef
  data: OvlTableData
}> = async (value, { state, actions, effects }) => {
  let def = value.def
  let key = value.key
  let rows = value.data.data
  let row = rows[value.key]
  let newRow = JSON.parse(JSON.stringify(row), stringifyReplacer)
  Object.keys(def.options.copyColumnsIgnore).forEach((c) => {
    newRow[c] = null
  })
  // copyRow @@hook

  let copyFnName = FormCopy

  let fn = resolvePath(actions.custom, def.namespace)

  if (fn && fn[copyFnName]) {
    await fn[copyFnName](<FormCopy_Type>{
      key,
      newRow,
      tableDef: def,
      tableData: value.data,
    })
  }
  let insertMode = value.def.database.dbInsertMode
  let newId = uuidv4()
  if (insertMode !== "Manual") {
    newRow[def.database.dataIdField] = ovltemp + newId
  }
  newRow["_ovl" + def.database.dataIdField] = newRow[def.database.dataIdField]

  if (insertMode === "UDTAutoGUIDBoth" || insertMode === "UDTAutoNumberBoth") {
    newRow["Name"] = newRow[def.database.dataIdField]
  }
  value.data.data[newId] = newRow

  addRowDefInit(value.data.tableDef, newId, "copy")
  actions.ovl.internal.TableEditRow({ key: newId, def, data: value.data })
  addRowPage(def)
}

export const TableAddRow: OvlAction<TableDataAndDef> = async (
  value,
  { actions, state, effects }
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
  let fn = resolvePath(actions.custom, def.namespace)
  let addFnName = FormAdd
  if (fn && fn[addFnName]) {
    await fn[addFnName](<FormAdd_Type>{
      newRow,
      tableDef: def,
      tableData: value.data,
    })
  }
  let insertMode = value.def.database.dbInsertMode
  let newId = uuidv4()
  if (insertMode !== "Manual") {
    newRow[def.database.dataIdField] = ovltemp + newId
  }
  newRow["_ovl" + def.database.dataIdField] = newRow[def.database.dataIdField]
  if (insertMode === "UDTAutoGUIDBoth" || insertMode === "UDTAutoNumberBoth") {
    if (!newRow["Name"]) {
      newRow["Name"] = newRow[def.database.dataIdField]
    }
  }
  value.data.data[newId] = newRow

  addRowDefInit(value.data.tableDef, newId, "add")
  actions.ovl.internal.TableEditRow({ key: newId, def, data: value.data })
  addRowPage(def)
  def.uiState.currentlyAddingKey = newId
}

export const TableOfflineRetryDeleteRow: OvlAction<
  {
    data: OvlTableData
    defId: OvlTableDefIds
    key: string
  },
  Promise<boolean>
> = async (value, { actions }) => {
  let data = value.data

  let def = data.tableDef[value.defId]
  let offlineKey = value.key
  let key = value.data.offline.deletedKeys[offlineKey]

  return await actions.ovl.table.TableDeleteRow({
    key,
    def,
    data,
    isOfflineRetry: true,
    offlineKey,
  })
}

const DeleteRowOfflineHelper = (
  data: OvlTableData,
  idValue: string,
  key: string
) => {
  //TableOfflineEnsureState(data)
  let deletedKeys = data.offline.deletedKeys
  // if its an offline key no delete necessary
  if (idValue.indexOf(ovloffline) < 0) {
    deletedKeys[idValue] = key
  }
  // its a record that was added before in offline mode...so just remove it from the add list (did not hit the server yet)
  delete data.offline.addedKeys[key]
  // any offline updates are now obsolete as well
  delete data.offline.updatedKeys[key]

  //saveState(true, "OffMode")
}

export const TableDeleteRow: OvlAction<
  {
    key: string
    def: OvlTableDef
    data: OvlTableData
    isMass?: boolean
    isOfflineRetry?: boolean
    offlineKey?: string
  },
  Promise<boolean>
> = async (value, { actions, state, effects }) => {
  let def = value.def
  let key = value.key
  let cancel: boolean = false

  if (!value.isMass && !value.isOfflineRetry) {
    actions.ovl.dialog.OkCancelDialog({
      text: "Datensatz löschen?",
      default: 1,
    })
    if ((await DialogResult()) === 2) {
      cancel = true
    }
  }

  if (!cancel) {
    let idValue = value.offlineKey
    if (!idValue) {
      idValue = value.data.data[key]["_ovl" + def.database.dataIdField]
    }

    // if id values is a offilione key...cleanup offline state and just return
    let offlineState = value.data.offline
    let offlineHandled = false
    if (idValue.indexOf(ovloffline) > -1 && offlineState) {
      delete offlineState.addedKeys[key]
      delete offlineState.updatedKeys[key]
      offlineHandled = true
    }
    let res = { data: undefined, status: undefined, type: undefined }
    if (!offlineHandled) {
      if (
        OvlConfig._system.OfflineMode &&
        !value.isOfflineRetry &&
        state.ovl.app.offline
      ) {
        DeleteRowOfflineHelper(value.data, idValue, key)
      } else {
        res = await postRequest(
          state.ovl.apiUrl + def.server.endpoint + "/delete",
          {
            lang: state.ovl.language.language,
            idField: def.database.dataIdField,
            idValue,
            insertMode: def.database.dbInsertMode,
            customId: ovl.state.ovl.user.clientId,
          }
        )
        if (res.data || res.type === "RecordNotFound") {
          state.ovl.app.offline = false
        }
        if (!res.data && res.type !== "RecordNotFound") {
          // 449 means offline in our context
          if (res.status === 449) {
            if (OvlConfig._system.OfflineMode) {
              if (!value.isOfflineRetry) {
                DeleteRowOfflineHelper(value.data, idValue, key)
              } else {
                return
              }
            }
          } else {
            // handleError @@hook
            let fn = resolvePath(actions.custom, def.namespace)
            let deleteErrorFnName = FormDeleteError
            if (fn && fn[deleteErrorFnName]) {
              await fn[deleteErrorFnName](<FormDeleteError_Type>{
                key,
                tableDef: def,
                res: res.data,
                isOfflineRetry: value.isOfflineRetry,
              })
            }
            return
          }
        }
      }
    }
    if (!value.isOfflineRetry) {
      deleteTableRow({ def: def, data: value.data }, key)
    }

    if (!value.isMass && !value.isOfflineRetry) {
      SnackAdd("Datensatz gelöscht", "Success")
    }
    if (!value.isMass && !value.isOfflineRetry) {
      selectLatestRow(def, value.data)
      setPage(value.data)
    }

    // afterDelete @@hook
    let fn = resolvePath(actions.custom, def.namespace)
    let afterDeleteFnName = FormAfterDelete
    if (fn && fn[afterDeleteFnName]) {
      await fn[afterDeleteFnName](<FormAfterDelete_Type>{
        key,
        def: def,
        data: value.data,
        res: res.data,
        isOfflineRetry: value.isOfflineRetry,
      })
    }
    return true
  }
}

export const TableMultipleDeleteRow: OvlAction<{
  def: OvlTableDef
  data: OvlTableData
}> = async (value, { actions, state, effects }) => {
  let def = value.def
  let rows = value.data.data
  let data = value.data
  let deletedCounter = 0
  let cancel: boolean = false

  let canNotDeleteMsg = ""
  let selectedObjects = []
  let functionName = FormCanDelete
  let fn = null
  let fnc = resolvePath(actions.custom, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }
  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res: FormCan_ReturnType = await fn(<FormCan_Type>{
            rowKey: k,
            tableDef: def,
            tableData: value.data,
          })
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
    def.uiState.headerSelected = ""
    wait = Promise.all(
      selectedObjects.map(async (k) => {
        if (
          await actions.ovl.internal.TableDeleteRow({
            key: k,
            def: def,
            data: value.data,
            isMass: true,
          })
        ) {
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
    setPage(value.data)
    actions.ovl.internal.TableSelectHeader({
      def: value.def,
      data: value.data,
      key: "",
    })
  }
}

export const TableMultipleCopyRow: OvlAction<{
  def: OvlTableDef
  data: OvlTableData
}> = async (value, { actions, state, effects }) => {
  let def = value.def
  let data = value.data
  let rows = value.data.data
  let cancel: boolean = false
  let canNotCopyMsg = ""
  let selectedObjects = []
  let functionName = FormCanCopy
  let fn = null
  let fnc = resolvePath(actions.custom, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }

  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        def.uiState.editRow[k].mode = "copy"
        if (fn) {
          let res: FormCan_ReturnType = await fn(<FormCan_Type>{
            rowKey: k,
            tableDef: def,
            tableData: value.data,
          })
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
    def.uiState.headerSelected = ""
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

export const TableMultipleEditRow: OvlAction<{
  def: OvlTableDef
  data: OvlTableData
}> = async (value, { actions, state, effects }) => {
  let def = value.def
  let data = value.data
  let rows = value.data.data
  let cancel: boolean = false
  let canNotEditMsg = ""
  let selectedObjects = []
  let functionName = FormCanEdit
  let fn = null
  let fnc = resolvePath(actions.custom, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }
  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res: FormCan_ReturnType = await fn(<FormCan_Type>{
            rowKey: k,
            tableDef: def,
            tableData: value.data,
          })
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
    def.uiState.headerSelected = ""
    wait = Promise.all(
      selectedObjects.map(async (k) => {
        def.uiState.editRow[k].mode = "edit"
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

export const TableMultipleCustomFunction: OvlAction<{
  def: OvlTableDef
  data: OvlTableData
  customFnId: string
  customFnName: string
}> = async (value, { actions, state, effects }) => {
  let def = value.def
  let data = value.data
  let rows = value.data.data
  let fnMultipleName = value.customFnName
  let cancel: boolean = false
  let canNotEditMsg = ""
  let selectedObjects = []
  let functionName = FormCanCustom.replace("%", value.customFnId)
  let fn = null
  let fnc = resolvePath(actions.custom, def.namespace)
  if (fnc && fnc[functionName]) {
    fn = fnc[functionName]
  }
  let selectedRows = def.uiState.selectedRow
  let wait = Promise.all(
    Object.keys(selectedRows).map(async (k) => {
      let selected = selectedRows[k]
      if (selected.selected) {
        if (fn) {
          let res: FormCan_ReturnType = await fn(<FormCan_Type>{
            rowKey: k,
            tableDef: def,
            tableData: value.data,
          })
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
  //let customFn = def.options.customRowActions[value.customFnId].selected

  let doMsg =
    "Funktion '" +
    fnMultipleName +
    "' für " +
    selectedObjects.length.toString() +
    " Datensätze ausführen?"

  if (canNotEditMsg) {
    if (selectedObjects.length > 0) {
      canNotEditMsg =
        "Die Funktion kann nicht für alle Datensätze ausgeführt werden:" +
        canNotEditMsg +
        "\n" +
        doMsg
    } else {
      canNotEditMsg = "Keine gültigen Datensätze gefunden:" + canNotEditMsg
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
    def.uiState.headerSelected = ""
    let customFns = resolvePath(actions.custom, def.namespace)
    let customFunctionName = "FormCustom" + value.customFnId
    let customFunction = customFns[customFunctionName]
    let result = ""
    let errCount = 0
    if (customFunction) {
      wait = Promise.all(
        selectedObjects.map(async (k, i) => {
          let fnResult: SelectedCustomFunctionResult = {
            msg: "",
            success: true,
          }
          let isLast = i === selectedObjects.length - 1
          await customFunction(<FormCustomFn_Type>{
            rowKey: k,
            def: def,
            data: data,
            isLastOrOnlyOne: isLast,
            startedFromSelectedResult: fnResult,
          })
          if (fnResult.msg) {
            result = result + fnResult.msg + "\n"
          }
          if (!fnResult.success) {
            errCount++
          }
        })
      )
      await wait
    }
    if (errCount < selectedObjects.length) {
      if (errCount === 0) {
        SnackAdd(
          "Funktion " + fnMultipleName + " erfolgreich ausgeführt",
          "Information"
        )
      } else {
        SnackAdd(
          "Funktion " +
            fnMultipleName +
            " teilweise erfolgreich ausgeführt (" +
            errCount +
            " von " +
            selectedObjects.length +
            " Datensätze hatten Fehler.",
          "Information"
        )
      }
    } else {
      SnackAdd("Funktion " + fnMultipleName + " war fehlerhaft.", "Error")
    }

    if (result) {
      await DialogOk(result)
    }
  }
}

export const TableDeleteRowFromData: OvlAction<{
  key: string
  def: OvlTableDef
  data: OvlTableData
}> = (value) => {
  let key = value.key
  let data = value.data.data
  delete data[key]
  let def = value.def
  let i = def.uiState.dataFilteredAndSorted.indexOf(key)
  //window.ovldbg = "lala"
  def.uiState.dataFilteredAndSorted.splice(i, 1)
  delete def.uiState.selectedRow[key]
  delete def.uiState.editRow[key]
  delete def.uiState.viewRow[key]
  setPage(value.data)
}
