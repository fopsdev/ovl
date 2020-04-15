[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/helpers"](_ovl_src_library_helpers_.md)

# Module: "ovl/src/library/helpers"

## Index

### Functions

* [DialogOk](_ovl_src_library_helpers_.md#const-dialogok)
* [DialogOkCancel](_ovl_src_library_helpers_.md#const-dialogokcancel)
* [SnackAdd](_ovl_src_library_helpers_.md#const-snackadd)
* [SnackTrackedAdd](_ovl_src_library_helpers_.md#const-snacktrackedadd)
* [SnackTrackedRemove](_ovl_src_library_helpers_.md#const-snacktrackedremove)

## Functions

### `Const` DialogOk

▸ **DialogOk**(`text`: string): *Promise‹unknown›*

*Defined in [ovl/src/library/helpers.ts:17](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/helpers.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *Promise‹unknown›*

___

### `Const` DialogOkCancel

▸ **DialogOkCancel**(`text`: string, `defaultButton`: [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)): *Promise‹unknown›*

*Defined in [ovl/src/library/helpers.ts:6](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/helpers.ts#L6)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`text` | string | - |
`defaultButton` | [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype) | 1 |

**Returns:** *Promise‹unknown›*

___

### `Const` SnackAdd

▸ **SnackAdd**(`text`: string, `type`: [SnackType](_ovl_src_library_snack_snack_.md#snacktype), `durationMs`: number): *Promise‹void›*

*Defined in [ovl/src/library/helpers.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/helpers.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`text` | string | - |
`type` | [SnackType](_ovl_src_library_snack_snack_.md#snacktype) | "Success" |
`durationMs` | number | 4000 |

**Returns:** *Promise‹void›*

___

### `Const` SnackTrackedAdd

▸ **SnackTrackedAdd**(`text`: string, `type`: [SnackType](_ovl_src_library_snack_snack_.md#snacktype), `key`: string): *Promise‹void›*

*Defined in [ovl/src/library/helpers.ts:31](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/helpers.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`text` | string | - |
`type` | [SnackType](_ovl_src_library_snack_snack_.md#snacktype) | "Success" |
`key` | string | - |

**Returns:** *Promise‹void›*

___

### `Const` SnackTrackedRemove

▸ **SnackTrackedRemove**(`key`: string): *Promise‹void›*

*Defined in [ovl/src/library/helpers.ts:43](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/helpers.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *Promise‹void›*
