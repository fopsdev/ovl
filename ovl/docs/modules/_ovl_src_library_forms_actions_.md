[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/actions"](_ovl_src_library_forms_actions_.md)

# Module: "ovl/src/library/forms/actions"

## Index

### Type aliases

* [ChangeField](_ovl_src_library_forms_actions_.md#changefield)
* [Field](_ovl_src_library_forms_actions_.md#field)
* [FieldChanged](_ovl_src_library_forms_actions_.md#fieldchanged)
* [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)
* [FormState](_ovl_src_library_forms_actions_.md#formstate)
* [FormStatePerInstance](_ovl_src_library_forms_actions_.md#formstateperinstance)
* [FormType](_ovl_src_library_forms_actions_.md#formtype)
* [FormsState](_ovl_src_library_forms_actions_.md#formsstate)
* [InitForm](_ovl_src_library_forms_actions_.md#initform)
* [TouchField](_ovl_src_library_forms_actions_.md#touchfield)
* [ValidateField](_ovl_src_library_forms_actions_.md#validatefield)
* [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)
* [ValidateFieldResultMap](_ovl_src_library_forms_actions_.md#validatefieldresultmap)

### Functions

* [ChangeField](_ovl_src_library_forms_actions_.md#const-changefield)
* [GetFormValidationErrors](_ovl_src_library_forms_actions_.md#const-getformvalidationerrors)
* [InitForm](_ovl_src_library_forms_actions_.md#const-initform)
* [ResetForm](_ovl_src_library_forms_actions_.md#const-resetform)
* [ResetFormAfterNavigation](_ovl_src_library_forms_actions_.md#const-resetformafternavigation)
* [SetField](_ovl_src_library_forms_actions_.md#const-setfield)
* [SetFormUndirty](_ovl_src_library_forms_actions_.md#const-setformundirty)
* [SetFormValid](_ovl_src_library_forms_actions_.md#const-setformvalid)
* [TouchField](_ovl_src_library_forms_actions_.md#const-touchfield)
* [ValidateDataType](_ovl_src_library_forms_actions_.md#const-validatedatatype)
* [ValidateForm](_ovl_src_library_forms_actions_.md#const-validateform)
* [ValidateList](_ovl_src_library_forms_actions_.md#const-validatelist)
* [ValidateSchema](_ovl_src_library_forms_actions_.md#const-validateschema)

## Type aliases

###  ChangeField

Ƭ **ChangeField**: *object*

Defined in ovl/src/library/forms/actions.ts:540

#### Type declaration:

* **fieldId**: *string*

* **formState**: *[FormState](_ovl_src_library_forms_actions_.md#formstate)*

* **isInit**? : *boolean*

* **value**: *any*

___

###  Field

Ƭ **Field**: *object*

Defined in ovl/src/library/forms/actions.ts:22

#### Type declaration:

* **autoCorrectedValue**: *string*

* **convertedValue**: *any*

* **datafield**: *string*

* **dirty**: *boolean*

* **format**: *[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)*

* **id**: *string*

* **list**? : *[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)*

* **type**: *[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)*

* **validationResult**: *[ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)*

* **value**: *string*

* **watched**: *boolean*

___

###  FieldChanged

Ƭ **FieldChanged**: *object*

Defined in ovl/src/library/forms/actions.ts:547

#### Type declaration:

* **fieldId**: *string*

* **formState**: *[FormState](_ovl_src_library_forms_actions_.md#formstate)*

* **newConvertedVal**: *string*

* **oldConvertedVal**: *string*

* **row**(): *object*

___

###  FieldValueMap

Ƭ **FieldValueMap**: *object*

Defined in ovl/src/library/forms/actions.ts:36

#### Type declaration:

* \[ **key**: *string*\]: [Field](_ovl_src_library_forms_actions_.md#field)

___

###  FormState

Ƭ **FormState**: *object*

Defined in ovl/src/library/forms/actions.ts:55

#### Type declaration:

* **changedFnName**: *string*

* **dirty**: *boolean*

* **fields**: *[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)*

* **formId**: *string*

* **formType**: *[FormType](_ovl_src_library_forms_actions_.md#formtype)*

* **initFields**: *[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)*

* **namespace**: *string*

* **schema**(): *object*

* **valid**: *boolean*

* **validationFnName**: *string*

___

###  FormStatePerInstance

Ƭ **FormStatePerInstance**: *object*

Defined in ovl/src/library/forms/actions.ts:67

#### Type declaration:

* \[ **key**: *string*\]: [FormState](_ovl_src_library_forms_actions_.md#formstate)

___

###  FormType

Ƭ **FormType**: *"TableRowEdit" | "Feedback" | "Settings" | "Login" | "Language" | "MobileTimeEntry"*

Defined in ovl/src/library/forms/actions.ts:14

___

###  FormsState

Ƭ **FormsState**: *object*

Defined in ovl/src/library/forms/actions.ts:83

#### Type declaration:

___

###  InitForm

Ƭ **InitForm**: *object*

Defined in ovl/src/library/forms/actions.ts:72

#### Type declaration:

* **changedFnName**? : *string*

* **fields**(): *object*

* **forceOverwrite**? : *boolean*

* **formType**: *[FormType](_ovl_src_library_forms_actions_.md#formtype)*

* **instanceId**: *string*

* **namespace**? : *string*

* **schema**(): *object*

* **validationFnName**? : *string*

___

###  TouchField

Ƭ **TouchField**: *object*

Defined in ovl/src/library/forms/actions.ts:555

#### Type declaration:

* **fieldId**: *string*

* **formState**: *[FormState](_ovl_src_library_forms_actions_.md#formstate)*

___

###  ValidateField

Ƭ **ValidateField**: *object*

Defined in ovl/src/library/forms/actions.ts:532

#### Type declaration:

* **fieldId**: *string*

* **formState**: *[FormState](_ovl_src_library_forms_actions_.md#formstate)*

* **newVal**: *string*

* **oldVal**: *string*

* **validationResult**: *[ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)*

___

###  ValidateFieldResult

Ƭ **ValidateFieldResult**: *object*

Defined in ovl/src/library/forms/actions.ts:43

#### Type declaration:

* **valid**: *boolean*

* **validationMsg**: *string*

* **validations**(): *object*

___

###  ValidateFieldResultMap

Ƭ **ValidateFieldResultMap**: *object*

Defined in ovl/src/library/forms/actions.ts:38

#### Type declaration:

* **valid**: *boolean*

* **validationMsg**: *string*

## Functions

### `Const` ChangeField

▸ **ChangeField**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:572

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
`fieldId` | string |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`isInit?` | boolean |
`value` | any |

**Returns:** *void*

___

### `Const` GetFormValidationErrors

▸ **GetFormValidationErrors**(`formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate)): *string[]*

Defined in ovl/src/library/forms/actions.ts:673

**Parameters:**

Name | Type |
------ | ------ |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |

**Returns:** *string[]*

___

### `Const` InitForm

▸ **InitForm**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:421

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
`changedFnName?` | string |
`fields` | object |
`forceOverwrite?` | boolean |
`formType` | [FormType](_ovl_src_library_forms_actions_.md#formtype) |
`instanceId` | string |
`namespace?` | string |
`schema?` | object |
`validationFnName?` | string |

**Returns:** *void*

___

### `Const` ResetForm

▸ **ResetForm**(`_`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:85

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

**Returns:** *void*

___

### `Const` ResetFormAfterNavigation

▸ **ResetFormAfterNavigation**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:99

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
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

**Returns:** *void*

___

### `Const` SetField

▸ **SetField**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:564

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

▪ **value**: *object*

Name | Type |
------ | ------ |
`fieldId` | string |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`isInit?` | boolean |
`value` | any |

**Returns:** *void*

___

### `Const` SetFormUndirty

▸ **SetFormUndirty**(`_`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:91

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

**Returns:** *void*

___

### `Const` SetFormValid

▸ **SetFormValid**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:667

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`actions` | object |

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

**Returns:** *void*

___

### `Const` TouchField

▸ **TouchField**(`_`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:560

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

**Returns:** *void*

___

### `Const` ValidateDataType

▸ **ValidateDataType**(`_`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:107

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

### `Const` ValidateForm

▸ **ValidateForm**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:334

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

**Returns:** *void*

___

### `Const` ValidateList

▸ **ValidateList**(`__namedParameters`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:291

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
`fieldId` | string |
`formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
`newVal` | string |
`oldVal` | string |
`validationResult` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` ValidateSchema

▸ **ValidateSchema**(`_`: object, `value`: object): *void*

Defined in ovl/src/library/forms/actions.ts:258

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
