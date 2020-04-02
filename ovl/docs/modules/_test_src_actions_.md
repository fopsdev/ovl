[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/actions"](_test_src_actions_.md)

# Module: "test/src/actions"

## Index

### Object literals

* [feedback](_test_src_actions_.md#let-feedback)
* [global](_test_src_actions_.md#let-global)
* [order](_test_src_actions_.md#let-order)
* [portal](_test_src_actions_.md#const-portal)
* [settings](_test_src_actions_.md#let-settings)
* [shellbar](_test_src_actions_.md#let-shellbar)
* [testtables](_test_src_actions_.md#const-testtables)
* [user](_test_src_actions_.md#let-user)

## Object literals

### `Let` feedback

### ▪ **feedback**: *object*

*Defined in [test/src/actions.ts:52](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L52)*

###  FeedbackValidateField

• **FeedbackValidateField**: *Action‹object, void›*

*Defined in [test/src/actions.ts:54](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L54)*

###  SaveFeedback

• **SaveFeedback**: *AsyncAction‹object, void›*

*Defined in [test/src/actions.ts:53](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L53)*

___

### `Let` global

### ▪ **global**: *object*

*Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)*

###  HandleRefresh

• **HandleRefresh**: *AsyncAction‹void, void›*

*Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)*

###  TogglePDFPopup

• **TogglePDFPopup**: *Action‹object, void›*

*Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)*

___

### `Let` order

### ▪ **order**: *object*

*Defined in [test/src/actions.ts:44](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L44)*

###  PrepareDeliveryDateFeedback

• **PrepareDeliveryDateFeedback**: *Action‹object, void›*

*Defined in [test/src/actions.ts:47](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L47)*

###  PrepareNegativeFeedback

• **PrepareNegativeFeedback**: *Action‹object, void›*

*Defined in [test/src/actions.ts:46](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L46)*

###  PreparePositiveFeedback

• **PreparePositiveFeedback**: *Action‹object, void›*

*Defined in [test/src/actions.ts:45](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L45)*

###  SelectOrder

• **SelectOrder**: *Action‹string, void›*

*Defined in [test/src/actions.ts:48](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L48)*

___

### `Const` portal

### ▪ **portal**: *object*

*Defined in [test/src/actions.ts:59](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L59)*

###  feedback

• **feedback**: *object*

*Defined in [test/src/actions.ts:64](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L64)*

#### Type declaration:

* **FeedbackValidateField**: *Action‹object, void›*

* **SaveFeedback**: *AsyncAction‹object, void›*

###  global

• **global**: *object*

*Defined in [test/src/actions.ts:61](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L61)*

#### Type declaration:

* **HandleRefresh**: *AsyncAction‹void, void›*

* **TogglePDFPopup**: *Action‹object, void›*

###  order

• **order**: *object*

*Defined in [test/src/actions.ts:63](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L63)*

#### Type declaration:

* **PrepareDeliveryDateFeedback**: *Action‹object, void›*

* **PrepareNegativeFeedback**: *Action‹object, void›*

* **PreparePositiveFeedback**: *Action‹object, void›*

* **SelectOrder**: *Action‹string, void›*

###  settings

• **settings**: *object*

*Defined in [test/src/actions.ts:62](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L62)*

#### Type declaration:

* **SaveSettings**: *AsyncAction‹object, void›*

▪ **system**: *object*

*Defined in [test/src/actions.ts:60](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L60)*

* **shellbar**(): *object*

  * **CloseMainMenu**: *Action‹void, void›*

  * **CloseUserMenu**: *Action‹void, void›*

  * **OpenMainMenu**: *Action‹void, void›*

  * **OpenUserMenu**: *Action‹void, void›*

* **user**(): *object*

  * **CustomInit**: *AsyncAction‹void, void›*

  * **ForgotPw**: *AsyncAction‹object, void›*

  * **HandleAdditionalLanguageResult**: *AsyncAction‹any, void›*

  * **Login**: *AsyncAction‹object, void›*

  * **LoginValidateField**: *Action‹object, void›*

___

### `Let` settings

### ▪ **settings**: *object*

*Defined in [test/src/actions.ts:21](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L21)*

###  SaveSettings

• **SaveSettings**: *AsyncAction‹object, void›*

*Defined in [test/src/actions.ts:22](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L22)*

___

### `Let` shellbar

### ▪ **shellbar**: *object*

*Defined in [test/src/actions.ts:31](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L31)*

###  CloseMainMenu

• **CloseMainMenu**: *Action‹void, void›*

*Defined in [test/src/actions.ts:32](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L32)*

###  CloseUserMenu

• **CloseUserMenu**: *Action‹void, void›*

*Defined in [test/src/actions.ts:35](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L35)*

###  OpenMainMenu

• **OpenMainMenu**: *Action‹void, void›*

*Defined in [test/src/actions.ts:33](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L33)*

###  OpenUserMenu

• **OpenUserMenu**: *Action‹void, void›*

*Defined in [test/src/actions.ts:34](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L34)*

___

### `Const` testtables

### ▪ **testtables**: *object*

*Defined in [test/src/actions.ts:67](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L67)*

###  mobiletimerecording

• **mobiletimerecording**: *["test/src/screens/MobileTimeRecording/actions"](_test_src_screens_mobiletimerecording_actions_.md)*

*Defined in [test/src/actions.ts:67](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L67)*

___

### `Let` user

### ▪ **user**: *object*

*Defined in [test/src/actions.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L10)*

###  CustomInit

• **CustomInit**: *AsyncAction‹void, void›*

*Defined in [test/src/actions.ts:15](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L15)*

###  ForgotPw

• **ForgotPw**: *AsyncAction‹object, void›*

*Defined in [test/src/actions.ts:13](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L13)*

###  HandleAdditionalLanguageResult

• **HandleAdditionalLanguageResult**: *AsyncAction‹any, void›*

*Defined in [test/src/actions.ts:14](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L14)*

###  Login

• **Login**: *AsyncAction‹object, void›*

*Defined in [test/src/actions.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L12)*

###  LoginValidateField

• **LoginValidateField**: *Action‹object, void›*

*Defined in [test/src/actions.ts:11](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L11)*
