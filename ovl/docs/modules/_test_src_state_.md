[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/state"](_test_src_state_.md)

# Module: "test/src/state"

## Index

### Type aliases

* [DPInvoiceDetail](_test_src_state_.md#dpinvoicedetail)
* [DPInvoiceDetailState](_test_src_state_.md#dpinvoicedetailstate)
* [DoubleBarChartState](_test_src_state_.md#doublebarchartstate)
* [Feature](_test_src_state_.md#feature)
* [FileList](_test_src_state_.md#filelist)
* [InvoiceDetail](_test_src_state_.md#invoicedetail)
* [InvoiceDetailState](_test_src_state_.md#invoicedetailstate)
* [Language](_test_src_state_.md#language)
* [OrderDetail](_test_src_state_.md#orderdetail)
* [OrderDetailState](_test_src_state_.md#orderdetailstate)
* [PartnerState](_test_src_state_.md#partnerstate)
* [PicsState](_test_src_state_.md#picsstate)
* [Portal](_test_src_state_.md#portal)
* [QuotationDetail](_test_src_state_.md#quotationdetail)
* [QuotationDetailState](_test_src_state_.md#quotationdetailstate)
* [QuotationStatus](_test_src_state_.md#quotationstatus)
* [Role](_test_src_state_.md#role)
* [TableDefIds](_test_src_state_.md#tabledefids)
* [User](_test_src_state_.md#user)

### Object literals

* [pics](_test_src_state_.md#let-pics)
* [portal](_test_src_state_.md#let-portal)
* [testtables](_test_src_state_.md#let-testtables)

## Type aliases

###  DPInvoiceDetail

Ƭ **DPInvoiceDetail**: *object*

*Defined in [test/src/state.ts:45](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L45)*

#### Type declaration:

* **attachments**: *[FileList](_test_src_state_.md#filelist)*

* **cardCode**: *string*

* **cardName**: *string*

* **docDate**: *string*

* **docDueDate**: *string*

* **paidRate**: *number*

* **refNum**: *string*

___

###  DPInvoiceDetailState

Ƭ **DPInvoiceDetailState**: *object*

*Defined in [test/src/state.ts:90](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L90)*

#### Type declaration:

* **dpInvoices**(): *object*

___

###  DoubleBarChartState

Ƭ **DoubleBarChartState**: *object*

*Defined in [test/src/state.ts:17](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L17)*

#### Type declaration:

* **labels**: *number[]*

* **labels_ext**: *number[]*

* **values_1**: *number[]*

* **values_2**: *number[]*

___

###  Feature

Ƭ **Feature**: *object*

*Defined in [test/src/state.ts:130](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L130)*

#### Type declaration:

* **nrOfInvoices**: *number*

* **nrOfOrders**: *number*

* **nrOfQuotations**: *number*

___

###  FileList

Ƭ **FileList**: *object*

*Defined in [test/src/state.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L13)*

#### Type declaration:

* **files**: *[File](_test_src_components_filelist_filelist_.md#file)[]*

___

###  InvoiceDetail

Ƭ **InvoiceDetail**: *object*

*Defined in [test/src/state.ts:35](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L35)*

#### Type declaration:

* **attachments**: *[FileList](_test_src_state_.md#filelist)*

* **cardCode**: *string*

* **cardName**: *string*

* **docDate**: *string*

* **docDueDate**: *string*

* **paidRate**: *number*

* **refNum**: *string*

___

###  InvoiceDetailState

Ƭ **InvoiceDetailState**: *object*

*Defined in [test/src/state.ts:86](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L86)*

#### Type declaration:

* **invoices**(): *object*

___

###  Language

Ƭ **Language**: *"DE" | "FR"*

*Defined in [test/src/state.ts:129](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L129)*

___

###  OrderDetail

Ƭ **OrderDetail**: *object*

*Defined in [test/src/state.ts:55](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L55)*

#### Type declaration:

* **attachments**: *[FileList](_test_src_state_.md#filelist)*

* **cardCode**: *string*

* **cardName**: *string*

* **deliveryDate**: *string*

* **docDate**: *string*

* **refNum**: *string*

* **steps**(): *object*

  * **step1**(): *object*

    * **attachments**: *[FileList](_test_src_state_.md#filelist)*

    * **date**: *string*

  * **step2**(): *object*

    * **attachments**: *[FileList](_test_src_state_.md#filelist)*

    * **date**: *string*

  * **step3**(): *object*

    * **attachments**: *[FileList](_test_src_state_.md#filelist)*

    * **date**: *string*

  * **step4**(): *object*

    * **attachments**: *[FileList](_test_src_state_.md#filelist)*

    * **date**: *string*

___

###  OrderDetailState

Ƭ **OrderDetailState**: *object*

*Defined in [test/src/state.ts:94](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L94)*

#### Type declaration:

* **orders**(): *object*

___

###  PartnerState

Ƭ **PartnerState**: *object*

*Defined in [test/src/state.ts:103](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L103)*

#### Type declaration:

* **attachments**: *[FileList](_test_src_state_.md#filelist)*

* **cardCode**: *string*

* **cardName**: *string*

* **salesContact**(): *object*

  * **email**: *string*

  * **firstName**: *string*

  * **id**: *string*

  * **lastName**: *string*

  * **phone**: *string*

* **technicalContact**(): *object*

  * **email**: *string*

  * **firstName**: *string*

  * **id**: *string*

  * **lastName**: *string*

  * **phone**: *string*

___

###  PicsState

Ƭ **PicsState**: *object*

*Defined in [test/src/state.ts:98](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L98)*

#### Type declaration:

* **salesContact**: *string*

* **technicalContact**: *string*

___

###  Portal

Ƭ **Portal**: *object*

*Defined in [test/src/state.ts:146](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L146)*

#### Type declaration:

* **chartData**: *[DoubleBarChartState](_test_src_state_.md#doublebarchartstate)*

* **dpInvoiceDetail**: *[DPInvoiceDetailState](_test_src_state_.md#dpinvoicedetailstate)*

* **invoiceDetail**: *[InvoiceDetailState](_test_src_state_.md#invoicedetailstate)*

* **orderDetail**: *[OrderDetailState](_test_src_state_.md#orderdetailstate)*

* **partner**: *[PartnerState](_test_src_state_.md#partnerstate)*

* **pics**: *[PicsState](_test_src_state_.md#picsstate)*

* **quotationDetail**: *[QuotationDetailState](_test_src_state_.md#quotationdetailstate)*

* **tables**(): *object*

  * **audit**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

  * **translation**: *[TableData](_ovl_src_library_table_table_.md#tabledata)*

* **user**: *[User](_test_src_state_.md#user)*

___

###  QuotationDetail

Ƭ **QuotationDetail**: *object*

*Defined in [test/src/state.ts:26](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L26)*

#### Type declaration:

* **attachments**: *[FileList](_test_src_state_.md#filelist)*

* **cardCode**: *string*

* **cardName**: *string*

* **docDate**: *string*

* **refNum**: *string*

* **status**: *[QuotationStatus](_test_src_state_.md#quotationstatus)*

___

###  QuotationDetailState

Ƭ **QuotationDetailState**: *object*

*Defined in [test/src/state.ts:82](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L82)*

#### Type declaration:

* **quotations**(): *object*

___

###  QuotationStatus

Ƭ **QuotationStatus**: *"Open" | "Closed" | "Canceled"*

*Defined in [test/src/state.ts:24](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L24)*

___

###  Role

Ƭ **Role**: *"User" | "Admin"*

*Defined in [test/src/state.ts:128](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L128)*

___

###  TableDefIds

Ƭ **TableDefIds**: *"translation" | "audit" | "tab1" | "tab2" | "mobiletimerecording1"*

*Defined in [test/src/state.ts:158](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L158)*

___

###  User

Ƭ **User**: *object*

*Defined in [test/src/state.ts:136](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L136)*

#### Type declaration:

* **features**: *[Feature](_test_src_state_.md#feature)*

* **firstName**: *string*

* **language**: *[Language](_test_src_state_.md#language)*

* **lastName**: *string*

* **role**: *[Role](_test_src_state_.md#role)*

* **userCode**: *number*

* **userName**: *string*

## Object literals

### `Let` pics

### ▪ **pics**: *object*

*Defined in [test/src/state.ts:123](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L123)*

###  salesContact

• **salesContact**: *string* = ""

*Defined in [test/src/state.ts:124](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L124)*

###  technicalContact

• **technicalContact**: *string* = ""

*Defined in [test/src/state.ts:125](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L125)*

___

### `Let` portal

### ▪ **portal**: *object*

*Defined in [test/src/state.ts:165](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L165)*

###  chartData

• **chartData**: *undefined* = undefined

*Defined in [test/src/state.ts:168](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L168)*

###  dpInvoiceDetail

• **dpInvoiceDetail**: *undefined* = undefined

*Defined in [test/src/state.ts:169](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L169)*

###  invoiceDetail

• **invoiceDetail**: *undefined* = undefined

*Defined in [test/src/state.ts:170](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L170)*

###  orderDetail

• **orderDetail**: *undefined* = undefined

*Defined in [test/src/state.ts:167](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L167)*

###  partner

• **partner**: *undefined* = undefined

*Defined in [test/src/state.ts:171](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L171)*

###  pics

• **pics**: *undefined* = undefined

*Defined in [test/src/state.ts:172](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L172)*

###  quotationDetail

• **quotationDetail**: *undefined* = undefined

*Defined in [test/src/state.ts:173](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L173)*

###  user

• **user**: *undefined* = undefined

*Defined in [test/src/state.ts:166](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L166)*

▪ **tables**: *object*

*Defined in [test/src/state.ts:174](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L174)*

* **audit**: *object*

  * **data**(): *object*

  * **schema**(): *object*

  * **tableDef**: *object*

    * **audit**(): *object*

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

* **translation**: *object*

  * **data**(): *object*

  * **schema**(): *object*

  * **tableDef**: *object*

    * **translation**(): *object*

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

___

### `Let` testtables

### ▪ **testtables**: *object*

*Defined in [test/src/state.ts:192](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L192)*

###  tableTesting

• **tableTesting**: *object* = <TableData>{
    data: {},
    schema: {},
    tableDef: { tab1: tblTableTesting, tab2: tblTableTesting2 },
    lookupTypes: { U_Alpha: "text" },
    lookupTypes2: { U_Alpha: "text", U_Date: "date" }
  }

*Defined in [test/src/state.ts:193](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L193)*

#### Type declaration:

* **data**(): *object*

* **lookupTypes**(): *object*

* **lookupTypes2**(): *object*

* **lookupTypes3**(): *object*

* **schema**(): *object*

* **tableDef**(): *object*

* **timestamp**? : *number*

###  timeentries

• **timeentries**: *object* = <TableData>{
    data: {},
    schema: {},
    tableDef: {
      mobiletimerecording1: tblMobileTimeRecording
    }
  }

*Defined in [test/src/state.ts:200](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L200)*

#### Type declaration:

* **data**(): *object*

* **lookupTypes**(): *object*

* **lookupTypes2**(): *object*

* **lookupTypes3**(): *object*

* **schema**(): *object*

* **tableDef**(): *object*

* **timestamp**? : *number*

▪ **lookups**: *object*

*Defined in [test/src/state.ts:207](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/state.ts#L207)*

* **AbsenceTypeId**(): *object*

  * **data**(): *object*

  * **lookupTypes**(): *object*

  * **lookupTypes2**(): *object*

  * **lookupTypes3**(): *object*

* **ProjectTypeId**(): *object*

  * **data**(): *object*

  * **lookupTypes**(): *object*

  * **lookupTypes2**(): *object*

  * **lookupTypes3**(): *object*

* **U_ItemCode**(): *object*

  * **data**(): *object*

  * **lookupTypes**(): *object*

  * **lookupTypes2**(): *object*

  * **lookupTypes3**(): *object*

* **U_ItmsGrpCod**(): *object*

  * **data**(): *object*

  * **lookupTypes**(): *object*

  * **lookupTypes2**(): *object*

  * **lookupTypes3**(): *object*
