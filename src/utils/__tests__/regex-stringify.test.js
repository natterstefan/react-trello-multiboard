import { regexStringifier } from '../regex-stringify'

describe('utils/regexStringifier', () => {
  const obj = {
    test: /#upcoming/,
  }

  test('should return a string of object w/ a RegEx it receives', () => {
    const result = JSON.stringify(obj, regexStringifier)
    expect(result).toEqual('{"test":"/#upcoming/"}')
  })

  test('should return a string of the regex expression it received', () => {
    const result = regexStringifier('test', /#upcoming/)
    expect(result).toEqual('/#upcoming/')
  })

  test('should return a string of a string is given', () => {
    const result = regexStringifier('test', '#upcoming')
    expect(result).toEqual('#upcoming')
  })
})
