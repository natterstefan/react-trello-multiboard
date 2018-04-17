import { getBoardName } from '../get-board-name'

describe('utils/getBoardName', () => {
  test('should return the shortcut of the selected board', () => {
    const result = getBoardName('hello-world')
    expect(result).toEqual('hw')
  })

  test('should return the input name (arg) if the board does not exist in the Config', () => {
    const result = getBoardName('board-99')
    expect(result).toEqual('board-99')
  })

  test('should return an empty string if non name (arg) is present', () => {
    const result = getBoardName()
    expect(result).toEqual('')
  })
})
