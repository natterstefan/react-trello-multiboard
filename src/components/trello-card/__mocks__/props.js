export const props = {
  addEstimations: jest.fn(),
  card: {
    id: 'id-1',
    idMembers: ['mb1', 'mb2'],
    members: [{ id: 'mb1', username: 'exampleusername' }, { id: 'mb2', username: 'anotheruser' }],
    name: 'example-name',
  },
  config: {
    estimates_with_round_brackets: false,
    estimates_with_square_brackets: false,
  },
  isHidden: false,
}

export const storeStateMock = {
  app: {
    memberToggle: {
      togglePreferred: false,
      togglePreferredMember: null,
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
    members: [{ id: 'mb1' }, { id: 'mb2' }],
  },
}

export const storeStateMockPreferredMember = {
  app: {
    memberToggle: {
      togglePreferred: true,
      togglePreferredMember: 'mb1',
    },
  },
  members: {
    members: [{ id: 'mb1' }, { id: 'mb2' }],
  },
}

export const storeStateMockPreferredMemberInvalid = {
  app: {
    memberToggle: {
      togglePreferred: true,
      togglePreferredMember: 'mb3',
    },
  },
  members: {
    members: [{ id: 'mb1' }, { id: 'mb2' }],
  },
}
