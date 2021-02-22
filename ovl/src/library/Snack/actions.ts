import {
  SnackAddState,
  RemoveSnack as StartRemoveSnack,
  SnackId,
} from "./Snack"
import { OvlAction } from "../../index"
import { render } from "lit-html"

export const RemoveSnack: OvlAction<string> = (value, { state }) => {
  // if not already got added just remove from state (there are max. 3 snacks display so it could be that its not even displayed)
  let key = "ovlsnack" + value
  if (state.ovl.libState.snacks[key].status === "queued") {
    delete state.ovl.libState.snacks[key]
    return
  }
  let el = document.getElementById(key)
  StartRemoveSnack(el)
}

export const ClearSnack: OvlAction<string> = (value, { state, actions }) => {
  delete state.ovl.libState.snacks[value]

  let el = document.getElementById(value)
  if (el) {
    let parent = el.parentNode
    parent.removeChild(el)
    do {
      //@ts-ignore
      let parent2 = parent.previousElementSibling
      if (!parent2) {
        break
      }
      let parentFirstChild = parent2.firstElementChild
      if (
        !parentFirstChild ||
        parentFirstChild.classList.contains("fadeInSnack") ||
        parentFirstChild.classList.contains("fadeOutSnack")
      ) {
        break
      }

      parent.appendChild(parentFirstChild)
      parent = parent2
    } while (true)
    actions.ovl.internal.PlaceSnack()
  }
}

export const PlaceSnack: OvlAction = (_, { state }) => {
  let ovlSnackEl = document.getElementById("ovlsnack")
  let wait = 0
  if (!ovlSnackEl) {
    wait = 500
  }
  setTimeout(() => {
    ovlSnackEl = document.getElementById("ovlsnack")
    let snacks = state.ovl.libState.snacks
    if (snacks) {
      Object.keys(snacks)
        .filter((f) => snacks[f].status === "queued")
        .sort((a, b) => snacks[a].id - snacks[b].id)
        .forEach((k) => {
          //if (filteredAndSortedSnacks.length > 0) {
          let snackToAdd = snacks[k]

          let lastOccupiedSlot = 0
          let lastFreeSlot = 0
          let lastFreeSlotEl
          let firstFreeSlotEl
          let parentEl = ovlSnackEl.lastElementChild
          let z = 0
          do {
            let slotEl = parentEl.firstElementChild
            if (slotEl) {
              lastOccupiedSlot = z
            } else {
              lastFreeSlot = z
              lastFreeSlotEl = parentEl
              if (!firstFreeSlotEl) {
                firstFreeSlotEl = parentEl
              }
            }
            parentEl = parentEl.previousElementSibling
            z++
          } while (parentEl)
          if (lastOccupiedSlot === 0 || lastOccupiedSlot < lastFreeSlot) {
            if (lastOccupiedSlot === 0) {
              lastFreeSlotEl = firstFreeSlotEl
            }
            snackToAdd.status = "running"
            let div = document.createElement("div")
            div.id = k
            div.setAttribute("role", "alert")
            render(snackToAdd.text, div)
            div.classList.add("fd-message-strip")
            div.classList.add("ovl-snack")
            let type = "fd-message-strip--" + snackToAdd.type.toLowerCase()
            div.classList.add(type)
            div.classList.add("fadeInSnack")
            lastFreeSlotEl.appendChild(div)
            if (snackToAdd.durationMs != 999999) {
              setTimeout((e) => {
                StartRemoveSnack(div)
              }, snackToAdd.durationMs)
            }
          }
        })
    }
  }, wait)
}

export const AddSnack: OvlAction<SnackAddState> = (
  value,
  { state, actions }
) => {
  let id = SnackId.id++
  let key = value.key
  if (!key) {
    key = "ovlsnack" + id.toString()
  }
  if (!key.startsWith("ovlsnack")) {
    key = "ovlsnack" + key
  }
  let duration = value.durationMs
  if (!duration) {
    duration = 4000
  }
  state.ovl.libState.snacks[key] = {
    text: value.text,
    type: value.type,
    durationMs: duration,
    status: "queued",
    id,
    key,
  }
  actions.ovl.internal.PlaceSnack()
}
