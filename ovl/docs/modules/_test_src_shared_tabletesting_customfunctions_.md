[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/shared/TableTesting/customFunctions"](_test_src_shared_tabletesting_customfunctions_.md)

# Module: "test/src/shared/TableTesting/customFunctions"

## Index

### Functions

* [CustomAddRowColumnDefaultsHandler](_test_src_shared_tabletesting_customfunctions_.md#const-customaddrowcolumndefaultshandler)
* [CustomSelectRow](_test_src_shared_tabletesting_customfunctions_.md#const-customselectrow)
* [DeleteDisabledFn](_test_src_shared_tabletesting_customfunctions_.md#const-deletedisabledfn)
* [EditDisabledFn](_test_src_shared_tabletesting_customfunctions_.md#const-editdisabledfn)
* [GetRowStatus](_test_src_shared_tabletesting_customfunctions_.md#const-getrowstatus)
* [RowChanged](_test_src_shared_tabletesting_customfunctions_.md#const-rowchanged)
* [RowValidate](_test_src_shared_tabletesting_customfunctions_.md#const-rowvalidate)
* [U_ItemCodeGetFilteredListFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_itemcodegetfilteredlistfn)
* [U_ItemCodeGetListFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_itemcodegetlistfn)
* [U_ItemCodeLookupPostDataFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_itemcodelookuppostdatafn)
* [U_ItmsGrpCodGetListFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_itmsgrpcodgetlistfn)
* [U_ParentCode2GetListFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_parentcode2getlistfn)
* [U_ParentCodeGetListFn](_test_src_shared_tabletesting_customfunctions_.md#const-u_parentcodegetlistfn)
* [alphaStartsWithAFilterFn](_test_src_shared_tabletesting_customfunctions_.md#const-alphastartswithafilterfn)
* [alphaStartsWithBFilterFn](_test_src_shared_tabletesting_customfunctions_.md#const-alphastartswithbfilterfn)
* [alphaThenMemoSortFn](_test_src_shared_tabletesting_customfunctions_.md#const-alphathenmemosortfn)
* [memoContainsTestFilterFn](_test_src_shared_tabletesting_customfunctions_.md#const-memocontainstestfilterfn)
* [memoContainsTextFilterFn](_test_src_shared_tabletesting_customfunctions_.md#const-memocontainstextfilterfn)
* [memoThenAlphaSortFn](_test_src_shared_tabletesting_customfunctions_.md#const-memothenalphasortfn)
* [onlyTestSortFn](_test_src_shared_tabletesting_customfunctions_.md#const-onlytestsortfn)

## Functions

### `Const` CustomAddRowColumnDefaultsHandler

▸ **CustomAddRowColumnDefaultsHandler**(`newRow`: [TableTesting](_ovl_src_state_.md#tabletesting), `tableDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/shared/TableTesting/customFunctions.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`newRow` | [TableTesting](_ovl_src_state_.md#tabletesting) |
`tableDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` CustomSelectRow

▸ **CustomSelectRow**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/shared/TableTesting/customFunctions.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` DeleteDisabledFn

▸ **DeleteDisabledFn**(`rowKey`: string, `tableDefAndData`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹string›*

Defined in test/src/shared/TableTesting/customFunctions.ts:140

**Parameters:**

Name | Type |
------ | ------ |
`rowKey` | string |
`tableDefAndData` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹string›*

___

### `Const` EditDisabledFn

▸ **EditDisabledFn**(`rowKey`: string, `tableDefAndData`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹string›*

Defined in test/src/shared/TableTesting/customFunctions.ts:125

**Parameters:**

Name | Type |
------ | ------ |
`rowKey` | string |
`tableDefAndData` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹string›*

___

### `Const` GetRowStatus

▸ **GetRowStatus**(`key`: string, `tableDef`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹[RowStatus](_ovl_src_library_table_table_.md#rowstatus)›*

Defined in test/src/shared/TableTesting/customFunctions.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`tableDef` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹[RowStatus](_ovl_src_library_table_table_.md#rowstatus)›*

___

### `Const` RowChanged

▸ **RowChanged**(`value`: [FieldChanged](_ovl_src_library_forms_actions_.md#fieldchanged), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *Promise‹void›*

Defined in test/src/shared/TableTesting/customFunctions.ts:42

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

Defined in test/src/shared/TableTesting/customFunctions.ts:81

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ValidateField](_ovl_src_library_forms_actions_.md#validatefield) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *Promise‹void›*

___

### `Const` U_ItemCodeGetFilteredListFn

▸ **U_ItemCodeGetFilteredListFn**(`list`: [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue), `formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *string[]*

Defined in test/src/shared/TableTesting/customFunctions.ts:308

**Parameters:**

Name | Type |
------ | ------ |
`list` | [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue) |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *string[]*

___

### `Const` U_ItemCodeGetListFn

▸ **U_ItemCodeGetListFn**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/shared/TableTesting/customFunctions.ts:259

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` U_ItemCodeLookupPostDataFn

▸ **U_ItemCodeLookupPostDataFn**(`lookupData`: [LookupListPostData](_ovl_src_library_forms_controls_helpers_.md#lookuplistpostdata), `row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *void*

Defined in test/src/shared/TableTesting/customFunctions.ts:268

**Parameters:**

Name | Type |
------ | ------ |
`lookupData` | [LookupListPostData](_ovl_src_library_forms_controls_helpers_.md#lookuplistpostdata) |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *void*

___

### `Const` U_ItmsGrpCodGetListFn

▸ **U_ItmsGrpCodGetListFn**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/shared/TableTesting/customFunctions.ts:278

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` U_ParentCode2GetListFn

▸ **U_ParentCode2GetListFn**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/shared/TableTesting/customFunctions.ts:296

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` U_ParentCodeGetListFn

▸ **U_ParentCodeGetListFn**(`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

Defined in test/src/shared/TableTesting/customFunctions.ts:287

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *[ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)*

___

### `Const` alphaStartsWithAFilterFn

▸ **alphaStartsWithAFilterFn**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `key`: string, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *boolean*

Defined in test/src/shared/TableTesting/customFunctions.ts:207

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`key` | string |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *boolean*

___

### `Const` alphaStartsWithBFilterFn

▸ **alphaStartsWithBFilterFn**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `key`: string, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *boolean*

Defined in test/src/shared/TableTesting/customFunctions.ts:220

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`key` | string |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *boolean*

___

### `Const` alphaThenMemoSortFn

▸ **alphaThenMemoSortFn**(`a`: string, `b`: string, `data`: [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *number*

Defined in test/src/shared/TableTesting/customFunctions.ts:155

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |
`data` | [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *number*

___

### `Const` memoContainsTestFilterFn

▸ **memoContainsTestFilterFn**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `key`: string, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *boolean*

Defined in test/src/shared/TableTesting/customFunctions.ts:233

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`key` | string |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *boolean*

___

### `Const` memoContainsTextFilterFn

▸ **memoContainsTextFilterFn**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `key`: string, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *boolean*

Defined in test/src/shared/TableTesting/customFunctions.ts:245

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`key` | string |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *boolean*

___

### `Const` memoThenAlphaSortFn

▸ **memoThenAlphaSortFn**(`a`: string, `b`: string, `data`: [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *number*

Defined in test/src/shared/TableTesting/customFunctions.ts:173

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |
`data` | [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *number*

___

### `Const` onlyTestSortFn

▸ **onlyTestSortFn**(`a`: string, `b`: string, `data`: [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting), `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *number*

Defined in test/src/shared/TableTesting/customFunctions.ts:191

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |
`data` | [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting) |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

**Returns:** *number*
