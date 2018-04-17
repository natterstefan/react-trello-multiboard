import { connect } from 'react-redux'
import { get } from 'lodash'
import Board from './component'
import { requestLists } from '../../actions/lists'

const mapStateToProps = state => ({
  info: get(state, 'info', {}),
  lists: get(state, 'lists', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // data
  const listState = get(stateProps, `lists[${ownProps.board.id}]`, {})
  const lists = get(listState, 'data', [])
  const isLoading = get(listState, 'isLoading', false)
  const error = get(listState, 'error')

  // actions
  const loadLists = () => dispatchProps.dispatch(requestLists(ownProps.board, ownProps.config))

  return {
    ...stateProps,
    ...ownProps,
    error,
    lists,
    isLoading,
    loadLists,
  }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board)
export default BoardContainer
