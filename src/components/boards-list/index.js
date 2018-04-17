import { connect } from 'react-redux'
import { get } from 'lodash'

import BoardsList from './component'

const mapStateToProps = state => ({
  boards: get(state, 'boards', {}),
})

const mapDispatchToProps = () => ({})

const mergeProps = stateProps => {
  const boards = get(stateProps.boards, 'data', {})
  const isLoading = get(boards, 'isLoading', false)
  const error = get(boards, 'error')

  return {
    boards,
    error,
    isLoading,
  }
}

const BoardsListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(BoardsList)
export default BoardsListContainer
