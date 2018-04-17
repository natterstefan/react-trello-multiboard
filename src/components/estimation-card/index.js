import { connect } from 'react-redux'
import { get, omit } from 'lodash'

import EstimationCard from './component'
import getCompanyMember from '../../utils/get-company-member'

const mapStateToProps = state => ({
  boards: get(state, 'boards', {}),
  members: get(state, 'members', {}),
  memberToggle: get(state, 'app.memberToggle', {}),
})

const mapDispatchToProps = () => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const isLoading = get(stateProps, 'boards.isLoading', false)
  const error = get(stateProps, 'boards.error')
  const { id: companyMember } = getCompanyMember(get(stateProps, 'members.members', []) || []) || {}

  return {
    ...ownProps,
    companyMember,
    boards: stateProps.boards,
    error,
    isLoading,
    members: omit(stateProps.members, ['error', 'isLoading', 'members']),
    memberToggle: stateProps.memberToggle,
  }
}

const EstimationCardContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  EstimationCard,
)
export default EstimationCardContainer
