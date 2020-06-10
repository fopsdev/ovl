import { overmind, Screen, FormType, customFunctions } from "../index"
import { IS_PROXY } from "proxy-state-tree"

import { EventType } from "overmind"
import { render, TemplateResult } from "lit-html"
import { ITrackStateTree } from "proxy-state-tree"

type ScreensHistory = Screen[]

export type ScreensState = {
  nextScreen: Screen
  currentScreen: Screen
  screensHistory: ScreensHistory
  formTypeToReset: FormType
  formIdToReset: string
}

export const setLastScrollPosition = (state: typeof overmind.state) => {
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

export const scrollToLastPosition = (state: typeof overmind.state) => {
  let screen = state.ovl.screens.nav.currentScreen
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

export class OvlBaseElement extends HTMLElement {
  _id: number
  _flushId: number
  state: typeof overmind.state
  actions: typeof overmind.actions
  name: string
  trackedTree: ITrackStateTree<object>
  screen: string
  animatedClass: string
  props: any
  hasRescoped: boolean
  static _counter: number = 0

  // should be overwritten in derived element
  // gets a optimized lit-html template
  async getUI(): Promise<TemplateResult> {
    return undefined
  }

  // use this to create/update dom when not using lit-html
  setUI() {}

  // can be overwritten in derived element
  init() {
    // use it for getting data from parent, ...
  }

  screenClosing() {
    if (
      this.state.ovl.screens &&
      this.state.ovl.screens.screenState &&
      this.state.ovl.screens.screenState[this.screen] !== undefined
    ) {
      return this.state.ovl.screens.screenState[this.screen].closing === true
    }

    return false
  }

  screenVisible() {
    if (
      this.state.ovl.screens &&
      this.state.ovl.screens.screenState &&
      this.state.ovl.screens.screenState[this.screen] !== undefined
    ) {
      return this.state.ovl.screens.screenState[this.screen].visible === true
    }
    return false
  }
  // // can be overwritten in derived element
  // initFormState() {
  //   // use it for init state as in 2nd level formcomp
  //   // makes sure that actions called inside this method don't cause a recalc (initialised flag)
  // }

  // // can be overwritten in derived element
  // initTableState() {
  //   // use it for init state as in 2nd level tablecomp
  //   // makes sure that actions called inside this method don't cause a recalc (initialised flag)
  // }

  afterRender() {
    // use it eg. for dom manips after rendering which doesn't need to be visible yet
  }

  updated() {
    // use it eg. for dom manips after rerendering/displaying. use it eg. to set focus
  }

  handleAnimationStart = (e) => {
    if (e.animationName === "fadeInScreen") {
      // if there is a screen show function call it
      scrollToLastPosition(this.state)
      if (customFunctions) {
        let screen = this.state.ovl.screens.nav.currentScreen
        let screensFunctions = customFunctions["screens"]
        if (screensFunctions) {
          if (screensFunctions[screen]) {
            if (screensFunctions[screen]["ScreenShow"]) {
              screensFunctions[screen]["ScreenShow"](
                this.state,
                this.actions,
                overmind.effects
              )
            }
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

  constructor() {
    super()
    this.animatedClass = ""
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
  }

  async doRender() {
    // console.log(this.name + " startRender")
    // from here now this.state.xy will be tracked
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

    let res = null
    if (!this.screen || this.screenVisible()) {
      res = await this.getUI()
    }
    if (res !== undefined) {
      render(res, this)
    }
    this.setUI()

    this.afterRender()
    setTimeout(() => {
      this.updated()
    }, 50)

    this.state.ovl.language.translations

    //console.log(this.trackedTree.pathDependencies)

    // always track translations
    // its using a caching mechanism thats why not all translations were properly tracked. this line enforces it

    //if (this.screen) {
    //   // Special case: we don't want the roots of screenstate to be tracked
    //   // because every screen adds its state dynamically to it
    //   // that would mean that every time a screen gets added a unecessary rerender would be the cause
    //   // because thats surely the case we will just ignore those paths by removing them
    // this.removePathsFromTracking("app.screens.screenState." + this.screen)
    this.removePathsFromTracking("app.screens.screenState")
    this.removePathsFromTracking("app.screens")
    // this.removePathsFromTracking("app.screens.nav")
    // this.removePathsFromTracking("app.screens.nav.currentScreen")
    // this.removePathsFromTracking("app.screens.nav.currentScreen")
    // this.removePathsFromTracking("app.screens.nav.nextScreen")
    // this.removePathsFromTracking("app.screens.nav.screensHistory")
    // this.removePathsFromTracking("app.screens.screens")
    this.removePathsFromTracking("app.forms")
    //}

    //console.log(this.trackedTree.master.)
    let eventType = EventType.COMPONENT_ADD
    if (this._flushId) {
      eventType = EventType.COMPONENT_UPDATE
    }
    let eventObj: any = {
      componentId: this.name,
      componentInstanceId: this._id,
      name: this.name,
      paths: Array.from(this.trackedTree.pathDependencies) as any,
    }
    if (this._flushId) {
      eventObj.flushId = this._flushId
    }
    // console.log("send to devtools:")
    // console.log(eventType)
    // console.log(eventObj)
    overmind.eventHub.emitAsync(eventType, eventObj)
  }

  removePathsFromTracking(path: string) {
    if (this.trackedTree.pathDependencies.has(path)) {
      this.trackedTree.pathDependencies.delete(path)
      this.trackedTree.master.removePathDependency(
        path,
        this.trackedTree.callback
      )
    }
  }

  onUpdate = async (mutations, paths, flushId, isAsync) => {
    this.trackedTree.track(this.onUpdate)
    console.log(this.name + " onUpdate")
    console.log("paths:")
    //console.log(isAsync)
    console.log(paths)
    // // console.log(flushId)
    // console.log("mutations:")
    // console.log(mutations)

    // console.log("tracked tree deps")
    // console.log(this.trackedTree.pathDependencies)
    this.doRender()
    this._flushId = flushId
  }

  rescope(data: any) {
    let hasRescoped = false
    if (!data) {
      for (let key in this.props) {
        if (this.props[key] && this.props[key][IS_PROXY]) {
          //@ts-ignore
          this.props[key] = overmind.proxyStateTree.rescope(
            this.props[key],
            this.trackedTree
          )
          hasRescoped = true
        }
      }
    }
  }

  connectedCallback() {
    //@ts-ignore
    this.trackedTree = overmind.proxyStateTree.getTrackStateTreeWithProxifier() // overmind.getTrackStateTreeWithProxifier()
    this.actions = overmind.actions

    this.trackedTree.track(this.onUpdate)
    this.state = <typeof overmind.state>this.trackedTree.state
    this.init()
    this.doRender()
    if (this.screen) {
      this.addEventListener("animationend", this.handleAnimationEnd, true)
      this.addEventListener("animationstart", this.handleAnimationStart, true)
    }
  }

  disconnectedCallback() {
    //console.log(this.name + " disconnect")
    if (this.screen) {
      this.removeEventListener("animationend", this.handleAnimationEnd)
      this.removeEventListener("animationstart", this.handleAnimationStart)
    }
    overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
      componentId: this.name,
      componentInstanceId: this._id,
      name: this.name,
    })
    this.trackedTree.dispose()
  }
}
