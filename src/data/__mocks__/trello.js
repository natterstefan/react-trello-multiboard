// JEST - How to mock modules
//
// either we mock it in each test seperately
// - >>> https://github.com/facebook/jest/issues/2582#issuecomment-346886018
// - https://stackoverflow.com/a/40465435/1238150
//
// or provide a solution for every test in the __mocks__
// - https://facebook.github.io/jest/docs/en/manual-mocks.html
import {
  mockExampleMemberResponse,
  mockExampleBoardResponse,
  mockExampleListResponse,
  mockExampleCardsResponse,
} from '../../__mocks__/mocks'

// NOTE: use mockResolvedValue instead
export const authenticateUser = jest.fn().mockResolvedValue({})
export const getBoard = jest.fn().mockResolvedValue(mockExampleBoardResponse)
export const getMeBoards = jest.fn().mockResolvedValue([mockExampleBoardResponse])
export const getLists = jest.fn().mockResolvedValue([mockExampleListResponse])
export const getCards = jest.fn().mockResolvedValue([mockExampleCardsResponse])
export const getMember = jest.fn(username => Promise.resolve(mockExampleMemberResponse(username)))
export const isTrelloAvailable = jest.fn().mockReturnValue(true)

export default {
  authenticateUser,
  getBoard,
  getMeBoards,
  getLists,
  getCards,
  getMember,
  isTrelloAvailable,
}
