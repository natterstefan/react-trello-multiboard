import PropTypes from 'prop-types'
import { memberToggle } from '../main-app/prop-types'

// TODO: add members object validation
export default {
  companyMember: PropTypes.string,
  boards: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        board: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        }).isRequired,
        estimations: PropTypes.shape({
          consumed: PropTypes.number,
          estimated: PropTypes.number,
        }),
      }),
    ),
  }).isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  memberToggle,
}
