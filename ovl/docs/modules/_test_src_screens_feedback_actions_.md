[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/screens/Feedback/actions"](_test_src_screens_feedback_actions_.md)

# Module: "test/src/screens/Feedback/actions"

## Index

### Functions

* [FeedbackValidateField](_test_src_screens_feedback_actions_.md#const-feedbackvalidatefield)
* [SaveFeedback](_test_src_screens_feedback_actions_.md#const-savefeedback)

## Functions

### `Const` FeedbackValidateField

▸ **FeedbackValidateField**(`_`: object, `value`: object): *void*

*Defined in [test/src/screens/Feedback/actions.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Feedback/actions.ts#L12)*

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

### `Const` SaveFeedback

▸ **SaveFeedback**(`__namedParameters`: object, `value`: object): *Promise‹void›*

*Defined in [test/src/screens/Feedback/actions.ts:24](https://github.com/fopsdev/ovl/blob/f9b6194/test/src/screens/Feedback/actions.ts#L24)*

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
