import { actions, togglePreferred, togglePreferredMember } from '../'

describe('actions/app', () => {
  const expectedActions = {
    TOGGLE_PREFERRED: 'TOGGLE_PREFERRED',
    TOGGLE_PREFERRED_MEMBER: 'TOGGLE_PREFERRED_MEMBER',
  }

  test('returns the correct actions', () => {
    expect(actions).toMatchObject(expectedActions)
  })

  test('togglePreferred should return correct actions object', () => {
    expect(togglePreferred(true)).toMatchObject({ type: actions.TOGGLE_PREFERRED, toggle: true })
  })

  test('togglePreferredMember should return correct actions object', () => {
    expect(togglePreferredMember('mb1')).toMatchObject({
      type: actions.TOGGLE_PREFERRED_MEMBER,
      memberId: 'mb1',
    })
  })
})
