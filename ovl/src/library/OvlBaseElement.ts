import {
  OvlScreen,
  OvlForm,
  OvlState,
  OvlActions,
  OvlEffects,
  OvlConfig,
} from "../index"
import { ovl } from "../index"
import {
  startTrack,
  stopTrack,
  disposeTrack,
  logTrackingList,
  paths,
  callbacks,
} from "../tracker/tracker"

type ScreensHistory = OvlScreen[]

export type OvlScreenBatchingOption = "fast" | "medium" | "energysave"

type ScreenState = {
  visible: boolean
  closing: boolean
  lastScrollTop: number
  batchingOption: OvlScreenBatchingOption
}

export type ScreensState = {
  screens: {
    [key in OvlScreen]: ScreenState
  }
  nav: NavState
  formShowedToReset: FormShowed[]
}

export type NavState = {
  nextScreen: OvlScreen
  currentScreen: OvlScreen
  screensHistory: ScreensHistory
  formTypeToReset: OvlForm
  formIdToReset: string
}

export const setLastScrollPosition = (
  uiState: typeof ovl.state.ovl.uiState,
  screens: typeof ovl.state.ovl.screens
) => {
  let currentScreen = screens.nav.currentScreen
  if (currentScreen) {
    // get the first scrollable class of the doc
    let o = screens.screens[currentScreen]
    let scrollable
    if (uiState.isMobile) {
      scrollable = document.querySelector(".scrollableMobile")
    } else {
      scrollable = document.querySelector(".scrollable")
    }

    // and remember the scroll pos
    if (scrollable && scrollable.scrollTop) {
      o.lastScrollTop = scrollable.scrollTop
    } else {
      o.lastScrollTop = undefined
    }
  }
}

export const scrollToLastPosition = (
  uiState: typeof ovl.state.ovl.uiState,
  screens: typeof ovl.state.ovl.screens
) => {
  if (!screens.nav) {
    return
  }
  let screen = screens.nav.currentScreen
  if (!screens.screens || !screens.screens[screen]) {
    return
  }
  let lastScrollTop = screens.screens[screen].lastScrollTop

  // set scroll to remembered pos
  let scrollable
  if (uiState.isMobile) {
    scrollable = document.querySelector(".scrollableMobile")
  } else {
    scrollable = document.querySelector(".scrollable")
  }
  //console.log(scrollable)
  if (scrollable) {
    if (!lastScrollTop) {
      lastScrollTop = 0
    }
    scrollable.scrollTo({
      top: lastScrollTop,
      left: 0,
      behavior: "smooth",
    })
  }
}

import { render, TemplateResult, html } from "lit-html"
import { actionTracking } from "../tracker/proxyHandler"

import { FormShowed } from "./forms/OvlFormElement"

export class OvlBaseElement extends HTMLElement {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
  screens: { [key in OvlScreen]: ScreenState }
  uiState: typeof ovl.state.ovl.uiState
  name: string
  _id: number = 0
  screen: OvlScreen

  screenCloseBehaviour: "remove" | "hide"
  static _counter: number = 0
  screenClosing(): boolean {
    if (!this.screen) {
      return false
    }
    let res
    startTrack(this)
    res = this.screens[this.screen].closing
    stopTrack()
    return res
  }

  screenVisible(): boolean {
    if (!this.screen) {
      return false
    }
    let res
    startTrack(this)

    res = this.screens[this.screen].visible
    stopTrack()
    return res
  }

  handleAnimationStart = (e) => {
    if (e.animationName === "fadeInScreen") {
      //this.track(() => {
      // if there is a screen show function call it
      scrollToLastPosition(this.state.ovl.uiState, this.state.ovl.screens)
      if (this.actions.custom.screens) {
        let screen = this.state.ovl.screens.nav.currentScreen
        let screensFunctions = this.actions.custom.screens

        if (screensFunctions[screen]) {
          if (screensFunctions[screen]["ScreenShow"]) {
            screensFunctions[screen]["ScreenShow"]()
          }
        }
      }
    }
  }

  handleAnimationEnd = (e) => {
    if (e.animationName === "fadeOutScreen") {
      this.actions.ovl.internal.SetVisibleFalse(this.screen)
    }
  }

  async getUI(): Promise<TemplateResult[] | TemplateResult | undefined> {
    return undefined
  }
  init() {
    // use it for getting data from parent, ...
  }

  afterRender() {
    // use it for customisation after every rerender
  }

  updated() {
    // use it for customisation after every rerender and when dom is ready (set focus eg.)
  }

  track(fn: () => any) {
    startTrack(this)
    let res = fn()
    stopTrack()
    return res
  }

  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
    this.state = ovl.state
    this.actions = ovl.actions
    this.effects = ovl.effects
    this.screens = ovl.state.ovl.screens.screens
    this.uiState = ovl.state.ovl.uiState
  }

  async doRender() {
    //console.log("render " + this.name)
    let checkScreen
    actionTracking.lastActionName = "Component " + this.name
    if (this.screen) {
      if (this.screenClosing()) {
        // no complete rerender is necessary
        // just set the animation class accordingly
        let el = this
        if (el) {
          el.classList.remove("fadeInScreen")
          el.classList.add("ovl-disabled")
          el.classList.add("fadeOutScreen")
          return
        }
      }
    }
    checkScreen =
      !this.screen ||
      this.screenVisible() ||
      this.screenCloseBehaviour === "hide"

    let res
    if (checkScreen) {
      // this ensures that labguage change always refreshes components
      // its used as well for the refresh button which should always refresh
      // startTrack(this)
      // this.state.ovl.language.language
      // stopTrack()

      res = await this.getUI()
      if (res !== undefined) {
        if (this.screen) {
          let screenHide = !this.screenVisible() ? "hide" : ""
          if (screenHide) {
            this.classList.add(screenHide)
          } else {
            this.classList.remove("hide")
          }
          if (!this.screenClosing()) {
            this.classList.add("fadeInScreen")

            this.classList.remove("fadeOutScreen")
            this.classList.remove("ovl-disabled")
          }
        }
        await render(res, this)
      }
      await this.afterRender()
      setTimeout(() => {
        this.updated()
      }, 50)
    } else {
      render(res, this)
    }
  }

  connectedCallback() {
    //this.style.display = "block"
    //this.language = this.state.ovl.language
    // startTrack(this)
    // this.language.language
    // this.language.translations
    // stopTrack()

    this.init()
    if (OvlConfig._system.debugTracking) {
      console.log("render " + this.name)
    }
    this.doRender()
    if (this.screen) {
      this.addEventListener("animationend", this.handleAnimationEnd, true)
      this.addEventListener("animationstart", this.handleAnimationStart, true)
    }
  }

  disconnectedCallback() {
    if (this.screen) {
      this.removeEventListener("animationend", this.handleAnimationEnd)
      this.removeEventListener("animationstart", this.handleAnimationStart)
    }
    disposeTrack(this)
  }
}
