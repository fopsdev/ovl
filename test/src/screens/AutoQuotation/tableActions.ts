import { FormValidate as FormValidateFromForm } from "./formActions"
import {
  FormChanged_Type,
  FormCustomFn_ReturnType,
  FormCustomFn_Type,
  FormCustomSort_ReturnType,
  FormCustomSort_Type,
} from "../../../../../ovl/ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/ovl/src/ovlTypes"
import { AutoQuotation } from "./state"
import {
  getDisplayValue,
  getTextSort,
} from "../../../../../ovl/ovl/src/library/Table/helpers"
import { ovl } from "../../../../../ovl/ovl/src"
import { postRequest } from "../../../../../ovl/ovl/src/effects"
import {
  SnackTrackedAdd,
  SnackTrackedRemove,
  SnackAdd,
} from "../../../../../ovl/ovl/src/library/helpers"
import { apiUrl } from "../../../../../ovl/ovl/src/state"

export const FormValidate = FormValidateFromForm
export const FormCustom_Default_Sort: OvlAction<
  FormCustomSort_Type,
  FormCustomSort_ReturnType
> = (value) => {
  let rowA = value.data[value.a] as AutoQuotation
  let rowB = value.data[value.b] as AutoQuotation
  let res = rowA.width - rowB.width
  if (res === 0) {
    res = rowA.height - rowB.height
  }
  if (res === 0) {
    getTextSort(rowA.skl, rowB.skl)
  }

  return res
}

export const FormChanged: OvlAction<FormChanged_Type> = async (
  value,
  { actions, state }
) => {
  let def = state.app.tables.autoQuotation.tableDef["autoQuotation"]
  let data = state.app.tables.autoQuotation.data

  let resultsReset = false
  switch (value.fieldId) {
    case "sawcut":
    case "cutoff":
    case "max_vs":
    case "sources":
      resultsReset = true
      break
  }

  if (resultsReset) {
    actions.ovl.internal.SetField({
      fieldId: "res_vs",
      formState: value.formState,
      value: undefined,
    })
    actions.ovl.internal.SetField({
      fieldId: "res_sources",
      formState: value.formState,
      value: "---",
    })
    actions.ovl.internal.SetField({
      fieldId: "res_sumSourceLen",
      formState: value.formState,
      value: undefined,
    })
  }
}

export const FormCustomFnOptimize: OvlAction<
  FormCustomFn_Type,
  FormCustomFn_ReturnType
> = async ({ isLastOrOnlyOne, selectedKeys }) => {
  // this sample shows how to deal with msg and succss when also used from headerform (multiple rows selected))
  // it gets called for every selected row
  // deals with validation and messages itself
  // please have in mind that a FormCan---Function will be called if present to validate each line
  if (isLastOrOnlyOne) {
    if (!ovl.state.ovl.libState.indicator.open) {
      ovl.state.app.screens.autoQuotation.errorMessage = ""
      ovl.state.app.screens.autoQuotation.okMessage = ""
      let dataKeys = selectedKeys
      let data = ovl.state.app.tables.autoQuotation.data
      let res: any[] = []
      dataKeys.forEach((k) => {
        let row: AutoQuotation = data[k]
        res.push({
          width: row.width,
          height: row.height,
          skl: row.skl,
          cutoff: row.cutoff,
          sawcut: row.sawcut,
          max_vs: row.max_vs,
          sources: row.sources,
        })
      })
      let snackKey = SnackTrackedAdd(
        "Längen werden optimiert. Bitte haben Sie etwas Geduld...",
        "Information"
      )
      let res2
      try {
        res2 = await postRequest(apiUrl + "QuotationOpti/createOpti", {
          createOptiParams: res,
          projectId: ovl.state.app.screens.autoQuotation.bvxFileName,
        })
      } catch (e) {
      } finally {
        SnackTrackedRemove(snackKey)
      }
      if (res2.status == 200 && res2.data) {
        SnackAdd(
          "Datei erfolgreich optimiert. Sie können im Excel jetzt aktualisieren...",
          "Success",
          4000
        )
        let headerInfo = res2.data.data.headerInfo
        let sumSourceM3 = headerInfo.sumSourceM3
        let sumTargetM3 = headerInfo.sumTargetM3
        let sumTooLongM3 = headerInfo.sumTooLongM3
        let results = res2.data.data.results
        ovl.state.app.screens.autoQuotation.okMessage =
          new Date().toLocaleTimeString() +
          ": " +
          headerInfo.projectId +
          " erfolgreich optimiert. Resultat: Stangen[m3]: " +
          (Math.round(sumSourceM3 * 1000) / 1000).toString() +
          ", Stücke[m3]: " +
          (Math.round(sumTargetM3 * 1000) / 1000).toString() +
          " = Vs[%]: " +
          (
            Math.round((1.0 - sumTargetM3 / sumSourceM3) * 100.0 * 1000) / 1000
          ).toString() +
          " davon zu lang[m3]: " +
          (Math.round(sumTooLongM3 * 1000) / 1000).toString()

        // adjust the table results
        let data = ovl.state.app.tables.autoQuotation.data
        let dataIndex = ovl.state.app.tables.autoQuotation.index
        results.forEach((e) => {
          let dataRow: AutoQuotation = data[dataIndex[e.id]]
          dataRow.res_vs = e.vs.toString()
          dataRow.res_sources = e.sources
          dataRow.res_sumSourceLen = e.sumSourceLen
        })
      }
      // we handle our snacks ourself
      return false
    }
  }
}
