let mostPreferedLanguage = globalThis.navigator.languages[0]
if (
  mostPreferedLanguage === "de" &&
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1
) {
  if ((1.1).toString().indexOf(".") > -1) {
    mostPreferedLanguage = "de-ch"
  }
}
export let displayFormats = {
  decimal: {
    default: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    _4Digits: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    })
  },
  date: {
    default: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    _2DigitsYear: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    }),
    defaultTimestamp: new Intl.DateTimeFormat(mostPreferedLanguage, {
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
