[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Dialog/Dialog"](_ovl_src_library_dialog_dialog_.md)

# Module: "ovl/src/library/Dialog/Dialog"

## Index

### Classes

* [OvlDialog](../classes/_ovl_src_library_dialog_dialog_.ovldialog.md)

### Type aliases

* [CancelType](_ovl_src_library_dialog_dialog_.md#canceltype)
* [DialogChangedParam](_ovl_src_library_dialog_dialog_.md#dialogchangedparam)
* [DialogState](_ovl_src_library_dialog_dialog_.md#dialogstate)
* [OkType](_ovl_src_library_dialog_dialog_.md#oktype)
* [OpenDialogState](_ovl_src_library_dialog_dialog_.md#opendialogstate)
* [ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)

## Type aliases

###  CancelType

Ƭ **CancelType**: *"AppCancel" | "AppNo" | "NoButton"*

*Defined in [ovl/src/library/Dialog/Dialog.ts:10](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L10)*

___

###  DialogChangedParam

Ƭ **DialogChangedParam**: *object*

*Defined in [ovl/src/library/Dialog/Dialog.ts:5](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L5)*

#### Type declaration:

* **dialogState**: *[DialogState](_ovl_src_library_dialog_dialog_.md#dialogstate)*

* **result**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

___

###  DialogState

Ƭ **DialogState**: *object*

*Defined in [ovl/src/library/Dialog/Dialog.ts:21](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L21)*

#### Type declaration:

* **cancelText**: *string*

* **closing**: *boolean*

* **default**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **okText**: *string*

* **result**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **text**: *string*

* **visible**: *boolean*

___

###  OkType

Ƭ **OkType**: *"AppOk" | "AppYes" | "NoButton"*

*Defined in [ovl/src/library/Dialog/Dialog.ts:9](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L9)*

___

###  OpenDialogState

Ƭ **OpenDialogState**: *object*

*Defined in [ovl/src/library/Dialog/Dialog.ts:14](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L14)*

#### Type declaration:

* **cancel**: *[CancelType](_ovl_src_library_dialog_dialog_.md#canceltype)*

* **default**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

* **ok**: *[OkType](_ovl_src_library_dialog_dialog_.md#oktype)*

* **text**: *string*

___

###  ResultType

Ƭ **ResultType**: *undefined | 1 | 2*

*Defined in [ovl/src/library/Dialog/Dialog.ts:12](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Dialog/Dialog.ts#L12)*
