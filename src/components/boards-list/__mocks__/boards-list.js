import { mockExampleUser1, mockExampleBoardResponse } from '../../../__mocks__/mocks'

export const storeStateMock = {
  boards: {
    data: [{ board: mockExampleBoardResponse }],
    error: null,
    isLoading: true,
  },
  app: {
    memberToggle: {
      togglePreferred: false,
      togglePreferredMember: null,
    },
  },
  members: { members: [mockExampleUser1] },
}
