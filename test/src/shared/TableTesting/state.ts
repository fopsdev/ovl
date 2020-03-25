import { TableDef } from "../../library/Table/Table"

export type TableTesting = {
  Code: string
  Name: string
  U_Alpha: string
  U_Memo: string
  U_Date: Date
  U_Int: number
  U_Decimal: number
}

export type TblTableTesting = {
  [key: string]: TableTesting
}

export let tblTableTesting: TableDef = {
  id: "tab1",
  title: "Test Tabelle mit Paging",
  namespace: "tabletesting",
  server: {
    endpoint: "tabletesting"
  },
  options: {
    customRowActions: {
      Select: { icon: "sap-icon--travel-expense", name: "Travel Expense" },
      Shop: { icon: "sap-icon--cart", name: "Travel Expense" }
    },
    paging: { page: 0, pageSize: 3 }
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoNumberBoth"
  },
  features: {
    page: true,
    add: true,
    noButtonsAtTheBottom: false,
    forceFreshServerDataOnRefreshClickedIfOlderThan: 0
  },
  columns: {
    U_Alpha: {
      caption: "Alpha",
      datafield: "U_Alpha",
      sortable: true,
      editable: true,
      width: 1
    },
    U_Memo: {
      caption: "U_Memo",
      datafield: "U_Memo",
      sortable: true,
      editable: true,
      control: "textarea",
      width: 2
    },
    ItmsGrpCod: {
      editable: true,
      caption: "Itemgroup",
      datafield: "U_ItmsGrpCod",
      sortable: true,
      control: "list",
      type: "int",
      list: {
        valueField: "ItmsGrpCod",
        displayField: "ItmsGrpNam",
        serverEndpoint: "itemGroup",
        acceptEmpty: true,
        acceptOnlyListValues: true
      },
      width: 2
    },
    U_ItemCode: {
      editable: true,
      caption: "ItemCode",
      datafield: "U_ItemCode",
      sortable: true,
      control: "list",
      list: {
        valueField: "U_ItemCode",
        displayField: "ItemName",
        serverEndpoint: "item",
        acceptEmpty: false,
        acceptOnlyListValues: true
      },
      width: 10
    },

    U_Date: {
      editable: true,
      caption: "U_Date",
      datafield: "U_Date",
      sortable: true,
      width: 2
    },
    U_Int: {
      editable: true,
      caption: "U_Int",
      datafield: "U_Int",
      sortable: true,
      width: 1
    },
    U_Decimal: {
      editable: true,
      caption: "U_Decimal",
      datafield: "U_Decimal",
      sortable: true,

      width: 1
    }
  }
}
export let tblTableTesting2: TableDef = {
  id: "tab2",
  title: "Umsätze",
  namespace: "tabletesting",
  server: {
    endpoint: "tabletesting"
  },
  options: {
    maxRows: { maxRows: 100, showHint: true, showInTitle: true },
    customRowActions: {
      Select: { icon: "sap-icon--travel-expense", name: "Travel Expense" }
    },
    edit: { editType: "big" },
    sortCustom: {
      sorts: {
        alphaThenMemo: {
          description: "U_Alpha dann U_Memo",
          showInTitle: true
        },
        memoThenAlpha: {
          description: "U_Memo dann U_Alpha",
          showInTitle: true
        },
        onlyJrish: {
          description: "Enthält Jrish",
          showInTitle: true
        }
      },
      selected: "alphaThenMemo"
    },
    filterCustom: {
      alphaStartsWithA: {
        active: false,
        description: "u_alpha starts with A",
        type: "single",
        showInTitle: true
      },
      alphaStartsWithB: {
        active: false,
        description: "u_alpha starts with B",
        type: "single",
        showInTitle: true
      },
      memoContainsJrish: {
        active: false,
        description: "u_memo contains Jrish",
        type: "multi",
        showInTitle: true
      },
      memoContainsFops: {
        active: false,
        description: "u_memo contains Fops",
        type: "multi",
        showInTitle: true
      }
    }
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoNumberBoth"
  },
  features: {
    filter: false,
    page: false,
    add: true,
    noButtonsAtTheBottom: true,
    forceFreshServerDataOnRefreshClickedIfOlderThan: 10
  },
  columns: {
    U_Alpha: {
      caption: "U_Alpha",
      datafield: "U_Alpha",
      sortable: true,
      editable: true,
      filter: { top: 3 }
    },
    U_Memo: {
      caption: "U_Memo",
      datafield: "U_Memo",
      sortable: true,
      control: "textarea",
      editable: true
    },
    U_Date: {
      editable: true,
      caption: "U_Date",
      datafield: "U_Date",
      sortable: true
    },

    ItmsGrpCod: {
      editable: true,
      caption: "Itemgroup",
      datafield: "U_ItmsGrpCod",
      sortable: true,
      control: "list",
      type: "int",
      list: {
        valueField: "ItmsGrpCod",
        displayField: "ItmsGrpNam",
        serverEndpoint: "itemGroup",
        acceptEmpty: false,
        acceptOnlyListValues: true
      }
    },

    U_ItemCode: {
      editable: true,
      caption: "ItemCode",
      datafield: "U_ItemCode",
      sortable: true,
      control: "list",
      list: {
        valueField: "U_ItemCode",
        displayField: "ItemName",
        serverEndpoint: "item",
        acceptEmpty: false,
        acceptOnlyListValues: true
      }
    },

    ParentCode: {
      editable: true,
      caption: "Parent Code",
      datafield: "U_ParentCode",
      sortable: true,
      control: "list",

      list: {
        valueField: "Code",
        displayField: "U_Alpha"
      }
    },

    U_Int: {
      editable: true,
      caption: "U_Int",
      datafield: "U_Int",
      sortable: true,
      filter: { top: 3 }
    },
    U_Decimal: {
      editable: true,
      caption: "U_Decimal",
      datafield: "U_Decimal",
      sortable: true,
      format: "4digits"
    }
  }
}
