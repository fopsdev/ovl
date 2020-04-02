[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Snack/Snack"](_ovl_src_library_snack_snack_.md)

# Module: "ovl/src/library/Snack/Snack"

## Index

### Classes

* [OvlSnack](../classes/_ovl_src_library_snack_snack_.ovlsnack.md)

### Type aliases

* [SnackAddState](_ovl_src_library_snack_snack_.md#snackaddstate)
* [SnackState](_ovl_src_library_snack_snack_.md#snackstate)
* [SnackType](_ovl_src_library_snack_snack_.md#snacktype)

### Variables

* [nrOfSnacks](_ovl_src_library_snack_snack_.md#const-nrofsnacks)

### Functions

* [RemoveSnack](_ovl_src_library_snack_snack_.md#const-removesnack)

### Object literals

* [SnackId](_ovl_src_library_snack_snack_.md#let-snackid)

## Type aliases

###  SnackAddState

Ƭ **SnackAddState**: *object*

*Defined in [ovl/src/library/Snack/Snack.ts:19](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L19)*

#### Type declaration:

* **durationMs**? : *number*

* **key**? : *string*

* **text**: *string*

* **type**: *[SnackType](_ovl_src_library_snack_snack_.md#snacktype)*

___

###  SnackState

Ƭ **SnackState**: *object*

*Defined in [ovl/src/library/Snack/Snack.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L10)*

#### Type declaration:

* **durationMs**? : *number*

* **id**? : *number*

* **key**? : *string*

* **status**? : *"queued" | "running"*

* **text**: *string*

* **type**: *[SnackType](_ovl_src_library_snack_snack_.md#snacktype)*

___

###  SnackType

Ƭ **SnackType**: *"Information" | "Warning" | "Success" | "Error"*

*Defined in [ovl/src/library/Snack/Snack.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L4)*

## Variables

### `Const` nrOfSnacks

• **nrOfSnacks**: *3* = 3

*Defined in [ovl/src/library/Snack/Snack.ts:8](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L8)*

## Functions

### `Const` RemoveSnack

▸ **RemoveSnack**(`div`: any): *Promise‹void›*

*Defined in [ovl/src/library/Snack/Snack.ts:26](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`div` | any |

**Returns:** *Promise‹void›*

## Object literals

### `Let` SnackId

### ▪ **SnackId**: *object*

*Defined in [ovl/src/library/Snack/Snack.ts:6](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L6)*

###  id

• **id**: *number* = 0

*Defined in [ovl/src/library/Snack/Snack.ts:6](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Snack/Snack.ts#L6)*
