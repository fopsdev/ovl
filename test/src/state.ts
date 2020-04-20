import { tblTableTesting, tblTableTesting2 } from "./shared/TableTesting/state"
import { tblMobileTimeRecording } from "./screens/MobileTimeRecording/MobileTimeRecordingDetail/state"
import {
  TableData,
  ListFnReturnValue,
  TableDef,
  TableDataAndDef,
} from "../../ovl/src/library/Table/Table"
import { File } from "./components/FileList/FileList"
import { tblTranslation } from "./screens/Translation/state"
import { tblAudit } from "./screens/Audit/state"

export type FileList = {
  files: File[]
}

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

let pics: PicsState = {
  salesContact: "",
  technicalContact: "",
}

type Role = "User" | "Admin"
type Language = "DE" | "FR"
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

type Portal = {
  user: User
  orderDetail: OrderDetailState
  quotationDetail: QuotationDetailState
  invoiceDetail: InvoiceDetailState
  dpInvoiceDetail: DPInvoiceDetailState
  chartData: DoubleBarChartState
  partner: PartnerState
  pics: PicsState
  tables: { translation: TableData; audit: TableData }
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
  | "mobiletimerecording1"

export let portal: Portal = {
  user: undefined,
  orderDetail: undefined,
  chartData: undefined,
  dpInvoiceDetail: undefined,
  invoiceDetail: undefined,
  partner: undefined,
  pics: undefined,
  quotationDetail: undefined,
  tables: {
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
  },
}

export let testtables = {
  tableTesting: <TableData>{
    data: {},
    schema: {},
    tableDef: { tab1: tblTableTesting, tab2: tblTableTesting2 },
    lookupTypes: { U_Alpha: "text" },
    lookupTypes2: { U_Alpha: "text", U_Date: "date" },
  },
  timeentries: <TableData>{
    data: {},
    schema: {},
    tableDef: {
      mobiletimerecording1: tblMobileTimeRecording,
    },
  },
  lookups: {
    U_ItemCode: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined,
    },

    U_ItmsGrpCod: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined,
    },
    ProjectTypeId: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined,
    },
    AbsenceTypeId: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined,
    },
  },
}
