import React from 'react'
import { map } from 'lodash'
import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import Config from '../../../config/config'

let menuConfig = [
  {
    target: '/',
    icon: () => <DashboardIcon />,
    title: 'Dashboard',
  },
  {
    target: '/config',
    icon: () => <SettingsIcon />,
    title: 'Config',
  },
  {
    target: '/github',
    icon: () => <FontAwesomeIcon icon={['fab', 'github']} size="lg" />,
    title: 'GitHub',
  },
]

// inspired by https://stackoverflow.com/a/38181008/1238150
const appendAtIndex = (array, obj, index = 0) => [
  ...array.slice(0, index),
  obj,
  ...array.slice(index),
]

// - add Privacy only if config.google_analytics_property = true
if (Config.google_analytics_property) {
  const menuItem = {
    target: '/privacy',
    icon: () => <FingerprintIcon />,
    title: 'Privacy',
  }
  menuConfig = appendAtIndex(menuConfig, menuItem, 2)
}

// NOTE: add 'replace' property to ListItem because of:
// https://github.com/ReactTraining/react-router/issues/4467
const AppMenuContent = () => (
  <React.Fragment>
    <List component="nav">
      {map(menuConfig, menu => (
        <ListItem key={menu.title} component={Link} button replace to={menu.target}>
          <ListItemIcon>{menu.icon()}</ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItem>
      ))}
    </List>
  </React.Fragment>
)

AppMenuContent.displayName = 'AppMenuContent'
export default AppMenuContent
