import { registerRoute } from "workbox-routing"
import { CacheFirst } from "workbox-strategies"
const matchCb = ({ url, event }) => {
  return url.toString().indexOf("ovldataversion") < 0
}
registerRoute(
  matchCb,
  new CacheFirst({
    cacheName: "ovlassets",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10000,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET"
)
//
