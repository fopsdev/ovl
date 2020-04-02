[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/Forms/helper"](_ovl_src_library_forms_helper_.md)

# Module: "ovl/src/library/Forms/helper"

## Index

### Functions

* [ValidationAddError](_ovl_src_library_forms_helper_.md#const-validationadderror)
* [ValidationRemoveError](_ovl_src_library_forms_helper_.md#const-validationremoveerror)
* [ValidationSetCurrentError](_ovl_src_library_forms_helper_.md#const-validationsetcurrenterror)
* [getFormFields](_ovl_src_library_forms_helper_.md#const-getformfields)

## Functions

### `Const` ValidationAddError

▸ **ValidationAddError**(`validatorId`: string, `msg`: string, `val`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

*Defined in [ovl/src/library/Forms/helper.ts:36](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Forms/helper.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`validatorId` | string |
`msg` | string |
`val` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` ValidationRemoveError

▸ **ValidationRemoveError**(`validatorId`: string, `val`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

*Defined in [ovl/src/library/Forms/helper.ts:47](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Forms/helper.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`validatorId` | string |
`val` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` ValidationSetCurrentError

▸ **ValidationSetCurrentError**(`val`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

*Defined in [ovl/src/library/Forms/helper.ts:55](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Forms/helper.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` getFormFields

▸ **getFormFields**(`schema`: object, `formFields`: object, `instanceId`: String): *[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)*

*Defined in [ovl/src/library/Forms/helper.ts:4](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/library/Forms/helper.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | object |
`formFields` | object |
`instanceId` | String |

**Returns:** *[FieldValueMap](_ovl_src_library_forms_actions_.md#fieldvaluemap)*
