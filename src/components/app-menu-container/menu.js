import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DashboardIcon from 'material-ui-icons/Dashboard'
import SettingsIcon from 'material-ui-icons/Settings'

const GITHUB_URL = 'https://github.com/natterstefan/react-trello-multiboard/'

// NOTE: add replace to ListItem because of: https://github.com/ReactTraining/react-router/issues/4467
const AppMenuContent = () => (
  <List>
    <div>
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
      <ListItem
        button
        onClick={() => {
          window.location.href = GITHUB_URL
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
        </ListItemIcon>
        <ListItemText primary="GitHub" />
      </ListItem>
    </div>
  </List>
)

AppMenuContent.displayName = 'AppMenuContent'
export default AppMenuContent
