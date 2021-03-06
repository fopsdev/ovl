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
  GetLabel,
  GetListDisplayValue,
  GetRowFromFormState,
  GetValueFromCustomFunction,
} from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { ChangeField, OvlFormState } from "../actions"
import { DialogHolderParams } from "../../Dialog/OvlDialogHolder"

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
  timer: any
  lastExactHitValue: any
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
        class="fd-button fd-button--negative sap-icon--decline"
      ></button>
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
    //this.actions.ovl.overlay.CloseOverlay2()
    if (this.state.ovl.dialogs.HitListDialog.visible) {
      this.actions.ovl.dialog.DialogClose("HitListDialog")
    }
    let field = this.field.field

    if (this.localList !== null) {
      this.inputElement.focus()
      setTimeout(() => {
        let val = this.inputElement.value
        this.inputElement.setSelectionRange(val.length, val.length)
      }, 0)
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

      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: { val: writeBackValue, id: field.id },
      })
      await this.inputElement.dispatchEvent(event)
    }
  }

  handleGotFocusSearch(e: Event) {
    this.forceCloseLocalHitList()
  }
  // // same here

  handleOnFocus(e: Event) {
    debugger
    let event = new CustomEvent("ovlfocusin", {
      bubbles: true,
      detail: { id: this.field.field.id },
    })
    e.target.dispatchEvent(event)
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

    if (relatedTarget) {
      idToCheck = relatedTarget.id
    }
    if (relatedTarget === null) {
      movedOut = true
    } else {
      // check the ids
      if (idToCheck.indexOf(fieldId) < 0) {
        movedOut = true
      }
    }
    //@ts-ignore
    if (e.target.id === field.id) {
      //@ts-ignore
      let filterValue = e.target.value
      let writeBackValue = filterValue

      let filteredRes = FilterHitList(
        field.list,
        filterValue,
        this.formState,
        this.state,
        field.fieldKey,
        10
      )

      let filteredKeys = filteredRes.filteredKeys
      if (filterValue !== "" && filteredKeys.length === 1) {
        let listData: FieldGetList_ReturnType = resolvePath(
          this.actions.custom,
          this.formState.namespace
        )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
          row: GetRowFromFormState(this.formState),
        })
        let hit = filteredKeys[0]
        writeBackValue = hit
        this.inputElement.value = listData.data[hit][field.list.displayField]
        if (relatedTarget && relatedTarget.id.indexOf("ovlhl_") > -1) {
          this.inputElement.focus()
          this.forceCloseLocalHitList()
        }
      }
      // always as well write back value here
      if (!(filteredRes.isExactKey && filteredKeys.length > 1)) {
        let event = new CustomEvent("ovlchange", {
          bubbles: true,
          detail: { val: writeBackValue, id: field.id },
        })
        await this.inputElement.dispatchEvent(event)
      }
    }
    if (movedOut) {
      //SnackAdd("Moved Out...")
      let event = new CustomEvent("ovlfocusout", {
        bubbles: true,
        detail: { id: fieldId },
      })
      await this.inputElement.dispatchEvent(event)
      this.forceCloseLocalHitList()

      //@ts-ignore
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
    let waitTime = 500
    clearTimeout(this.timer)
    let openLocalList = false
    if (e.key === "ArrowDown" || e.key === "Enter") {
      openLocalList = true
      waitTime = 0
    }

    let field = this.field.field

    if (!openLocalList) {
      if (e.key === "Escape") {
        this.forceCloseLocalHitList()
        return
      }
    }

    this.timer = setTimeout(async () => {
      // just do all the stuff if it still has focus
      if (document.activeElement.id !== field.id) {
        return
      }

      //@ts-ignore
      let filterValue = document.getElementById(field.id).value

      let filteredRes = FilterHitList(
        field.list,
        filterValue,
        this.formState,
        this.state,
        field.fieldKey,
        10
      )
      let filteredKeys = filteredRes.filteredKeys

      if (!openLocalList) {
        let writeBackValue = filterValue
        this.lastExactHitValue = undefined
        if (!filteredRes.isExactKey) {
          let event = new CustomEvent("ovlchange", {
            bubbles: true,
            detail: { val: writeBackValue, id: field.id },
          })
          await this.inputElement.dispatchEvent(event)
        } else {
          this.lastExactHitValue = writeBackValue
        }
      }
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
  async getUI() {
    //SnackAdd("Rerender...")
    return this.track(() => {
      this.field = this.props(this.state)
      let field = this.field.field
      this.formState = this.state.ovl.forms[field.formType][field.formId]
      let customRowCell = this.field.customRowCellClass
      let customRowClassName = ""
      let customRowTooltip
      let customRowClassContainerName = ""
      if (customRowCell) {
        customRowClassName = customRowCell.className
        customRowClassContainerName = customRowClassName + "Container"
        customRowTooltip = customRowCell.tooltip
      }

      let res = getUIValidationObject(field)

      let align = ""
      if (field.ui && field.ui.align) {
        align = field.ui.align
      }

      let label = GetLabel(
        field,
        this.field.customHeaderCellClass,
        res,
        "list",
        align,
        this.formState,
        this
      )

      let displayValue = ""

      let getListFnName = FieldGetList.replace("%", field.fieldKey)
      displayValue = GetListDisplayValue(
        field.list,
        field.convertedValue,
        resolvePath(this.actions.custom, this.formState.namespace)[
          getListFnName
        ](<FieldGetList_Type>{
          row: GetRowFromFormState(this.formState),
        })
      )

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
      let customValue = GetValueFromCustomFunction(
        this.field.row,
        field,
        this.formState,
        align,
        this.field.isInline,
        this.state
      )
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
      let validationHide = res.validationHide

      if (field.focused) {
        validationHide = "hide"
      }

      // if (
      //   this.localList ||
      //   document.activeElement.id.indexOf(this.field.field.id) > -1 ||
      //   this.state.ovl.dialogs.HitListDialog.visible
      // ) {
      //   console.log("hhhhh")
      //   validationHide = "hide"
      // }

      return html`
        ${hitListDialog}
        <div
          class="ovl-listcontrol-main"
          @focusout=${(e) => this.handleFocusOut(e)}
        >
          <div
            class="ovl-formcontrol-container ovl-container-listbox ovl-container__${field.fieldKey} ${customRowClassContainerName}"
          >
            ${label}

            <div
              class="fd-input-group ${res.validationType} ${customRowClassName} ovl-formcontrol-input"
            >
              <input
                title="${ifDefined(
                  customRowTooltip ? customRowTooltip : undefined,
                  this
                )}"
                autocomplete="off"
                style="${align}"
                +
                type="text"
                class="fd-input ovl-focusable fd-input-group__input ovl-formcontrol-input ovl-value-listcontrol ovl-value__${field.fieldKey}"
                id="${field.id}"
                value="${displayValue}"
                .value="${displayValue}"
                @keydown=${(e) => this.handleKey(e)}
                @focus=${(e) => this.handleOnFocus(e)}
              />

              ${deleteButton}
              <span
                tabindex="0"
                id="search${field.id}"
                @click=${(e) => this.handleListPopup(e)}
                @touchend=${(e) => this.handleListPopup(e)}
                @keydown=${(e) => this.handleSearchKeyDown(e)}
                @focus=${(e) => this.handleGotFocusSearch(e)}
                class="fd-input-group__addon sap-icon--${icon} ovl-formcontrol-input ovl-formcontrol-searchbutton ovl-formcontrol-listcontrol-searchbutton ovl-formcontrol-searchbutton__${field.fieldKey}"
              ></span>
            </div>

            <span
              class="fd-form-message  ovl-formcontrol-custom ovl-formcontrol-listcontrol-custom ovl-formcontrol-custom__${field.fieldKey} ${customValue
                ? ""
                : "hide"}"
            >
              ${customValue}
            </span>

            <span
              class="fd-form-message ${validationHide} ovl-formcontrol-validation ovl-formcontrol-listcontrol-validation ovl-formcontrol-validation__${field.fieldKey}"
            >
              ${field.validationResult.errors.join(", ")}
            </span>
          </div>
          ${this.localList}
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
