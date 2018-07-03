describe('data/Trello', () => {
  beforeAll(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('Trello exposes the correct methods', () => {
    global.Trello = { test: 123 }
    const Trello = require('../')

    const expectedExport = {
      default: {
        authenticateUser: expect.any(Function),
        getBoard: expect.any(Function),
        getMeBoards: expect.any(Function),
        getLists: expect.any(Function),
        getCards: expect.any(Function),
        getMember: expect.any(Function),
        isTrelloAvailable: expect.any(Function),
        trello: { test: 123 },
      },
    }

    expect(Trello).toEqual(
      expect.objectContaining({
        ...expectedExport,
      }),
    )
  })
})
