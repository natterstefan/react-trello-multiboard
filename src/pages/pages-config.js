import React from 'react'
import { compact } from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import Config from '../../config/config'

import AppPage from './page-app'
import ConfigPage from './page-config'
import PrivacyPage from './page-privacy'
import { GITHUB_URL } from '../constants'

const configPageRoute = {
  component: ConfigPage,
  icon: () => <SettingsIcon />,
  target: '/config',
  title: 'Config',
}

const configPrivacyRoute = {
  component: PrivacyPage,
  icon: () => <FingerprintIcon />,
  target: '/privacy',
  title: 'Privacy',
}

const PAGES = compact([
  {
    component: AppPage,
    icon: () => <DashboardIcon />,
    target: '/',
    title: 'Dashboard',
  },
  {
    component: () => {
      // alternative https://stackoverflow.com/a/42988282/1238150
      window.location.href = GITHUB_URL
      return null
    },
    icon: () => <FontAwesomeIcon icon={['fab', 'github']} size="lg" />,
    target: '/github',
    title: 'GitHub',
  },
  Config.google_analytics_property ? configPrivacyRoute : undefined,
  Config.show_config_page ? configPageRoute : undefined,
])

export default PAGES
