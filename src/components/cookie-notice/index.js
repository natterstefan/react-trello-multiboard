/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import CookieBanner from 'react-cookie-banner'

const message =
  'We use cookies to give you the best online experience. See what we do and how you can disagree '

// TODO
// - add notice only if config.google_analytics_property = true
const CookieNotice = () => (
  <div className="cookie-notice">
    <CookieBanner
      className="cookie-notice--banner"
      cookiePath="/"
      cookie="user-has-accepted-cookies"
      dismissOnScroll={false}
      disableStyle
      buttonMessage="OK"
      link={<Link to="/privacy">here.</Link>}
      message={message}
    />
  </div>
)

export default CookieNotice
