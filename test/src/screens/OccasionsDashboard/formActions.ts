import {
  ViewRowClass_Type,
  ViewRowClass_ReturnType,
} from "../../../../../ovl/ovl/src/global/hooks"
import { ViewRowClassContent } from "../../../../../ovl/ovl/src/library/Table/Table"
import { OvlAction } from "../../../../../ovl/ovl/src/ovlTypes"
import { OccasionsProcessDashboardData } from "./state"

export const ViewRowClass: OvlAction<
  ViewRowClass_Type,
  ViewRowClass_ReturnType
> = async ({ rowKey, tableData }, { state }) => {
  let r = <OccasionsProcessDashboardData>tableData.data[rowKey]
  let res: ViewRowClassContent

  if (r.Days > state.app.occasionProcessDashboard.settings.days2) {
    res = {
      className: "app-rowstatus-bad",
      tooltip: "",
    }
  } else if (r.Days > state.app.occasionProcessDashboard.settings.days1) {
    res = {
      className: "app-rowstatus-warning",
      tooltip: "",
    }
  } else {
    res = {
      className: "app-rowstatus-ok",
      tooltip: "",
    }
  }
  return Promise.resolve(res)
}
