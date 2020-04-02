[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/global/actions"](_test_src_global_actions_.md)

# Module: "test/src/global/actions"

## Index

### Functions

* [CustomInit](_test_src_global_actions_.md#const-custominit)
* [ForgotPw](_test_src_global_actions_.md#const-forgotpw)
* [HandleAdditionalLanguageResult](_test_src_global_actions_.md#const-handleadditionallanguageresult)
* [HandleRefresh](_test_src_global_actions_.md#const-handlerefresh)
* [Login](_test_src_global_actions_.md#const-login)
* [LoginValidateField](_test_src_global_actions_.md#const-loginvalidatefield)
* [TogglePDFPopup](_test_src_global_actions_.md#const-togglepdfpopup)

## Functions

### `Const` CustomInit

▸ **CustomInit**(`__namedParameters`: object, `_`: void): *Promise‹void›*

*Defined in [test/src/global/actions.ts:192](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L192)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`state` | object |

▪ **_**: *void*

**Returns:** *Promise‹void›*

___

### `Const` ForgotPw

▸ **ForgotPw**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [test/src/global/actions.ts:111](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L111)*

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
`changedFnName` | string |
`dirty` | boolean |
`fields` | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
`formId` | string |
`formType` | [FormType](_ovl_src_library_forms_actions_.md#formtype) |
`initFields` | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
`namespace` | string |
`schema` | object |
`valid` | boolean |
`validationFnName` | string |

**Returns:** *Promise‹void›*

___

### `Const` HandleAdditionalLanguageResult

▸ **HandleAdditionalLanguageResult**(`__namedParameters`: object, `value`: any): *Promise‹void›*

*Defined in [test/src/global/actions.ts:128](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L128)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`state` | object |

▪ **value**: *any*

**Returns:** *Promise‹void›*

___

### `Const` HandleRefresh

▸ **HandleRefresh**(`__namedParameters`: object): *Promise‹void›*

*Defined in [test/src/global/actions.ts:152](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L152)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |
`effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
`state` | object |

**Returns:** *Promise‹void›*

___

### `Const` Login

▸ **Login**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [test/src/global/actions.ts:24](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L24)*

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
`changedFnName` | string |
`dirty` | boolean |
`fields` | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
`formId` | string |
`formType` | [FormType](_ovl_src_library_forms_actions_.md#formtype) |
`initFields` | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
`namespace` | string |
`schema` | object |
`valid` | boolean |
`validationFnName` | string |

**Returns:** *Promise‹void›*

___

### `Const` LoginValidateField

▸ **LoginValidateField**(`_`: object, `value`: object): *void*

*Defined in [test/src/global/actions.ts:97](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L97)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **value**: *object*

Name | Type |
------ | ------ |
`fieldId` | string |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`newVal` | string |
`oldVal` | string |
`validationResult` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` TogglePDFPopup

▸ **TogglePDFPopup**(`_`: object, `value`: object): *void*

*Defined in [test/src/global/actions.ts:144](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/global/actions.ts#L144)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **value**: *object*

Name | Type |
------ | ------ |
`key` | string |
`obj` | [PopupState](_test_src_components_filelist_filelist_.md#popupstate) |

**Returns:** *void*
