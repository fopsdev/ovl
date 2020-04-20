import { TableDef } from "../../../../ovl/src/library/Table/Table"

export type TableTesting = {
  Code: string
  Name: string
  U_Alpha: string
  U_Memo: string
  U_Date: Date
  U_Int: number
  U_Decimal: number
}

export type TableTestingColumn = keyof TableTesting

export type TblTableTesting = {
  [key: string]: TableTesting
}

export let tblTableTesting: TableDef = {
  id: "tab1",
  title: "Test Tabelle mit Paging und Inline-Editierfunktion",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    customRowActions: {
      Select: { icon: "sap-icon--travel-expense", name: "Travel Expense" },
      Shop: { icon: "sap-icon--cart", name: "Travel Expense" },
    },
    paging: { page: 0, pageSize: 3 },
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoNumberBoth",
  },
  features: {
    page: true,
    add: true,
    noButtonsAtTheBottom: false,
    forceFreshServerDataIfOlderThan: 0,
  },
  columns: {
    U_Alpha: {
      sortable: true,

      width: 1,
    },
    U_Memo: {
      sortable: true,

      control: "textarea",
      width: 2,
    },
    U_ItmsGrpCod: {
      sortable: true,
      control: "list",
      type: "int",
      list: {
        valueField: "ItmsGrpCod",
        displayField: "ItmsGrpNam",
        serverEndpoint: "itemGroup",
        acceptEmpty: true,
        acceptOnlyListValues: true,
      },
      width: 2,
    },
    U_ItemCode: {
      sortable: true,
      control: "list",
      list: {
        valueField: "U_ItemCode",
        displayField: "ItemName",
        serverEndpoint: "item",
        acceptEmpty: false,
        acceptOnlyListValues: true,
      },
      width: 10,
    },
    U_Date: {
      sortable: true,
      control: "date",
      width: 2,
    },
    U_Int: {
      sortable: true,
      width: 1,
    },
    U_Decimal: {
      sortable: true,
      width: 1,
    },
  },
}
export let tblTableTesting2: TableDef = {
  id: "tab2",
  title: "Testtabelle aus SAP",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    maxRows: { maxRows: 100, showHint: true, showInTitle: true },
    customRowActions: {
      Select: { icon: "sap-icon--travel-expense", name: "Travel Expense" },
    },
    edit: { editType: "big" },
    sortCustom: {
      sorts: {
        alphaThenMemo: {
          description: "Text dann Memo",
          showInTitle: true,
        },
        memoThenAlpha: {
          description: "Memo dann Text",
          showInTitle: true,
        },
        onlyTest: {
          description: "Enthält Test",
          showInTitle: true,
        },
      },
      selected: "alphaThenMemo",
    },
    filterCustom: {
      alphaStartsWithA: {
        active: false,
        description: 'Text beginnt mit "A"',
        type: "single",
        showInTitle: true,
      },
      alphaStartsWithB: {
        active: false,
        description: 'Text beginnt mit "B"',
        type: "single",
        showInTitle: true,
      },
      memoContainsTest: {
        active: false,
        description: 'Memo enthält "test"',
        type: "multi",
        showInTitle: true,
      },
      memoContainsText: {
        active: false,
        description: 'Memo enthält "text"',
        type: "multi",
        showInTitle: true,
      },
    },
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoNumberBoth",
  },
  features: {
    filter: false,
    page: false,
    add: true,
    noButtonsAtTheBottom: true,
    forceFreshServerDataIfOlderThan: 10,
  },
  columns: {
    U_Alpha: {
      sortable: true,

      filter: { top: 3 },
    },
    U_Memo: {
      sortable: true,
      control: "textarea",
    },
    U_Date: {
      control: "date",
      sortable: true,
    },

    U_ItmsGrpCod: {
      sortable: true,
      control: "list",
      type: "int",
      list: {
        valueField: "ItmsGrpCod",
        displayField: "ItmsGrpNam",
        serverEndpoint: "itemGroup",
        acceptEmpty: false,
        acceptOnlyListValues: true,
      },
    },

    U_ItemCode: {
      sortable: true,
      control: "list",
      list: {
        valueField: "U_ItemCode",
        displayField: "ItemName",
        serverEndpoint: "item",
        acceptEmpty: false,
        acceptOnlyListValues: true,
      },
    },

    U_ParentCode: {
      sortable: true,
      control: "list",
      list: {
        acceptEmpty: true,
        acceptOnlyListValues: false,
        valueField: "Code",
        displayField: "U_Alpha",
      },
    },
    U_ParentCode2: {
      sortable: true,
      control: "list",
      list: {
        acceptEmpty: true,
        acceptOnlyListValues: false,
        valueField: "Code",
        displayField: "U_Alpha",
      },
    },

    U_Int: {
      sortable: true,
      filter: { top: 3 },
    },
    U_Decimal: {
      sortable: true,
      ui: { format: "4digits" },
    },
  },
}
