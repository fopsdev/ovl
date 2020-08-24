import {
  EditGetCaptionRender,
  Edit_U_Memo_GetLabelAndValueRender,
  Field_MobileSummary_GetLabelRender,
  Field_MobileSummary_GetValueRender,
  Field_U_Alpha_GetValueRender,
  Field_U_Decimal_RowCellSelectedHandler,
  Field_U_ItemCode_GetLabelRender,
  Field_U_ItemCode_GetValueRender,
  Field_U_ItemCode_HeaderCellSelectedHandler,
  ViewGetCaptionRender,
  ViewHeaderCellClass,
  ViewRowCellClass,
} from "./customActions/cell"
import { FormCustomColumnFn_ValidValues } from "./customActions/column"
import {
  FormCustom_alphaStartsWithA_Filter,
  FormCustom_alphaStartsWithB_Filter,
  FormCustom_memoContainsTest_Filter,
  FormCustom_memoContainsText_Filter,
} from "./customActions/filter"
import { FormAfterRender, FormShow } from "./customActions/form"
import {
  Field_U_ItemCode_GetFilteredList,
  Field_U_ItemCode_GetList,
  Field_U_ItemCode_LookupPostData,
  Field_U_ItmsGrpCod_GetList,
  Field_U_ParentCode2_GetList,
  Field_U_ParentCode_GetList,
  Field_U_Select1_GetList,
} from "./customActions/list"
import {
  FormAdd,
  FormCanDelete,
  FormCanEdit,
  FormCopy,
  FormCustomFnSelect,
  FormStatus,
} from "./customActions/row"
import {
  FormCustom_alphaThenMemo_Sort,
  FormCustom_memoThenAlpha_Sort,
  FormCustom_onlyTest_Sort,
} from "./customActions/sort"
import { FormChanged, FormValidate } from "./customActions/validate"
import {
  ViewAfterRender,
  ViewCustomTab_TabX_Render,
  ViewCustom_tab1_Render,
  ViewShow,
} from "./customActions/view"

export let tabletesting = {
  EditGetCaptionRender,
  Edit_U_Memo_GetLabelAndValueRender,

  ViewRowCellClass,
  Field_MobileSummary_GetLabelRender,
  Field_MobileSummary_GetValueRender,
  Field_U_Alpha_GetValueRender,
  Field_U_Decimal_RowCellSelectedHandler,
  Field_U_ItemCode_GetFilteredList,
  Field_U_ItemCode_GetLabelRender,
  Field_U_ItemCode_GetList,
  Field_U_ItemCode_GetValueRender,
  Field_U_ItemCode_HeaderCellSelectedHandler,
  Field_U_ItemCode_LookupPostData,
  Field_U_ItmsGrpCod_GetList,
  Field_U_ParentCode2_GetList,
  Field_U_ParentCode_GetList,
  Field_U_Select1_GetList,
  FormAdd,
  FormAfterRender,
  FormCanDelete,
  FormCanEdit,
  FormChanged,
  FormCopy,
  FormCustom_alphaStartsWithA_Filter,
  FormCustom_alphaStartsWithB_Filter,
  FormCustom_alphaThenMemo_Sort,
  FormCustom_memoContainsTest_Filter,
  FormCustom_memoContainsText_Filter,
  FormCustom_memoThenAlpha_Sort,
  FormCustom_onlyTest_Sort,
  FormCustomColumnFn_ValidValues,
  FormCustomFnSelect,
  FormShow,
  FormStatus,
  FormValidate,
  ViewAfterRender,
  ViewCustomTab_TabX_Render,
  ViewCustom_tab1_Render,
  ViewGetCaptionRender,
  ViewHeaderCellClass,
  ViewShow,
}
