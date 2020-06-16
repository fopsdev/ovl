import { TableDef } from "../../../../../ovl/src/library/Table/Table"

export type TableMobileTimeRecording = {
  Code?: string
  Name?: string
  // the user which created the timeentry
  U_User?: string
  // the date (if a user works from 22:00 - 04:00 he needs to create 2 entries)
  U_Date?: string
  // starting time
  U_FromTime?: string
  // end time
  U_ToTime?: string
  // the calculated duration
  U_Duration?: number
  // the calculated week number
  U_WeekNr?: number
  // type
  U_Type?: "PROJECT" | "ABSENCE"
  // the id of the selected type (projectid, absenceid)
  // this will reference a lookup list with all the needed info in the displayvalue
  U_TypeId?: string
  U_Synced?: string
}

export type tblMobileTimeRecording = {
  [key: string]: TableMobileTimeRecording
}

export let tblMobileTimeRecording: TableDef = {
  id: "mobiletimerecording1",
  namespace: "testtables.mobiletimerecordingdetail",
  server: {
    endpoint: "timeentries",
  },
  database: {
    dataIdField: "Code",
    dbInsertMode: "UDTAutoGUIDBoth",
  },
  options: {
    filter: { value: "", showSelected: false, static: { U_Date: "" } },
    sort: { direction: "desc", field: "U_FromTime" },
  },
  columns: {
    U_FromTime: {
      type: "time",
    },
    U_ToTime: {
      type: "time",
    },
    U_Duration: {
      type: "decimal",
      ui: { readonly: true },
    },
    U_Type: {
      type: "text",
      control: "option",
      list: {
        displayField: "Description",
        valueField: "Code",
        acceptEmpty: false,
      },
      ui: { inline: true },
    },
    U_TypeId: {
      type: "text",
      list: {
        serverEndpoint: "lookup",
        displayField: "Description",
        valueField: "Code",
        displayValueField: false,
        acceptEmpty: false,
        acceptOnlyListValues: true,
      },
    },
  },
}
