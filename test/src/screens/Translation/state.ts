import { TableDef } from "../../../../ovl/src/library/Table/Table"

export type Translation = {
  U_Code: string
  U_Group: string
  TranslationDE: string
  TranslationFR: string
}

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
    Group: {
      editable: true,
      caption: "Gruppe",
      datafield: "U_Group",
      sortable: true,
      filter: { top: 10 }
    },
    TCode: {
      editable: true,
      caption: "Code",
      datafield: "U_Code",
      sortable: true
    },

    TranslationDE: {
      editable: true,
      caption: "Deutsch",
      datafield: "U_DE",
      sortable: true,
      control: "textarea"
    },
    TranslationFR: {
      editable: true,
      caption: "Französisch",
      datafield: "U_FR",
      sortable: true,
      control: "textarea"
    }
  }
}
