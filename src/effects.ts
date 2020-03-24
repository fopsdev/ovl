import { api, T } from "./global/globals"
import { overmind } from "./index"
import { SnackType } from "./library/Snack/Snack"

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
    overmind.actions.ovl.internal.SetIndicatorOpen()
    // Create request to api service
    let isPost = !!data
    let headers = {}
    let method = "GET"
    if (isPost) {
      method = "POST"
      let contentType = "application/json"
      headers["Content-Type"] = contentType
    }
    if (overmind.state.ovl.user.token) {
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
      overmind.actions.ovl.global.NavigateTo("Login")
      return
    } else if (req.status === 404) {
      snackMessage = "File not found"
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
          snackMessage = "Offline Mode"
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
      snackMessage = "Offline Mode"
    }
    return {
      headers: undefined,
      data: undefined,
      status: 449,
      message: err,
      type: ""
    }
  } finally {
    overmind.actions.ovl.internal.SetIndicatorClose()
    if (snackMessage) {
      overmind.actions.ovl.snack.AddSnack({
        durationMs: 5000,
        text: snackMessage,
        type: snackMessageType
      })
    }
  }
}
