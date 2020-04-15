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
        parentFirstChild.classList.has("fadeOutSnack") ||
        parentFirstChild.classList.has("fadeInSnack")
      ) {
        break
      }
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
      snackToAdd.status = "running"
      // now go top down through the slots and add in the first parent that has no childs
      let ovlSnackEl = document.getElementById("ovlsnack")
      ovlSnackEl.classList.add("hide")
      let parentEl = ovlSnackEl.lastElementChild
      do {
        let slotEl = parentEl.firstElementChild
        if (slotEl) {
          parentEl = parentEl.previousElementSibling
        } else {
          let div = document.createElement("div")
          div.id = filteredAndSortedSnacks[0]
          div.setAttribute("role", "alert")
          div.innerText = snackToAdd.text
          div.classList.add("fd-alert")
          let type = "fd-alert--" + snackToAdd.type.toLowerCase()
          div.classList.add(type)
          div.classList.add("fadeInSnack")
          parentEl.appendChild(div)
          if (snackToAdd.durationMs != 999999) {
            setTimeout((e) => {
              StartRemoveSnack(div)
            }, snackToAdd.durationMs)
          }

          break
        }
      } while (parentEl)
      ovlSnackEl.classList.remove("hide")
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
  }
  actions.ovl.internal.PlaceSnack()
}
