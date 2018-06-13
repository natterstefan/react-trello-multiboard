import { shouldUpdate } from '../should-update'

describe('utils/shouldUpdate', () => {
  let dateNowSpy

  beforeAll(() => {
    // 01.01.2018 00:15:00
    dateNowSpy = jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => 1514765700000)
  })

  afterAll(() => {
    dateNowSpy.mockReset()
    dateNowSpy.mockRestore()
  })

  test('should return true when the elapsed time > Config.refreshCycle', () => {
    // 01.01.2018 00:00:00
    const result = shouldUpdate(1514764800000)
    expect(result).toBe(true)
  })

  test('should return false when the elapsed time < Config.refreshCycle', () => {
    // 01.01.2018 00:15:30
    const result = shouldUpdate(1514765730000)
    expect(result).toBe(false)
  })
})
