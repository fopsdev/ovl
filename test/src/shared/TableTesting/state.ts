import { TableDef } from "../../../../ovl/src/library/Table/Table"

export type TableTesting = {
  Code: string
  Name: string
  U_Alpha: string
  U_Memo: string
  U_Date: Date
  U_Int: number
  U_Decimal: number
  U_ItemCode: string
  U_ItmsGrpCod: string
  U_ParentCode: string
  U_ParentCode2: string
  U_Checked: string
}

export type TableTestingColumn = keyof TableTesting

export type TblTableTesting = {
  [key: string]: TableTesting
}

export let tblTableTesting: TableDef = {
  id: "tab1",
  titleTranslationKey: "PortalTitleTable1",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    customRowActions: {
      Select: {
        icon: "sap-icon--travel-expense",
        translationKey: "PortalTravelExpense",
        selected: { translationKey: "PortalTravelExpense" },
      },
      Shop: { icon: "sap-icon--cart", translationKey: "PortalShop" },
    },
    customColumnActions: {
      ValidValues: {
        icon: "sap-icon--cart",
        translationKey: "PortalValidValues",
      },
    },
    paging: { page: 0, pageSize: 3 },
    view: { viewType: "custom" },
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
    focusToFirstEditableField: true,
    detailView: "Enabled",
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
    U_Checked: {
      sortable: true,
      control: "checkbox",
      width: 1,
      ui: { checkedValue: "Y", align: "center" },
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
  titleTranslationKey: "PortalTitleTable2",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    maxRows: { maxRows: 100, showHint: true, showInTitle: true },
    customRowActions: {
      Select: {
        icon: "sap-icon--travel-expense",
        translationKey: "PortalTravelExpense",
        selected: { translationKey: "PortalTravelExpense" },
      },
    },
    edit: {
      editType: "big",
      customCaption: {
        editTranslationKey: "PortalEdit",
        copyTranslationKey: "PortalCopy",
        addTranslationKey: "PortalAdd",
      },
    },
    view: {
      customCaption: { translationKey: "PortalDetailView" },
    },
    sortCustom: {
      sorts: {
        alphaThenMemo: {
          translationKey: "PortalSortAlphaThenMemo",
          showInTitle: true,
        },
        memoThenAlpha: {
          translationKey: "PortalSortMemoThenAlpha",
          showInTitle: true,
        },
        onlyTest: {
          translationKey: "PortalSortContainsTest",
          showInTitle: true,
        },
      },
      selected: "alphaThenMemo",
    },
    filterCustom: {
      alphaStartsWithA: {
        active: false,
        translationKey: "PortalFilterAlphaStartsWithA",
        type: "single",
        showInTitle: true,
      },
      alphaStartsWithB: {
        active: false,
        translationKey: "PortalFilterAlphaStartsWithB",
        type: "single",
        showInTitle: true,
      },
      memoContainsTest: {
        active: false,
        translationKey: "PortalFilterMemoContainsTest",
        type: "multi",
        showInTitle: true,
      },
      memoContainsText: {
        active: false,
        translationKey: "PortalFilterMemoContainsText",
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
    detailView: "Enabled",
    filter: false,
    page: false,
    add: true,
    noButtonsAtTheBottom: true,
    forceFreshServerDataIfOlderThan: 10,
  },
  columns: {
    MobileSummary: {
      sortable: true,
      ui: { visibility: "TableOnlyMobile" },
    },
    U_Alpha: {
      sortable: true,

      filter: { top: 3 },
      ui: { visibility: "TableNotMobile_Edit_View" },
    },
    U_Memo: {
      sortable: true,
      control: "textarea",
      ui: { visibility: "TableNotMobile_Edit_View" },
    },
    U_Date: {
      control: "date",
      sortable: true,
      ui: { visibility: "TableNotMobile_Edit_View" },
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
      ui: { visibility: "TableNotMobile_Edit_View" },
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
      ui: { visibility: "TableNotMobile_Edit_View" },
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
      ui: {
        visibility: "TableNotMobile_Edit_View",
        showLabelIfNoValueInView: false,
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
      ui: {
        visibility: "TableNotMobile_Edit_View",
        showLabelIfNoValueInView: false,
      },
    },

    U_Int: {
      sortable: true,
      filter: { top: 3 },
      ui: { visibility: "TableNotMobile_Edit_View" },
    },
    U_Decimal: {
      sortable: true,
      ui: { format: "4digits" },
    },
  },
}

export let tblTableTesting3: TableDef = {
  id: "tab3",
  titleTranslationKey: "PortalTitleTable3",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    maxRows: { maxRows: 100, showHint: true, showInTitle: true },
    edit: { editType: "big" },
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoNumberBoth",
  },
  features: {
    detailView: "Enabled",
    filter: false,
    page: false,
    add: true,
    noButtonsAtTheBottom: true,
    forceFreshServerDataIfOlderThan: 10,
  },
  columns: {
    MobileSummary: {
      sortable: true,
      ui: { visibility: "TableOnlyMobile" },
    },
    U_Alpha: {
      sortable: true,

      filter: { top: 3 },
      ui: { visibility: "TableNotMobile_Edit_View" },
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
      ui: { visibility: "TableNotMobile_Edit_View" },
    },

    U_Date: {
      control: "date",
      sortable: true,
      ui: { visibility: "TableNotMobile_Edit_View" },
    },

    U_Decimal: {
      sortable: true,
      ui: { format: "4digits" },
    },
    U_Checked: {
      sortable: true,
      control: "checkbox",

      ui: { checkedValue: "Y", align: "center" },
    },
    U_Image: {
      control: "Link",
      ui: { align: "center" },
      asset: {
        type: "Image",
        validFileExtensions: ["jpg", "gif"],
        validCategories: ["ItemPicture", "FreePicture"],
        idColumns: ["U_ItemCode"],
      },
    },
  },
}
