import { TableDef } from "../../../../ovl/src/library/Table/Table"

export type Translation = {
  ID: string
  Translation: string
}

export type TblTranslation = {
  [key: string]: Translation
}

export let tblTranslation: TableDef = {
  id: "translation",
  namespace: "portal.system.translations",
  database: {
    dataIdField: "ID",
    dbInsertMode: "UDTAutoNumber"
  },
  dataFetching: {
    useSchema: false,
    useCustomDataFetching: true
  },
  server: {
    endpoint: "translation"
  },
  columns: {
    ID: {
      editable: true,
      caption: "Id",
      datafield: "ID",
      width: 20,
      sortable: true
    },
    Translation: {
      editable: true,
      caption: "Translation",
      datafield: "Translation",
      width: 80,
      sortable: true,
      control: "textarea"
    }
  }
}
