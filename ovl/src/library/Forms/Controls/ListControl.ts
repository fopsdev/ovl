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
import { ListFnReturnValue } from "../../Table/Table"
import {
  ControlState,
  FilterHitList,
  GetLabel,
  GetListDisplayValue,
  GetRowFromFormState,
  GetValueFromCustomFunction,
} from "./helpers"
import { getUIValidationObject } from "./uiValidationHelper"
import { FormState } from "../actions"
import { OvlState, OvlActions, OvlEffects, ovl } from "../../.."
import { DialogHolderParams } from "../../Dialog/OvlDialogHolder"

type ListFunction = (
  row: { [key: string]: {} },
  state: OvlState,
  actions: OvlActions,
  effects: OvlEffects
) => any //ListFnReturnValue -> gives a ton of ts errors. not sure why. so i've put any for now

export type ListState = {
  serverEndpoint?: string
  displayField: string
  // please bear in mind that valueField will always be unique key of object. but we have it here so we can assign a type to it if its displayed at all in the selectlist
  valueField: string
  displayValueField?: boolean
  acceptEmpty?: boolean
  acceptOnlyListValues?: boolean
}

export class OvlListControl extends OvlBaseElement {
  props: any
  field: ControlState
  inputElement: any
  searchElement: any
  deleteElement: any
  localList: TemplateResult
  hitListDialogBody: TemplateResult
  hitListDialogFooter: TemplateResult
  displayValue: any
  writeBackValue: any
  lastDisplayValue: any
  timer: any

  formState: FormState
  // handleClearFilter(e: Event) {}
  handleCancel = (e: Event) => {
    this.actions.ovl.dialog.DialogClose("HitListDialog")
  }

  async handleListPopup(e: Event) {
    e.stopPropagation()
    e.preventDefault()

    let field = this.field.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let listData: FieldGetList_ReturnType = resolvePath(
      this.actions.custom,
      formState.namespace
    )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
      row: GetRowFromFormState(formState),
    })

    //@ts-ignore
    let filterValue = document.getElementById(field.id).value
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
    )
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
    await this.resetLocalList()

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
    }

    if (selectedKey === "@@ovlescape") {
      await this.resetLocalList()
    } else if (selectedKey !== "@@ovlcanceled") {
      let dataList: FieldGetList_ReturnType = resolvePath(
        this.actions.custom,
        this.formState.namespace
      )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
        row: GetRowFromFormState(this.formState),
      })
      this.writeBackValue = selectedKey
      if (dataList.index) {
        this.writeBackValue = dataList.data[selectedKey][field.list.valueField]
      }
      this.displayValue =
        dataList.data[selectedKey][this.field.field.list.displayField]
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: { val: this.writeBackValue, id: this.field.field.id },
      })
      this.inputElement.dispatchEvent(event)
      //this.writeBackValue = undefined

      this.localList = null
      await this.resetLocalList()
      if (this.deleteElement) {
        this.deleteElement.classList.remove("hide")
      }
    }
  }

  handleChange(e: Event) {
    let val = this.inputElement.value
    //if (this.localList !== null) {

    // this.actions.ovl.internal.ChangeField({
    //   fieldId: this.field.field.fieldKey,
    //   formState: this.formState,
    //   isInit: true,
    //   value: val,
    // })

    if (val) {
      let field = this.field.field
      let formState = this.state.ovl.forms[field.formType][field.formId]
      let filteredKeys = FilterHitList(
        field.list,
        val,
        formState,
        this.state,
        field.fieldKey,
        10
      )
      if (filteredKeys.length === 1) {
        let dataList: FieldGetList_ReturnType = resolvePath(
          this.actions.custom,
          formState.namespace
        )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
          row: GetRowFromFormState(formState),
        })
        let singleValue = filteredKeys[0]
        if (dataList.index) {
          singleValue = dataList.data[singleValue][field.list.valueField]
        }
        this.displayValue = GetListDisplayValue(
          field.list,
          singleValue,
          dataList
        )
        val = singleValue
      }
    }
    this.writeBackValue = val
    e.stopPropagation()
    e.preventDefault()
  }

  handleGotFocusSearch(e: Event) {
    this.forceCloseLocalHitList()
  }
  // // same here
  async handleFocusOut(e: Event) {
    let field = this.field.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let fieldId = field.id
    //@ts-ignore
    let relatedTarget = e.relatedTarget
    // if related target is null or not one of the contain elements inside the div then the focus was moved out...
    // ... and we need to trigger our change event if needed
    let movedOut: boolean = false
    // the selection overlay doesn't count
    let idToCheck
    if (relatedTarget) {
      idToCheck = relatedTarget.id
    }
    //if (!this.state.ovl.libState.overlay2.ope) {
    if (relatedTarget === null) {
      movedOut = true
    } else {
      // check the ids
      if (idToCheck.indexOf(fieldId) < 0) {
        movedOut = true
      }
    }
    if (movedOut) {
      if (this.writeBackValue !== undefined) {
        // we have som changes inside our div
        // so lets fire the ovlchange event
        this.displayValue = undefined
        let event = new CustomEvent("ovlchange", {
          bubbles: true,
          detail: { val: this.writeBackValue, id: fieldId },
        })
        await this.inputElement.dispatchEvent(event)
        this.writeBackValue = undefined

        this.localList = null
        await this.doRender()

        return
      } else {
        //it was just a focus out without changes
        // still we need to trigger our ovlfocusout event so the main form class can handle them
        this.displayValue = undefined

        let event = new CustomEvent("ovlfocusout", {
          bubbles: true,
          detail: { id: fieldId },
        })
        await this.inputElement.dispatchEvent(event)
        this.writeBackValue = undefined
        this.localList = null
        await this.doRender()
        return
      }
    }

    if (idToCheck === "search" + fieldId || idToCheck === "delete" + fieldId) {
      let val = this.writeBackValue
      if (val === undefined) {
        val = this.inputElement.value
      }
      if (val) {
        //if (this.localList !== null) {
        let filteredKeys = FilterHitList(
          field.list,
          val,
          formState,
          this.state,
          field.fieldKey,
          10
        )
        let singleValue
        if (filteredKeys.length === 1) {
          let listData: FieldGetList_ReturnType = resolvePath(
            this.actions.custom,
            formState.namespace
          )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
            row: GetRowFromFormState(formState),
          })
          singleValue = filteredKeys[0]
          if (listData.index) {
            singleValue = listData.data[singleValue][field.list.valueField]
          }
          val = GetListDisplayValue(field.list, singleValue, listData)
        }
        // if it allow non list values also send a change
        else if (!field.list.acceptOnlyListValues) {
          singleValue = val
        }
        if (singleValue) {
          let fields = formState.fields
          let foundId
          Object.keys(fields).some((f) => {
            if (fields[f].id === fieldId) {
              foundId = f
              return true
            }
            return false
          })

          let listData: FieldGetList_ReturnType = resolvePath(
            this.actions.custom,
            formState.namespace
          )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
            row: GetRowFromFormState(formState),
          })

          val = GetListDisplayValue(field.list, singleValue, listData)

          if (singleValue !== formState.fields[foundId].convertedValue) {
            this.writeBackValue = singleValue
            let event = new CustomEvent("ovlchange", {
              bubbles: true,
              detail: { val: singleValue, id: fieldId },
            })
            await this.inputElement.dispatchEvent(event)
          }
        }
      } else {
        this.writeBackValue = ""
      }

      //}
      this.displayValue = val
      this.resetLocalList()
    }
  }
  handleDelete(e: Event) {
    this.displayValue = ""
    this.inputElement.value = this.displayValue
    this.writeBackValue = ""
    if (this.deleteElement) {
      this.deleteElement.classList.add("hide")
    }
    this.inputElement.focus()
  }
  handleSearchKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter") {
      this.handleListPopup(e)
    }
  }
  handleKeyDown(e: KeyboardEvent) {
    if (
      e.key === "Shift" ||
      e.key === "Home" ||
      e.key === "Tab" ||
      e.key === "End" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
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
    // if (e.key.length > 2) {
    //   alert(e.key)
    // }

    let field = this.field.field

    let filterValue = this.inputElement.value
    if (!openLocalList) {
      if (!filterValue || e.key === "Escape") {
        this.setValues("", "")
        this.resetLocalList()
        this.forceCloseLocalHitList()

        if (filterValue) {
          e.stopPropagation()
        }
        return
      }
    }

    this.timer = setTimeout(async () => {
      //@ts-ignore
      let filterValue = this.inputElement.value

      this.setValues(undefined, filterValue)

      let filteredKeys = FilterHitList(
        field.list,
        filterValue,
        this.formState,
        this.state,
        field.fieldKey,
        10
      )

      if (filteredKeys.length < 1) {
        // maybe the user added directly a code and we have a index
        if (this.deleteElement) {
          this.deleteElement.classList.remove("hide")
        }
        SnackAdd("Keine passenden Einträge gefunden", "Warning", 3000)
      } else if (filteredKeys.length === 1 && !field.list.serverEndpoint) {
        // just handles the case when it is a local list with no more server candidates
        // then 1 hit = the one and select it
        let dataList: FieldGetList_ReturnType = resolvePath(
          this.actions.custom,
          this.formState.namespace
        )[FieldGetList.replace("%", field.fieldKey)](<FieldGetList_Type>{
          row: GetRowFromFormState(this.formState),
        })
        let singleValue = filteredKeys[0]
        if (dataList.index) {
          singleValue = dataList.data[singleValue][field.list.valueField]
        }
        this.displayValue = GetListDisplayValue(
          field.list,
          singleValue,
          dataList
        )
        this.writeBackValue = singleValue
        if (this.localList) {
          this.forceCloseLocalHitList()
        }
      } else {
        let wasAlreadyOpen = false
        if (this.localList !== null) {
          wasAlreadyOpen = true
          this.localList = null
          await this.doRender()
        }
        //we have a list so present it to the user
        if (document.activeElement === this.inputElement) {
          this.localList = html`
            <div class="fd-layout-panel">
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
            </div>
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
      }
    }, waitTime)
  }
  async getUI() {
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

      let displayValue = this.displayValue

      if (displayValue === undefined) {
        let getListFnName = FieldGetList.replace("%", field.fieldKey)
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
      this.lastDisplayValue = displayValue
      let deleteButton
      //if (this.state.ovl.uiState.isMobile) {
      deleteButton = html`
        <span
          tabindex="-9999"
          id="delete${field.id}"
          @click=${(e) => this.handleDelete(e)}
          class="fd-input-group__addon sap-icon--decline ovl-formcontrol-input ovl-formcontrol-deletebutton ovl-formcontrol-listcontrol-deletebutton ovl-formcontrol-deletebutton__${field.fieldKey}"
        ></span>
      `
      //}
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

      if (!this.displayValue && this.deleteElement) {
        this.deleteElement.classList.add("hide")
      }

      // if (!field.validationResult.valid && this.localList === null) {
      //   this.lastDisplayValue = field.value
      //   if (!this.lastDisplayValue) {
      //     if (this.deleteElement) {
      //       this.deleteElement.classList.add("hide")
      //     }
      //   }
      // }

      return html`
        ${hitListDialog}
        <div @focusout=${(e) => this.handleFocusOut(e)}>
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
                class="fd-input ovl-focusable fd-input-group__input fd-has-type-1 ovl-formcontrol-input ovl-value-listcontrol ovl-value__${field.fieldKey}"
                id="${field.id}"
                @change=${(e) => this.handleChange(e)}
                value="${displayValue}"
                @keydown=${(e) => this.handleKeyDown(e)}
              />

              ${deleteButton}
              <span
                tabindex="0"
                id="search${field.id}"
                @click=${(e) => this.handleListPopup(e)}
                @touchend=${(e) => this.handleListPopup(e)}
                @keydown=${(e) => this.handleSearchKeyDown(e)}
                @focus=${(e) => this.handleGotFocusSearch(e)}
                class="fd-input-group__addon sap-icon--search ovl-formcontrol-input ovl-formcontrol-searchbutton ovl-formcontrol-listcontrol-searchbutton ovl-formcontrol-searchbutton__${field.fieldKey}"
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
              class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-listcontrol-validation ovl-formcontrol-validation__${field.fieldKey}"
            >
              ${field.validationResult.validationMsg}
            </span>
          </div>
          ${this.localList}
        </div>
      `
    })
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.field.id)

    this.searchElement = document.getElementById("search" + this.field.field.id)

    this.deleteElement = document.getElementById("delete" + this.field.field.id)

    if (this.deleteElement) {
      if (!this.inputElement.value) {
        this.deleteElement.classList.add("hide")
      } else {
        this.deleteElement.classList.remove("hide")
      }
    }
    if (this.inputElement) {
      this.inputElement.value = this.lastDisplayValue
      // if (this.state.ovl.uiState.isMobile && this.localList) {
      //   this.inputElement.scrollIntoView(true)
      // }
    }
  }
  setValues(val: string, dispVal: string) {
    if (val !== undefined) {
      this.writeBackValue = val
    }
    //console.log(dispVal)
    this.displayValue = dispVal
  }
  async resetLocalList() {
    this.localList = null
    //await this.doRender()
  }
  forceCloseLocalHitList() {
    this.localList = null
    this.doRender()

    // let hl = document.getElementById("ovl-hitlist")
    // if (hl) {
    //   hl.doRender()
    // }
  }
}
