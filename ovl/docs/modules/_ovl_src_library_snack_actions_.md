[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Snack/actions"](_ovl_src_library_snack_actions_.md)

# Module: "ovl/src/library/Snack/actions"

## Index

### Functions

* [AddSnack](_ovl_src_library_snack_actions_.md#const-addsnack)
* [ClearSnack](_ovl_src_library_snack_actions_.md#const-clearsnack)
* [PlaceSnack](_ovl_src_library_snack_actions_.md#const-placesnack)
* [RemoveSnack](_ovl_src_library_snack_actions_.md#const-removesnack)

## Functions

### `Const` AddSnack

▸ **AddSnack**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Snack/actions.ts:76](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/actions.ts#L76)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`durationMs?` | number |
`key?` | string |
`text` | string |
`type` | [SnackType](_ovl_src_library_snack_snack_.md#snacktype) |

**Returns:** *Promise‹void›*

___

### `Const` ClearSnack

▸ **ClearSnack**(`__namedParameters`: object, `value`: string): *Promise‹void›*

*Defined in [ovl/src/library/Snack/actions.ts:13](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/actions.ts#L13)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *string*

**Returns:** *Promise‹void›*

___

### `Const` PlaceSnack

▸ **PlaceSnack**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/library/Snack/actions.ts:39](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/actions.ts#L39)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` RemoveSnack

▸ **RemoveSnack**(`_`: object, `value`: string): *Promise‹void›*

*Defined in [ovl/src/library/Snack/actions.ts:8](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/actions.ts#L8)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **value**: *string*

**Returns:** *Promise‹void›*
