import { Screen, FormType, OvlState, OvlActions, OvlEffects } from "../index"
import { ovl } from "../index"
import {
  startTrack,
  stopTrack,
  disposeTrack,
  logTrackingList,
  paths,
  callbacks,
} from "../tracker/tracker"

type ScreensHistory = Screen[]

export type ScreensState = {
  nextScreen: Screen
  currentScreen: Screen
  screensHistory: ScreensHistory
  formTypeToReset: FormType
  formIdToReset: string
}

export const setLastScrollPosition = (state: OvlState) => {
  let currentScreen = state.ovl.screens.nav.currentScreen
  if (currentScreen) {
    // get the first scrollable class of the doc
    let o = state.ovl.screens.screenState[currentScreen]
    let scrollable
    if (state.ovl.uiState.isMobile) {
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

export const scrollToLastPosition = (state: OvlState) => {
  let screen = state.ovl.screens.nav.currentScreen
  if (
    !state.ovl.screens.screenState ||
    !state.ovl.screens.screenState[screen]
  ) {
    return
  }
  let lastScrollTop = state.ovl.screens.screenState[screen].lastScrollTop
  // set scroll to remembered pos
  let scrollable
  if (state.ovl.uiState.isMobile) {
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

import { render, TemplateResult } from "lit-html"

export class OvlBaseElement extends HTMLElement {
  state: OvlState
  actions: OvlActions
  effects: OvlEffects
  name: string
  _id: number = 0

  screen: string
  animatedClass: string
  static _counter: number = 0
  screenClosing() {
    if (
      this.state.ovl.screens &&
      this.state.ovl.screens.screenState &&
      this.state.ovl.screens.screenState[this.screen] !== undefined
    ) {
      return this.track(() => {
        this.state.ovl.screens.screenState[this.screen]
        return this.state.ovl.screens.screenState[this.screen].closing === true
      })
    }

    return false
  }

  screenVisible() {
    return this.track(() => {
      this.state.ovl.screens.screenState[this.screen]
      let visible =
        this.state.ovl.screens.screenState[this.screen].visible === true
      //logTrackingList()
      return visible
    })
  }

  handleAnimationStart = (e) => {
    if (e.animationName === "fadeInScreen") {
      //this.track(() => {
      // if there is a screen show function call it
      scrollToLastPosition(this.state)
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
  }

  async doRender() {
    //console.log("render " + this.name)
    let checkScreen

    this.state.ovl.language.translations
    if (this.screen) {
      if (!this.screenClosing()) {
        this.animatedClass = " fadeInScreen"
      } else {
        // no complete rerender is necessary
        // just set the animation class accordingly
        //this.animatedClass = " animated fadeOut faster nopointerevents"
        let els = this.getElementsByClassName("fadeInScreen")
        if (els.length > 0) {
          let el = els[0]
          el.classList.add("fadeOutScreen")
          el.classList.add("nopointerevents")
          el.classList.remove("fadeInScreen")
          return
        }
      }
    }
    checkScreen = !this.screen || this.screenVisible()

    let res = null
    if (checkScreen) {
      res = await this.getUI()
    }
    if (res !== undefined) {
      render(res, this)
    }
    this.afterRender()
    setTimeout(() => {
      this.updated()
    }, 50)
  }

  connectedCallback() {
    this.init()
    if (this.screen) {
      if (this.state.ovl.screens.screenState === undefined) {
        this.state.ovl.screens.screenState = {}
      }
      if (this.state.ovl.screens.screenState[this.screen] === undefined) {
        this.state.ovl.screens.screenState[this.screen] = {
          visible: false,
          isClosing: false,
        }
      }
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
