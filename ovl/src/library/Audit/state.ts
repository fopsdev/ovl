import { TableDef } from "../Table/Table"

export let tblAudit: TableDef = {
  id: "audit",
  namespace: "audit",
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoGUIDBoth"
  },
  server: {
    endpoint: "audit"
  },
  options: {
    sort: { field: "U_Timestamp", direction: "desc" },
    paging: { page: 0, pageSize: 200 }
  },
  features: {
    page: true,
    add: false,
    delete: false,
    edit: false,
    noButtonsAtTheBottom: true
  },
  columns: {
    U_Timestamp: {
      caption: "Timestamp",
      datafield: "U_Timestamp",
      format: "timestamp",
      sortable: true
    },
    U_UserCode: {
      caption: "UserCode",
      datafield: "U_UserCode",
      sortable: true,
      filter: { top: 25 }
    },
    U_User: {
      caption: "User",
      datafield: "U_User",
      sortable: true,
      filter: { top: 25 }
    },
    U_Role: {
      caption: "Role",
      datafield: "U_Role",
      sortable: true,
      filter: { top: 10 }
    },

    U_Operation: {
      caption: "Operation",
      datafield: "U_Operation",
      sortable: true,
      filter: { top: 10 }
    },

    U_IDField: {
      caption: "ID Field",
      datafield: "U_IDField",
      sortable: true
    },
    U_IDValue: {
      caption: "ID Value",
      datafield: "U_IDValue",
      sortable: true
    },
    U_TableName: {
      caption: "Tablename",
      datafield: "U_TableName",
      sortable: true,
      filter: { top: 10 }
    },
    U_Payload: {
      caption: "Payload",
      datafield: "U_Payload"
    }
  }
}
