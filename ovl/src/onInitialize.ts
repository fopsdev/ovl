//import { OnInitialize } from "overmind"
import { OnInitialize } from "overmind"
import { addGlobalPersistEventListeners, saveState } from "./global/globals"
import { OvlConfig } from "./init"

let timer: any
let isos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
const onInitialize: OnInitialize = async (_, overmind) => {
  if (OvlConfig._system.OfflineMode) {
    //    if (isos) {
    // if iOs then always persist on mutation (debounced...)
    // because tghere is no reliable way to detect leave browser
    overmind.addMutationListener(mutation => {
      let waitTime = 800
      clearTimeout(timer)
      timer = setTimeout(() => {
        saveState(true, "MutationL")
      }, waitTime)
    })
    //   } else {
    // looks like there is no reliable way to save state for now
    // check back in a year or so....
    //     addGlobalPersistEventListeners()
    //   }
  }
}
export default onInitialize
