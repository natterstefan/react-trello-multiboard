import { connect } from 'react-redux'
import { get } from 'lodash'

import BoardsList from './component'
import { getMemberByOneOfProperty } from '../../utils/get-member-by-property'

const mapStateToProps = state => ({
  boards: get(state, 'boards', {}),
  members: get(state, 'members', {}),
  memberToggle: get(state, 'app.memberToggle'),
})

const mapDispatchToProps = () => ({})

const mergeProps = stateProps => {
  const boards = get(stateProps.boards, 'data', {})
  const isLoading = get(stateProps.boards, 'isLoading', false)
  const error = get(stateProps.boards, 'error')

  const getEstimations = (board = {}) => {
    const { togglePreferredMember } = stateProps.memberToggle
    const boardId = get(board, 'board.id')
    let { estimations } = board

    if (togglePreferredMember) {
      const member =
        getMemberByOneOfProperty(
          stateProps.members.members,
          ['id', 'username'],
          togglePreferredMember,
        ) || {}

      estimations = get(stateProps, `members[${member.id}].boardEstimations[${boardId}]`)
    }

    return estimations || {}
  }

  return {
    boards,
    error,
    getEstimations,
    isLoading,
  }
}

const BoardsListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(BoardsList)
export default BoardsListContainer
