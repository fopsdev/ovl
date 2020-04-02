[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/actions"](_ovl_src_library_actions_.md)

# Module: "ovl/src/library/actions"

## Index

### Type aliases

* [DialogChangedParam](_ovl_src_library_actions_.md#dialogchangedparam)
* [DialogState](_ovl_src_library_actions_.md#dialogstate)

### Variables

* [dialogResolver](_ovl_src_library_actions_.md#let-dialogresolver)

### Functions

* [DialogChanged](_ovl_src_library_actions_.md#const-dialogchanged)
* [DialogClosed](_ovl_src_library_actions_.md#const-dialogclosed)
* [DialogDefaultChanged](_ovl_src_library_actions_.md#const-dialogdefaultchanged)
* [DialogResult](_ovl_src_library_actions_.md#const-dialogresult)
* [SetIndicatorClose](_ovl_src_library_actions_.md#const-setindicatorclose)
* [SetIndicatorOpen](_ovl_src_library_actions_.md#const-setindicatoropen)

## Type aliases

###  DialogChangedParam

Ƭ **DialogChangedParam**: *object*

*Defined in [ovl/src/library/actions.ts:61](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L61)*

#### Type declaration:

* **dialogState**: *[DialogState](_ovl_src_library_actions_.md#dialogstate)*

* **result**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

___

###  DialogState

Ƭ **DialogState**: *object*

*Defined in [ovl/src/library/actions.ts:66](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L66)*

#### Type declaration:

* **cancelText**: *string*

* **closing**: *boolean*

* **default**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **okText**: *string*

* **result**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **text**: *string*

* **visible**: *boolean*

## Variables

### `Let` dialogResolver

• **dialogResolver**: *function*

*Defined in [ovl/src/library/actions.ts:110](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L110)*

#### Type declaration:

▸ (`value?`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value?` | any |

## Functions

### `Const` DialogChanged

▸ **DialogChanged**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/actions.ts:76](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L76)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`dialogState` | [DialogState](_ovl_src_library_actions_.md#dialogstate) |
`result` | [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype) |

**Returns:** *void*

___

### `Const` DialogClosed

▸ **DialogClosed**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/library/actions.ts:98](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L98)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` DialogDefaultChanged

▸ **DialogDefaultChanged**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/actions.ts:91](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L91)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`default` | [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype) |

**Returns:** *void*

___

### `Const` DialogResult

▸ **DialogResult**(): *Promise‹unknown›*

*Defined in [ovl/src/library/actions.ts:111](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L111)*

**Returns:** *Promise‹unknown›*

___

### `Const` SetIndicatorClose

▸ **SetIndicatorClose**(`__namedParameters`: object): *void*

*Defined in [ovl/src/library/actions.ts:122](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L122)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

**Returns:** *void*

___

### `Const` SetIndicatorOpen

▸ **SetIndicatorOpen**(`__namedParameters`: object): *void*

*Defined in [ovl/src/library/actions.ts:117](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/actions.ts#L117)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

**Returns:** *void*
