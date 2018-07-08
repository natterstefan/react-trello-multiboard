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

const menuConfig = [
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
    target: '/privacy',
    icon: () => <FingerprintIcon />,
    title: 'Privacy',
  },
  {
    target: '/github',
    icon: () => <FontAwesomeIcon icon={['fab', 'github']} size="lg" />,
    title: 'GitHub',
  },
]

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
