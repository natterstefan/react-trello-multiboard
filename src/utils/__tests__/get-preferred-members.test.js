import getPreferredMembers from '../get-preferred-members'

describe('utils/getPreferredMembers', () => {
  const members = [
    {
      id: '123',
      username: 'exampleusername',
    },
    {
      id: '456',
      username: 'anotheruser',
    },
  ]

  afterEach(() => {
    jest.resetModules()
  })

  test('should return an array of preferred members', () => {
    const result = getPreferredMembers(members)
    expect(result.length).toBe(2)
    expect(result).toEqual(expect.arrayContaining(members))
  })

  test('should return an empty array if no preferred member matches', () => {
    const result = getPreferredMembers([])
    expect(result.length).toBe(0)
    expect(result).toEqual([])
  })

  test('should return an empty array if no preferred member config exists', () => {
    // mock config
    jest.mock('../../../config/config', () => ({
      preferred_members: undefined,
    }))
    const getPreferredMembersDefault = require('../get-preferred-members').default

    const result = getPreferredMembersDefault([])
    expect(result.length).toBe(0)
    expect(result).toEqual([])
  })

  test('should return an empty array if the preferred_members config is not valid', () => {
    // mock config
    jest.mock('../../../config/config', () => ({
      preferred_members: 999, // should be a regex string
    }))
    const getPreferredMembersDefault = require('../get-preferred-members').default

    const result = getPreferredMembersDefault(members)
    expect(result.length).toBe(0)
    expect(result).toEqual([])
  })
})
