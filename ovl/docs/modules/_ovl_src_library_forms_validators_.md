[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/validators"](_ovl_src_library_forms_validators_.md)

# Module: "ovl/src/library/forms/validators"

## Index

### Functions

* [Email](_ovl_src_library_forms_validators_.md#const-email)
* [Mandatory](_ovl_src_library_forms_validators_.md#const-mandatory)
* [MinLength](_ovl_src_library_forms_validators_.md#const-minlength)
* [MinLengthOrEmpty](_ovl_src_library_forms_validators_.md#const-minlengthorempty)
* [validateEmail](_ovl_src_library_forms_validators_.md#validateemail)

## Functions

### `Const` Email

▸ **Email**(`displayFieldName`: string, `val`: String, `res`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

Defined in ovl/src/library/forms/validators.ts:52

**Parameters:**

Name | Type |
------ | ------ |
`displayFieldName` | string |
`val` | String |
`res` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` Mandatory

▸ **Mandatory**(`displayFieldName`: string, `val`: String, `res`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

Defined in ovl/src/library/forms/validators.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`displayFieldName` | string |
`val` | String |
`res` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` MinLength

▸ **MinLength**(`displayFieldName`: string, `val`: String, `minLength`: number, `res`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

Defined in ovl/src/library/forms/validators.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`displayFieldName` | string |
`val` | String |
`minLength` | number |
`res` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

### `Const` MinLengthOrEmpty

▸ **MinLengthOrEmpty**(`displayFieldName`: string, `val`: String, `minLength`: number, `res`: [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult)): *void*

Defined in ovl/src/library/forms/validators.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`displayFieldName` | string |
`val` | String |
`minLength` | number |
`res` | [ValidateFieldResult](_ovl_src_library_forms_actions_.md#validatefieldresult) |

**Returns:** *void*

___

###  validateEmail

▸ **validateEmail**(`email`: any): *boolean*

Defined in ovl/src/library/forms/validators.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`email` | any |

**Returns:** *boolean*
