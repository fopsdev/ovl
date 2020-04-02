import { overmind } from "../../../../ovl/src/index"
import { DialogOkCancel } from "../../../../ovl/src/library/helpers"

export const ScreenRefresh = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  let def = state.testtables.timeentries.tableDef.mobiletimerecording1
  let data = state.testtables.timeentries
  await actions.ovl.table.TableRefresh({
    def,
    data,
    forceServerDataRefresh: true
  })
}

export const NavigateIn = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  if (
    !this.state.testtables.timeentries.tableDef.mobiletimerecording1.initialised
  ) {
    let dt = new Date()
    let dateSelected = dt.toISOString().substring(0, 10)

    await this.actions.testtables.mobiletimerecording.SetMobileTimeEntrySelectedDate(
      {
        def: this.state.testtables.timeentries.tableDef.mobiletimerecording1,
        selected: dateSelected
      }
    )
  }

  let def = state.testtables.timeentries.tableDef.mobiletimerecording1
  let data = state.testtables.timeentries
  await actions.ovl.table.TableRefresh({
    def,
    data,
    ignoreRefreshedMessageSnack: true,
    refreshServerDataIfOlderThan: 10
  })
}

export const NavigateOut = async (
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => {
  if ((await DialogOkCancel("Test: Wirklich raus hier?", 1)) === 2) {
    return Promise.resolve("Navigation abgebrochen durch User")
  }
}
