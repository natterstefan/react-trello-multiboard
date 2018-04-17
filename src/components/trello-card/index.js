import { connect } from 'react-redux'
import { get } from 'lodash'
import Card from './component'
import { isCardHidden } from './utils'
import { addMembersEstimation } from '../../actions/members'
import { addBoardEstimations } from '../../actions/boards'

const mapStateToProps = state => ({
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
    memberToggle: get(stateProps, 'memberToggle'),
    members: get(stateProps, 'members', []),
    idMembers: get(ownProps, 'card.idMembers', []),
  }

  return {
    ...ownProps,
    isHidden: isCardHidden(isCardHiddenProps),
    addEstimations,
  }
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Card)
export default CardContainer
