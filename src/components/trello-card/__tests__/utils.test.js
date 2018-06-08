import { isCardHidden } from '../utils'
import {
  storeStateMockPreferred,
  storeStateMockPreferredMember,
  storeStateMockPreferredMemberInvalid,
} from '../__mocks__/props'

describe('component/TrelloCard/utils', () => {
  const cardProps = { cardMembers: ['member-1', 'member-2'] }

  test('isCardHidden should return false by default', () => {
    expect(isCardHidden()).toBe(false)
  })

  test('isCardHidden should return false when preferred is toggled and one of the cardMembers is a preferredMember', () => {
    const props = {
      ...cardProps,
      memberToggle: storeStateMockPreferred.app.memberToggle,
      members: storeStateMockPreferred.members.members,
    }
    expect(isCardHidden(props)).toBe(false)
  })

  test('isCardHidden should return false when a member of the card is toggled', () => {
    const props = {
      ...cardProps,
      memberToggle: storeStateMockPreferredMember.app.memberToggle,
      members: storeStateMockPreferredMember.members.members,
    }
    expect(isCardHidden(props)).toBe(false)
  })

  test('isCardHidden should return true when a a different member is toggled than the ones on the card', () => {
    const props = {
      ...cardProps,
      memberToggle: storeStateMockPreferredMemberInvalid.app.memberToggle,
      members: storeStateMockPreferredMemberInvalid.members.members,
    }
    expect(isCardHidden(props)).toBe(true)
  })
})
