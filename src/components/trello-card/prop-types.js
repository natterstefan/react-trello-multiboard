import PropTypes from 'prop-types'

export const cardId = PropTypes.string

export const card = PropTypes.shape({
  id: PropTypes.string.isRequired,
  idMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
})

export default {
  addEstimations: PropTypes.func.isRequired,
  card,
  config: PropTypes.shape({
    estimates_with_round_brackets: PropTypes.bool,
    estimates_with_square_brackets: PropTypes.bool,
  }),
  isHidden: PropTypes.bool,
}
