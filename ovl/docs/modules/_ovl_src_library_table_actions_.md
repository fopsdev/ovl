[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Table/actions"](_ovl_src_library_table_actions_.md)

# Module: "ovl/src/library/Table/actions"

## Index

### Variables

* [lastRefreshMsg](_ovl_src_library_table_actions_.md#let-lastrefreshmsg)
* [minimumFilterChars](_ovl_src_library_table_actions_.md#const-minimumfilterchars)

### Functions

* [TableAddRow](_ovl_src_library_table_actions_.md#const-tableaddrow)
* [TableClearFilter](_ovl_src_library_table_actions_.md#const-tableclearfilter)
* [TableCopyRow](_ovl_src_library_table_actions_.md#const-tablecopyrow)
* [TableDeleteRow](_ovl_src_library_table_actions_.md#const-tabledeleterow)
* [TableDeleteRowFromData](_ovl_src_library_table_actions_.md#const-tabledeleterowfromdata)
* [TableDirectSaveRow](_ovl_src_library_table_actions_.md#const-tabledirectsaverow)
* [TableEditClose](_ovl_src_library_table_actions_.md#const-tableeditclose)
* [TableEditRow](_ovl_src_library_table_actions_.md#const-tableeditrow)
* [TableEditSaveRow](_ovl_src_library_table_actions_.md#const-tableeditsaverow)
* [TableEditSaveRowHelper](_ovl_src_library_table_actions_.md#const-tableeditsaverowhelper)
* [TableFilter](_ovl_src_library_table_actions_.md#const-tablefilter)
* [TableFilterSelected](_ovl_src_library_table_actions_.md#const-tablefilterselected)
* [TableMoreRow](_ovl_src_library_table_actions_.md#const-tablemorerow)
* [TableMultipleCopyRow](_ovl_src_library_table_actions_.md#const-tablemultiplecopyrow)
* [TableMultipleDeleteRow](_ovl_src_library_table_actions_.md#const-tablemultipledeleterow)
* [TableMultipleEditRow](_ovl_src_library_table_actions_.md#const-tablemultipleeditrow)
* [TableRefresh](_ovl_src_library_table_actions_.md#const-tablerefresh)
* [TableRefreshDataFromServer](_ovl_src_library_table_actions_.md#const-tablerefreshdatafromserver)
* [TableSelectAll](_ovl_src_library_table_actions_.md#const-tableselectall)
* [TableSelectColumnFilter](_ovl_src_library_table_actions_.md#const-tableselectcolumnfilter)
* [TableSelectCustomFilter](_ovl_src_library_table_actions_.md#const-tableselectcustomfilter)
* [TableSelectCustomSort](_ovl_src_library_table_actions_.md#const-tableselectcustomsort)
* [TableSelectHeader](_ovl_src_library_table_actions_.md#const-tableselectheader)
* [TableSelectRow](_ovl_src_library_table_actions_.md#const-tableselectrow)
* [TableSetPage](_ovl_src_library_table_actions_.md#const-tablesetpage)
* [TableSort](_ovl_src_library_table_actions_.md#const-tablesort)
* [TableViewRefresh](_ovl_src_library_table_actions_.md#const-tableviewrefresh)

## Variables

### `Let` lastRefreshMsg

• **lastRefreshMsg**: *number* = 0

*Defined in [ovl/src/library/Table/actions.ts:304](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L304)*

___

### `Const` minimumFilterChars

• **minimumFilterChars**: *3* = 3

*Defined in [ovl/src/library/Table/actions.ts:38](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L38)*

## Functions

### `Const` TableAddRow

▸ **TableAddRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:800](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L800)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *Promise‹void›*

___

### `Const` TableClearFilter

▸ **TableClearFilter**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:49](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L49)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *void*

___

### `Const` TableCopyRow

▸ **TableCopyRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:758](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L758)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *Promise‹void›*

___

### `Const` TableDeleteRow

▸ **TableDeleteRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:864](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L864)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`isMass?` | boolean |
`key` | string |

**Returns:** *Promise‹void›*

___

### `Const` TableDeleteRowFromData

▸ **TableDeleteRowFromData**(`_`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:1226](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L1226)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableDirectSaveRow

▸ **TableDirectSaveRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:420](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L420)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`noSnack?` | boolean |
`rowToSave` | object |

**Returns:** *Promise‹void›*

___

### `Const` TableEditClose

▸ **TableEditClose**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:701](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L701)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`key` | string |
`tableDef` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *void*

___

### `Const` TableEditRow

▸ **TableEditRow**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:715](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L715)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableEditSaveRow

▸ **TableEditSaveRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:452](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L452)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`key` | string |

**Returns:** *Promise‹void›*

___

### `Const` TableEditSaveRowHelper

▸ **TableEditSaveRowHelper**(`key`: string, `def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate) | null, `state`: typeof state, `actions`: typeof actions, `rowToSave?`: object, `noSnack?`: boolean): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:463](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) &#124; null |
`state` | typeof state |
`actions` | typeof actions |
`rowToSave?` | object |
`noSnack?` | boolean |

**Returns:** *Promise‹void›*

___

### `Const` TableFilter

▸ **TableFilter**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:105](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L105)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`value` | string |

**Returns:** *void*

___

### `Const` TableFilterSelected

▸ **TableFilterSelected**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:63](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L63)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *void*

___

### `Const` TableMoreRow

▸ **TableMoreRow**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:746](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L746)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableMultipleCopyRow

▸ **TableMultipleCopyRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:1038](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L1038)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *Promise‹void›*

___

### `Const` TableMultipleDeleteRow

▸ **TableMultipleDeleteRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:934](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L934)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *Promise‹void›*

___

### `Const` TableMultipleEditRow

▸ **TableMultipleEditRow**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:1133](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L1133)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *Promise‹void›*

___

### `Const` TableRefresh

▸ **TableRefresh**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:310](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L310)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`forceFreshServerData?` | number |
`init?` | boolean |

**Returns:** *Promise‹void›*

___

### `Const` TableRefreshDataFromServer

▸ **TableRefreshDataFromServer**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/library/Table/actions.ts:166](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L166)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *Promise‹void›*

___

### `Const` TableSelectAll

▸ **TableSelectAll**(`__namedParameters`: object, `def`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:124](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L124)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **def**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`select` | boolean |
`tableDef` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *void*

___

### `Const` TableSelectColumnFilter

▸ **TableSelectColumnFilter**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:647](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L647)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`columnId` | string |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`filter` | object |
`key` | [ColumnFilterTypes](_ovl_src_library_table_table_.md#columnfiltertypes) |
`othersCount` | number |

**Returns:** *void*

___

### `Const` TableSelectCustomFilter

▸ **TableSelectCustomFilter**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:676](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L676)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`id` | string |

**Returns:** *void*

___

### `Const` TableSelectCustomSort

▸ **TableSelectCustomSort**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:633](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L633)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`id` | string |

**Returns:** *void*

___

### `Const` TableSelectHeader

▸ **TableSelectHeader**(`__namedParameters`: object, `def`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:76](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L76)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **def**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableSelectRow

▸ **TableSelectRow**(`_`: object, `selectRow`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:137](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L137)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **selectRow**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableSetPage

▸ **TableSetPage**(`_`: object, `pageDef`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:40](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L40)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **pageDef**: *object*

Name | Type |
------ | ------ |
`page` | number |
`paging` | [Paging](_ovl_src_library_table_table_.md#paging) |

**Returns:** *void*

___

### `Const` TableSort

▸ **TableSort**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:93](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L93)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`ascending` | boolean |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`key` | string |

**Returns:** *void*

___

### `Const` TableViewRefresh

▸ **TableViewRefresh**(`__namedParameters`: object, `value`: object): *void*

*Defined in [ovl/src/library/Table/actions.ts:151](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/actions.ts#L151)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |

**Returns:** *void*
