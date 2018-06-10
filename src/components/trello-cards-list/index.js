import { connect } from 'react-redux'
import { get } from 'lodash'
import List from './component'
import { requestCards } from '../../actions/cards'

const mapStateToProps = state => ({
  cards: get(state, 'cards', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // data
  const cardState = get(stateProps, `cards[${ownProps.list.id}]`, {})
  const cards = get(cardState, 'data', [])
  const isLoading = get(cardState, 'isLoading', false)
  const error = get(cardState, 'error')

  // actions
  const loadCards = () => dispatchProps.dispatch(requestCards(ownProps.list, ownProps.config))

  return {
    ...stateProps,
    ...ownProps,
    error,
    cards,
    isLoading,
    loadCards,
  }
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(List)
export default ListContainer
