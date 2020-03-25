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
