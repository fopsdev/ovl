[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/Controls/helpers"](_ovl_src_library_forms_controls_helpers_.md)

# Module: "ovl/src/library/forms/Controls/helpers"

## Index

### Type aliases

* [LookupListPostData](_ovl_src_library_forms_controls_helpers_.md#lookuplistpostdata)

### Functions

* [FilterHitList](_ovl_src_library_forms_controls_helpers_.md#const-filterhitlist)
* [GetListDisplayValue](_ovl_src_library_forms_controls_helpers_.md#const-getlistdisplayvalue)
* [GetRowFromFormState](_ovl_src_library_forms_controls_helpers_.md#const-getrowfromformstate)
* [KeyValueListFromServerFn](_ovl_src_library_forms_controls_helpers_.md#const-keyvaluelistfromserverfn)

## Type aliases

###  LookupListPostData

Ƭ **LookupListPostData**: *object*

Defined in ovl/src/library/forms/Controls/helpers.ts:8

#### Type declaration:

* **filterValue**: *string*

* **lang**: *string*

* **lookupType**: *string*

* **paramList**(): *object*

* **url**: *string*

## Functions

### `Const` FilterHitList

▸ **FilterHitList**(`list`: [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate), `filterValue`: string, `formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate), `state`: typeof state, `fieldId`: string, `top?`: number): *string[]*

Defined in ovl/src/library/forms/Controls/helpers.ts:77

**Parameters:**

Name | Type |
------ | ------ |
`list` | [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate) |
`filterValue` | string |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`state` | typeof state |
`fieldId` | string |
`top?` | number |

**Returns:** *string[]*

___

### `Const` GetListDisplayValue

▸ **GetListDisplayValue**(`list`: [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate), `value`: string, `listdata`: [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)): *any*

Defined in ovl/src/library/forms/Controls/helpers.ts:153

**Parameters:**

Name | Type |
------ | ------ |
`list` | [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate) |
`value` | string |
`listdata` | [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue) |

**Returns:** *any*

___

### `Const` GetRowFromFormState

▸ **GetRowFromFormState**(`formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate)): *object*

Defined in ovl/src/library/forms/Controls/helpers.ts:171

**Parameters:**

Name | Type |
------ | ------ |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |

**Returns:** *object*

___

### `Const` KeyValueListFromServerFn

▸ **KeyValueListFromServerFn**(`state`: typeof state, `list`: [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate), `listData`: [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue), `filterValue`: string, `row`: object, `namespace`: string, `fieldId`: string, `effects`: typeof effects, `paramList?`: object): *Promise‹void›*

Defined in ovl/src/library/forms/Controls/helpers.ts:16

**Parameters:**

Name | Type |
------ | ------ |
`state` | typeof state |
`list` | [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate) |
`listData` | [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue) |
`filterValue` | string |
`row` | object |
`namespace` | string |
`fieldId` | string |
`effects` | typeof effects |
`paramList?` | object |

**Returns:** *Promise‹void›*
