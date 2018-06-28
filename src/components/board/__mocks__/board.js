import {
  mockExampleUser1,
  mockExampleUser2,
  mockExampleBoardResponse,
  mockExampleListResponse,
} from '../../../__mocks__/mocks'

export const props = {
  board: {
    id: 'board-1',
  },
}

export const storeStateMock = {
  boards: {
    data: [
      {
        board: mockExampleBoardResponse,
      },
      {
        board: {
          id: 'board-2',
          name: 'another-example-board',
        },
      },
    ],
  },
  lists: {
    'board-1': {
      isLoading: false,
      data: [mockExampleListResponse],
      error: null,
    },
  },
  info: {
    version: 1,
  },
  app: {
    memberToggle: {
      togglePreferred: false,
      togglePreferredMember: null,
    },
  },
  members: {
    members: [mockExampleUser1, mockExampleUser2],
  },
}
