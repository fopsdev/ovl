[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/actions"](_test_src_actions_.md)

# Module: "test/src/actions"

## Index

### Object literals

- [feedback](_test_src_actions_.md#let-feedback)
- [global](_test_src_actions_.md#let-global)
- [order](_test_src_actions_.md#let-order)
- [portal](_test_src_actions_.md#const-portal)
- [settings](_test_src_actions_.md#let-settings)
- [shellbar](_test_src_actions_.md#let-shellbar)
- [testtables](_test_src_actions_.md#const-testtables)
- [user](_test_src_actions_.md#let-user)

## Object literals

### `Let` feedback

### ▪ **feedback**: _object_

_Defined in [test/src/actions.ts:52](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L52)_

### FeedbackValidateField

• **FeedbackValidateField**: _Action‹object, void›_

_Defined in [test/src/actions.ts:54](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L54)_

### SaveFeedback

• **SaveFeedback**: _OvlAction‹object, void›_

_Defined in [test/src/actions.ts:53](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L53)_

---

### `Let` global

### ▪ **global**: _object_

_Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)_

### HandleRefresh

• **HandleRefresh**: _OvlAction‹void, void›_

_Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)_

### TogglePDFPopup

• **TogglePDFPopup**: _Action‹object, void›_

_Defined in [test/src/actions.ts:18](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L18)_

---

### `Let` order

### ▪ **order**: _object_

_Defined in [test/src/actions.ts:44](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L44)_

### PrepareDeliveryDateFeedback

• **PrepareDeliveryDateFeedback**: _Action‹object, void›_

_Defined in [test/src/actions.ts:47](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L47)_

### PrepareNegativeFeedback

• **PrepareNegativeFeedback**: _Action‹object, void›_

_Defined in [test/src/actions.ts:46](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L46)_

### PreparePositiveFeedback

• **PreparePositiveFeedback**: _Action‹object, void›_

_Defined in [test/src/actions.ts:45](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L45)_

### SelectOrder

• **SelectOrder**: _Action‹string, void›_

_Defined in [test/src/actions.ts:48](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L48)_

---

### `Const` portal

### ▪ **portal**: _object_

_Defined in [test/src/actions.ts:59](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L59)_

### feedback

• **feedback**: _object_

_Defined in [test/src/actions.ts:64](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L64)_

#### Type declaration:

- **FeedbackValidateField**: _Action‹object, void›_

- **SaveFeedback**: _OvlAction‹object, void›_

### global

• **global**: _object_

_Defined in [test/src/actions.ts:61](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L61)_

#### Type declaration:

- **HandleRefresh**: _OvlAction‹void, void›_

- **TogglePDFPopup**: _Action‹object, void›_

### order

• **order**: _object_

_Defined in [test/src/actions.ts:63](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L63)_

#### Type declaration:

- **PrepareDeliveryDateFeedback**: _Action‹object, void›_

- **PrepareNegativeFeedback**: _Action‹object, void›_

- **PreparePositiveFeedback**: _Action‹object, void›_

- **SelectOrder**: _Action‹string, void›_

### settings

• **settings**: _object_

_Defined in [test/src/actions.ts:62](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L62)_

#### Type declaration:

- **SaveSettings**: _OvlAction‹object, void›_

▪ **system**: _object_

_Defined in [test/src/actions.ts:60](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L60)_

- **shellbar**(): _object_

  - **CloseMainMenu**: _Action‹void, void›_

  - **CloseUserMenu**: _Action‹void, void›_

  - **OpenMainMenu**: _Action‹void, void›_

  - **OpenUserMenu**: _Action‹void, void›_

- **user**(): _object_

  - **CustomInit**: _OvlAction‹void, void›_

  - **ForgotPw**: _OvlAction‹object, void›_

  - **HandleAdditionalLanguageResult**: _OvlAction‹any, void›_

  - **Login**: _OvlAction‹object, void›_

  - **LoginValidateField**: _Action‹object, void›_

---

### `Let` settings

### ▪ **settings**: _object_

_Defined in [test/src/actions.ts:21](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L21)_

### SaveSettings

• **SaveSettings**: _OvlAction‹object, void›_

_Defined in [test/src/actions.ts:22](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L22)_

---

### `Let` shellbar

### ▪ **shellbar**: _object_

_Defined in [test/src/actions.ts:31](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L31)_

### CloseMainMenu

• **CloseMainMenu**: _Action‹void, void›_

_Defined in [test/src/actions.ts:32](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L32)_

### CloseUserMenu

• **CloseUserMenu**: _Action‹void, void›_

_Defined in [test/src/actions.ts:35](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L35)_

### OpenMainMenu

• **OpenMainMenu**: _Action‹void, void›_

_Defined in [test/src/actions.ts:33](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L33)_

### OpenUserMenu

• **OpenUserMenu**: _Action‹void, void›_

_Defined in [test/src/actions.ts:34](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L34)_

---

### `Const` testtables

### ▪ **testtables**: _object_

_Defined in [test/src/actions.ts:67](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L67)_

### mobiletimerecording

• **mobiletimerecording**: _["test/src/screens/MobileTimeRecording/actions"](_test_src_screens_mobiletimerecording_actions_.md)_

_Defined in [test/src/actions.ts:67](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L67)_

---

### `Let` user

### ▪ **user**: _object_

_Defined in [test/src/actions.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L10)_

### CustomInit

• **CustomInit**: _OvlAction‹void, void›_

_Defined in [test/src/actions.ts:15](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L15)_

### ForgotPw

• **ForgotPw**: _OvlAction‹object, void›_

_Defined in [test/src/actions.ts:13](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L13)_

### HandleAdditionalLanguageResult

• **HandleAdditionalLanguageResult**: _OvlAction‹any, void›_

_Defined in [test/src/actions.ts:14](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L14)_

### Login

• **Login**: _OvlAction‹object, void›_

_Defined in [test/src/actions.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L12)_

### LoginValidateField

• **LoginValidateField**: _Action‹object, void›_

_Defined in [test/src/actions.ts:11](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/actions.ts#L11)_
