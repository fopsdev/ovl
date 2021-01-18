import {
  OccasionsProcessDashboardData,
  OccasionsProcessDashboardDataClosedQuarter,
} from "./state"
import { OvlAction } from "../../../../ovl/src/index"

const getQuartersArray = (quarterDates: Date[], compareDate: Date): Date[] => {
  return quarterDates
    .filter((f) => compareDate >= f)
    .sort((a, b) => a.getTime() - b.getTime())
}

export const OccasionsProcessDataPoll: OvlAction<
  any,
  Promise<boolean>
> = async (_, { state, actions, effects }) => {
  // poll
  try {
    let req = await fetch(
      "https://itflies4.ddns.net/api/exchangedoccasionprocessdata?location=" +
        state.app.occasionProcessDashboard.selectedLocation,
      {}
    )
    if (req.status != 204) {
      let res = await req.json()
      let settings = res.settings[0]
      let settingsState = state.app.occasionProcessDashboard.settings
      settingsState.days1 = settings.OccasionProcessDays1
      settingsState.days2 = settings.OccasionProcessDays2
      settingsState.smileyPerc1 = settings.OccasionProcessSmileyPerc1
      settingsState.smileyPerc2 = settings.OccasionProcessSmileyPerc2
      settingsState.smileyPerc1_2 = settings.OccasionProcessSmileyPerc1_2
      settingsState.smileyPerc2_2 = settings.OccasionProcessSmileyPerc2_2

      // save the percentage of green lines
      let calculated_valuesState =
        state.app.occasionProcessDashboard.calculated_values
      let v: OccasionsProcessDashboardData[] = res.vehicles
      let vc: OccasionsProcessDashboardDataClosedQuarter[] =
        res.finishedVehiclesCurrentQuarter
      calculated_valuesState.total.totalLines = 0
      calculated_valuesState.total.nrOfGoodLines = 0
      calculated_valuesState.quarter.totalInProcessLines = 0
      calculated_valuesState.quarter.nrOfGoodLines = 0
      let total_totalLines = 0
      let total_nrOfGoodLines = 0
      let total_nrOfMediumLines = 0
      let total_nrOfBadLines = 0
      let quarter_totalLines = 0
      let quarter_nrOfGoodLines = 0
      let quarter_nrOfMediumLines = 0
      let quarter_nrOfBadLines = 0

      let quarterDates: Date[] = []
      let cD = new Date()
      let compareDate = new Date(cD.getFullYear(), cD.getMonth(), cD.getDate())
      let cY = cD.getFullYear()
      quarterDates.push(new Date(cY, 0, 1))
      quarterDates.push(new Date(cY, 3, 1))
      quarterDates.push(new Date(cY, 6, 1))
      quarterDates.push(new Date(cY, 9, 1))
      let check = getQuartersArray(quarterDates, compareDate)
      let currentquarter = check[check.length - 1]
      calculated_valuesState.currentQuarter = check.length
      // get the good lines and nr of lines for total and quarter in one loop
      v.forEach((c) => {
        // write back quarter

        let quarters = getQuartersArray(quarterDates, new Date(c.EntryDate))
        c.Quarter = quarters.length.toString()

        if (c.Quarter === "0") {
          c.Quarter = ""
        }
        total_totalLines++
        let good = c.Days <= settingsState.days1
        let medium = false
        if (!good) {
          medium = c.Days <= settingsState.days2
        }

        if (good) {
          total_nrOfGoodLines++
        } else if (medium) {
          total_nrOfMediumLines++
        } else {
          total_nrOfBadLines++
        }

        if (new Date(c.EntryDate) >= currentquarter) {
          quarter_totalLines++
          if (good) {
            quarter_nrOfGoodLines++
          } else if (medium) {
            quarter_nrOfMediumLines++
          } else {
            quarter_nrOfBadLines++
          }
        }
      })

      let nrOfGoodLinesClosed = 0
      let nrOfMediumLinesClosed = 0
      let nrOfBadLinesClosed = 0

      vc.forEach((c) => {
        if (c.Days <= settingsState.days1) {
          nrOfGoodLinesClosed++
        } else if (c.Days <= settingsState.days2) {
          nrOfMediumLinesClosed++
        } else {
          nrOfBadLinesClosed++
        }
      })

      calculated_valuesState.quarter.nrOfGoodClosed = nrOfGoodLinesClosed
      calculated_valuesState.quarter.nrOfMediumClosed = nrOfMediumLinesClosed
      calculated_valuesState.quarter.nrOfBadClosed = nrOfBadLinesClosed

      calculated_valuesState.total.totalLines = total_totalLines
      calculated_valuesState.total.nrOfGoodLines = total_nrOfGoodLines
      calculated_valuesState.total.nrOfMediumLines = total_nrOfMediumLines
      calculated_valuesState.total.nrOfBadLines = total_nrOfBadLines
      calculated_valuesState.total.goodPerc =
        (total_nrOfGoodLines / total_totalLines) * 100

      calculated_valuesState.quarter.totalInProcessLines = quarter_totalLines
      calculated_valuesState.quarter.nrOfGoodLines = quarter_nrOfGoodLines
      calculated_valuesState.quarter.nrOfMediumLines = quarter_nrOfMediumLines
      calculated_valuesState.quarter.nrOfBadLines = quarter_nrOfBadLines

      calculated_valuesState.quarter.goodPerc =
        ((quarter_nrOfGoodLines + nrOfGoodLinesClosed) /
          (total_totalLines +
            nrOfBadLinesClosed +
            nrOfGoodLinesClosed +
            nrOfMediumLinesClosed)) *
        100

      await actions.ovl.table.TableRefresh({
        defId: "Vehicles",
        data: state.app.occasionProcessDashboard.vehicles,
        localData: res.vehicles,
        ignoreRefreshedMessageSnack: true,
      })
      return Promise.resolve(true)
    }
  } catch (e) {
    actions.ovl.internal.AddSnack({
      text: "Fehler beim Holen der Daten",
      type: "Error",
    })
    return Promise.resolve(false)
  }
}
