//Screen Functions ###################################

import { LookupListPostData } from "../library/Forms/Controls/helpers"
import {
  ListFnReturnValue,
  TableDef,
  TableData,
  ViewRowDef,
  EditRowDef,
  EditMode,
  DisplayMode,
  ColumnDisplayDef,
  RowStatus,
  SelectedCustomFunctionResult,
} from "../library/Table/Table"
import { FormState, Field } from "../library/Forms/actions"
import { TemplateResult } from "lit-html"
import { CellClass } from "../library/Table/Row"
import { TableTesting } from "../../../test/src/shared/TableTesting/state"
import { OvlBaseElement } from "../library/OvlBaseElement"

// gets called when user navigates into a screen
export const ScreenNavigateIn = "ScreenNavigateIn"
// gets called when user navigates out of a screen
export const ScreenNavigateOut = "ScreenNavigateOut"
// gets called when screen first time gets shown
export const ScreenShow = "ScreenShow"

//Detailview Functions
// gets called when detailview is shown
export const ViewShow = "ViewShow"
// gets called whenever detailview rendered
export const ViewAfterRender = "ViewAfterRender"

//Form Functions ####################################
// gets called when a form first time is shown
export type FormShow_Type = {
  formState: FormState
  comp: OvlBaseElement
}
export const FormShow = "FormShow"
// gets called when a form gets rerendered
export type FormAfterRender_Type = {
  formState: FormState
  comp: OvlBaseElement
}
export const FormAfterRender = "FormAfterRender"
// gets called when a form field is changed
export const FormValidate = "FormValidate"
// gets called when a form field is changed and successfully validated
export const FormChanged = "FormChanged"
// gets called when formdata is copied/duplicated
export type FormCopy_Type = {
  key: string
  newRow: { [key: string]: {} }
  tableDef: TableDef
  tableData: TableData
}
export const FormCopy = "FormCopy"

// gets called when formdata is added
export type FormAdd_Type = {
  key: string
  newRow: { [key: string]: {} }
  tableDef: TableDef
  tableData: TableData
}
export const FormAdd = "FormAdd"

// gets called for displaying row hints/status (warning,...)
export type FormStatus_Type = {
  rowKey: string
  tableDef: TableDef
  tableData: TableData
}
export type FormStatus_ReturnType = Promise<RowStatus>
export const FormStatus = "FormStatus"

export type FormCustomFn_Type = {
  rowKey: string
  def: TableDef
  data: TableData
  isLastOrOnlyOne: boolean
  startedFromSelectedResult: SelectedCustomFunctionResult
}
export const FormCustomFn = "FormCustomFn%"

// gets called when a form/row is selected and controls the row edit enabled
// return a string explaining why it can not be done
export type FormCan_Type = {
  rowKey: string
  tableDef: TableDef
  tableData: TableData
}
export type FormCan_ReturnType = Promise<string>
export const FormCanEdit = "FormCanEdit"
// gets called when a form/row is selected and controls the row delete enabled
// return a string explaining why it can not be done
export const FormCanDelete = "FormCanDelete"
// gets called when a form/row is selected and controls the row copy/duplicate enabled
// return a string explaining why it can not be done
export const FormCanCopy = "FormCanCopy"
// gets called when a form/row is selected and controls the "More ..." Button which opens the FormSettings enabled
// return a string explaining why it can not be done
export const FormCanMore = "FormCanMore"
// gets called when a form/row is selected and controls the "Detailview" Button which opens the Detailview form
export const FormCanDetail = "FormCanDetail"
// defines custom form functionalities enabled
// return a string explaining why it can not be done
export const FormCanCustom = "FormCan%"

// custom filter function
export type FormFilter_Type = {
  def: TableDef
  data: TableData
  row: TableTesting
}
export type FormFilter_ReturnType = boolean
export const FormCustomFilter = "Form_%_Filter"
// custom sort function
export const FormCustomSort = "Form_%_Sort"

// defines custom column functions (eg. goto valid values)
export type FormCustomColumnFn_Type = {
  fnName: string
  columnKey: string
  def: TableDef
}
export const FormCustomColumnFn = "FormCustomColumnFn_%"

//Form Field Functions ####################################
// defines the list of ListControl and Option so far
export type FieldGetList_Type = { [key: string]: {} }
export type FieldGetList_ReturnType = ListFnReturnValue
export const FieldGetList = "Field_%_GetList"

// refines the list e.g. upon a row criteria
export type FieldGetFilteredList_Type = {
  list: ListFnReturnValue
  formState: FormState
}
export type FieldGetFilteredList_ReturnType = string[]
export const FieldGetFilteredList = "Field_%_GetFilteredList"

// lets you modify the post body of the lookup request
export type FieldLookupPostData_Type = {
  lookupData: LookupListPostData
  row: {}
}
export const FieldLookupPostData = "Field_%_LookupPostData"

// if a field should be displayed as readonly
export const FieldIsReadOnly = "Field_%_IsReadOnly"
// if a field should not be displayed. Make sure to return a FieldVisibilty - Type
export const FieldIsVisible = "Field_%_IsVisible"

// if you would like to do the rendering of a cell value on your own
export type FieldGetValueRender_Type = {
  columnKey: string
  row: TableTesting
  namespace: string
  columnsDef: { [key: string]: ColumnDisplayDef }
  align: string
  displayMode: DisplayMode
}
export type FieldGetValueRender_ReturnType = TemplateResult
export const FieldGetValueRender = "Field_%_GetValueRender"

// if you would like to do the rendering of a column header
export type FieldGetLabelRender_Type = {
  columnKey: string
  caption: string
  align: string
  displayMode: DisplayMode
}
export type FieldGetLabelRender_ReturnType = TemplateResult
export const FieldGetLabelRender = "Field_%_GetLabelRender"

// custom title on the detailview form
export type ViewGetCaptionRender_Type = { caption: string; row: ViewRowDef }
export type ViewGetCaptionRender_ReturnType = TemplateResult
export const ViewGetCaptionRender = "ViewGetCaptionRender"

// custom title on the bigedit forms
export type EditGetCaptionRender_Type = {
  caption: string
  row: EditRowDef
  mode: EditMode
}
export type EditGetCaptionRender_ReturnType = TemplateResult
export const EditGetCaptionRender = "EditGetCaptionRender"

// custom value on bigedit form. you are also responsible for rendering the label
// check existing controls to see what events  and stuff you need to fire
// easiest is to copy the existing custom element and change it (eg. textbox.ts)
export type EditGetLabelAndValueRenderer_Type = {
  field: Field
  customHeaderCellClass: CellClass
  customRowCellClass: CellClass
  id: string
  readonly: boolean
}
export type EditGetLabelAndValueRenderer_ReturnType = TemplateResult
export const EditGetLabelAndValueRender = "Edit_%_GetLabelAndValueRender"

// to style the header and row cells in tableview
// this functions must return a object whose key is the fieldKey and the value is the custom classname to set
export type ViewRowCellClass_Type = {
  def: TableDef
  row: TableTesting
  isMobile: boolean
  displayMode: DisplayMode
  formState?: FormState
}
export type ViewRowCellClass_ReturnType = {
  [key in keyof TableTesting]?: CellClass
}
export const ViewRowCellClass = "ViewRowCellClass"

export type ViewHeaderCellClass_Type = {
  def: TableDef
  isMobile: boolean
  displayMode: DisplayMode
}
export type ViewHeaderCellClass_ReturnType = {
  [key in keyof TableTesting]?: CellClass
}
export const ViewHeaderCellClass = "ViewHeaderCellClass"

// must return a lit-Template and a indication if it replaces all or just the body
export const ViewCustomRender = "ViewCustom_%_Render"

export const ViewCustomTabRender = "ViewCustomTab_%_Render"
export const ViewTabHeaderRender = "ViewTab_%_HeaderRender"
export const ViewTabFooterRender = "ViewTab_%_FooterRender"

export const EditCustomTabRender = "EditCustomTab_%_Render"
export const EditTabHeaderRender = "EditTab_%_HeaderRender"
export const EditTabFooterRender = "EditTab_%_FooterRender"

// now the eventhandler if the user selected/clicked the cell
export type FieldRowCellSelectedHandler_Type = {
  classList: DOMTokenList
  def: TableDef
  data: TableData
  rowKey: string
  displayMode: DisplayMode
  formState: FormState
}
export type FieldRowCellSelectedHandler_ReturnType = Promise<boolean>
export const FieldRowCellSelectedHandler = "Field_%_RowCellSelectedHandler"

export type FieldHeaderCellSelectedHandler_Type = {
  classList: DOMTokenList
  def: TableDef
  displayMode: DisplayMode
}
export type FieldHeaderCellSelectedHandler_ReturnType = Promise<boolean>
export const FieldHeaderCellSelectedHandler =
  "Field_%_HeaderCellSelectedHandler"

//Form Save/Delete/Postback Functions ####################################
// provide your complete form postback to server logic here if you don't wanna use the default
export const FormCustomSave = "FormCustomSave"
// gets called before the form gets saved/posted back to the server
export const FormBeforeSave = "FormBeforeSave"
// if you would like to process save errors yourself
export const FormSaveError = "FormSaveError"
// gets called after save
export const FormAfterSave = "FormAfterSave"
// if you would like to process delete errors yourself
export const FormDeleteError = "FormDeleteError"
// if you would like to do smth after delete
export const FormAfterDelete = "FormAfterDelete"
