import PropTypes from 'prop-types'

const estimations = PropTypes.shape({
  consumed: PropTypes.number,
  estimated: PropTypes.number,
})

export default {
  doTogglePreferredMember: PropTypes.func.isRequired,
  error: PropTypes.string,
  member: PropTypes.shape({
    id: PropTypes.string,
    avatarImg: PropTypes.string,
    name: PropTypes.string,
    estimations,
  }),
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
}
