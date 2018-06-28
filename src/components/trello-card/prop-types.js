import PropTypes from 'prop-types'

export const card = PropTypes.shape({
  id: PropTypes.string.isRequired,
  idMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
})

export default {
  addEstimations: PropTypes.func.isRequired,
  boardName: PropTypes.string.isRequired, // Note: currently addded via container
  card,
  config: PropTypes.shape({
    estimates_with_round_brackets: PropTypes.bool,
    estimates_with_square_brackets: PropTypes.bool,
  }),
  listName: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  minimizeLabels: PropTypes.bool,
  toggleMinimizeLabels: PropTypes.func,
}
