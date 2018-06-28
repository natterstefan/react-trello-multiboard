import { mockExampleUser1, mockExampleUser2 } from '../../../__mocks__/mocks'

export const props = {
  addEstimations: jest.fn(),
  boardName: 'example-board',
  card: {
    badges: {
      description: false,
      comments: 1,
      attachments: 1,
      checkItems: 2,
      checkItemsChecked: 1,
    },
    id: 'id-1',
    idBoard: 'board-1',
    idMembers: ['member-1', 'member-2'],
    labels: [
      {
        color: 'orange',
        id: 'label-1',
        name: 'orange',
      },
    ],
    members: [mockExampleUser1, mockExampleUser2],
    name: 'example-name',
    shortUrl: 'https://trello.com/id-1',
  },
  config: {
    estimates_with_round_brackets: false,
    estimates_with_square_brackets: false,
  },
  isHidden: false,
  listName: 'example-list',
  minimizeLabels: true,
  toggleMinimizeLabels: jest.fn(),
}

export const storeStateMock = {
  boards: {
    data: [
      {
        board: {
          // will be added to the TrelloCard (because it matches the idBoards above)
          id: 'board-1',
          name: 'example-board',
        },
      },
      {
        board: {
          id: 'board-2',
          name: 'another-example-board',
        },
      },
    ],
  },
  app: {
    memberToggle: {
      togglePreferred: false,
      togglePreferredMember: null,
    },
    trelloCardUI: {
      minimizeLabels: true,
    },
  },
  members: {
    members: [],
  },
}

export const storeStateMockPreferred = {
  app: {
    memberToggle: {
      togglePreferred: true,
      togglePreferredMember: null,
    },
  },
  members: {
    members: [{ id: 'member-1' }, { id: 'member-2' }],
  },
}

export const storeStateMockPreferredMember = {
  app: {
    memberToggle: {
      togglePreferred: true,
      togglePreferredMember: 'member-1',
    },
  },
  members: {
    members: [{ id: 'member-1' }, { id: 'member-2' }],
  },
}

export const storeStateMockPreferredMemberInvalid = {
  app: {
    memberToggle: {
      togglePreferred: true,
      togglePreferredMember: 'member-3',
    },
  },
  members: {
    members: [{ id: 'member-1' }, { id: 'member-2' }],
  },
}
