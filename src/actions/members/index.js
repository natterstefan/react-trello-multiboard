import { forEach, get, map, some } from 'lodash'
import { getMember, isTrelloAvailable } from '../../data/trello'
import Config from '../../../config/config'

// NOTE: currently it is not possible to
// - request a single member (eg. async or after load etc.)
// - add estimations for a single member
const actions = {
  REQUEST_MEMBERS: 'REQUEST_MEMBERS',
  RECEIVE_MEMBERS: 'RECEIVE_MEMBERS',
  ADD_MEMBERS_ESTIMATION: 'ADD_MEMBERS_ESTIMATION',
}

const requestMembers = () => ({ type: actions.REQUEST_MEMBERS })

const receiveMembers = (members, error = null) => ({
  type: actions.RECEIVE_MEMBERS,
  members,
  error,
})

const receiveMembersEstimations = payload => ({
  type: actions.ADD_MEMBERS_ESTIMATION,
  payload: { ...payload },
})

const addMembersEstimation = (memberIds, estimations, boardId) => async (dispatch, getState) => {
  const currentState = getState()
  const members = get(currentState, 'members', {})
  const membersList = get(members, 'members', []) // represents the preferred members

  const memberEstimations = []
  forEach(memberIds, id => {
    // for now, we only update existing preferred members
    if (some(membersList, { id })) {
      memberEstimations[id] = {
        cardEstimations: estimations,
        boardEstimations: {
          ...estimations,
          boardId,
        },
      }
    }
  })

  dispatch(receiveMembersEstimations(memberEstimations))
}

const loadPreferredMembers = () => async dispatch => {
  if (!isTrelloAvailable()) {
    // console.error('Trello is not available')
    return
  }
  await dispatch(requestMembers())

  const { preferred_members = '', company_member = '' } = Config // eslint-disable-line
  const preferredMembersList = String(preferred_members)
    .replace(/\//g, '')
    .split('|')

  const getMemberPromise = map(
    preferredMembersList,
    member =>
      new Promise(resolve => {
        getMember(member)
          .then(resolve)
          .catch(error => resolve({ error, member })) // TODO: test error case
      }),
  )

  // TODO: test if/when global members store's error is set and how
  const response = await Promise.all(getMemberPromise)
  const members = map(response, member => ({
    ...member,
    preferred: true,
    isCompanyMember: member.username === company_member, // eslint-disable-line
    avatarImg: `https://trello-avatars.s3.amazonaws.com/${member.avatarHash}/50.png`,
  }))
  await dispatch(receiveMembers(members))
}

export { actions, addMembersEstimation, loadPreferredMembers }
