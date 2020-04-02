[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/library/forms/Controls/ListControl"](_ovl_src_library_forms_controls_listcontrol_.md)

# Module: "ovl/src/library/forms/Controls/ListControl"

## Index

### Classes

* [OvlListControl](../classes/_ovl_src_library_forms_controls_listcontrol_.ovllistcontrol.md)

### Type aliases

* [ListControlState](_ovl_src_library_forms_controls_listcontrol_.md#listcontrolstate)
* [ListFunction](_ovl_src_library_forms_controls_listcontrol_.md#listfunction)
* [ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)

## Type aliases

###  ListControlState

Ƭ **ListControlState**: *object*

Defined in ovl/src/library/forms/Controls/ListControl.ts:33

#### Type declaration:

* **align**: *[ColumnAlign](_ovl_src_library_table_table_.md#columnalign)*

* **field**: *[Field](_ovl_src_library_forms_actions_.md#field)*

* **fieldId**: *string*

* **formState**: *[FormState](_ovl_src_library_forms_actions_.md#formstate)*

* **label**: *string*

* **list**: *[ListState](_ovl_src_library_forms_controls_listcontrol_.md#liststate)*

* **namespace**: *string*

___

###  ListFunction

Ƭ **ListFunction**: *function*

Defined in ovl/src/library/forms/Controls/ListControl.ts:16

#### Type declaration:

▸ (`row`: object, `state`: typeof state, `actions`: typeof actions, `effects`: typeof effects): *any*

**Parameters:**

Name | Type |
------ | ------ |
`row` | object |
`state` | typeof state |
`actions` | typeof actions |
`effects` | typeof effects |

___

###  ListState

Ƭ **ListState**: *object*

Defined in ovl/src/library/forms/Controls/ListControl.ts:23

#### Type declaration:

* **acceptEmpty**? : *boolean*

* **acceptOnlyListValues**? : *boolean*

* **displayField**: *string*

* **displayValueField**? : *boolean*

* **listFn**? : *[ListFunction](_ovl_src_library_forms_controls_listcontrol_.md#listfunction)*

* **serverEndpoint**? : *string*

* **valueField**: *string*
