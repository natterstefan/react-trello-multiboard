import * as app from '../app'
import * as boards from '../boards'
import * as lists from '../lists'
import * as cards from '../cards'
import * as members from '../members'
import * as user from '../user'

import {
  app as appActions,
  boards as boardActions,
  lists as listActions,
  cards as cardActions,
  members as membersActions,
  user as userActions,
} from '../'

describe('actions/index', () => {
  it('should export the expected actions', () => {
    expect({ app, boards, lists, cards, members, user }).toMatchObject({
      app: appActions,
      boards: boardActions,
      lists: listActions,
      cards: cardActions,
      members: membersActions,
      user: userActions,
    })
  })
})
