import PropTypes from 'prop-types'

export default {
  error: PropTypes.string,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      board: PropTypes.shape({
        name: PropTypes.string,
      }),
      config: PropTypes.object,
    }),
  ),
  isLoading: PropTypes.bool,
}
