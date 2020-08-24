import { OvlAction, logState } from "../../../../../ovl/src"
import {
  FieldGetList_Type,
  FieldGetList_ReturnType,
  FieldGetFilteredList_Type,
  FieldGetFilteredList_ReturnType,
  FieldLookupPostData_Type,
} from "../../../../../ovl/src/global/hooks"
import { GetSimpleSelectList } from "../../../../../ovl/src/library/Forms/Controls/helpers"

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

const SelectList = {
  SelectKey1: { SelectKey: "SelectKey1", SelectDisplay: "Select Value 1" },
  SelectKey2: { SelectKey: "SelectKey2", SelectDisplay: "Select Value 2" },
  SelectKey3: { SelectKey: "SelectKey3", SelectDisplay: "Select Value 3" },
}

export const Field_U_Select1_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return { data: SelectList }
}

export const Field_U_Select2_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return { data: SelectList }
}

export const Field_U_Select3_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return { data: SelectList }
}

export const Field_U_Select4_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  let res = GetSimpleSelectList(["Simple1", "Simple2", "Simple3"])
  console.log(res)
  return res
}
