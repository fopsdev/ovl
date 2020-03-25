import { tblTableTesting, tblTableTesting2 } from "./shared/TableTesting/state"
import { tblMobileTimeRecording } from "./screens/MobileTimeRecording/state"
import { TableData, ListFnReturnValue } from "../../ovl/src/library/Table/Table"
import { File } from "./components/FileList/FileList"

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
  technicalContact: ""
}

type Portal = {
  orderDetail: OrderDetailState
  quotationDetail: QuotationDetailState
  invoiceDetail: InvoiceDetailState
  dpInvoiceDetail: DPInvoiceDetailState
  chartData: DoubleBarChartState
  partner: PartnerState
}

export let portal: Portal
export let tables = {
  tableTesting: <TableData>{
    data: {},
    schema: {},
    tableDef: {
      tab1: tblTableTesting,
      tab2: tblTableTesting2
    },
    lookupTypes: { U_Alpha: "text" }
  },
  timeentries: <TableData>{
    data: {},
    schema: {},
    tableDef: {
      mobiletimerecording1: tblMobileTimeRecording
    }
  },
  lookups: {
    U_ItemCode: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined
    },

    ItmsGrpCod: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined
    },
    ProjectTypeId: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined
    },
    AbsenceTypeId: <ListFnReturnValue>{
      data: undefined,
      lookupTypes: undefined
    }
  }
}
