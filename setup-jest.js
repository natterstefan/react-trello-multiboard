import Enzyme from 'enzyme' // eslint-disable-line
import Adapter from 'enzyme-adapter-react-16' // eslint-disable-line
import { invoke } from 'lodash'

// import icons
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faAlignLeft from '@fortawesome/fontawesome-free-solid/faAlignLeft'
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
import faCommentDots from '@fortawesome/fontawesome-free-solid/faCommentDots'
import faPaperclip from '@fortawesome/fontawesome-free-solid/faPaperclip'

// mock config
import { mockExampleBoardConfig } from './src/__mocks__/mocks'

// other enzyme tools (not used yet)
// - https://github.com/FormidableLabs/enzyme-matchers
Enzyme.configure({ adapter: new Adapter() })

// make icons available in all tests
fontawesome.library.add(brands, faAlignLeft, faCheckSquare, faCommentDots, faPaperclip)

// mock configuration
jest.mock('./config/config', () => ({
  app_title: 'Trello Multiboard',
  api_key: 'your_api_key',
  company_member: 'exampleusername',
  preferred_members: /exampleusername|anotheruser/,
  lists: [/#upcoming/],
  boards: [mockExampleBoardConfig],
  refreshCycle: 1,
}))

// mock redux environment & libraries
jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({ persistStore: 'dummy-persistStore' }),
  persistReducer: jest.fn(),
}))
jest.mock('redux-persist/lib/storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}))
jest.mock('redux', () => ({
  applyMiddleware: jest.fn(),
  combineReducers: jest.fn(),
  createStore: jest
    .fn()
    .mockReturnValue({ dispatch: jest.fn(), getState: jest.fn(), subscribe: jest.fn() }),
}))
jest.mock('redux-devtools-extension', () => ({
  composeWithDevTools: jest.fn(),
}))

// mock $ (jquery)
window.$ = jest.fn()

// mock Trello
window.Trello = {
  get: jest.fn(() => Promise.resolve({})),
}

// mock trello's embed.min.js
window.TrelloCards = {
  create: jest.fn((cardId, cardSelector, options) => {
    // mock onloading and onresize events and results
    const evt = {
      path: [{ clientHeight: 100 }],
    }
    const dim = { height: 100 }

    // the timout simulates the time it needs to
    // call these features after the iframe has reloaded
    // or resized
    setTimeout(() => {
      invoke(options, 'onLoad', evt)
      invoke(options, 'onResize', dim)
    }, 1000)
  }),
  load: jest.fn(),
}
