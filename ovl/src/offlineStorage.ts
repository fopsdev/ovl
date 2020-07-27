import { openDB } from "idb"
const ovlStateStoreName = "ovlstate"
const ovlTimestamp = "ovltimestamp"
const dbPromise = openDB("ovl", 1, {
  upgrade(db) {
    db.createObjectStore(ovlStateStoreName)
    db.createObjectStore(ovlTimestamp)
  },
})
export const stateStore = {
  async get(key: string) {
    return (await dbPromise).get(ovlStateStoreName, key)
  },
  async set(key: string, val) {
    return (await dbPromise).put(ovlStateStoreName, val, key)
  },
  async clear() {
    return (await dbPromise).clear(ovlStateStoreName)
  },
}
