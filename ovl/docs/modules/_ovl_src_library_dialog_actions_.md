[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Dialog/actions"](_ovl_src_library_dialog_actions_.md)

# Module: "ovl/src/library/Dialog/actions"

## Index

### Type aliases

* [OkCancelDialog](_ovl_src_library_dialog_actions_.md#okcanceldialog)

### Functions

* [DialogOpen](_ovl_src_library_dialog_actions_.md#const-dialogopen)
* [OkCancelDialog](_ovl_src_library_dialog_actions_.md#const-okcanceldialog)
* [OkDialog](_ovl_src_library_dialog_actions_.md#const-okdialog)

### Object literals

* [dialogAfterClose](_ovl_src_library_dialog_actions_.md#let-dialogafterclose)

## Type aliases

###  OkCancelDialog

Ƭ **OkCancelDialog**: *object*

*Defined in [ovl/src/library/Dialog/actions.ts:39](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L39)*

#### Type declaration:

* **default**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **text**: *string*

## Functions

### `Const` DialogOpen

▸ **DialogOpen**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Dialog/actions.ts:6](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L6)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`cancel` | [CancelType](_ovl_src_library_dialog_dialog_.md#canceltype) |
`default` | [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype) |
`ok` | [OkType](_ovl_src_library_dialog_dialog_.md#oktype) |
`text` | string |

**Returns:** *Promise‹void›*

___

### `Const` OkCancelDialog

▸ **OkCancelDialog**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Dialog/actions.ts:43](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L43)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`default` | [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype) |
`text` | string |

**Returns:** *Promise‹void›*

___

### `Const` OkDialog

▸ **OkDialog**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Dialog/actions.ts:54](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L54)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *Promise‹void›*

## Object literals

### `Let` dialogAfterClose

### ▪ **dialogAfterClose**: *object*

*Defined in [ovl/src/library/Dialog/actions.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L4)*

###  elementToFocus

• **elementToFocus**: *undefined* = undefined

*Defined in [ovl/src/library/Dialog/actions.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Dialog/actions.ts#L4)*
