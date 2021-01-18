import {
  FormChanged_Type,
  FormValidate_Type,
} from "../../../../../ovl/ovl/src/global/hooks"

import { Mandatory } from "../../../../../ovl/ovl/src/library/forms/validators"
import { SnackAdd } from "../../../../../ovl/ovl/src/library/helpers"
import { TableGetSelectedRowKeys } from "../../../../../ovl/ovl/src/library/Table/helpers"
import { OvlAction } from "../../../../../ovl/ovl/src/index"

let copyToDetailsTimer
let lastCopyToDetailsTimestamp = 0
export const FormChanged: OvlAction<FormChanged_Type> = async (
  value,
  { actions, state }
) => {
  let def = state.app.tables.autoQuotation.tableDef["autoQuotation"]
  let data = state.app.tables.autoQuotation.data
  if (def.uiState.dataFilteredAndSorted.length > 0) {
    let col = "sawcut"
    switch (value.fieldId) {
      case "SawCut":
        break
      case "CutOff":
        col = "cutoff"
        break
      case "Max_Vs":
        col = "max_vs"
        break
      case "Sources":
        col = "sources"
        break
      // check if the entry is still in the list
    }

    // debounce the move of the values down to the details
    if (copyToDetailsTimer && Date.now() - lastCopyToDetailsTimestamp < 800) {
      clearTimeout(copyToDetailsTimer)
    }
    lastCopyToDetailsTimestamp = Date.now()
    copyToDetailsTimer = setTimeout(() => {
      let keys = TableGetSelectedRowKeys(def)
      keys.forEach((key) => {
        data[key][col] = value.newConvertedVal
        data[key]["res_sources"] = "---"
        data[key]["res_vs"] = undefined
        data[key]["res_sumSourceLen"] = undefined
      })
      if (keys.length > 0) {
        SnackAdd("Werte übertragen...")
      }
    }, 800)
  }
}

// we use it for main form and table fields thats why there are two of each...
export const FormValidate: OvlAction<FormValidate_Type> = (
  value,
  { actions }
) => {
  switch (value.fieldId) {
    case "CutOff":
    case "cutoff":
      Mandatory("Anschnitt", value.newVal, value.validationResult)
      break
    case "SawCut":
    case "sawcut":
      Mandatory("Schnittfuge", value.newVal, value.validationResult)
      break
    case "Max_Vs":
    case "max_vs":
      Mandatory("Verschnitt", value.newVal, value.validationResult)

      break
    case "Sources":
    case "sources":
      Mandatory("Quellen", value.newVal, value.validationResult)
      if (value.validationResult.errors.length === 0) {
        let entries = value.newVal.split(",")
        let hasZero = entries.indexOf("0") > -1
        if (hasZero && entries.length > 1) {
          value.validationResult.errors.push(
            'Bei mehreren Quellen ist "0" ungültig'
          )
        }
        if (
          entries.some(
            (s) =>
              Number.isNaN(parseInt(s)) ||
              (s !== "0" && (parseInt(s) < 1500 || parseInt(s) > 13000))
          )
        ) {
          value.validationResult.errors.push("Ungültige Längen entdeckt")
        }
      }
      if (value.validationResult.errors.length === 0) {
        let entries = value.newVal.split(",")
        let correctedEntries = entries
          .map((s) => parseInt(s))
          .sort((a, b) => a - b)
          .map((s) => s.toString())
          .join(",")
        value.correctedValue = correctedEntries
      }
      break
  }
}
