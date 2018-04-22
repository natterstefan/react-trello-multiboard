import React from 'react'
import { find, get, invoke, isEqual } from 'lodash'

// Material UI
import { withStyles } from 'material-ui/styles'
import { LinearProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

// Components
import proptypes from './prop-types'
import EstimationCard from '../estimation-card'
import BoardsList from '../boards-list'
import MembersList from '../members-list'
import Footer from '../footer'

// Styles Components
import { BlockContainer } from '../styled-components'

// Material UI Styles
const styles = theme => ({
  bottomLoader: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

class MainApp extends React.Component {
  componentDidMount() {
    // start autorizing the user automatically, one could also do this onClick on
    // a Login button or different element/interaction
    invoke(this.props, 'authorize')
  }

  componentDidUpdate(prevProps) {
    // user is logged in, start loading boards
    if (!isEqual(prevProps.user, this.props.user) && get(this.props, 'user.authenticated', false)) {
      invoke(this.props, 'loadPreferredMembers')
    } else if (
      !isEqual(prevProps.isMembersLoading, this.props.isMembersLoading) &&
      get(this.props, 'isMembersLoading', false)
    ) {
      invoke(this.props, 'loadBoards')
    }
  }

  getEstimationTitle() {
    const { members } = this.props
    const togglePreferred = get(this.props, 'app.memberToggle.togglePreferred', false)
    const togglePreferredMember = get(this.props, 'app.memberToggle.togglePreferredMember', null)
    const defaultTitle = 'Estimations'

    if (togglePreferred && !!togglePreferredMember) {
      return `${find(members, { id: togglePreferredMember }).fullName}'s ${defaultTitle}`
    } else if (togglePreferred) {
      return `Preferred Member's ${defaultTitle}`
    }
    return defaultTitle
  }

  render() {
    const { app, classes, isAppLoading, isLoading } = this.props
    const togglePreferred = get(app, 'memberToggle.togglePreferred', false)
    const togglePreferredMember = get(app, 'memberToggle.togglePreferredMember', false)

    if (isLoading) {
      return (
        <div className={classes.bottomLoader}>
          <LinearProgress />
        </div>
      )
    }

    // vheight sticky footer trick, see: https://blog.hellojs.org/flexbox-sticky-footer-and-react-d116e4cfca5
    return (
      <div style={{ minHeight: '100vh' }}>
        <BlockContainer>
          <Typography variant="headline" component="h2">
            Options
          </Typography>
          <Button
            variant="raised"
            id="togglePreferredButton"
            className={classes.button}
            onClick={() => {
              invoke(this.props, 'doTogglePreferred', !togglePreferred)
            }}
          >
            {togglePreferred || togglePreferredMember
              ? 'Toggle all Members'
              : 'Toggle preferred Members'}
          </Button>
          <Button
            variant="raised"
            id="doRefreshButton"
            className={classes.button}
            onClick={() => {
              invoke(this.props, 'loadBoards')
            }}
          >
            Refresh Boards
          </Button>
        </BlockContainer>
        <BlockContainer>
          <Typography variant="headline" component="h2">
            Preferred Members
          </Typography>
        </BlockContainer>
        <MembersList />
        <BlockContainer>
          <Typography variant="headline" component="h2">
            {this.getEstimationTitle()}
          </Typography>
        </BlockContainer>
        <BlockContainer>
          <EstimationCard />
        </BlockContainer>
        <BoardsList />
        {isAppLoading && (
          <div className={classes.bottomLoader}>
            <LinearProgress />
          </div>
        )}
        {!isAppLoading && <Footer />}
      </div>
    )
  }
}

MainApp.propTypes = proptypes
export default withStyles(styles)(MainApp)
