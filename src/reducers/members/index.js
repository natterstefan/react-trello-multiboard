import { forEach, forOwn, get, map, merge, omit, pick, uniq } from 'lodash'
import { actions } from '../../actions/members'

export const initialState = {
  error: null,
  isLoading: false,
  members: [],
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.REQUEST_MEMBERS:
      return merge({}, state, {
        error: null,
        isLoading: true,
      })

    case actions.RECEIVE_MEMBERS:
      const { error, members } = action
      if (!members) {
        return state
      }

      const uniqMembers = uniq([
        ...state.members,
        ...map(members, member => pick(member, ['id', 'username', 'fullName'])),
      ])

      const membersList = []
      forEach(members, member => {
        // NOTE: try to refactor and test if we can also use the preferred_members
        // value from the config or if we need to use the member.id here
        membersList[member.id] = {
          boardEstimations: {},
          data: omit(member, 'error'),
          error: member.error || null, // per member
          estimations: { consumed: 0, estimated: 0 },
          isLoading: false, // per member
        }
      })

      return merge({}, state, {
        error, // overall
        isLoading: false, // overall
        members: uniqMembers,
        ...membersList,
      })

    case actions.ADD_MEMBERS_ESTIMATION:
      const { payload = {} } = action

      const getCardEstimations = (mKey, estType) =>
        get(state, `[${mKey}].estimations[${estType}]`, 0)

      const getBoardEstimations = (mKey, bId, estType) =>
        get(state, `[${mKey}].boardEstimations.[${bId}][${estType}]`, 0)

      const membersEstimations = {}
      forOwn(payload, (value, key) => {
        const boardId = get(value, 'boardEstimations.boardId')
        membersEstimations[key] = {
          estimations: {
            consumed: getCardEstimations(key, 'consumed') + value.cardEstimations.consumed,
            estimated: getCardEstimations(key, 'estimated') + value.cardEstimations.estimated,
          },
          boardEstimations: {
            [boardId]: {
              consumed:
                getBoardEstimations(key, boardId, 'consumed') + value.boardEstimations.consumed,
              estimated:
                getBoardEstimations(key, boardId, 'estimated') + value.boardEstimations.estimated,
            },
          },
        }
      })

      return merge({}, state, {
        ...membersEstimations,
      })

    default:
      return state
  }
}
