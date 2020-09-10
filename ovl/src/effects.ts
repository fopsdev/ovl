import { T, saveState, stringifyReplacer } from "./global/globals"

import { OvlConfig } from "./init"
import { SnackAdd } from "./library/helpers"
import { SnackType } from "./library/Snack/Snack"
import { ovl } from "."
import { AddSnack } from "./library/Snack/actions"

export let lastNoServerConnectionMsg: number

export const postRequest = async (
  url,
  data,
  isBlob?: boolean,
  noSnack?: boolean,
  customTimeoutMs?: number
) => {
  return await ovlFetch(url, data, "POST", isBlob, noSnack, customTimeoutMs)
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
  noSnack?: boolean,
  customTimeoutMs?: number
) => {
  let res
  let snackMessage = ""
  let snackMessageType: SnackType = "Information"
  let reqOptions
  let timer
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
    if (data) {
      data.clientId = ovl.state.ovl.user.clientId
    }
    if (method === "POST") {
      reqOptions["body"] = JSON.stringify(data, stringifyReplacer)
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
      // get requests will always use a diskCache version which is persisted in state and recreated if page reload
      urlWithParams.searchParams.append(
        "v",
        ovl.state.ovl.app.discCacheVersion.toString()
      )
      urlWithParams.searchParams.append("clientId", ovl.state.ovl.user.clientId)

      // encode params as url param
      url = urlWithParams.toString()
    }

    //there is no need to have an timeout in offline mode...
    if (OvlConfig._system.OfflineMode) {
      const controller = new AbortController()
      const { signal } = controller
      let timeOutMs = OvlConfig._system.fetchTimeout
      if (customTimeoutMs) {
        timeOutMs = customTimeoutMs
      }
      timer = setTimeout(() => {
        controller.abort()
      }, timeOutMs)

      reqOptions.signal = signal
    }

    const req = await fetch(url, reqOptions)
    if (OvlConfig._system.OfflineMode) {
      clearTimeout(timer)
    }
    if (method === "POST") {
      ovl.state.ovl.app.offline = false
    }
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
      let nfurl = url
      if (data.id1) {
        nfurl = data.id1
      }
      snackMessage = T("AppResourceNotFound", [nfurl])
      snackMessageType = "Error"
      return {
        headers: req.headers,
        data: undefined,
        status: 404,
        message: "Not Found",
        type: "",
      }
    } else if (req.status === 400) {
      let msg = await req.json()
      let type = ""
      if (msg) {
        if (msg.message && !msg.type) {
          snackMessage = msg.message
        } else if (!msg.type) {
          snackMessage = req.statusText
        }
        if (msg.type) {
          // returning a type means that the calling action can do some useful stuff and no error msg will be displayed
          type = msg.type
        }
      }
      snackMessageType = "Error"
      return {
        headers: req.headers,
        data: undefined,
        status: 400,
        message: req.statusText,
        type: type,
      }
    } else if (req.status === 422) {
      let type = ""
      let msg = await req.json()
      if (!msg.type || msg.type.indexOf("https://") > -1) {
        // if (msg && msg.message) {
        //   snackMessage = msg.message
        // } else {
        //   snackMessage = req.statusText
        // }
        snackMessage = T("ServerIntegrityError")
        snackMessageType = "Error"
      } else {
        type = msg.type
      }
      return {
        headers: req.headers,
        data: undefined,
        status: 422,
        message: msg.errormessage,
        type,
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
    let now = Date.now()
    if (!OvlConfig._system.OfflineMode) {
      if (
        !lastNoServerConnectionMsg ||
        now - lastNoServerConnectionMsg > 4000
      ) {
        lastNoServerConnectionMsg = now
        SnackAdd(T("AppNoServerConnection"), "Warning")
      }
    }

    return {
      fetchParams: { url, reqOptions },
      headers: undefined,
      data: undefined,
      status: 449,
      message: err,
      type: "",
    }
  } finally {
    if (timer) {
      clearTimeout(timer)
    }
    ovl.actions.ovl.indicator.SetIndicatorClose()
    // if (method === "POST") {
    //   saveState(true, "fetchpost")
    // }
    if (snackMessage) {
      if (!noSnack || snackMessageType === "Error") {
        if (snackMessageType === "Error") {
          console.log("Fetch Error: " + snackMessage)
        }
        SnackAdd(snackMessage, snackMessageType)
      }
    }
  }
}
