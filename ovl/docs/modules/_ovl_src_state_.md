[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/state"](_ovl_src_state_.md)

# Module: "ovl/src/state"

## Index

### Type aliases

* [User](_ovl_src_state_.md#user)

### Variables

* [apiUrl](_ovl_src_state_.md#let-apiurl)
* [availableLanguages](_ovl_src_state_.md#let-availablelanguages)
* [dialog](_ovl_src_state_.md#let-dialog)
* [forms](_ovl_src_state_.md#let-forms)
* [snacks](_ovl_src_state_.md#let-snacks)
* [translations](_ovl_src_state_.md#let-translations)

### Object literals

* [indicator](_ovl_src_state_.md#let-indicator)
* [nav](_ovl_src_state_.md#let-nav)
* [overlay](_ovl_src_state_.md#let-overlay)
* [overlay2](_ovl_src_state_.md#let-overlay2)
* [state](_ovl_src_state_.md#const-state)
* [user](_ovl_src_state_.md#let-user)

## Type aliases

###  User

Ƭ **User**: *object*

*Defined in [ovl/src/state.ts:36](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L36)*

#### Type declaration:

* **token**: *string*

## Variables

### `Let` apiUrl

• **apiUrl**: *string* = ""

*Defined in [ovl/src/state.ts:23](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L23)*

___

### `Let` availableLanguages

• **availableLanguages**: *string[]* = []

*Defined in [ovl/src/state.ts:21](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L21)*

___

### `Let` dialog

• **dialog**: *[DialogState](_ovl_src_library_dialog_dialog_.md#dialogstate)* = undefined

*Defined in [ovl/src/state.ts:19](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L19)*

___

### `Let` forms

• **forms**: *[FormsState](_ovl_src_library_forms_actions_.md#formsstate)* = undefined

*Defined in [ovl/src/state.ts:10](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L10)*

___

### `Let` snacks

• **snacks**: *object*

*Defined in [ovl/src/state.ts:17](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L17)*

#### Type declaration:

* \[ **key**: *string*\]: [SnackState](_ovl_src_library_snack_snack_.md#snackstate)

___

### `Let` translations

• **translations**: *[Translation](_ovl_src_global_globals_.md#translation)*

*Defined in [ovl/src/state.ts:22](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L22)*

## Object literals

### `Let` indicator

### ▪ **indicator**: *object*

*Defined in [ovl/src/state.ts:12](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L12)*

###  open

• **open**: *boolean* = true

*Defined in [ovl/src/state.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L13)*

###  refCounter

• **refCounter**: *number* = 1

*Defined in [ovl/src/state.ts:14](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L14)*

___

### `Let` nav

### ▪ **nav**: *object*

*Defined in [ovl/src/state.ts:25](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L25)*

###  currentScreen

• **currentScreen**: *undefined* = undefined

*Defined in [ovl/src/state.ts:27](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L27)*

###  formIdToReset

• **formIdToReset**: *undefined* = undefined

*Defined in [ovl/src/state.ts:30](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L30)*

###  formTypeToReset

• **formTypeToReset**: *undefined* = undefined

*Defined in [ovl/src/state.ts:29](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L29)*

###  nextScreen

• **nextScreen**: *undefined* = undefined

*Defined in [ovl/src/state.ts:26](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L26)*

###  screensHistory

• **screensHistory**: *undefined[]* = []

*Defined in [ovl/src/state.ts:28](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L28)*

___

### `Let` overlay

### ▪ **overlay**: *object*

*Defined in [ovl/src/state.ts:33](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L33)*

###  closing

• **closing**: *false* = false

*Defined in [ovl/src/state.ts:33](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L33)*

###  open

• **open**: *false* = false

*Defined in [ovl/src/state.ts:33](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L33)*

___

### `Let` overlay2

### ▪ **overlay2**: *object*

*Defined in [ovl/src/state.ts:34](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L34)*

###  closing

• **closing**: *false* = false

*Defined in [ovl/src/state.ts:34](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L34)*

###  open

• **open**: *false* = false

*Defined in [ovl/src/state.ts:34](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L34)*

___

### `Const` state

### ▪ **state**: *object*

*Defined in [ovl/src/state.ts:42](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L42)*

▪ **ovl**: *object*

*Defined in [ovl/src/state.ts:43](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L43)*

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

___

### `Let` user

### ▪ **user**: *object*

*Defined in [ovl/src/state.ts:40](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L40)*

###  token

• **token**: *string* = ""

*Defined in [ovl/src/state.ts:40](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/state.ts#L40)*
