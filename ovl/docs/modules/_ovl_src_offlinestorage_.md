[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/offlineStorage"](_ovl_src_offlinestorage_.md)

# Module: "ovl/src/offlineStorage"

## Index

### Type aliases

* [FileInfoStore](_ovl_src_offlinestorage_.md#fileinfostore)
* [FileStore](_ovl_src_offlinestorage_.md#filestore)

### Variables

* [dbPromise](_ovl_src_offlinestorage_.md#const-dbpromise)
* [ovlFileStoreInfoName](_ovl_src_offlinestorage_.md#const-ovlfilestoreinfoname)
* [ovlFileStoreName](_ovl_src_offlinestorage_.md#const-ovlfilestorename)
* [ovlStateStoreName](_ovl_src_offlinestorage_.md#const-ovlstatestorename)

### Object literals

* [fileStore](_ovl_src_offlinestorage_.md#const-filestore)
* [fileStoreInfo](_ovl_src_offlinestorage_.md#const-filestoreinfo)
* [stateStore](_ovl_src_offlinestorage_.md#const-statestore)

## Type aliases

###  FileInfoStore

Ƭ **FileInfoStore**: *object*

*Defined in [ovl/src/offlineStorage.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L18)*

#### Type declaration:

* **id**: *string*

* **lastAccess**: *Date*

* **refreshed**: *Date*

___

###  FileStore

Ƭ **FileStore**: *object*

*Defined in [ovl/src/offlineStorage.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L12)*

#### Type declaration:

* **content**: *any*

* **fileName**: *string*

* **id**: *string*

* **mimeType**: *string*

## Variables

### `Const` dbPromise

• **dbPromise**: *Promise‹IDBPDatabase‹unknown››* = openDB("ovl", 1, {
  upgrade(db) {
    db.createObjectStore(ovlStateStoreName)
    db.createObjectStore(ovlFileStoreName, { keyPath: "id" })
    db.createObjectStore(ovlFileStoreInfoName, { keyPath: "id" })
  }
})

*Defined in [ovl/src/offlineStorage.ts:5](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L5)*

___

### `Const` ovlFileStoreInfoName

• **ovlFileStoreInfoName**: *"ovlfileinfo"* = "ovlfileinfo"

*Defined in [ovl/src/offlineStorage.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L4)*

___

### `Const` ovlFileStoreName

• **ovlFileStoreName**: *"ovlfile"* = "ovlfile"

*Defined in [ovl/src/offlineStorage.ts:3](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L3)*

___

### `Const` ovlStateStoreName

• **ovlStateStoreName**: *"ovlstate"* = "ovlstate"

*Defined in [ovl/src/offlineStorage.ts:2](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L2)*

## Object literals

### `Const` fileStore

### ▪ **fileStore**: *object*

*Defined in [ovl/src/offlineStorage.ts:36](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L36)*

###  clear

▸ **clear**(): *Promise‹void›*

*Defined in [ovl/src/offlineStorage.ts:43](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L43)*

**Returns:** *Promise‹void›*

###  get

▸ **get**(`key`: string): *Promise‹any›*

*Defined in [ovl/src/offlineStorage.ts:37](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  set

▸ **set**(`val`: [FileStore](_ovl_src_offlinestorage_.md#filestore)): *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*

*Defined in [ovl/src/offlineStorage.ts:40](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | [FileStore](_ovl_src_offlinestorage_.md#filestore) |

**Returns:** *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*

___

### `Const` fileStoreInfo

### ▪ **fileStoreInfo**: *object*

*Defined in [ovl/src/offlineStorage.ts:48](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L48)*

###  clear

▸ **clear**(): *Promise‹void›*

*Defined in [ovl/src/offlineStorage.ts:55](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L55)*

**Returns:** *Promise‹void›*

###  get

▸ **get**(`key`: string): *Promise‹any›*

*Defined in [ovl/src/offlineStorage.ts:49](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  set

▸ **set**(`val`: [FileInfoStore](_ovl_src_offlinestorage_.md#fileinfostore)): *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*

*Defined in [ovl/src/offlineStorage.ts:52](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | [FileInfoStore](_ovl_src_offlinestorage_.md#fileinfostore) |

**Returns:** *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*

___

### `Const` stateStore

### ▪ **stateStore**: *object*

*Defined in [ovl/src/offlineStorage.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L24)*

###  clear

▸ **clear**(): *Promise‹void›*

*Defined in [ovl/src/offlineStorage.ts:31](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L31)*

**Returns:** *Promise‹void›*

###  get

▸ **get**(`key`: string): *Promise‹any›*

*Defined in [ovl/src/offlineStorage.ts:25](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹any›*

###  set

▸ **set**(`key`: string, `val`: any): *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*

*Defined in [ovl/src/offlineStorage.ts:28](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/offlineStorage.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`val` | any |

**Returns:** *Promise‹string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey‹››*
