[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/shared/TableTesting/state"](_test_src_shared_tabletesting_state_.md)

# Module: "test/src/shared/TableTesting/state"

## Index

### Type aliases

* [TableTesting](_test_src_shared_tabletesting_state_.md#tabletesting)
* [TableTestingColumn](_test_src_shared_tabletesting_state_.md#tabletestingcolumn)
* [TblTableTesting](_test_src_shared_tabletesting_state_.md#tbltabletesting)

### Object literals

* [tblTableTesting](_test_src_shared_tabletesting_state_.md#let-tbltabletesting)
* [tblTableTesting2](_test_src_shared_tabletesting_state_.md#let-tbltabletesting2)

## Type aliases

###  TableTesting

Ƭ **TableTesting**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:3](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L3)*

#### Type declaration:

* **Code**: *string*

* **Name**: *string*

* **U_Alpha**: *string*

* **U_Date**: *Date*

* **U_Decimal**: *number*

* **U_Int**: *number*

* **U_Memo**: *string*

___

###  TableTestingColumn

Ƭ **TableTestingColumn**: *keyof TableTesting*

*Defined in [test/src/shared/TableTesting/state.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L13)*

___

###  TblTableTesting

Ƭ **TblTableTesting**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:15](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L15)*

#### Type declaration:

* \[ **key**: *string*\]: [TableTesting](_test_src_shared_tabletesting_state_.md#tabletesting)

## Object literals

### `Let` tblTableTesting

### ▪ **tblTableTesting**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:19](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L19)*

###  id

• **id**: *"tab1"* = "tab1"

*Defined in [test/src/shared/TableTesting/state.ts:20](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L20)*

###  namespace

• **namespace**: *string* = "testtables.tabletesting"

*Defined in [test/src/shared/TableTesting/state.ts:22](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L22)*

###  title

• **title**: *string* = "Test Tabelle mit Paging und Inline-Editierfunktion"

*Defined in [test/src/shared/TableTesting/state.ts:21](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L21)*

▪ **columns**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:43](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L43)*

* **U_Alpha**: *object*

  * **caption**: *string* = "Text"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 1

* **U_Date**: *object*

  * **caption**: *string* = "Datum"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 2

* **U_Decimal**: *object*

  * **caption**: *string* = "Wert"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 1

* **U_Int**: *object*

  * **caption**: *string* = "Zahl"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 1

* **U_ItemCode**: *object*

  * **caption**: *string* = "Produkt"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 10

  * **list**: *object*

    * **acceptEmpty**: *false* = false

    * **acceptOnlyListValues**: *true* = true

    * **displayField**: *string* = "ItemName"

    * **serverEndpoint**: *string* = "item"

    * **valueField**: *string* = "U_ItemCode"

* **U_ItmsGrpCod**: *object*

  * **caption**: *string* = "Produktgruppe"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **type**: *"int"* = "int"

  * **width**: *number* = 2

  * **list**: *object*

    * **acceptEmpty**: *true* = true

    * **acceptOnlyListValues**: *true* = true

    * **displayField**: *string* = "ItmsGrpNam"

    * **serverEndpoint**: *string* = "itemGroup"

    * **valueField**: *string* = "ItmsGrpCod"

* **U_Memo**: *object*

  * **caption**: *string* = "Memo"

  * **control**: *"textarea"* = "textarea"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **width**: *number* = 2

▪ **database**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:33](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L33)*

* **dataIdField**: *string* = "Code"

* **dbInsertMode**: *"UDTAutoNumberBoth"* = "UDTAutoNumberBoth"

▪ **features**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:37](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L37)*

* **add**: *true* = true

* **forceFreshServerDataOnRefreshClickedIfOlderThan**: *number* = 0

* **noButtonsAtTheBottom**: *false* = false

* **page**: *true* = true

▪ **options**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:26](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L26)*

* **customRowActions**: *object*

  * **Select**: *object*

    * **icon**: *string* = "sap-icon--travel-expense"

    * **name**: *string* = "Travel Expense"

  * **Shop**: *object*

    * **icon**: *string* = "sap-icon--cart"

    * **name**: *string* = "Travel Expense"

* **paging**: *object*

  * **page**: *number* = 0

  * **pageSize**: *number* = 3

▪ **server**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:23](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L23)*

* **endpoint**: *string* = "tabletesting"

___

### `Let` tblTableTesting2

### ▪ **tblTableTesting2**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:108](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L108)*

###  id

• **id**: *"tab2"* = "tab2"

*Defined in [test/src/shared/TableTesting/state.ts:109](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L109)*

###  namespace

• **namespace**: *string* = "testtables.tabletesting"

*Defined in [test/src/shared/TableTesting/state.ts:111](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L111)*

###  title

• **title**: *string* = "Testtabelle aus SAP"

*Defined in [test/src/shared/TableTesting/state.ts:110](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L110)*

▪ **columns**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:176](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L176)*

* **U_Alpha**: *object*

  * **caption**: *string* = "Text"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 3

* **U_Date**: *object*

  * **caption**: *string* = "Datum"

  * **editable**: *true* = true

  * **sortable**: *true* = true

* **U_Decimal**: *object*

  * **caption**: *string* = "Wert"

  * **editable**: *true* = true

  * **format**: *"4digits"* = "4digits"

  * **sortable**: *true* = true

* **U_Int**: *object*

  * **caption**: *string* = "Zahl"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 3

* **U_ItemCode**: *object*

  * **caption**: *string* = "Produkt"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **list**: *object*

    * **acceptEmpty**: *false* = false

    * **acceptOnlyListValues**: *true* = true

    * **displayField**: *string* = "ItemName"

    * **serverEndpoint**: *string* = "item"

    * **valueField**: *string* = "U_ItemCode"

* **U_ItmsGrpCod**: *object*

  * **caption**: *string* = "Produktgruppe"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **type**: *"int"* = "int"

  * **list**: *object*

    * **acceptEmpty**: *false* = false

    * **acceptOnlyListValues**: *true* = true

    * **displayField**: *string* = "ItmsGrpNam"

    * **serverEndpoint**: *string* = "itemGroup"

    * **valueField**: *string* = "ItmsGrpCod"

* **U_Memo**: *object*

  * **caption**: *string* = "Memo"

  * **control**: *"textarea"* = "textarea"

  * **editable**: *true* = true

  * **sortable**: *true* = true

* **U_ParentCode**: *object*

  * **caption**: *string* = "Referenz"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **list**: *object*

    * **displayField**: *string* = "U_Alpha"

    * **valueField**: *string* = "Code"

* **U_ParentCode2**: *object*

  * **caption**: *string* = "Referenz2"

  * **control**: *"list"* = "list"

  * **editable**: *true* = true

  * **sortable**: *true* = true

  * **list**: *object*

    * **displayField**: *string* = "U_Alpha"

    * **valueField**: *string* = "Code"

▪ **database**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:165](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L165)*

* **dataIdField**: *string* = "Code"

* **dbInsertMode**: *"UDTAutoNumberBoth"* = "UDTAutoNumberBoth"

▪ **features**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:169](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L169)*

* **add**: *true* = true

* **filter**: *false* = false

* **forceFreshServerDataOnRefreshClickedIfOlderThan**: *number* = 10

* **noButtonsAtTheBottom**: *true* = true

* **page**: *false* = false

▪ **options**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:115](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L115)*

* **customRowActions**: *object*

  * **Select**: *object*

    * **icon**: *string* = "sap-icon--travel-expense"

    * **name**: *string* = "Travel Expense"

* **edit**: *object*

  * **editType**: *"big"* = "big"

* **filterCustom**: *object*

  * **alphaStartsWithA**: *object*

    * **active**: *false* = false

    * **description**: *string* = "Text beginnt mit "A""

    * **showInTitle**: *true* = true

    * **type**: *"single"* = "single"

  * **alphaStartsWithB**: *object*

    * **active**: *false* = false

    * **description**: *string* = "Text beginnt mit "B""

    * **showInTitle**: *true* = true

    * **type**: *"single"* = "single"

  * **memoContainsTest**: *object*

    * **active**: *false* = false

    * **description**: *string* = "Memo enthält "test""

    * **showInTitle**: *true* = true

    * **type**: *"multi"* = "multi"

  * **memoContainsText**: *object*

    * **active**: *false* = false

    * **description**: *string* = "Memo enthält "text""

    * **showInTitle**: *true* = true

    * **type**: *"multi"* = "multi"

* **maxRows**: *object*

  * **maxRows**: *number* = 100

  * **showHint**: *true* = true

  * **showInTitle**: *true* = true

* **sortCustom**: *object*

  * **selected**: *string* = "alphaThenMemo"

  * **sorts**: *object*

    * **alphaThenMemo**: *object*

      * **description**: *string* = "Text dann Memo"

      * **showInTitle**: *true* = true

    * **memoThenAlpha**: *object*

      * **description**: *string* = "Memo dann Text"

      * **showInTitle**: *true* = true

    * **onlyTest**: *object*

      * **description**: *string* = "Enthält Test"

      * **showInTitle**: *true* = true

▪ **server**: *object*

*Defined in [test/src/shared/TableTesting/state.ts:112](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/shared/TableTesting/state.ts#L112)*

* **endpoint**: *string* = "tabletesting"
