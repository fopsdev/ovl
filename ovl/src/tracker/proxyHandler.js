import { paths, isTracking, addTrackedPath } from "./tracker"
export function createDeepProxy(target) {
  const preproxy = new WeakMap()
  let callbacksToCall = new Set()
  function makeHandler(path) {
    return {
      get(target, key, receiver) {
        // console.log(path.toString() + " key:" + key.toString())
        // if (key == 3) {
        //   debugger
        // }
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
        debugger
        if (typeof value === "object") {
          value = proxify(value, [...path, key])
        }
        target[key] = value
        let isArray = Array.isArray(target)
        let pathToTrack
        if (!isArray) {
          pathToTrack = [...path, key].join(".")
        } else if (isArray && key === "length") {
          pathToTrack = [...path].join(".")
        } else if (isArray) {
          pathToTrack = [...path, key].join(".")
        }
        if (pathToTrack) {
          checkForCallbacks(pathToTrack)
        }
        return true
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          unproxy(target, key)
          let deleted = Reflect.deleteProperty(target, key)
          if (deleted) {
            checkForCallbacks([...path, key].join("."))
          }
          return deleted
        }
        return false
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
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === "object") {
        obj[key] = proxify(obj[key], [...path, key])
      }
    }

    let p = new Proxy(obj, makeHandler(path))
    preproxy.set(p, obj)
    return p
  }

  function checkForCallbacks(path) {
    console.log("tracked mutation on: " + path)
    let cbs = paths.get(path)
    if (cbs) {
      let freshQueueToRender = callbacksToCall.size === 0
      console.log("update will be called on:")
      cbs.forEach((key) => {
        console.log(key.name)
        callbacksToCall.add(key)
      })
      if (freshQueueToRender) {
        console.log(
          "Submitting for rAF: callbacksToCall Count: " +
            callbacksToCall.size.toString()
        )
        window.requestAnimationFrame(callCallbacks)
      }
    }
  }
  function callCallbacks() {
    // call onUpdate method of affected component
    callbacksToCall.forEach(async (k) => {
      k.doRender()
    })
    callbacksToCall = new Set()
  }
  return proxify(target, [])
}
