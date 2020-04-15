[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/screens/Audit/state"](_test_src_screens_audit_state_.md)

# Module: "test/src/screens/Audit/state"

## Index

### Object literals

* [tblAudit](_test_src_screens_audit_state_.md#let-tblaudit)

## Object literals

### `Let` tblAudit

### ▪ **tblAudit**: *object*

*Defined in [test/src/screens/Audit/state.ts:3](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L3)*

###  id

• **id**: *"audit"* = "audit"

*Defined in [test/src/screens/Audit/state.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L4)*

###  namespace

• **namespace**: *string* = "portal.system.audit"

*Defined in [test/src/screens/Audit/state.ts:5](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L5)*

▪ **columns**: *object*

*Defined in [test/src/screens/Audit/state.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L24)*

* **U_IDField**: *object*

  * **caption**: *string* = "ID Field"

  * **sortable**: *true* = true

* **U_IDValue**: *object*

  * **caption**: *string* = "ID Value"

  * **sortable**: *true* = true

* **U_Operation**: *object*

  * **caption**: *string* = "Operation"

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 10

* **U_Payload**: *object*

  * **caption**: *string* = "Payload"

* **U_Role**: *object*

  * **caption**: *string* = "Role"

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 10

* **U_TableName**: *object*

  * **caption**: *string* = "Tablename"

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 10

* **U_Timestamp**: *object*

  * **caption**: *string* = "Timestamp"

  * **format**: *"timestamp"* = "timestamp"

  * **sortable**: *true* = true

* **U_User**: *object*

  * **caption**: *string* = "User"

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 25

* **U_UserCode**: *object*

  * **caption**: *string* = "UserCode"

  * **sortable**: *true* = true

  * **filter**: *object*

    * **top**: *number* = 25

▪ **database**: *object*

*Defined in [test/src/screens/Audit/state.ts:6](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L6)*

* **dataIdField**: *string* = "Code"

* **dbInsertMode**: *"UDTAutoGUIDBoth"* = "UDTAutoGUIDBoth"

▪ **features**: *object*

*Defined in [test/src/screens/Audit/state.ts:17](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L17)*

* **add**: *false* = false

* **delete**: *false* = false

* **edit**: *false* = false

* **noButtonsAtTheBottom**: *true* = true

* **page**: *true* = true

▪ **options**: *object*

*Defined in [test/src/screens/Audit/state.ts:13](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L13)*

* **paging**: *object*

  * **page**: *number* = 0

  * **pageSize**: *number* = 200

* **sort**: *object*

  * **direction**: *"desc"* = "desc"

  * **field**: *string* = "U_Timestamp"

▪ **server**: *object*

*Defined in [test/src/screens/Audit/state.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Audit/state.ts#L10)*

* **endpoint**: *string* = "audit"
