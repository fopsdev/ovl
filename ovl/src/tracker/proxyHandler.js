import { paths, isTracking, addTrackedPath, disposeTrack } from "./tracker"
import { SnackTrackedRemove } from "../library/helpers"
export function createDeepProxy(target) {
  const preproxy = new WeakMap()
  let callbacksToCall = new Set()
  function makeHandler(path) {
    return {
      get(target, key, receiver) {
        if (isTracking()) {
          let isArray = Array.isArray(target)
          let value = target[key]
          if (
            typeof value !== "function" &&
            !(isArray && "push;pop;splice;unshift;shift".indexOf(key) > -1) &&
            key !== "toJSON"
          ) {
            let pathToTrack
            if (isArray && key === "length") {
              pathToTrack = [...path].join(".")
            } else {
              pathToTrack = [...path, key].join(".")
            }
            addTrackedPath(pathToTrack)
          }
        }
        return Reflect.get(...arguments)
      },
      // traps the Object.keys(...)
      ownKeys(target) {
        let ownKeys = Reflect.ownKeys(target)
        if (isTracking()) {
          ownKeys.forEach((m) => {
            let pathToTrack = [...path, m].join(".")
            addTrackedPath(pathToTrack)
          })
        }
        return ownKeys
      },
      // traps (in operator)
      has(target, key) {
        if (isTracking) {
          if (!Array.isArray(target)) {
            Reflect.ownKeys(target).forEach((m) => {
              let pathToTrack = [...path, m].join(".")
              addTrackedPath(pathToTrack)
            })
          }
        }
        return Reflect.has(...arguments)
      },
      set(target, key, value, receiver) {
        // if (window.ovldbg) {
        //   debugger
        //   window.ovldbg = undefined
        // }
        if (typeof value === "object") {
          if (preproxy.has(value)) {
            // if the value already got proxified this means we are trying to save a reference inside state
            // this is something we avoid because we would like to have a clean serializable and deserializable state
            // so in that case just create a deep clone of the obj and use that
            value = JSON.parse(JSON.stringify(value))
          }
          value = proxify(value, [...path, key])
        }
        // console.log("set proxy value:")
        // console.log(path)
        // console.log(value)
        target[key] = value
        if (!isTracking()) {
          let isArray = Array.isArray(target)
          let pathToTrack
          let pathToTrackParent
          if (!isArray) {
            pathToTrackParent = [...path].join(".")
            pathToTrack = [...path, key].join(".")
          } else if (isArray && key === "length") {
            pathToTrack = [...path].join(".")
          } else if (isArray) {
            pathToTrack = [...path, key].join(".")
            //console.log(pathToTrack)
          }
          if (pathToTrack) {
            checkForCallbacks(pathToTrack)
          }
          if (pathToTrackParent) {
            checkForCallbacks(pathToTrackParent)
          }
        }
        return true
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          unproxy(target, key)
          let deleted = Reflect.deleteProperty(target, key)
          if (deleted && !isTracking()) {
            checkForCallbacks([...path, key].join("."))
          }
          return deleted
        }
        return true
      },
    }
  }

  function unproxy(obj, key) {
    if (preproxy.has(obj[key])) {
      // console.log('unproxy',key);
      obj[key] = preproxy.get(obj[key])
      preproxy.delete(obj[key])
    }

    for (let k of Object.keys(obj[key])) {
      if (typeof obj[key][k] === "object") {
        unproxy(obj[key], k)
      }
    }
  }

  function proxify(obj, path) {
    if (obj) {
      for (let key of Object.keys(obj)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key] = proxify(obj[key], [...path, key])
        }
      }
      let p = new Proxy(obj, makeHandler(path))
      preproxy.set(p, obj)
      return p
    }
  }

  function checkForCallbacks(path) {
    let cbs = paths.get(path)
    if (cbs) {
      let freshQueueToRender = callbacksToCall.size === 0
      // console.log("tracked mutation on: " + path)
      // console.log("update will be called on:")
      cbs.forEach((key) => {
        // console.log("added for rerender:")
        // console.log(key.name)
        callbacksToCall.add(key)
      })
      // console.log(
      //   "Submitting for rAF: callbacksToCall Count: " +
      //     callbacksToCall.size.toString()
      // )

      if (freshQueueToRender) {
        window.requestAnimationFrame(callCallbacks)
      }
    }
  }
  function callCallbacks() {
    // call onUpdate method of affected component
    if (!window.blocked) {
      callbacksToCall.forEach(async (k) => {
        disposeTrack(k)
        //console.log("rerender: " + k.name)
        k.doRender()
      })
      callbacksToCall = new Set()
    } else {
      window.requestAnimationFrame(callCallbacks)
    }
  }
  return proxify(target, [])
}
