import { connect } from 'react-redux'
import { get } from 'lodash'
import Board from './component'
import { requestLists } from '../../actions/lists'
import { resetEstimations } from '../../actions/app'

const mapStateToProps = state => ({
  lists: get(state, 'lists', {}),
  toggleList: get(state, 'app.listToggle.toggleList'),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // data
  const listState = get(stateProps, `lists[${ownProps.board.id}]`, {})
  const lists = get(listState, 'data', [])
  const isLoading = get(listState, 'isLoading', false)
  const error = get(listState, 'error')

  // actions
  // TODO: validate ownProps, what is still necessary to have to eg. fullfill loadLists
  const loadLists = () => dispatchProps.dispatch(requestLists(ownProps.board, ownProps.config))

  return {
    ...stateProps,
    ...ownProps,
    error,
    lists,
    isLoading,
    loadLists,
    resetEstimations: () => dispatchProps.dispatch(resetEstimations()),
  }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board)
export default BoardContainer
