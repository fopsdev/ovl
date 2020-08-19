import { OvlAction } from "../../../../../ovl/src"
import {
  FieldGetList_Type,
  FieldGetList_ReturnType,
  FieldGetFilteredList_Type,
  FieldGetFilteredList_ReturnType,
  FieldLookupPostData_Type,
} from "../../../../../ovl/src/global/hooks"

// some list functions
export const Field_U_ItemCode_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return state.demoApp.testtables.lookups.U_ItemCode
}

export const Field_U_ItemCode_LookupPostData: OvlAction<FieldLookupPostData_Type> = ({
  row,
  lookupData,
}) => {
  lookupData.paramList.U_ItmsGrpCod = row["U_ItmsGrpCod"]
}

export const Field_U_ItmsGrpCod_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return state.demoApp.testtables.lookups.U_ItmsGrpCod
}

export const Field_U_ParentCode_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return {
    data: state.demoApp.testtables.tableTesting.data,
    lookupDef: state.demoApp.testtables.tableTesting.lookupDef,
    index: state.demoApp.testtables.tableTesting.index,
  }
}

export const Field_U_ParentCode2_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return {
    data: state.demoApp.testtables.tableTesting.data,
    lookupDef: state.demoApp.testtables.tableTesting.lookupDef2,
    // we need index here as well because its a table for "working with" not a table for lookup purposes...
    index: state.demoApp.testtables.tableTesting.index,
  }
}

export const Field_U_ItemCode_GetFilteredList: OvlAction<
  FieldGetFilteredList_Type,
  FieldGetFilteredList_ReturnType
> = ({ list, formState }) => {
  return Object.keys(list.data).filter((f) => {
    return (
      !formState.fields.U_ItmsGrpCod.convertedValue ||
      list.data[f]["ItmsGrpCod"] ===
        formState.fields.U_ItmsGrpCod.convertedValue
    )
  })
}
