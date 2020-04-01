import { TableDef, ColumnDef } from "../../../../ovl/src/library/Table/Table"

export type Translation = {
  U_Code: string
  U_Group: string
  TranslationDE: string
  TranslationFR: string
}

export type TblTranslation = {
  [key: string]: Translation
}

let columns = {
  Group: {
    editable: true,
    caption: "AppColTranslationGroup",
    datafield: "U_Group",
    sortable: true,
    filter: { top: 10 }
  },
  TCode: {
    editable: true,
    caption: "AppColTranslationCode",
    datafield: "U_Code",
    sortable: true
  },

  TranslationDE: {
    editable: true,
    caption: "AppColTranslationDE",
    datafield: "U_DE",
    sortable: true,
    control: "textarea"
  },
  TranslationFR: {
    editable: true,
    caption: "AppColTranslationFR",
    datafield: "U_FR",
    sortable: true,
    control: "textarea"
  }
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
  columns: columns as { [key: string]: ColumnDef }
}

export type TranslationColumnKeys = keyof typeof columns
