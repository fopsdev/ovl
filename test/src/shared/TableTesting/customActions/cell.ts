// import { html } from "../../../../../ovl/node_modules/lit-html/lit-html"
// import { DialogOk, SnackAdd } from "../../../../../ovl/src/library/helpers"
// import { getDisplayValue } from "../../../../../ovl/src/library/Table/helpers"

// import { OvlAction } from "../../../../../ovl/src"
// import {
//   EditGetLabelAndValueRenderer_Type,
//   EditGetLabelAndValueRenderer_ReturnType,
//   ViewGetCaptionRender_Type,
//   ViewGetCaptionRender_ReturnType,
//   EditGetCaptionRender_Type,
//   EditGetCaptionRender_ReturnType,
//   FieldGetLabelRender_Type,
//   FieldGetLabelRender_ReturnType,
//   FieldGetValueRender_Type,
//   FieldGetValueRender_ReturnType,
//   ViewRowCellClass_Type,
//   ViewRowCellClass_ReturnType,
//   FieldRowCellSelectedHandler_Type,
//   FieldRowCellSelectedHandler_ReturnType,
//   ViewHeaderCellClass_Type,
//   ViewHeaderCellClass_ReturnType,
//   FieldHeaderCellSelectedHandler_Type,
//   FieldHeaderCellSelectedHandler_ReturnType,
// } from "../../../../../ovl/src/global/hooks"

// export const Edit_U_Memo_GetLabelAndValueRender: OvlAction<
//   EditGetLabelAndValueRenderer_Type,
//   EditGetLabelAndValueRenderer_ReturnType
// > = ({ field, customHeaderCellClass, customRowCellClass, id, readonly }) => {
//   // use the existing custom element for now.... but its possible to introduce new elements here
//   if (readonly) {
//     return html`${field.value}`
//   } else {
//     return html`
//       <ovl-textarea
//         id="${id}"
//         class="fd-form__item "
//         .props=${() => {
//           return {
//             field,
//             customHeaderCellClass,
//             customRowCellClass,
//           }
//         }}
//       >
//       </ovl-textarea>
//     `
//   }
// }

// export const ViewGetCaptionRender: OvlAction<
//   ViewGetCaptionRender_Type,
//   ViewGetCaptionRender_ReturnType
// > = ({ caption, row }, { state }) => {
//   return html`Custom Caption ${caption}`
// }

// export const EditGetCaptionRender: OvlAction<
//   EditGetCaptionRender_Type,
//   EditGetCaptionRender_ReturnType
// > = ({ caption, row, mode }, { state }) => {
//   return html`Custom Caption ${caption}`
// }

// export const Field_U_ItemCode_GetLabelRender: OvlAction<
//   FieldGetLabelRender_Type,
//   FieldGetLabelRender_ReturnType
// > = ({ columnKey, caption, align, displayMode }, { state }) => {
//   if (displayMode === "Detailview") {
//     return html`Name(Code)`
//   }
//   if (displayMode === "Table") {
//     return html`${caption}(Code)`
//   }
//   if (displayMode === "Edit") {
//     return html`${caption}(C)`
//   }
// }

// export const Field_U_ItemCode_GetValueRender: OvlAction<
//   FieldGetValueRender_Type,
//   FieldGetValueRender_ReturnType
// > = (
//   { columnKey, row, namespace, columnsDef, align: string, displayMode },
//   { state }
// ) => {
//   let itemCodeValue = getDisplayValue(
//     "U_ItemCode",
//     columnsDef["U_ItemCode"],
//     row,
//     namespace
//   )

//   if (displayMode.startsWith("Edit")) {
//     return html`(${row.U_ItemCode})`
//   } else {
//     return html`${itemCodeValue} (${row.U_ItemCode})`
//   }
// }

// export const Field_MobileSummary_GetLabelRender: OvlAction<
//   FieldGetLabelRender_Type,
//   FieldGetLabelRender_ReturnType
// > = ({ columnKey, caption, align, displayMode }, { state }) => {
//   return html`${caption}(has more details...)</b>`
// }

// export const Field_U_Alpha_GetValueRender: OvlAction<
//   FieldGetValueRender_Type,
//   FieldGetValueRender_ReturnType
// > = (
//   { columnKey, row, namespace, columnsDef, align, displayMode },
//   { state }
// ) => {
//   let u_alpha: string = <string>row.U_Alpha
//   let additionalComment = ""
//   if (u_alpha && u_alpha.toLowerCase().indexOf("todo") > -1) {
//     additionalComment = "(hat todos)"
//   }
//   if (displayMode.startsWith("Edit")) {
//     if (!additionalComment) {
//       return null
//     }
//     return html`<b>${additionalComment}</b>`
//   } else {
//     return html`${u_alpha} <b>${additionalComment}</b>`
//   }
// }

// export const Field_MobileSummary_GetValueRender: OvlAction<
//   FieldGetValueRender_Type,
//   FieldGetValueRender_ReturnType
// > = (
//   { columnKey, row, namespace, columnsDef, align, displayMode },
//   { state }
// ) => {
//   let u_AlphaValue = getDisplayValue(
//     "U_Alpha",
//     columnsDef["U_Alpha"],
//     row,
//     namespace
//   )
//   let u_ItemCodeValue = getDisplayValue(
//     "U_ItemCode",
//     columnsDef["U_ItemCode"],
//     row,
//     namespace
//   )

//   let u_DateValue = getDisplayValue(
//     "U_Date",
//     columnsDef["U_Date"],
//     row,
//     namespace
//   )

//   return html` <b>${u_DateValue}</b> ${u_AlphaValue} ${u_ItemCodeValue} `
// }

// export const ViewRowCellClass: OvlAction<
//   ViewRowCellClass_Type,
//   ViewRowCellClass_ReturnType
// > = ({ row, isMobile, displayMode, formState }, { state }) => {
//   let val
//   if (displayMode.startsWith("Edit")) {
//     val = formState.fields["U_Decimal"].convertedValue
//     //  formState.fields["U_Decimal"].value
//   } else {
//     val = row.U_Decimal
//   }

//   if (val > 100) {
//     return {
//       U_Decimal: {
//         className: "testrowcell",
//         tooltip: "Pay attention!,greater than 100!",
//       },
//     }
//   }
// }

// export const Field_U_Decimal_RowCellSelectedHandler: OvlAction<
//   FieldRowCellSelectedHandler_Type,
//   FieldRowCellSelectedHandler_ReturnType
// > = async (
//   { classList, def, data, rowKey, displayMode, formState },
//   { state }
// ) => {
//   // for this sample we just wanna make those cells clickable which has a specific custom class (see TableRowCellClass hook)
//   if (classList.contains("testrowcell")) {
//     let val
//     if (displayMode.startsWith("Edit")) {
//       val = formState.fields["U_Decimal"].value
//       SnackAdd("U_Decimal selected! Value:" + val)
//     } else {
//       val = getDisplayValue(
//         "U_Decimal",
//         def.columns["U_Decimal"],
//         data.data[rowKey],
//         def.namespace
//       )
//       await DialogOk("U_Decimal selected! Value:" + val)
//     }

//     // do not use default event (select row in cas called from table)
//     return false
//   }
//   return true
// }

// export const ViewHeaderCellClass: OvlAction<
//   ViewHeaderCellClass_Type,
//   ViewHeaderCellClass_ReturnType
// > = ({ def, isMobile, displayMode }, { state }) => {
//   return {
//     U_ItemCode: {
//       className: "testheadercell",
//       tooltip: "Hey i'm a custom Tooltip!",
//     },
//   }
// }

// export const Field_U_ItemCode_HeaderCellSelectedHandler: OvlAction<
//   FieldHeaderCellSelectedHandler_Type,
//   FieldHeaderCellSelectedHandler_ReturnType
// > = async ({ classList, def, displayMode }, { state }) => {
//   if (classList.contains("testheadercell")) {
//     await DialogOk("Header U_ItemCode selected!")
//     // do not use default event (open tableheader menu)
//     return false
//   }
//   return true
// }
