import { connect } from 'react-redux'
import { get } from 'lodash'

import MembersList from './component'

const mapStateToProps = state => ({
  members: get(state, 'members', []),
})

const MembersListContainer = connect(mapStateToProps)(MembersList)
export default MembersListContainer
