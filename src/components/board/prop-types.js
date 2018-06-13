import PropTypes from 'prop-types'
import { list } from '../trello-cards-list/prop-types'

export default {
  board: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  error: PropTypes.object,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      list,
      config: PropTypes.object,
      pattern: PropTypes.string,
    }),
  ),
  isLoading: PropTypes.bool,
  loadLists: PropTypes.func,
  resetEstimations: PropTypes.func,
  toggleList: PropTypes.string,
}
