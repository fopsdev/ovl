//import { OnInitialize } from "overmind"
import { OnInitialize } from "overmind"
import { addGlobalPersistEventListeners, saveState } from "./global/globals"
import { HasOfflineMode } from "./index"

let timer: any
let isos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
const onInitialize: OnInitialize = async (
  { state, actions, effects },
  overmind
) => {
  if (HasOfflineMode) {
    if (isos) {
      // if iOs then always persist on mutation (debounced...)
      // because tghere is no reliable way to detect leave browser
      overmind.addMutationListener(mutation => {
        let waitTime = 800
        clearTimeout(timer)
        timer = setTimeout(() => {
          saveState(true, "MutationL")
        }, waitTime)
      })
    } else {
      addGlobalPersistEventListeners()
    }
  }
}
export default onInitialize
