let mostPreferedLanguage = globalThis.navigator.languages[0]
if (mostPreferedLanguage === "de") {
  if ((1.1).toString().indexOf(".") > -1) {
    mostPreferedLanguage = "de-ch"
  }
}
if (mostPreferedLanguage.indexOf("-") < 0) {
  mostPreferedLanguage = mostPreferedLanguage + "-" + mostPreferedLanguage
}
export let displayFormats = {
  mostPreferedLanguage,
  decimal: {
    default: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    _4Digits: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }),
    _3Digits: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }),
    _0Digits: new Intl.NumberFormat(mostPreferedLanguage, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
  },
  date: {
    default: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    _2DigitsYear: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    _4DigitsYear: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    defaultTimestamp: new Intl.DateTimeFormat(mostPreferedLanguage, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }),
  },
}
