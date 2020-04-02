[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Table/Table"](_ovl_src_library_table_table_.md)

# Module: "ovl/src/library/Table/Table"

## Index

### Classes

* [TableHeader](../classes/_ovl_src_library_table_table_.tableheader.md)

### Type aliases

* [BeforeSaveParam](_ovl_src_library_table_table_.md#beforesaveparam)
* [ColumnAlign](_ovl_src_library_table_table_.md#columnalign)
* [ColumnDef](_ovl_src_library_table_table_.md#columndef)
* [ColumnDisplayDef](_ovl_src_library_table_table_.md#columndisplaydef)
* [ColumnFilter](_ovl_src_library_table_table_.md#columnfilter)
* [ColumnFilterTypes](_ovl_src_library_table_table_.md#columnfiltertypes)
* [ColumnFilterValue](_ovl_src_library_table_table_.md#columnfiltervalue)
* [ColumnsDef](_ovl_src_library_table_table_.md#columnsdef)
* [ControlType](_ovl_src_library_table_table_.md#controltype)
* [CustomFilter](_ovl_src_library_table_table_.md#customfilter)
* [CustomFilterType](_ovl_src_library_table_table_.md#customfiltertype)
* [CustomSort](_ovl_src_library_table_table_.md#customsort)
* [DBInsertMode](_ovl_src_library_table_table_.md#dbinsertmode)
* [EditRowDef](_ovl_src_library_table_table_.md#editrowdef)
* [EditRowSaveCancelDef](_ovl_src_library_table_table_.md#editrowsavecanceldef)
* [Filter](_ovl_src_library_table_table_.md#filter)
* [FilterClick](_ovl_src_library_table_table_.md#filterclick)
* [HeaderClick](_ovl_src_library_table_table_.md#headerclick)
* [IDField](_ovl_src_library_table_table_.md#idfield)
* [ListFnReturnValue](_ovl_src_library_table_table_.md#listfnreturnvalue)
* [Paging](_ovl_src_library_table_table_.md#paging)
* [RowControlAction](_ovl_src_library_table_table_.md#rowcontrolaction)
* [RowStatus](_ovl_src_library_table_table_.md#rowstatus)
* [SaveMode](_ovl_src_library_table_table_.md#savemode)
* [SelectRowDef](_ovl_src_library_table_table_.md#selectrowdef)
* [SelectedEditRow](_ovl_src_library_table_table_.md#selectededitrow)
* [SelectedRow](_ovl_src_library_table_table_.md#selectedrow)
* [Sort](_ovl_src_library_table_table_.md#sort)
* [SortClick](_ovl_src_library_table_table_.md#sortclick)
* [SortDirection](_ovl_src_library_table_table_.md#sortdirection)
* [StaticFilter](_ovl_src_library_table_table_.md#staticfilter)
* [TableData](_ovl_src_library_table_table_.md#tabledata)
* [TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef)
* [TableDef](_ovl_src_library_table_table_.md#tabledef)

## Type aliases

###  BeforeSaveParam

Ƭ **BeforeSaveParam**: *object*

*Defined in [ovl/src/library/Table/Table.ts:17](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L17)*

#### Type declaration:

* **key**: *string*

* **mode**: *[SaveMode](_ovl_src_library_table_table_.md#savemode)*

* **row**(): *object*

* **tableDef**: *[TableDataAndDef](_ovl_src_library_table_table_.md#tabledataanddef)*

___

###  ColumnAlign

Ƭ **ColumnAlign**: *"left" | "center" | "right"*

*Defined in [ovl/src/library/Table/Table.ts:160](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L160)*

___

###  ColumnDef

Ƭ **ColumnDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:224](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L224)*

#### Type declaration:

* **align**? : *[ColumnAlign](_ovl_src_library_table_table_.md#columnalign)*

* **caption**? : *string*

* **control**? : *[ControlType](_ovl_src_library_table_table_.md#controltype)*

* **editable**? : *boolean*

* **filter**? : *[ColumnFilter](_ovl_src_library_table_table_.md#columnfilter)*

* **format**? : *[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)*

* **list**? : *[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)*

* **sortable**? : *boolean*

* **type**? : *[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)*

* **visible**? : *boolean*

* **width**? : *number*

___

###  ColumnDisplayDef

Ƭ **ColumnDisplayDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:238](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L238)*

#### Type declaration:

* **format**? : *[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)*

* **list**? : *[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)*

* **type**? : *[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)*

___

###  ColumnFilter

Ƭ **ColumnFilter**: *object*

*Defined in [ovl/src/library/Table/Table.ts:254](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L254)*

#### Type declaration:

* **enabled**? : *boolean*

* **filterValues**(): *object*

* **isOthersSelected**? : *boolean*

* **othersCount**? : *number*

* **selected**? : *string*

* **showFilter**? : *boolean*

* **top**: *number*

___

###  ColumnFilterTypes

Ƭ **ColumnFilterTypes**: *"@@ovl_all" | "@@ovl_others"*

*Defined in [ovl/src/library/Table/Table.ts:270](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L270)*

___

###  ColumnFilterValue

Ƭ **ColumnFilterValue**: *object*

*Defined in [ovl/src/library/Table/Table.ts:264](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L264)*

#### Type declaration:

* **count**: *number*

* **displayValue**: *string*

* **value**: *any*

___

###  ColumnsDef

Ƭ **ColumnsDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:162](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L162)*

#### Type declaration:

* \[ **key**: *string*\]: [ColumnDef](_ovl_src_library_table_table_.md#columndef)

___

###  ControlType

Ƭ **ControlType**: *"text" | "textarea" | "list" | "bool" | "option" | "select" | "date" | "time"*

*Defined in [ovl/src/library/Table/Table.ts:151](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L151)*

___

###  CustomFilter

Ƭ **CustomFilter**: *object*

*Defined in [ovl/src/library/Table/Table.ts:184](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L184)*

#### Type declaration:

* **active**: *boolean*

* **description**: *string*

* **showInTitle**: *boolean*

* **type**: *[CustomFilterType](_ovl_src_library_table_table_.md#customfiltertype)*

___

###  CustomFilterType

Ƭ **CustomFilterType**: *"single" | "multi"*

*Defined in [ovl/src/library/Table/Table.ts:182](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L182)*

___

###  CustomSort

Ƭ **CustomSort**: *object*

*Defined in [ovl/src/library/Table/Table.ts:171](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L171)*

#### Type declaration:

* **description**: *string*

* **showInTitle**: *boolean*

___

###  DBInsertMode

Ƭ **DBInsertMode**: *"UDTAutoNumber" | "UDTAutoGUID" | "UDTAutoNumberBoth" | "UDTAutoGUIDBoth" | "AutoIdentity" | "AutoGUID" | "Manual"*

*Defined in [ovl/src/library/Table/Table.ts:215](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L215)*

___

###  EditRowDef

Ƭ **EditRowDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:128](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L128)*

#### Type declaration:

* **columnsAlign**(): *object*

* **columnsVisible**(): *object*

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **key**: *string*

* **row**(): *object*

* **tableDef**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

___

###  EditRowSaveCancelDef

Ƭ **EditRowSaveCancelDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:137](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L137)*

#### Type declaration:

* **columnsCount**: *number*

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **key**: *string*

* **row**(): *object*

* **tableDef**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

___

###  Filter

Ƭ **Filter**: *object*

*Defined in [ovl/src/library/Table/Table.ts:176](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L176)*

#### Type declaration:

* **showSelected**: *boolean*

* **static**? : *[StaticFilter](_ovl_src_library_table_table_.md#staticfilter)*

* **value**: *string*

___

###  FilterClick

Ƭ **FilterClick**: *object*

*Defined in [ovl/src/library/Table/Table.ts:209](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L209)*

#### Type declaration:

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **def**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

* **value**: *string*

___

###  HeaderClick

Ƭ **HeaderClick**: *object*

*Defined in [ovl/src/library/Table/Table.ts:196](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L196)*

#### Type declaration:

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **def**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

* **key**: *string*

___

###  IDField

Ƭ **IDField**: *"{ObjectKey}" | string*

*Defined in [ovl/src/library/Table/Table.ts:26](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L26)*

___

###  ListFnReturnValue

Ƭ **ListFnReturnValue**: *object*

*Defined in [ovl/src/library/Table/Table.ts:244](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L244)*

#### Type declaration:

* **data**(): *object*

* **lookupTypes**(): *object*

* **lookupTypes2**(): *object*

* **lookupTypes3**(): *object*

___

###  Paging

Ƭ **Paging**: *object*

*Defined in [ovl/src/library/Table/Table.ts:191](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L191)*

#### Type declaration:

* **page**: *number*

* **pageSize**: *number*

___

###  RowControlAction

Ƭ **RowControlAction**: *object*

*Defined in [ovl/src/library/Table/Table.ts:52](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L52)*

#### Type declaration:

* **icon**: *string*

* **name**: *string*

___

###  RowStatus

Ƭ **RowStatus**: *object*

*Defined in [ovl/src/library/Table/Table.ts:43](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L43)*

#### Type declaration:

* **msg**: *string*

* **status**: *"valid" | "warning" | "error" | "information"*

___

###  SaveMode

Ƭ **SaveMode**: *"add" | "update"*

*Defined in [ovl/src/library/Table/Table.ts:15](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L15)*

___

###  SelectRowDef

Ƭ **SelectRowDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:145](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L145)*

#### Type declaration:

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **def**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

* **key**: *string*

___

###  SelectedEditRow

Ƭ **SelectedEditRow**: *object*

*Defined in [ovl/src/library/Table/Table.ts:63](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L63)*

#### Type declaration:

* **selected**: *boolean*

___

###  SelectedRow

Ƭ **SelectedRow**: *object*

*Defined in [ovl/src/library/Table/Table.ts:57](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L57)*

#### Type declaration:

* **selected**: *boolean*

* **showNav**: *boolean*

* **timestamp**: *number*

___

###  Sort

Ƭ **Sort**: *object*

*Defined in [ovl/src/library/Table/Table.ts:166](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L166)*

#### Type declaration:

* **direction**: *[SortDirection](_ovl_src_library_table_table_.md#sortdirection)*

* **field**: *string*

___

###  SortClick

Ƭ **SortClick**: *object*

*Defined in [ovl/src/library/Table/Table.ts:202](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L202)*

#### Type declaration:

* **ascending**: *boolean*

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **def**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

* **key**: *string*

___

###  SortDirection

Ƭ **SortDirection**: *"asc" | "desc"*

*Defined in [ovl/src/library/Table/Table.ts:24](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L24)*

___

###  StaticFilter

Ƭ **StaticFilter**: *object*

*Defined in [ovl/src/library/Table/Table.ts:48](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L48)*

#### Type declaration:

* \[ **key**: *string*\]: object

___

###  TableData

Ƭ **TableData**: *object*

*Defined in [ovl/src/library/Table/Table.ts:28](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L28)*

#### Type declaration:

* **data**(): *object*

* **lookupTypes**(): *object*

* **lookupTypes2**(): *object*

* **lookupTypes3**(): *object*

* **schema**(): *object*

* **tableDef**(): *object*

* **timestamp**? : *number*

___

###  TableDataAndDef

Ƭ **TableDataAndDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:38](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L38)*

#### Type declaration:

* **data**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **def**: *[TableDef](_ovl_src_library_table_table_.md#tabledef)*

___

###  TableDef

Ƭ **TableDef**: *object*

*Defined in [ovl/src/library/Table/Table.ts:67](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Table/Table.ts#L67)*

#### Type declaration:

* **columns**: *[ColumnsDef](_ovl_src_library_table_table_.md#columnsdef)*

* **dataFetching**(): *object*

  * **useCustomDataFetching**? : *boolean*

  * **useSchema**? : *boolean*

* **database**(): *object*

  * **dataIdField**: *[IDField](_ovl_src_library_table_table_.md#idfield)*

  * **dbInsertMode**: *[DBInsertMode](_ovl_src_library_table_table_.md#dbinsertmode)*

* **features**(): *object*

  * **add**? : *boolean*

  * **delete**? : *boolean*

  * **edit**? : *boolean*

  * **filter**? : *boolean*

  * **forceFreshServerDataOnRefreshClickedIfOlderThan**? : *number*

  * **multiselect**? : *boolean*

  * **noButtonsAtTheBottom**? : *boolean*

  * **page**? : *boolean*

  * **showRefreshButton**? : *boolean*

* **id**: *[TableDefIds](_test_src_state_.md#tabledefids)*

* **initialised**? : *boolean*

* **namespace**: *string*

* **options**(): *object*

  * **addedRowsPosition**? : *"bottom"*

  * **copyColumnsIgnore**(): *object*

  * **customRowActions**(): *object*

  * **edit**(): *object*

    * **editType**: *"inline" | "big" | "custom"*

  * **filter**? : *[Filter](_ovl_src_library_table_table_.md#filter)*

  * **filterCustom**(): *object*

  * **maxRows**(): *object*

    * **maxRows**: *number*

    * **showHint**: *boolean*

    * **showInTitle**? : *boolean*

  * **navType**? : *"top/bottom" | "top" | "bottom"*

  * **paging**? : *[Paging](_ovl_src_library_table_table_.md#paging)*

  * **sort**? : *[Sort](_ovl_src_library_table_table_.md#sort)*

  * **sortCustom**(): *object*

    * **selected**: *string*

    * **sorts**(): *object*

* **server**(): *object*

  * **endpoint**: *string*

* **title**? : *string*

* **uiState**(): *object*

  * **currentlyAddingKey**? : *string*

  * **dataFilteredAndSorted**? : *string[]*

  * **editRow**(): *object*

  * **headerSelected**? : *string*

  * **needsRefresh**? : *boolean*

  * **rowsCount**? : *number*

  * **selectedRow**(): *object*
