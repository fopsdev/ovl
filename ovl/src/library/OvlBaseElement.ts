import {
  OvlScreen,
  OvlForm,
  OvlState,
  OvlActions,
  OvlEffects,
  OvlConfig,
} from "../index"
import { ovl } from "../index"
import { startTrack, stopTrack, disposeTrack } from "../tracker/tracker"

type ScreensHistory = OvlScreen[]

export type ScreenState = {
  visible?: boolean
  closing?: boolean
  lastScrollTop?: number
  screenCloseBehaviour?: ScreenCloseBehaviour
  screenFetchRequestBehaviour?: ScreenFetchRequestBehaviour
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
export type ScreenCloseBehaviour = "remove" | "ovl-hide"
export type ScreenFetchRequestBehaviour = "disable" | "none"
export const setLastScrollPosition = (
  screens: typeof ovl.state.ovl.screens
) => {
  let currentScreen = screens.nav.currentScreen
  if (currentScreen) {
    // get the first scrollable class of the doc
    let o = screens.screens[currentScreen]
    let scrollable
    if (isMobile()) {
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

export const scrollToLastPosition = (screens: typeof ovl.state.ovl.screens) => {
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
  if (isMobile()) {
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
import { isMobile } from "../global/globals"

export class OvlBaseElement extends HTMLElement {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
  screens: { [key in OvlScreen]: ScreenState }
  uiState: typeof ovl.state.ovl.uiState
  name: string
  _id: number = 0
  screen: OvlScreen

  screenCloseBehaviour: ScreenCloseBehaviour
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
      scrollToLastPosition(this.state.ovl.screens)
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
      this.actions.ovl.internal.SetVisible(this.screen)
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
    // // always track ovl. its useful for rehydration easyness
    // this.state.ovl
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
    actionTracking.lastActionName = "Component: " + document.activeElement.id
    if (this.screen) {
      if (!this.id) {
        this.id = "ovlscreen_" + this.screen
      }

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
      this.screenCloseBehaviour === "ovl-hide"

    let res
    if (checkScreen) {
      res = await this.getUI()
      if (res !== undefined) {
        if (this.screen) {
          this.classList.add("ovl-screen")
          let screenHide = !this.screenVisible() ? "ovl-hide" : ""
          if (screenHide) {
            this.classList.add(screenHide)
          } else {
            this.classList.remove("ovl-hide")
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
    this.init()
    if (this.screen) {
      this.screenCloseBehaviour = this.screens[this.screen].screenCloseBehaviour
    }
    if (OvlConfig._system.debugTracking) {
      console.log("render %c" + this.name, "color:green")
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
