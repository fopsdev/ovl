import { OvlBaseElement } from "../../OvlBaseElement"
import { html, TemplateResult } from "lit-html"
import { Field } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ColumnAlign, ListFnReturnValue } from "../../Table/Table"

import { overlay2ToRender } from "../../Overlay2/Overlay2"
import {
  FilterHitList,
  GetListDisplayValue,
  GetRowFromFormState,
  GetLabel,
} from "./helpers"
import { overmind, customFunctions } from "../../.."
import { SnackAdd } from "../../helpers"
import { resolvePath } from "../../../global/globals"
import { FieldGetList } from "../../../global/hooks"

type ListFunction = (
  row: { [key: string]: {} },
  state: typeof overmind.state,
  actions: typeof overmind.actions,
  effects: typeof overmind.effects
) => any //ListFnReturnValue -> gives a ton of ts errors. not sure why. so i've put any for now

export type ListState = {
  serverEndpoint?: string
  displayField: string
  valueField: string
  displayValueField?: boolean
  acceptEmpty?: boolean
  acceptOnlyListValues?: boolean
}

export class OvlListControl extends OvlBaseElement {
  props: any
  field: Field
  inputElement: any
  searchElement: any
  deleteElement: any
  localList: TemplateResult

  displayValue: any
  writeBackValue: any
  lastDisplayValue: any
  timer: any
  init() {
    this.field = this.props(this.state)
  }
  // handleClearFilter(e: Event) {}
  handleCancel = () => {
    this.actions.ovl.overlay.CloseOverlay2()
  }

  async handleListPopup(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let field = this.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let listData: ListFnReturnValue = resolvePath(
      customFunctions,
      formState.namespace
    )[FieldGetList.replace("%", field.fieldKey)](
      GetRowFromFormState(formState),
      this.state,
      this.actions,
      overmind.effects
    )

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
    let list = html`
      <div class="fd-panel">
        <ovl-hitlist
          .props=${(state) => {
            let listData = resolvePath(customFunctions, formState.namespace)[
              FieldGetList.replace("%", field.fieldKey)
            ](
              GetRowFromFormState(formState),
              state,
              overmind.actions,
              overmind.effects
            )

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
        <div class="fd-panel__footer" style="margin:2px; padding:2px;">
          <button
            @click=${this.handleCancel}
            title="Abbrechen"
            class="fd-button--negative sap-icon--decline"
          ></button>
        </div>
      </div>
    `
    await this.resetLocalList()
    this.actions.ovl.overlay.OpenOverlay2({
      templateResult: list,
      elementToFocusAfterClose: this.searchElement,
    })
  }

  selectedCallback = async (selectedKey: string) => {
    this.actions.ovl.overlay.CloseOverlay2()
    let field = this.field
    let formState = this.state.ovl.forms[field.formType][field.formId]
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
      this.writeBackValue = selectedKey
      let dataList = resolvePath(customFunctions, formState.namespace)[
        FieldGetList.replace("%", field.fieldKey)
      ](
        GetRowFromFormState(formState),
        this.state,
        this.actions,
        overmind.effects
      )

      this.displayValue =
        dataList.data[selectedKey][this.field.list.displayField]
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: { val: selectedKey, id: this.field.id },
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

    if (val) {
      let field = this.field
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
        let dataList = resolvePath(customFunctions, formState.namespace)[
          FieldGetList.replace("%", field.fieldKey)
        ](
          GetRowFromFormState(formState),
          this.state,
          this.actions,
          overmind.effects
        )
        let singleValue =
          dataList.data[filteredKeys[0]][this.field.list.valueField]
        val = dataList.data[filteredKeys[0]][this.field.list.displayField]

        this.displayValue = val
        val = singleValue
      }
    }
    this.writeBackValue = val
    e.stopPropagation()
    e.preventDefault()
  }
  // // same here
  async handleFocusOut(e: Event) {
    let field = this.field
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
    //if (!this.state.ovl.libState.overlay2.open) {
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
          let listData = resolvePath(customFunctions, formState.namespace)[
            FieldGetList.replace("%", field.fieldKey)
          ](
            GetRowFromFormState(formState),
            this.state,
            this.actions,
            overmind.effects
          )
          singleValue = listData.data[filteredKeys[0]][field.list.valueField]
          val = listData.data[filteredKeys[0]][field.list.displayField]
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

          let listData = resolvePath(customFunctions, formState.namespace)[
            FieldGetList.replace("%", field.fieldKey)
          ](
            GetRowFromFormState(formState),
            this.state,
            this.actions,
            overmind.effects
          )
          if (listData.data[singleValue]) {
            val = listData.data[singleValue][field.list.displayField]
          }
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

    let field = this.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let filterValue = this.inputElement.value
    if (!openLocalList) {
      if (!filterValue || e.key === "Escape") {
        this.setValues("", "")
        this.resetLocalList()
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
        formState,
        this.state,
        field.fieldKey,
        10
      )

      if (filteredKeys.length < 1) {
        if (this.deleteElement) {
          this.deleteElement.classList.remove("hide")
        }

        SnackAdd("Keine passenden Einträge gefunden", "Warning", 3000)
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
            <div class="fd-panel">
              <ovl-hitlist
                .props=${(state) => {
                  let listData = resolvePath(
                    customFunctions,
                    formState.namespace
                  )[FieldGetList.replace("%", field.fieldKey)](
                    GetRowFromFormState(formState),
                    state,
                    overmind.actions,
                    overmind.effects
                  )
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
          let focusEl = document.getElementById(this.field.id + "inlineovlhl_1")
          if (focusEl) {
            focusEl.focus()
          }
        }
      }
    }, waitTime)
  }
  getUI() {
    let field = this.field
    let formState = this.state.ovl.forms[field.formType][field.formId]

    let res = getUIValidationObject(field)

    let label
    let labelText = GetLabel(field)
    if (labelText) {
      label = html`
        <label
          class="fd-form-label fd-has-type-1 ovl-formcontrol-label ovl-formcontrol-listcontrol-label ovl-formcontrol-label__${field.fieldKey}"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${labelText}</label
        >
      `
    }
    let align = ""
    if (field.ui && field.ui.align) {
      align = field.ui.align
    }
    let displayValue = this.displayValue

    if (displayValue === undefined) {
      let getListFnName = FieldGetList.replace("%", field.fieldKey)
      displayValue = GetListDisplayValue(
        field.list,
        field.value,
        resolvePath(customFunctions, formState.namespace)[getListFnName](
          GetRowFromFormState(formState),
          this.state,
          this.actions,
          overmind.effects
        )
      )
    }
    this.lastDisplayValue = displayValue
    let deleteButton
    //if (this.state.ovl.uiState.isMobile) {
    deleteButton = html`
      <button
        tabindex="-9999"
        id="delete${field.id}"
        @click=${(e) => this.handleDelete(e)}
        class="fd-input-group__button fd-button--light sap-icon--decline ovl-formcontrol-input ovl-formcontrol-deletebutton ovl-formcontrol-listcontrol-deletebutton ovl-formcontrol-deletebutton__${field.fieldKey}"
      ></button>
    `
    //}
    return html`
      <div @focusout=${(e) => this.handleFocusOut(e)}>
        <div
          class="ovl-formcontrol-container ovl-formcontrol-listcontrol-container ovl-formcontrol-container__${field.fieldKey}"
        >
          ${label}

          <div class="fd-input-group ${res.validationType}">
            <input
              autocomplete="off"
              style="${align}"
              +
              type="text"
              class="fd-input fd-input-group__input fd-has-type-1 ovl-formcontrol-input ovl-formcontrol-listcontrol-input ovl-formcontrol-input__${field.fieldKey}"
              id="${field.id}"
              @change=${(e) => this.handleChange(e)}
              value="${displayValue}"
              @keydown=${(e) => this.handleKeyDown(e)}
            />

            <div class="fd-button-group" role="group" aria-label="Group label">
              ${deleteButton}
              <button
                id="search${field.id}"
                @click=${(e) => this.handleListPopup(e)}
                @touchend=${(e) => this.handleListPopup(e)}
                class="fd-input-group__button fd-button--light sap-icon--search ovl-formcontrol-input ovl-formcontrol-searchbutton ovl-formcontrol-listcontrol-searchbutton ovl-formcontrol-searchbutton__${field.fieldKey}"
              ></button>
            </div>
          </div>
        </div>
        <div
          style="margin-top:4px;"
          class="fd-form-message ${res.validationHide} ovl-formcontrol-validation ovl-formcontrol-listcontrol-validation ovl-formcontrol-validation__${field.fieldKey}"
        >
          ${field.validationResult.validationMsg}
        </div>

        <div style="margin-top:-3px;">
          ${this.localList}
        </div>
      </div>
    `
  }
  afterRender() {
    this.inputElement = document.getElementById(this.field.id)

    this.searchElement = document.getElementById("search" + this.field.id)

    this.deleteElement = document.getElementById("delete" + this.field.id)

    if (this.deleteElement) {
      if (!this.inputElement.value) {
        this.deleteElement.classList.add("hide")
      } else {
        this.deleteElement.classList.remove("hide")
      }
    }
    if (this.inputElement) {
      this.inputElement.value = this.lastDisplayValue
      if (this.state.ovl.uiState.isMobile && this.localList) {
        this.inputElement.scrollIntoView(true)
      }
    }
  }
  setValues(val: string, dispVal: string) {
    if (val !== undefined) {
      this.writeBackValue = val
    }
    this.displayValue = dispVal
  }
  async resetLocalList() {
    this.localList = null
    await this.doRender()
  }
}
