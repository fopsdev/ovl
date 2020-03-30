import { T } from "./global/globals"
import { overmind } from "./index"
import { SnackType } from "./library/Snack/Snack"
import { OvlConfig } from "./init"
import { SnackAdd } from "./library/helpers"

export let lastOfflineMsg

export const postRequest = async (url, data, isBlob?: boolean) => {
  if (isBlob !== undefined) {
    return ovlFetch(url, data, isBlob)
  } else {
    return ovlFetch(url, data)
  }
}
export const getRequest = async url => {
  return ovlFetch(url, undefined, true)
}

export const ovlFetch = async (url, data, isBlob?: boolean) => {
  let res
  let snackMessage = ""
  let snackMessageType: SnackType = "Information"
  try {
    overmind.actions.ovl.indicator.SetIndicatorOpen()
    // Create request to api service
    let isPost = !!data
    let headers = {}
    let method = "GET"
    if (isPost) {
      method = "POST"
      let contentType = "application/json"
      headers["Content-Type"] = contentType
    }
    let user = overmind.state.ovl.user
    if (user && user.token) {
      headers["Authorization"] = "Bearer " + overmind.state.ovl.user.token
    }
    const req = await fetch(url, {
      method,
      headers,
      // format the data
      body: JSON.stringify(data)
    })
    // with fetch we will have the repsonse status here on req object

    if (req.status === 401) {
      // unauthorised

      snackMessage = T("AppPleaseRelogin")
      overmind.actions.ovl.navigation.NavigateTo("Login")

      return
    } else if (req.status === 404) {
      snackMessage = "Not found"
      return {
        headers: req.headers,
        data: undefined,
        status: 404,
        message: "",
        type: ""
      }
    } else {
      // ok looks ok, but still could be server error with our custom messages
      if (isBlob) {
        res = await req.blob()
      } else {
        res = await req.json()
      }
      if (req.status === 400) {
        let type = res.type
        if (!type) {
          type = ""
          snackMessage = req.statusText
        }

        return {
          headers: req.headers,
          data: undefined,
          status: 400,
          message: res.message,
          type
        }
      } else if (req.ok) {
        // ok all good
        return {
          headers: req.headers,
          data: res,
          status: 200,
          message: "",
          type: ""
        }
      } else {
        // some case we didn't handle yet.... just also go to offline mode
        let dt: number = Date.now()
        if (lastOfflineMsg === undefined || dt - lastOfflineMsg > 5000) {
          lastOfflineMsg = dt
          if (OvlConfig._system.OfflineMode) {
            snackMessage = "Offline Mode"
          } else {
            snackMessage = "Server Error. Server offline?"
          }
        }
        return {
          headers: req.headers,
          data: undefined,
          status: 449,
          message: req.statusText,
          type: ""
        }
      }
    }
  } catch (err) {
    // generic error
    // go to offline mode
    let dt: number = Date.now()
    if (lastOfflineMsg === undefined || dt - lastOfflineMsg > 5000) {
      lastOfflineMsg = dt
      if (OvlConfig._system.OfflineMode) {
        snackMessage = "Offline Mode"
      } else {
        snackMessage = "Server Error. Server offline?"
      }
    }
    return {
      headers: undefined,
      data: undefined,
      status: 449,
      message: err,
      type: ""
    }
  } finally {
    overmind.actions.ovl.indicator.SetIndicatorClose()
    if (snackMessage) {
      SnackAdd(snackMessage, snackMessageType)
    }
  }
}
