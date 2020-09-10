import { OvlTableDef } from "../../../../ovl/src/library/Table/Table"

export let tblAudit: OvlTableDef = {
  id: "audit",
  namespace: "portal.system.audit",
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoGUIDBoth",
  },
  server: {
    endpoint: "audit",
  },
  options: {
    sort: { field: "U_Timestamp", direction: "desc" },
    paging: { page: 0, pageSize: 200 },
  },
  features: {
    detailView: "EnabledOnlyMobile",
    page: true,
    add: false,
    delete: false,
    edit: false,
    noButtonsAtTheBottom: true,
  },
  columns: {
    U_Timestamp: {
      ui: { format: "timestamp" },
      sortable: true,
    },
    U_UserCode: {
      sortable: true,
      filter: { top: 25 },
    },
    U_User: {
      sortable: true,
      filter: { top: 25 },
    },
    U_Role: {
      sortable: true,
      filter: { top: 10 },
    },

    U_Operation: {
      sortable: true,
      filter: { top: 10 },
    },

    U_IDField: {
      sortable: true,
    },
    U_IDValue: {
      sortable: true,
    },
    U_TableName: {
      sortable: true,
      filter: { top: 10 },
    },
    U_Payload: {},
  },
}
