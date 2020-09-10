import { T } from "../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../ovl/src/ovlTypes"

type OrderFeedbackState = {
  message: string
}
export const PreparePositiveFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.app.screens.orderdetail.selectedOrder
  let order = state.app.orderDetail.orders[key]
  state.app.screens.feedback.cardCode = order.cardCode
  state.app.screens.feedback.refNum = order.refNum
  state.app.screens.feedback.message = value.message
  state.app.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalPositiveFeedback")
  state.app.screens.feedback.orderDate = order.docDate
  state.app.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.app.screens.feedback.orderNum = key
  state.app.screens.feedback.type = "OrderPositive"
}

export const PrepareNegativeFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.app.screens.orderdetail.selectedOrder
  let order = state.app.orderDetail.orders[key]
  state.app.screens.feedback.cardCode = order.cardCode
  state.app.screens.feedback.refNum = order.refNum
  state.app.screens.feedback.message = value.message
  state.app.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalNegativeFeedback")
  state.app.screens.feedback.orderDate = order.docDate
  state.app.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.app.screens.feedback.orderNum = key
  state.app.screens.feedback.type = "OrderNegative"
}

export const PrepareDeliveryDateFeedback: OvlAction<OrderFeedbackState> = (
  value,
  { state }
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.app.screens.orderdetail.selectedOrder
  let order = state.app.orderDetail.orders[key]
  state.app.screens.feedback.cardCode = order.cardCode
  state.app.screens.feedback.refNum = order.refNum
  state.app.screens.feedback.message = value.message
  state.app.screens.feedback.title =
    T("PortalOrderFeedback") + " " + T("PortalDeliveryDateFeedback")
  state.app.screens.feedback.orderDate = order.docDate
  state.app.screens.feedback.orderDeliveryDate = order.deliveryDate
  state.app.screens.feedback.orderNum = key
  state.app.screens.feedback.type = "DeliveryDate"
}

export const SelectOrder: OvlAction<string> = (value, { state }) => {
  state.app.screens.orderdetail.selectedOrder = value
}
