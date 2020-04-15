import { TableDef } from "../../../../ovl/src/library/Table/Table"

export let tblAudit: TableDef = {
  id: "audit",
  namespace: "portal.system.audit",
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
      format: "timestamp",
      sortable: true
    },
    U_UserCode: {
      caption: "UserCode",
      sortable: true,
      filter: { top: 25 }
    },
    U_User: {
      caption: "User",
      sortable: true,
      filter: { top: 25 }
    },
    U_Role: {
      caption: "Role",
      sortable: true,
      filter: { top: 10 }
    },

    U_Operation: {
      caption: "Operation",
      sortable: true,
      filter: { top: 10 }
    },

    U_IDField: {
      caption: "ID Field",
      sortable: true
    },
    U_IDValue: {
      caption: "ID Value",
      sortable: true
    },
    U_TableName: {
      caption: "Tablename",
      sortable: true,
      filter: { top: 10 }
    },
    U_Payload: {
      caption: "Payload"
    }
  }
}
