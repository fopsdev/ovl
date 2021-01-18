import {
  ScreenNavigateIn_ReturnType,
  ScreenNavigateOut_ReturnType,
} from "../../../../../ovl/ovl/src/global/hooks"

import { OvlAction } from "../../../../../ovl/ovl/src/index"

let intervalHandle = undefined
export const ScreenNavigateIn: OvlAction<
  {},
  ScreenNavigateIn_ReturnType
> = async (_, { actions, state }) => {
  state.app.occasionProcessDashboard.selectedLocation = "Hettenschwil"
  state.app.occasionProcessDashboard.selectedInterval = 5

  if (intervalHandle) {
    clearInterval(intervalHandle)
  }
  let success = await actions.app.occasionsProcessDashboard.OccasionsProcessDataPoll()
  if (success) {
    intervalHandle = setInterval((i) => {
      actions.app.occasionsProcessDashboard.OccasionsProcessDataPoll()
    }, state.app.occasionProcessDashboard.selectedInterval * 1000)
    return ""
  } else {
    return "Datenfehler"
  }
}

export const ScreenNavigateOut: OvlAction<
  {},
  ScreenNavigateOut_ReturnType
> = async (_) => {
  if (intervalHandle) {
    clearInterval(intervalHandle)
  }
  return ""
}
