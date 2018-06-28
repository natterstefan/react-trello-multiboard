import { pick } from 'lodash'

// This file contains mocked responses from the data/trello API.
export const mockExampleBoardConfig = {
  board: 'hello-world',
  estimates_with_round_brackets: true,
  estimates_with_square_brackets: true,
  shortcut: 'hw',
}

export const mockExampleUser1 = {
  avatarHash: '123456789',
  fullName: 'Example Username',
  id: 'member-1',
  initials: 'EU',
  username: 'exampleusername',
}

export const mockExampleUser2 = {
  avatarHash: '987654321',
  fullName: 'Another User',
  id: 'member-2',
  initials: 'AU',
  username: 'anotheruser',
}

export const mockExampleUser3 = {
  avatarHash: null,
  fullName: 'Third User',
  id: 'member-3',
  initials: 'TU',
  username: 'thirduser',
}

export const mockExampleMemberResponse = username => {
  switch (username) {
    case 'anotheruser':
      return mockExampleUser2
    case 'thirduser':
      return mockExampleUser3
    default:
      return mockExampleUser1
  }
}

export const mockExampleBoardResponse = { name: 'hello-world', id: 'board-1' }

// most likely it should be an array with two lists (one matching and one not)
export const mockExampleListResponse = {
  id: 'list-123',
  idBoard: 'board-1',
  name: 'Test List Name #upcoming',
}

export const mockExampleCardsResponse = {
  id: 'card-1',
  name: 'Test Card Name',
  idBoard: 'board-1',
  idMembers: [mockExampleUser1.id, mockExampleUser2.id],
  idList: 'list-1',
  labels: [
    {
      color: 'orange',
      id: 'label-1',
      name: 'orange',
    },
  ],
  shortUrl: 'https://trello.com/c/abcdefgh',
  members: [
    pick(mockExampleUser1, ['id', 'username', 'fullName']),
    pick(mockExampleUser2, ['id', 'username', 'fullName']),
  ],
}
