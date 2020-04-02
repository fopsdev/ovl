[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/global/globals"](_ovl_src_global_globals_.md)

# Module: "ovl/src/global/globals"

## Index

### Interfaces

* [IAttachmentDownload](../interfaces/_ovl_src_global_globals_.iattachmentdownload.md)
* [IAttachmentUpload](../interfaces/_ovl_src_global_globals_.iattachmentupload.md)

### Type aliases

* [Translation](_ovl_src_global_globals_.md#translation)
* [Translations](_ovl_src_global_globals_.md#translations)
* [Variable](_ovl_src_global_globals_.md#variable)

### Variables

* [OvlTimestamp](_ovl_src_global_globals_.md#let-ovltimestamp)
* [TCache](_ovl_src_global_globals_.md#let-tcache)
* [gotoFileFlag](_ovl_src_global_globals_.md#let-gotofileflag)
* [logoutAndClearFlag](_ovl_src_global_globals_.md#let-logoutandclearflag)
* [ovltemp](_ovl_src_global_globals_.md#const-ovltemp)
* [saveReason](_ovl_src_global_globals_.md#let-savereason)
* [translationData](_ovl_src_global_globals_.md#let-translationdata)

### Functions

* [D](_ovl_src_global_globals_.md#let-d)
* [GetWeekNr](_ovl_src_global_globals_.md#const-getweeknr)
* [N](_ovl_src_global_globals_.md#let-n)
* [N4](_ovl_src_global_globals_.md#let-n4)
* [ResetT](_ovl_src_global_globals_.md#const-resett)
* [ShowFile](_ovl_src_global_globals_.md#const-showfile)
* [T](_ovl_src_global_globals_.md#const-t)
* [addGlobalPersistEventListeners](_ovl_src_global_globals_.md#const-addglobalpersisteventlisteners)
* [beforeUnload](_ovl_src_global_globals_.md#const-beforeunload)
* [focusOut](_ovl_src_global_globals_.md#const-focusout)
* [getDateValue](_ovl_src_global_globals_.md#const-getdatevalue)
* [getDecimalValue](_ovl_src_global_globals_.md#const-getdecimalvalue)
* [logout](_ovl_src_global_globals_.md#const-logout)
* [resolvePath](_ovl_src_global_globals_.md#const-resolvepath)
* [saveState](_ovl_src_global_globals_.md#const-savestate)
* [stateCleaner](_ovl_src_global_globals_.md#const-statecleaner)
* [uuidv4](_ovl_src_global_globals_.md#const-uuidv4)
* [visibilityChange](_ovl_src_global_globals_.md#const-visibilitychange)

### Object literals

* [api](_ovl_src_global_globals_.md#let-api)
* [translations](_ovl_src_global_globals_.md#let-translations)

## Type aliases

###  Translation

Ƭ **Translation**: *object*

*Defined in [ovl/src/global/globals.ts:388](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L388)*

#### Type declaration:

* \[ **key**: *string*\]: string

___

###  Translations

Ƭ **Translations**: *object*

*Defined in [ovl/src/global/globals.ts:380](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L380)*

#### Type declaration:

* **t**: *[Translation](_ovl_src_global_globals_.md#translation)*

___

###  Variable

Ƭ **Variable**: *object*

*Defined in [ovl/src/global/globals.ts:384](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L384)*

#### Type declaration:

* \[ **key**: *string*\]: string

## Variables

### `Let` OvlTimestamp

• **OvlTimestamp**: *number* = 0

*Defined in [ovl/src/global/globals.ts:14](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L14)*

___

### `Let` TCache

• **TCache**: *Map‹any, any›* = new Map()

*Defined in [ovl/src/global/globals.ts:308](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L308)*

___

### `Let` gotoFileFlag

• **gotoFileFlag**: *boolean* = false

*Defined in [ovl/src/global/globals.ts:186](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L186)*

___

### `Let` logoutAndClearFlag

• **logoutAndClearFlag**: *boolean* = false

*Defined in [ovl/src/global/globals.ts:185](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L185)*

___

### `Const` ovltemp

• **ovltemp**: *"_ovltmp"* = "_ovltmp"

*Defined in [ovl/src/global/globals.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L12)*

___

### `Let` saveReason

• **saveReason**: *string* = ""

*Defined in [ovl/src/global/globals.ts:156](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L156)*

___

### `Let` translationData

• **translationData**: *object*

*Defined in [ovl/src/global/globals.ts:11](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L11)*

#### Type declaration:

## Functions

### `Let` D

▸ **D**(`date`: string): *any*

*Defined in [ovl/src/global/globals.ts:60](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | string |

**Returns:** *any*

___

### `Const` GetWeekNr

▸ **GetWeekNr**(`dt`: Date): *number*

*Defined in [ovl/src/global/globals.ts:73](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`dt` | Date |

**Returns:** *number*

___

### `Let` N

▸ **N**(`decimal`: number): *string*

*Defined in [ovl/src/global/globals.ts:64](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`decimal` | number |

**Returns:** *string*

___

### `Let` N4

▸ **N4**(`decimal`: number): *string*

*Defined in [ovl/src/global/globals.ts:68](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`decimal` | number |

**Returns:** *string*

___

### `Const` ResetT

▸ **ResetT**(): *void*

*Defined in [ovl/src/global/globals.ts:309](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L309)*

**Returns:** *void*

___

### `Const` ShowFile

▸ **ShowFile**(`blob`: any, `type`: any, `fileName`: any): *void*

*Defined in [ovl/src/global/globals.ts:282](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L282)*

**Parameters:**

Name | Type |
------ | ------ |
`blob` | any |
`type` | any |
`fileName` | any |

**Returns:** *void*

___

### `Const` T

▸ **T**(`key`: string, `reps?`: string[]): *string*

*Defined in [ovl/src/global/globals.ts:312](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`reps?` | string[] |

**Returns:** *string*

___

### `Const` addGlobalPersistEventListeners

▸ **addGlobalPersistEventListeners**(): *void*

*Defined in [ovl/src/global/globals.ts:86](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L86)*

**Returns:** *void*

___

### `Const` beforeUnload

▸ **beforeUnload**(`event`: any): *Promise‹void›*

*Defined in [ovl/src/global/globals.ts:111](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *Promise‹void›*

___

### `Const` focusOut

▸ **focusOut**(`event`: any): *Promise‹void›*

*Defined in [ovl/src/global/globals.ts:103](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *Promise‹void›*

___

### `Const` getDateValue

▸ **getDateValue**(`value`: string, `format?`: [FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)): *any*

*Defined in [ovl/src/global/globals.ts:27](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |
`format?` | [FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat) |

**Returns:** *any*

___

### `Const` getDecimalValue

▸ **getDecimalValue**(`value`: number, `format?`: [FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)): *string*

*Defined in [ovl/src/global/globals.ts:51](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |
`format?` | [FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat) |

**Returns:** *string*

___

### `Const` logout

▸ **logout**(): *Promise‹void›*

*Defined in [ovl/src/global/globals.ts:188](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L188)*

**Returns:** *Promise‹void›*

___

### `Const` resolvePath

▸ **resolvePath**(`object`: any, `path`: any, `defaultValue?`: any): *any*

*Defined in [ovl/src/global/globals.ts:376](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L376)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |
`path` | any |
`defaultValue?` | any |

**Returns:** *any*

___

### `Const` saveState

▸ **saveState**(`force`: boolean, `reason`: string): *Promise‹void›*

*Defined in [ovl/src/global/globals.ts:157](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | boolean |
`reason` | string |

**Returns:** *Promise‹void›*

___

### `Const` stateCleaner

▸ **stateCleaner**(`state`: typeof state, `newObj`: any, `parentKey`: string): *void*

*Defined in [ovl/src/global/globals.ts:217](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | typeof state |
`newObj` | any |
`parentKey` | string |

**Returns:** *void*

___

### `Const` uuidv4

▸ **uuidv4**(): *string*

*Defined in [ovl/src/global/globals.ts:15](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L15)*

**Returns:** *string*

___

### `Const` visibilityChange

▸ **visibilityChange**(`event`: any): *Promise‹void›*

*Defined in [ovl/src/global/globals.ts:129](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *Promise‹void›*

## Object literals

### `Let` api

### ▪ **api**: *object*

*Defined in [ovl/src/global/globals.ts:9](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L9)*

###  url

• **url**: *string* = ""

*Defined in [ovl/src/global/globals.ts:9](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L9)*

___

### `Let` translations

### ▪ **translations**: *object*

*Defined in [ovl/src/global/globals.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L10)*

###  t

• **t**: *object*

*Defined in [ovl/src/global/globals.ts:10](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/globals.ts#L10)*

#### Type declaration:
