import React from 'react'
import PropTypes from 'prop-types'
import { get, map } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = () => ({
  root: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    marginBottom: 30,
    width: '100%',
  },
})

// TODO:
// - add tests and fix ui on smaller screens (padding/margin right)
// - adjust so that it works with scrolling, see https://material-ui.com/demos/tabs/#automatic-scroll-buttons
class ListTabs extends React.Component {
  handleChange = (event, value) => {
    this.props.changeListToggle(get(this.props, `listsConfig[${value}]`))
  }

  render() {
    const { classes, listsConfig, toggleList } = this.props

    // - only render tabs, when there is more than one listpattern
    if (listsConfig.length <= 1) {
      return null
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={toggleList}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="on"
          >
            {map(listsConfig, (list, idx) => <Tab label={list.replace('/', '')} key={idx} />)}
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

ListTabs.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  changeListToggle: PropTypes.func.isRequired,
  listsConfig: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleList: PropTypes.string.isRequired,
}

export default withStyles(styles)(ListTabs)
