import { connect } from 'react-redux'
import { find, get } from 'lodash'
import Card from './component'
import { isCardHidden } from './utils'
import { addMembersEstimation } from '../../actions/members'
import { addBoardEstimations } from '../../actions/boards'

const mapStateToProps = state => ({
  boardData: get(state, 'boards.data', []),
  memberToggle: get(state, 'app.memberToggle', {}),
  members: get(state, 'members.members', []),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, { dispatch }, ownProps) => {
  const addEstimations = estimations => {
    dispatch(addMembersEstimation(ownProps.card.idMembers, estimations, ownProps.card.idBoard))
    // sums total, not only for preferred member estimations
    dispatch(addBoardEstimations(ownProps.card.idBoard, estimations))
  }

  const isCardHiddenProps = {
    cardMembers: get(ownProps, 'card.idMembers', []),
    memberToggle: get(stateProps, 'memberToggle'),
    members: get(stateProps, 'members', []),
  }

  const currentBoard = find(
    get(stateProps, 'boardData'),
    board => get(board, 'board.id') === get(ownProps, 'card.idBoard'),
  )
  const boardName = get(currentBoard, 'board.name', '')

  return {
    ...ownProps,
    boardName,
    isHidden: isCardHidden(isCardHiddenProps),
    addEstimations,
    toggleList: stateProps.toggleList,
  }
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Card)
export default CardContainer
