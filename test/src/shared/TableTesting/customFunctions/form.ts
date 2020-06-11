import { FormState } from "../../../../../ovl/src/library/forms/actions"
import { OvlState, OvlActions, OvlEffects } from "../../../../../ovl/src"

export const FormShow = async (
  formState: FormState,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log("hello from formshow hook. setting focus to item group")
  //@ts-ignore
  if (formState.fields["U_ItmsGrpCod"]) {
    document.getElementById(formState.fields["U_ItmsGrpCod"].id).focus()
  }
}

export const FormAfterRender = async (
  formState: FormState,
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => {
  console.log(
    "hello from tabletesting formafterrender hook. you may do some crazy stuff in here"
  )
}
