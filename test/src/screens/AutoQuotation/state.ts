import { OvlTableDef } from "../../../../../ovl/ovl/src/library/Table/Table"

export type AutoQuotation = {
  id: string
  width: number
  height: number
  skl: string
  sumTargetLen: number
  targets: number
  smallest: number
  biggest: number
  sources: string
  cutoff: number
  sawcut: number
  max_vs: number
  res_sumSourceLen: number
  res_vs: string
  res_sources: string
}

export type TblAutoQuotationColumn = keyof AutoQuotation

export type TblAutoQuotation = {
  [key: string]: AutoQuotation
}

export let tblAutoQuotation: OvlTableDef = {
  id: "autoQuotation",
  namespace: "autoquotation.table",
  server: {
    endpoint: "",
  },
  database: {
    dataIdField: "id",
    dbInsertMode: "Manual",
  },
  features: {
    focusToFirstEditableField: true,
    add: false,
    delete: false,
    noButtonsAtTheBottom: true,
  },
  options: {
    initial_sortCustom: {
      selected: "Default",
      sorts: {
        Default: { showInTitle: false, translationKey: "Querschnitt/Skl" },
      },
    },
    customRowActions: {
      Optimize: {
        icon: "sap-icon--puzzle",
        translationKey: "Optimiere Angebot",
        selected: {
          translationKey: "Optimiere Angebot",
        },
      },
    },
  },
  columns: {
    width: {
      width: 1,
      ui: { labelTranslationKey: "Breite", readonly: true, align: "center" },
      filter: { top: 20 },
      type: "int",
    },
    height: {
      width: 1,
      ui: { labelTranslationKey: "Höhe", readonly: true, align: "center" },

      filter: { top: 20 },
      type: "int",
    },
    skl: {
      width: 2,
      ui: { labelTranslationKey: "Schnittklasse", readonly: true },

      filter: { top: 20 },
      type: "text",
    },
    targets: {
      width: 1,
      ui: {
        labelTranslationKey: "Anz. Stücke",
        readonly: true,
        align: "center",
      },
      sortable: true,
      type: "int",
    },
    smallest: {
      width: 1,
      ui: {
        labelTranslationKey: "Kleinstes Stk.",
        readonly: true,
        align: "center",
      },
      type: "int",
    },

    biggest: {
      width: 1,
      ui: {
        labelTranslationKey: "Grösstes Stk.",
        readonly: true,
        align: "center",
      },
      type: "int",
    },

    sumTargetLen: {
      width: 1,
      ui: {
        labelTranslationKey: "Gesamtlänge Stücke",
        readonly: true,
        align: "center",
        format: "0digits",
      },
      type: "decimal",
    },

    cutoff: {
      width: 1,
      ui: { labelTranslationKey: "Anschnitt", align: "center" },

      filter: { top: 20 },
      type: "int",
    },
    sawcut: {
      width: 1,
      ui: { labelTranslationKey: "Schnittfuge", align: "center" },

      filter: { top: 20 },
      type: "int",
    },
    max_vs: {
      width: 1,
      ui: { labelTranslationKey: "Max. Vs", align: "center" },

      filter: { top: 20 },
      type: "int",
    },
    sources: {
      width: 3,
      ui: { labelTranslationKey: "Quellen" },

      filter: { top: 20 },
      type: "text",
    },

    res_sumSourceLen: {
      width: 1,
      ui: {
        labelTranslationKey: "Gesamtlänge Stangen",
        readonly: true,
        align: "center",
        format: "0digits",
      },
      type: "decimal",
    },

    res_vs: {
      width: 1,
      ui: { labelTranslationKey: "Res. Vs", readonly: true, align: "center" },
      type: "text",
    },

    res_sources: {
      width: 5,
      ui: { labelTranslationKey: "Stangen", readonly: true },
      type: "text",
    },
  },
}
