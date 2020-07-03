import { T } from "./global/globals"

import { OvlConfig } from "./init"
import { SnackAdd } from "./library/helpers"
import { SnackType } from "./library/Snack/Snack"
import { ovl } from "."
import { AddSnack } from "./library/Snack/actions"

export let lastOfflineMsg

export const postRequest = async (
  url,
  data,
  isBlob?: boolean,
  noSnack?: boolean
) => {
  return ovlFetch(url, data, "POST", isBlob, noSnack)
}

export type GETRequestParams = {
  cat: string
  id1: string
  id2?: string
  ext?: string
  mode?: string
}

export const getRequest = async (
  url,
  data: GETRequestParams,
  isBlob?: boolean,
  noSnack?: boolean
) => {
  return ovlFetch(url, data, "GET", isBlob, noSnack)
}

export const ovlFetch = async (
  url,
  data,
  method: string,
  isBlob?: boolean,
  noSnack?: boolean
) => {
  let res
  let snackMessage = ""
  let snackMessageType: SnackType = "Information"
  let reqOptions
  try {
    ovl.actions.ovl.indicator.SetIndicatorOpen()
    // Create request to api service

    let headers = {}
    if (method === "POST") {
      let contentType = "application/json"
      headers["Content-Type"] = contentType
    }
    let user = ovl.state.ovl.user
    if (user && user.token) {
      headers["Authorization"] = "Bearer " + ovl.state.ovl.user.token
    }
    reqOptions = {
      method,
      headers,
      signal: undefined,
    }
    if (method === "POST") {
      reqOptions["body"] = JSON.stringify(data)
    } else if (data) {
      // encode data as url param
      const UrlCreator = window.URL || window.webkitURL
      var urlWithParams = new UrlCreator(url)
      if (data.cat) {
        urlWithParams.searchParams.append("cat", data.cat)
      } else {
        throw Error("ovl error: fetch asset needs 'cat' param!")
      }
      if (data.id1) {
        urlWithParams.searchParams.append("id1", data.id1)
      } else {
        throw Error("ovl error: fetch asset needs 'id1' param!")
      }
      if (data.id2) {
        urlWithParams.searchParams.append("id2", data.id2)
      }
      if (data.ext) {
        urlWithParams.searchParams.append("ext", data.ext)
      }
      if (data.mode) {
        urlWithParams.searchParams.append("mode", data.mode)
      }

      // encode params as url param
      url = urlWithParams.toString()
    }

    const controller = new AbortController()
    const { signal } = controller

    let timer = setTimeout(() => {
      controller.abort()
    }, 10000)

    reqOptions.signal = signal
    const req = await fetch(url, reqOptions)
    clearTimeout(timer)
    ovl.state.ovl.app.offline = false
    // with fetch we will have the repsonse status here on req object
    if (req.status === 401) {
      // unauthorised

      snackMessage = T("AppPleaseRelogin")
      //@ts-ignore
      // ovl.actions.ovl.dialog.DialogOpen({
      //   dialogType: "Login",
      //   elementIdToFocusAfterClose: "loginformuser",
      // })
      ovl.state.ovl.user.token = ""
      return
    } else if (req.status === 404) {
      snackMessage = "Not found"
      return {
        headers: req.headers,
        data: undefined,
        status: 404,
        message: "",
        type: "",
      }
    } else {
      // ok looks ok, but still could be server error with our custom messages
      if (isBlob) {
        res = await req.blob()
      } else {
        const contentType = req.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          res = await req.json()
        }
      }

      if (req.ok) {
        // ok all good
        return {
          headers: req.headers,
          data: res,
          status: 200,
          message: "",
          type: "",
        }
      } else {
        let type
        let message
        if (res) {
          type = res.type
          message = res.message
        }
        if (!type) {
          type = ""
          snackMessageType = "Error"
          if (!message) {
            message = req.status
          }
          snackMessage = "Server Error: " + message
        }
        return {
          fetchParams: { url, reqOptions },
          headers: req.headers,
          data: undefined,
          status: req.status,
          message,
          type,
        }
      }
    }
  } catch (err) {
    console.log(err)
    // connection error
    // well...  go to offline mode
    ovl.state.ovl.app.offline = true
    return {
      fetchParams: { url, reqOptions },
      headers: undefined,
      data: undefined,
      status: 449,
      message: err,
      type: "",
    }
  } finally {
    ovl.actions.ovl.indicator.SetIndicatorClose()
    if (!noSnack && snackMessage) {
      if (snackMessageType === "Error") {
        console.log("Fetch Error: " + snackMessage)
      }
      SnackAdd(snackMessage, snackMessageType)
    }
  }
}
