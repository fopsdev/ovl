export let displayFormats = {
  decimal: {
    default: new Intl.NumberFormat("de-ch", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    _4Digits: new Intl.NumberFormat("de-ch", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    })
  },
  date: {
    default: new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    _2DigitsYear: new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    }),
    defaultTimestamp: new Intl.DateTimeFormat("de-ch", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    })
  }
}
