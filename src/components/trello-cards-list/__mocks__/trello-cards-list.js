import {
  mockExampleCardsResponse,
  mockExampleBoardConfig,
  mockExampleListResponse,
} from '../../../__mocks__/mocks'

export const props = {
  list: mockExampleListResponse,
  config: mockExampleBoardConfig,
}

export const storeStateMock = {
  cards: {
    'list-1': {
      data: [
        {
          card: mockExampleCardsResponse,
          config: mockExampleBoardConfig,
        },
      ],
      isLoading: true,
      error: null,
    },
  },
}
