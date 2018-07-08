import { GITHUB_URL, breakpoints } from '../'

describe('constants', () => {
  test('exports GITHUB_URL', () => {
    expect(GITHUB_URL).toEqual('https://github.com/natterstefan/react-trello-multiboard/')
  })

  test('exports breakpoints', () => {
    expect(breakpoints).toEqual({
      small: '@media (max-width: 768px)',
      medium: '@media (max-width: 1440px)',
      large: '@media (min-width: 1441px)',
    })
  })
})
