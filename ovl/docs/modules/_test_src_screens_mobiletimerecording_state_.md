[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/screens/MobileTimeRecording/state"](_test_src_screens_mobiletimerecording_state_.md)

# Module: "test/src/screens/MobileTimeRecording/state"

## Index

### Type aliases

* [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording)
* [tblMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tblmobiletimerecording)

### Object literals

* [tblMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#let-tblmobiletimerecording)

## Type aliases

###  TableMobileTimeRecording

Ƭ **TableMobileTimeRecording**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:3](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L3)*

#### Type declaration:

* **Code**? : *string*

* **Name**? : *string*

* **U_Date**? : *string*

* **U_Duration**? : *number*

* **U_FromTime**? : *string*

* **U_ToTime**? : *string*

* **U_Type**? : *"PROJECT" | "ABSENCE"*

* **U_TypeId**? : *string*

* **U_User**? : *string*

* **U_WeekNr**? : *number*

___

###  tblMobileTimeRecording

Ƭ **tblMobileTimeRecording**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:25](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L25)*

#### Type declaration:

* \[ **key**: *string*\]: [TableMobileTimeRecording](_test_src_screens_mobiletimerecording_state_.md#tablemobiletimerecording)

## Object literals

### `Let` tblMobileTimeRecording

### ▪ **tblMobileTimeRecording**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:29](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L29)*

###  id

• **id**: *"mobiletimerecording1"* = "mobiletimerecording1"

*Defined in [test/src/screens/MobileTimeRecording/state.ts:30](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L30)*

###  namespace

• **namespace**: *string* = "testtables.mobiletimerecording"

*Defined in [test/src/screens/MobileTimeRecording/state.ts:31](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L31)*

▪ **columns**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:43](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L43)*

* **U_Duration**: *object*

  * **caption**: *string* = "Dauer"

  * **editable**: *false* = false

  * **type**: *"decimal"* = "decimal"

* **U_FromTime**: *object*

  * **caption**: *string* = "Von Zeit"

  * **type**: *"time"* = "time"

* **U_ToTime**: *object*

  * **caption**: *string* = "Bis Zeit"

  * **type**: *"time"* = "time"

* **U_Type**: *object*

  * **caption**: *string* = "Typ"

  * **control**: *"option"* = "option"

  * **type**: *"text"* = "text"

  * **list**: *object*

    * **acceptEmpty**: *false* = false

    * **displayField**: *string* = "Description"

    * **valueField**: *string* = "Code"

* **U_TypeId**: *object*

  * **caption**: *string* = "Bezeichnung"

  * **type**: *"text"* = "text"

  * **list**: *object*

    * **acceptEmpty**: *false* = false

    * **acceptOnlyListValues**: *true* = true

    * **displayField**: *string* = "Description"

    * **displayValueField**: *false* = false

    * **serverEndpoint**: *string* = "lookup"

    * **valueField**: *string* = "Code"

▪ **database**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:35](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L35)*

* **dataIdField**: *string* = "Code"

* **dbInsertMode**: *"UDTAutoGUIDBoth"* = "UDTAutoGUIDBoth"

▪ **options**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:39](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L39)*

* **filter**: *object*

  * **showSelected**: *false* = false

  * **value**: *string* = ""

  * **static**: *object*

    * **U_Date**: *string* = ""

* **sort**: *object*

  * **direction**: *"desc"* = "desc"

  * **field**: *string* = "U_FromTime"

▪ **server**: *object*

*Defined in [test/src/screens/MobileTimeRecording/state.ts:32](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/screens/MobileTimeRecording/state.ts#L32)*

* **endpoint**: *string* = "timeentries"
