import { mockExampleUser1, mockExampleUser2, mockExampleUser3 } from '../../__mocks__/mocks'
import { getMemberByOneOfProperty } from '../get-member-by-property'

describe('utils/getMemberByOneOfProperty', () => {
  const members = [mockExampleUser1, mockExampleUser2, mockExampleUser3]

  test('should return a member found by id', () => {
    const result = getMemberByOneOfProperty(members, ['id'], 'member-2')
    expect(result).toEqual(mockExampleUser2)
  })

  test('should return a member when we do not know if the value is the id or username', () => {
    const result = getMemberByOneOfProperty(members, ['id', 'username'], 'anotheruser')
    expect(result).toEqual(mockExampleUser2)
  })

  test('should return undefined when nothing was found', () => {
    const result = getMemberByOneOfProperty(members, ['id'], 'random-id')
    expect(result).toEqual(undefined)
  })
})
