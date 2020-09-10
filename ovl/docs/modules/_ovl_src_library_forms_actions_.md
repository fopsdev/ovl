[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/actions"](_ovl_src_library_forms_actions_.md)

# Module: "ovl/src/library/forms/actions"

## Index

### Type aliases

- [ChangeField](_ovl_src_library_forms_actions_.md#changefield)
- [Field](_ovl_src_library_forms_actions_.md#field)
- [FieldChanged](_ovl_src_library_forms_actions_.md#fieldchanged)
- [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)
- [FormState](_ovl_src_library_forms_actions_.md#formstate)
- [FormStatePerInstance](_ovl_src_library_forms_actions_.md#formstateperinstance)
- [FormType](_ovl_src_library_forms_actions_.md#formtype)
- [FormsState](_ovl_src_library_forms_actions_.md#formsstate)
- [InitForm](_ovl_src_library_forms_actions_.md#initform)
- [TouchField](_ovl_src_library_forms_actions_.md#touchfield)
- [ValidateField](_ovl_src_library_forms_actions_.md#validatefield)
- [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)
- [ValidateFieldResultMap](_ovl_src_library_forms_actions_.md#validatefieldresultmap)

### Functions

- [ChangeField](_ovl_src_library_forms_actions_.md#const-changefield)
- [GetFormValidationErrors](_ovl_src_library_forms_actions_.md#const-getformvalidationerrors)
- [InitForm](_ovl_src_library_forms_actions_.md#const-initform)
- [ResetForm](_ovl_src_library_forms_actions_.md#const-resetform)
- [ResetFormAfterNavigation](_ovl_src_library_forms_actions_.md#const-resetformafternavigation)
- [SetField](_ovl_src_library_forms_actions_.md#const-setfield)
- [SetFormUndirty](_ovl_src_library_forms_actions_.md#const-setformundirty)
- [SetFormValid](_ovl_src_library_forms_actions_.md#const-setformvalid)
- [TouchField](_ovl_src_library_forms_actions_.md#const-touchfield)
- [ValidateDataType](_ovl_src_library_forms_actions_.md#const-validatedatatype)
- [ValidateForm](_ovl_src_library_forms_actions_.md#const-validateform)
- [ValidateList](_ovl_src_library_forms_actions_.md#const-validatelist)
- [ValidateSchema](_ovl_src_library_forms_actions_.md#const-validateschema)

## Type aliases

### ChangeField

Ƭ **ChangeField**: _object_

Defined in ovl/src/library/forms/actions.ts:540

#### Type declaration:

- **fieldId**: _string_

- **formState**: _[FormState](_ovl_src_library_forms_actions_.md#formstate)_

- **isInit**? : _boolean_

- **value**: _any_

---

### Field

Ƭ **Field**: _object_

Defined in ovl/src/library/forms/actions.ts:22

#### Type declaration:

- **autoCorrectedValue**: _string_

- **convertedValue**: _any_

- **datafield**: _string_

- **dirty**: _boolean_

- **format**: _[FieldFormat](_ovl_src_library_forms_ovlformelement_.md#fieldformat)_

- **id**: _string_

- **list**? : _[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)_

- **type**: _[DataType](_ovl_src_library_forms_ovlformelement_.md#datatype)_

- **validationResult**: _[ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)_

- **value**: _string_

- **watched**: _boolean_

---

### FieldChanged

Ƭ **FieldChanged**: _object_

Defined in ovl/src/library/forms/actions.ts:547

#### Type declaration:

- **fieldId**: _string_

- **formState**: _[FormState](_ovl_src_library_forms_actions_.md#formstate)_

- **newConvertedVal**: _string_

- **oldConvertedVal**: _string_

- **row**(): _object_

---

### FieldValueMap

Ƭ **FieldValueMap**: _object_

Defined in ovl/src/library/forms/actions.ts:36

#### Type declaration:

- \[ **key**: _string_\]: [Field](_ovl_src_library_forms_actions_.md#field)

---

### FormState

Ƭ **FormState**: _object_

Defined in ovl/src/library/forms/actions.ts:55

#### Type declaration:

- **changedFnName**: _string_

- **dirty**: _boolean_

- **fields**: _[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)_

- **formId**: _string_

- **formType**: _[FormType](_ovl_src_library_forms_actions_.md#formtype)_

- **initFields**: _[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)_

- **namespace**: _string_

- **schema**(): _object_

- **valid**: _boolean_

- **validationFnName**: _string_

---

### FormStatePerInstance

Ƭ **FormStatePerInstance**: _object_

Defined in ovl/src/library/forms/actions.ts:67

#### Type declaration:

- \[ **key**: _string_\]: [FormState](_ovl_src_library_forms_actions_.md#formstate)

---

### FormType

Ƭ **FormType**: _"TableRowEdit" | "Feedback" | "Settings" | "Login" | "OvlLanguage" | "MobileTimeEntry"_

Defined in ovl/src/library/forms/actions.ts:14

---

### FormsState

Ƭ **FormsState**: _object_

Defined in ovl/src/library/forms/actions.ts:83

#### Type declaration:

---

### InitForm

Ƭ **InitForm**: _object_

Defined in ovl/src/library/forms/actions.ts:72

#### Type declaration:

- **changedFnName**? : _string_

- **fields**(): _object_

- **forceOverwrite**? : _boolean_

- **formType**: _[FormType](_ovl_src_library_forms_actions_.md#formtype)_

- **instanceId**: _string_

- **namespace**? : _string_

- **schema**(): _object_

- **validationFnName**? : _string_

---

### TouchField

Ƭ **TouchField**: _object_

Defined in ovl/src/library/forms/actions.ts:555

#### Type declaration:

- **fieldId**: _string_

- **formState**: _[FormState](_ovl_src_library_forms_actions_.md#formstate)_

---

### ValidateField

Ƭ **ValidateField**: _object_

Defined in ovl/src/library/forms/actions.ts:532

#### Type declaration:

- **fieldId**: _string_

- **formState**: _[FormState](_ovl_src_library_forms_actions_.md#formstate)_

- **newVal**: _string_

- **oldVal**: _string_

- **validationResult**: _[ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)_

---

### ValidateFieldResult

Ƭ **ValidateFieldResult**: _object_

Defined in ovl/src/library/forms/actions.ts:43

#### Type declaration:

- **valid**: _boolean_

- **validationMsg**: _string_

- **validations**(): _object_

---

### ValidateFieldResultMap

Ƭ **ValidateFieldResultMap**: _object_

Defined in ovl/src/library/forms/actions.ts:38

#### Type declaration:

- **valid**: _boolean_

- **validationMsg**: _string_

## Functions

### `Const` ChangeField

▸ **ChangeField**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:572

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `fieldId`   | string                                                    |
| `formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
| `isInit?`   | boolean                                                   |
| `value`     | any                                                       |

**Returns:** _void_

---

### `Const` GetFormValidationErrors

▸ **GetFormValidationErrors**(`formState`: [FormState](_ovl_src_library_forms_actions_.md#formstate)): _string[]_

Defined in ovl/src/library/forms/actions.ts:673

**Parameters:**

| Name        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |

**Returns:** _string[]_

---

### `Const` InitForm

▸ **InitForm**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:421

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name                | Type                                                    |
| ------------------- | ------------------------------------------------------- |
| `changedFnName?`    | string                                                  |
| `fields`            | object                                                  |
| `forceOverwrite?`   | boolean                                                 |
| `formType`          | [FormType](_ovl_src_library_forms_actions_.md#formtype) |
| `instanceId`        | string                                                  |
| `namespace?`        | string                                                  |
| `schema?`           | object                                                  |
| `validationFnName?` | string                                                  |

**Returns:** _void_

---

### `Const` ResetForm

▸ **ResetForm**(`_`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:85

**Parameters:**

▪ **\_**: _object_

| Name         | Type                                  |
| ------------ | ------------------------------------- |
| `actions`    | ResolveActions‹ThisConfig["actions"]› |
| `effects`    | ThisConfig["effects"]                 |
| `revertable` | function                              |
| `state`      | ResolveState‹ThisConfig["state"]›     |

▪ **value**: _object_

| Name               | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `changedFnName`    | string                                                            |
| `dirty`            | boolean                                                           |
| `fields`           | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `formId`           | string                                                            |
| `formType`         | [FormType](_ovl_src_library_forms_actions_.md#formtype)           |
| `initFields`       | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `namespace`        | string                                                            |
| `schema`           | object                                                            |
| `valid`            | boolean                                                           |
| `validationFnName` | string                                                            |

**Returns:** _void_

---

### `Const` ResetFormAfterNavigation

▸ **ResetFormAfterNavigation**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:99

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name    | Type   |
| ------- | ------ |
| `state` | object |

▪ **value**: _object_

| Name               | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `changedFnName`    | string                                                            |
| `dirty`            | boolean                                                           |
| `fields`           | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `formId`           | string                                                            |
| `formType`         | [FormType](_ovl_src_library_forms_actions_.md#formtype)           |
| `initFields`       | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `namespace`        | string                                                            |
| `schema`           | object                                                            |
| `valid`            | boolean                                                           |
| `validationFnName` | string                                                            |

**Returns:** _void_

---

### `Const` SetField

▸ **SetField**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:564

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type   |
| --------- | ------ |
| `actions` | object |

▪ **value**: _object_

| Name        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `fieldId`   | string                                                    |
| `formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |
| `isInit?`   | boolean                                                   |
| `value`     | any                                                       |

**Returns:** _void_

---

### `Const` SetFormUndirty

▸ **SetFormUndirty**(`_`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:91

**Parameters:**

▪ **\_**: _object_

| Name         | Type                                  |
| ------------ | ------------------------------------- |
| `actions`    | ResolveActions‹ThisConfig["actions"]› |
| `effects`    | ThisConfig["effects"]                 |
| `revertable` | function                              |
| `state`      | ResolveState‹ThisConfig["state"]›     |

▪ **value**: _object_

| Name               | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `changedFnName`    | string                                                            |
| `dirty`            | boolean                                                           |
| `fields`           | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `formId`           | string                                                            |
| `formType`         | [FormType](_ovl_src_library_forms_actions_.md#formtype)           |
| `initFields`       | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `namespace`        | string                                                            |
| `schema`           | object                                                            |
| `valid`            | boolean                                                           |
| `validationFnName` | string                                                            |

**Returns:** _void_

---

### `Const` SetFormValid

▸ **SetFormValid**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:667

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type   |
| --------- | ------ |
| `actions` | object |

▪ **value**: _object_

| Name               | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `changedFnName`    | string                                                            |
| `dirty`            | boolean                                                           |
| `fields`           | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `formId`           | string                                                            |
| `formType`         | [FormType](_ovl_src_library_forms_actions_.md#formtype)           |
| `initFields`       | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `namespace`        | string                                                            |
| `schema`           | object                                                            |
| `valid`            | boolean                                                           |
| `validationFnName` | string                                                            |

**Returns:** _void_

---

### `Const` TouchField

▸ **TouchField**(`_`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:560

**Parameters:**

▪ **\_**: _object_

| Name         | Type                                  |
| ------------ | ------------------------------------- |
| `actions`    | ResolveActions‹ThisConfig["actions"]› |
| `effects`    | ThisConfig["effects"]                 |
| `revertable` | function                              |
| `state`      | ResolveState‹ThisConfig["state"]›     |

▪ **value**: _object_

| Name        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `fieldId`   | string                                                    |
| `formState` | [FormState](_ovl_src_library_forms_actions_.md#formstate) |

**Returns:** _void_

---

### `Const` ValidateDataType

▸ **ValidateDataType**(`_`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:107

**Parameters:**

▪ **\_**: _object_

| Name         | Type                                  |
| ------------ | ------------------------------------- |
| `actions`    | ResolveActions‹ThisConfig["actions"]› |
| `effects`    | ThisConfig["effects"]                 |
| `revertable` | function                              |
| `state`      | ResolveState‹ThisConfig["state"]›     |

▪ **value**: _object_

| Name               | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| `fieldId`          | string                                                                        |
| `formState`        | [FormState](_ovl_src_library_forms_actions_.md#formstate)                     |
| `newVal`           | string                                                                        |
| `oldVal`           | string                                                                        |
| `validationResult` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** _void_

---

### `Const` ValidateForm

▸ **ValidateForm**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:334

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name               | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `changedFnName`    | string                                                            |
| `dirty`            | boolean                                                           |
| `fields`           | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `formId`           | string                                                            |
| `formType`         | [FormType](_ovl_src_library_forms_actions_.md#formtype)           |
| `initFields`       | [FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap) |
| `namespace`        | string                                                            |
| `schema`           | object                                                            |
| `valid`            | boolean                                                           |
| `validationFnName` | string                                                            |

**Returns:** _void_

---

### `Const` ValidateList

▸ **ValidateList**(`__namedParameters`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:291

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                      |
| --------- | ----------------------------------------- |
| `actions` | object                                    |
| `effects` | ["ovl/src/effects"](_ovl_src_effects_.md) |
| `state`   | object                                    |

▪ **value**: _object_

| Name               | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| `fieldId`          | string                                                                        |
| `formState`        | [FormState](_ovl_src_library_forms_actions_.md#formstate)                     |
| `newVal`           | string                                                                        |
| `oldVal`           | string                                                                        |
| `validationResult` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** _void_

---

### `Const` ValidateSchema

▸ **ValidateSchema**(`_`: object, `value`: object): _void_

Defined in ovl/src/library/forms/actions.ts:258

**Parameters:**

▪ **\_**: _object_

| Name         | Type                                  |
| ------------ | ------------------------------------- |
| `actions`    | ResolveActions‹ThisConfig["actions"]› |
| `effects`    | ThisConfig["effects"]                 |
| `revertable` | function                              |
| `state`      | ResolveState‹ThisConfig["state"]›     |

▪ **value**: _object_

| Name               | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| `fieldId`          | string                                                                        |
| `formState`        | [FormState](_ovl_src_library_forms_actions_.md#formstate)                     |
| `newVal`           | string                                                                        |
| `oldVal`           | string                                                                        |
| `validationResult` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** _void_
