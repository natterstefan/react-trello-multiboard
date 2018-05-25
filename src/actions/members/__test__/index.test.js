import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, addMembersEstimation, loadPreferredMembers } from '../'

// some static mocks
import { mockExampleMemberResponse } from '../../../__mocks__/mocks'

// mock data trello (see data/__mocks__/trello)
jest.mock('../../../data/trello')

describe('actions/members', () => {
  const expectedActions = {
    REQUEST_MEMBERS: 'REQUEST_MEMBERS',
    RECEIVE_MEMBERS: 'RECEIVE_MEMBERS',
    ADD_MEMBERS_ESTIMATION: 'ADD_MEMBERS_ESTIMATION',
  }

  test('returns the correct actions', () => {
    expect(actions).toMatchObject(expectedActions)
  })
})

describe('actions/members:async actions', () => {
  // docs/some links
  // - https://redux.js.org/recipes/writing-tests#async-action-creators
  // - https://stackoverflow.com/a/45082119/1238150
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../data/trello')
  })

  test('dispatches ADD_MEMBERS_ESTIMATION when adding and calculating the estimations has been done', async () => {
    const expectedActions = [
      {
        payload: {
          'member-1': {
            boardEstimations: { boardId: 'board-1', consumed: 1, estimated: 2 },
            cardEstimations: { consumed: 1, estimated: 2 },
          },
        },
        type: actions.ADD_MEMBERS_ESTIMATION,
      },
    ]

    // estimations will only be added to member-1
    const store = mockStore({ members: { members: [{ id: 'member-1' }] } })
    await store.dispatch(
      addMembersEstimation(['member-1', 'member-2'], { consumed: 1, estimated: 2 }, 'board-1'),
    )
    expect(store.getActions()).toEqual(expectedActions)
  })

  test('dispatches RECEIVE_MEMBERS when fetching members has been done', async () => {
    const expectedActions = [
      { type: actions.REQUEST_MEMBERS },
      {
        error: null,
        members: [
          {
            ...mockExampleMemberResponse('exampleusername'),
            avatarImg: 'https://trello-avatars.s3.amazonaws.com/123456789/50.png',
            isCompanyMember: true,
            preferred: true,
          },
          {
            ...mockExampleMemberResponse('anotheruser'),
            avatarImg: 'https://trello-avatars.s3.amazonaws.com/987654321/50.png',
            isCompanyMember: false,
            preferred: true,
          },
        ],
        type: actions.RECEIVE_MEMBERS,
      },
    ]
    const store = mockStore({})
    await store.dispatch(loadPreferredMembers())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
