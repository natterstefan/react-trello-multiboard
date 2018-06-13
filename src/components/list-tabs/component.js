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
    marginTop: 30,
    width: '98vw',
    paddingRight: 25,
    paddingLeft: 10,
  },
})

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
            indicatorColor="primary"
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            textColor="primary"
            value={toggleList}
          >
            {map(listsConfig, (list, idx) => {
              const isDisabled = list === toggleList
              return <Tab label={list.replace(/\//g, '')} key={idx} disabled={isDisabled} />
            })}
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
