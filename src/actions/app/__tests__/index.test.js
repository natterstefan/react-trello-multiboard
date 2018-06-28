import {
  actions,
  addNewPatterns,
  resetEstimations,
  toggleMinimizeLabels,
  togglePreferred,
  togglePreferredMember,
  toggleList,
} from '../'

describe('actions/app', () => {
  const expectedActions = {
    RESET_ESTIMATIONS: 'RESET_ESTIMATIONS',
    TOGGLE_MINIMIZE_LABELS: 'TOGGLE_MINIMIZE_LABELS',
    TOGGLE_PREFERRED: 'TOGGLE_PREFERRED',
    TOGGLE_PREFERRED_MEMBER: 'TOGGLE_PREFERRED_MEMBER',
    TOGGLE_PREFERRED_LIST: 'TOGGLE_PREFERRED_LIST',
    REGISTER_PATTERN: 'REGISTER_PATTERN',
  }

  test('returns the correct actions', () => {
    expect(actions).toEqual(expectedActions)
  })

  test('addNewPatterns should return correct actions object', () => {
    const pattern = ['pattern-1', 'pattern-2']
    expect(addNewPatterns(pattern)).toMatchObject({ type: actions.REGISTER_PATTERN, pattern })
  })

  test('toggleMinimizeLabels should return correct actions object', () => {
    expect(toggleMinimizeLabels()).toMatchObject({ type: actions.TOGGLE_MINIMIZE_LABELS })
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

  test('toggleList should return correct actions object', () => {
    const pattern = 'pattern-1'
    expect(toggleList(pattern)).toMatchObject({ type: actions.TOGGLE_PREFERRED_LIST, pattern })
  })

  test('resetEstimations should return correct actions object', () => {
    const pattern = 'pattern-1'
    expect(resetEstimations(pattern)).toMatchObject({ type: actions.RESET_ESTIMATIONS, pattern })
  })
})
