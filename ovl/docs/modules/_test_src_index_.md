[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["test/src/index"](_test_src_index_.md)

# Module: "test/src/index"

## Index

### Variables

* [config](_test_src_index_.md#const-config)
* [overmind](_test_src_index_.md#const-overmind)

### Object literals

* [appOvermindConfig](_test_src_index_.md#let-appovermindconfig)

## Variables

### `Const` config

• **config**: *object & object* = merge(baseOvermindConfig, appOvermindConfig)

*Defined in [test/src/index.ts:15](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/index.ts#L15)*

___

### `Const` overmind

• **overmind**: *Overmind‹object & object›* = createOvermind(config, {
  devtools: true,
  logProxies: true,
  delimiter: " "
})

*Defined in [test/src/index.ts:17](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/index.ts#L17)*

## Object literals

### `Let` appOvermindConfig

### ▪ **appOvermindConfig**: *object*

*Defined in [test/src/index.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/index.ts#L13)*

###  actions

• **actions**: *["test/src/actions"](_test_src_actions_.md)*

*Defined in [test/src/index.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/index.ts#L13)*

###  state

• **state**: *["test/src/state"](_test_src_state_.md)*

*Defined in [test/src/index.ts:13](https://github.com/fopsdev/ovl/blob/d5eec59/test/src/index.ts#L13)*
