[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/onInitialize"](_ovl_src_oninitialize_.md)

# Module: "ovl/src/onInitialize"

## Index

### Variables

* [isos](_ovl_src_oninitialize_.md#let-isos)
* [timer](_ovl_src_oninitialize_.md#let-timer)

### Functions

* [onInitialize](_ovl_src_oninitialize_.md#const-oninitialize)

## Variables

### `Let` isos

• **isos**: *boolean* = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

*Defined in [ovl/src/onInitialize.ts:7](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/onInitialize.ts#L7)*

___

### `Let` timer

• **timer**: *any*

*Defined in [ovl/src/onInitialize.ts:6](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/onInitialize.ts#L6)*

## Functions

### `Const` onInitialize

▸ **onInitialize**(`_`: object, `overmind`: Overmind‹[Config](_ovl_src_index_.md#config)‹››): *Promise‹void›*

*Defined in [ovl/src/onInitialize.ts:8](https://github.com/fopsdev/ovl/blob/d5eec59/ovl/src/onInitialize.ts#L8)*

**Parameters:**

▪ **_**: *object*

Name | Type |
------ | ------ |
`actions` | ResolveActions‹ThisConfig["actions"]› |
`effects` | ThisConfig["effects"] |
`revertable` | function |
`state` | ResolveState‹ThisConfig["state"]› |

▪ **overmind**: *Overmind‹[Config](_ovl_src_index_.md#config)‹››*

**Returns:** *Promise‹void›*
