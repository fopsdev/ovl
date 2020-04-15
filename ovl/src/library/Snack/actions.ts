import { Action, AsyncAction } from "overmind"
import {
  SnackAddState,
  RemoveSnack as StartRemoveSnack,
  SnackId,
} from "./Snack"

export const RemoveSnack: Action<string> = (_, value) => {
  let el = document.getElementById("ovlsnack" + value)
  StartRemoveSnack(el)
}

export const ClearSnack: Action<string> = ({ state, actions }, value) => {
  delete state.ovl.libState.snacks[value]
  let el = document.getElementById(value)
  let placeFreedUp = false
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
      placeFreedUp = true
      parent.appendChild(parentFirstChild)
      parent = parent2
    } while (true)
    actions.ovl.internal.PlaceSnack()
  }
}

export const PlaceSnack: Action = ({ state }) => {
  let snacks = state.ovl.libState.snacks
  if (snacks) {
    let filteredAndSortedSnacks = Object.keys(snacks)
      .filter((f) => snacks[f].status === "queued")
      .sort((a, b) => snacks[a].id - snacks[b].id)
    if (filteredAndSortedSnacks.length > 0) {
      let snackToAdd = snacks[filteredAndSortedSnacks[0]]
      console.log("add " + snackToAdd.key)

      // now go top down through the slots and add in the first parent that has no childs
      let ovlSnackEl = document.getElementById("ovlsnack")

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
        div.id = filteredAndSortedSnacks[0]
        div.setAttribute("role", "alert")
        div.innerText = snackToAdd.text
        div.classList.add("fd-alert")
        let type = "fd-alert--" + snackToAdd.type.toLowerCase()
        div.classList.add(type)
        div.classList.add("fadeInSnack")
        lastFreeSlotEl.appendChild(div)
        if (snackToAdd.durationMs != 999999) {
          setTimeout((e) => {
            StartRemoveSnack(div)
          }, snackToAdd.durationMs)
        }
      }
    }
  }
}

export const AddSnack: Action<SnackAddState> = ({ state, actions }, value) => {
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
