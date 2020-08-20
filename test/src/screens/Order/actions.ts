import { T } from "../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../ovl/src"

type OrderFeedbackState = {
  message: string
}
export const PreparePositiveFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.demoApp.screens.orderdetail.selectedOrder
  let order = state.demoApp.orderDetail.orders[key]
  state.demoApp.screens.feedback.cardCode = order.cardCode
  state.demoApp.screens.feedback.refNum = order.refNum
  state.demoApp.screens.feedback.message = value.message
  state.demoApp.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalPositiveFeedback")
  state.demoApp.screens.feedback.orderDate = order.docDate
  state.demoApp.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.demoApp.screens.feedback.orderNum = key
  state.demoApp.screens.feedback.type = "OrderPositive"
}

export const PrepareNegativeFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.demoApp.screens.orderdetail.selectedOrder
  let order = state.demoApp.orderDetail.orders[key]
  state.demoApp.screens.feedback.cardCode = order.cardCode
  state.demoApp.screens.feedback.refNum = order.refNum
  state.demoApp.screens.feedback.message = value.message
  state.demoApp.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalNegativeFeedback")
  state.demoApp.screens.feedback.orderDate = order.docDate
  state.demoApp.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.demoApp.screens.feedback.orderNum = key
  state.demoApp.screens.feedback.type = "OrderNegative"
}

export const PrepareDeliveryDateFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.demoApp.screens.orderdetail.selectedOrder
  let order = state.demoApp.orderDetail.orders[key]
  state.demoApp.screens.feedback.cardCode = order.cardCode
  state.demoApp.screens.feedback.refNum = order.refNum
  state.demoApp.screens.feedback.message = value.message
  state.demoApp.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalDeliveryDateFeedback")
  state.demoApp.screens.feedback.orderDate = order.docDate
  state.demoApp.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.demoApp.screens.feedback.orderNum = key
  state.demoApp.screens.feedback.type = "DeliveryDate"
}

export const SelectOrder: OvlAction<string> = (value, { state }) => {
  state.demoApp.screens.orderdetail.selectedOrder = value
}
