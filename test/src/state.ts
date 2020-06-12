import { LookupDef } from "../../ovl/src/library/forms/OvlFormElement"
import { ListFnReturnValue, TableData } from "../../ovl/src/library/Table/Table"
import { File } from "./components/FileList/FileList"
import { tblAudit } from "./screens/Audit/state"
import { tblMobileTimeRecording } from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/state"
import { tblTranslation } from "./screens/Translation/state"
import {
  tblTableTesting,
  tblTableTesting2,
  tblTableTesting3,
} from "./shared/TableTesting/state"

export type FileList = {
  files: File[]
}

export type Language = "DE" | "FR"

export type DoubleBarChartState = {
  labels_ext: number[]
  labels: number[]
  values_1: number[]
  values_2: number[]
}

type QuotationStatus = "Open" | "Closed" | "Canceled"

type QuotationDetail = {
  cardCode: string
  cardName: string
  docDate: string
  refNum: string
  status: QuotationStatus
  attachments: FileList
}

type InvoiceDetail = {
  cardCode: string
  cardName: string
  docDate: string
  docDueDate: string
  refNum: string
  paidRate: number
  attachments: FileList
}

type DPInvoiceDetail = {
  cardCode: string
  cardName: string
  docDate: string
  docDueDate: string
  refNum: string
  paidRate: number
  attachments: FileList
}

type OrderDetail = {
  cardCode: string
  cardName: string
  docDate: string
  deliveryDate: string
  refNum: string
  steps: {
    step1: {
      attachments: FileList
      date: string
    }
    step2: {
      attachments: FileList
      date: string
    }
    step3: {
      attachments: FileList
      date: string
    }
    step4: {
      attachments: FileList
      date: string
    }
  }
  attachments: FileList
}

export type QuotationDetailState = {
  quotations: { [key: string]: QuotationDetail }
}

export type InvoiceDetailState = {
  invoices: { [key: string]: InvoiceDetail }
}

export type DPInvoiceDetailState = {
  dpInvoices: { [key: string]: DPInvoiceDetail }
}

export type OrderDetailState = {
  orders: { [key: string]: OrderDetail }
}

export type PicsState = {
  technicalContact: string
  salesContact: string
}

export type PartnerState = {
  cardCode: string
  cardName: string
  attachments: FileList
  salesContact: {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  technicalContact: {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
  }
}

type Role = "User" | "Admin"

export type Feature = {
  nrOfQuotations: number
  nrOfOrders: number
  nrOfInvoices: number
}

type User = {
  userName: string
  language: Language
  firstName: string
  lastName: string
  role: Role
  features: Feature
  userCode: number
}

export type CustomFormType =
  | "Feedback"
  | "Settings"
  | "Login"
  | "Language"
  | "MobileTimeEntry"
  | "MobileTimeEntryMain"

export type TableDefIds =
  | "translation"
  | "audit"
  | "tab1"
  | "tab2"
  | "tab3"
  | "mobiletimerecording1"

let tableTesting: TableData = {
  data: {},
  schema: {},
  tableDef: {
    tab1: tblTableTesting,
    tab2: tblTableTesting2,
    tab3: tblTableTesting3,
  },
  lookupDef: <{ [key: string]: LookupDef }>{ U_Alpha: { type: "text" } },
  lookupDef2: <{ [key: string]: LookupDef }>{
    U_Alpha: { type: "text" },
    U_Date: { type: "date" },
  },
}

let timeentries: TableData = {
  data: {},
  schema: {},
  tableDef: {
    mobiletimerecording1: tblMobileTimeRecording,
  },
}

let lookups = {
  U_ItemCode: <ListFnReturnValue>{
    data: undefined,
    lookupDef: undefined,
  },

  U_ItmsGrpCod: <ListFnReturnValue>{
    data: undefined,
    lookupDef: undefined,
  },
  ProjectTypeId: <ListFnReturnValue>{
    data: undefined,
    lookupDef: undefined,
  },
  AbsenceTypeId: <ListFnReturnValue>{
    data: undefined,
    lookupDef: undefined,
  },
}

let testtables = { tableTesting, timeentries, lookups }

let user: User
let chartData
let dpInvoiceDetail: DPInvoiceDetailState
let invoiceDetail: InvoiceDetailState
let orderDetail: OrderDetailState
let partner: PartnerState
let pics: PicsState = {
  salesContact: "",
  technicalContact: "",
}
let quotationDetail: QuotationDetailState
let tables = {
  translation: {
    data: {},
    schema: {},
    tableDef: {
      translation: tblTranslation,
    },
  },
  audit: {
    data: {},
    schema: {},
    tableDef: {
      audit: tblAudit,
    },
  },
}

export {
  user,
  orderDetail,
  chartData,
  dpInvoiceDetail,
  invoiceDetail,
  partner,
  pics,
  quotationDetail,
  tables,
  testtables,
}
