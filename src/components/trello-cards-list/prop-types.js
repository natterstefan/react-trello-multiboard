import PropTypes from 'prop-types'
import { card } from '../trello-card/prop-types'

export const listConfig = PropTypes.shape({
  board: PropTypes.string.isRequired,
  estimates_with_round_brackets: PropTypes.bool,
  estimates_with_square_brackets: PropTypes.bool,
  shortcut: PropTypes.string,
})

export const list = PropTypes.shape({
  id: PropTypes.string.isRequired,
  idBoard: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})

export const proptypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card,
      ...listConfig,
    }),
  ),
  config: listConfig,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  list,
  loadCards: PropTypes.func.isRequired,
}
