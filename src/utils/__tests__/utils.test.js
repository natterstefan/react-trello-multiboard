import { checkState, getAppErrorsList, isAppLoading } from '../utils'

describe('utils', () => {
  describe('checkstate', () => {
    const mockState = {
      cards: {
        'card-1': { prop: 'card-1-456' },
        'card-2': { prop: 'card-2-456' },
      },
    }

    test('returns an array with the results if it exists', () => {
      expect(checkState(mockState, 'cards', 'prop')).toEqual(['card-1-456', 'card-2-456'])
    })

    test('returns an empty array if no value exists', () => {
      expect(checkState(mockState, 'cards', 'someProp')).toEqual([])
    })
  })

  describe('isAppLoading', () => {
    const mockState = {
      cards: {
        'card-1': { isLoading: false },
        'card-2': { isLoading: false },
      },
      members: { isLoading: true },
      lists: {
        'list-1': { isLoading: true },
      },
    }
    test('returns an array of values with default, fallback and current values', () => {
      expect(isAppLoading(mockState)).toEqual({
        isBoardsLoading: false,
        isCardsLoading: false,
        isListsLoading: true,
        isMembersLoading: true,
      })
    })
  })

  describe('getAppErrorsList', () => {
    test('returns an array of values with default, fallback and current value', () => {
      const mockState = {
        cards: {
          'card-1': { error: { message: 'some error card message ' } },
          'card-2': { error: null },
        },
        members: { error: null },
        lists: {
          'list-1': { error: { message: 'some error list-1 message ' } },
          'list-2': { error: { message: 'some error list-2 message ' } },
        },
        user: {
          error: { message: 'some error user message ' },
        },
      }
      expect(getAppErrorsList(mockState)).toEqual([
        { key: 'cardError', message: ['some error card message '] },
        { key: 'listError', message: ['some error list-1 message ', 'some error list-2 message '] },
        { key: 'userError', message: 'some error user message ' },
      ])
    })

    test('returns an empty array when no error is present', () => {
      const mockState = {
        cards: {
          'card-1': { error: null },
          'card-2': { error: null },
        },
        members: { error: null },
        lists: {
          'list-1': { error: null },
          'list-2': { error: null },
        },
        user: {
          error: null,
        },
      }

      expect(getAppErrorsList(mockState)).toEqual([])
    })
  })
})
