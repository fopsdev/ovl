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
    dbInsertMode: "UDTAutoGUID"
  },
  server: {
    endpoint: "translation"
  },
  columns: {
    U_Group: {
      editable: true,
      caption: "AppColTranslationGroup",

      sortable: true,
      filter: { top: 10 }
    },
    U_Code: {
      editable: true,
      caption: "AppColTranslationCode",

      sortable: true
    },

    U_DE: {
      editable: true,
      caption: "AppColTranslationDE",

      sortable: true,
      control: "textarea"
    },
    U_FR: {
      editable: true,
      caption: "AppColTranslationFR",
      sortable: true,
      control: "textarea"
    }
  }
}
