import { FormState } from "../../../../../ovl/src/library/forms/actions"
import { OvlAction } from "../../../../../ovl/src"
import {
  FormShow_Type,
  FormAfterRender_Type,
} from "../../../../../ovl/src/global/hooks"
import { SetFocus } from "../../../../../ovl/src/global/globals"

export const FormShow: OvlAction<FormShow_Type> = async ({ formState }) => {
  console.log("hello from formshow hook. setting focus to item group")
  //@ts-ignore
  if (formState.fields["U_ItmsGrpCod"]) {
    SetFocus(document.getElementById(formState.fields["U_ItmsGrpCod"].id))
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
