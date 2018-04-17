import PropTypes from 'prop-types'

export const member = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
})

const membersList = {
  members: PropTypes.arrayOf(member).isRequired,
}

export default {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  members: PropTypes.shape({
    ...membersList,
  }),
}
