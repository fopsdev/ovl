if (
  window.navigator.userAgent.indexOf("Edge") > -1 ||
  (!!window.MSInputMethodContext && !!document.documentMode) ||
  navigator.appVersion.indexOf("MSIE 10") !== -1
) {
  alert(
    "DE: Inkompatibler Browser entdeckt. Diese Webseite läuft auf: Chrome, Firefox, Safari und Edge in jeweils aktuellen Versionen. Falls Sie nicht Chrome oder Firefox einsetzen wollen installieren Sie doch bitte den neuen Edge Browser nach dem bestätigen dieser Meldung.\nFR: Navigateur incompatible découvert. Ca site fonctionne sur: Chrome, Firefox, Safari et le nouveau navigateur MS Edge. Si vous ne souhaitez pas utiliser Chrome ou Firefox, veuillez installer le nouveau navigateur Edge après avoir confirmé ce message"
  )
  window.location.href =
    "https://support.microsoft.com/de-ch/help/4501095/download-the-new-microsoft-edge-based-on-chromium"
}
/*
 * long-press-event
 * Pure JavaScript long-press-event
 * */
!(function (e, t) {
  "use strict"
  var n = null,
    a =
      "ontouchstart" in e ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0,
    i = a ? "touchstart" : "mousedown",
    o = a ? "touchend" : "mouseup",
    m = a ? "touchmove" : "mousemove",
    u = 0,
    r = 0,
    s = 10,
    c = 10
  function l(i) {
    v(i)
    var m = i.target,
      u = parseInt(m.getAttribute("data-long-press-delay") || "450", 10)
    n = (function (t, n) {
      if (
        !(
          e.requestAnimationFrame ||
          e.webkitRequestAnimationFrame ||
          (e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame) ||
          e.oRequestAnimationFrame ||
          e.msRequestAnimationFrame
        )
      )
        return e.setTimeout(t, n)
      var a = new Date().getTime(),
        i = {},
        o = function () {
          new Date().getTime() - a >= n
            ? t.call()
            : (i.value = requestAnimFrame(o))
        }
      return (i.value = requestAnimFrame(o)), i
    })(
      function (e) {
        v()
        var n = a ? e.touches[0].clientX : e.clientX,
          i = a ? e.touches[0].clientY : e.clientY
        this.dispatchEvent(
          new CustomEvent("long-press", {
            bubbles: !0,
            cancelable: !0,
            detail: { clientX: n, clientY: i },
          })
        ) &&
          t.addEventListener(
            o,
            function e(n) {
              t.removeEventListener(o, e, !0),
                (function (e) {
                  e.stopImmediatePropagation(),
                    e.preventDefault(),
                    e.stopPropagation()
                })(n)
            },
            !0
          )
      }.bind(m, i),
      u
    )
  }
  function v(t) {
    var a
    ;(a = n) &&
      (e.cancelAnimationFrame
        ? e.cancelAnimationFrame(a.value)
        : e.webkitCancelAnimationFrame
        ? e.webkitCancelAnimationFrame(a.value)
        : e.webkitCancelRequestAnimationFrame
        ? e.webkitCancelRequestAnimationFrame(a.value)
        : e.mozCancelRequestAnimationFrame
        ? e.mozCancelRequestAnimationFrame(a.value)
        : e.oCancelRequestAnimationFrame
        ? e.oCancelRequestAnimationFrame(a.value)
        : e.msCancelRequestAnimationFrame
        ? e.msCancelRequestAnimationFrame(a.value)
        : clearTimeout(a)),
      (n = null)
  }
  "function" != typeof e.CustomEvent &&
    ((e.CustomEvent = function (e, n) {
      n = n || { bubbles: !1, cancelable: !1, detail: void 0 }
      var a = t.createEvent("CustomEvent")
      return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a
    }),
    (e.CustomEvent.prototype = e.Event.prototype)),
    (e.requestAnimFrame =
      e.requestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame ||
      e.msRequestAnimationFrame ||
      function (t) {
        e.setTimeout(t, 1e3 / 60)
      }),
    t.addEventListener(o, v, !0),
    t.addEventListener(
      m,
      function (e) {
        var t = Math.abs(u - e.clientX),
          n = Math.abs(r - e.clientY)
        ;(t >= s || n >= c) && v()
      },
      !0
    ),
    t.addEventListener("wheel", v, !0),
    t.addEventListener("scroll", v, !0),
    t.addEventListener(
      i,
      function (e) {
        ;(u = e.clientX), (r = e.clientY), l(e)
      },
      !0
    )
})(window, document)
