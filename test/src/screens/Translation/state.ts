import { OvlTableDef } from "../../../../ovl/src/library/Table/Table"

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

export let tblTranslation: OvlTableDef = {
  id: "translation",
  namespace: "system.translations",
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoGUIDBoth",
  },
  server: {
    endpoint: "translation",
  },
  features: { focusToFirstEditableField: true },

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
