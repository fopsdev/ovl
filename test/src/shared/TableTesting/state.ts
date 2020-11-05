import { OvlTableDef, Tabs } from "../../../../ovl/src/library/Table/Table"

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

export let tblTableTesting: OvlTableDef = {
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
    initial_paging: { page: 0, pageSize: 3 },
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

let tableTesting2Tabs: Tabs = {
  edit: {
    tabs: {
      TabA: { translationKey: "PortalEditTabA" },
      TabB: { translationKey: "PortalEditTabB" },
    },
  },
  view: {
    tabs: {
      TabA: { translationKey: "PortalViewTabA" },
      TabB: { translationKey: "PortalViewTabB" },
      TabX: { translationKey: "PortalViewTabX", hasCustomContent: true },
    },
  },
}

export type tab2EditTabs = keyof typeof tableTesting2Tabs.edit.tabs
export type tab2ViewTabs = keyof typeof tableTesting2Tabs.view.tabs

export let tblTableTesting2: OvlTableDef = {
  id: "tab2",
  titleTranslationKey: "PortalTitleTable2",
  namespace: "testtables.tabletesting",
  server: {
    endpoint: "tabletesting",
  },
  options: {
    tabs: tableTesting2Tabs,
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
    initial_sortCustom: {
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
    initial_filterCustom: {
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
      ui: {
        visibility: "TableNotMobile_Edit_View",
        language: "DE",
        translationVisibility: "Edit_View",
        viewTab: <tab2ViewTabs>"TabA",
      },
    },
    U_Memo_FR: {
      sortable: true,
      control: "textarea",
      ui: {
        visibility: "TableNotMobile_Edit_View",
        language: "FR",
        translationVisibility: "Edit_View",
        viewTab: <tab2ViewTabs>"TabA",
      },
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
        acceptOnlyListValues: true,
        valueField: "Code",
        displayField: "U_Alpha",
        displayValueField: false,
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
        acceptEmpty: false,
        acceptOnlyListValues: false,
        valueField: "Code",
        displayField: "U_Alpha",
        displayValueField: true,
      },
      ui: {
        visibility: "TableNotMobile_Edit_View",
        showLabelIfNoValueInView: false,
      },
    },

    U_Select1: {
      control: "list",
      list: {
        acceptEmpty: true,
        acceptOnlyListValues: true,
        valueField: "Key",
        displayField: "Key",
        isSelect: true,
      },
    },

    U_Int: {
      sortable: true,
      filter: { top: 3 },
      ui: {
        visibility: "TableNotMobile_Edit_View",
        viewTab: <tab2ViewTabs>"TabB",
      },
    },
    U_Decimal: {
      sortable: true,
      ui: { format: "4digits", viewTab: <tab2ViewTabs>"TabB" },
    },
  },
}

export let tblTableTesting3: OvlTableDef = {
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
    filter: true,
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
      ui: { visibility: "Edit_View" },
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
      control: "link",
      ui: { align: "center", showLabelIfNoValueInView: false },
      asset: {
        type: "Image",
        validCategories: {
          ItemPicture: {
            idColumn: "U_ItemCode",
            validFileExtensions: undefined,
          },
          Ext: undefined,
        },
      },
    },
  },
}
