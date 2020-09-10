import {
  FieldGetList_Type,
  FieldGetList_ReturnType,
  FieldGetFilteredList_Type,
  FieldGetFilteredList_ReturnType,
  FieldLookupPostData_Type,
} from "../../../../../ovl/src/global/hooks"
import { OvlAction } from "../../../../../ovl/src/ovlTypes"

// some list functions
export const Field_U_ItemCode_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return state.app.testtables.lookups.U_ItemCode
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
  return state.app.testtables.lookups.U_ItmsGrpCod
}

export const Field_U_ParentCode_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return {
    data: state.app.testtables.tableTesting.data,
    lookupDef: {
      Code: { type: "text", translationKey: "PortalColumnCode" },
      U_Alpha: { type: "text", translationKey: "PortalColumnU_Alpha" },
      U_Date: { type: "date", translationKey: "PortalColumnU_Date" },
      U_Int: { type: "int", translationKey: "PortalColumnU_Int" },
    },
    index: state.app.testtables.tableTesting.index,
  }
}

export const Field_U_ParentCode2_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return {
    data: state.app.testtables.tableTesting.data,
    lookupDef: {
      Code: { type: "text", translationKey: "PortalColumnCode" },
      U_Alpha: { type: "text", translationKey: "PortalColumnU_Alpha" },
    },
    // we need index here as well because its a table for "working with" not a table for lookup purposes...
    index: state.app.testtables.tableTesting.index,
  }
}

export const Field_U_Select1_GetList: OvlAction<
  FieldGetList_Type,
  FieldGetList_ReturnType
> = ({ row }, { state }) => {
  return {
    data: {
      SelectKey1: { Key: "SelectKey1" },
      SelectKey2: { Key: "SelectKey2" },
    },
    lookupDef: {
      Key: { type: "text", translationKey: "PortalKeySelect" },
    },
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
