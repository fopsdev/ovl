[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/init"](_ovl_src_init_.md)

# Module: "ovl/src/init"

## Index

### Type aliases

- [Init](_ovl_src_init_.md#init)
- [OvlConfig](_ovl_src_init_.md#ovlconfig)

### Variables

- [dataVersion](_ovl_src_init_.md#let-dataversion)

### Object literals

- [OvlConfig](_ovl_src_init_.md#let-ovlconfig)
- [baseOvermindConfig](_ovl_src_init_.md#const-baseovermindconfig)

## Type aliases

### Init

Ƭ **Init**: _object_

_Defined in [ovl/src/init.ts:4](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L4)_

#### Type declaration:

- **customerRealUrl**: _string_

- **customerRealUrlMatch**: _string_

- **customerTestUrl**: _string_

- **customerTestUrlMatch**: _string_

- **devServer**: _string_

- **itfliesServerUrl**: _string_

- **itfliesServerUrlMatch**: _string_

---

### OvlConfig

Ƭ **OvlConfig**: _object_

_Defined in [ovl/src/init.ts:14](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L14)_

#### Type declaration:

- **\_system**(): _object_

  - **DataVersion**: _string_

  - **IsDev**: _boolean_

  - **OfflineMode**: _boolean_

  - **PersistStateId**: _string_

  - **PersistTimestampId**: _string_

  - **ShowSaveOrigin**: _boolean_

  - **Version**: _string_

- **apiUrl**: _[Init](_ovl_src_init_.md#init)_

- **requiredActions**(): _object_

  - **customInitActionPath**: _OvlAction_

  - **customPrepareActionPath**: _OvlAction_

  - **handleAdditionalTranslationResultActionPath**: _OvlAction_

  - **handleGlobalRefreshActionPath**: _OvlAction_

- **saveStateCallback**(): _function_

  - (`parentKey`: string, `key`: string, `obj`: any): _object_

## Variables

### `Let` dataVersion

• **dataVersion**: _string_ = "1"

_Defined in [ovl/src/init.ts:53](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L53)_

## Object literals

### `Let` OvlConfig

### ▪ **OvlConfig**: _object_

_Defined in [ovl/src/init.ts:54](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L54)_

### apiUrl

• **apiUrl**: _undefined_ = undefined

_Defined in [ovl/src/init.ts:64](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L64)_

### requiredActions

• **requiredActions**: _undefined_ = undefined

_Defined in [ovl/src/init.ts:65](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L65)_

### saveStateCallback

• **saveStateCallback**: _undefined_ = undefined

_Defined in [ovl/src/init.ts:66](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L66)_

▪ **\_system**: _object_

_Defined in [ovl/src/init.ts:55](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L55)_

- **DataVersion**: _string_ = dataVersion

- **IsDev**: _false_ = false

- **OfflineMode**: _false_ = false

- **PersistStateId**: _string_ = "ovlstate" + dataVersion

- **PersistTimestampId**: _string_ = "ovltimestamp" + dataVersion

- **ShowSaveOrigin**: _true_ = true

- **Version**: _string_ = "0.5"

---

### `Const` baseOvermindConfig

### ▪ **baseOvermindConfig**: _object_

_Defined in [ovl/src/init.ts:46](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L46)_

### actions

• **actions**: _["ovl/src/actions"](_ovl_src_actions_.md)_

_Defined in [ovl/src/init.ts:49](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L49)_

### effects

• **effects**: _["ovl/src/effects"](_ovl_src_effects_.md)_

_Defined in [ovl/src/init.ts:50](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L50)_

### onInitialize

• **onInitialize**: _OnInitialize‹›_

_Defined in [ovl/src/init.ts:47](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L47)_

### state

• **state**: _object_

_Defined in [ovl/src/init.ts:48](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/init.ts#L48)_

#### Type declaration:

- ### **ovl**: _object_

  - **apiUrl**: _string_

  - **forms**(): _object_

  - **user**(): _object_

    - **token**: _string_

  - **language**: _object_

    - **availableLanguages**: _string[]_

    - **language**: _string_ = ""

    - **showTranslationKeys**: _boolean_ = false

    - **translations**(): _object_

  - **libState**: _object_

    - **dialog**(): _object_

      - **cancelText**: _string_

      - **closing**: _boolean_

      - **default**: _[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)_

      - **okText**: _string_

      - **result**: _[ResultType](_ovl_src_library_dialog_dialog_.md#resulttype)_

      - **text**: _string_

      - **visible**: _boolean_

    - **indicator**(): _object_

      - **open**: _boolean_ = true

      - **refCounter**: _number_ = 1

    - **overlay**(): _object_

      - **closing**: _boolean_

      - **open**: _boolean_

    - **overlay2**(): _object_

      - **closing**: _boolean_

      - **open**: _boolean_

    - **snacks**(): _object_

  - **screens**: _object_

    - **nav**(): _object_

      - **currentScreen**: _[Screen](_test_src_statescreens_.md#screen)_

      - **formIdToReset**: _string_

      - **formTypeToReset**: _[FormType](_ovl_src_library_forms_actions_.md#formtype)_

      - **nextScreen**: _[Screen](_test_src_statescreens_.md#screen)_

      - **screensHistory**: _[ScreensHistory](_ovl_src_library_ovlbaseelement_.md#screenshistory)_

    - **screenState**: _undefined_ = undefined

    - **screens**(): _object_

      - **Audit**(): _object_

      - **Dashboard**(): _object_

      - **Feedback**(): _object_

        - **cardCode**: _string_

        - **dirty**: _boolean_

        - **message**: _string_

        - **orderDate**: _string_

        - **orderDeliveryDate**: _string_

        - **orderNum**: _string_

        - **refNum**: _string_

        - **title**: _string_

        - **type**: _[FeedbackType](_test_src_screens_feedback_feedbackform_.md#feedbacktype)_

      - **Invoice**(): _object_

        - **activeFilePopup**: _string_

      - **Login**(): _object_

      - **MobileTimeEntry**(): _object_

        - **selectedDate**: _string_ = ""

      - **MobileTimeEntryForm**(): _object_

        - **rowKey**: _string_

      - **Order**(): _object_

        - **activeFilePopup**: _string_

      - **Orderdetail**(): _object_

        - **selectedOrder**: _string_

      - **Quotation**(): _object_

        - **activeFilePopup**: _string_

      - **Settings**(): _object_

      - **Shellbar**(): _object_

        - **mainMenuExpanded**: _boolean_

        - **userMenuExpanded**: _boolean_

      - **TableTesting**(): _object_

      - **Translation**(): _object_

  - **uiState**: _object_

    - **hasOSReducedMotion**: _boolean_ = false

    - **isDemo**: _boolean_ = false

    - **isIOS**: _boolean_ = false

    - **isMobile**: _boolean_ = false

    - **isReady**: _boolean_ = false

    - **isTouch**: _boolean_ = false

    - **stateSavedReason**: _string_ = ""
