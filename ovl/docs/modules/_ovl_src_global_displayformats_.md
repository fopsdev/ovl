[kaltag-kundenportal](../README.md) › [Globals](../globals.md) › ["ovl/src/global/displayFormats"](_ovl_src_global_displayformats_.md)

# Module: "ovl/src/global/displayFormats"

## Index

### Object literals

* [displayFormats](_ovl_src_global_displayformats_.md#let-displayformats)

## Object literals

### `Let` displayFormats

### ▪ **displayFormats**: *object*

*Defined in [ovl/src/global/displayFormats.ts:1](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/displayFormats.ts#L1)*

▪ **date**: *object*

*Defined in [ovl/src/global/displayFormats.ts:12](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/displayFormats.ts#L12)*

* **_2DigitsYear**: *DateTimeFormat* = new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    })

* **default**: *DateTimeFormat* = new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })

* **defaultTimestamp**: *DateTimeFormat* = new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    })

▪ **decimal**: *object*

*Defined in [ovl/src/global/displayFormats.ts:2](https://github.com/fopsdev/ovl/blob/f9b6194/ovl/src/global/displayFormats.ts#L2)*

* **_4Digits**: *NumberFormat* = new Intl.NumberFormat("de-ch", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    })

* **default**: *NumberFormat* = new Intl.NumberFormat("de-ch", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
