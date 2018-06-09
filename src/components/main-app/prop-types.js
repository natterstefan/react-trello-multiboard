import PropTypes from 'prop-types'

export const user = PropTypes.shape({
  authenticated: PropTypes.bool,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
})

export const memberToggle = PropTypes.shape({
  togglePreferred: PropTypes.bool,
  togglePreferredMember: PropTypes.string,
})

export const app = PropTypes.shape({
  memberToggle,
})

export default {
  app: app.isRequired,
  authorize: PropTypes.func.isRequired,
  classes: PropTypes.object,
  doTogglePreferred: PropTypes.func.isRequired,
  error: PropTypes.string,
  isAppLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMembersLoading: PropTypes.bool,
  loadBoards: PropTypes.func.isRequired,
  loadPreferredMembers: PropTypes.func.isRequired,
  user,
}
