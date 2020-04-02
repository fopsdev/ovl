[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/global/actions"](_ovl_src_global_actions_.md)

# Module: "ovl/src/global/actions"

## Index

### Functions

* [GetFile](_ovl_src_global_actions_.md#const-getfile)
* [InitApp](_ovl_src_global_actions_.md#const-initapp)
* [Logout](_ovl_src_global_actions_.md#const-logout)
* [NavigateBack](_ovl_src_global_actions_.md#const-navigateback)
* [NavigateTo](_ovl_src_global_actions_.md#const-navigateto)
* [PrepareApp](_ovl_src_global_actions_.md#const-prepareapp)
* [RehydrateAndUpdateApp](_ovl_src_global_actions_.md#const-rehydrateandupdateapp)
* [SetClosingScreen](_ovl_src_global_actions_.md#const-setclosingscreen)
* [SetLanguage](_ovl_src_global_actions_.md#const-setlanguage)
* [SetVisibleFalse](_ovl_src_global_actions_.md#const-setvisiblefalse)
* [SetVisibleScreen](_ovl_src_global_actions_.md#const-setvisiblescreen)
* [isMobile](_ovl_src_global_actions_.md#ismobile)
* [isTouch](_ovl_src_global_actions_.md#istouch)

## Functions

### `Const` GetFile

▸ **GetFile**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:303](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L303)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`docNum` | string |
`fileName` | string |
`fileType` | string |

**Returns:** *Promise‹void›*

___

### `Const` InitApp

▸ **InitApp**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:392](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L392)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`customerRealUrl` | string |
`customerRealUrlMatch` | string |
`customerTestUrl` | string |
`customerTestUrlMatch` | string |
`devServer` | string |
`itfliesServerUrl` | string |
`itfliesServerUrlMatch` | string |

**Returns:** *Promise‹void›*

___

### `Const` Logout

▸ **Logout**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:251](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L251)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` NavigateBack

▸ **NavigateBack**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:112](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L112)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` NavigateTo

▸ **NavigateTo**(`__namedParameters`: object, `value`: "Feedback" | "Settings" | "Login" | "MobileTimeEntry" | "Shellbar" | "Audit" | "Translation" | "Dashboard" | "Quotation" | "Order" | "Orderdetail" | "Invoice" | "TableTesting" | "MobileTimeEntryForm"): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:44](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L44)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *"Feedback" | "Settings" | "Login" | "MobileTimeEntry" | "Shellbar" | "Audit" | "Translation" | "Dashboard" | "Quotation" | "Order" | "Orderdetail" | "Invoice" | "TableTesting" | "MobileTimeEntryForm"*

**Returns:** *Promise‹void›*

___

### `Const` PrepareApp

▸ **PrepareApp**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:258](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L258)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` RehydrateAndUpdateApp

▸ **RehydrateAndUpdateApp**(`__namedParameters`: object): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:353](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L353)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` SetClosingScreen

▸ **SetClosingScreen**(`actions`: any, `state`: typeof state, `value`: string): *void*

*Defined in [ovl/src/global/actions.ts:169](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`actions` | any |
`state` | typeof state |
`value` | string |

**Returns:** *void*

___

### `Const` SetLanguage

▸ **SetLanguage**(`__namedParameters`: object, `value`: string): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:232](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L232)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

▪ **value**: *string*

**Returns:** *Promise‹void›*

___

### `Const` SetVisibleFalse

▸ **SetVisibleFalse**(`__namedParameters`: object, `value`: string): *void*

*Defined in [ovl/src/global/actions.ts:204](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L204)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **value**: *string*

**Returns:** *void*

___

### `Const` SetVisibleScreen

▸ **SetVisibleScreen**(`state`: typeof state, `value`: string): *Promise‹void›*

*Defined in [ovl/src/global/actions.ts:188](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | typeof state |
`value` | string |

**Returns:** *Promise‹void›*

___

###  isMobile

▸ **isMobile**(): *boolean*

*Defined in [ovl/src/global/actions.ts:27](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L27)*

**Returns:** *boolean*

___

###  isTouch

▸ **isTouch**(): *boolean*

*Defined in [ovl/src/global/actions.ts:23](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/global/actions.ts#L23)*

**Returns:** *boolean*
