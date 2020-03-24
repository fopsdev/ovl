import { registerRoute } from "workbox-routing"
import { CacheFirst } from "workbox-strategies"
const matchCb = ({ url, event }) => {
  return url.toString().indexOf("ovldataversion") < 0
}
registerRoute(matchCb, new CacheFirst(), "GET")
//
