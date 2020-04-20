import { TableDef } from "../../../../ovl/src/library/Table/Table"

export type Translation = {
  U_Code: string
  U_Group: string
  U_DE: string
  U_FR: string
}

export type TblTranslationColumn = keyof Translation

export type TblTranslation = {
  [key: string]: Translation
}

export let tblTranslation: TableDef = {
  id: "translation",
  namespace: "portal.system.translations",
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoGUID",
  },
  server: {
    endpoint: "translation",
  },
  columns: {
    U_Group: {
      ui: { labelTranslationKey: "AppColTranslationGroup" },
      sortable: true,
      filter: { top: 10 },
    },
    U_Code: {
      ui: { labelTranslationKey: "AppColTranslationCode" },
      sortable: true,
    },

    U_DE: {
      ui: { labelTranslationKey: "AppColTranslationDE" },
      sortable: true,
      control: "textarea",
    },
    U_FR: {
      ui: { labelTranslationKey: "AppColTranslationFR" },
      sortable: true,
      control: "textarea",
    },
  },
}
