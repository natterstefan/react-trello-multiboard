import getCompanyMember from '../get-company-member'

describe('utils/getCompanyMember', () => {
  const members = [{ username: 'exampleusername' }, { username: 'anotheruser' }]

  it('should return the expected company member object', () => {
    // the expected username is mocked in the jest setup file
    expect(getCompanyMember(members)).toMatchObject({ username: 'exampleusername' })
  })
})
