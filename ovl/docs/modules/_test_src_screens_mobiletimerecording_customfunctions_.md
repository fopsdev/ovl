[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/screens/MobileTimeRecording/customFunctions"](_test_src_screens_mobiletimerecording_customfunctions_.md)

# Module: "test/src/screens/MobileTimeRecording/customFunctions"

## Index

### Functions

* [BeforeSaveRow](_test_src_screens_mobiletimerecording_customfunctions_.md#const-beforesaverow)
* [CheckExistingTimeRange](_test_src_screens_mobiletimerecording_customfunctions_.md#const-checkexistingtimerange)
* [CheckFromTimeSmaller](_test_src_screens_mobiletimerecording_customfunctions_.md#const-checkfromtimesmaller)
* [CustomAddRowColumnDefaultsHandler](_test_src_screens_mobiletimerecording_customfunctions_.md#const-customaddrowcolumndefaultshandler)
* [RowChanged](_test_src_screens_mobiletimerecording_customfunctions_.md#const-rowchanged)
* [RowValidate](_test_src_screens_mobiletimerecording_customfunctions_.md#const-rowvalidate)
* [U_TypeGetListFn](_test_src_screens_mobiletimerecording_customfunctions_.md#const-u_typegetlistfn)
* [U_TypeIdGetListFn](_test_src_screens_mobiletimerecording_customfunctions_.md#const-u_typeidgetlistfn)
* [U_TypeIdLookupPostDataFn](_test_src_screens_mobiletimerecording_customfunctions_.md#const-u_typeidlookuppostdatafn)

## Functions

### `Const` BeforeSaveRow

▸ **BeforeSaveRow**(`value`: [BeforeSaveParam](_ovl_src_library_table_table_.md#beforesaveparam), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:192

**Parameters:**

Name | Type |
------ | ------ |
`value` | [BeforeSaveParam](_ovl_src_library_table_table_.md#beforesaveparam) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` CheckExistingTimeRange

▸ **CheckExistingTimeRange**(`state`: typeof state, `value`: [ValidateField](_ovl_src_library_forms_actions_.md#validatefield)): *void*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:100

**Parameters:**

Name | Type |
------ | ------ |
`state` | typeof state |
`value` | [ValidateField](_ovl_src_library_forms_actions_.md#validatefield) |

**Returns:** *void*

___

### `Const` CheckFromTimeSmaller

▸ **CheckFromTimeSmaller**(`formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate), `fieldId`: string): *void*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:122

**Parameters:**

Name | Type |
------ | ------ |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`fieldId` | string |

**Returns:** *void*

___

### `Const` CustomAddRowColumnDefaultsHandler

▸ **CustomAddRowColumnDefaultsHandler**(`newRow`: [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording), `tableDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:204

**Parameters:**

Name | Type |
------ | ------ |
`newRow` | [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording) |
`tableDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` RowChanged

▸ **RowChanged**(`value`: [FieldChanged](_ovl_src_library_forms_actions_.md#fieldchanged), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:152

**Parameters:**

Name | Type |
------ | ------ |
`value` | [FieldChanged](_ovl_src_library_forms_actions_.md#fieldchanged) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` RowValidate

▸ **RowValidate**(`value`: [ValidateField](_ovl_src_library_forms_actions_.md#validatefield), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ValidateField](_ovl_src_library_forms_actions_.md#validatefield) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` U_TypeGetListFn

▸ **U_TypeGetListFn**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` U_TypeIdGetListFn

▸ **U_TypeIdGetListFn**(`row`: [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`row` | [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` U_TypeIdLookupPostDataFn

▸ **U_TypeIdLookupPostDataFn**(`lookupData`: [LookupListPostData](_ovl_src_library_forms_controls_helpers_.md#lookuplistpostdata), `row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *void*

Defined in test/src/screens/MobileTimeRecording/customFunctions.ts:51

**Parameters:**

Name | Type |
------ | ------ |
`lookupData` | [LookupListPostData](_ovl_src_library_forms_controls_helpers_.md#lookuplistpostdata) |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *void*
