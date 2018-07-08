/* eslint-disable */
import Config from '../../config/config'

/**
 * initGA
 *
 * initialises Google Analytics tracking (if set in Config), anonymizes the IP
 * triggers initial pageview and pageviews on consequent history changes
 */
export const initGA = history => {
  if (!Config.google_analytics_property) {
    // tracking is not enabled
    return
  }
  const gaProperty = Config.google_analytics_property
  const disableStr = 'ga-disable-' + gaProperty

  function gaOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
    window[disableStr] = true
    alert('Google Analytics tracking was deactivated. Please refresh the page.')
  }
  window.gaOptout = gaOptout
  if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true
    return // do not track
  }

  // always respect doNotTrack browser setting
  if (navigator.doNotTrack == '1' || window.doNotTrack == '1') {
    ;(function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r
      ;(i[r] =
        i[r] ||
        function() {
          ;(i[r].q = i[r].q || []).push(arguments)
        }),
        (i[r].l = 1 * new Date())
      ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
  }
  if (typeof ga === 'function') {
    ga('create', gaProperty, 'auto')
    ga('set', 'anonymizeIp', 1)
    ga('send', 'pageview', history.location.pathname) // initial pageview

    history.listen(location => {
      ga('send', 'pageview', location.pathname)
    })
  }
}
