[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/init"](_ovl_src_init_.md)

# Module: "ovl/src/init"

## Index

### Type aliases

* [Init](_ovl_src_init_.md#init)
* [OvlConfig](_ovl_src_init_.md#ovlconfig)

### Variables

* [dataVersion](_ovl_src_init_.md#let-dataversion)

### Object literals

* [OvlConfig](_ovl_src_init_.md#let-ovlconfig)
* [baseOvermindConfig](_ovl_src_init_.md#const-baseovermindconfig)

## Type aliases

###  Init

Ƭ **Init**: *object*

*Defined in [ovl/src/init.ts:4](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L4)*

#### Type declaration:

* **customerRealUrl**: *string*

* **customerRealUrlMatch**: *string*

* **customerTestUrl**: *string*

* **customerTestUrlMatch**: *string*

* **devServer**: *string*

* **itfliesServerUrl**: *string*

* **itfliesServerUrlMatch**: *string*

___

###  OvlConfig

Ƭ **OvlConfig**: *object*

*Defined in [ovl/src/init.ts:14](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L14)*

#### Type declaration:

* **_system**(): *object*

  * **DataVersion**: *string*

  * **IsDev**: *boolean*

  * **OfflineMode**: *boolean*

  * **PersistStateId**: *string*

  * **PersistTimestampId**: *string*

  * **ShowSaveOrigin**: *boolean*

  * **Version**: *string*

* **apiUrl**: *[Init](_ovl_src_init_.md#init)*

* **requiredActions**(): *object*

  * **customInitActionPath**: *AsyncAction*

  * **customPrepareActionPath**: *AsyncAction*

  * **handleAdditionalTranslationResultActionPath**: *AsyncAction*

  * **handleGlobalRefreshActionPath**: *AsyncAction*

* **saveStateCallback**(): *function*

  * (`parentKey`: string, `key`: string, `obj`: any): *object*

## Variables

### `Let` dataVersion

• **dataVersion**: *string* = "1"

*Defined in [ovl/src/init.ts:53](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L53)*

## Object literals

### `Let` OvlConfig

### ▪ **OvlConfig**: *object*

*Defined in [ovl/src/init.ts:54](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L54)*

###  apiUrl

• **apiUrl**: *undefined* = undefined

*Defined in [ovl/src/init.ts:64](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L64)*

###  requiredActions

• **requiredActions**: *undefined* = undefined

*Defined in [ovl/src/init.ts:65](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L65)*

###  saveStateCallback

• **saveStateCallback**: *undefined* = undefined

*Defined in [ovl/src/init.ts:66](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L66)*

▪ **_system**: *object*

*Defined in [ovl/src/init.ts:55](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L55)*

* **DataVersion**: *string* = dataVersion

* **IsDev**: *false* = false

* **OfflineMode**: *false* = false

* **PersistStateId**: *string* = "ovlstate" + dataVersion

* **PersistTimestampId**: *string* = "ovltimestamp" + dataVersion

* **ShowSaveOrigin**: *true* = true

* **Version**: *string* = "0.5"

___

### `Const` baseOvermindConfig

### ▪ **baseOvermindConfig**: *object*

*Defined in [ovl/src/init.ts:46](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L46)*

###  actions

• **actions**: *["ovl/src/actions"](_ovl_src_actions_.md)*

*Defined in [ovl/src/init.ts:49](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L49)*

###  effects

• **effects**: *["ovl/src/effects"](_ovl_src_effects_.md)*

*Defined in [ovl/src/init.ts:50](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L50)*

###  onInitialize

• **onInitialize**: *OnInitialize‹›*

*Defined in [ovl/src/init.ts:47](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L47)*

###  state

• **state**: *object*

*Defined in [ovl/src/init.ts:48](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/init.ts#L48)*

#### Type declaration:

* ### **ovl**: *object*

  * **apiUrl**: *string*

  * **forms**(): *object*

  * **user**(): *object*

    * **token**: *string*

  * **language**: *object*

    * **availableLanguages**: *string[]*

    * **language**: *string* = ""

    * **showTranslationKeys**: *boolean* = false

    * **translations**(): *object*

  * **libState**: *object*

    * **dialog**(): *object*

      * **cancelText**: *string*

      * **closing**: *boolean*

      * **default**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

      * **okText**: *string*

      * **result**: *[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)*

      * **text**: *string*

      * **visible**: *boolean*

    * **indicator**(): *object*

      * **open**: *boolean* = true

      * **refCounter**: *number* = 1

    * **overlay**(): *object*

      * **closing**: *boolean*

      * **open**: *boolean*

    * **overlay2**(): *object*

      * **closing**: *boolean*

      * **open**: *boolean*

    * **snacks**(): *object*

  * **screens**: *object*

    * **nav**(): *object*

      * **currentScreen**: *[Screen](_test_src_statescreens_.md#screen)*

      * **formIdToReset**: *string*

      * **formTypeToReset**: *[FormType](_ovl_src_library_forms_actions_.md#formtype)*

      * **nextScreen**: *[Screen](_test_src_statescreens_.md#screen)*

      * **screensHistory**: *[ScreensHistory](_ovl_src_library_ovlbaseelement_.md#screenshistory)*

    * **screenState**: *undefined* = undefined

    * **screens**(): *object*

      * **Audit**(): *object*

      * **Dashboard**(): *object*

      * **Feedback**(): *object*

        * **cardCode**: *string*

        * **dirty**: *boolean*

        * **message**: *string*

        * **orderDate**: *string*

        * **orderDeliveryDate**: *string*

        * **orderNum**: *string*

        * **refNum**: *string*

        * **title**: *string*

        * **type**: *[FeedbackType](_test_src_screens_feedback_feedbackform_.md#feedbacktype)*

      * **Invoice**(): *object*

        * **activeFilePopup**: *string*

      * **Login**(): *object*

      * **MobileTimeEntry**(): *object*

        * **selectedDate**: *string* = ""

      * **MobileTimeEntryForm**(): *object*

        * **rowKey**: *string*

      * **Order**(): *object*

        * **activeFilePopup**: *string*

      * **Orderdetail**(): *object*

        * **selectedOrder**: *string*

      * **Quotation**(): *object*

        * **activeFilePopup**: *string*

      * **Settings**(): *object*

      * **Shellbar**(): *object*

        * **mainMenuExpanded**: *boolean*

        * **userMenuExpanded**: *boolean*

      * **TableTesting**(): *object*

      * **Translation**(): *object*

  * **uiState**: *object*

    * **hasOSReducedMotion**: *boolean* = false

    * **isDemo**: *boolean* = false

    * **isIOS**: *boolean* = false

    * **isMobile**: *boolean* = false

    * **isReady**: *boolean* = false

    * **isTouch**: *boolean* = false

    * **stateSavedReason**: *string* = ""
