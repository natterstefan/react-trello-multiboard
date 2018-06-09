import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'

// NOTE: add replace to ListItem because of: https://github.com/ReactTraining/react-router/issues/4467
const AppMenuContent = () => (
  <div>
    <List component="nav">
      <ListItem component={Link} button replace to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem component={Link} button replace to="/config">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Config" />
      </ListItem>
      <ListItem component={Link} button replace to="/github">
        <ListItemIcon>
          <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
        </ListItemIcon>
        <ListItemText primary="GitHub" />
      </ListItem>
    </List>
  </div>
)

AppMenuContent.displayName = 'AppMenuContent'
export default AppMenuContent
