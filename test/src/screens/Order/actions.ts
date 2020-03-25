import { Action } from "overmind"
import { T } from "../../global/globals"
type OrderFeedbackState = {
  message: string
}
export const PreparePositiveFeedback: Action<OrderFeedbackState> = (
  { state },
  value
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.ovl.screens.screens.Orderdetail.selectedOrder
  let order = state.portal.orderDetail.orders[key]
  state.ovl.screens.screens.Feedback.cardCode = order.cardCode
  state.ovl.screens.screens.Feedback.refNum = order.refNum
  state.ovl.screens.screens.Feedback.message = value.message
  state.ovl.screens.screens.Feedback.title =
    T("AppOrderFeedback") + " " + T("AppPositiveFeedback")
  state.ovl.screens.screens.Feedback.orderDate = order.docDate
  state.ovl.screens.screens.Feedback.orderDeliveryDate = order.deliveryDate
  state.ovl.screens.screens.Feedback.orderNum = key
  state.ovl.screens.screens.Feedback.type = "OrderPositive"
}

export const PrepareNegativeFeedback: Action<OrderFeedbackState> = (
  { state },
  value
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.ovl.screens.screens.Orderdetail.selectedOrder
  let order = state.portal.orderDetail.orders[key]
  state.ovl.screens.screens.Feedback.cardCode = order.cardCode
  state.ovl.screens.screens.Feedback.refNum = order.refNum
  state.ovl.screens.screens.Feedback.message = value.message
  state.ovl.screens.screens.Feedback.title =
    T("AppOrderFeedback") + " " + T("AppNegativeFeedback")
  state.ovl.screens.screens.Feedback.orderDate = order.docDate
  state.ovl.screens.screens.Feedback.orderDeliveryDate = order.deliveryDate
  state.ovl.screens.screens.Feedback.orderNum = key
  state.ovl.screens.screens.Feedback.type = "OrderNegative"
}

export const PrepareDeliveryDateFeedback: Action<OrderFeedbackState> = (
  { state },
  value
) => {
  // if feedback is left "" empty it shouldn't be displayed
  let key = state.ovl.screens.screens.Orderdetail.selectedOrder
  let order = state.portal.orderDetail.orders[key]
  state.ovl.screens.screens.Feedback.cardCode = order.cardCode
  state.ovl.screens.screens.Feedback.refNum = order.refNum
  state.ovl.screens.screens.Feedback.message = value.message
  state.ovl.screens.screens.Feedback.title =
    T("AppOrderFeedback") + " " + T("AppDeliveryDateFeedback")
  state.ovl.screens.screens.Feedback.orderDate = order.docDate
  state.ovl.screens.screens.Feedback.orderDeliveryDate = order.deliveryDate
  state.ovl.screens.screens.Feedback.orderNum = key
  state.ovl.screens.screens.Feedback.type = "DeliveryDate"
}

export const SelectOrder: Action<string> = ({ state }, value) => {
  state.ovl.screens.screens.Orderdetail.selectedOrder = value
}
