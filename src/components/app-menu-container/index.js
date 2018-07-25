import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

// App Menu Content
import AppMenuContent from './menu'
import Config from '../../../config/config'

import { BREAKPOINTS } from '../../constants'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appFrame: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    borderRight: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
    padding: 20,
    [BREAKPOINTS.small]: {
      padding: 10,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
})

class AppMenuContainer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
    pages: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme, pages } = this.props
    const { open } = this.state

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={'left'}
        open={open}
        classes={{
          docked: classes.drawer,
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <AppMenuContent pages={pages} />
      </Drawer>
    )

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes['appBarShift-left']]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                {Config.app_title || 'Trello Multiboard'}
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
              [classes['contentShift-left']]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }
}

// Note about tests: https://github.com/mui-org/material-ui/issues/9266#issuecomment-349447137
export default withStyles(styles, { withTheme: true })(AppMenuContainer)
