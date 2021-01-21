import { html, TemplateResult } from "lit-html"
import { ifDefined } from "../../../tracker/litdirectives/if-defined"

import { resolvePath, getDecimalValue } from "../../../global/globals"
import {
  FieldGetList,
  FieldGetList_Type,
  FieldGetList_ReturnType,
} from "../../../global/hooks"
import { SnackAdd } from "../../helpers"
import { OvlBaseElement } from "../../OvlBaseElement"
import {
  ControlState,
  FilterHitList,
  GetCustomInfo,
  GetListDisplayValue,
  GetRowFromFormState,
} from "./helpers"
import { GetOutlineValidationHint } from "./uiValidationHelper"
import { ChangeField, OvlFormState } from "../actions"
import { DialogHolderParams } from "../../Dialog/OvlDialogHolder"
import { OvlState } from "../../.."
import { ChangeValue, RemoveFocus, SetFocus } from "../helper"

export type ListState = {
  serverEndpoint?: string
  displayField: string
  // please bear in mind that valueField will always be unique key of object. but we have it here so we can assign a type to it if its displayed at all in the selectlist
  valueField: string
  displayValueField?: boolean

  acceptEmpty?: boolean
  acceptOnlyListValues?: boolean
  isSelect?: boolean
}

export class OvlListControl extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  localList: TemplateResult
  hitListDialogBody: TemplateResult
  hitListDialogFooter: TemplateResult
  overrideDisplayValue: any
  directHitValue: any
  directHitDescription: any
  inputValueToProcess: any
  timer: any
  formState: OvlFormState

  // handleClearFilter(e: Event) {}
  handleCancel = (e: Event) => {
    this.actions.ovl.dialog.DialogClose("HitListDialog")
  }

  async handleListPopup(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    this.forceCloseLocalHitList()
    let field = this.field.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let listData: FieldGetList_ReturnType = resolvePath(
      this.actions.custom,
      formState.namespace
    )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
      row: GetRowFromFormState(formState),
    })

    let filterValue = ""
    // select should not filter just select items...
    if (!field.list.isSelect) {
      //@ts-ignore
      filterValue = document.getElementById(field.id).value
    }
    // only reach out to server if endpoint is maintained
    if (field.list.serverEndpoint) {
      await this.actions.ovl.internal.FillListControl({
        list: field.list,
        listData,
        filterValue,
        row: GetRowFromFormState(formState),
        namespace: formState.namespace,
        fieldId: field.fieldKey,
      })
    }
    let filteredKeys = FilterHitList(
      field.list,
      filterValue,
      formState,
      this.state,
      field.fieldKey
    ).filteredKeys
    if (filteredKeys.length < 1) {
      SnackAdd("Keine passenden Einträge gefunden", "Warning", 3000)
      return
    }

    this.hitListDialogFooter = html`
      <button
        @click=${this.handleCancel}
        title="Abbrechen"
        class="fd-button fd-button--negative"
      >
        <i class="sap-icon--decline"></i>
      </button>
    `
    this.hitListDialogBody = html`
      <ovl-hitlist
        .props=${(state) => {
          let listData: FieldGetList_ReturnType = resolvePath(
            this.actions.custom,
            formState.namespace
          )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
            row: GetRowFromFormState(formState),
          })

          return {
            fieldId: field.id,
            list: field.list,
            listData,
            filterValue,
            filteredKeys,
            type: "overlay",
            selectedCallback: this.selectedCallback,
          }
        }}
      ></ovl-hitlist>
    `

    this.actions.ovl.dialog.DialogOpen({
      dialogType: "HitListDialog",
      elementIdToFocusAfterOpen: this.field.field.id + "overlayovlhl_1",
    })
  }

  selectedCallback = async (selectedKey: string) => {
    if (this.state.ovl.dialogs.HitListDialog.visible) {
      this.actions.ovl.dialog.DialogClose("HitListDialog")
    }
    let field = this.field.field

    if (this.localList !== null) {
      this.inputElement.focus()
      // setTimeout(() => {
      //   let val = this.inputElement.value
      //   this.inputElement.setSelectionRange(0, val.length)
      //    this.inputElement.setSelectionRange(val.length, val.length)

      // }, 0)
    } else {
      this.state.ovl.dialogs.HitListDialog.elementIdToFocusAfterClose =
        "search" + this.field.field.id
    }

    if (selectedKey === "@@ovlcanceled" || selectedKey === "@@ovlescape") {
      this.forceCloseLocalHitList()
    } else {
      this.localList = null
      let dataList: FieldGetList_ReturnType = resolvePath(
        this.actions.custom,
        this.formState.namespace
      )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
        row: GetRowFromFormState(this.formState),
      })
      let writeBackValue = selectedKey
      if (dataList.index) {
        writeBackValue = dataList.data[selectedKey][field.list.valueField]
      }
      this.inputElement.value =
        dataList.data[selectedKey][field.list.displayField]
      ChangeValue(this, writeBackValue, field.id, false)
    }
  }

  handleGotFocusSearch(e: Event) {
    this.forceCloseLocalHitList()
    SetFocus(e.target, this.field.field.id)
  }
  // // same here

  // handleOnFocus(e: Event) {
  //   let event = new CustomEvent("ovlfocusin", {
  //     bubbles: true,
  //     detail: { id: this.field.field.id },
  //   })
  //   e.target.dispatchEvent(event)
  // }
  handleFocus(e: Event) {
    e.stopPropagation()
    if (this.localList) {
      this.forceCloseLocalHitList()
    }
    SetFocus(this, this.field.field.id)
  }
  async handleFocusOut(e: Event) {
    let field = this.field.field
    let fieldId = field.id
    //@ts-ignore
    let relatedTarget = e.relatedTarget
    // if related target is null or not one of the contain elements inside the div then the focus was moved out...
    // ... and we need to trigger our change event if needed
    let movedOut: boolean = false
    let idToCheck
    let focusInList = true
    if (relatedTarget) {
      idToCheck = relatedTarget.id
    }
    if (idToCheck && idToCheck.indexOf("ovlhl_") < 0) {
      this.overrideDisplayValue = undefined
      focusInList = false
    }

    if (relatedTarget === null) {
      movedOut = true
    } else {
      // check the ids
      if (idToCheck.indexOf(fieldId) < 0) {
        movedOut = true
      }
    }

    let valueToWriteBack = this.directHitValue
    let valueForDescription = this.directHitDescription

    if (valueToWriteBack !== undefined && !focusInList) {
      this.overrideDisplayValue = undefined

      ChangeValue(this, valueToWriteBack, fieldId, false)
      this.inputElement.value = valueForDescription
      this.directHitValue = undefined
    }
    if (movedOut) {
      RemoveFocus(this, field.id)
      this.forceCloseLocalHitList()
    }
  }
  handleDelete(e: Event) {
    this.actions.ovl.internal.SetField({
      fieldId: this.field.field.fieldKey,
      value: "",
      formState: this.formState,
    })
    this.inputElement.focus()
  }
  handleSearchKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter") {
      this.handleListPopup(e)
    }
  }
  async handleKey(e: KeyboardEvent) {
    if (
      e.key === "Shift" ||
      e.key === "Home" ||
      e.key === "Tab" ||
      e.key === "End" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp"
    ) {
      return
    }

    // if (e.key === "Enter" && this.localList) {
    //   this.forceCloseLocalHitList()
    // }

    let waitTime = 500

    clearTimeout(this.timer)

    let openLocalList = false
    if (e.key === "ArrowDown" || e.key === "Enter") {
      openLocalList = true
      waitTime = 0
    }

    let field = this.field.field

    if (e.key === "Escape") {
      this.forceCloseLocalHitList()
      return
    }
    // this.inputValueToProcess = this.inputElement.value
    // console.log(this.inputValueToProcess)
    let filterValue = this.inputElement.value
    let filteredRes = FilterHitList(
      field.list,
      filterValue,
      this.formState,
      this.state,
      field.fieldKey,
      10
    )
    let filteredKeys = filteredRes.filteredKeys

    this.overrideDisplayValue = filterValue

    this.directHitValue = filteredRes.directValue
    this.directHitDescription = filteredRes.directDescription
    if (filteredKeys.length !== 1 && this.directHitValue === undefined) {
      ChangeValue(this, filterValue, field.id)
    }

    if (openLocalList) {
      if (filteredKeys.length === 1) {
        openLocalList = false
        if (this.localList) {
          this.forceCloseLocalHitList()
        }
        document.getElementById("search" + field.id).focus()

        return
      }
    }

    this.timer = setTimeout(async () => {
      if (filteredKeys.length > 0) {
        let wasAlreadyOpen = false
        if (this.localList !== null) {
          wasAlreadyOpen = true
          this.forceCloseLocalHitList()
        }
        //we have a list so present it to the user
        if (document.activeElement === this.inputElement) {
          this.localList = html`
            <ovl-hitlist
              id="ovl-hitlist"
              .props=${(state) => {
                let listData: FieldGetList_ReturnType = resolvePath(
                  this.actions.custom,
                  this.formState.namespace
                )[FieldGetList.replace("%", field.fieldKey)](<
                  FieldGetList_Type
                >{
                  row: GetRowFromFormState(this.formState),
                })
                return {
                  fieldId: field.id,
                  list: field.list,
                  listData,
                  filterValue,
                  filteredKeys,
                  type: "inline",
                  animation: !wasAlreadyOpen,
                  selectedCallback: this.selectedCallback,
                }
              }}
            ></ovl-hitlist>
          `
          await this.doRender()
        }

        if (openLocalList) {
          let focusEl = document.getElementById(
            this.field.field.id + "inlineovlhl_1"
          )
          if (focusEl) {
            focusEl.focus()
          }
        }
      } else {
        this.forceCloseLocalHitList()
      }
    }, waitTime)
  }
  init() {
    this.field = this.props(this.state)
  }
  async getUI() {
    //SnackAdd("Rerender...")
    return this.track(() => {
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customInfo = GetCustomInfo(this.field.customRowCellClass)
      let displayValue = ""

      let getListFnName = FieldGetList.replace("%", field.fieldKey)
      displayValue = this.overrideDisplayValue

      if (displayValue === undefined && !this.localList) {
        displayValue = GetListDisplayValue(
          field.list,
          field.value,
          resolvePath(this.actions.custom, this.formState.namespace)[
            getListFnName
          ](<FieldGetList_Type>{
            row: GetRowFromFormState(this.formState),
          })
        )
      }

      let deleteButton
      if (!field.list.isSelect && field.convertedValue) {
        deleteButton = html`
          <span
            tabindex="-9999"
            id="delete${field.id}"
            @click=${(e) => this.handleDelete(e)}
            class="fd-input-group__addon sap-icon--decline ovl-formcontrol-input ovl-formcontrol-deletebutton ovl-formcontrol-listcontrol-deletebutton ovl-formcontrol-deletebutton__${field.fieldKey}"
          ></span>
        `
      }
      let hitListDialog
      if (
        this.state.ovl.dialogs.HitListDialog.visible &&
        this.hitListDialogBody
      ) {
        let dialogHolderParams: DialogHolderParams
        // tracking needs to be recorded on the hiolder object
        // thats why we use functions here to get the templates
        // to make it look nicer i even used methods for the different parts

        dialogHolderParams = {
          dialogParts: {
            footer: () => this.hitListDialogFooter,
            body: () => this.hitListDialogBody,
            closedCallbackFn: () => {
              this.hitListDialogBody = undefined
            },
            dismissedCallbackFn: (e) => {
              this.handleCancel(e)
            },
          },

          zIndex: 8,
          dialogType: "HitListDialog",
        }
        hitListDialog = html`<ovl-dialogholder
          .dialogHolderParams=${dialogHolderParams}
        ></ovl-dialogholder>`
      }
      let icon = "search"
      if (field.list.isSelect) {
        icon = "arrow-bottom"
      }

      return html`
        ${hitListDialog}
        <div
          class="ovl-listcontrol-main"
          @focusout=${(e) => this.handleFocusOut(e)}
        >
          <div
            class="ovl-formcontrol-container ovl-container-listbox ovl-container__${field.fieldKey} ${customInfo.customRowClassContainerName}"
          >
            <ovl-controllabel .props=${() => this.field}> </ovl-controllabel>
            <div
              class="fd-input-group ${GetOutlineValidationHint(
                field
              )} ${customInfo.customRowClassName} ovl-formcontrol-input"
            >
              <input
                title="${ifDefined(
                  customInfo.customRowTooltip
                    ? customInfo.customRowTooltip
                    : undefined,
                  this
                )}"
                spellcheck="false"
                autocomplete="nope"
                style="${field.ui && field.ui.align ? field.ui.align : ""}"
                +
                type="text"
                class="fd-input ovl-focusable fd-input-group__input ovl-formcontrol-input ovl-value__${field.fieldKey}"
                id="${field.id}"
                value="${displayValue}"
                .value="${displayValue}"
                @keyup=${(e) => this.handleKey(e)}
                @focus=${(e) => this.handleFocus(e)}
              />

              ${deleteButton}

              <span class="fd-input-group__addon">
                <span
                  tabindex="0"
                  id="search${field.id}"
                  @click=${(e) => this.handleListPopup(e)}
                  @touchend=${(e) => this.handleListPopup(e)}
                  @keyup=${(e) => this.handleSearchKeyDown(e)}
                  @focus=${(e) => this.handleGotFocusSearch(e)}
                  class="sap-icon--${icon} ovl-formcontrol-input ovl-formcontrol-searchbutton ovl-formcontrol-searchbutton__${field.fieldKey}"
                  role="presentation"
                ></span>
              </span>
            </div>

            ${this.localList}
            <ovl-controlcustomhint .props=${() => this.field}>
            </ovl-controlcustomhint>
            <ovl-controlvalidationhint .props=${() => this.field}>
            </ovl-controlvalidationhint>
          </div>
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)
  }
  forceCloseLocalHitList() {
    this.localList = null
    this.doRender()
  }
}
