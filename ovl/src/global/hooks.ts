//Screen Functions ###################################
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
export const FormShow = "FormShow"
// gets called when a form gets rerendered
export const FormAfterRender = "FormAfterRender"
// gets called when a form field is changed
export const FormValidate = "FormValidate"
// gets called when a form field is changed and successfully validated
export const FormChanged = "FormChanged"
// gets called when formdata is copied/duplicated
export const FormCopy = "FormCopy"
// gets called when formdata is added
export const FormAdd = "FormAdd"
// gets called for displaying row hints/status (warning,...)
export const FormStatus = "FormStatus"

// gets called when a form/row is selected and controls the row edit enabled
// return a string explaining why it can not be done
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
export const FormCustomFilter = "Form_%_Filter"
// custom sort function
export const FormCustomSort = "Form_%_Sort"
// defines custom column functions (eg. goto valid values)

export const FormCustomColumnFn = "FormCustomColumnFn_%"

//Form Field Functions ####################################
// defines the list of ListControl and Option so far
export const FieldGetList = "Field_%_GetList"
// refines the list e.g. upon a row criteria
export const FieldGetFilteredList = "Field_%_GetFilteredList"
// lets you modify the post body of the lookup request
export const FieldLookupPostData = "Field_%_LookupPostData"
// if a field should be displayed as readonly
export const FieldIsReadOnly = "Field_%_IsReadOnly"
// if a field should not be displayed. Make sure to return a FieldVisibilty - Type
export const FieldIsVisible = "Field_%_IsVisible"
// // if you would like to have a custom label/columnheader text on table/view/edit-views
// export const FieldGetLabelText = "Field_%_GetLabelText"

// if you would like to do the rendering of a label/columnheader on your own
export const FieldGetValueRender = "Field_%_GetValueRender"
// if you would like to do the rendering of a column header
export const FieldGetLabelRender = "Field_%_GetLabelRender"

// custom title on the detailview form
export const ViewGetCaptionRender = "ViewGetCaptionRender"

// custom title on the bigedit form
export const EditGetCaptionRender = "EditGetCaptionRender"

// // custom label on bigedit form
// export const EditGetLabelRender = "Edit_%_GetLabelRender"

// custom value on bigedit form. you are also responsible for rendering the label
// check existing controls to see what events  and stuff you need to fire
export const EditGetLabelAndValueRender = "Edit_%_GetLabelAndValueRender"

// to style the header and row cells in tableview
// this functions must return a object whose key is the fieldKey and the value is the custom classname to set
export const ViewRowCellClass = "ViewRowCellClass"
export const ViewHeaderCellClass = "ViewHeaderCellClass"
// now the eventhandler if the user selected/clicked the cell
export const FieldRowCellSelectedHandler = "Field_%_RowCellSelectedHandler"
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
