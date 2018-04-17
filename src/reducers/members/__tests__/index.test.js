import { actions } from '../../../actions/members'
import { reducer as app } from '../'
import { mockExampleMemberResponse } from '../../../__mocks__/mocks'

describe('reducers/app', () => {
  const initialState = {
    error: null,
    isLoading: false,
    members: [],
  }

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('changes isLoading to true when REQUEST_MEMBERS is triggered', () => {
    const action = { type: actions.REQUEST_MEMBERS }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      error: null,
      isLoading: true,
      members: [],
    })
  })

  test('adds members to the state correctly when RECEIVE_MEMBERS is triggered', () => {
    const members = [
      { ...mockExampleMemberResponse('exampleusername'), error: null },
      { ...mockExampleMemberResponse('anotheruser'), error: true },
    ]

    const expectedReponse = {
      error: null,
      isLoading: false,
      'member-1': {
        data: {
          avatarHash: '123456789',
          fullName: 'Example Username',
          id: 'member-1',
          username: 'exampleusername',
        },
        error: null,
        estimations: { consumed: 0, estimated: 0 },
        isLoading: false,
      },
      'member-2': {
        data: {
          avatarHash: '987654321',
          fullName: 'Another User',
          id: 'member-2',
          username: 'anotheruser',
        },
        error: true,
        estimations: { consumed: 0, estimated: 0 },
        isLoading: false,
      },
      members: [
        { id: 'member-1', username: 'exampleusername' },
        { id: 'member-2', username: 'anotheruser' },
      ],
    }

    // dispatch action
    const action = { type: actions.RECEIVE_MEMBERS, members, error: null }
    const result = app(initialState, action)
    expect(result).toMatchObject(expectedReponse)
  })

  test('adjusts the estimations of the given members when ADD_MEMBERS_ESTIMATION is triggered', () => {
    // prepare previous state
    const payload = {
      'member-1': {
        boardEstimations: { boardId: 'board-1', consumed: 1, estimated: 2 },
        cardEstimations: { boardId: 'board-1', consumed: 1, estimated: 2 },
      },
      'member-2': {
        boardEstimations: { consumed: 3, estimated: 4 },
        cardEstimations: { consumed: 3, estimated: 4 },
      },
    }

    const action = { type: actions.ADD_MEMBERS_ESTIMATION, payload }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      error: null,
      isLoading: false,
      'member-1': {
        boardEstimations: { 'board-1': { consumed: 1, estimated: 2 } },
        estimations: { consumed: 1, estimated: 2 },
      },
      'member-2': {
        boardEstimations: { undefined: { consumed: 3, estimated: 4 } },
        estimations: { consumed: 3, estimated: 4 },
      },
      members: [],
    })
  })
})
