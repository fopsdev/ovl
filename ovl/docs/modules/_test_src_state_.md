[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/state"](_test_src_state_.md)

# Module: "test/src/state"

## Index

### Type aliases

- [DPInvoiceDetail](_test_src_state_.md#dpinvoicedetail)
- [DPInvoiceDetailState](_test_src_state_.md#dpinvoicedetailstate)
- [DoubleBarChartState](_test_src_state_.md#doublebarchartstate)
- [Feature](_test_src_state_.md#feature)
- [FileList](_test_src_state_.md#filelist)
- [InvoiceDetail](_test_src_state_.md#invoicedetail)
- [InvoiceDetailState](_test_src_state_.md#invoicedetailstate)
- [OvlLanguage](_test_src_state_.md#language)
- [OrderDetail](_test_src_state_.md#orderdetail)
- [OrderDetailState](_test_src_state_.md#orderdetailstate)
- [PartnerState](_test_src_state_.md#partnerstate)
- [PicsState](_test_src_state_.md#picsstate)
- [Portal](_test_src_state_.md#portal)
- [QuotationDetail](_test_src_state_.md#quotationdetail)
- [QuotationDetailState](_test_src_state_.md#quotationdetailstate)
- [QuotationStatus](_test_src_state_.md#quotationstatus)
- [Role](_test_src_state_.md#role)
- [OvlTableDefIds](_test_src_state_.md#OvlTableDefIds)
- [User](_test_src_state_.md#user)

### Object literals

- [pics](_test_src_state_.md#let-pics)
- [portal](_test_src_state_.md#let-portal)
- [testtables](_test_src_state_.md#let-testtables)

## Type aliases

### DPInvoiceDetail

Ƭ **DPInvoiceDetail**: _object_

_Defined in [test/src/state.ts:45](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L45)_

#### Type declaration:

- **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

- **cardCode**: _string_

- **cardName**: _string_

- **docDate**: _string_

- **docDueDate**: _string_

- **paidRate**: _number_

- **refNum**: _string_

---

### DPInvoiceDetailState

Ƭ **DPInvoiceDetailState**: _object_

_Defined in [test/src/state.ts:90](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L90)_

#### Type declaration:

- **dpInvoices**(): _object_

---

### DoubleBarChartState

Ƭ **DoubleBarChartState**: _object_

_Defined in [test/src/state.ts:17](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L17)_

#### Type declaration:

- **labels**: _number[]_

- **labels_ext**: _number[]_

- **values_1**: _number[]_

- **values_2**: _number[]_

---

### Feature

Ƭ **Feature**: _object_

_Defined in [test/src/state.ts:130](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L130)_

#### Type declaration:

- **nrOfInvoices**: _number_

- **nrOfOrders**: _number_

- **nrOfQuotations**: _number_

---

### FileList

Ƭ **FileList**: _object_

_Defined in [test/src/state.ts:13](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L13)_

#### Type declaration:

- **files**: _[File](\_test_src_components_filelist_filelist_.md#file)[]\_

---

### InvoiceDetail

Ƭ **InvoiceDetail**: _object_

_Defined in [test/src/state.ts:35](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L35)_

#### Type declaration:

- **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

- **cardCode**: _string_

- **cardName**: _string_

- **docDate**: _string_

- **docDueDate**: _string_

- **paidRate**: _number_

- **refNum**: _string_

---

### InvoiceDetailState

Ƭ **InvoiceDetailState**: _object_

_Defined in [test/src/state.ts:86](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L86)_

#### Type declaration:

- **invoices**(): _object_

---

### OvlLanguage

Ƭ **OvlLanguage**: _"DE" | "FR"_

_Defined in [test/src/state.ts:129](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L129)_

---

### OrderDetail

Ƭ **OrderDetail**: _object_

_Defined in [test/src/state.ts:55](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L55)_

#### Type declaration:

- **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

- **cardCode**: _string_

- **cardName**: _string_

- **deliveryDate**: _string_

- **docDate**: _string_

- **refNum**: _string_

- **steps**(): _object_

  - **step1**(): _object_

    - **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

    - **date**: _string_

  - **step2**(): _object_

    - **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

    - **date**: _string_

  - **step3**(): _object_

    - **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

    - **date**: _string_

  - **step4**(): _object_

    - **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

    - **date**: _string_

---

### OrderDetailState

Ƭ **OrderDetailState**: _object_

_Defined in [test/src/state.ts:94](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L94)_

#### Type declaration:

- **orders**(): _object_

---

### PartnerState

Ƭ **PartnerState**: _object_

_Defined in [test/src/state.ts:103](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L103)_

#### Type declaration:

- **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

- **cardCode**: _string_

- **cardName**: _string_

- **salesContact**(): _object_

  - **email**: _string_

  - **firstName**: _string_

  - **id**: _string_

  - **lastName**: _string_

  - **phone**: _string_

- **technicalContact**(): _object_

  - **email**: _string_

  - **firstName**: _string_

  - **id**: _string_

  - **lastName**: _string_

  - **phone**: _string_

---

### PicsState

Ƭ **PicsState**: _object_

_Defined in [test/src/state.ts:98](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L98)_

#### Type declaration:

- **salesContact**: _string_

- **technicalContact**: _string_

---

### Portal

Ƭ **Portal**: _object_

_Defined in [test/src/state.ts:146](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L146)_

#### Type declaration:

- **chartData**: _[DoubleBarChartState](\_test_src_state_.md#doublebarchartstate)\_

- **dpInvoiceDetail**: _[DPInvoiceDetailState](\_test_src_state_.md#dpinvoicedetailstate)\_

- **invoiceDetail**: _[InvoiceDetailState](\_test_src_state_.md#invoicedetailstate)\_

- **orderDetail**: _[OrderDetailState](\_test_src_state_.md#orderdetailstate)\_

- **partner**: _[PartnerState](\_test_src_state_.md#partnerstate)\_

- **pics**: _[PicsState](\_test_src_state_.md#picsstate)\_

- **quotationDetail**: _[QuotationDetailState](\_test_src_state_.md#quotationdetailstate)\_

- **tables**(): _object_

  - **audit**: _[TableData](\_ovl_src_library_table_table_.md#tabledata)\_

  - **translation**: _[TableData](\_ovl_src_library_table_table_.md#tabledata)\_

- **user**: _[User](\_test_src_state_.md#user)\_

---

### QuotationDetail

Ƭ **QuotationDetail**: _object_

_Defined in [test/src/state.ts:26](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L26)_

#### Type declaration:

- **attachments**: _[FileList](\_test_src_state_.md#filelist)\_

- **cardCode**: _string_

- **cardName**: _string_

- **docDate**: _string_

- **refNum**: _string_

- **status**: _[QuotationStatus](\_test_src_state_.md#quotationstatus)\_

---

### QuotationDetailState

Ƭ **QuotationDetailState**: _object_

_Defined in [test/src/state.ts:82](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L82)_

#### Type declaration:

- **quotations**(): _object_

---

### QuotationStatus

Ƭ **QuotationStatus**: _"Open" | "Closed" | "Canceled"_

_Defined in [test/src/state.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L24)_

---

### Role

Ƭ **Role**: _"User" | "Admin"_

_Defined in [test/src/state.ts:128](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L128)_

---

### OvlTableDefIds

Ƭ **OvlTableDefIds**: _"translation" | "audit" | "tab1" | "tab2" | "mobiletimerecording1"_

_Defined in [test/src/state.ts:158](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L158)_

---

### User

Ƭ **User**: _object_

_Defined in [test/src/state.ts:136](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L136)_

#### Type declaration:

- **features**: _[Feature](\_test_src_state_.md#feature)\_

- **firstName**: _string_

- **language**: _[OvlLanguage](\_test_src_state_.md#language)\_

- **lastName**: _string_

- **role**: _[Role](\_test_src_state_.md#role)\_

- **userCode**: _number_

- **userName**: _string_

## Object literals

### `Let` pics

### ▪ **pics**: _object_

_Defined in [test/src/state.ts:123](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L123)_

### salesContact

• **salesContact**: _string_ = ""

_Defined in [test/src/state.ts:124](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L124)_

### technicalContact

• **technicalContact**: _string_ = ""

_Defined in [test/src/state.ts:125](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L125)_

---

### `Let` portal

### ▪ **portal**: _object_

_Defined in [test/src/state.ts:165](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L165)_

### chartData

• **chartData**: _undefined_ = undefined

_Defined in [test/src/state.ts:168](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L168)_

### dpInvoiceDetail

• **dpInvoiceDetail**: _undefined_ = undefined

_Defined in [test/src/state.ts:169](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L169)_

### invoiceDetail

• **invoiceDetail**: _undefined_ = undefined

_Defined in [test/src/state.ts:170](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L170)_

### orderDetail

• **orderDetail**: _undefined_ = undefined

_Defined in [test/src/state.ts:167](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L167)_

### partner

• **partner**: _undefined_ = undefined

_Defined in [test/src/state.ts:171](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L171)_

### pics

• **pics**: _undefined_ = undefined

_Defined in [test/src/state.ts:172](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L172)_

### quotationDetail

• **quotationDetail**: _undefined_ = undefined

_Defined in [test/src/state.ts:173](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L173)_

### user

• **user**: _undefined_ = undefined

_Defined in [test/src/state.ts:166](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L166)_

▪ **tables**: _object_

_Defined in [test/src/state.ts:174](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L174)_

- **audit**: _object_

  - **data**(): _object_

  - **schema**(): _object_

  - **tableDef**: _object_

    - **audit**(): _object_

      - **columns**: _[ColumnsDef](\_ovl_src_library_table_table_.md#columnsdef)\_

      - **dataFetching**(): _object_

        - **useCustomDataFetching**? : _boolean_

        - **useSchema**? : _boolean_

      - **database**(): _object_

        - **dataIdField**: _[IDField](\_ovl_src_library_table_table_.md#idfield)\_

        - **dbInsertMode**: _[DBInsertMode](\_ovl_src_library_table_table_.md#dbinsertmode)\_

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

      - **id**: _[OvlTableDefIds](\_test_src_state_.md#OvlTableDefIds)\_

      - **initialised**? : _boolean_

      - **namespace**: _string_

      - **options**(): _object_

        - **addedRowsPosition**? : _"bottom"_

        - **copyColumnsIgnore**(): _object_

        - **customRowActions**(): _object_

        - **edit**(): _object_

          - **editType**: _"inline" | "big" | "custom"_

        - **filter**? : _[Filter](\_ovl_src_library_table_table_.md#filter)\_

        - **filterCustom**(): _object_

        - **maxRows**(): _object_

          - **maxRows**: _number_

          - **showHint**: _boolean_

          - **showInTitle**? : _boolean_

        - **navType**? : _"top/bottom" | "top" | "bottom"_

        - **paging**? : _[Paging](\_ovl_src_library_table_table_.md#paging)\_

        - **sort**? : _[Sort](\_ovl_src_library_table_table_.md#sort)\_

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

- **translation**: _object_

  - **data**(): _object_

  - **schema**(): _object_

  - **tableDef**: _object_

    - **translation**(): _object_

      - **columns**: _[ColumnsDef](\_ovl_src_library_table_table_.md#columnsdef)\_

      - **dataFetching**(): _object_

        - **useCustomDataFetching**? : _boolean_

        - **useSchema**? : _boolean_

      - **database**(): _object_

        - **dataIdField**: _[IDField](\_ovl_src_library_table_table_.md#idfield)\_

        - **dbInsertMode**: _[DBInsertMode](\_ovl_src_library_table_table_.md#dbinsertmode)\_

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

      - **id**: _[OvlTableDefIds](\_test_src_state_.md#OvlTableDefIds)\_

      - **initialised**? : _boolean_

      - **namespace**: _string_

      - **options**(): _object_

        - **addedRowsPosition**? : _"bottom"_

        - **copyColumnsIgnore**(): _object_

        - **customRowActions**(): _object_

        - **edit**(): _object_

          - **editType**: _"inline" | "big" | "custom"_

        - **filter**? : _[Filter](\_ovl_src_library_table_table_.md#filter)\_

        - **filterCustom**(): _object_

        - **maxRows**(): _object_

          - **maxRows**: _number_

          - **showHint**: _boolean_

          - **showInTitle**? : _boolean_

        - **navType**? : _"top/bottom" | "top" | "bottom"_

        - **paging**? : _[Paging](\_ovl_src_library_table_table_.md#paging)\_

        - **sort**? : _[Sort](\_ovl_src_library_table_table_.md#sort)\_

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

---

### `Let` testtables

### ▪ **testtables**: _object_

_Defined in [test/src/state.ts:192](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L192)_

### tableTesting

• **tableTesting**: _object_ = <TableData>{
data: {},
schema: {},
tableDef: { tab1: tblTableTesting, tab2: tblTableTesting2 },
lookupTypes: { U_Alpha: "text" },
lookupTypes2: { U_Alpha: "text", U_Date: "date" }
}

_Defined in [test/src/state.ts:193](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L193)_

#### Type declaration:

- **data**(): _object_

- **lookupTypes**(): _object_

- **lookupTypes2**(): _object_

- **lookupTypes3**(): _object_

- **schema**(): _object_

- **tableDef**(): _object_

- **timestamp**? : _number_

### timeentries

• **timeentries**: _object_ = <TableData>{
data: {},
schema: {},
tableDef: {
mobiletimerecording1: tblMobileTimeRecording
}
}

_Defined in [test/src/state.ts:200](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L200)_

#### Type declaration:

- **data**(): _object_

- **lookupTypes**(): _object_

- **lookupTypes2**(): _object_

- **lookupTypes3**(): _object_

- **schema**(): _object_

- **tableDef**(): _object_

- **timestamp**? : _number_

▪ **lookups**: _object_

_Defined in [test/src/state.ts:207](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/state.ts#L207)_

- **AbsenceTypeId**(): _object_

  - **data**(): _object_

  - **lookupTypes**(): _object_

  - **lookupTypes2**(): _object_

  - **lookupTypes3**(): _object_

- **ProjectTypeId**(): _object_

  - **data**(): _object_

  - **lookupTypes**(): _object_

  - **lookupTypes2**(): _object_

  - **lookupTypes3**(): _object_

- **U_ItemCode**(): _object_

  - **data**(): _object_

  - **lookupTypes**(): _object_

  - **lookupTypes2**(): _object_

  - **lookupTypes3**(): _object_

- **U_ItmsGrpCod**(): _object_

  - **data**(): _object_

  - **lookupTypes**(): _object_

  - **lookupTypes2**(): _object_

  - **lookupTypes3**(): _object_
