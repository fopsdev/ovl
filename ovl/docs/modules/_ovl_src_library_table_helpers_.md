[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Table/helpers"](_ovl_src_library_table_helpers_.md)

# Module: "ovl/src/library/Table/helpers"

## Index

### Functions

* [TableFilterFn](_ovl_src_library_table_helpers_.md#const-tablefilterfn)
* [deleteTableRow](_ovl_src_library_table_helpers_.md#const-deletetablerow)
* [getDateSort](_ovl_src_library_table_helpers_.md#const-getdatesort)
* [getDisplayValue](_ovl_src_library_table_helpers_.md#const-getdisplayvalue)
* [getFormFieldsFromColumns](_ovl_src_library_table_helpers_.md#const-getformfieldsfromcolumns)
* [getTextSort](_ovl_src_library_table_helpers_.md#const-gettextsort)
* [initTableState](_ovl_src_library_table_helpers_.md#const-inittablestate)
* [selectLatestRow](_ovl_src_library_table_helpers_.md#const-selectlatestrow)
* [setPage](_ovl_src_library_table_helpers_.md#const-setpage)
* [setRefresh](_ovl_src_library_table_helpers_.md#const-setrefresh)
* [setTableRow](_ovl_src_library_table_helpers_.md#const-settablerow)

## Functions

### `Const` TableFilterFn

▸ **TableFilterFn**(`tableDataAndDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `calledFromColumnFilterId?`: string): *string[]*

*Defined in [ovl/src/library/Table/helpers.ts:563](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L563)*

**Parameters:**

Name | Type |
------ | ------ |
`tableDataAndDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`calledFromColumnFilterId?` | string |

**Returns:** *string[]*

___

### `Const` deleteTableRow

▸ **deleteTableRow**(`tableDataAndDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `key`: string): *void*

*Defined in [ovl/src/library/Table/helpers.ts:193](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`tableDataAndDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`key` | string |

**Returns:** *void*

___

### `Const` getDateSort

▸ **getDateSort**(`valA`: string, `valB`: string): *number*

*Defined in [ovl/src/library/Table/helpers.ts:35](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`valA` | string |
`valB` | string |

**Returns:** *number*

___

### `Const` getDisplayValue

▸ **getDisplayValue**(`key`: string, `col`: [ColumnDisplayDef](_ovl_src_library_table_table_.md#columndisplaydef), `row`: any, `listdata?`: [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)): *string*

*Defined in [ovl/src/library/Table/helpers.ts:41](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`col` | [ColumnDisplayDef](_ovl_src_library_table_table_.md#columndisplaydef) |
`row` | any |
`listdata?` | [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue) |

**Returns:** *string*

___

### `Const` getFormFieldsFromColumns

▸ **getFormFieldsFromColumns**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `row`: any): *object*

*Defined in [ovl/src/library/Table/helpers.ts:698](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L698)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`row` | any |

**Returns:** *object*

* \[ **key**: *string*\]: [FormFields](_ovl_src_library_forms_ovlformelement_.md#formfields)

___

### `Const` getTextSort

▸ **getTextSort**(`valA`: string, `valB`: string): *number*

*Defined in [ovl/src/library/Table/helpers.ts:21](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`valA` | string |
`valB` | string |

**Returns:** *number*

___

### `Const` initTableState

▸ **initTableState**(`tableDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `actions`: typeof actions, `forceFreshServerData`: number, `isMobile`: boolean): *Promise‹void›*

*Defined in [ovl/src/library/Table/helpers.ts:313](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L313)*

**Parameters:**

Name | Type |
------ | ------ |
`tableDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`actions` | typeof actions |
`forceFreshServerData` | number |
`isMobile` | boolean |

**Returns:** *Promise‹void›*

___

### `Const` selectLatestRow

▸ **selectLatestRow**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata)): *void*

*Defined in [ovl/src/library/Table/helpers.ts:212](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |

**Returns:** *void*

___

### `Const` setPage

▸ **setPage**(`def`: [TableDef](_ovl_src_library_table_table_.md#tabledef), `data`: [TableData](_ovl_src_library_table_table_.md#tabledata), `rows`: object): *void*

*Defined in [ovl/src/library/Table/helpers.ts:228](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDef](_ovl_src_library_table_table_.md#tabledef) |
`data` | [TableData](_ovl_src_library_table_table_.md#tabledata) |
`rows` | object |

**Returns:** *void*

___

### `Const` setRefresh

▸ **setRefresh**(`def`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `isAdd`: boolean, `updatedData`: object, `key`: string, `serverRefresh`: string): *void*

*Defined in [ovl/src/library/Table/helpers.ts:250](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`isAdd` | boolean |
`updatedData` | object |
`key` | string |
`serverRefresh` | string |

**Returns:** *void*

___

### `Const` setTableRow

▸ **setTableRow**(`tableDataAndDef`: [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef), `tempId`: string, `newId`: string, `newData`: any, `editMode`: boolean, `actions`: typeof actions): *void*

*Defined in [ovl/src/library/Table/helpers.ts:75](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/helpers.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`tableDataAndDef` | [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef) |
`tempId` | string |
`newId` | string |
`newData` | any |
`editMode` | boolean |
`actions` | typeof actions |

**Returns:** *void*
