[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/global/actions"](_ovl_src_global_actions_.md)

# Module: "ovl/src/global/actions"

## Index

### Functions

- [GetFile](_ovl_src_global_actions_.md#const-getfile)
- [InitApp](_ovl_src_global_actions_.md#const-initapp)
- [Logout](_ovl_src_global_actions_.md#const-logout)
- [NavigateBack](_ovl_src_global_actions_.md#const-navigateback)
- [NavigateTo](_ovl_src_global_actions_.md#const-navigateto)
- [PrepareApp](_ovl_src_global_actions_.md#const-prepareapp)
- [RehydrateApp](_ovl_src_global_actions_.md#const-RehydrateApp)
- [SetClosingScreen](_ovl_src_global_actions_.md#const-setclosingscreen)
- [SetLanguage](_ovl_src_global_actions_.md#const-setlanguage)
- [SetVisibleFalse](_ovl_src_global_actions_.md#const-setvisiblefalse)
- [SetVisibleScreen](_ovl_src_global_actions_.md#const-setvisiblescreen)
- [isMobile](_ovl_src_global_actions_.md#ismobile)
- [isTouch](_ovl_src_global_actions_.md#istouch)

## Functions

### `Const` GetFile

▸ **GetFile**(`__namedParameters`: object, `value`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:303](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L303)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name       | Type   |
| ---------- | ------ |
| `docNum`   | string |
| `fileName` | string |
| `fileType` | string |

**Returns:** _Promise‹void›_

---

### `Const` InitApp

▸ **InitApp**(`__namedParameters`: object, `value`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:392](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L392)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name                    | Type   |
| ----------------------- | ------ |
| `customerRealUrl`       | string |
| `customerRealUrlMatch`  | string |
| `customerTestUrl`       | string |
| `customerTestUrlMatch`  | string |
| `devServer`             | string |
| `itfliesServerUrl`      | string |
| `itfliesServerUrlMatch` | string |

**Returns:** _Promise‹void›_

---

### `Const` Logout

▸ **Logout**(`__namedParameters`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:251](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L251)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type   |
| --------- | ------ |
| `actions` | object |
| `state`   | object |

**Returns:** _Promise‹void›_

---

### `Const` NavigateBack

▸ **NavigateBack**(`__namedParameters`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:112](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L112)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

**Returns:** _Promise‹void›_

---

### `Const` NavigateTo

▸ **NavigateTo**(`__namedParameters`: object, `value`: "Feedback" | "Settings" | "Login" | "MobileTimeEntry" | "Shellbar" | "Audit" | "Translation" | "Dashboard" | "Quotation" | "Order" | "Orderdetail" | "Invoice" | "TableTesting" | "MobileTimeEntryForm"): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:44](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L44)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _"Feedback" | "Settings" | "Login" | "MobileTimeEntry" | "Shellbar" | "Audit" | "Translation" | "Dashboard" | "Quotation" | "Order" | "Orderdetail" | "Invoice" | "TableTesting" | "MobileTimeEntryForm"_

**Returns:** _Promise‹void›_

---

### `Const` PrepareApp

▸ **PrepareApp**(`__namedParameters`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:258](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L258)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

**Returns:** _Promise‹void›_

---

### `Const` RehydrateApp

▸ **RehydrateApp**(`__namedParameters`: object): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:353](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L353)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

**Returns:** _Promise‹void›_

---

### `Const` SetClosingScreen

▸ **SetClosingScreen**(`actions`: any, `state`: typeof state, `value`: string): _void_

_Defined in [ovl/src/global/actions.ts:169](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L169)_

**Parameters:**

| Name      | Type         |
| --------- | ------------ |
| `actions` | any          |
| `state`   | typeof state |
| `value`   | string       |

**Returns:** _void_

---

### `Const` SetLanguage

▸ **SetLanguage**(`__namedParameters`: object, `value`: string): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:232](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L232)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _string_

**Returns:** _Promise‹void›_

---

### `Const` SetVisibleFalse

▸ **SetVisibleFalse**(`__namedParameters`: object, `value`: string): _void_

_Defined in [ovl/src/global/actions.ts:204](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L204)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type   |
| --------- | ------ |
| `actions` | object |
| `state`   | object |

▪ **value**: _string_

**Returns:** _void_

---

### `Const` SetVisibleScreen

▸ **SetVisibleScreen**(`state`: typeof state, `value`: string): _Promise‹void›_

_Defined in [ovl/src/global/actions.ts:188](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L188)_

**Parameters:**

| Name    | Type         |
| ------- | ------------ |
| `state` | typeof state |
| `value` | string       |

**Returns:** _Promise‹void›_

---

### isMobile

▸ **isMobile**(): _boolean_

_Defined in [ovl/src/global/actions.ts:27](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L27)_

**Returns:** _boolean_

---

### isTouch

▸ **isTouch**(): _boolean_

_Defined in [ovl/src/global/actions.ts:23](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/actions.ts#L23)_

**Returns:** _boolean_
