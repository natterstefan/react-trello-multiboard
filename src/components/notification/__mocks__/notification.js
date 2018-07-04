export const props = { message: 'some notification' }

export const storeStateMock = {
  boards: {
    isLoading: false,
    error: null,
  },
  lists: {
    'board-1': {
      isLoading: false,
      error: null,
    },
  },
  members: {
    isLoading: false,
    error: null,
  },
}

export const storeWithBoardError = {
  boards: {
    isLoading: false,
    error: {
      status: 401,
      responseText: 'example response',
    },
  },
}

export const storeWithAnyError = {
  user: {
    error: { message: 'some error user message ' },
  },
}
