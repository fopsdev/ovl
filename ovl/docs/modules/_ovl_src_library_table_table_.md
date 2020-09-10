[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Table/Table"](_ovl_src_library_table_table_.md)

# Module: "ovl/src/library/Table/Table"

## Index

### Classes

- [TableHeader](../classes/_ovl_src_library_table_table_.tableheader.md)

### Type aliases

- [BeforeSaveParam](_ovl_src_library_table_table_.md#beforesaveparam)
- [ColumnAlign](_ovl_src_library_table_table_.md#columnalign)
- [ColumnDef](_ovl_src_library_table_table_.md#columndef)
- [ColumnDisplayDef](_ovl_src_library_table_table_.md#columndisplaydef)
- [ColumnFilter](_ovl_src_library_table_table_.md#columnfilter)
- [ColumnFilterTypes](_ovl_src_library_table_table_.md#columnfiltertypes)
- [ColumnFilterValue](_ovl_src_library_table_table_.md#columnfiltervalue)
- [ColumnsDef](_ovl_src_library_table_table_.md#columnsdef)
- [ControlType](_ovl_src_library_table_table_.md#controltype)
- [CustomFilter](_ovl_src_library_table_table_.md#customfilter)
- [CustomFilterType](_ovl_src_library_table_table_.md#customfiltertype)
- [CustomSort](_ovl_src_library_table_table_.md#customsort)
- [DBInsertMode](_ovl_src_library_table_table_.md#dbinsertmode)
- [EditRowDef](_ovl_src_library_table_table_.md#editrowdef)
- [EditRowSaveCancelDef](_ovl_src_library_table_table_.md#editrowsavecanceldef)
- [Filter](_ovl_src_library_table_table_.md#filter)
- [FilterClick](_ovl_src_library_table_table_.md#filterclick)
- [HeaderClick](_ovl_src_library_table_table_.md#headerclick)
- [IDField](_ovl_src_library_table_table_.md#idfield)
- [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)
- [Paging](_ovl_src_library_table_table_.md#paging)
- [RowControlAction](_ovl_src_library_table_table_.md#rowcontrolaction)
- [RowStatus](_ovl_src_library_table_table_.md#rowstatus)
- [SaveMode](_ovl_src_library_table_table_.md#savemode)
- [SelectRowDef](_ovl_src_library_table_table_.md#selectrowdef)
- [SelectedEditRow](_ovl_src_library_table_table_.md#selectededitrow)
- [SelectedRow](_ovl_src_library_table_table_.md#selectedrow)
- [Sort](_ovl_src_library_table_table_.md#sort)
- [SortClick](_ovl_src_library_table_table_.md#sortclick)
- [SortDirection](_ovl_src_library_table_table_.md#sortdirection)
- [StaticFilter](_ovl_src_library_table_table_.md#staticfilter)
- [TableData](_ovl_src_library_table_table_.md#tabledata)
- [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef)
- [TableDef](_ovl_src_library_table_table_.md#tabledef)

## Type aliases

### BeforeSaveParam

Ƭ **BeforeSaveParam**: _object_

_Defined in [ovl/src/library/Table/Table.ts:17](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L17)_

#### Type declaration:

- **key**: _string_

- **mode**: _[SaveMode](_ovl_src_library_table_table_.md#savemode)_

- **row**(): _object_

- **tableDef**: _[TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef)_

---

### ColumnAlign

Ƭ **ColumnAlign**: _"left" | "center" | "right"_

_Defined in [ovl/src/library/Table/Table.ts:160](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L160)_

---

### ColumnDef

Ƭ **ColumnDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:224](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L224)_

#### Type declaration:

- **align**? : _[ColumnAlign](_ovl_src_library_table_table_.md#columnalign)_

- **caption**? : _string_

- **control**? : _[ControlType](_ovl_src_library_table_table_.md#controltype)_

- **editable**? : _boolean_

- **filter**? : _[ColumnFilter](_ovl_src_library_table_table_.md#columnfilter)_

- **format**? : _[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)_

- **list**? : _[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)_

- **sortable**? : _boolean_

- **type**? : _[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)_

- **visible**? : _boolean_

- **width**? : _number_

---

### ColumnDisplayDef

Ƭ **ColumnDisplayDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:238](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L238)_

#### Type declaration:

- **format**? : _[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)_

- **list**? : _[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)_

- **type**? : _[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)_

---

### ColumnFilter

Ƭ **ColumnFilter**: _object_

_Defined in [ovl/src/library/Table/Table.ts:254](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L254)_

#### Type declaration:

- **enabled**? : _boolean_

- **filterValues**(): _object_

- **isOthersSelected**? : _boolean_

- **othersCount**? : _number_

- **selected**? : _string_

- **showFilter**? : _boolean_

- **top**: _number_

---

### ColumnFilterTypes

Ƭ **ColumnFilterTypes**: _"@@ovl_all" | "@@ovl_others"_

_Defined in [ovl/src/library/Table/Table.ts:270](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L270)_

---

### ColumnFilterValue

Ƭ **ColumnFilterValue**: _object_

_Defined in [ovl/src/library/Table/Table.ts:264](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L264)_

#### Type declaration:

- **count**: _number_

- **displayValue**: _string_

- **value**: _any_

---

### ColumnsDef

Ƭ **ColumnsDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:162](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L162)_

#### Type declaration:

- \[ **key**: _string_\]: [ColumnDef](_ovl_src_library_table_table_.md#columndef)

---

### ControlType

Ƭ **ControlType**: _"text" | "textarea" | "list" | "bool" | "option" | "select" | "date" | "time"_

_Defined in [ovl/src/library/Table/Table.ts:151](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L151)_

---

### CustomFilter

Ƭ **CustomFilter**: _object_

_Defined in [ovl/src/library/Table/Table.ts:184](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L184)_

#### Type declaration:

- **active**: _boolean_

- **description**: _string_

- **showInTitle**: _boolean_

- **type**: _[CustomFilterType](_ovl_src_library_table_table_.md#customfiltertype)_

---

### CustomFilterType

Ƭ **CustomFilterType**: _"single" | "multi"_

_Defined in [ovl/src/library/Table/Table.ts:182](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L182)_

---

### CustomSort

Ƭ **CustomSort**: _object_

_Defined in [ovl/src/library/Table/Table.ts:171](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L171)_

#### Type declaration:

- **description**: _string_

- **showInTitle**: _boolean_

---

### DBInsertMode

Ƭ **DBInsertMode**: _"UDTAutoNumber" | "UDTAutoGUID" | "UDTAutoNumberBoth" | "UDTAutoGUIDBoth" | "AutoIdentity" | "AutoGUID" | "Manual"_

_Defined in [ovl/src/library/Table/Table.ts:215](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L215)_

---

### EditRowDef

Ƭ **EditRowDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:128](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L128)_

#### Type declaration:

- **columnsAlign**(): _object_

- **columnsVisible**(): _object_

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **key**: _string_

- **row**(): _object_

- **tableDef**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

---

### EditRowSaveCancelDef

Ƭ **EditRowSaveCancelDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:137](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L137)_

#### Type declaration:

- **columnsCount**: _number_

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **key**: _string_

- **row**(): _object_

- **tableDef**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

---

### Filter

Ƭ **Filter**: _object_

_Defined in [ovl/src/library/Table/Table.ts:176](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L176)_

#### Type declaration:

- **showSelected**: _boolean_

- **static**? : _[StaticFilter](_ovl_src_library_table_table_.md#staticfilter)_

- **value**: _string_

---

### FilterClick

Ƭ **FilterClick**: _object_

_Defined in [ovl/src/library/Table/Table.ts:209](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L209)_

#### Type declaration:

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **def**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

- **value**: _string_

---

### HeaderClick

Ƭ **HeaderClick**: _object_

_Defined in [ovl/src/library/Table/Table.ts:196](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L196)_

#### Type declaration:

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **def**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

- **key**: _string_

---

### IDField

Ƭ **IDField**: _"{ObjectKey}" | string_

_Defined in [ovl/src/library/Table/Table.ts:26](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L26)_

---

### ListFnReturnValue

Ƭ **ListFnReturnValue**: _object_

_Defined in [ovl/src/library/Table/Table.ts:244](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L244)_

#### Type declaration:

- **data**(): _object_

- **lookupTypes**(): _object_

- **lookupTypes2**(): _object_

- **lookupTypes3**(): _object_

---

### Paging

Ƭ **Paging**: _object_

_Defined in [ovl/src/library/Table/Table.ts:191](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L191)_

#### Type declaration:

- **page**: _number_

- **pageSize**: _number_

---

### RowControlAction

Ƭ **RowControlAction**: _object_

_Defined in [ovl/src/library/Table/Table.ts:52](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L52)_

#### Type declaration:

- **icon**: _string_

- **name**: _string_

---

### RowStatus

Ƭ **RowStatus**: _object_

_Defined in [ovl/src/library/Table/Table.ts:43](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L43)_

#### Type declaration:

- **msg**: _string_

- **status**: _"valid" | "warning" | "error" | "information"_

---

### SaveMode

Ƭ **SaveMode**: _"add" | "update"_

_Defined in [ovl/src/library/Table/Table.ts:15](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L15)_

---

### SelectRowDef

Ƭ **SelectRowDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:145](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L145)_

#### Type declaration:

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **def**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

- **key**: _string_

---

### SelectedEditRow

Ƭ **SelectedEditRow**: _object_

_Defined in [ovl/src/library/Table/Table.ts:63](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L63)_

#### Type declaration:

- **selected**: _boolean_

---

### SelectedRow

Ƭ **SelectedRow**: _object_

_Defined in [ovl/src/library/Table/Table.ts:57](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L57)_

#### Type declaration:

- **selected**: _boolean_

- **showNav**: _boolean_

- **timestamp**: _number_

---

### Sort

Ƭ **Sort**: _object_

_Defined in [ovl/src/library/Table/Table.ts:166](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L166)_

#### Type declaration:

- **direction**: _[SortDirection](_ovl_src_library_table_table_.md#sortdirection)_

- **field**: _string_

---

### SortClick

Ƭ **SortClick**: _object_

_Defined in [ovl/src/library/Table/Table.ts:202](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L202)_

#### Type declaration:

- **ascending**: _boolean_

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **def**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

- **key**: _string_

---

### SortDirection

Ƭ **SortDirection**: _"asc" | "desc"_

_Defined in [ovl/src/library/Table/Table.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L24)_

---

### StaticFilter

Ƭ **StaticFilter**: _object_

_Defined in [ovl/src/library/Table/Table.ts:48](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L48)_

#### Type declaration:

- \[ **key**: _string_\]: object

---

### TableData

Ƭ **TableData**: _object_

_Defined in [ovl/src/library/Table/Table.ts:28](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L28)_

#### Type declaration:

- **data**(): _object_

- **lookupTypes**(): _object_

- **lookupTypes2**(): _object_

- **lookupTypes3**(): _object_

- **schema**(): _object_

- **tableDef**(): _object_

- **timestamp**? : _number_

---

### TableDataAndDef

Ƭ **TableDataAndDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:38](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L38)_

#### Type declaration:

- **data**: _[TableData](_ovl_src_library_table_table_.md#tabledata)_

- **def**: _[TableDef](_ovl_src_library_table_table_.md#tabledef)_

---

### TableDef

Ƭ **TableDef**: _object_

_Defined in [ovl/src/library/Table/Table.ts:67](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/library/Table/Table.ts#L67)_

#### Type declaration:

- **columns**: _[ColumnsDef](_ovl_src_library_table_table_.md#columnsdef)_

- **dataFetching**(): _object_

  - **useCustomDataFetching**? : _boolean_

  - **useSchema**? : _boolean_

- **database**(): _object_

  - **dataIdField**: _[IDField](_ovl_src_library_table_table_.md#idfield)_

  - **dbInsertMode**: _[DBInsertMode](_ovl_src_library_table_table_.md#dbinsertmode)_

- **features**(): _object_

  - **add**? : _boolean_

  - **delete**? : _boolean_

  - **edit**? : _boolean_

  - **filter**? : _boolean_

  - **forceFreshServerDataOnRefreshClickedIfOlderThan**? : _number_

  - **multiselect**? : _boolean_

  - **noButtonsAtTheBottom**? : _boolean_

  - **page**? : _boolean_

  - **showRefreshButton**? : _boolean_

- **id**: _[OvlTableDefIds](_test_src_state_.md#OvlTableDefIds)_

- **initialised**? : _boolean_

- **namespace**: _string_

- **options**(): _object_

  - **addedRowsPosition**? : _"bottom"_

  - **copyColumnsIgnore**(): _object_

  - **customRowActions**(): _object_

  - **edit**(): _object_

    - **editType**: _"inline" | "big" | "custom"_

  - **filter**? : _[Filter](_ovl_src_library_table_table_.md#filter)_

  - **filterCustom**(): _object_

  - **maxRows**(): _object_

    - **maxRows**: _number_

    - **showHint**: _boolean_

    - **showInTitle**? : _boolean_

  - **navType**? : _"top/bottom" | "top" | "bottom"_

  - **paging**? : _[Paging](_ovl_src_library_table_table_.md#paging)_

  - **sort**? : _[Sort](_ovl_src_library_table_table_.md#sort)_

  - **sortCustom**(): _object_

    - **selected**: _string_

    - **sorts**(): _object_

- **server**(): _object_

  - **endpoint**: _string_

- **title**? : _string_

- **uiState**(): _object_

  - **currentlyAddingKey**? : _string_

  - **dataFilteredAndSorted**? : _string[]_

  - **editRow**(): _object_

  - **headerSelected**? : _string_

  - **needsRefresh**? : _boolean_

  - **rowsCount**? : _number_

  - **selectedRow**(): _object_
