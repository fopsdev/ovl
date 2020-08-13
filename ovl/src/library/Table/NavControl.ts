import { OvlBaseElement } from "../OvlBaseElement"
import { html } from "lit-html"
import { TableDataAndDef } from "./Table"

type NavType = "header" | "row"

export type NavDef = {
  tableData: TableDataAndDef
  type: NavType
}

export class TableNavControl extends OvlBaseElement {
  props: any
  nav: NavDef

  handleFilterClearClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.table.TableClearFilter(this.nav.tableData)
  }

  handleSetPageClick = (e: Event, page: number) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.internal.TableSelectHeader({
      key: "",
      def: this.nav.tableData.def,
      data: this.nav.tableData.data,
    })
    this.actions.ovl.internal.TableSetPage({
      paging: this.nav.tableData.def.options.paging,
      page: page,
    })
  }

  handleMoreTableOptionsClick = (e: Event) => {
    this.actions.ovl.internal.TableSelectHeader({
      def: this.nav.tableData.def,
      data: this.nav.tableData.data,
      key: this.nav.tableData.def.database.dataIdField,
    })
  }

  handleAddRowClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    if (this.nav.type !== "header") {
      this.actions.ovl.table.TableAddRow(this.nav.tableData)
    } else {
      this.actions.ovl.internal.TableSelectHeader({
        def: this.nav.tableData.def,
        data: this.nav.tableData.data,
        key: "",
      })
      this.actions.ovl.table.TableAddRow(this.nav.tableData)
    }
  }

  handleRefreshClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    this.actions.ovl.table.TableViewRefresh(this.nav.tableData)
  }

  init() {
    this.nav = this.props()
  }
  async getUI() {
    return this.track(() => {
      let compact = ""
      // if (this.state.ovl.uiState.isMobile || this.nav.type === "row") {
      //   compact = "fd-button--compact"
      // }
      let tableDef = this.nav.tableData.def
      let feature = tableDef.features

      let filterClearButton = null

      if (
        feature.filter &&
        (tableDef.options.filter.value ||
          tableDef.options.filter.showSelected) &&
        !feature.noButtonsAtTheBottom
      ) {
        let filterClearTooltip = "Filter aufheben"
        if (tableDef.options.filter.showSelected) {
          filterClearTooltip = "Filter Selektion aufheben"
        }
        filterClearButton = html`
          <button
            title="${filterClearTooltip}"
            @click="${(e) => this.handleFilterClearClick(e)}"
            class="fd-button ${compact} sap-icon--clear-filter animated fadeIn faster"
          ></button>
        `
      }

      let refresh = null
      if (
        this.nav.type === "row" &&
        feature.showRefreshButton &&
        this.nav.tableData.def.uiState.needsRefresh === true &&
        !feature.noButtonsAtTheBottom
      ) {
        refresh = html`
          <button
            @click=${(e) => this.handleRefreshClick(e)}
            class="fd-button ${compact} sap-icon--refresh"
            title="Ansicht aktualisieren"
          ></button>
        `
      }

      let add = null
      if (
        feature.add &&
        (this.nav.type === "header" ||
          (this.nav.type === "row" && !feature.noButtonsAtTheBottom))
      ) {
        add = html`
          <button
            @click=${(e) => this.handleAddRowClick(e)}
            class="fd-button ${compact} sap-icon--add"
            title="Datensatz hinzufügen"
          ></button>
        `
      }
      let more = null

      if (
        this.nav.type === "row" &&
        !feature.noButtonsAtTheBottom &&
        (feature.filter || feature.multiselect) &&
        feature.headerMenu
      ) {
        more = html`
          <button
            title="Tabellenfunktionen"
            @click="${(e) => this.handleMoreTableOptionsClick(e)}"
            class="fd-button ${compact} sap-icon--overflow"
          ></button>
        `
      }

      let tablenav
      let rows = this.nav.tableData.data.data
      let paging = this.nav.tableData.def.options.paging
      let dataFilteredAndSorted = this.nav.tableData.def.uiState
        .dataFilteredAndSorted
      if (feature.page) {
        let count = dataFilteredAndSorted.length
        if (count > paging.pageSize) {
          let pages = Math.ceil(count / paging.pageSize)
          tablenav = html`
            <div
              class="fd-segmented-button"
              role="group"
              aria-label="Tablecontrol"
            >
              <button
                title="Erster Datensatz"
                ?disabled=${paging.page === 0 || pages === 1}
                @click="${(e) => this.handleSetPageClick(e, 0)}"
                class="fd-button ${compact} sap-icon--media-rewind"
              ></button>
              <button
                ?disabled=${paging.page === 0}
                title="Vorheriger Datensatz"
                @click="${(e) => this.handleSetPageClick(e, paging.page - 1)}"
                class="fd-button ${compact} sap-icon--media-reverse"
              ></button>
              <button
                style="padding-left:2px;padding-right:2px;"
                class="fd-button ${compact}"
              >
                ${paging.page + 1}/${pages}
              </button>
              <button
                title="Nächster Datensatz"
                @click="${(e) => this.handleSetPageClick(e, paging.page + 1)}"
                ?disabled=${paging.page + 1 === pages}
                class="fd-button ${compact} sap-icon--media-play"
              ></button>
              <button
                title="Letzter Datensatz"
                @click="${(e) => this.handleSetPageClick(e, pages - 1)}"
                ?disabled=${paging.page + 1 === pages || pages === 1}
                class="fd-button ${compact} sap-icon--media-forward"
              ></button>
            </div>
          `
        }
      }

      return html` ${tablenav} ${filterClearButton} ${add} ${refresh} ${more} `
    })
  }
}
