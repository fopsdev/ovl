[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/screens/Translation/state"](_test_src_screens_translation_state_.md)

# Module: "test/src/screens/Translation/state"

## Index

### Type aliases

* [TblTranslation](_test_src_screens_translation_state_.md#tbltranslation)
* [TblTranslationColumn](_test_src_screens_translation_state_.md#tbltranslationcolumn)
* [Translation](_test_src_screens_translation_state_.md#translation)

### Object literals

* [tblTranslation](_test_src_screens_translation_state_.md#let-tbltranslation)

## Type aliases

###  TblTranslation

Ƭ **TblTranslation**: *object*

*Defined in [test/src/screens/Translation/state.ts:12](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L12)*

#### Type declaration:

* \[ **key**: *string*\]: [Translation](_test_src_screens_translation_state_.md#translation)

___

###  TblTranslationColumn

Ƭ **TblTranslationColumn**: *keyof Translation*

*Defined in [test/src/screens/Translation/state.ts:10](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L10)*

___

###  Translation

Ƭ **Translation**: *object*

*Defined in [test/src/screens/Translation/state.ts:3](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L3)*

#### Type declaration:

* **U_Code**: *string*

* **U_DE**: *string*

* **U_FR**: *string*

* **U_Group**: *string*

## Object literals

### `Let` tblTranslation

### ▪ **tblTranslation**: *object*

*Defined in [test/src/screens/Translation/state.ts:16](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L16)*

###  id

• **id**: *"translation"* = "translation"

*Defined in [test/src/screens/Translation/state.ts:17](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L17)*

###  namespace

• **namespace**: *string* = "portal.system.translations"

*Defined in [test/src/screens/Translation/state.ts:18](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L18)*

▪ **columns**: *object*

*Defined in [test/src/screens/Translation/state.ts:26](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L26)*

* **U_Code**: *object*

  * **caption**: *string* = "AppColTranslationCode"

  * **editable**: *true* = true

  * **sortable**: *true* = true

* **U_DE**: *object*

  * **caption**: *string* = "AppColTranslationDE"

  * **control**: *"textarea"* = "textarea"

  * **editable**: *true* = true

  * **sortable**: *true* = true

* **U_FR**: *object*

  * **caption**: *string* = "AppColTranslationFR"

  * **control**: *"textarea"* = "textarea"

  * **editable**: *true* = true

  * **sortable**: *true* = true

* **U_Group**: *object*

  * **caption**: *string* = "AppColTranslationGroup"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 10

▪ **database**: *object*

*Defined in [test/src/screens/Translation/state.ts:19](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L19)*

* **dataIdField**: *string* = "Code"

* **dbInsertMode**: *"UDTAutoGUID"* = "UDTAutoGUID"

▪ **server**: *object*

*Defined in [test/src/screens/Translation/state.ts:23](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/Translation/state.ts#L23)*

* **endpoint**: *string* = "translation"
