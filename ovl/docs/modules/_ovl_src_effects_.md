[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/effects"](_ovl_src_effects_.md)

# Module: "ovl/src/effects"

## Index

### Variables

* [lastOfflineMsg](_ovl_src_effects_.md#let-lastofflinemsg)

### Functions

* [getRequest](_ovl_src_effects_.md#const-getrequest)
* [ovlFetch](_ovl_src_effects_.md#const-ovlfetch)
* [postRequest](_ovl_src_effects_.md#const-postrequest)

## Variables

### `Let` lastOfflineMsg

• **lastOfflineMsg**: *any*

*Defined in [ovl/src/effects.ts:7](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/effects.ts#L7)*

## Functions

### `Const` getRequest

▸ **getRequest**(`url`: any): *Promise‹object | object›*

*Defined in [ovl/src/effects.ts:16](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/effects.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | any |

**Returns:** *Promise‹object | object›*

___

### `Const` ovlFetch

▸ **ovlFetch**(`url`: any, `data`: any, `isBlob?`: boolean): *Promise‹object | object›*

*Defined in [ovl/src/effects.ts:20](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/effects.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | any |
`data` | any |
`isBlob?` | boolean |

**Returns:** *Promise‹object | object›*

___

### `Const` postRequest

▸ **postRequest**(`url`: any, `data`: any, `isBlob?`: boolean): *Promise‹object | object›*

*Defined in [ovl/src/effects.ts:9](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/effects.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | any |
`data` | any |
`isBlob?` | boolean |

**Returns:** *Promise‹object | object›*
