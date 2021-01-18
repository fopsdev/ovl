import {
  FormShow_Type,
  FormAfterRender_Type,
} from "../../../../../ovl/src/global/hooks"
import { SetFocus } from "../../../../../ovl/src/global/globals"
import { OvlAction } from "../../../../../ovl/src/index"

export const FormShow: OvlAction<FormShow_Type> = async ({ formState }) => {
  console.log("hello from formshow hook. setting focus test")

  if (formState.tableDefId === "tab1") {
    formState.fieldToFocus = "U_ItmsGrpCod"
  } else if (formState.tableDefId === "tab2") {
    formState.fieldToFocus = "U_ItemCode"
  } else if (formState.tableDefId === "tab3") {
    formState.fieldToFocus = "U_Decimal"
  }
}

export const FormAfterRender: OvlAction<FormAfterRender_Type> = async (
  { formState, comp },
  { state }
) => {
  console.log(
    "hello from tabletesting formafterrender hook. you may do some crazy stuff in here"
  )
}
