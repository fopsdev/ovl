import { openDB } from "idb"
const ovlStateStoreName = "ovlstate"
const ovlFileStoreName = "ovlfile"
const ovlFileStoreInfoName = "ovlfileinfo"
const dbPromise = openDB("ovl", 1, {
  upgrade(db) {
    db.createObjectStore(ovlStateStoreName)
    db.createObjectStore(ovlFileStoreName, { keyPath: "id" })
    db.createObjectStore(ovlFileStoreInfoName, { keyPath: "id" })
  },
})
// export type FileStore = {
//   id: string
//   content: any
//   fileName: string
//   mimeType: string
// }
// export type FileInfoStore = {
//   id: string
//   lastAccess: Date
//   refreshed: Date
// }

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

// export const fileStore = {
//   async get(key: string) {
//     return (await dbPromise).get(ovlFileStoreName, key)
//   },
//   async set(val: FileStore) {
//     return (await dbPromise).put(ovlFileStoreName, val)
//   },
//   async clear() {
//     return (await dbPromise).clear(ovlFileStoreName)
//   }
// }

// export const fileStoreInfo = {
//   async get(key: string) {
//     return (await dbPromise).get(ovlFileStoreInfoName, key)
//   },
//   async set(val: FileInfoStore) {
//     return (await dbPromise).put(ovlFileStoreInfoName, val)
//   },
//   async clear() {
//     return (await dbPromise).clear(ovlFileStoreInfoName)
//   }
// }
