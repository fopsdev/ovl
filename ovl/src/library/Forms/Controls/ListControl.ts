import { OvlBaseElement } from "../../OvlBaseElement"
import { html, TemplateResult } from "lit-html"
import { Field, FormState, ChangeField } from "../actions"
import { getUIValidationObject } from "./uiValidationHelper"
import { ColumnAlign, ListFnReturnValue, ColumnDef } from "../../Table/Table"

import { overlay2ToRender } from "../../Overlay2/Overlay2"
import {
  FilterHitList,
  GetListDisplayValue,
  GetRowFromFormState
} from "./helpers"
import { overmind } from "../../.."

type ListFunction = (
  state: typeof overmind.state,
  row: { [key: string]: {} }
) => any //ListFnReturnValue -> gives a ton of ts errors. not sure why. so i've put any for now

export type ListState = {
  listFn?: ListFunction
  serverEndpoint?: string
  displayField: string
  valueField: string
  displayValueField?: boolean
  acceptEmpty?: boolean
  acceptOnlyListValues?: boolean
}

export type ListControlState = {
  field: Field
  align: ColumnAlign
  label: string
  list: ListState
  formState: FormState
  fieldId: string
  namespace: string
}

export class OvlListControl extends OvlBaseElement {
  props: any
  controlState: ListControlState
  inputElement: any
  searchElement: any
  deleteElement: any
  localList: TemplateResult

  displayValue: any
  writeBackValue: any
  lastDisplayValue: any
  timer: any
  init() {
    this.controlState = this.props(this.state)
  }

  handleCancel(e: Event) {
    this.click()
  }

  // handleClearFilter(e: Event) {}

  async handleListPopup(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    let listData: ListFnReturnValue = this.controlState.list.listFn(
      this.state,
      GetRowFromFormState(this.controlState.formState)
    )

    //@ts-ignore
    let filterValue = document.getElementById(this.controlState.field.id).value

    // only reach out to server if endpoint is maintained
    if (this.controlState.list.serverEndpoint) {
      await this.actions.ovl.internal.FillListControl({
        list: this.controlState.list,
        listData,
        filterValue,
        row: GetRowFromFormState(this.controlState.formState),
        namespace: this.controlState.namespace,
        fieldId: this.controlState.fieldId
      })
    }
    let filteredKeys = FilterHitList(
      this.controlState.list,
      filterValue,
      this.controlState.formState,
      this.state,
      this.controlState.fieldId
    )
    if (filteredKeys.length < 1) {
      this.actions.ovl.snack.AddSnack({
        durationMs: 2000,
        text: "Keine passenden Einträge gefunden",
        type: "Warning"
      })
      return
    }
    let list = html`
      <div class="fd-panel">
        <ovl-hitlist
          .props=${state => {
            let listData = this.controlState.list.listFn(
              state,
              GetRowFromFormState(this.controlState.formState)
            )

            return {
              fieldId: this.controlState.field.id,
              list: this.controlState.list,
              listData,
              filterValue,
              filteredKeys,
              type: "overlay",
              selectedCallback: this.selectedCallback
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
      elementToFocusAfterClose: this.searchElement
    })
    // overlay2ToRender.overlayClosedCallback = () => {
    //   if (this.searchElement !== null) {
    //     this.searchElement.focus()
    //   }
    // }
  }

  selectedCallback = async (selectedKey: string) => {
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
      this.displayValue = undefined
      let event = new CustomEvent("ovlchange", {
        bubbles: true,
        detail: { val: selectedKey, id: this.controlState.field.id }
      })
      this.inputElement.dispatchEvent(event)
      this.writeBackValue = undefined

      this.localList = null

      await this.resetLocalList()
    }
  }

  handleChange(e: Event) {
    let val = this.inputElement.value
    //if (this.localList !== null) {
    if (val) {
      let filteredKeys = FilterHitList(
        this.controlState.list,
        val,
        this.controlState.formState,
        this.state,
        this.controlState.fieldId,
        10
      )
      if (filteredKeys.length === 1) {
        let dataList = this.controlState.list.listFn(
          this.state,
          GetRowFromFormState(this.controlState.formState)
        )
        let singleValue =
          dataList.data[filteredKeys[0]][this.controlState.list.valueField]
        val =
          dataList.data[filteredKeys[0]][this.controlState.list.displayField]

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
    let fieldId = this.controlState.field.id
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
          detail: { val: this.writeBackValue, id: this.controlState.field.id }
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
          detail: { id: this.controlState.field.id }
        })
        await this.inputElement.dispatchEvent(event)
        this.writeBackValue = undefined
        this.localList = null
        await this.doRender()
        return
      }
    }

    if (idToCheck === "search" + fieldId || idToCheck === "delete" + fieldId) {
      let val = this.inputElement.value
      if (val) {
        //if (this.localList !== null) {
        let filteredKeys = FilterHitList(
          this.controlState.list,
          val,
          this.controlState.formState,
          this.state,
          this.controlState.fieldId,
          10
        )
        if (filteredKeys.length === 1) {
          let listData = this.controlState.list.listFn(
            this.state,
            GetRowFromFormState(this.controlState.formState)
          )
          let singleValue =
            listData.data[filteredKeys[0]][this.controlState.list.valueField]
          val =
            listData.data[filteredKeys[0]][this.controlState.list.displayField]
          let formState = this.controlState.formState
          let fields = formState.fields
          let foundId
          Object.keys(fields).some(f => {
            if (fields[f].id === this.controlState.field.id) {
              foundId = f
              return true
            }
            return false
          })

          if (
            singleValue !==
            this.controlState.formState.fields[foundId].convertedValue
          ) {
            this.writeBackValue = singleValue
            let event = new CustomEvent("ovlchange", {
              bubbles: true,
              detail: { val: singleValue, id: this.controlState.field.id }
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
        this.controlState.list,
        filterValue,
        this.controlState.formState,
        this.state,
        this.controlState.fieldId,
        10
      )

      if (filteredKeys.length < 1) {
        if (this.deleteElement) {
          this.deleteElement.classList.remove("hide")
        }

        this.actions.ovl.snack.AddSnack({
          durationMs: 2000,
          text: "Keine passenden Einträge gefunden",
          type: "Warning"
        })
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
                .props=${state => {
                  let listData = this.controlState.list.listFn(
                    state,
                    GetRowFromFormState(this.controlState.formState)
                  )
                  return {
                    fieldId: this.controlState.field.id,
                    list: this.controlState.list,
                    listData,
                    filterValue,
                    filteredKeys,
                    type: "inline",
                    animation: !wasAlreadyOpen,
                    selectedCallback: this.selectedCallback
                  }
                }}
              ></ovl-hitlist>
            </div>
          `
          await this.doRender()
        }
        if (openLocalList) {
          let focusEl = document.getElementById(
            this.controlState.field.id + "inlineovlhl_1"
          )
          if (focusEl) {
            focusEl.focus()
          }
        }
      }
    }, waitTime)
  }
  getUI() {
    let field = this.controlState.field
    field.autoCorrectedValue
    let res = getUIValidationObject(field)

    let label
    if (this.controlState.label) {
      label = html`
        <label
          class="fd-form-label"
          aria-required="${res.needsAttention}"
          for="${field.id}"
          >${this.controlState.label}</label
        >
      `
    }
    let align = ""
    if (this.controlState.align) {
      align = this.controlState.align
    }
    let displayValue = this.displayValue
    if (displayValue === undefined) {
      displayValue = GetListDisplayValue(
        this.controlState.list,
        field.value,
        this.controlState.list.listFn(
          this.state,
          GetRowFromFormState(this.controlState.formState)
        )
      )
    }
    this.lastDisplayValue = displayValue
    let deleteButton
    if (this.state.ovl.uiState.isMobile) {
      deleteButton = html`
        <button
          tabindex="-9999"
          id="delete${field.id}"
          @click=${e => this.handleDelete(e)}
          class="fd-input-group__button fd-button--light sap-icon--decline"
        ></button>
      `
    }
    return html`
      <div @focusout=${e => this.handleFocusOut(e)}>
        ${label}

        <div class="fd-input-group ${res.validationType}">
          <input
            autocomplete="off"
            style="${align}"
            +
            type="text"
            class="fd-input fd-input-group__input "
            id="${field.id}"
            @change=${e => this.handleChange(e)}
            value="${displayValue}"
            @keydown=${e => this.handleKeyDown(e)}
          />

          <div class="fd-button-group" role="group" aria-label="Group label">
            ${deleteButton}
            <button
              id="search${field.id}"
              @click=${e => this.handleListPopup(e)}
              @touchend=${e => this.handleListPopup(e)}
              class="fd-input-group__button fd-button--light sap-icon--search"
              +
            ></button>
          </div>
        </div>
        <div
          style="margin-top:4px;"
          class="fd-form-message ${res.validationHide}"
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
    this.inputElement = document.getElementById(this.controlState.field.id)

    this.searchElement = document.getElementById(
      "search" + this.controlState.field.id
    )

    this.deleteElement = document.getElementById(
      "delete" + this.controlState.field.id
    )

    if (this.deleteElement) {
      if (!this.inputElement.value) {
        this.deleteElement.classList.add("hide")
      } else {
        this.deleteElement.classList.remove("hide")
      }
    }
    this.inputElement.value = this.lastDisplayValue
    if (this.state.ovl.uiState.isMobile && this.localList) {
      this.inputElement.scrollIntoView(true)
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
