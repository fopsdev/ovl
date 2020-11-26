import {
  OvlTableData,
  OvlTableDef,
} from "../../../../../ovl/ovl/src/library/Table/Table"

export type OccasionsProcessDashboardDataClosedQuarter = {
  Days: number
}

export type OccasionsProcessDashboardData = {
  VehicleDescription: string
  Contact: string
  ChassisNr: string
  EntryDate: string
  Days: number
  Quarter: string
  IDTransaction: number
}

export let tblVehicles: OvlTableDef = {
  id: "Vehicles",
  namespace: "vehicles",
  database: {
    dataIdField: "Id",
    dbInsertMode: "Manual",
  },

  server: {
    endpoint: "",
  },
  options: {
    initial_sort: { field: "Days", direction: "asc" },
    maxRows: { maxRows: 30, showHint: true },
  },
  features: {
    add: false,
    delete: false,
    edit: false,
    noButtonsAtTheBottom: true,
  },
  columns: {
    VehicleDescription: { ui: { labelTranslationKey: "Bezeichnung" } },
    Contact: { ui: { labelTranslationKey: "Ex Name" } },
    EntryDate: {
      ui: { labelTranslationKey: "Eingang" },
      type: "date",
    },
    Quarter: { ui: { labelTranslationKey: "Quartal", align: "center" } },
    ChassisNr: { ui: { labelTranslationKey: "Chassis Nr" } },
    Days: {
      ui: { labelTranslationKey: "Standtage" },
      type: "int",
    },

    IDTransaction: {
      ui: { labelTranslationKey: "Id" },
      type: "int",
    },
  },
}
