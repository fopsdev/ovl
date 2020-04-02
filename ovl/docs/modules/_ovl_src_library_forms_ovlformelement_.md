[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/OvlFormElement"](_ovl_src_library_forms_ovlformelement_.md)

# Module: "ovl/src/library/forms/OvlFormElement"

## Index

### Classes

* [OvlFormElement](../classes/_ovl_src_library_forms_ovlformelement_.ovlformelement.md)

### Type aliases

* [DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)
* [FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)
* [FormFields](_ovl_src_library_forms_ovlformelement_.md#formfields)
* [Schema](_ovl_src_library_forms_ovlformelement_.md#schema)

## Type aliases

###  DataType

Ƭ **DataType**: *"text" | "date" | "decimal" | "int" | "bool" | "time"*

Defined in ovl/src/library/forms/OvlFormElement.ts:21

___

###  FieldFormat

Ƭ **FieldFormat**: *"2digits" | "4digits" | "2digitsYear" | "timestamp"*

Defined in ovl/src/library/forms/OvlFormElement.ts:5

___

###  FormFields

Ƭ **FormFields**: *object*

Defined in ovl/src/library/forms/OvlFormElement.ts:13

#### Type declaration:

* **datafield**? : *string*

* **format**? : *[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)*

* **list**? : *[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)*

* **type**? : *[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)*

* **value**: *string*

___

###  Schema

Ƭ **Schema**: *object*

Defined in ovl/src/library/forms/OvlFormElement.ts:7

#### Type declaration:

* **maxLength**: *number*

* **nullable**: *boolean*

* **type**: *[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)*
