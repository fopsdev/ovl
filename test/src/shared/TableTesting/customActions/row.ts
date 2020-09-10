import { SnackAdd } from "../../../../../ovl/src/library/helpers"
import { RowStatus } from "../../../../../ovl/src/library/Table/Table"
import { TableTesting } from "../state"

import {
  FormCan_Type,
  FormCan_ReturnType,
  FormStatus_Type,
  FormStatus_ReturnType,
  FormCopy_Type,
  FormAdd_Type,
  FormCustomFn_Type,
} from "../../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/src/ovlTypes"

export const FormCanEdit: OvlAction<FormCan_Type, FormCan_ReturnType> = async ({
  rowKey,
  tableData,
}) => {
  let row = <TableTesting>tableData.data[rowKey]
  return row.U_Alpha && row.U_Alpha.indexOf("noedit") > -1
    ? "Ändern nicht möglich da Text 'noedit' enthält!"
    : ""
}

export const FormCanDelete: OvlAction<
  FormCan_Type,
  FormCan_ReturnType
> = async ({ rowKey, tableData }) => {
  let row = <TableTesting>tableData.data[rowKey]
  if (row.U_Alpha && row.U_Alpha.indexOf("nodelete") > -1) {
    return 'Löschen nicht möglich da Text "nodelete" enthält!'
  }
  // check if the key is linked to another row (parentkeys)

  let keyToCheck = row.Code
  let data = tableData.data
  let affectedRows = Object.keys(data).filter((k) => {
    let d: TableTesting = data[k]
    return d.U_ParentCode === keyToCheck || d.U_ParentCode2 === keyToCheck
  })
  let msg = ""
  affectedRows.forEach((k) => {
    let d: TableTesting = data[k]
    msg = msg + `Code ${d.Code}, U_Alpha ${d.U_Alpha} /`
  })
  if (msg) {
    return "Verlinkt in: " + msg
  }
}

export const FormStatus: OvlAction<
  FormStatus_Type,
  FormStatus_ReturnType
> = async ({ rowKey, tableData }) => {
  let row = <TableTesting>tableData.data[rowKey]
  let res: RowStatus
  if (row.U_Alpha.toLowerCase().indexOf("test") > -1) {
    res = {
      status: "warning",
      msg: 'Text enthält "Test"',
    }
  } else if (row.U_Alpha.toLowerCase().indexOf("fehler") > -1) {
    res = {
      status: "error",
      msg: 'Text enthält "Fehler"',
    }
  }
  return res
}

export const FormCopy: OvlAction<FormCopy_Type> = async ({ newRow }) => {
  let r = newRow as TableTesting
  r.U_Memo = r.U_Memo + " Copy!"
}

export const FormAdd: OvlAction<FormAdd_Type> = async ({ newRow }) => {
  let r = newRow as TableTesting
  r.U_Memo = "Defaulttext Memo"
}
export const FormCustomFnSelect: OvlAction<FormCustomFn_Type> = async ({
  startedFromSelectedResult,
  isLastOrOnlyOne,
}) => {
  // this sample shows how to deal with msg and succss when also used from headerform (multiple rows selected))
  let msg = ""
  if (isLastOrOnlyOne) {
    msg = "Funktion noch nicht implementiert!"
  }
  if (startedFromSelectedResult) {
    startedFromSelectedResult.msg = msg
    startedFromSelectedResult.success = false
    return
  }
  SnackAdd(msg, "Warning")
}
