import { OvlBaseElement } from "../library/OvlBaseElement"
export let callbacks = new Map()
export let paths = new Map()
export let activeCallback: OvlBaseElement | undefined

export const startTrack = (cb: OvlBaseElement) => {
  let cbToCheck = callbacks.get(cb)
  if (!cbToCheck) {
    callbacks.set(cb, new Set())
  }
  activeCallback = cb
}

export const stopTrack = () => {
  activeCallback = undefined
}

export const disposeTrack = (cb: OvlBaseElement) => {
  // get all paths and remove from there as well

  let pathsSet = callbacks.get(cb)
  if (pathsSet) {
    pathsSet.forEach((path: string) => {
      let pathsCallbackSet = paths.get(path)
      pathsCallbackSet.delete(cb)
      if (pathsCallbackSet.size === 0) {
        paths.delete(path)
      }
    })
  }
  callbacks.delete(cb)
}

export const logTrackingList = () => {
  console.log("tracking information")
  console.log("components:")
  console.log(callbacks)
  console.log("paths:")
  console.log(paths)
}

export const isTracking = () => {
  return activeCallback !== undefined
}

export const addTrackedPath = (path: string) => {
  callbacks.get(activeCallback).add(path)
  if (!paths.has(path)) {
    paths.set(path, new Set())
  }
  paths.get(path).add(activeCallback)
}
