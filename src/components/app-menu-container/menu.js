import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// NOTE: add 'replace' property to ListItem because of:
// https://github.com/ReactTraining/react-router/issues/4467
const AppMenuContent = props => (
  <React.Fragment>
    <List component="nav">
      {map(props.pages, menu => (
        <ListItem key={menu.title} component={Link} button replace to={menu.target}>
          <ListItemIcon>{menu.icon()}</ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItem>
      ))}
    </List>
  </React.Fragment>
)

AppMenuContent.displayName = 'AppMenuContent'
AppMenuContent.propTypes = {
  pages: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
}
export default AppMenuContent
