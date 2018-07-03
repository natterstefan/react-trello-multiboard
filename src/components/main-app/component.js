import React from 'react'
import { get, has, invoke, isEqual } from 'lodash'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Components and PropTypes
import proptypes from './prop-types'
import BoardsList from '../boards-list'
import EstimationCard from '../estimation-card'
import Footer from '../footer'
import ListTabs from '../list-tabs'
import MembersList from '../members-list'
import Notification from '../notification'

// Utils
import { getMemberByOneOfProperty } from '../../utils/get-member-by-property'

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
  constructor(props) {
    super(props)
    this.state = {
      showEstimationCard: false,
    }
  }

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
    const defaultEstimationTitle = `Preferred Member's ${defaultTitle}`

    if (togglePreferred && !!togglePreferredMember) {
      const member = getMemberByOneOfProperty(members, ['id', 'username'], togglePreferredMember)
      if (has(member, 'fullName')) {
        return `${member.fullName}'s ${defaultTitle}`
      }
      return defaultEstimationTitle
    } else if (togglePreferred) {
      return defaultEstimationTitle
    }
    return defaultTitle
  }

  render() {
    const { showEstimationCard } = this.state
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
      <React.Fragment>
        <Notification />
        <div style={{ minHeight: '100vh', marginBottom: 30, paddingBottom: 50 }}>
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
              id="showEstimationCard"
              className={classes.button}
              onClick={() => {
                this.setState({ showEstimationCard: !this.state.showEstimationCard })
              }}
            >
              Show Estimations Card
            </Button>
            <Button
              variant="raised"
              id="doResetButton"
              className={classes.button}
              onClick={() => {
                invoke(this.props, 'reloadBoards')
                invoke(this.props, 'loadPreferredMembers')
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
          {showEstimationCard && (
            <React.Fragment>
              <BlockContainer>
                <Typography variant="headline" component="h2">
                  {this.getEstimationTitle()}
                </Typography>
              </BlockContainer>
              <BlockContainer>
                <EstimationCard />
              </BlockContainer>
            </React.Fragment>
          )}
          <BlockContainer>
            <Typography variant="headline" component="h2">
              Boards {get(this.props, 'app.listToggle.toggleList', '').replace(/\//g, '')}
            </Typography>
            <ListTabs />
          </BlockContainer>
          <BoardsList />
          {isAppLoading && (
            <div className={classes.bottomLoader}>
              <LinearProgress />
            </div>
          )}
          {!isAppLoading && <Footer />}
        </div>
      </React.Fragment>
    )
  }
}

MainApp.propTypes = proptypes
export default withStyles(styles)(MainApp)
